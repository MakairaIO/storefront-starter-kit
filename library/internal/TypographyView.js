import { Text } from '../../patterns'
import coreFonts from '../../config/core/fonts'
import projectFonts from '../../config/fonts'
import coreTypography from '../../config/core/typography'
import projectTypography from '../../config/typography'
import { IframeResizerWrapper } from '../../utils'

const fonts = Object.keys(projectFonts).length ? projectFonts : coreFonts
// Filter italic fonts to get unique font weights, then sort by weight and restore original JSON structure for processing during render() below
const displayFonts = Object.entries(fonts)
  .filter(([, config]) => {
    return !config.isItalic
  })
  .sort((a, b) => {
    const [, configA] = a
    const [, configB] = b

    return configA.weight - configB.weight
  })
  .reduce((acc, current) => {
    const [name, config] = current

    acc[name] = config

    return acc
  }, {})

const typography = Object.keys(projectTypography).length
  ? projectTypography
  : coreTypography

export default function TypographyView() {
  return (
    <IframeResizerWrapper iframeResizerOptions={{ checkOrigin: false }}>
      <link
        href="/assets/library/library.css"
        rel="stylesheet"
        type="text/css"
      />
      <link href="/assets/styles/main.css" rel="stylesheet" type="text/css" />

      {Object.entries(typography).map(([sizeName, typoConfig]) => {
        const { size, line, spacing } = typoConfig

        return (
          <div key={size} className="pali__typography-container">
            <h3 className="pali__typography-size-title">
              {sizeName} {size} / {line} / {spacing ? spacing : 0}
            </h3>

            {Object.entries(displayFonts).map(([fontName, fontConfig]) => {
              const { family } = fontConfig

              return (
                <p
                  key={`${size}_${fontName}`}
                  className="pali__typography-line"
                  style={{ fontFamily: family }}
                >
                  <span className="pali__typography-font-title">
                    {fontName}
                  </span>

                  <Text
                    size={sizeName.toLowerCase()}
                    weight={fontConfig.weight}
                  >
                    {sizeName} Lorem ipsum dolor sit amet, consetetur sadipscin
                  </Text>
                </p>
              )
            })}
          </div>
        )
      })}
    </IframeResizerWrapper>
  )
}
