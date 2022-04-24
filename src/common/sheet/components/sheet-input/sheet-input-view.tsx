import {
  TextFieldProps,
  TextField,
  Rating,
  Box,
  MenuItem,
  Typography,
  useMediaQuery,
} from "@mui/material"
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"
import CheckBoxIcon from "@mui/icons-material/CheckBox"
import isNil from "lodash/isNil"
import type {
  GridPosition,
  SheetFieldType,
  SheetInputCheckboxField,
  SheetInputField,
  SheetInputFieldKey,
  SheetInputSelectField,
} from "@/common/sheet/sheet-types"
import { ChangeEvent, FunctionComponent, useState } from "react"
import { StatInput } from "@/common/form-elements/stat-input"
import { StatData } from "@/common/form-elements/stat-input/stat-input-types"

interface SheetInputProps {
  input: SheetInputField
  inputIndex: number
  blockIndex: number
  getGridArea: (position: GridPosition) => {
    gridArea: string
  }
  onSelectElement: (type: SheetFieldType) => VoidFunction
  handleChangeSheetValues: (
    dataBlockIndex: number,
    fieldIndex: number,
    value: number | string | StatData, // TODO create a type alias AND a function type
    inputField?: SheetInputFieldKey
  ) => void
}
export default function SheetInput(props: SheetInputProps) {
  const {
    input,
    inputIndex,
    blockIndex,
    getGridArea,
    onSelectElement,
    handleChangeSheetValues,
  } = props
  const { label, type, position, value: templateValue } = input
  const minWidth768 = useMediaQuery("min-width: 768")

  const commonInputProps = {
    templateValue,
    blockIndex,
    inputIndex,
    handleChangeSheetValues,
    label,
    type,
    onClick: onSelectElement(type),
    position: minWidth768 ? getGridArea(position) : "auto / span 3 ",
  }

  switch (type) {
    case "number":
    case "text":
      return <Input {...commonInputProps} />
    case "select": {
      const { options, isMultiSelect } = input as SheetInputSelectField
      return (
        <Input
          {...commonInputProps}
          select
          SelectProps={isMultiSelect ? { multiple: true } : undefined}
        >
          {options.map((option, optionIndex) => (
            <MenuItem key={optionIndex} value={option}>
              {option}
            </MenuItem>
          ))}
        </Input>
      )
    }
    case "checkbox": {
      // TODO move to its own component

      const { quantity, isPrecisionRating, numberValue } =
        input as SheetInputCheckboxField

      const RenderRating = () => {
        const [value, setValue] = useState(templateValue)
        const handleChange = (_: any, ratingValue: any) => {
          setValue(ratingValue)
          handleChangeSheetValues(blockIndex, inputIndex, ratingValue)
        }
        return (
          <Rating
            value={value as number}
            max={quantity}
            precision={isPrecisionRating ? 0.5 : 1}
            defaultValue={0}
            icon={<CheckBoxIcon />}
            emptyIcon={<CheckBoxOutlineBlankIcon />}
            onChange={handleChange}
          />
        )
      }

      const NumberValue = () => {
        const [value, setValue] = useState(numberValue)
        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
          setValue(Number(event.currentTarget.value))
          handleChangeSheetValues(
            blockIndex,
            inputIndex,
            Number(event.currentTarget.value),
            "numberValue"
          )
        }

        return (
          <TextField
            sx={{
              width: "2.5rem",
              input: { textAlign: "center", padding: ".25rem" },
            }}
            type="number"
            inputProps={{
              min: -999,
              max: 999,
              pattern: "d+",
            }}
            value={value}
            onChange={handleChange}
          />
        )
      }

      return (
        <Box
          onClick={onSelectElement(type)}
          sx={{
            display: "flex",
            marginTop: "1rem",
            gridArea: commonInputProps.position,
          }}
        >
          {quantity === 1 && <RenderRating />}
          <Typography flexGrow={1} component="legend">
            {label}
          </Typography>
          {quantity > 1 && <RenderRating />}
          {!isNil(numberValue) && <NumberValue />}
        </Box>
      )
    }
    case "textarea": {
      return <Input {...commonInputProps} multiline minRows={4} maxRows={10} />
    }

    case "numberWithModifier": {
      const handleChange = (statData: StatData) => {
        handleChangeSheetValues(blockIndex, inputIndex, statData)
      }
      return (
        <StatInput
          position={getGridArea(position)}
          label={label}
          statData={templateValue as StatData}
          onSelectElement={onSelectElement(type)}
          onChange={handleChange}
        />
      )
    }
  }
}

// TODO: move this to its own file
const Input: FunctionComponent<TextFieldProps & any> = ({
  templateValue,
  blockIndex,
  inputIndex,
  handleChangeSheetValues,
  label,
  type,
  position,
  children,
  ...rest
}) => {
  const [value, setValue] = useState(templateValue)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const eventValue = event.target.value
    setValue(eventValue)
    handleChangeSheetValues(blockIndex, inputIndex, eventValue)
  }

  const defaultProps: TextFieldProps = {
    label,
    value,
    type,
    variant: type === "number" ? "outlined" : "standard",
    fullWidth: true,
    onChange: handleChange,
  }
  return (
    <TextField sx={{ gridArea: position }} {...defaultProps} {...rest}>
      {children}
    </TextField>
  )
}
