import { useGlobalData, useTranslation } from '../../utils'
import { TeaserHero, TwoColumnText } from '../../patterns'

const collection = {
  'teaser-hero': TeaserHero,
  'two-column-text': TwoColumnText,
}

function Landingpage() {
  const { pageData } = useGlobalData()
  const config = pageData.data.config

  if (!config?.main) return null

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
