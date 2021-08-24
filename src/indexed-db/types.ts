export interface IOverdriveDBData {
  addItems: (storeNames: Array<OverdriveDBStores>, data: any[]) => void
  getItems: (
    storeName: OverdriveDBStores,
    callback: (items: any) => void
  ) => void
}

export enum OverdriveDBStores {
  DICTIONARIES = "dictionaries",
}
