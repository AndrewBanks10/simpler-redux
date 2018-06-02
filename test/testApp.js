import { testCauseAndEffectWithHtmlString, handleReactAsyncStart } from './projectsetup'
import { selectors } from './Counter1'
import { exportedServiceFunctions } from './WrapCounter1'

const waitForAnswer = (done, callbackCheck) => {
  handleReactAsyncStart(done, 10000, callbackCheck)
}

let i = 0
describe('View CounterForm', function () {
  this.slow(6000)
  it(`increment counter4 - validated.`, function (done) {
    testCauseAndEffectWithHtmlString('#increment4', '#counter4', `Counter: ${i + 1}`, done)
  })
  it(`increment counter1 - validated.`, function (done) {
    testCauseAndEffectWithHtmlString('#increment1', '#counter1', `Counter: ${i + 1}`, done)
  })
  it(`increment counter2 - validated.`, function (done) {
    testCauseAndEffectWithHtmlString('#increment2', '#counter2', `Counter: ${i + 1}`, done)
  })
  it(`increment counter3 - validated.`, function (done) {
    testCauseAndEffectWithHtmlString('#increment3', '#counter3', `Counter: ${i + 1}`, done)
  })
})

describe('Test Lifecyle component', function () {
  it(`componentDidMount hook called 1 time.`, function (done) {
    waitForAnswer(done, () => selectors.hooksCalled().componentDidMount === 1)
  })
  it(`onConstructor hook called 1 time.`, function (done) {
    waitForAnswer(done, () => selectors.hooksCalled().onConstructor === 1)
  })
  it(`onRender hook called > 10 times.`, function (done) {
    waitForAnswer(done, () => selectors.hooksCalled().onRender > 1)
  })
  it(`componentWillUnmount hook called 1 time.`, function (done) {
    exportedServiceFunctions.remove()
    waitForAnswer(done, () => selectors.hooksCalled().componentWillUnmount === 1)
  })
})
