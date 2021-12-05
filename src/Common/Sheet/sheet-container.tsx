import SheetView from "./sheet-view"
import { SheetDataBlock, SheetInputFieldKey } from "./sheet-types"
import { ChangeEvent, MutableRefObject, useMemo, useState } from "react"

interface SheetProps {
  template: SheetDataBlock[]
  edit?: boolean
  sheetDataRef?: MutableRefObject<SheetDataBlock[]>
  onChangeSheetBlockTitle?: (
    blockIndex: number
  ) => (e: ChangeEvent<HTMLInputElement>) => void
  onRemove?: (blockIndex: number) => VoidFunction
}

export default function Sheet(props: SheetProps) {
  const {
    template,
    edit,
    sheetDataRef,
    onChangeSheetBlockTitle: handleChangeSheetBlockTitle,
    onRemove,
  } = props
  const templateWithValues = useMemo(() => template, [template])
  const [expandedAccordions, setExpandedAccordions] = useState<number[]>([])
  const [shouldChangeBlockTitle, setShouldChangeBlockTitle] = useState(false)

  const handleToggleAccordion = (isExpanded: boolean, blockIndex: number) => {
    console.log({ isExpanded })

    if (!isExpanded)
      return setExpandedAccordions(
        expandedAccordions.filter((accordion) => accordion !== blockIndex)
      )

    return setExpandedAccordions([...expandedAccordions, blockIndex])
  }

  const handleEditBlockTitle = () => {
    setShouldChangeBlockTitle(true)
  }

  let clickCount = 0
  const handleClickOrDoubleClick =
    (blockIndex: number) => (_: any, isExpanded: boolean) => {
      clickCount += 1

      setTimeout(() => {
        if (clickCount === 1) handleToggleAccordion(isExpanded, blockIndex)
        else if (clickCount === 2) handleEditBlockTitle()

        clickCount = 0
      }, 250)
    }

  const handleChangeSheetValues = (
    dataBlockIndex: number,
    fieldIndex: number,
    value: number | string,
    inputField: SheetInputFieldKey = "value"
  ) => {
    if (!sheetDataRef) return

    const selectedBlock = templateWithValues[dataBlockIndex]
    const selectedField: any = selectedBlock.inputFields[fieldIndex]
    selectedField[inputField] = value

    sheetDataRef.current = templateWithValues
  }

  const handleFinishTitleEditing = () => {
    setShouldChangeBlockTitle(false)
  }

  return (
    <SheetView
      data={template}
      edit={!!edit}
      expandedAccordions={expandedAccordions}
      shouldChangeBlockTitle={shouldChangeBlockTitle}
      onChangeAccordion={handleClickOrDoubleClick}
      onChangeSheetValues={handleChangeSheetValues}
      onChangeSheetBlockTitle={handleChangeSheetBlockTitle}
      onFinishTitleEditing={handleFinishTitleEditing}
      onRemove={onRemove}
    />
  )
}
