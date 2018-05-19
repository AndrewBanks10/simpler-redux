const { JSDOM } = require('jsdom')

const jsdom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost'
})

const { window } = jsdom
global.window = window
global.document = window.document

//
// Testing for react 16.
//
global.requestAnimationFrame = function (callback) {
  setTimeout(callback, 0)
}

Object.keys(global.window).forEach(property => {
  if (typeof global[property] === 'undefined') {
    global[property] = global.window[property]
  }
})

global.navigator = {
  userAgent: 'node.js'
}
