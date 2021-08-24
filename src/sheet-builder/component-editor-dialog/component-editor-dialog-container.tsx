import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { useSheetBuilderContext } from "@/sheet-builder/sheet-builder-context"
import { SheetInputField } from "@/common/sheet/sheet-types"

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
  const { dialogData, newComponent, closeDialog, setNewComponent } =
    useSheetBuilderContext()

  const handleAddComponent = () => {
    handleAddSheetElement(newComponent, dialogData.blockIndex)
    closeDialog()
  }

  const handleChangeLabel = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComponent({ label: event.currentTarget.value })
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
          id="label-input"
          label="Label"
          type="text"
          value={newComponent.label}
          onChange={handleChangeLabel}
          margin="dense"
          fullWidth
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
