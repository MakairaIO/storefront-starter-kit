const fs = require('fs')
const { normalize, addEmptyLine, rem } = require('./utils')

function createMixin(entry) {
  const { mixin, size, line, spacing, paddingTop, paddingBottom } = entry

  return `\
${mixin}()
  font-size ${rem(size)}
  line-height ${rem(line)}
  ${spacing ? `letter-spacing ${rem(spacing)}` : ``}
  ${paddingTop ? `padding-top ${rem(paddingTop)}` : ``}
  ${paddingBottom ? `padding-bottom ${rem(paddingBottom)}` : ``}
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
