import { ChangeEventHandler } from "react"
import {
  StatLabel,
  StatMainInput,
  StatModifierContainer,
  StatModifierInput,
} from "./stat-input-styles"
import { StatData, StatInputProps } from "./stat-input-types"

export default function StatInput(props: StatInputProps) {
  const {
    position,
    label,
    statData: { main, modifier },
    onSelectElement,
    onChange,
  } = props

  const handleChangeData =
    (stat: keyof StatData): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      onChange({ main, modifier, [stat]: Number(e.target.value) })
    }

  return (
    <StatModifierContainer
      gridPosition={position.gridArea}
      onClick={onSelectElement}
    >
      <StatLabel>
        {label}
        <StatMainInput
          type="number"
          value={main}
          onChange={handleChangeData("main")}
        />
      </StatLabel>
      <StatModifierInput
        type="number"
        value={modifier}
        onChange={handleChangeData("modifier")}
      />
    </StatModifierContainer>
  )
}
