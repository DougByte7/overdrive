import { Dictionary } from "@/common/types"
import { createStateContext } from "react-use"

interface ISharedSheetInfo {
  dictionaries: Dictionary[]
}

export const [useSharedSheetInfo, SharedSheetInfoProvider] =
  createStateContext<ISharedSheetInfo>({ dictionaries: [] })
