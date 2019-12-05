export default function IconView() {
  return (
    <div className="pali__icons">
      {iconConfig.map(icon => (
        <div key={icon.name} className="pali__icon-container">
          <span
            className="pali__icon-example"
            dangerouslySetInnerHTML={{ __html: icon.value }}
          />
          <span className="pali__icon-title">{icon.name}</span>
          <span className="pali__icon-usage">
            <span>{icon.usage}</span>
          </span>
        </div>
      ))}
    </div>
  )
}

const iconConfig = [
  {
    name: 'Times',
    value: '<svg role="img" class="icon"><use xlink:href="#times"></use></svg>',
    usage: 'times',
  },
]
