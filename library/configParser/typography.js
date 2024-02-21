const fs = require('fs')
const { normalize, addEmptyLine } = require('./utils')

function createMixin(entry) {
  const { mixin, size, line, spacing, paddingTop, paddingBottom } = entry

  return `\
${mixin}()
  font-size ${size}px
  line-height ${line}px
  ${spacing ? `letter-spacing ${spacing}px` : ``}
  ${paddingTop ? `padding-top ${paddingTop}px` : ``}
  ${paddingBottom ? `padding-bottom ${paddingBottom}px` : ``}
`
}

function writeTypographyMixins() {
  const BASE_DIRECTORY = process.cwd()
  const coreConfig = require(BASE_DIRECTORY + '/config/core/typography.json')
  const projectConfig = require(BASE_DIRECTORY + '/config/typography.json')

  const useProjectConfig = Object.keys(projectConfig).length > 0
  const config = useProjectConfig ? projectConfig : coreConfig

  const mixins = Object.values(config)
    .map(createMixin)
    .map(normalize)
    .map(addEmptyLine)

  const output = mixins.join('')

  const path = BASE_DIRECTORY + '/patterns/core/BaseLayout/typography.styl'

  // overriding the whole file here is intentional
  fs.writeFileSync(path, output, 'utf8')
}

module.exports = writeTypographyMixins
