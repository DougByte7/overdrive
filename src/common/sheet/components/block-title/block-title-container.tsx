import {
  ChangeEvent,
  FocusEventHandler,
  KeyboardEventHandler,
  useState,
} from "react"
import { TextField, Typography } from "@mui/material"

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

  const handleEnterKey: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key !== "Enter") return
    ;(e.target as any).blur()
  }

  return isEditMode ? (
    <TextField
      autoFocus
      id={`block-title-${blockIndex}`}
      value={value}
      onChange={handleChangeValue}
      onKeyDown={handleEnterKey}
      onBlur={handleSaveBlockTitle}
    />
  ) : (
    <>
      <Typography>{value}</Typography>
      <Typography
        variant="body2"
        color="GrayText"
        sx={{
          marginLeft: "8px",
          fontSize: ".6rem",
          position: "absolute",
          top: "70%",
          left: "15%",
        }}
      >
        Double tap to edit
      </Typography>
    </>
  )
}
