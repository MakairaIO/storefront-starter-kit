#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer')

const CURRENT_DIR = path.dirname(__dirname)

function askPatternName() {
  const questions = [
    {
      name: 'patternName',
      type: 'input',
      message: 'Enter pattern name:',
      validate: function(value) {
        if (value.length) {
          return true
        } else {
          return 'Please enter pattern name:'
        }
      },
    },
  ]

  return inquirer.prompt(questions)
}

function createPatternDirectory(patternName) {
  fs.mkdirSync(`${CURRENT_DIR}/patterns/${patternName}`)
}

function createPatternFiles(patternName) {
  const indexTemplate = `\
function ${patternName}() {
  return (
    <div className="${patternName}">${patternName}</div>
  )
}

export default ${patternName}`

  fs.writeFileSync(
    `${CURRENT_DIR}/patterns/${patternName}/index.js`,
    new Uint8Array(Buffer.from(indexTemplate))
  )

  const stylusTemplate = `\
.${patternName}
  display block`

  fs.writeFileSync(
    `${CURRENT_DIR}/patterns/${patternName}/${patternName}.styl`,
    new Uint8Array(Buffer.from(stylusTemplate))
  )
}

function registerFiles(patternName) {
  const jsRegisterString = `\
export { default as ${patternName} } from './${patternName}'`

  fs.appendFileSync(
    `${CURRENT_DIR}/patterns/index.js`,
    new Uint8Array(Buffer.from(jsRegisterString))
  )

  const stylusRegisterString = `\
@import './${patternName}/${patternName}.styl'`

  fs.appendFileSync(
    `${CURRENT_DIR}/patterns/index.styl`,
    new Uint8Array(Buffer.from(stylusRegisterString))
  )
}

async function createPattern(patternName) {
  try {
    createPatternDirectory(patternName)
    createPatternFiles(patternName)
    registerFiles(patternName)
  } catch (error) {
    console.error(error)
  }
}

const run = async () => {
  const { patternName } = await askPatternName()
  createPattern(patternName)

  console.log(chalk.green('All done! Files have been created.'))
}

run()
