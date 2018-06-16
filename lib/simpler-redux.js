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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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
/* 2 */
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
/* 3 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _simplerRedux = __webpack_require__(5);Object.defineProperty(exports, 'makeSharedModuleKeyName', { enumerable: true, get: function get() {return _simplerRedux.
    makeSharedModuleKeyName;} });Object.defineProperty(exports, 'stateAccessors', { enumerable: true, get: function get() {return _simplerRedux.
    stateAccessors;} });Object.defineProperty(exports, 'setStateFunction', { enumerable: true, get: function get() {return _simplerRedux.
    setStateFunction;} });Object.defineProperty(exports, 'getStateFunction', { enumerable: true, get: function get() {return _simplerRedux.
    getStateFunction;} });Object.defineProperty(exports, 'generalReducer', { enumerable: true, get: function get() {return _simplerRedux.
    generalReducer;} });Object.defineProperty(exports, 'registerSimplerRedux', { enumerable: true, get: function get() {return _simplerRedux.
    registerSimplerRedux;} });var _reactSimplerRedux = __webpack_require__(8);Object.defineProperty(exports, 'connectWithStore', { enumerable: true, get: function get() {return _reactSimplerRedux.



    connectWithStore;} });Object.defineProperty(exports, 'connectLifeCycleComponentWithStore', { enumerable: true, get: function get() {return _reactSimplerRedux.
    connectLifeCycleComponentWithStore;} });Object.defineProperty(exports, 'allStateToProps', { enumerable: true, get: function get() {return _reactSimplerRedux.
    allStateToProps;} });Object.defineProperty(exports, 'allServiceFunctionsToProps', { enumerable: true, get: function get() {return _reactSimplerRedux.
    allServiceFunctionsToProps;} });Object.defineProperty(exports, 'buildSelectorsFromUIState', { enumerable: true, get: function get() {return _reactSimplerRedux.
    buildSelectorsFromUIState;} });

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module, process) {Object.defineProperty(exports, "__esModule", { value: true });exports.makeSharedModuleKeyName = exports.stateAccessors = exports.setStateFunction = exports.getStateFunction = exports.generalReducer = exports.registerSimplerRedux = undefined;var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};


var _proxy = __webpack_require__(6);var _proxy2 = _interopRequireDefault(_proxy);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}(function () {var enterModule = __webpack_require__(0).enterModule;enterModule && enterModule(module);})();function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       Written by Andrew Banks.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */var simplerReduxReducerKey = '@@@@@srReducerKey';
var simplerReduxObjectToMergeKey = '@@@@@srObjectToMergeKey';

var makeSetRState = function makeSetRState(reduxStore) {
  return function (reducerKey, objToMerge, type) {var _reduxStore$dispatch;
    if (type === undefined) {
      type = reducerKey;
    }
    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducerKey !== 'string') {
        throw new Error('setRState: The first argument must be a string.');
      }
      if (objToMerge === undefined) {
        throw new Error('setRState: The second argument cannot be undefined.');
      }
      if (typeof type !== 'string') {
        throw new Error('setRState: The third argument must be a string.');
      }
    }

    reduxStore.dispatch((_reduxStore$dispatch = {}, _defineProperty(_reduxStore$dispatch,
    simplerReduxReducerKey, reducerKey), _defineProperty(_reduxStore$dispatch,
    simplerReduxObjectToMergeKey, objToMerge), _defineProperty(_reduxStore$dispatch, 'type',
    type), _reduxStore$dispatch));

  };
};

var makeGetRState = function makeGetRState(reduxStore) {
  return function (reducerKey) {
    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducerKey !== 'string') {
        throw new Error('getRState: The first argument must be a string.');
      }
    }
    return reduxStore.getState()[reducerKey];
  };
};

//
// This must be called with the redux store as a parameter after a createStore.
// Then use the return of this function in the react-redux Provider element as the store.
//
var registerSimplerRedux = exports.registerSimplerRedux = function registerSimplerRedux(reduxStore) {
  var wrappedReduxStore = Object.create(reduxStore);
  wrappedReduxStore.setRState = makeSetRState(wrappedReduxStore);
  wrappedReduxStore.getRState = makeGetRState(wrappedReduxStore);
  return wrappedReduxStore;
};

