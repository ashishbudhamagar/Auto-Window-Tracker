export interface ExtensionData { 
  trackedWindows: Record<string, TrackedWindow>
  trackedWindowNames: string[]
  optionsPageLayout: OptionsPageLayout
  optionsPageSort: OptionsPageSort
  theme: Theme
}

export interface TrackedWindow {
  "windowId": string,
  "windowName": string,
  "color": string,
  "isOpen": boolean,
  "tabs": any[],
  "groupedTabsInfo": any
}

export enum OptionsPageSort {
  nameAsc = "Name: ASC",
  nameDes = "Name: DES",
  statusOpen = "Status: Active",
  statusSaved = "Status: Saved"
}

export enum OptionsPageLayout {
  card = "card",
  table = "table"

}

export enum Theme {
  light = "light",
  dark = "dark"
}