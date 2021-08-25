import { SheetFieldType, SheetInputField } from "@/common/sheet/sheet-types"

export type DialogData = {
  title: string
  description: string
  content: JSX.Element | null
  isOpen: boolean
  blockIndex: number
}

export interface ISheetBuilderContextData {
  dialogData: DialogData
  newComponent: SheetInputField
  openDialog: (type: SheetFieldType, blockIndex: number) => VoidFunction
  closeDialog: VoidFunction
  handleChangeNewComponent: (newValues: Partial<SheetInputField>) => void
}
