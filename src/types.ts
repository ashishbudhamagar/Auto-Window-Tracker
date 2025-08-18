export interface ExtensionData { 
  trackedWindows: Record<string, any>
  allWindowNames: string[]
  optionsPageLayout: OptionsPageLayout
  optionsPageSort: OptionsPageSort
  theme: Theme
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