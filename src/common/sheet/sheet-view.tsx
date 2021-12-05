import { GridPosition, SheetDataBlock, SheetInputFieldKey } from "./sheet-types"
import { ExpandMore, Delete as DeleteIcon } from "@mui/icons-material"
import {
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  TextField,
} from "@mui/material"
import { AddElementMenu } from "./components/add-element-menu"
import { SheetInput } from "./components/sheet-input"
import { ChangeEvent } from "react"

interface SheetViewProps {
  data: SheetDataBlock[]
  edit: boolean
  expandedAccordions: number[]
  shouldChangeBlockTitle: boolean
  onChangeAccordion: (
    blockIndex: number
  ) => (_: any, isExpanded: boolean) => void
  onChangeSheetValues: (
    dataBlockIndex: number,
    fieldIndex: number,
    value: number | string,
    inputField?: SheetInputFieldKey
  ) => void
  onChangeSheetBlockTitle: (
    blockIndex: number
  ) => (e: ChangeEvent<HTMLInputElement>) => void
  onFinishTitleEditing: VoidFunction
  onRemove?: (blockIndex: number) => VoidFunction
}

export default function SheetView(props: SheetViewProps) {
  const {
    data,
    edit = false,
    expandedAccordions,
    shouldChangeBlockTitle,
    onChangeAccordion,
    onChangeSheetValues: handleChangeSheetValues,
    onChangeSheetBlockTitle: handleChangeSheetBlockTitle,
    onFinishTitleEditing: handleFinishTitleEditing,
    onRemove: handleRemove,
  } = props

  const getGridArea = (position: GridPosition) => ({
    gridArea: `${position?.rowStart} / ${position?.columnStart} /
          ${position?.rowEnd} / ${position?.columnEnd}`,
  })

  return (
    <form className="sheet" noValidate autoComplete="off">
      {data?.map((block, blockIndex) => {
        return (
          <Accordion
            key={`block_${block.title}_${blockIndex}`}
            style={getGridArea(block.position)}
            elevation={3}
            expanded={expandedAccordions.includes(blockIndex)}
            onChange={onChangeAccordion(blockIndex)}
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

              {edit && shouldChangeBlockTitle ? (
                <TextField
                  autoFocus
                  id={`block-title-${blockIndex}`}
                  value={block.title ?? `Block ${blockIndex}`}
                  onChange={handleChangeSheetBlockTitle(blockIndex)}
                  onBlur={handleFinishTitleEditing}
                />
              ) : (
                <Typography>{block.title ?? `Block ${blockIndex}`}</Typography>
              )}
            </AccordionSummary>

            <AccordionDetails>
              {block.inputFields.map((input, inputIndex) => (
                <SheetInput
                  key={`field_${input.label}_${input.type}_${inputIndex}`}
                  input={input}
                  inputIndex={inputIndex}
                  getGridArea={getGridArea}
                  handleChangeSheetValues={handleChangeSheetValues}
                  blockIndex={blockIndex}
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
        }

        @media screen and (min-width: 640px) {
          .sheet {
            grid-area: main;

            &,
            .sheet-block {
              display: grid;
              grid-gap: 1rem;
              grid-template-columns: repeat(12, 1fr);
            }
          }
        }
      `}</style>
    </form>
  )
}
