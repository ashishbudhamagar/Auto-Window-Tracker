
export interface ExtensionData {
  
  trackedWindows: Record<string, TrackedWindow>
  optionsPageLayout: OptionsPageLayout
  optionsPageSort: OptionsPageSort
  theme: Theme
  
  // this property exists so I dont have to use Object.values(obj).windowId everytime 
  // I need a list of tracked window ids (better preformance)
  // Also this keeps ids of open windows only
  openedTrackedWindowIds: number[]
}

export interface TrackedWindow {
  windowId: number
  windowName: string
  color: string
  isOpen: boolean
  tabs: Tab[]
  groupedTabsInfo: any[]
  dateAdded: number
  activeTabId: number
  draggableOrder1: number,
  draggableOrder2: number,
  draggableOrder3: number
}


export interface Tab {
  "id": number,
  "title": string,
  "url": string,
  "favIconUrl": string | null,
  "groupId": number,
  "pinned": boolean,
  "muted": boolean
}


export enum OptionsPageSort {
  nameAsc = "Name: ASC",
  nameDes = "Name: DES",
  statusOpen = "Status: Active",
  statusSaved = "Status: Saved",
  dateAsc = "Date: Added ASC",
  dateDec = "Date: Added DES",
  draggable1 = "Draggable: Layout 1",
  draggable2 = "Draggable: Layout 2",
  draggable3 = "Draggable: Layout 3",
  
}

export enum OptionsPageLayout {
  card = "card",
  table = "table"
}

export enum Theme {
  light = "light",
  dark = "dark"
}


// export interface GroupedTabs {
//   "id": number,
//   "title": string,
//   "color": string,
//   "collapsed": boolean,
//   "windowId": number,
//   "shared": boolean
// }