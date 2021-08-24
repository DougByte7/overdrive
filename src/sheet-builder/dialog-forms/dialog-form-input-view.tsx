import { FunctionComponent } from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Radio from "@material-ui/core/Radio"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import { useSheetBuilderContext } from "../sheet-builder-context"
import { SheetFieldType } from "@/common/sheet/sheet-types"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      marginTop: theme.spacing(2),
    },
    radioGroup: {
      flexDirection: "row",
    },
  })
)

const DialogFormInputView: FunctionComponent = () => {
  const {
    newComponent: { type },
    setNewComponent,
  } = useSheetBuilderContext()
  const classes = useStyles()

  const handleChangeType = (
    _event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setNewComponent({ type: value as SheetFieldType })
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
