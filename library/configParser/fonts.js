const fs = require('fs')
const { normalize, addEmptyLine } = require('./utils')

function createDeclaration(entry, assetPath) {
  const { family, fileName, weight, isItalic, fileTypes = [] } = entry

  const source = fileTypes
    .map((type) => {
      let format = `'${type}'`

      if (type == 'ttf') {
        format = `'truetype'`
      }

      const pathToFile = `url('${assetPath}${fileName}.${type}')`

      return pathToFile + ' format(' + format + ')'
    })
    .join(', ')

  return `\
@font-face
  font-display fallback
  font-family ${family}
  font-weight ${weight}
  src ${source}
  ${isItalic ? 'font-style italic' : ''}
`
}

function writeFontFaceDeclarations() {
  const BASE_DIRECTORY = process.cwd()
  const coreConfig = require(BASE_DIRECTORY + '/config/core/fonts.json')
  const projectConfig = require(BASE_DIRECTORY + '/config/fonts.json')

  const useProjectConfig = Object.keys(projectConfig).length > 0
  const config = useProjectConfig ? projectConfig : coreConfig
  const assetPath = useProjectConfig ? '/assets/fonts/' : '/assets/fonts/core/'

  const declarations = Object.values(config)
    .map((entry) => createDeclaration(entry, assetPath))
    .map(normalize)
    .map(addEmptyLine)

  const output = declarations.join('')

  const path = BASE_DIRECTORY + '/patterns/core/BaseLayout/fonts.styl'

  // overriding the whole file here is intentional
  fs.writeFileSync(path, output, 'utf8')
}

module.exports = writeFontFaceDeclarations
