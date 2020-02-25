import colors from '../styles/colors'

export default function ColorView() {
  return (
    <div className="pali__colors">
      {Object.entries(colors).map(([colorName, colorInfo]) => (
        <div key={colorName} className="pali__color-container">
          <span
            className="pali__color-example"
            style={{
              background: colorInfo.value,
            }}
          ></span>

          <div>
            <span className="pali__color-title">{colorName}</span>
            <p>
              <span>Hex</span>
              <span>{colorInfo.value}</span>
            </p>
            <p>
              <span>Var</span>
              <span>{colorInfo.variableName}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
