// Import helper functions from data-manager
import { debounce, onExtensionInstalled, saveExtensionData } from "./data-manager";

// Define our default extension data.
const starterExtensionData = {
  
  trackedWindows: {},
  allWindowNames: [],
  user: "Ash",
  moreData: 123123,
};

// Global variable for our extension data.
let extensionData = null;

// Create a debounced version of saveExtensionData (save at most once per second)
const debounceSaveData = debounce(() => {
  saveExtensionData(extensionData);
}, 1000);

// -----------------------------
// INITIALIZATION
// -----------------------------

// Immediately load extensionData from storage.
function loadExtensionData() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get("extensionData", (result) => {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      if (result && result.extensionData) {
        extensionData = result.extensionData;
        console.log("Loaded extensionData from storage:", extensionData);
      } else {
        extensionData = { ...starterExtensionData };
        saveExtensionData(extensionData);
        console.log("No stored data; initialized with starter data:", extensionData);
      }
      resolve(extensionData);
    });
  });
}

// Start by loading our extension data.
loadExtensionData().catch(console.error);

// Run onExtensionInstalled (which may clear storage on install/update).
onExtensionInstalled()
  .then(() => console.log("onExtensionInstalled completed"))
  .catch(console.error);

// -----------------------------
// EVENT LISTENERS (registered synchronously)
// -----------------------------

// Message Listener – available immediately.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // If extensionData isn’t loaded yet, load it and then process the message.
  if (!extensionData) {
    loadExtensionData()
      .then(() => processMessage(message, sendResponse))
      .catch((err) => {
        console.error(err);
        sendResponse({ error: "Failed to load data" });
      });
    return true; // Indicate that we'll respond asynchronously.
  }
  processMessage(message, sendResponse);
  return true;
});

// Process messages based on signal.
function processMessage(message, sendResponse) {
  switch (message.signal) {
    case "trackButtonClicked":
      if (message.trackWindow === true) {
        handleWindowTrack(message.currentWindowId, message.windowName, sendResponse);
      } else {
        handleWindowUntracked(message.currentWindowId, sendResponse);
      }
      break;
    case "getDataForOptions":
    case "dataForPopup":
      sendResponse(extensionData);
      console.log("Data sent:", extensionData);
      break;
    case "untrackWindow":
      delete extensionData.trackedWindows[message.windowName];
      sendResponse({ success: true });
      break;
    case "openSavedWindow":
      handleSavedWindowOpen(message.openedWindowDetails);
      break;
    default:
      sendResponse({ error: "Unknown signal" });
  }
}

// Tab event listeners – update state when tabs change.
chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  if (!removeInfo.isWindowClosing) {
    reQueryAllTabsToSave(removeInfo.windowId);
  }
});

chrome.tabs.onMoved.addListener((tabId, moveInfo) => {
  reQueryAllTabsToSave(moveInfo.windowId);
});

chrome.tabs.onUpdated.addListener((tabId, updateInfo, tab) => {
  if (updateInfo.url || updateInfo.groupId) {
    reQueryAllTabsToSave(tab.windowId);
  }
});

// Window event listener – mark tracked windows as closed.
chrome.windows.onRemoved.addListener((windowId) => {
  for (const [name, trackedWindow] of Object.entries(extensionData.trackedWindows)) {
    if (trackedWindow.isOpen && trackedWindow.windowId === windowId) {
      extensionData.trackedWindows[name].isOpen = false;
      saveExtensionData(extensionData);
      updateOptionsPage();
    }
  }
});

// -----------------------------
// HELPER FUNCTIONS
// -----------------------------

