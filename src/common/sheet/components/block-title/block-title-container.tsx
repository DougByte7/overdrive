import {
  ChangeEvent,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  useState,
} from "react"
import { TextField, Typography } from "@mui/material"

interface BlockTitleProps {
  isEditMode: boolean
  blockIndex: number
  title: string | undefined
  onSaveBlockTitle: FocusEventHandler
  onClick: MouseEventHandler<HTMLDivElement>
}

export default function BlockTitle(props: BlockTitleProps) {
  const {
    isEditMode,
    blockIndex,
    title,
    onSaveBlockTitle: handleSaveBlockTitle,
    onClick: handleClick,
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
      data-id={blockIndex}
      value={value}
      onChange={handleChangeValue}
      onKeyDown={handleEnterKey}
      onBlur={handleSaveBlockTitle}
    />
  ) : (
    <div onClick={handleClick}>
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
    </div>
  )
}
