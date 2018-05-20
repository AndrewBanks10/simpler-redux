module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(7);
} else {
  module.exports = require('./dist/react-hot-loader.development.js');
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module, process) {Object.defineProperty(exports, "__esModule", { value: true });exports.allStateToProps = exports.allServiceFunctionsToProps = exports.setStateFunction = exports.getStateFunction = exports.connectWithStore = exports.generalReducer = exports.registerSimplerRedux = undefined;var _jsxFileName = 'C:\\Users\\Andrew\\Documents\\GitHub\\simpler-redux\\src\\simpler-redux.js';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;}; /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            Written by Andrew Banks.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */
var _react = __webpack_require__(1);var _react2 = _interopRequireDefault(_react);
var _reactRedux = __webpack_require__(5);
var _propTypes = __webpack_require__(6);var _propTypes2 = _interopRequireDefault(_propTypes);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}(function () {var enterModule = __webpack_require__(0).enterModule;enterModule && enterModule(module);})();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}

var makeSetRState = function makeSetRState(reduxStore) {
  return function (reducerKey, objToMerge, type) {
    if (typeof type === 'undefined') {
      type = reducerKey;
    }
    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducerKey !== 'string') {
        throw new Error('setState: The first argument must be a string.');
      }
      if (typeof objToMerge === 'undefined') {
        throw new Error('setState: The second argument cannot be undefined.');
      }
      if (typeof type !== 'string') {
        throw new Error('setState: The third argument must be a string.');
      }
    }

    reduxStore.dispatch({
      reducerKey: reducerKey,
      objToMerge: objToMerge,
      type: type });

  };
};

var makeGetRState = function makeGetRState(reduxStore) {
  return function (reducerKey) {
    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducerKey !== 'string') {
        throw new Error('getState: The first argument must be a string.');
      }
    }
    return reduxStore.getState()[reducerKey];
  };
};

var registerSimplerRedux = exports.registerSimplerRedux = function registerSimplerRedux(store) {
  var wrappedReduxStore = Object.create(store);
  wrappedReduxStore.setRState = makeSetRState(wrappedReduxStore);
  wrappedReduxStore.getRState = makeGetRState(wrappedReduxStore);
  return wrappedReduxStore;
};

var generalReducer = exports.generalReducer = function generalReducer(reducerKey, initialState) {
  return function () {var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _extends({}, initialState);var action = arguments[1];
    if (action.reducerKey === reducerKey) {
      return _extends({}, state, action.objToMerge);
    }
    return state;
  };
};

var connectWithStore = exports.connectWithStore = function connectWithStore(
ComponentToWrap,
mapStateToProps,
mapDispatchToProps,
mergeProps,
options)
{
  var ConnectedComponent = (0, _reactRedux.connect)(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  options)(
  ComponentToWrap);var

  HOC = function (_React$Component) {_inherits(HOC, _React$Component);function HOC() {_classCallCheck(this, HOC);return _possibleConstructorReturn(this, (HOC.__proto__ || Object.getPrototypeOf(HOC)).apply(this, arguments));}_createClass(HOC, [{ key: 'render', value: function render()
      {
        return (
          _react2.default.createElement(ConnectedComponent, _extends({},
          this.props, {
            store: this.context.store, __source: { fileName: _jsxFileName, lineNumber: 77 } })));


      } }, { key: '__reactstandin__regenerateByEval', // @ts-ignore
      value: function __reactstandin__regenerateByEval(key, code) {// @ts-ignore
        this[key] = eval(code);} }]);return HOC;}(_react2.default.Component);HOC.contextTypes = {
    store: _propTypes2.default.object };

  return HOC;
};

var getStateFunction = exports.getStateFunction = function getStateFunction(reducerKey) {return (
    function (state, key) {return (
        state[reducerKey][key]);});};

var setStateFunction = exports.setStateFunction = function setStateFunction(reducerKey) {return (
    function (store, mergeState, type) {return (
        store.setRState(reducerKey, mergeState, type));});};

var allServiceFunctionsToProps = exports.allServiceFunctionsToProps = function allServiceFunctionsToProps(serviceFunctions) {return (
    function (dispatch, ownProps) {return (
        Object.keys(serviceFunctions).reduce(function (obj, e) {
          obj[e] = function () {for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}return serviceFunctions[e].apply(serviceFunctions, [ownProps.store].concat(args));};
          return obj;
        }, {}));});};

var allStateToProps = exports.allStateToProps = function allStateToProps(reducerKey) {return (
    function (state) {return state[reducerKey];});};;(function () {var reactHotLoader = __webpack_require__(0).default;var leaveModule = __webpack_require__(0).leaveModule;if (!reactHotLoader) {return;}reactHotLoader.register(makeSetRState, 'makeSetRState', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(makeGetRState, 'makeGetRState', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(registerSimplerRedux, 'registerSimplerRedux', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(generalReducer, 'generalReducer', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(connectWithStore, 'connectWithStore', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(getStateFunction, 'getStateFunction', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(setStateFunction, 'setStateFunction', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(allServiceFunctionsToProps, 'allServiceFunctionsToProps', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(allStateToProps, 'allStateToProps', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module), __webpack_require__(4)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}Object.defineProperty(exports,"__esModule",{value:!0});var React=_interopDefault(__webpack_require__(1)),classCallCheck=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},inherits=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)},possibleConstructorReturn=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},AppContainer=function(e){function t(){return classCallCheck(this,t),possibleConstructorReturn(this,e.apply(this,arguments))}return inherits(t,e),t.prototype.render=function(){return React.Children.only(this.props.children)},t}(React.Component),hot_prod=function(){return function(e){return e}},areComponentsEqual=function(e,t){return e===t},setConfig=function(){};exports.AppContainer=AppContainer,exports.hot=hot_prod,exports.areComponentsEqual=areComponentsEqual,exports.setConfig=setConfig;


/***/ })
/******/ ]);