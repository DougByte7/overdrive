import SheetView from "./sheet-view"
import {
  SheetDataBlock,
  SheetFieldType,
  SheetInputFieldKey,
} from "./sheet-types"
import {
  FocusEventHandler,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { ElementSettingsMenu } from "./components/element-settings-menu"
import { useSheetBuilderContext } from "@/sheet-builder/sheet-builder-context"

interface SheetProps {
  template: SheetDataBlock[]
  edit?: boolean
  sheetDataRef?: MutableRefObject<SheetDataBlock[]>
  onChangeSheetBlockTitle?: (blockIndex: number, value: string) => void
  onRemove?: (blockIndex: number) => VoidFunction
  onRemoveElement: (blockIndex: number, elementIndex: number) => void
}

export default function Sheet(props: SheetProps) {
  const {
    template,
    edit,
    sheetDataRef,
    onChangeSheetBlockTitle: handleChangeSheetBlockTitle,
    onRemove,
    onRemoveElement: handleRemoveElement,
  } = props
  const templateWithValues = useMemo(() => template, [template])
  const [expandedAccordions, setExpandedAccordions] = useState<number[]>([])
  const [shouldChangeBlockTitle, setShouldChangeBlockTitle] =
    useState<number>(-1)
  const [selectedElement, setSelectedElement] = useState<{
    type: SheetFieldType
    blockIndex: number
    elementIndex: number
  } | null>()

  const handleSelectElement =
    (selectedElement: { blockIndex: number; elementIndex: number }) =>
    (type: SheetFieldType) =>
    () => {
      if (!edit) return

      setSelectedElement({ type, ...selectedElement })
    }

  const handleUnselectElement = useCallback(() => {
    setSelectedElement(null)
  }, [setSelectedElement])

  useEffect(() => {
    window.addEventListener("scroll", handleUnselectElement)

    return () => window.removeEventListener("scroll", handleUnselectElement)
  }, [handleUnselectElement])

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
      handleUnselectElement()

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

  const { openDialog } = useSheetBuilderContext()
  const handleEditSelectedElement = () => {
    const mappedType = {
      text: "text",
      number: "text",
      select: "select",
      checkbox: "checkbox",
      textarea: "text",
      numberWithModifier: "text",
    }[selectedElement!.type] as SheetFieldType

    openDialog(
      mappedType,
      selectedElement!.blockIndex,
      selectedElement!.elementIndex
    )()
  }

  const handleDeleteSelectedElement = () => {
    handleRemoveElement(
      selectedElement!.blockIndex,
      selectedElement!.elementIndex
    )
    handleUnselectElement()
  }

  return (
    <>
      <SheetView
        sheetDataBlocks={template}
        edit={!!edit}
        expandedAccordions={expandedAccordions}
        shouldChangeBlockTitle={shouldChangeBlockTitle}
        onEditTitleOrChangeAccordion={handleClickOrDoubleClick}
        onSelectElement={handleSelectElement}
        onChangeSheetValues={handleChangeSheetValues}
        onSaveBlockTitle={handleSaveBlockTitle}
        onRemove={onRemove}
      />
      {edit && (
        <ElementSettingsMenu
          isVisible={!!selectedElement}
          handleEdit={handleEditSelectedElement}
          handleDelete={handleDeleteSelectedElement}
        />
      )}
    </>
  )
}
