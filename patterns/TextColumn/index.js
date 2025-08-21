import isEmpty from 'lodash/isEmpty'
import { Heading, Copytext, Button } from '..'

function TextColumn(props) {
  const { data = [], anchorId = '' } = props

  return (
    <section id={anchorId} className="text-column">
      {data.slice(0, 2).map((textColumn, i) => {
        return (
          <div key={i} className="text-column__column text-column__column-text">
            {textColumn.heading && (
              <Heading
                className={`text-column__heading content--${textColumn.headingAlignment}`}
                level="2"
              >
                {textColumn.heading}
              </Heading>
            )}
            {textColumn.text && (
              <Copytext
                className={`text-column__text content--${textColumn.textAlignment}`}
                dangerouslySetInnerHTML={{ __html: textColumn.text }}
              ></Copytext>
            )}
            {!isEmpty(textColumn.button) && textColumn?.button?.text && (
              <div className={`content--${textColumn.buttonAlignment}`}>
                <Button
                  className="text-column__button"
                  variant="primary"
                  href={textColumn?.button?.link}
                >
                  {textColumn.button.text}
                </Button>
              </div>
            )}
          </div>
        )
      })}
    </section>
  )
}

export default TextColumn
export { default as textColumnVariants } from './variants.js'
