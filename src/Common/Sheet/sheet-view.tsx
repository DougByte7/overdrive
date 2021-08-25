import { PopupMenu } from "@/common/popup-menu"
import {
  ChangeSheetValuesEvent,
  GridPosition,
  SheetDataBlock,
} from "./sheet-types"
import { MenuAction } from "@/common/popup-menu/popup-menu-types"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import TextField from "@material-ui/core/TextField"
import MenuItem from "@material-ui/core/MenuItem"
import { useSheetBuilderContext } from "@/sheet-builder/sheet-builder-context"
import TextFieldsRounded from "@material-ui/icons/TextFieldsRounded"
import ArrowDropDownCircleOutlined from "@material-ui/icons/ArrowDropDownCircleOutlined"
import CheckBoxRounded from "@material-ui/icons/CheckBoxRounded"

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
          <Paper
            key={blockIndex}
            className={`sheet-block ${classes.root}`}
            style={getGridArea(block.position)}
            elevation={3}
          >
            {block.inputFields.map((input, inputIndex) => {
              const { label, type, position, value, options, isMultiSelect } =
                input
              const id = `${label}_${type}_${blockIndex}`
              const gridArea = getGridArea(position)

              switch (type) {
                case "number":
                case "text":
                case "select":
                  return (
                    <TextField
                      key={id}
                      label={label}
                      value={value}
                      type={type}
                      style={gridArea}
                      select={type === "select"}
                      SelectProps={
                        isMultiSelect ? { multiple: true } : undefined
                      }
                      onChange={handleChangeSheetValues(blockIndex, inputIndex)}
                    >
                      {options?.map((option, optionIndex) => (
                        <MenuItem key={optionIndex} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  )
                case "checkbox":
                  return <div>Not implemented yet</div>
              }
            })}
            {edit && <PopupMenu id="add-component" actions={menuActions} />}
          </Paper>
        )
      })}

      <style jsx global>{`
        .sheet {
          margin: 1rem;

          .sheet-block {
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            margin-bottom: 1rem;
            padding: 1rem;
            background: linear-gradient(0deg, #424242 0%, #464646 100%);
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
