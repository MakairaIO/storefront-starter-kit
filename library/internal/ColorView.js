import coreColors from '../../config/core/colors'
import projectColors from '../../config/colors'

const colors = Object.keys(projectColors).length ? projectColors : coreColors

function getColorGroups() {
  const groups = Object.values(colors).map((c) => c.group)

  return Array.from(new Set(groups)) // new Set() to remove duplicates
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
  const colorGroups = getColorGroups()

  return (
    <div className="pali__colors">
      {colorGroups.map((group) => {
        const colors = filterColorsByGroup(group)

        return <ColorSection key={group} heading={group} colors={colors} />
      })}
    </div>
  )
}

function ColorSection({ heading, colors }) {
  const displayHeading = heading.charAt(0).toUpperCase() + heading.slice(1)

  return (
    <div className="pali__color-wrapper">
      <h2>{displayHeading}</h2>

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
