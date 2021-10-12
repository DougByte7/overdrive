import {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useState,
} from "react"
import { SheetFieldType, SheetInputField } from "@/common/sheet/sheet-types"
import DialogFormCheckboxView from "./dialog-forms/dialog-form-checkbox-view"
import DialogFormInputView from "./dialog-forms/dialog-form-input-view"
import DialogFormSelectView from "./dialog-forms/dialog-form-select-view"
import { DialogData, ISheetBuilderContextData } from "./sheet-builder-types"

const initialDialogData: DialogData = Object.freeze({
  title: "",
  description: "",
  content: null,
  isOpen: false,
  blockIndex: 0,
})

const initialNewComponent: SheetInputField = Object.freeze({
  type: "text",
  position: { rowStart: 0, columnStart: 0, rowEnd: 1, columnEnd: 12 },
  label: "",
  value: "",
})

const SheetBuilderContext = createContext<ISheetBuilderContextData>({
  dialogData: initialDialogData,
  newComponent: initialNewComponent,
  openDialog: () => () => console.warn("openDialog fn called"),
  closeDialog: () => console.warn("closeDialog fn called"),
  handleChangeNewComponent: () => console.warn("setNewComponent fn called"),
})

const SheetBuilderContextProvider: FunctionComponent = ({ children }) => {
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

  const openDialog = (type: SheetFieldType, blockIndex: number) => () => {
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
          "Input",
          "Use for text / number values, e.g., Name, Life points, Descriptions",
          <DialogFormInputView />
        )
        break
      case "select":
        setNewDialogContents(
          "Select",
          "Use for multiple options, e.g., Class, Occupation, Race.",
          <DialogFormSelectView />
        )
        handleChangeNewComponent({ type: "select" })

        break
      case "checkbox":
        setNewDialogContents(
          "Checkbox",
          "Use for opposing states, or ranking e.g., Skill, Hunger, Attributes.",
          <DialogFormCheckboxView />
        )
        handleChangeNewComponent({ type: "checkbox", quantity: 1, isPrecisionRating: false })
        break

      default:
        break
    }
    handleChangeDialogData(newDialogData)
  }

  const data: ISheetBuilderContextData = {
    dialogData,
    newComponent,
    openDialog,
    closeDialog,
    handleChangeNewComponent,
  }

  return (
    <SheetBuilderContext.Provider value={data}>
      {children}
    </SheetBuilderContext.Provider>
  )
}

export const useSheetBuilderContext = () => useContext(SheetBuilderContext)

export default SheetBuilderContextProvider
