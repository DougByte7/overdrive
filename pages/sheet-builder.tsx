import { Sheet } from "@/common/sheet"
import {
  SheetInputField,
  SheetFiledType,
  SheetDataBlock,
} from "@/common/sheet/sheet-container"
import { newArray } from "@/helpers/array"
import ComponentSelector from "@/sheet-builder/component-selector/component-selector-container"
import { timeEnd } from "console"
import faker from "faker"
import { useState } from "react"
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
  const type: SheetFiledType = faker.random.arrayElement([
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
    {
      position: {
        rowStart: 2,
        columnStart: 1,
        rowEnd: 3,
        columnEnd: 7,
      },
      inputFields: newArray(positions.length, fakeField),
    },
    {
      position: {
        rowStart: 2,
        columnStart: 7,
        rowEnd: 3,
        columnEnd: 13,
      },
      inputFields: newArray(positions.length, fakeField),
    },
  ])

  const addSheetElement = (
    newField: SheetInputField,
    position?: number,
    selectedBlock = Math.max(0, fields.length - 1)
  ) => {
    const data = Array.from(fields)

    const insertAt =
      position === undefined ? data[selectedBlock].inputFields.length : position
    data[selectedBlock].inputFields.splice(insertAt, 0, newField)

    setFields(data)
  }

  const handleChangeSheetValues = (
    dataBlockIndex: number,
    fieldIndex: number
  ) => ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    const newFields = Array.from(fields)
    newFields[dataBlockIndex].inputFields[fieldIndex].value = value
    setFields(newFields)
  }

  return (
    <main className="main">
      <ComponentSelector sheetData={fields} addSheetElement={addSheetElement} />
      <Sheet data={fields} onChangeSheetValues={handleChangeSheetValues} />

      <style jsx>
        {`
          .main {
            font-size: 3rem;

            @media screen and (min-width: 640px) {
              display: grid;
              grid-template-areas: "toolbar main";
              grid-template-columns: 3rem 1fr;
            }
          }
        `}
      </style>
    </main>
  )
}
