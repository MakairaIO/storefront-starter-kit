export type RangeProps = {
  id: string
  min: number
  max: number
  selectedValues?: { from?: number; to?: number }
  submitForms?: () => void
}
