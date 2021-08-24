import faker from "faker"
import SheetView from "./sheet-view"
import { ChangeSheetValuesEvent, SheetDataBlock } from "./sheet-types"

faker.seed(1)

interface SheetProps {
  data: SheetDataBlock[]
  edit?: boolean
  onChangeSheetValues: ChangeSheetValuesEvent
}

export default function Sheet(props: SheetProps) {
  const { data, edit, onChangeSheetValues: handleChangeSheetValues } = props

  return (
    <SheetView
      data={data}
      edit={Boolean(edit)}
      onChangeSheetValues={handleChangeSheetValues}
    />
  )
}
