import Header, { headerVariants } from '../../../patterns/Header'
import TeaserHero, { teaserHeroVariants } from '../../../patterns/TeaserHero'

const headerProps = headerVariants[0].props
const teaserHeroProps = teaserHeroVariants[0].props

export default function Home(props) {
  return (
    <>
      <Header {...props} {...headerProps} />
      <TeaserHero {...props} {...teaserHeroProps} />
    </>
  )
}
