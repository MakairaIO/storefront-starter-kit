import { Fragment } from 'react'
import { fontConfig } from './DynamicStyleProvider'

export default function TypographyView() {
  return (
    <Fragment>
      {fontConfig.map(font => (
        <div key={font.name} className="pali__typography-container">
          <h2>
            {font.name}
            <span>({font.variable})</span>
          </h2>

          {font.sizes.map(size => {
            const fontStyle = {
              ...font.value,
              fontSize: size,
            }

            return (
              <p key={`${font.name}_${size}`} className="pali__typography-text">
                <span>{size}</span>

                <span key={size} style={fontStyle}>
                  Just some custom sample text to show the usage of this font.
                </span>
              </p>
            )
          })}
        </div>
      ))}
    </Fragment>
  )
}
