import { Component } from 'react'
import { ConditionalLink } from '../..'
import Image from './image'
import Title from './title'
import Overlay from './overlay'
import isEmpty from 'lodash/isEmpty'
import { throttle } from '../../../utils'

const DESKTOP_MENU_BREAKPOINT = 1024
class DuoTeaser extends Component {
  constructor(props) {
    super(props)

    this.state = {
      renderRightTile: false,
    }
    this.handleResize = throttle(this.handleResize, 200)
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    const { renderRightTile } = this.state

    if (window.innerWidth >= DESKTOP_MENU_BREAKPOINT) {
      if (renderRightTile === false) {
        this.setState({ renderRightTile: true })
      }
    } else {
      if (renderRightTile === true) {
        this.setState({ renderRightTile: false })
      }
    }
  }

  render() {
    const { leftTile = {}, rightTile = {} } = this.props

    return (
      <section className="duo-teaser-box">
        <section className="duo-teaser">
          <ConditionalLink
            href={leftTile.link}
            className="duo-teaser__container"
          >
            <div className="duo-teaser__image-wrapper">
              <Image {...leftTile.image} />
              <Title {...leftTile} />
            </div>
            <Overlay {...leftTile.description} />
          </ConditionalLink>
        </section>

        {this.state.renderRightTile && !isEmpty(rightTile) && (
          <section className="duo-teaser duo-teaser--right">
            (
            <ConditionalLink
              href={rightTile.link}
              className="duo-teaser__container"
            >
              <div className="duo-teaser__image-wrapper">
                <Image {...rightTile.image} />
                <Title {...rightTile} />
              </div>
              <Overlay {...rightTile.description} />
            </ConditionalLink>
            )
          </section>
        )}
      </section>
    )
  }
}

export default DuoTeaser
export { default as duoTeaserVariants } from './variants.js'
