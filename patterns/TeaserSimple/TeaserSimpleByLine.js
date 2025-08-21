import { Heading } from '..'
import classNames from 'classnames'

export default function TeaserSimpleByLine(props) {
  const { column, color } = props
  const classes = classNames('teaser-simple__byline', {
    [`teaser-simple__byline--${color}`]: color && color.length > 0,
  })
  return (
    <Heading className={classes} variant="byline">
      {column}
    </Heading>
  )
}
