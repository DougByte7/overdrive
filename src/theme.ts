import { createMuiTheme } from "@material-ui/core/styles"
import { red } from "@material-ui/core/colors"
/* RGB 
$white: rgba(251, 255, 254, 1);
$dimGray: rgba(109, 103, 110, 1);
$blackOlive: #3C393C;
$brandPrimary: #FF6F00;
$brandLight: #ff9100;
$eerieBlack: rgba(27, 27, 30, 1);
$smokyBlack: #0F0F11;
$heidelbergRed: rgba(150, 3, 26, 1);
// Create a theme instance.*/
const theme = createMuiTheme({
  palette: {
    type: "dark",
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
