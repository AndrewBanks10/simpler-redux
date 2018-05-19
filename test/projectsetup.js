import appMount from './mountapp'

const waitTime = 10000
let intervalID

//
// React rendering is asynchronous. Components must be validated asynchronously.
//
const handleReactAsync = (done, startTime, waitTime, callbackCheck) => {
  // The callback checks that the conditions for success have been met
  if (callbackCheck()) {
    clearInterval(intervalID)
    done()
  // Timeout means failure.
  } else if (new Date() - startTime > waitTime) {
    clearInterval(intervalID)
    done(new Error('Timeout'))
  }
  update()
}

const handleReactAsyncStart = (done, waitTime, callbackCheck) => {
  intervalID = setInterval(handleReactAsync, 10, done, new Date(), waitTime, callbackCheck)
}

const findNode = selector => {
  if (typeof selector === 'function') {
    return appMount.findWhere(selector)
  }
  return appMount.find(selector)
}

export const findNodeFunction = (type, id) =>
  n => n.type() === type && n.props().id === id

export const nodeExists = selector => findNode(selector).first().exists()
export const nodeString = selector => findNode(selector).first().text()
export const nodeValue = selector => findNode(selector).props().value
export const simulateClick = selector => findNode(selector).first().simulate('click')
export const simulateInput = (selector, value) => findNode(selector).first().simulate('change', { target: { value } })
export const update = () => appMount.update()
export { appMount }

export const testCauseAndEffectWithExists = (causeSelector, effectSelector, done) => {
  simulateClick(causeSelector)
  handleReactAsyncStart(done, waitTime, () =>
    nodeExists(effectSelector)
  )
}

export const testCauseAndEffectWithNotExists = (causeSelector, effectSelector, done) => {
  simulateClick(causeSelector)
  handleReactAsyncStart(done, waitTime, () =>
    !nodeExists(effectSelector)
  )
}

export const testCauseAndEffectWithHtmlString = (causeSelector, effectSelector, expectedHtmlString, done) => {
  simulateClick(causeSelector)
  handleReactAsyncStart(done, waitTime, () =>
    nodeString(effectSelector) === expectedHtmlString
  )
}

export const testCauseAndEffectWithTextField = (causeSelector, inputValue, expectedValue, done) => {
  simulateInput(causeSelector, inputValue)
  handleReactAsyncStart(done, waitTime, () =>
    nodeValue(causeSelector) === expectedValue
  )
}
