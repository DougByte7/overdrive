import theme from "@/theme"
import { TextField, MenuItem, Paper } from "@material-ui/core"
import faker from "faker"
faker.seed(1)

export type SheetFiledType = "text" | "number" | "select"

type GridPosition = {
  rowStart: number
  columnStart: number
  rowEnd: number
  columnEnd: number
}

export type SheetInputField = {
  type: SheetFiledType
  position: GridPosition
  label: string
  value: string | number
  options?: string[]
}

export interface SheetDataBlock {
  position: GridPosition
  inputFields: SheetInputField[]
}

interface SheetProps {
  data: SheetDataBlock[]
  onChangeSheetValues: (
    dataBlockIndex: number,
    fieldIndex: number
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Sheet(props: SheetProps) {
  const { data, onChangeSheetValues: handleChangeSheetValues } = props

  const getGridArea = (position: GridPosition) => ({
    gridArea: `${position?.rowStart} / ${position?.columnStart} /
        ${position?.rowEnd} / ${position?.columnEnd}`,
  })

  return (
    <Paper className="sheet" elevation={1}>
      <form className="sheet-block" noValidate autoComplete="off">
        {data?.map((block, blockIndex) => {
          return (
            <Paper
              key={blockIndex}
              className="sheet-block"
              style={getGridArea(block.position)}
              elevation={3}
            >
              {block.inputFields.map((input, inputIndex) => {
                const { label, type, position, value, options } = input
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
                        onChange={handleChangeSheetValues(
                          blockIndex,
                          inputIndex
                        )}
                      >
                        {options?.map((option, optionIndex) => (
                          <MenuItem key={optionIndex} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    )
                }
              })}
            </Paper>
          )
        })}
      </form>
      <style jsx global>{`
        .sheet {
          grid-area: main;
          margin: 1rem;

          .sheet-block {
            padding: 1rem;
            display: grid;
            grid-gap: 1rem;
            grid-template-columns: repeat(12, 1fr);
          }
        }
      `}</style>
    </Paper>
  )
}
