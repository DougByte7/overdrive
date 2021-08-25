import { Sheet } from "@/common/sheet"
import {
  SheetInputField,
  SheetFieldType,
  SheetDataBlock,
} from "@/common/sheet/sheet-types"
import { newArray } from "@/helpers/array"
import ComponentEditorDialog from "@/sheet-builder/component-editor-dialog/component-editor-dialog-container"
import ComponentSelector from "@/sheet-builder/component-selector/component-selector-container"
import SheetBuilderContextProvider from "@/sheet-builder/sheet-builder-context"
import faker from "faker"
import React, { useState } from "react"

faker.seed(1)

const positions = [
  {
    rowStart: 1,
    columnStart: 1,
    rowEnd: 2,
    columnEnd: 5,
  },
  {
    rowStart: 1,
    columnStart: 5,
    rowEnd: 2,
    columnEnd: 9,
  },
  {
    rowStart: 1,
    columnStart: 9,
    rowEnd: 2,
    columnEnd: 13,
  },
  {
    rowStart: 2,
    columnStart: 1,
    rowEnd: 3,
    columnEnd: 13,
  },
  {
    rowStart: 4,
    columnStart: 1,
    rowEnd: 5,
    columnEnd: 5,
  },
  {
    rowStart: 4,
    columnStart: 5,
    rowEnd: 5,
    columnEnd: 9,
  },
  {
    rowStart: 4,
    columnStart: 9,
    rowEnd: 5,
    columnEnd: 13,
  },
]

// TODO Backend /////////////////////////////////////////////////////////
function fakeField(_: never, i: number): SheetInputField {
  const type: SheetFieldType = faker.random.arrayElement([
    "text",
    "number",
    "select",
  ])

  const field: SheetInputField = {
    type,
    position: positions[i],
    label: faker.internet.userName(),
    value: "",
  }

  if (type === "select") {
    field.options = faker.random.words(5).split(" ")
  }

  return field
}

////////////////////////////////////////////////////////////////////////

export default function SheetBuilder() {
  const [fields, setFields] = useState<SheetDataBlock[]>([
    {
      position: {
        rowStart: 1,
        columnStart: 1,
        rowEnd: 2,
        columnEnd: 13,
      },
      inputFields: newArray(positions.length, fakeField),
    },
  ])

  const handleAddSheetElement = (
    newField: SheetInputField,
    selectedBlockIndex: number,
    insertAt?: number
  ) => {
    const data = Array.from(fields)

    const lastIndex = data[selectedBlockIndex].inputFields.length
    console.log(newField)

    data[selectedBlockIndex].inputFields.splice(
      insertAt ?? lastIndex,
      0,
      newField
    )

    setFields(data)
  }

  const handleChangeSheetValues =
    (dataBlockIndex: number, fieldIndex: number) =>
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      const newFields = Array.from(fields)

      newFields[dataBlockIndex].inputFields[fieldIndex].value = value
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
