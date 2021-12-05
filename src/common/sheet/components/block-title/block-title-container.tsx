import { TextField, Typography } from "@mui/material"
import { ChangeEvent, FocusEventHandler, useState } from "react"

interface BlockTitleProps {
  isEditMode: boolean
  blockIndex: number
  title: string | undefined
  onSaveBlockTitle: FocusEventHandler
}

export default function BlockTitle(props: BlockTitleProps) {
  const {
    isEditMode,
    blockIndex,
    title,
    onSaveBlockTitle: handleSaveBlockTitle,
  } = props

  const [value, setValue] = useState(title ?? `Block ${blockIndex}`)
  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return isEditMode ? (
    <TextField
      autoFocus
      id={`block-title-${blockIndex}`}
      value={value}
      onChange={handleChangeValue}
      onBlur={handleSaveBlockTitle}
    />
  ) : (
    <Typography>{value}</Typography>
  )
}
