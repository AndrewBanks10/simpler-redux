const failColor = '\x1b[31m'
const successColor = '\x1b[32m'
const normalColor = '\x1b[37m'
const colorReset = '\x1b[0m'

export const consoleSuccess = msg => {
  console.log(successColor, '√', normalColor, msg)
}

export const consoleFail = msg => {
  console.log(failColor, msg, colorReset)
}
