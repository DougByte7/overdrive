export type StatData = { main: number; modifier: number }
export interface StatInputProps {
  statData: StatData
  onChange: (statData: StatData) => void
}
