import { SheetFieldType, SheetInputField } from "@/common/sheet/sheet-types"

export type DialogData = {
  title: string
  description: string
  content: JSX.Element | null
  isOpen: boolean
  blockIndex: number
}

export interface ISheetBuilderContextState {
  dialogData: DialogData
  newComponent: SheetInputField
}

export interface ISheetBuilderContextData extends ISheetBuilderContextState {
  openDialog: (type: SheetFieldType, blockIndex: number) => VoidFunction
  closeDialog: VoidFunction
  setNewComponent: (newValues: Partial<SheetInputField>) => void
}
