import SheetView from "./sheet-view"
import { SheetFieldType } from "./sheet-types"
import {
  FocusEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { ElementSettingsMenu } from "./components/element-settings-menu"
import { useSheetBuilderContext } from "@/sheet-builder/sheet-builder-context"

interface SheetProps {
  edit?: boolean
}

export default function Sheet(props: SheetProps) {
  const { sheetTemplate, openDialog, renameSheetBlock, removeSheetElement } =
    useSheetBuilderContext()
  const { edit } = props
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

  const handleToggleAccordion =
    (blockIndex: number) => (_: any, isExpanded: boolean) => {
      if (!isExpanded)
        return setExpandedAccordions(
          expandedAccordions.filter((accordion) => accordion !== blockIndex)
        )

      setExpandedAccordions([...expandedAccordions, blockIndex])
    }

  const handleEditBlockTitle = (blockIndex: number) => {
    setShouldChangeBlockTitle(blockIndex)
  }

  let clickCount = 0
  const handleClickOrDoubleClick = (blockIndex: number) => () => {
    handleUnselectElement()

    clickCount += 1

    setTimeout(() => {
      if (clickCount > 1) handleEditBlockTitle(blockIndex)

      clickCount = 0
    }, 250)
  }

  const handleSaveBlockTitle: FocusEventHandler<HTMLInputElement> = (e) => {
    setShouldChangeBlockTitle(-1)

    const element = e.target
    const blockIndex = Number(element.dataset.id)

    renameSheetBlock(blockIndex, element.value)
  }

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
    removeSheetElement(
      selectedElement!.blockIndex,
      selectedElement!.elementIndex
    )
    handleUnselectElement()
  }

  const memoizedSheet = useMemo(
    () => (
      <SheetView
        sheetDataBlocks={sheetTemplate}
        edit={!!edit}
        expandedAccordions={expandedAccordions}
        shouldChangeBlockTitle={shouldChangeBlockTitle}
        onToggleAccordion={handleToggleAccordion}
        onEditTitleOrChangeAccordion={handleClickOrDoubleClick}
        onSelectElement={handleSelectElement}
        onSaveBlockTitle={handleSaveBlockTitle}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sheetTemplate, expandedAccordions, shouldChangeBlockTitle]
  )

  return (
    <>
      {memoizedSheet}
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
