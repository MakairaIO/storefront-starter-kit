import { useScrollPosition } from './hooks'
import classNames from 'classnames'
import { Icon } from '../..'

const BackToTop = () => {
  const scrollPosition = useScrollPosition()

  return (
    <div
      className={classNames('back-to-top', {
        'back-to-top--visible': scrollPosition > 100,
      })}
    >
      <a href="#top" className="back-to-top__link">
        <Icon symbol="arrow-up" />
      </a>
    </div>
  )
}

export default BackToTop
