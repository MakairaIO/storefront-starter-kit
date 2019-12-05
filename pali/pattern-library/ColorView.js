import { colorConfig } from './DynamicStyleProvider'

export default function ColorView() {
  return (
    <div className="pali__colors">
      {colorConfig.map(color => (
        <div key={color.name} className="pali__color-container">
          <span
            className="pali__color-example"
            style={{
              background: color.value,
            }}
          ></span>

          <div>
            <span className="pali__color-title">{color.name}</span>
            <p>
              <span>Hex</span>
              <span>{color.value}</span>
            </p>
            <p>
              <span>Var</span>
              <span>{color.variable}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
