import React from 'react'
import { Heading, Copytext } from '..'

const Fragment = React.Fragment

export default function TeaserSimpleColumn(props) {
  const { content } = props
  return (
    <div className="teaser-simple__text-column">
      {content.map((des, index) => {
        const { heading, text } = des
        return (
          <Fragment key={index}>
            {heading && (
              <Heading className="teaser-simple__subheading" level={4}>
                {heading}
              </Heading>
            )}
            <Copytext
              className="teaser-simple__text"
              dangerouslySetInnerHTML={{ __html: text }}
            ></Copytext>
          </Fragment>
        )
      })}
    </div>
  )
}
