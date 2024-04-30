export type Aggregation = {
  key: string
  max: null | number
  min: null | number
  position: number
  selectedValues: null | string[]
  showDocCount: boolean
  title: string
  type: string
  values: AggregationValue[]
}

type AggregationValue = {
  key: string
  count: null | number
  position: number
}
