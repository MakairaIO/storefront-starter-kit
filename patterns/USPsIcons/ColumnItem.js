import RowItem from './RowItem'

function ColumnItem(props) {
  const { rows = [], theme } = props

  return (
    <div className="usps-icons__column-item">
      {rows.map((row, index) => (
        <RowItem {...row} key={`row-${index}`} theme={theme} />
      ))}
    </div>
  )
}

export default ColumnItem
