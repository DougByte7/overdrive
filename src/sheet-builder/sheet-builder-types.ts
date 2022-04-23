import { SheetFieldType, SheetInputField } from "@/common/sheet/sheet-types"

export interface DialogData {
  title: string
  description: string
  isOpen: boolean
  blockIndex: number
  content?: JSX.Element
}

export type SheetBuilderHandleOpenDialog = (
  type: SheetFieldType,
  blockIndex: number,
  inputIndex?: number
) => VoidFunction

export type SheetBuilderHandleChangeNewComponent = (
  newValues: Partial<SheetInputField>
) => void

export interface ISheetBuilderContextData {
  dialogData: DialogData
  newComponent: SheetInputField
  openDialog: SheetBuilderHandleOpenDialog
  closeDialog: VoidFunction
  handleChangeNewComponent: SheetBuilderHandleChangeNewComponent
}
