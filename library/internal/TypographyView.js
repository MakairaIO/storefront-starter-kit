import { Fragment } from 'react'
import fonts from '../../config/fonts'

const SIZES = ['10px', '14px', '16px', '18px']

export default function TypographyView() {
  return (
    <Fragment>
      {Object.entries(fonts).map(([fontName, fontInfo]) => (
        <div key={fontName} className="pali__typography-container">
          <h2 className="pali__typography-title">
            {fontName}
            <span>({fontInfo.variableName})</span>
          </h2>

          {SIZES.map(size => {
            const fontStyle = {
              fontSize: size,
              fontFamily: fontInfo.family,
              fontWeight: fontInfo.weight,
              fontStyle: fontInfo.isItalic ? 'italic' : 'normal',
            }

            return (
              <p key={`${fontName}_${size}`} className="pali__typography-text">
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
