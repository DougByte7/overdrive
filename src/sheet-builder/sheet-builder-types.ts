import {
  GridPosition,
  SheetDataBlock,
  SheetFieldType,
  SheetInputField,
} from "@/common/sheet/sheet-types"

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

export type SheetElementsDescription = Record<
  "input" | "select" | "checkbox",
  { name: string; description: string }
>

export type AddSheetBlockEvent = (position: GridPosition) => void
export type RenameSheetBlockEvent = (blockIndex: number, value: string) => void
export type RemoveSheetBlockEvent = (blockIndex: number) => VoidFunction
export type AddSheetElementEvent = (
  newField: SheetInputField,
  selectedBlockIndex: number,
  insertAt?: number
) => void
export type RemoveSheetElementEvent = (
  blockIndex: number,
  elementIndex: number
) => void

export interface ISheetBuilderContextData {
  sheetTemplate: SheetDataBlock[]
  dialogData: DialogData
  newComponent: SheetInputField
  sheetElementsDescription: SheetElementsDescription
  openDialog: SheetBuilderHandleOpenDialog
  closeDialog: VoidFunction
  handleChangeNewComponent: SheetBuilderHandleChangeNewComponent
  addSheetBlock: AddSheetBlockEvent
  renameSheetBlock: RenameSheetBlockEvent
  removeSheetBlock: RemoveSheetBlockEvent
  addSheetElement: AddSheetElementEvent
  removeSheetElement: RemoveSheetElementEvent
}