function reQueryAllTabsToSave(windowId) {
  console.log("Re-querying tabs for window:", windowId);
  for (const [name, trackedWindow] of Object.entries(extensionData.trackedWindows)) {
    if (trackedWindow.windowId === windowId && trackedWindow.isOpen) {
      chrome.tabs.query({ windowId }, (allTabs) => {
        extensionData.trackedWindows[name].tabs = allTabs.map((tab) => ({
          id: tab.id,
          groupId: tab.groupId,
          url: tab.url,
        }));
        debounceSaveData();
        console.log("Updated tabs for", name, ":", extensionData.trackedWindows[name].tabs);
      });
      break;
    }
  }
}

function updateOptionsPage() {
  chrome.tabs.query({ url: "chrome-extension://nfhnplnmgoblehoadbjmkiadacjafcgj/options.html" }, (tabs) => {
    if (tabs.length !== 0) {
      chrome.runtime.sendMessage({
        signal: "changeOptions",
        trackedWindows: extensionData.trackedWindows,
      });
    }
  });
}

function handleSavedWindowOpen(windowDetails) {
  // Create a new window with the specified URLs.
  chrome.windows.create({ url: windowDetails.tabs.map((ele) => ele.url) }, (newWindow) => {
    // Wait for the new window's tabs to be ready.
    setTimeout(() => {
      // Query the new window's tabs.
      chrome.tabs.query({ windowId: newWindow.id }, (tabs) => {
        let groupedTabsId = [];
        let groupIndex = -1;
        let lastGroupId = -1;
        // For each saved tab entry, try to find its match in the new window.
        windowDetails.tabs.forEach((ele) => {
          if (ele.groupId !== -1) {
            if (lastGroupId !== ele.groupId) {
              groupIndex++;
              groupedTabsId[groupIndex] = [];
            }
            // Match by URL; you might need a more robust match in your use case.
            const matchingTab = tabs.find((t) => t.url === ele.url);
            if (matchingTab) {
              groupedTabsId[groupIndex].push(matchingTab.id);
            }
            lastGroupId = ele.groupId;
          }
        });
        // Group the matched tabs.
        for (let i = 0; i < groupedTabsId.length; i++) {
          chrome.tabs.group({ tabIds: groupedTabsId[i] }, (groupId) => {
            chrome.tabGroups.update(groupId, {
              title: windowDetails.groupedTabsInfo[i].title,
              color: windowDetails.groupedTabsInfo[i].color,
              collapsed: windowDetails.groupedTabsInfo[i].collapsed,
            });
          });
        }
        // Update the tracked window info.
        extensionData.trackedWindows[windowDetails.windowName].isOpen = true;
        extensionData.trackedWindows[windowDetails.windowName].windowId = newWindow.id;
      });
    }, 600);
  });
}

function handleWindowTrack(currentWindowId, windowName, sendResponse) {
  chrome.tabs.query({ windowId: currentWindowId }, (allTabs) => {
    chrome.tabGroups.query({ windowId: currentWindowId }, (groups) => {
      const usefulTabsData = allTabs.map((tab) => ({
        id: tab.id,
        groupId: tab.groupId,
        url: tab.url,
      }));
      extensionData.allWindowNames.push(windowName);
      extensionData.trackedWindows[windowName] = {
        windowId: currentWindowId,
        color: "white",
        isOpen: true,
        tabs: usefulTabsData,
        windowName: windowName,
        groupedTabsInfo: groups,
      };
      sendResponse(true);
      updateOptionsPage();
      console.log("Window Tracked:", extensionData.allWindowNames);
    });
  });
}

function handleWindowUntracked(currentWindowId, sendResponse) {
  for (const [key, trackedWindow] of Object.entries(extensionData.trackedWindows)) {
    if (trackedWindow.windowId === currentWindowId && trackedWindow.isOpen) {
      extensionData.allWindowNames = extensionData.allWindowNames.filter(
        (name) => name !== trackedWindow.windowName
      );
      delete extensionData.trackedWindows[key];
      sendResponse(false);
      updateOptionsPage();
      console.log("Window Untracked:", extensionData.allWindowNames);
      break;
    }
  }
}
