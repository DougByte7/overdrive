import { Dictionary } from "@/common/types"
import { Dispatch, SetStateAction, FC } from "react"
import { createStateContext } from "react-use"

interface ISharedSheetInfo {
  dictionaries: Dictionary[]
}

export const [useSharedSheetInfo, SharedSheetInfoProvider]: [
  () => [ISharedSheetInfo, Dispatch<SetStateAction<ISharedSheetInfo>>],
  FC<{
    initialValue?: ISharedSheetInfo | undefined
    children?: React.ReactNode
  }>
] = createStateContext<ISharedSheetInfo>({ dictionaries: [] }) as any
