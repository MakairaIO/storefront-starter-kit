import React from 'react'
import { Heading } from '..'
import classNames from 'classnames'

const Fragment = React.Fragment

export default function TeaserSimpleHeader(props) {
  const { heading } = props
  return heading.map((head, index) => {
    const classes = classNames('teaser-simple__heading', {})
    return (
      <Fragment key={index}>
        <Heading className={classes} level={0}>
          {head}
        </Heading>
      </Fragment>
    )
  })
}
