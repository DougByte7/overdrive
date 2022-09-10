import { openDB } from "idb"
import { createContext, FunctionComponent, useContext } from "react"
import { IOverdriveDBData, OverdriveDBStores } from "./types"

const IndexedDBContext = createContext<IOverdriveDBData>({
  addItems: () =>
    new Promise(() => console.warn("IndexedDBContextProvider not found")),
  getItems: () =>
    new Promise(() => console.warn("IndexedDBContextProvider not found")),
})

const IndexedDBContextProvider: FunctionComponent = ({ children }) => {
  if (!indexedDB) {
    throw new Error(
      "Your browser doesn't support a stable version of IndexedDB. Please use a modern browser."
    )
  }

  const clgError = (message: string, ...args: any) => {
    console.error(message, ...args)
  }

  const openFoundationDB = async () => {
    const db = await openDB("Foundation", undefined, {
      upgrade(db) {
        const objectStore = db.createObjectStore(
          OverdriveDBStores.DICTIONARIES,
          { keyPath: "name" }
        )
        objectStore.createIndex("name", "name", { unique: true })
      },
    })
    db.onerror = (event) => clgError("😱 Error loading database...", event)

    return db
  }

  const addItems = async (
    storeNames: Array<OverdriveDBStores>,
    data: any[]
  ) => {
    const db = await openFoundationDB()
    const tx = db.transaction(storeNames, "readwrite")
    if (!tx) throw new Error("Error: Failed to create transaction")

    tx.onerror = (event) =>
      clgError(
        `Error: (Add) Transaction on store(s) ${storeNames} failed`,
        event
      )

    for (const store of storeNames) {
      const objectStore = tx.objectStore(store)
      await Promise.all([
        ...data.map((d) => {
          return new Promise(() => objectStore.add(d))
        }),
        tx.done,
      ])
    }
  }

  const getItems = async (storeName: OverdriveDBStores) => {
    const db = await openFoundationDB()
    const result = await db.getAll(storeName)
    return result
  }

  const data: IOverdriveDBData = {
    addItems,
    getItems,
  }

  return (
    <IndexedDBContext.Provider value={data}>
      {children}
    </IndexedDBContext.Provider>
  )
}

export const useIndexedDB = () => useContext(IndexedDBContext)

export default IndexedDBContextProvider
