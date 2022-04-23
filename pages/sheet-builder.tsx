import { useState } from "react"
import { Sheet } from "@/common/sheet"
import { SheetInputField, SheetDataBlock } from "@/common/sheet/sheet-types"
import ComponentEditorDialog from "@/sheet-builder/component-editor-dialog/component-editor-dialog-container"
import SheetBuilderContextProvider from "@/sheet-builder/sheet-builder-context"
import { Button } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import SaveIcon from "@mui/icons-material/Save"
import dedTemplate from "@/sheet-builder/sheet-templates/dungeons-and-dragons-5e"

export default function SheetBuilder() {
  const emptySheetBlock: SheetDataBlock = {
    position: {
      rowStart: 1,
      columnStart: 1,
      rowEnd: 2,
      columnEnd: 13,
    },
    inputFields: [],
  }

  const [sheetTemplate, setSheetTemplate] = useState<SheetDataBlock[]>([
    //emptySheetBlock,
    ...(dedTemplate as any),
  ])

  const handleAddSheetBlock = () => {
    setSheetTemplate([...sheetTemplate, emptySheetBlock])
  }

  const handleAddSheetElement = (
    newField: SheetInputField,
    selectedBlockIndex: number,
    insertAt?: number
  ) => {
    const data = Array.from(sheetTemplate)

    const lastIndex = data[selectedBlockIndex].inputFields.length

    data[selectedBlockIndex].inputFields.splice(
      insertAt ?? lastIndex,
      0,
      newField
    )

    setSheetTemplate(data)
  }

  const handleChangeSheetBlockTitle = (blockIndex: number, value: string) => {
    const newTemplate = Array.from(sheetTemplate)

    newTemplate[blockIndex].title = value
    setSheetTemplate(newTemplate)
  }

  const handleRemoveSheetBlock = (blockIndex: number) => () => {
    const newSheetTemplate = Array.from(sheetTemplate)
    newSheetTemplate.splice(blockIndex, 1)
    setSheetTemplate(newSheetTemplate)
  }

  return (
    <SheetBuilderContextProvider>
      <main className="main">
        <Sheet
          edit
          template={sheetTemplate}
          onChangeSheetBlockTitle={handleChangeSheetBlockTitle}
          onRemove={handleRemoveSheetBlock}
        />
        <Button
          className="add-block-btn"
          variant="contained"
          endIcon={<AddIcon />}
          style={{ margin: "0 1rem", width: "calc(100% - 2rem)" }}
          onClick={handleAddSheetBlock}
        >
          New block
        </Button>
        <Button
          className="save-template-btn"
          variant="contained"
          endIcon={<SaveIcon />}
          style={{ margin: "0 1rem", width: "calc(100% - 2rem)" }}
          onClick={() => console.log(JSON.stringify(sheetTemplate))}
        >
          Save
        </Button>
        <ComponentEditorDialog onAddSheetElement={handleAddSheetElement} />
        <style jsx>
          {`
            .main {
              padding-bottom: 6rem;
              font-size: 3rem;
            }

            @media screen and (min-width: 640px) {
              .main {
                //display: grid;
                //grid-template-areas: "toolbar main";
                //grid-template-columns: 3rem 1fr;
              }
            }
          `}
        </style>
      </main>
    </SheetBuilderContextProvider>
  )
}