//
// Call this to generate your reducer.
//
var generalReducer = exports.generalReducer = function generalReducer(reducerKey, initialState) {
  return function () {var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _extends({}, initialState);var action = arguments[1];
    if (action[simplerReduxReducerKey] === reducerKey) {
      return _extends({}, state, action[simplerReduxObjectToMergeKey]);
    }
    return state;
  };
};

// This makes it easier to access reducerKey state previously given a reducerKey.
var getStateFunction = exports.getStateFunction = function getStateFunction(reducerKey) {return (
    function (state, key) {return (
        state[reducerKey][key]);});};

// This makes it easier to set reducerKey state previously given a reducerKey.
var setStateFunction = exports.setStateFunction = function setStateFunction(reducerKey) {return (
    function (store, mergeState, type) {return (
        store.setRState(reducerKey, mergeState, type));});};

var getState = function getState(store, reducerKey) {return (
    function () {return store.getRState(reducerKey);});};

var setState = function setState(store, reducerKey) {return (
    function (mergeState, type) {return store.setRState(reducerKey, mergeState, type);});};

//
// Only call this in the storeIsDefinedCallback sent into connectWithStore above.
// Use the store parameter provided in connectWithStore along with the reducerKey
// in the module.
//
var stateAccessors = exports.stateAccessors = function stateAccessors(store, reducerKey, initialState) {
  if (process.env.NODE_ENV !== 'production') {
    if (store === undefined) {
      throw new Error('The first parameter (store) to stateAccessors must be defined.');
    }
    if (typeof reducerKey !== 'string') {
      throw new Error('The second parameter (reducerKey) to stateAccessors must be a string.');
    }
  }
  var ret = {
    getState: getState(store, reducerKey),
    setState: setState(store, reducerKey) };


  if (initialState !== undefined) {
    ret.reducerState = (0, _proxy2.default)(store, reducerKey, initialState);
  }

  return ret;
};

