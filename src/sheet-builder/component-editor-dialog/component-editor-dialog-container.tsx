import { useSheetBuilderContext } from "@/sheet-builder/sheet-builder-context"
import { SheetInputField } from "@/common/sheet/sheet-types"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material"

interface IComponentEditorDialogProps {
  onAddSheetElement: (
    newField: SheetInputField,
    selectedBlockIndex: number,
    insertAt?: number
  ) => void
}

export default function ComponentEditorDialog(
  props: IComponentEditorDialogProps
) {
  const { onAddSheetElement: handleAddSheetElement } = props
  const { dialogData, newComponent, closeDialog, handleChangeNewComponent } =
    useSheetBuilderContext()

  const handleAddComponent = () => {
    handleAddSheetElement(newComponent, dialogData.blockIndex)
    closeDialog()
  }

  const handleChangeLabel = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeNewComponent({ label: event.currentTarget.value })
  }

  return (
    <Dialog
      open={dialogData.isOpen}
      onClose={closeDialog}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{dialogData.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogData.description}</DialogContentText>

        <TextField
          fullWidth
          id="label-input"
          label="Label"
          type="text"
          margin="dense"
          autoComplete="off"
          variant="standard"
          value={newComponent.label}
          onChange={handleChangeLabel}
        />

        {dialogData.content}
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleAddComponent}
          color="primary"
          variant="contained"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}
