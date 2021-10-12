import React, { FunctionComponent } from "react"
import { PopupMenu } from "@/common/popup-menu"
import {
  ChangeSheetValuesEvent,
  GridPosition,
  SheetDataBlock,
} from "./sheet-types"
import { MenuAction } from "@/common/popup-menu/popup-menu-types"
import { useSheetBuilderContext } from "@/sheet-builder/sheet-builder-context"
import { createStyles, makeStyles } from "@mui/styles"
import {
  ArrowDropDownCircleOutlined,
  CheckBoxRounded,
  TextFieldsRounded,
  ExpandMore
} from "@mui/icons-material"
import {
  TextFieldProps,
  TextField,
  Rating,
  Box,
  MenuItem,
  Theme,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material"
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { isNil } from "lodash"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        marginBottom: theme.spacing(1),
      },
    },
  })
)

interface SheetViewProps {
  data: SheetDataBlock[]
  edit: boolean
  onChangeSheetValues: ChangeSheetValuesEvent
}

export default function SheetView(props: SheetViewProps) {
  const { data, edit, onChangeSheetValues: handleChangeSheetValues } = props
  const { openDialog } = useSheetBuilderContext()
  const classes = useStyles()

  const getGridArea = (position: GridPosition) => ({
    gridArea: `${position?.rowStart} / ${position?.columnStart} /
          ${position?.rowEnd} / ${position?.columnEnd}`,
  })

  return (
    <form className="sheet" noValidate autoComplete="off">
      {data?.map((block, blockIndex) => {
        const menuActions: MenuAction[] = [
          {
            name: "Input",
            icon: <TextFieldsRounded />,
            func: openDialog("text", blockIndex),
          },
          {
            name: "Select",
            icon: <ArrowDropDownCircleOutlined />,
            func: openDialog("select", blockIndex),
          },
          {
            name: "Checkbox",
            icon: <CheckBoxRounded />,
            func: openDialog("checkbox", blockIndex),
          },
        ]

        return (
          <Accordion
            key={blockIndex}
            className={`sheet-block ${classes.root}`}
            style={getGridArea(block.position)}
            elevation={3}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{block.title ?? `Block ${blockIndex}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {block.inputFields.map((input, inputIndex) => {
                const { label, type, position, value } = input
                const defaultProps: TextFieldProps = {
                  label,
                  value,
                  type,
                  style: getGridArea(position),
                  variant: "standard",
                  onChange: handleChangeSheetValues(blockIndex, inputIndex),
                }

                const Input: FunctionComponent<TextFieldProps> = ({
                  children,
                  ...rest
                }) => (
                  <TextField {...defaultProps} {...rest}>
                    {children}
                  </TextField>
                )

                const key = `${label}_${type}_${blockIndex}`
                switch (type) {
                  case "number":
                  case "text":
                    return <Input key={key} />
                  case "select": {
                    const { options, isMultiSelect } = input
                    return (
                      <Input
                        key={key}
                        select={type === "select"}
                        SelectProps={
                          isMultiSelect ? { multiple: true } : undefined
                        }
                      >
                        {options.map((option, optionIndex) => (
                          <MenuItem key={optionIndex} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Input>
                    )
                  }
                  case "checkbox": {
                    const { quantity, isPrecisionRating, numberValue } = input

                    const renderRating = () => <Rating
                      value={value as number}
                      max={quantity}
                      precision={isPrecisionRating ? 0.5 : 1}
                      defaultValue={0}
                      icon={<CheckBoxIcon />}
                      emptyIcon={<CheckBoxOutlineBlankIcon />}
                      onChange={handleChangeSheetValues(
                        blockIndex,
                        inputIndex
                      )}
                    />

                    return (
                      <Box key={key} sx={{ display: "flex", marginTop: '1rem' }} >
                        {quantity === 1 && renderRating()}
                        <Typography flexGrow={1} component="legend">{label}</Typography>
                        {quantity > 1 && renderRating()}
                        {!isNil(numberValue) && (
                          <TextField
                            sx={{ width: '2.5rem', 'input': { textAlign: 'center', padding: '.25rem' } }}
                            type="number"
                            inputProps={{
                              min: -999,
                              max: 999,
                              pattern: '\d+'
                            }}
                            value={numberValue}
                            onChange={handleChangeSheetValues(
                              blockIndex,
                              inputIndex,
                              "numberValue"
                            )}
                          />
                        )}

                      </Box>
                    )
                  }
                }
              })}
              {edit && <PopupMenu id="add-component" actions={menuActions} />}
            </AccordionDetails>
          </Accordion>

        )
      })}

      <style jsx global>{`
        .sheet {
          margin: 1rem;

          .sheet-block {
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            padding: 1rem;
            background: linear-gradient(0deg, #424242 0%, #464646 100%);

            .title {
              margin: 0;
              font-size: 1rem;
            }
          }
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
