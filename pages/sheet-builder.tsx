import { Sheet } from "@/Common/Sheet";
import { SheetField, SheetElements } from "@/Common/Sheet/sheet-container";
import { newArray } from "@/helpers/array";
import faker from "faker";
faker.seed(1);

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
];

function fakeField(_: never, i: number): SheetField {
  const type: SheetElements =
    i === 3
      ? "container"
      : faker.random.arrayElement(["text", "number", "select"]);
  return {
    type,
    position: positions[i],
    label: faker.internet.userName(),
    fields: i === 3 ? newArray(3, (_, i) => fakeField(_, i + 7)) : undefined,
    options: type === "select" ? faker.random.words(5).split(" ") : undefined,
  };
}

const fields: SheetField[] = newArray(positions.length - 3, fakeField);

export default function SheetBuilder() {
  return (
    <>
      <Sheet fields={fields} />
    </>
  );
}
