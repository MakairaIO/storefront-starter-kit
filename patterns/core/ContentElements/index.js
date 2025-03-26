import { useEffect } from 'react'
import {
  ErrorBoundary,
  ProductPlacement,
  StreamPlacement,
  Promotion,
  TeaserHero,
  TeaserGrid,
  TeaserSingle,
  TeaserProducts,
  MultiColumnText,
  TeaserDuo,
  TeaserVideo,
  DiscoveryImage,
  ContactForm,
  NoComponent,
} from '../..'
import { useGlobalData } from '../../../utils'

export default function ContentElements(props) {
  const { elements = [] } = props
  const { selectedElement } = useGlobalData()

  useEffect(() => {
    let element
    if (selectedElement) {
      element = document.getElementById(selectedElement)
      element?.scrollIntoView({ behavior: 'smooth' })
      element?.classList.add('highlight')
    }
    return () => {
      element?.classList.remove('highlight')
    }
  }, [selectedElement])

  if (elements.length === 0) return null

  // Declare your additional content patterns here
  const components = {
    'product-placement': ProductPlacement,
    'stream-placement': StreamPlacement,
    promotion: Promotion,
    'teaser-hero': TeaserHero,
    'teaser-grid': TeaserGrid,
    'teaser-single': TeaserSingle,
    'teaser-products': TeaserProducts,
    'multi-column-text': MultiColumnText,
    'duo-teaser': TeaserDuo,
    'video-teaser': TeaserVideo,
    'discovery-image': DiscoveryImage,
    'contact-form': ContactForm,
  }
  return (
    <>
      {elements.map((entry, index) => {
        const Component = components[entry.component] ?? NoComponent

        if (!Component) return null

        return (
          <ErrorBoundary key={index}>
            <div id={entry.id}>
              <Component {...entry.properties.content} name={entry.component} />
            </div>
          </ErrorBoundary>
        )
      })}
    </>
  )
}
