let totalMSTPCalcs = 0
let totalMSTPCache = 0

export const shallowSubObjectCompare = (obj, subObj, subObjectkeys) => {
  const len = subObjectkeys.length
  for (let i = 0; i < len; ++i) {
    const key = subObjectkeys[i]
    if (subObj[key] !== obj[key]) {
      return false
    }
  }
  return true
}

export const shallowCopy = (obj, copykeys) => {
  if (copykeys === undefined) {
    copykeys = Object.keys(obj)
  }
  let subObj = {}
  const len = copykeys.length
  for (let i = 0; i < len; ++i) {
    const key = copykeys[i]
    subObj[key] = obj[key]
  }
  return subObj
}

const displayMessage = obj => {
  if (!obj.prevState) {
    console.log(obj.msg)
  } else {
    console.log(`${obj.msg}
prevState: %onextState: %o`,
    obj.prevState,
    obj.nextState
    )
  }

  // Give the stats as performance feedback to developers.
  console.log(`totalMSTPCalcs=${totalMSTPCalcs}, totalMSTPCache=${totalMSTPCache}`)
}

const mapStateToPropsCache = obj => {
  totalMSTPCache++
  displayMessage(obj)
}

const mapStateToPropsCalc = obj => {
  totalMSTPCalcs++
  displayMessage(obj)
}

export const defaultOptions = options => {
  if (options === undefined) {
    return
  }
  options = { ...options }
  if (!options.mapStateToPropsCache) {
    options.mapStateToPropsCache = () => { }
  }
  if (!options.mapStateToPropsCalc) {
    options.mapStateToPropsCalc = () => { }
  }
  if (options.useDefaultMSTPCacheLogging) {
    options.mapStateToPropsCalc = mapStateToPropsCalc
    options.mapStateToPropsCache = mapStateToPropsCache
  }
  return options
}
