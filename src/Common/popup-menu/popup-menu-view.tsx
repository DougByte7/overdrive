import { useState } from "react"
import Fab from "@material-ui/core/Fab"
import AddIcon from "@material-ui/icons/Add"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import { makeStyles } from "@material-ui/core/styles"
import { MenuAction } from "./popup-menu-types"

interface PopupMenuProps {
  id: string
  actions: MenuAction[]
}

export default function PopupMenu(props: PopupMenuProps) {
  const { id, actions } = props
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleActionClick = (func: VoidFunction) => () => {
    handleClose()
    func()
  }

  return (
    <div>
      <Fab
        color="primary"
        size="medium"
        aria-controls={`menu-${id}`}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <AddIcon />
      </Fab>
      <Menu
        id={`menu-${id}`}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {actions.map((action, index) => {
          const { name, icon, func } = action

          return (
            <MenuItem
              key={index}
              className={classes.root}
              onClick={handleActionClick(func)}
            >
              {icon} {name}
            </MenuItem>
          )
        })}
      </Menu>
    </div>
  )
}

const useStyles = makeStyles({
  root: {
    "& > .MuiSvgIcon-root": {
      marginRight: ".5rem",
    },
  },
})
