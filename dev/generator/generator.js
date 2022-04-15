const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

const TEMPLATES_DIR = '/templates'
const CHOICES = fs.readdirSync(`${__dirname}${TEMPLATES_DIR}`)
const OUTPUT_DIR = path.resolve(__dirname, '../../src')

const capitalize = s => (s && s[0].toUpperCase() + s.slice(1)) || ''

inquirer
  .prompt([
    {
      name: 'componentType',
      type: 'list',
      message: 'What type of component would you like to generate?',
      choices: CHOICES
    },
    {
      name: 'componentName',
      type: 'input',
      message: 'Component name:',
      validate: function (input) {
        if (/^([A-Za-z])+$/.test(input)) return true
        else return 'Component name may only include letters.'
      }
    },
    {
      name: 'parentComponent',
      type: 'input',
      message: 'Sub directory (optional):',
      validate: function (input) {
        if (input === '') return true
        else if (/^([A-Za-z])+$/.test(input)) return true
        else return 'Component name may only include letters.'
      }
    }
  ])
  .then(answers => {
    const componentType = answers.componentType
    const componentName = answers.componentName
    const parentComponent = answers.parentComponent
    const templatePath = `${__dirname}${TEMPLATES_DIR}/${componentType}`

    const componentRootPath = `${OUTPUT_DIR}/${componentType}`
    const componentPath = `${parentComponent ? `${parentComponent}/` : ''}${componentName}`
    const componentFullPath = `${componentRootPath}/${componentPath}`
    const componentParentPath = `${componentRootPath}${parentComponent ? `/${parentComponent}` : ''}`

    const options = { componentName, componentType, parentComponent, componentPath }

    if (parentComponent && !fs.existsSync(componentParentPath)) {
      fs.mkdirSync(componentParentPath)
    }

    fs.mkdirSync(componentFullPath)
    createDirectoryContents(templatePath, componentFullPath, options)
  })

function createDirectoryContents (templatePath, componentFullPath, options) {
  const filesToCreate = fs.readdirSync(templatePath)

  filesToCreate.forEach(file => {
    const origFilePath = `${templatePath}/${file}`
    const stats = fs.statSync(origFilePath)
    const checkName = file.match(/ComponentName/g)
    let newFile = file

    if (checkName && checkName[0] === 'ComponentName') {
      newFile = file.replace('ComponentName', options.componentName)
    }

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, 'utf8')
      const writePath = `${componentFullPath}/${newFile}`
      const render = ejs.render(contents, options)

      fs.writeFileSync(writePath, render, 'utf8')
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${componentFullPath}/${newFile}`)
      createDirectoryContents(`${templatePath}/${file}`, `${componentFullPath}/${newFile}`, options)
    }
  })
}
