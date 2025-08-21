import {
  ProductPlacement,
  Promotion,
  TeaserHero,
  TeaserGrid,
  TeaserSingle,
  TeaserProducts,
  MultiColumnText,
  TeaserDuo,
  TeaserVideo,
  DiscoveryImage,
  TeaserEnhanced,
  NoComponent,
} from '../..'
import Divider from '../../Divider'
import LogoBar from '../../LogoBar'
import TeaserSimple from '../../TeaserSimple'

export default function ContentElements(props) {
  const { elements = [] } = props

  if (elements.length === 0) return null

  // Declare your additional content patterns here
  const components = {
    'product-placement': ProductPlacement,
    promotion: Promotion,
    'teaser-hero': TeaserHero,
    'teaser-grid': TeaserGrid,
    'teaser-single': TeaserSingle,
    'teaser-enhanced': TeaserEnhanced,
    'teaser-products': TeaserProducts,
    'teaser-simple': TeaserSimple,
    'multi-column-text': MultiColumnText,
    'duo-teaser': TeaserDuo,
    'video-teaser': TeaserVideo,
    'discovery-image': DiscoveryImage,
    'logo-bar': LogoBar,
    divider: Divider,
  }

  return (
    <>
      {elements.map((entry, index) => {
        const Component = components[entry.component] ?? NoComponent

        if (!Component) return null

        return entry.component === 'divider' ? (
          <Component {...entry.properties.content} />
        ) : (
          <div className="content-element" key={index}>
            <Component {...entry.properties.content} name={entry.component} />
          </div>
        )
      })}
    </>
  )
}
