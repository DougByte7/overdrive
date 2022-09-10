export interface IOverdriveDBData {
  addItems: (storeNames: Array<OverdriveDBStores>, data: any[]) => Promise<void>
  getItems: (storeName: OverdriveDBStores) => Promise<any>
}

export enum OverdriveDBStores {
  DICTIONARIES = "dictionaries",
}
