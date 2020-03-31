import coreColors from '../../config/core/colors'
import projectColors from '../../config/colors'

const colors = Object.keys(projectColors).length ? projectColors : coreColors

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
  const coreColors = filterColorsByGroup('core')
  const brandColors = filterColorsByGroup('brand')
  const neutralColors = filterColorsByGroup('neutral')
  const helperColors = filterColorsByGroup('helper')
  const stateColors = filterColorsByGroup('state')

  return (
    <div className="pali__colors">
      <ColorSection heading="Core" colors={coreColors} />
      <ColorSection heading="Brand" colors={brandColors} />
      <ColorSection heading="Neutrals" colors={neutralColors} />
      <ColorSection heading="Helper" colors={helperColors} />
      <ColorSection heading="States" colors={stateColors} />
    </div>
  )
}

function ColorSection({ heading, colors }) {
  return (
    <div className="pali__color-wrapper">
      <h2>{heading}</h2>
      {Object.entries(colors).map(([name, info]) => (
        <ColorTile key={name} name={name} {...info} />
      ))}
    </div>
  )
}

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
