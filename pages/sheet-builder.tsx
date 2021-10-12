import { useState } from "react"
import { Sheet } from "@/common/sheet"
import {
  SheetInputField,
  SheetDataBlock,
  SheetInputFieldKey,
} from "@/common/sheet/sheet-types"
import ComponentEditorDialog from "@/sheet-builder/component-editor-dialog/component-editor-dialog-container"
import ComponentSelector from "@/sheet-builder/component-selector/component-selector-container"
import SheetBuilderContextProvider from "@/sheet-builder/sheet-builder-context"
import { Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';

export default function SheetBuilder() {
  const emptySheetBock = {
    position: {
      rowStart: 1,
      columnStart: 1,
      rowEnd: 2,
      columnEnd: 13,
    },
    inputFields: []
  }

  const [fields, setFields] = useState<SheetDataBlock[]>([emptySheetBock])

  const handleAddSheetBlock = () => {
    setFields([...fields, emptySheetBock])
  }

  const handleAddSheetElement = (
    newField: SheetInputField,
    selectedBlockIndex: number,
    insertAt?: number
  ) => {
    const data = Array.from(fields)

    const lastIndex = data[selectedBlockIndex].inputFields.length

    data[selectedBlockIndex].inputFields.splice(
      insertAt ?? lastIndex,
      0,
      newField
    )

    setFields(data)
  }

  const handleChangeSheetValues =
    (dataBlockIndex: number, fieldIndex: number, inputField: SheetInputFieldKey = 'value') =>
      ({ currentTarget }: React.ChangeEvent<HTMLInputElement> | React.SyntheticEvent<Element, Event>, value: any) => {
        const newFields: any = Array.from(fields)

        const type = newFields[dataBlockIndex].inputFields[fieldIndex].type

        newFields[dataBlockIndex].inputFields[fieldIndex][inputField] =
          type === "checkbox" && inputField === 'value'
            ? value
            : (currentTarget as EventTarget & HTMLInputElement).value
        setFields(newFields)
      }

  return (
    <SheetBuilderContextProvider>
      <main className="main">
        <Sheet
          data={fields}
          onChangeSheetValues={handleChangeSheetValues}
          edit
        />
        <Button
          className="add-block-btn"
          variant="contained"
          endIcon={<AddIcon />}
          style={{ margin: '0 1rem', width: 'calc(100% - 2rem)' }}
          onClick={handleAddSheetBlock}
        >
          Add block
        </Button>
        {
          // Floating Menu, need to rename
          <ComponentSelector />
        }
        <ComponentEditorDialog onAddSheetElement={handleAddSheetElement} />
        <style jsx>
          {`
            .main {
              padding-bottom: 6rem;
              font-size: 3rem;              
            }

            @media screen and (min-width: 640px) {
              .main { 
                display: grid;
                grid-template-areas: "toolbar main";
                grid-template-columns: 3rem 1fr;
              }
            }
          `}
        </style>
      </main>
    </SheetBuilderContextProvider>
  )
}
