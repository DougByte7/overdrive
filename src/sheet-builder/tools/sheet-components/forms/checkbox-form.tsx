import React from "react"
import { useSheetBuilderContext } from "@/sheet-builder/sheet-builder-context"
import { SheetInputCheckboxField } from "@/common/sheet/sheet-types"
import {
  FormGroup,
  FormControl,
  TextField,
  FormControlLabel,
  Switch,
} from "@mui/material"
import isNil from "lodash/isNil"

export default function CheckboxForm() {
  const { newComponent, handleChangeNewComponent } = useSheetBuilderContext()

  const handleChangeNumberOfBoxes = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleChangeNewComponent({ quantity: Number(event.currentTarget.value) })
  }

  const handleChangeIsPrecisionRating = (
    _: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    handleChangeNewComponent({ isPrecisionRating: checked })
  }
  const handleChangeHasNumber = (
    _: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    handleChangeNewComponent({ numberValue: checked ? 0 : undefined })
  }

  return (
    <FormGroup>
      <FormControl>
        <TextField
          fullWidth
          variant="standard"
          id="qty-input"
          label="Number of boxes"
          type="number"
          inputProps={{
            min: 1,
            max: 10,
          }}
          value={(newComponent as SheetInputCheckboxField).quantity || ""}
          onChange={handleChangeNumberOfBoxes}
        />
      </FormControl>

      <FormControlLabel
        control={
          <Switch
            name="is-precision-rating"
            color="primary"
            checked={
              (newComponent as SheetInputCheckboxField).isPrecisionRating
            }
            onChange={handleChangeIsPrecisionRating}
          />
        }
        label="Accept half values"
      />

      <FormControlLabel
        control={
          <Switch
            name="has-number"
            color="primary"
            checked={
              !isNil((newComponent as SheetInputCheckboxField).numberValue)
            }
            onChange={handleChangeHasNumber}
          />
        }
        label="Has number"
      />
    </FormGroup>
  )
}
