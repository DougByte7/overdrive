import Accordion from "@mui/material/Accordion"
import Paper from "@mui/material/Paper"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import Typography from "@mui/material/Typography"
import { ReactNode, SyntheticEvent, useState } from "react"
import { useSheetBuilderContext } from "@/sheet-builder/sheet-builder-context"
import theme from "@/theme"
import TextFieldsIcon from "@mui/icons-material/TextFields"
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded"
import ArrowDropDownCircleRoundedIcon from "@mui/icons-material/ArrowDropDownCircleRounded"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import DragIndicatorIcon from "@mui/icons-material/DragIndicator"
import Box from "@mui/material/Box"
import InputForm from "./sheet-components/forms/input-form"
import SelectForm from "./sheet-components/forms/select-form"
import CheckboxForm from "./sheet-components/forms/checkbox-form"

interface TabPanelProps {
  children?: ReactNode
  index: number
  value: number
}

const tabPanelId = "sheet-builder-tools-tabpanel"
const tabId = "sheet-builder-tools-tab"

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${tabPanelId}-${index}`}
      aria-labelledby={`${tabId}-${index}`}
      style={{
        overflow: "auto",
        maxHeight: "calc(100% - 48px)",
        paddingInline: theme.spacing(2),
        paddingBottom: theme.spacing(4)
      }}
    >
      {value === index && children}
    </div>
  )
}

function tabA11yProps(index: number) {
  return {
    id: `${tabId}-${index}`,
    "aria-controls": `${tabPanelId}-${index}`,
  }
}

export default function SheetBuilderTools() {
  const [activeTab, setActiveTab] = useState(0)
  const handleChangeActiveTab = (_event: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const { sheetElementsDescription } = useSheetBuilderContext()

  const sheetComponents = [
    {
      ...sheetElementsDescription.input,
      icon: <TextFieldsIcon />,
      content: <InputForm />,
    },
    {
      ...sheetElementsDescription.select,
      icon: <ArrowDropDownCircleRoundedIcon />,
      content: <SelectForm />,
    },
    {
      ...sheetElementsDescription.checkbox,
      icon: <CheckBoxRoundedIcon />,
      content: <CheckboxForm />,
    },
  ]

  const [expanded, setExpanded] = useState<string | false>(false)
  const handleChangeExpanded =
    (panel: string) => (_event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  return (
    <Paper
      className="tools-container"
      component="aside"
      elevation={3}
      sx={{
        position: "fixed",
        top: 0,
        bottom: 0,
        right: 0,
        width: "350px",
        zIndex: 1,
      }}
    >
      <Tabs
        value={activeTab}
        onChange={handleChangeActiveTab}
        aria-label="basic tabs example"
        sx={{ marginBottom: theme.spacing(2) }}
      >
        <Tab label="Components" {...tabA11yProps(0)} />
        <Tab label="Dictionary" {...tabA11yProps(1)} />
        <Tab label="Rules" {...tabA11yProps(2)} />
      </Tabs>

      <TabPanel value={activeTab} index={0}>
        {sheetComponents.map((component, i) => (
          <Accordion
            key={i}
            expanded={expanded === component.name}
            onChange={handleChangeExpanded(component.name)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${component.name.replace(
                " ",
                "-"
              )}${i}bh-content`}
              id={`${component.name.replace(" ", "-")}${i}bh-header`}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "41%",
                  flexShrink: 0,
                }}
              >
                {component.icon}
                <Typography
                  sx={{
                    marginInline: `${theme.spacing(1)} ${theme.spacing(2)}`,
                  }}
                >
                  {component.name}
                </Typography>
              </Box>
              <Typography sx={{ color: "text.secondary" }}>
                {component.description}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {component.content}
              <Paper
                elevation={3}
                sx={{
                  marginTop: theme.spacing(1),
                  cursor: "grab",
                  userSelect: "none",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: theme.spacing(1),
                  }}
                >
                  <DragIndicatorIcon /> Drag me to add the component
                </Box>
              </Paper>
            </AccordionDetails>
          </Accordion>
        ))}
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        Item Two
      </TabPanel>
    </Paper>
  )
}
