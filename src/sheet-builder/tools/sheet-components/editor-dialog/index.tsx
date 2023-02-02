import { useSheetBuilderContext } from "@/sheet-builder/sheet-builder-context"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material"

export default function ComponentEditorDialog() {
  const {
    dialogData,
    newComponent,
    closeDialog,
    handleChangeNewComponent,
    addSheetElement,
  } = useSheetBuilderContext()

  const handleAddComponent = () => {
    addSheetElement(newComponent, dialogData.blockIndex)
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
