import {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useState,
} from "react"
import {
  SheetDataBlock,
  SheetFieldType,
  SheetInputField,
} from "@/common/sheet/sheet-types"
import CheckboxForm from "./tools/sheet-components/forms/checkbox-form"
import InputForm from "./tools/sheet-components/forms/input-form"
import SelectForm from "./tools/sheet-components/forms/select-form"
import {
  AddSheetBlockEvent,
  AddSheetElementEvent,
  DialogData,
  ISheetBuilderContextData,
  RemoveSheetBlockEvent,
  RemoveSheetElementEvent,
  RenameSheetBlockEvent,
  SheetBuilderHandleOpenDialog,
  SheetElementsDescription,
} from "./sheet-builder-types"
import dedTemplate from "@/sheet-builder/sheet-templates/dungeons-and-dragons-5e"

const initialDialogData: DialogData = Object.freeze({
  title: "",
  description: "",
  content: undefined,
  isOpen: false,
  blockIndex: 0,
})

const initialNewComponent: SheetInputField = Object.freeze({
  type: "text",
  position: { rowStart: 1, columnStart: 1, rowEnd: 2, columnEnd: 12 },
  label: "",
  value: "",
})

const sheetElementsDescription: SheetElementsDescription = {
  input: {
    name: "Text field",
    description:
      "Text or number values like Name, Hit points, and Descriptions.",
  },
  select: {
    name: "Select",
    description: "List of values like Class, Occupation, and Race.",
  },
  checkbox: {
    name: "Checkbox",
    description:
      "Opposing states, or ranking like Abilities, Hunger, and Attributes.",
  },
}

const SheetBuilderContext = createContext<ISheetBuilderContextData>({
  sheetTemplate: [],
  dialogData: initialDialogData,
  newComponent: initialNewComponent,
  sheetElementsDescription,
  openDialog: () => () => console.warn("openDialog fn called"),
  closeDialog: () => console.warn("closeDialog fn called"),
  handleChangeNewComponent: () => console.warn("setNewComponent fn called"),
  addSheetBlock: () => console.warn("addSheetBlock fn called"),
  renameSheetBlock: () => console.warn("renameSheetBlock fn called"),
  removeSheetBlock: () => () => console.warn("removeSheetBlock fn called"),
  addSheetElement: () => console.warn("addSheetElement fn called"),
  removeSheetElement: () => console.warn("removeSheetElement fn called"),
})

const SheetBuilderContextProvider: FunctionComponent = ({ children }) => {
  const [sheetTemplate, setSheetTemplate] = useState<SheetDataBlock[]>([
    //emptySheetBlock,
    ...(dedTemplate as SheetDataBlock[]),
  ])

  const addSheetBlock: AddSheetBlockEvent = (position) => {
    setSheetTemplate([
      ...sheetTemplate,
      {
        position,
        inputFields: [],
      },
    ])
  }

  const renameSheetBlock: RenameSheetBlockEvent = (blockIndex, value) => {
    const newTemplate = Array.from(sheetTemplate)

    newTemplate[blockIndex].title = value
    setSheetTemplate(newTemplate)
  }

  const removeSheetBlock: RemoveSheetBlockEvent = (blockIndex) => () => {
    const newSheetTemplate = Array.from(sheetTemplate)
    newSheetTemplate.splice(blockIndex, 1)
    setSheetTemplate(newSheetTemplate)
  }

  const addSheetElement: AddSheetElementEvent = (
    newField,
    selectedBlockIndex,
    insertAt
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

  const removeSheetElement: RemoveSheetElementEvent = (
    blockIndex,
    elementIndex
  ) => {
    const data = Array.from(sheetTemplate)

    data[blockIndex].inputFields.splice(elementIndex, 1)

    setSheetTemplate(data)
  }

  const [dialogData, setDialogData] = useState<DialogData>(initialDialogData)
  const [newComponent, setNewComponent] =
    useState<SheetInputField>(initialNewComponent)

  const handleChangeDialogData = (newValues: Partial<DialogData>) => {
    setDialogData({
      ...dialogData,
      ...newValues,
    })
  }

  const handleChangeNewComponent = (newValues: Partial<SheetInputField>) => {
    setNewComponent({
      ...newComponent,
      ...(newValues as any),
    })
  }

  const closeDialog = () => {
    setDialogData(initialDialogData)
    setNewComponent(initialNewComponent)
  }

  const openDialog: SheetBuilderHandleOpenDialog =
    (type: SheetFieldType, blockIndex: number) => () => {
      const newDialogData = Object.assign({}, initialDialogData)
      newDialogData.isOpen = true
      newDialogData.blockIndex = blockIndex
      const setNewDialogContents = (
        title: string,
        description: string,
        content: ReactNode
      ) => {
        Object.assign(newDialogData, { title, description, content })
      }

      switch (type) {
        case "number":
        case "text":
          setNewDialogContents(
            sheetElementsDescription.input.name,
            sheetElementsDescription.input.description,
            <InputForm />
          )
          break
        case "select":
          setNewDialogContents(
            sheetElementsDescription.select.name,
            sheetElementsDescription.select.description,
            <SelectForm renderDictionaryEditor />
          )
          handleChangeNewComponent({ type: "select" })

          break
        case "checkbox":
          setNewDialogContents(
            sheetElementsDescription.checkbox.name,
            sheetElementsDescription.checkbox.description,
            <CheckboxForm />
          )
          handleChangeNewComponent({
            type: "checkbox",
            quantity: 1,
            isPrecisionRating: false,
          })
          break

        default:
          break
      }
      handleChangeDialogData(newDialogData)
    }

  const data: ISheetBuilderContextData = {
    sheetTemplate,
    dialogData,
    newComponent,
    sheetElementsDescription,
    openDialog,
    closeDialog,
    handleChangeNewComponent,
    addSheetBlock,
    renameSheetBlock,
    removeSheetBlock,
    addSheetElement,
    removeSheetElement,
  }

  return (
    <SheetBuilderContext.Provider value={data}>
      {children}
    </SheetBuilderContext.Provider>
  )
}

export const useSheetBuilderContext = () => useContext(SheetBuilderContext)

export default SheetBuilderContextProvider
