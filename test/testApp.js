import { testHtmlString, testCauseAndEffectWithHtmlString, handleReactAsyncStart } from './projectsetup'
import { selectors } from './Counter1'
import { exportedServiceFunctions } from './WrapCounter1'
import { serviceFunctions as counter1ServiceFunctions, reducerKey as counter1ReducerKey } from './Counter1/model'
import { serviceFunctions as counter5ServiceFunctions, reducerKey as counter5ReducerKey } from './Counter5/model'
import { serviceFunctions as counter3ServiceFunctions, reducerKey as counter3ReducerKey } from './Counter3/model'
import { serviceFunctions as counter4ServiceFunctions, reducerKey as counter4ReducerKey } from './Counter4/model'
import { serviceFunctions as counter6ServiceFunctions, reducerKey as counter6ReducerKey } from './Counter6/model'
import { serviceFunctions as counter7ServiceFunctions, reducerKey as counter7ReducerKey } from './Counter7/model'
import store, { mstpCacheHits, mstpCalcs } from './reduxstore'
import assert from 'assert'

const waitForAnswer = (done, callbackCheck) => {
  handleReactAsyncStart(done, 10000, callbackCheck)
}

let i = 0
describe('View CounterForm', function () {
  this.slow(6000)
  it(`increment counter4 - validated.`, function (done) {
    testCauseAndEffectWithHtmlString('#increment4', '#counter4', `Counter: ${i + 1}`, done)
  })
  it(`increment counter4 - validated 2.`, function (done) {
    testCauseAndEffectWithHtmlString('#increment4', '#counter4', `Counter: ${2}`, done)
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
  it(`increment counter15 - validated.`, function (done) {
    testCauseAndEffectWithHtmlString('#increment15', '#counter15', `Counter: 10`, done)
  })
  it(`increment counter25 - validated.`, function (done) {
    testCauseAndEffectWithHtmlString('#increment25', '#counter25', `Counter: 20`, done)
  })
  it(`increment counter35 - validated.`, function (done) {
    testCauseAndEffectWithHtmlString('#increment35', '#counter35', `Counter: 20`, done)
  })
})

let saveMstpCacheCalcs
let saveMstpCacheHits
describe('Test MSTP caching', function () {
  it(`selectors caching validated 1.`, function (done) {
    store.setRState(counter1ReducerKey, { counter: 0 })
    saveMstpCacheCalcs = mstpCalcs
    saveMstpCacheHits = mstpCacheHits
    counter1ServiceFunctions.increment(store)
    testHtmlString('#counter4', 'Counter: 1', done)
  })
  it(`selectors caching validated 2.`, function () {
    assert(saveMstpCacheCalcs + 2 === mstpCalcs && mstpCacheHits > saveMstpCacheHits)
  })
  it(`Manually defined mapStateToProps caching validated 1.`, function (done) {
    store.setRState(counter4ReducerKey, { counter: 0 })
    saveMstpCacheCalcs = mstpCalcs
    saveMstpCacheHits = mstpCacheHits
    counter4ServiceFunctions.increment2()
    testHtmlString('#counter35', 'Counter: 1', done)
  })
  it(`Manually defined mapStateToProps caching validated 2.`, function () {
    assert(saveMstpCacheCalcs + 1 === mstpCalcs && mstpCacheHits > saveMstpCacheHits)
  })
  it(`selectorList caching validated 1.`, function (done) {
    store.setRState(counter4ReducerKey, { counter: 0 })
    saveMstpCacheCalcs = mstpCalcs
    saveMstpCacheHits = mstpCacheHits
    counter4ServiceFunctions.increment2()
    testHtmlString('#counter35', 'Counter: 1', done)
  })
  it(`selectorList caching validated 2.`, function () {
    assert(saveMstpCacheCalcs + 1 === mstpCalcs && mstpCacheHits > saveMstpCacheHits)
  })
  it(`selectors caching validated 1.`, function (done) {
    store.setRState(counter3ReducerKey, { counter: 0 })
    saveMstpCacheCalcs = mstpCalcs
    saveMstpCacheHits = mstpCacheHits
    counter3ServiceFunctions.increment2()
    testHtmlString('#counter25', 'Counter: 1', done)
  })
  it(`selectors caching validated 2.`, function () {
    assert(saveMstpCacheCalcs + 1 === mstpCalcs && mstpCacheHits > saveMstpCacheHits)
  })
  it(`fast MapStateToProps validated 1.`, function (done) {
    store.setRState(counter5ReducerKey, { counter: 0 })
    saveMstpCacheCalcs = mstpCalcs
    saveMstpCacheHits = mstpCacheHits
    counter5ServiceFunctions.increment()
    testHtmlString('#counter55', 'Counter: 1', done)
  })
  it(`fast MapStateToProps caching validated 2.`, function () {
    assert(saveMstpCacheCalcs === mstpCalcs && mstpCacheHits > saveMstpCacheHits)
  })
  it(`Ui state is a substate of reducer state caching validated 1.`, function (done) {
    store.setRState(counter6ReducerKey, { counter: 0 })
    saveMstpCacheCalcs = mstpCalcs
    saveMstpCacheHits = mstpCacheHits
    counter6ServiceFunctions.increment()
    testHtmlString('#counter66', 'Counter: 1', done)
  })
  it(`Ui state is a substate of reducer state validated 2.`, function () {
    assert(saveMstpCacheCalcs + 1 === mstpCalcs && mstpCacheHits > saveMstpCacheHits)
  })
  it(`Multi selectorList caching validated 1.`, function (done) {
    store.setRState(counter1ReducerKey, { counter: 0 })
    saveMstpCacheCalcs = mstpCalcs
    saveMstpCacheHits = mstpCacheHits
    counter1ServiceFunctions.increment(store)
    testHtmlString('#counter88a', 'Counter: 1', done)
  })
  it(`Multi selectorList caching validated 2.`, function () {
    assert(saveMstpCacheCalcs + 2 === mstpCalcs && mstpCacheHits > saveMstpCacheHits)
  })
  it(`Multi selectorList caching validated 3.`, function (done) {
    store.setRState(counter7ReducerKey, { counter7: 0 })
    saveMstpCacheCalcs = mstpCalcs
    saveMstpCacheHits = mstpCacheHits
    counter7ServiceFunctions.increment()
    testHtmlString('#counter88b', 'Counter: 1', done)
  })
  it(`Multi selectorList caching validated 4.`, function () {
    assert(saveMstpCacheCalcs + 2 === mstpCalcs && mstpCacheHits > saveMstpCacheHits)
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
