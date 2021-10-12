import { FunctionComponent } from "react"
import { useSheetBuilderContext } from "@/sheet-builder/sheet-builder-context"
import { SheetFieldType } from "@/common/sheet/sheet-types"
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Theme,
} from "@mui/material"
import { createStyles, makeStyles, } from "@mui/styles"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      marginTop: theme.spacing(2),
    },
    radioGroup: {
      flexDirection: "row",
    },
  })
) as any

const DialogFormInputView: FunctionComponent = () => {
  const {
    newComponent: { type },
    handleChangeNewComponent,
  } = useSheetBuilderContext()
  const classes = useStyles()

  const handleChangeType = (
    _event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    handleChangeNewComponent({ type: value as SheetFieldType })
  }

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <FormLabel component="legend">Input type</FormLabel>
      <RadioGroup
        className={classes.radioGroup}
        aria-label="input-type"
        name="input-type"
        value={type}
        onChange={handleChangeType}
      >
        <FormControlLabel
          value="text"
          control={<Radio color="primary" />}
          label="Text"
        />
        <FormControlLabel
          value="number"
          control={<Radio color="primary" />}
          label="Number"
        />
      </RadioGroup>
    </FormControl>
  )
}

export default DialogFormInputView
