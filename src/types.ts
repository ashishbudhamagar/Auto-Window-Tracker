
export interface ExtensionData {

  trackedWindows: Record<string, TrackedWindow>
  optionsPageLayout: OptionsPageLayout
  optionsPageSort: OptionsPageSort
  theme: Theme

  // this property exists so I dont have to use Object.values(obj).windowName everytime
  // I need a list of tracked window names (better preformance)
  trackedWindowNames: string[]
  // this property exists so I dont have to use Object.values(obj).windowId everytime 
  // I need a list of tracked window ids (better preformance)
  // Also this keeps ids of open windows only
  trackedWindowIds: number[]
}

export interface TrackedWindow {
  windowId: number
  windowName: string
  color: string
  isOpen: boolean
  tabs: Tab[]
  groupedTabsInfo: any
  dateAdded: number
  order: number
}


export interface Tab {
  "id": number,
  "active": boolean,
  "pinned": boolean,
  "groupId": number,
  "url": string,
  "favIconUrl": string,
  "title": string
}


export enum OptionsPageSort {
  nameAsc = "Name: ASC",
  nameDes = "Name: DES",
  statusOpen = "Status: Active",
  statusSaved = "Status: Saved",
  custom1 = "Custom: First",
  custom2 = "Custom: Second",
  custom3 = "Custom: Third"
}

export enum OptionsPageLayout {
  card = "card",
  table = "table"
}

export enum Theme {
  light = "light",
  dark = "dark"
}