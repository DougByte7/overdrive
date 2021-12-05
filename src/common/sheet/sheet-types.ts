export type SheetFieldType = "text" | "number" | "select" | "checkbox"

export type GridPosition = {
  rowStart: number
  columnStart: number
  rowEnd: number
  columnEnd: number
}

interface BaseSheetInputField {
  position: GridPosition
  label: string
}

export interface SheetInputTextField extends BaseSheetInputField {
  type: "text"
  value: string
}

export interface SheetInputNumberField extends BaseSheetInputField {
  type: "number"
  value: number
}

export interface SheetInputSelectField extends BaseSheetInputField {
  type: "select"
  value: string | string[]
  options: string[]
  isMultiSelect: boolean
}

export interface SheetInputCheckboxField extends BaseSheetInputField {
  type: "checkbox"
  value: number
  quantity: number
  isPrecisionRating: boolean
  numberValue: number
}

export type SheetInputField =
  | SheetInputTextField
  | SheetInputNumberField
  | SheetInputSelectField
  | SheetInputCheckboxField

export type SheetInputFieldKey =
  | keyof SheetInputTextField
  | keyof SheetInputNumberField
  | keyof SheetInputSelectField
  | keyof SheetInputCheckboxField

export interface SheetDataBlock {
  title?: string
  position: GridPosition
  inputFields: SheetInputField[]
}
