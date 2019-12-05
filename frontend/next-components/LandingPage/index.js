import { useGlobalData } from '../../next-utils'
import { useTranslation } from '../../public/static/utils'

function Test() {
  return <h1>Hi from Component Test</h1>
}

const collection = {
  SeoHeader: Test,
}

function Landingpage() {
  const { pageData } = useGlobalData()
  const config = pageData.data.config

  if (!config.main) return null

  const elements = config.main.elements

  return (
    <main>
      {elements.map((entry, index) => {
        const Component = collection[entry.component]

        if (!Component) return null

        return (
          <Component
            key={index}
            useTranslation={useTranslation}
            {...entry.properties.content}
          />
        )
      })}
    </main>
  )
}

export default Landingpage
