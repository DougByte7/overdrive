import type { FocusEventHandler } from "react"
import type {
  GridPosition,
  SheetDataBlock,
  SheetFieldType,
  SheetInputFieldKey,
} from "./sheet-types"
import { ExpandMore, Delete as DeleteIcon } from "@mui/icons-material"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
} from "@mui/material"
import { AddElementMenu } from "./components/add-element-menu"
import { SheetInput } from "./components/sheet-input"
import { BlockTitle } from "./components/block-title"

interface SheetViewProps {
  sheetDataBlocks: SheetDataBlock[]
  edit: boolean
  expandedAccordions: number[]
  shouldChangeBlockTitle: number
  onEditTitleOrChangeAccordion: (
    blockIndex: number
  ) => (_: any, isExpanded: boolean) => void
  onSelectElement: (selectedElement: {
    blockIndex: number
    elementIndex: number
  }) => (type: SheetFieldType) => VoidFunction
  onChangeSheetValues: (
    dataBlockIndex: number,
    fieldIndex: number,
    value: number | string,
    inputField?: SheetInputFieldKey
  ) => void
  onSaveBlockTitle?: FocusEventHandler
  onRemove?: (blockIndex: number) => VoidFunction
}

export default function SheetView(props: SheetViewProps) {
  const {
    sheetDataBlocks,
    edit = false,
    expandedAccordions,
    shouldChangeBlockTitle,
    onEditTitleOrChangeAccordion,
    onSelectElement: handleSelectElement,
    onChangeSheetValues: handleChangeSheetValues,
    onSaveBlockTitle: handleSaveBlockTitle,
    onRemove: handleRemove,
  } = props

  const getGridArea = (position: GridPosition) => ({
    gridArea: `${position?.rowStart} / ${position?.columnStart} /
          ${position?.rowEnd} / ${position?.columnEnd}`,
  })

  return (
    <form className="sheet" noValidate autoComplete="off">
      {sheetDataBlocks?.map((block, blockIndex) => {
        return (
          <Accordion
            key={`block_${block.title}_${blockIndex}`}
            style={getGridArea(block.position)}
            elevation={3}
            expanded={expandedAccordions.includes(blockIndex)}
            onChange={onEditTitleOrChangeAccordion(blockIndex)}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls={`panel${blockIndex}-content`}
              id={`panel${blockIndex}-header`}
              sx={{
                ".MuiAccordionSummary-content": {
                  alignItems: "center",
                },
              }}
            >
              {edit && handleRemove && (
                <IconButton
                  aria-label="delete block"
                  onClick={handleRemove(blockIndex)}
                >
                  <DeleteIcon />
                </IconButton>
              )}

              <BlockTitle
                isEditMode={edit && shouldChangeBlockTitle === blockIndex}
                blockIndex={blockIndex}
                title={block.title}
                onSaveBlockTitle={handleSaveBlockTitle!}
              />
            </AccordionSummary>

            <AccordionDetails className="sheet-block">
              {block.inputFields.map((input, inputIndex) => (
                <SheetInput
                  key={`field_${input.label}_${input.type}_${inputIndex}`}
                  input={input}
                  blockIndex={blockIndex}
                  inputIndex={inputIndex}
                  getGridArea={getGridArea}
                  onSelectElement={handleSelectElement({
                    blockIndex,
                    elementIndex: inputIndex,
                  })}
                  handleChangeSheetValues={handleChangeSheetValues}
                />
              ))}

              {edit && <AddElementMenu blockIndex={blockIndex} />}
            </AccordionDetails>
          </Accordion>
        )
      })}

      <style jsx global>{`
        .sheet {
          margin: 1rem;

          .sheet-block {
            display: grid;
            grid-gap: 1rem;
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media screen and (min-width: 640px) {
          .sheet {
            display: grid;
            grid-gap: 1rem;
            grid-area: main;

            &,
            .sheet-block {
              grid-template-columns: repeat(12, 1fr);
            }
          }
        }
      `}</style>
    </form>
  )
}