// Use this to generate shared module keys.
var makeSharedModuleKeyName = exports.makeSharedModuleKeyName = function makeSharedModuleKeyName(key, options) {return '' +
  key + options.id;};;(function () {var reactHotLoader = __webpack_require__(0).default;var leaveModule = __webpack_require__(0).leaveModule;if (!reactHotLoader) {return;}reactHotLoader.register(simplerReduxReducerKey, 'simplerReduxReducerKey', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(simplerReduxObjectToMergeKey, 'simplerReduxObjectToMergeKey', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(makeSetRState, 'makeSetRState', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(makeGetRState, 'makeGetRState', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(registerSimplerRedux, 'registerSimplerRedux', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(generalReducer, 'generalReducer', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(getStateFunction, 'getStateFunction', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(setStateFunction, 'setStateFunction', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(getState, 'getState', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(setState, 'setState', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(stateAccessors, 'stateAccessors', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(makeSharedModuleKeyName, 'makeSharedModuleKeyName', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module), __webpack_require__(2)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(exports, "__esModule", { value: true });(function () {var enterModule = __webpack_require__(0).enterModule;enterModule && enterModule(module);})();function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var proxyDefined = function proxyDefined() {return (
    typeof Proxy !== 'undefined');};

var getReducerKeyValue = function getReducerKeyValue(simplerReduxStore, reducerKey, key) {
  return simplerReduxStore.getRState(reducerKey)[key];
};

var setReducerKeyValue = function setReducerKeyValue(simplerReduxStore, reducerKey, key, value) {
  simplerReduxStore.setRState(reducerKey, _defineProperty({}, key, value));
  return true;
};

var defineProxyGetSet = function defineProxyGetSet(obj, simplerReduxStore, reducerKey, key) {
  Object.defineProperty(
  obj,
  key, {
    get: function get() {return (
        getReducerKeyValue(simplerReduxStore, reducerKey, key));},
    set: function set(value) {return (
        setReducerKeyValue(simplerReduxStore, reducerKey, key, value));} });


};

var simulateProxy = function simulateProxy(simplerReduxStore, reducerKey, initialState) {
  var obj = {};
  Object.keys(initialState).forEach(function (key) {
    defineProxyGetSet(obj, simplerReduxStore, reducerKey, key);
  });
  return obj;
};

var getProxyHandler = function getProxyHandler(reducerKey) {
  return {
    get: function get(simplerReduxStore, key) {return (
        getReducerKeyValue(simplerReduxStore, reducerKey, key));},
    set: function set(simplerReduxStore, key, value) {return (
        setReducerKeyValue(simplerReduxStore, reducerKey, key, value));} };

};var _default =

function _default(simplerReduxStore, reducerKey, initialState) {
  if (proxyDefined()) {
    return new Proxy(simplerReduxStore, getProxyHandler(reducerKey));
  }
  return simulateProxy(simplerReduxStore, reducerKey, initialState);
};exports.default = _default;;(function () {var reactHotLoader = __webpack_require__(0).default;var leaveModule = __webpack_require__(0).leaveModule;if (!reactHotLoader) {return;}reactHotLoader.register(proxyDefined, 'proxyDefined', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/proxy.js');reactHotLoader.register(getReducerKeyValue, 'getReducerKeyValue', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/proxy.js');reactHotLoader.register(setReducerKeyValue, 'setReducerKeyValue', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/proxy.js');reactHotLoader.register(defineProxyGetSet, 'defineProxyGetSet', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/proxy.js');reactHotLoader.register(simulateProxy, 'simulateProxy', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/proxy.js');reactHotLoader.register(getProxyHandler, 'getProxyHandler', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/proxy.js');reactHotLoader.register(_default, 'default', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/proxy.js');leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}Object.defineProperty(exports,"__esModule",{value:!0});var React=_interopDefault(__webpack_require__(3)),classCallCheck=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},inherits=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)},possibleConstructorReturn=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},AppContainer=function(e){function t(){return classCallCheck(this,t),possibleConstructorReturn(this,e.apply(this,arguments))}return inherits(t,e),t.prototype.render=function(){return React.Children.only(this.props.children)},t}(React.Component),hot_prod=function(){return function(e){return e}},areComponentsEqual=function(e,t){return e===t},setConfig=function(){};exports.AppContainer=AppContainer,exports.hot=hot_prod,exports.areComponentsEqual=areComponentsEqual,exports.setConfig=setConfig;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module, process) {Object.defineProperty(exports, "__esModule", { value: true });exports.connectLifeCycleComponentWithStore = exports.hookedLifeCycleComponent = exports.connectWithStore = exports.buildSelectorsFromUIState = exports.allStateToPropsUsingSelectors = exports.allStateToProps = exports.allServiceFunctionsToProps = exports.allServiceFunctionsToPropsWithStore = undefined;var _jsxFileName = 'C:\\Users\\Andrew\\Documents\\GitHub\\simpler-redux\\src\\react-simpler-redux.js';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};var _react = __webpack_require__(3);var _react2 = _interopRequireDefault(_react);
var _reactRedux = __webpack_require__(9);
var _propTypes = __webpack_require__(10);var _propTypes2 = _interopRequireDefault(_propTypes);
var _hoistNonReactStatics = __webpack_require__(11);var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}(function () {var enterModule = __webpack_require__(0).enterModule;enterModule && enterModule(module);})();function _objectWithoutProperties(obj, keys) {var target = {};for (var i in obj) {if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];}return target;}function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}

//
// Builds a mapDispatchToProps function based on the service functions and adds the store as
// the first parameter to each service function and the rest of the parameters given
// by the react UI component when called in react.
//
var allServiceFunctionsToPropsWithStore = exports.allServiceFunctionsToPropsWithStore = function allServiceFunctionsToPropsWithStore(serviceFunctions) {return (
    function (dispatch, ownProps) {return (
        Object.keys(serviceFunctions).reduce(function (obj, e) {
          obj[e] = function () {for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}return serviceFunctions[e].apply(serviceFunctions, [ownProps.store].concat(args));};
          return obj;
        }, {}));});};

//
// Builds a mapDispatchToProps function based on the service functions and adds
// all of the  parameters given by the react UI component when called in react.
//
var allServiceFunctionsToProps = exports.allServiceFunctionsToProps = function allServiceFunctionsToProps(serviceFunctions) {return (
    function () {return (
        Object.keys(serviceFunctions).reduce(function (obj, e) {
          obj[e] = function () {return serviceFunctions[e].apply(serviceFunctions, arguments);};
          return obj;
        }, {}));});};

//
// Builds a mapStateToProps function that returns the entire reducer state.
//
var allStateToProps = exports.allStateToProps = function allStateToProps(reducerKey) {return (
    function (state) {return state[reducerKey];});};

//
// Builds a mapStateToProps function that returns key/selector pairs
//
var allStateToPropsUsingSelectors = exports.allStateToPropsUsingSelectors = function allStateToPropsUsingSelectors(selectors) {return (
    function (state) {return (
        Object.keys(selectors).reduce(function (obj, e) {
          obj[e] = selectors[e](state);
          return obj;
        }, {}));});};

//
// Builds a model selectors object from uiInitialState.
// uiInitialState should only contain keys that you want in the
// props of the react component.
// This is not for specialized selectors for the UI that require conjunctions or
// selectors from other modules, etc.
// It is only for simple selectors of the nature state => state[reducerKey][stateKey]
//
var buildSelectorsFromUIState = exports.buildSelectorsFromUIState = function buildSelectorsFromUIState(reducerKey, uiInitialState) {return (
    Object.keys(uiInitialState).reduce(function (obj, e) {
      obj[e] = function (state) {return state[reducerKey][e];};
      return obj;
    }, {}));};

//
// Builds a mapStateToProps function that returns key/UI State pairs
//
var allStateToPropsUsingUIState = function allStateToPropsUsingUIState(reducerKey, initialUIState) {return (
    function (state) {return (
        Object.keys(initialUIState).reduce(function (obj, e) {
          obj[e] = state[reducerKey][e];
          return obj;
        }, {}));});};

//
// Call this instead of the react-redux connect.
//
var connectWithStore = exports.connectWithStore = function connectWithStore(
options)
{
  options = _extends({}, options);
  var storeIsDefinedCallback = options.storeIsDefinedCallback;
  if (options.mapStateToProps === undefined) {
    if (options.selectors === undefined && options.reducerKey !== undefined && options.initialUIState !== undefined) {
      options.mapStateToProps = allStateToPropsUsingUIState(options.reducerKey, options.initialUIState);
    } else if (options.selectors !== undefined) {
      options.mapStateToProps = allStateToPropsUsingSelectors(options.selectors);
    }
  }
  if (options.noStoreParameterOnServiceFunctions) {
    if (process.env.NODE_ENV !== 'production') {
      if (options.serviceFunctions === undefined) {
        throw new Error('connectWithStore: options.serviceFunctions cannot be undefined when specifying options.noStoreParameterOnServiceFunctions.');
      }
    }
    options.mapDispatchToProps = allServiceFunctionsToProps(options.serviceFunctions);
  } else if (options.mapDispatchToProps === undefined && options.serviceFunctions !== undefined) {
    options.mapDispatchToProps = allServiceFunctionsToPropsWithStore(options.serviceFunctions);
  }
  // call the react-redux connect.
  var ConnectedComponent = (0, _reactRedux.connect)(
  options.mapStateToProps,
  options.mapDispatchToProps,
  options.mergeProps,
  options.reduxOptions)(
  options.uiComponent);

  var withRef = options.reduxOptions && options.reduxOptions.withRef;var

  HOC = function (_React$Component) {_inherits(HOC, _React$Component);
    function HOC(props, context) {_classCallCheck(this, HOC);

      // Handles a callback for the consumer to cache and/or use the store.
      var _this = _possibleConstructorReturn(this, (HOC.__proto__ || Object.getPrototypeOf(HOC)).call(this, props, context));if (storeIsDefinedCallback) {
        storeIsDefinedCallback(_this.context.store);
        storeIsDefinedCallback = null;
      }
      _this.setWrappedInstance = _this.setWrappedInstance.bind(_this);return _this;
    }
    // Support the redux connect getWrappedInstance out of this HOC.
    // This way, the consumer does nothing different when using this HOC
    // vs redux connected components when handling refs.
    _createClass(HOC, [{ key: 'setWrappedInstance', value: function setWrappedInstance(ref) {
        if (!withRef) {
          return;
        }
        // Refer to the original instance of the component wrapped with connect.
        if (ref) {
          if (typeof ref.getWrappedInstance !== 'function') {
            if (process.env.NODE_ENV !== 'production') {
              console.log('There is something wrong with redux connect.');
              return;
            }
          }
          this.wrappedInstance = ref.getWrappedInstance();
        }
      } }, { key: 'getWrappedInstance', value: function getWrappedInstance()
      {
        if (process.env.NODE_ENV !== 'production') {
          if (this.wrappedInstance === undefined) {
            console.log('The getWrappedInstance return is undefined. Did you use the withRef: true option?');
          }
        }
        return this.wrappedInstance;
      } }, { key: 'render', value: function render()
      {
        // Add the store to the props of the redux connected component so that it can be referenced
        // in mapDispatchToProps with ownProps.
        return (
          _react2.default.createElement(ConnectedComponent, _extends({},
          this.props, {
            ref: this.setWrappedInstance,
            store: this.context.store, __source: { fileName: _jsxFileName, lineNumber: 144 } })));


      } }, { key: '__reactstandin__regenerateByEval', // @ts-ignore
      value: function __reactstandin__regenerateByEval(key, code) {// @ts-ignore
        this[key] = eval(code);} }]);return HOC;}(_react2.default.Component);
  HOC.displayName = 'connectWithStore(' + (ConnectedComponent.displayName || ConnectedComponent.name) + ')';
  // Opt in for the context.
  HOC.contextTypes = {
    store: _propTypes2.default.object };

  return (0, _hoistNonReactStatics2.default)(HOC, ConnectedComponent);
};

// This supports moving the react life cycle events into the model/business code.
var ReactLifeCycleComponent = function (_React$Component2) {_inherits(ReactLifeCycleComponent, _React$Component2);
  function ReactLifeCycleComponent(props) {_classCallCheck(this, ReactLifeCycleComponent);var _this2 = _possibleConstructorReturn(this, (ReactLifeCycleComponent.__proto__ || Object.getPrototypeOf(ReactLifeCycleComponent)).call(this,
    props));
    _this2.runFunction = _this2.runFunction.bind(_this2);
    _this2.runFunction(_this2.props.onConstructor);return _this2;
  }_createClass(ReactLifeCycleComponent, [{ key: 'runFunction', value: function runFunction(
    func) {var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      return func ? func.call.apply(func, [this].concat(_toConsumableArray(args))) : null;
    } }, { key: 'componentDidMount', value: function componentDidMount()
    {
      this.runFunction(this.props.componentDidMount);
    } }, { key: 'componentWillUnmount', value: function componentWillUnmount()
    {
      this.runFunction(this.props.componentWillUnmount);
    } }, { key: 'componentDidCatch', value: function componentDidCatch()
    {for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {args[_key2] = arguments[_key2];}
      this.runFunction(this.props.componentDidCatch, args);
    } }, { key: 'render', value: function render()
    {
      this.runFunction(this.props.onRender);
      // Render prop
      return this.props.componentToRender();
    } }, { key: '__reactstandin__regenerateByEval', // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {// @ts-ignore
      this[key] = eval(code);} }]);return ReactLifeCycleComponent;}(_react2.default.Component);
ReactLifeCycleComponent.propTypes = {
  componentToRender: _propTypes2.default.func.isRequired,
  onConstructor: _propTypes2.default.func,
  componentDidMount: _propTypes2.default.func,
  componentWillUnmount: _propTypes2.default.func,
  componentDidCatch: _propTypes2.default.func,
  onRender: _propTypes2.default.func };


var hookedLifeCycleComponent = function hookedLifeCycleComponent(Component) {var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var

  onConstructor =






  props.onConstructor,onRender = props.onRender,componentDidMount = props.componentDidMount,componentWillUnmount = props.componentWillUnmount,componentDidCatch = props.componentDidCatch,componentToRender = props.componentToRender,propsToPass = _objectWithoutProperties(props, ['onConstructor', 'onRender', 'componentDidMount', 'componentWillUnmount', 'componentDidCatch', 'componentToRender']);
  return (
    _react2.default.createElement(ReactLifeCycleComponent, {
      onConstructor: onConstructor,
      onRender: onRender,
      componentDidMount: componentDidMount,
      componentWillUnmount: componentWillUnmount,
      componentDidCatch: componentDidCatch,
      componentToRender: function componentToRender() {return _react2.default.createElement(Component, _extends({}, propsToPass, { __source: { fileName: _jsxFileName, lineNumber: 213 } }));}, __source: { fileName: _jsxFileName, lineNumber: 207 } }));


};

//
// Call this instead of connectWithStore to handle react life cycle events
// in your model code serviceFunctions object.
//
exports.hookedLifeCycleComponent = hookedLifeCycleComponent;var connectLifeCycleComponentWithStore = exports.connectLifeCycleComponentWithStore = function connectLifeCycleComponentWithStore(options) {
  var component = options.uiComponent;
  var hooked = function hooked(props) {return hookedLifeCycleComponent(component, props);};
  var newOptions = _extends({}, options, { uiComponent: hooked });
  return connectWithStore(newOptions);
};;(function () {var reactHotLoader = __webpack_require__(0).default;var leaveModule = __webpack_require__(0).leaveModule;if (!reactHotLoader) {return;}reactHotLoader.register(allServiceFunctionsToPropsWithStore, 'allServiceFunctionsToPropsWithStore', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/react-simpler-redux.js');reactHotLoader.register(allServiceFunctionsToProps, 'allServiceFunctionsToProps', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/react-simpler-redux.js');reactHotLoader.register(allStateToProps, 'allStateToProps', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/react-simpler-redux.js');reactHotLoader.register(allStateToPropsUsingSelectors, 'allStateToPropsUsingSelectors', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/react-simpler-redux.js');reactHotLoader.register(buildSelectorsFromUIState, 'buildSelectorsFromUIState', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/react-simpler-redux.js');reactHotLoader.register(allStateToPropsUsingUIState, 'allStateToPropsUsingUIState', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/react-simpler-redux.js');reactHotLoader.register(connectWithStore, 'connectWithStore', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/react-simpler-redux.js');reactHotLoader.register(ReactLifeCycleComponent, 'ReactLifeCycleComponent', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/react-simpler-redux.js');reactHotLoader.register(hookedLifeCycleComponent, 'hookedLifeCycleComponent', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/react-simpler-redux.js');reactHotLoader.register(connectLifeCycleComponentWithStore, 'connectLifeCycleComponentWithStore', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/react-simpler-redux.js');leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module), __webpack_require__(2)))

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
(function (global, factory) {
     true ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.hoistNonReactStatics = factory());
}(this, (function () {
    'use strict';
    
    var REACT_STATICS = {
        childContextTypes: true,
        contextTypes: true,
        defaultProps: true,
        displayName: true,
        getDefaultProps: true,
        getDerivedStateFromProps: true,
        mixins: true,
        propTypes: true,
        type: true
    };
    
    var KNOWN_STATICS = {
        name: true,
        length: true,
        prototype: true,
        caller: true,
        callee: true,
        arguments: true,
        arity: true
    };
    
    var defineProperty = Object.defineProperty;
    var getOwnPropertyNames = Object.getOwnPropertyNames;
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var getPrototypeOf = Object.getPrototypeOf;
    var objectPrototype = getPrototypeOf && getPrototypeOf(Object);
    
    return function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
        if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
            
            if (objectPrototype) {
                var inheritedComponent = getPrototypeOf(sourceComponent);
                if (inheritedComponent && inheritedComponent !== objectPrototype) {
                    hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
                }
            }
            
            var keys = getOwnPropertyNames(sourceComponent);
            
            if (getOwnPropertySymbols) {
                keys = keys.concat(getOwnPropertySymbols(sourceComponent));
            }
            
            for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                if (!REACT_STATICS[key] && !KNOWN_STATICS[key] && (!blacklist || !blacklist[key])) {
                    var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                    try { // Avoid failures from read-only properties
                        defineProperty(targetComponent, key, descriptor);
                    } catch (e) {}
                }
            }
            
            return targetComponent;
        }
        
        return targetComponent;
    };
})));


/***/ })
/******/ ]);