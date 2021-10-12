import { createTheme } from "@mui/material"
import { red } from "@mui/material/colors"

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FF6F00",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    body1: {
      fontSize: "1rem",
    },
  },
})

export default theme
