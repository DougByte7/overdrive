import React from "react"
import { useSheetBuilderContext } from "@/sheet-builder/sheet-builder-context"
import { SheetFieldType, SheetInputField } from "@/common/sheet/sheet-types"
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material"
import { createStyles, makeStyles } from "@mui/styles"
import { StatData } from "@/common/form-elements/stat-input/stat-input-types"
import theme from "@/theme"

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      marginTop: theme.spacing(2),
    },
  })
)

export default function InputForm() {
  const {
    newComponent: { type },
    handleChangeNewComponent,
  } = useSheetBuilderContext()
  const classes = useStyles()

  const handleChangeType = (
    _event: React.ChangeEvent<HTMLInputElement>,
    value: SheetFieldType
  ) => {
    const newComponent: Partial<SheetInputField> = { type: value }

    if (value === "numberWithModifier") {
      newComponent.value = {
        main: 0,
        modifier: 0,
      } as StatData
    }

    handleChangeNewComponent(newComponent)
  }

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <FormLabel component="legend">Input type</FormLabel>
      <RadioGroup
        aria-label="input-type"
        name="input-type"
        value={type}
        onChange={handleChangeType as (...args: any[]) => void}
      >
        <FormControlLabel
          value="text"
          control={<Radio color="primary" />}
          label="Single line"
        />
        <FormControlLabel
          value="textarea"
          control={<Radio color="primary" />}
          label="Multiple lines"
        />
        <FormControlLabel
          value="number"
          control={<Radio color="primary" />}
          label="Number"
        />
        <FormControlLabel
          value="numberWithModifier"
          control={<Radio color="primary" />}
          label="Boxed number and modifier"
        />
      </RadioGroup>
    </FormControl>
  )
}
