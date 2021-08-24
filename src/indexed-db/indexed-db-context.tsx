import { createContext, FunctionComponent, useContext, useRef } from "react"
import { IOverdriveDBData, OverdriveDBStores } from "./types"

const IndexedDBContext = createContext<IOverdriveDBData>({
  addItems: () => 0,
  getItems: () => 0,
})

const IndexedDBContextProvider: FunctionComponent = ({ children }) => {
  if (!indexedDB) {
    throw new Error(
      "Your browser doesn't support a stable version of IndexedDB. Please use a modern browser."
    )
  }

  const db = useRef<IDBDatabase>()
  const clgError = (message: string, ...args: any) => {
    console.error(message, ...args)
  }

  if (!db.current) {
    const request = indexedDB.open("Foundation")
    request.onerror = (event) => clgError("😱 Error loading database...", event)
    request.onsuccess = (_event) => {
      console.log("😎 Database initialized.")
      db.current = request.result
    }
    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const newDB: IDBDatabase = (event.target as any).result
      const objectStore = newDB.createObjectStore(
        OverdriveDBStores.DICTIONARIES,
        { keyPath: "name" }
      )

      objectStore.createIndex("name", "name", { unique: true })
    }
  } else {
    db.current.onerror = (event) => {
      const { target } = event as Event & { target: { errorCode: any } }
      // Generic error handler for all errors targeted at this database's
      clgError("Database error: " + target.errorCode)
    }
  }

  const addItems = (storeNames: Array<OverdriveDBStores>, data: any[]) => {
    const transaction = db.current?.transaction(storeNames, "readwrite")
    if (!transaction) throw new Error("Error: Failed to create transaction")

    transaction.onerror = (event) =>
      clgError(
        `Error: (Add) Transaction on store(s) ${storeNames} failed`,
        event
      )

    storeNames.forEach((store) => {
      const objectStore = transaction.objectStore(store)
      data.forEach((d) => {
        const request = objectStore.add(d)
        request.onsuccess = (_event) => {}
      })
    })
  }

  const getItems = (
    storeName: OverdriveDBStores,
    callback: (items: any) => void
  ) => {
    if (!db.current) throw new Error("Error: IDB is undefined")

    const transaction = db.current.transaction([storeName])
    if (!transaction) throw new Error("Error: Failed to create transaction")

    const objectStore = transaction.objectStore(storeName)
    const request = objectStore.getAll()
    request.onerror = (event) =>
      clgError(`Error: Could not GatAll data from store ${storeName}`, event)

    request.onsuccess = (event: any) => {
      callback(event.target.result)
    }
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
