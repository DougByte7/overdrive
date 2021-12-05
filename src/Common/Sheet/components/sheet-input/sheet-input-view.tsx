import {
  TextFieldProps,
  TextField,
  Rating,
  Box,
  MenuItem,
  Typography,
} from "@mui/material"
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"
import CheckBoxIcon from "@mui/icons-material/CheckBox"
import { isNil } from "lodash"
import type {
  GridPosition,
  SheetInputCheckboxField,
  SheetInputField,
  SheetInputFieldKey,
  SheetInputSelectField,
} from "@/common/sheet/sheet-types"
import { ChangeEvent, FunctionComponent, useState } from "react"

interface SheetInputProps {
  input: SheetInputField
  inputIndex: number
  blockIndex: number
  getGridArea: (position: GridPosition) => {
    gridArea: string
  }
  handleChangeSheetValues: (
    dataBlockIndex: number,
    fieldIndex: number,
    value: number | string,
    inputField?: SheetInputFieldKey
  ) => void
}
export default function SheetInput(props: SheetInputProps) {
  const {
    input,
    inputIndex,
    blockIndex,
    getGridArea,
    handleChangeSheetValues,
  } = props
  const { label, type, position, value: templateValue } = input

  const Input: FunctionComponent<TextFieldProps> = ({ children, ...rest }) => {
    const [value, setValue] = useState(templateValue)
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.currentTarget.value)
      handleChangeSheetValues(blockIndex, inputIndex, event.currentTarget.value)
    }
    const defaultProps: TextFieldProps = {
      label,
      value,
      type,
      style: getGridArea(position),
      variant: "standard",
      fullWidth: true,
      onChange: handleChange,
    }
    return (
      <TextField {...defaultProps} {...rest}>
        {children}
      </TextField>
    )
  }

  switch (type) {
    case "number":
    case "text":
      return <Input />
    case "select": {
      const { options, isMultiSelect } = input as SheetInputSelectField
      return (
        <Input
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
        <Box sx={{ display: "flex", marginTop: "1rem" }}>
          {quantity === 1 && <RenderRating />}
          <Typography flexGrow={1} component="legend">
            {label}
          </Typography>
          {quantity > 1 && <RenderRating />}
          {!isNil(numberValue) && <NumberValue />}
        </Box>
      )
    }
  }
}
