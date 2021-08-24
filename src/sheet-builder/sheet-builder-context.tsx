import { SheetFieldType, SheetInputField } from "@/common/sheet/sheet-types"
import React, {
  createContext,
  FunctionComponent,
  useContext,
  useState,
} from "react"
import DialogFormInputView from "./dialog-forms/dialog-form-input-view"
import DialogFormSelectView from "./dialog-forms/dialog-form-select-view"
import {
  DialogData,
  ISheetBuilderContextData,
  ISheetBuilderContextState,
} from "./sheet-builder-types"

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
  options: undefined,
})

const initialState: ISheetBuilderContextState = Object.freeze({
  dialogData: initialDialogData,
  newComponent: initialNewComponent,
})

const SheetBuilderContext = createContext<ISheetBuilderContextData>({
  dialogData: initialDialogData,
  newComponent: initialNewComponent,
  openDialog: () => () => console.debug("openDialog fn called"),
  closeDialog: () => console.debug("closeDialog fn called"),
  setNewComponent: () => console.debug("setNewComponent fn called"),
})

const SheetBuilderContextProvider: FunctionComponent = ({ children }) => {
  const [state, setState] = useState<ISheetBuilderContextState>(initialState)

  const setDialogData = (newValues: Partial<DialogData>) => {
    setState({
      ...state,
      dialogData: { ...state.dialogData, ...newValues },
    })
  }

  const setNewComponent = (newValues: Partial<SheetInputField>) => {
    setState({
      ...state,
      newComponent: { ...state.newComponent, ...newValues },
    })
  }

  const closeDialog = () => {
    setState(initialState)
  }

  const openDialog = (type: SheetFieldType, blockIndex: number) => () => {
    const newDialogData = Object.assign({}, initialDialogData)
    newDialogData.isOpen = true
    newDialogData.blockIndex = blockIndex

    switch (type) {
      case "number":
      case "text":
        newDialogData.title = "Input"
        newDialogData.description =
          "Use for key / value pairs, e.g., skills, attributes, HP, descriptions"
        newDialogData.content = <DialogFormInputView />
        break
      case "select":
        newDialogData.title = "Select"
        newDialogData.description =
          "Use for multiple options, e.g., race, class, occupation, spells."
        newDialogData.content = <DialogFormSelectView />
        break
      case "checkbox":
        newDialogData.title = "Checkbox"
        newDialogData.description =
          "Use for opposing states, or rank e.g., inspiration, death saves, hunger."
        break

      default:
        break
    }
    setDialogData(newDialogData)
  }

  const data: ISheetBuilderContextData = {
    dialogData: state.dialogData,
    newComponent: state.newComponent,
    openDialog,
    closeDialog,
    setNewComponent,
  }

  return (
    <SheetBuilderContext.Provider value={data}>
      {children}
    </SheetBuilderContext.Provider>
  )
}

export const useSheetBuilderContext = () => useContext(SheetBuilderContext)

export default SheetBuilderContextProvider
