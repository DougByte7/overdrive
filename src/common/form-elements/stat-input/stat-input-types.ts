export type StatData = { main: number; modifier: number }
export interface StatInputProps {
  position: {
    gridArea: string
  }
  label: string
  statData: StatData
  onSelectElement: VoidFunction
  onChange: (statData: StatData) => void
}
