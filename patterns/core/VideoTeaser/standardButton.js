import classNames from 'classnames'
import { Button } from '../..'

export default function StandardButton(props) {
  const { buttonText = 'Zum Produkt ›' } = props
  const classes = classNames('video-teaser__button', 'text--bold')

  return <Button className={classes}>{buttonText}</Button>
}
