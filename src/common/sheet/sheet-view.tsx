import { createElement, FocusEventHandler } from "react"
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
  Paper,
  useMediaQuery,
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

  const minWidth800 = useMediaQuery("(min-width:800px)")

  const Container = minWidth800 ? (Paper as any) : Accordion

  return (
    <form className="sheet" noValidate autoComplete="off">
      {sheetDataBlocks?.map((block, blockIndex) => {
        return (
          <Container
            key={`block_${block.title}_${blockIndex}`}
            style={getGridArea(block.position)}
            elevation={3}
            expanded={expandedAccordions.includes(blockIndex)}
            onChange={onEditTitleOrChangeAccordion(blockIndex)}
          >
            <AccordionSummary
              expandIcon={!minWidth800 && <ExpandMore />}
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

            <AccordionDetails
              className="sheet-block"
              style={{
                padding: 8,
                gridTemplateColumns: `repeat(${
                  block.position.columnEnd - block.position.columnStart
                }, minmax(0, 1fr))`,
              }}
            >
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
          </Container>
        )
      })}

      <style jsx global>{`
        .sheet {
          margin: 16px;

          &,
          .sheet-block {
            display: flex;
            flex-direction: column;
          }

          .sheet-block {
            gap: 8px;
          }
        }

        @media screen and (min-width: 850px) {
          .sheet {
            grid-area: main;
            grid-template-columns: repeat(16, minmax(0, 1fr));
            gap: 16px;

            &,
            .sheet-block {
              display: grid;
            }
          }
        }
      `}</style>
    </form>
  )
}
