import { testCauseAndEffectWithHtmlString } from './projectsetup'

const numIterations = 10
let i = 0
describe('View CounterForm', function () {
  this.slow(6000)
  it(`increment counter1 - validated at numIterations=${numIterations}.`, function (done) {
    for (i = 0; i < numIterations; ++i) {
      testCauseAndEffectWithHtmlString('#increment1', '#counter1', `Counter: ${i + 1}`, done)
    }
  })
  it(`increment counter2 - validated at numIterations=${numIterations}.`, function (done) {
    for (i = 0; i < numIterations; ++i) {
      testCauseAndEffectWithHtmlString('#increment2', '#counter2', `Counter: ${i + 1}`, done)
    }
  })
  it(`increment counter3 - validated at numIterations=${numIterations}.`, function (done) {
    for (i = 0; i < numIterations; ++i) {
      testCauseAndEffectWithHtmlString('#increment3', '#counter3', `Counter: ${i + 1}`, done)
    }
  })
  it(`increment counter4 - validated at numIterations=${numIterations}.`, function (done) {
    for (i = 0; i < numIterations; ++i) {
      testCauseAndEffectWithHtmlString('#increment4', '#counter4', `Counter: ${i + 1}`, done)
    }
  })
})
