import { componentsMapping, ErrorBoundary, NoComponent } from '../..'

export default function ContentElements(props) {
  const { elements = [] } = props

  if (elements.length === 0) return null

  return (
    <>
      {elements.map((entry, index) => {
        const Component = componentsMapping[entry.component] ?? NoComponent

        if (!Component) return null

        return (
          <ErrorBoundary key={index}>
            <Component {...entry.properties.content} name={entry.component} />
          </ErrorBoundary>
        )
      })}
    </>
  )
}
