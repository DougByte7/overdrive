import { FocusEventHandler } from "react"
import type {
  GridPosition,
  SheetDataBlock,
  SheetFieldType,
} from "./sheet-types"
import {
  ExpandMore,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material"
import { AddElementMenu } from "./components/add-element-menu"
import { SheetInput } from "./components/sheet-input"
import { BlockTitle } from "./components/block-title"
import { css } from "@emotion/react"
import theme from "@/theme"
import { useSheetBuilderContext } from "@/sheet-builder/sheet-builder-context"

interface SheetViewProps {
  sheetDataBlocks: SheetDataBlock[]
  edit: boolean
  expandedAccordions: number[]
  shouldChangeBlockTitle: number
  onToggleAccordion: (
    blockIndex: number
  ) => (_: any, isExpanded: boolean) => void
  onEditTitleOrChangeAccordion: (blockIndex: number) => VoidFunction
  onSelectElement: (selectedElement: {
    blockIndex: number
    elementIndex: number
  }) => (type: SheetFieldType) => VoidFunction
  onSaveBlockTitle: FocusEventHandler
}

export default function SheetView(props: SheetViewProps) {
  const {
    sheetDataBlocks,
    edit = false,
    expandedAccordions,
    shouldChangeBlockTitle,
    onToggleAccordion: handleToggleAccordion,
    onEditTitleOrChangeAccordion: handleEditTitleOrChangeAccordion,
    onSelectElement: handleSelectElement,
    onSaveBlockTitle: handleSaveBlockTitle,
  } = props

  const { removeSheetBlock } = useSheetBuilderContext()

  const getGridArea = (position: GridPosition) => {
    return {
      gridArea: `${position?.rowStart} / ${position?.columnStart} /
      ${position?.rowEnd} / ${position?.columnEnd}`,
    }
  }

  const minWidth850 = useMediaQuery("(min-width:850px)")

  const Container = minWidth850 ? (Paper as any) : Accordion

  const handleChangeSheetValues = () =>
    console.warn("handleChangeSheetValues is not implemented")

  let lastLine = 1
  return (
    <form css={styles} noValidate autoComplete="off">
      {sheetDataBlocks?.map((block, blockIndex) => {
        lastLine =
          block.position.rowEnd > lastLine ? block.position.rowEnd : lastLine

        return (
          <Container
            key={`block_${block.title}_${blockIndex}`}
            style={getGridArea(block.position)}
            elevation={3}
            expanded={expandedAccordions.includes(blockIndex)}
            onChange={handleToggleAccordion(blockIndex)}
          >
            <AccordionSummary
              expandIcon={!minWidth850 && <ExpandMore />}
              aria-controls={`panel${blockIndex}-content`}
              id={`panel${blockIndex}-header`}
              sx={{
                ".MuiAccordionSummary-content": {
                  alignItems: "center",
                },
              }}
            >
              {edit && (
                <IconButton
                  sx={{ paddingLeft: 0 }}
                  aria-label="delete block"
                  onClick={removeSheetBlock(blockIndex)}
                >
                  <DeleteIcon />
                </IconButton>
              )}

              <BlockTitle
                isEditMode={edit && shouldChangeBlockTitle === blockIndex}
                blockIndex={blockIndex}
                title={block.title}
                onSaveBlockTitle={handleSaveBlockTitle!}
                onClick={handleEditTitleOrChangeAccordion(blockIndex)}
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
      <Button
        sx={{
          ...getGridArea({
            columnStart: 1,
            columnEnd: 8,
            rowStart: lastLine,
            rowEnd: lastLine + 1,
          }),
          height: "200px",
          paddingInline: 0,
        }}
      >
        <Paper
          sx={{
            width: "100%",
            height: "100%",
            padding: theme.spacing(2),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          elevation={3}
        >
          <AddIcon />
          <Typography align="center">New block</Typography>
        </Paper>
      </Button>
    </form>
  )
}

const styles = css`
  max-width: 750px;
  height: max-content;
  margin: ${theme.spacing(2)};

  &,
  .sheet-block {
    display: flex;
    flex-direction: column;
  }

  .sheet-block {
    gap: ${theme.spacing(1)};
  }

  @media screen and (min-width: 850px) {
    grid-area: main;
    grid-template-columns: repeat(16, minmax(0, 1fr));
    gap: ${theme.spacing(2)};

    &,
    .sheet-block {
      display: grid;
    }
  }
`
