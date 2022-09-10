import { Button, ButtonGroup, Tooltip } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { css } from "@emotion/react"

interface ElementSettingsMenuViewProps {
  isVisible: boolean
  handleEdit: VoidFunction
  handleDelete: VoidFunction
}

export default function ElementSettingsMenuView(
  props: ElementSettingsMenuViewProps
) {
  const { isVisible, handleEdit, handleDelete } = props

  const classes = isVisible ? "element-settings visible" : "element-settings"

  return (
    <div css={styles} className={classes}>
      <ButtonGroup
        variant="contained"
        aria-label="Selected element settings"
        sx={{ width: "100%", button: { width: "50%" } }}
      >
        <Tooltip title="Edit">
          <Button onClick={handleEdit}>
            <EditIcon />
          </Button>
        </Tooltip>

        <Tooltip title="Delete">
          <Button onClick={handleDelete}>
            <DeleteIcon />
          </Button>
        </Tooltip>
      </ButtonGroup>
    </div>
  )
}

const styles = css`
  &.element-settings {
    position: fixed;
    bottom: 64px;
    left: 0;
    right: 0;
    z-index: 100;
    margin-bottom: -12px;
    visibility: hidden;
    pointer-events: none;

    &.visible {
      visibility: visible;
      pointer-events: initial;
    }
  }
`
