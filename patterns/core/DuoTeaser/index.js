// function DuoTeaser() {
//   return (
//     <section className="duo-teaser">DuoTeaser</section>
//   )
// }

// export default DuoTeaser
// export { default as duoTeaserVariants } from './variants.js'

import { ConditionalLink } from '../..'
import Image from './image'
import Title from './title'
import Overlay from './overlay'

function DuoTeaser(props) {
  const { heading = {}, overlay = {}, image = {}, link = '' } = props

  return (
    <section className="hero-teaser duo-teaser">
      <ConditionalLink href={link} className="hero-teaser__container">
        <div className="hero-teaser__image-wrapper">
          <Image {...image} />

          <Title {...heading} />
        </div>

        <Overlay {...overlay} />
      </ConditionalLink>
    </section>
  )
}

export default DuoTeaser
export { default as duoTeaserVariants } from './variants.js'
