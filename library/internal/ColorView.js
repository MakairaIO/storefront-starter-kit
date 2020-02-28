import colors from '../../config/colors'

function ColorTile({ name, value, variableName }) {
  return (
    <div className="pali__color-container">
      <span
        className="pali__color-example"
        style={{
          background: value,
        }}
      ></span>

      <div>
        <span className="pali__color-title">{name}</span>
        <p>
          <span>Hex</span>
          <span>{value}</span>
        </p>
        <p>
          <span>Var</span>
          <span>{variableName}</span>
        </p>
      </div>
    </div>
  )
}

function filterColorsByGroup(group) {
  return Object.entries(colors).reduce((filteredColors, currentColor) => {
    const [name, info] = currentColor

    if (info.group === group) {
      filteredColors[name] = info
    }

    return filteredColors
  }, {})
}

export default function ColorView() {
  const primaryColors = filterColorsByGroup('primary')
  const secondaryColors = filterColorsByGroup('secondary')
  const neutralColors = filterColorsByGroup('neutral')

  return (
    <div className="pali__colors">
      <div className="pali__color-wrapper">
        <h2>Primary</h2>
        {Object.entries(primaryColors).map(([name, info]) => (
          <ColorTile key={name} name={name} {...info} />
        ))}
      </div>

      <div className="pali__color-wrapper">
        <h2>Secondary</h2>
        {Object.entries(secondaryColors).map(([name, info]) => (
          <ColorTile key={name} name={name} {...info} />
        ))}
      </div>

      <div className="pali__color-wrapper">
        <h2>Neutrals</h2>
        {Object.entries(neutralColors).map(([name, info]) => (
          <ColorTile key={name} name={name} {...info} />
        ))}
      </div>
    </div>
  )
}
