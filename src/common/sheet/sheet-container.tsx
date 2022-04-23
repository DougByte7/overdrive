import SheetView from "./sheet-view"
import { SheetDataBlock, SheetInputFieldKey } from "./sheet-types"
import { FocusEventHandler, MutableRefObject, useMemo, useState } from "react"

interface SheetProps {
  template: SheetDataBlock[]
  edit?: boolean
  sheetDataRef?: MutableRefObject<SheetDataBlock[]>
  onChangeSheetBlockTitle?: (blockIndex: number, value: string) => void
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
  const [shouldChangeBlockTitle, setShouldChangeBlockTitle] =
    useState<number>(-1)

  const handleToggleAccordion = (isExpanded: boolean, blockIndex: number) => {
    if (!isExpanded)
      return setExpandedAccordions(
        expandedAccordions.filter((accordion) => accordion !== blockIndex)
      )

    return setExpandedAccordions([...expandedAccordions, blockIndex])
  }

  const handleEditBlockTitle = (blockIndex: number) => {
    setShouldChangeBlockTitle(blockIndex)
  }

  let clickCount = 0
  const handleClickOrDoubleClick =
    (blockIndex: number) => (_: any, isExpanded: boolean) => {
      clickCount += 1

      setTimeout(() => {
        if (clickCount === 1) handleToggleAccordion(isExpanded, blockIndex)
        else if (clickCount === 2) handleEditBlockTitle(blockIndex)

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

  const handleSaveBlockTitle: FocusEventHandler<HTMLInputElement> = (e) => {
    setShouldChangeBlockTitle(-1)

    const element = e.target
    const blockIndex = Number(element.id.replace("block-title-", ""))

    handleChangeSheetBlockTitle?.(blockIndex, element.value)
  }

  return (
    <SheetView
      sheetDataBlocks={template}
      edit={!!edit}
      expandedAccordions={expandedAccordions}
      shouldChangeBlockTitle={shouldChangeBlockTitle}
      onEditTitleOrChangeAccordion={handleClickOrDoubleClick}
      onChangeSheetValues={handleChangeSheetValues}
      onSaveBlockTitle={handleSaveBlockTitle}
      onRemove={onRemove}
    />
  )
}
