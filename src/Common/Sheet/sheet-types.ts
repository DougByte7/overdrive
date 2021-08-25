export type SheetFieldType = "text" | "number" | "select" | "checkbox"

export type GridPosition = {
  rowStart: number
  columnStart: number
  rowEnd: number
  columnEnd: number
}

export type SheetInputField = {
  type: SheetFieldType
  position: GridPosition
  label: string
  value: string | number | string[]
  options?: string[]
  isMultiSelect?: boolean
}

export interface SheetDataBlock {
  position: GridPosition
  inputFields: SheetInputField[]
}

export type ChangeSheetValuesEvent = (
  dataBlockIndex: number,
  fieldIndex: number
) => (event: React.ChangeEvent<HTMLInputElement>) => void
