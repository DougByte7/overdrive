import React, {
  ChangeEvent,
  FunctionComponent,
  useState,
  useCallback,
} from "react"
import { useIndexedDB } from "@/indexed-db/indexed-db-context"
import { OverdriveDBStores } from "@/indexed-db/types"
import { Dictionary } from "@/common/types"
import { useEffectOnce } from "react-use"
import { useSharedSheetInfo } from "@/shared-states/shared-sheet-info"
import { isBlank } from "@/helpers/array"
import { useSheetBuilderContext } from "@/sheet-builder/sheet-builder-context"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
  SelectChangeEvent,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ChipInput from "@/common/form-elements/chip-input"

interface FormSelectState {
  selectedDictionaryIndex: number
  isMultiSelect: boolean
  showDictionaryEditor: boolean
  dictionaryName: string
  chips: string[]
}

const DialogFormSelectView: FunctionComponent = () => {
  const { getItems } = useIndexedDB()
  const { handleChangeNewComponent } = useSheetBuilderContext()
  const [sheetInfo, setSheetInfo] = useSharedSheetInfo()

  const handleChangeDictionaries = (dictionary: Dictionary | Dictionary[]) =>
    setSheetInfo({
      ...sheetInfo,
      dictionaries: [
        ...sheetInfo.dictionaries,
        ...(Array.isArray(dictionary) ? dictionary : [dictionary]),
      ],
    })

  const initialState: FormSelectState = {
    selectedDictionaryIndex: -1,
    isMultiSelect: false,
    showDictionaryEditor: false,
    dictionaryName: "",
    chips: [],
  }

  const [state, setState] = useState<FormSelectState>(initialState)
  const handleChangeState = useCallback(
    (key: keyof FormSelectState, value: any) => {
      setState({
        ...state,
        [key]: value,
      })
    },
    [state]
  )
  useEffectOnce(() => {
    if (sheetInfo.dictionaries.length) return
    getItems(OverdriveDBStores.DICTIONARIES, (value: Dictionary[]) =>
      handleChangeDictionaries(value)
    )
  })

  const handleChangeSelectedDictionary = (
    event: SelectChangeEvent<Dictionary>,
    _child: React.ReactNode
  ) => {
    const index = event.target.value
    handleChangeState("selectedDictionaryIndex", index)

    handleChangeNewComponent({
      options: sheetInfo.dictionaries[index as unknown as number].entries,
    })
  }

  const handleChangeIsMultiSelect = () => {
    const newValue = !state.isMultiSelect
    handleChangeState("isMultiSelect", newValue)
    handleChangeNewComponent({ isMultiSelect: newValue, value: [] })
  }

  const handleChangeShowDictionaryEditor = () => {
    handleChangeState("showDictionaryEditor", !state.showDictionaryEditor)
  }

  const handleChangeDictionaryName = (event: ChangeEvent<HTMLInputElement>) => {
    handleChangeState("dictionaryName", event.target.value)
  }

  const handleAddDictionaryOption = (chip: string) =>
    handleChangeState("chips", [...state.chips, chip])

  const handleDeleteDictionaryOption = (_chip: string, index: number) => {
    const copy = Array.from(state.chips)
    copy.splice(index, 1)
    handleChangeState("chips", copy)
  }

  const handleSaveDictionary = () => {
    handleChangeDictionaries({
      name: state.dictionaryName,
      entries: state.chips,
    })

    handleChangeState("dictionaryName", initialState.dictionaryName)
    handleChangeState("chips", initialState.chips)
    handleChangeShowDictionaryEditor()
  }

  return (
    <FormGroup>
      <FormControl>
        <InputLabel
          id="dictionary-select-label"
          disabled={isBlank(sheetInfo.dictionaries)}
        >
          Dictionary
        </InputLabel>
        <Select
          fullWidth
          id="dictionary-select"
          labelId="dictionary-select-label"
          variant="standard"
          disabled={isBlank(sheetInfo.dictionaries)}
          error={isBlank(sheetInfo.dictionaries)}
          value={
            state.selectedDictionaryIndex === -1
              ? ""
              : (state.selectedDictionaryIndex as any)
          }
          onChange={handleChangeSelectedDictionary}
        >
          {sheetInfo.dictionaries?.map((option, i) => (
            <MenuItem key={option.name} value={i}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
        {!sheetInfo.dictionaries.length && (
          <FormHelperText error>
            No dictionary found. Please add a new one.
          </FormHelperText>
        )}
      </FormControl>

      <FormControlLabel
        control={
          <Switch
            name="is-multi-select"
            color="primary"
            checked={state.isMultiSelect}
            onChange={handleChangeIsMultiSelect}
          />
        }
        label="Multiple selection"
      />

      <Accordion
        expanded={state.showDictionaryEditor}
        onChange={handleChangeShowDictionaryEditor}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="dictionary-editor-content"
          id="dictionary-editor-header"
        >
          <Typography sx={{ width: "40%", flexShrink: 0 }}>
            Dictionary Editor
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Class, Spells, Weapons
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            fullWidth
            variant="standard"
            label="Dictionary name"
            placeholder="Class, Spells, Weapons"
            type="text"
            margin="dense"
            value={state.dictionaryName}
            onChange={handleChangeDictionaryName}
          />
          <ChipInput
            label="Options"
            placeholder="Warlock, Eldritch Blast, Scythe "
            value={state.chips}
            onAdd={handleAddDictionaryOption}
            onDelete={handleDeleteDictionaryOption}
          />
          <FormHelperText>
            After type an option press &lsquo;enter&rsquo; to add it.
          </FormHelperText>
          <Button
            variant="contained"
            title="Save"
            disabled={!state.dictionaryName || isBlank(state.chips)}
            onClick={handleSaveDictionary}
          >
            Save
          </Button>
        </AccordionDetails>
      </Accordion>
    </FormGroup>
  )
}

export default DialogFormSelectView
