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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(8);
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module, process) {Object.defineProperty(exports, "__esModule", { value: true });exports.createModuleData = exports.stateAccessors = exports.reducersPreloadedState = exports.makeSharedModuleKeyName = exports.setStateFunction = exports.getStateFunction = exports.createStore = exports.registerSimplerRedux = exports.generalReducer = exports.srOptions = undefined;var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};


var _redux = __webpack_require__(7);
var _util = __webpack_require__(4);
var _proxy = __webpack_require__(9);var _proxy2 = _interopRequireDefault(_proxy);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}(function () {var enterModule = __webpack_require__(0).enterModule;enterModule && enterModule(module);})();function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       Written by Andrew Banks. MIT license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */var simplerReduxReducerKey = '@@@@@srReducerKey';
var simplerReduxObjectToMergeKey = '@@@@@srObjectToMergeKey';

var objectType = function objectType(obj) {return Object.prototype.toString.call(obj).slice(8, -1);};
var isObjectType = function isObjectType(obj) {return objectType(obj) === 'Object';};

var srOptions = exports.srOptions = void 0;

var makeSetRState = function makeSetRState(reduxStore) {
  return function (reducerKey, objToMerge, type) {var _reduxStore$dispatch;
    if (type === undefined) {
      type = reducerKey;
    }
    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducerKey !== 'string') {
        throw new Error('setRState: The first argument must be a string.');
      }
      if (!isObjectType(objToMerge)) {
        throw new Error('setRState: The second argument must be a primitive object type.');
      }
      if (typeof type !== 'string') {
        throw new Error('setRState: The third argument must be a string.');
      }
    }

    reduxStore.dispatch((_reduxStore$dispatch = {}, _defineProperty(_reduxStore$dispatch,
    simplerReduxReducerKey, reducerKey), _defineProperty(_reduxStore$dispatch,
    simplerReduxObjectToMergeKey, objToMerge), _defineProperty(_reduxStore$dispatch, 'type',
    type), _reduxStore$dispatch));


    reduxStore.listeners.forEach(function (listenerObj) {
      listenerObj.listener(reducerKey, objToMerge, type);
    });
  };
};

var makeGetRState = function makeGetRState(reduxStore) {
  return function (reducerKey) {
    var state = reduxStore.getState()[reducerKey];
    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducerKey !== 'string') {
        throw new Error('getRState: The first argument must be a string.');
      }
      if (state === undefined) {
        throw new Error('The reducerKey state at ' + reducerKey + ' is undefined. Did you forget to export an initialUIState or initialState from your model code?');
      }
    }
    return state;
  };
};

// These listeners do what redux subscribers should have done. It gives the reducerKey being modified
// so that a listener can quickly decide if it is concerned about changes in that reducerKey.
var addListener = function addListener(store) {
  return function (listener) {
    if (process.env.NODE_ENV !== 'production') {
      if (typeof listener !== 'function') {
        throw new Error('addListener: The first argument must be a function.');
      }
    }
    var id = store.listenerId++;
    store.listeners.push({ listener: listener, id: id });
    // Return a function that will remove this listener.
    return function () {
      var i = 0;
      for (; i < store.listeners.length && store.listeners[i].id !== id; ++i) {}
      if (i < store.listeners.length) {
        store.listeners.splice(i, 1);
      }
    };
  };
};

//
// Call this to generate your reducer.
//
var generalReducer = exports.generalReducer = function generalReducer(reducerKey, initialState) {
  if (process.env.NODE_ENV !== 'production') {
    if (reducerKey === undefined) {
      throw new Error('generalReducer: reducerKey must be defined.');
    }
    if (initialState === undefined) {
      throw new Error('generalReducer: initialState must be defined.');
    }
  }
  initialState = _extends({}, initialState);
  return function () {var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;var action = arguments[1];
    if (action[simplerReduxReducerKey] === reducerKey) {
      return _extends({}, state, action[simplerReduxObjectToMergeKey]);
    }
    return state;
  };
};

// Allows dynamic loading of simpler redux mvc components and their associated reducers.
var buildAddReducer = function buildAddReducer(store, preloadedState) {
  return function (reducerKey, initialState) {
    if (process.env.NODE_ENV !== 'production') {
      if (reducerKey === undefined) {
        throw new Error('addReducer: The first argument (reducerKey) must be defined.');
      }
      if (initialState === undefined) {
        throw new Error('addReducer: The second argument (initialState) must be defined.');
      }
    }
    // First load the initial state for the reducer.
    var state = _extends({}, initialState);
    // Then load the preloadedState for the keys that exist in the initial state.
    // Therefore, keys in preloadedState[reducerKey] that are not part of the current
    // state shape in initialState are considered deprecated and are ignored.
    var preloadedStateAtReducerKey = preloadedState[reducerKey];
    if (preloadedStateAtReducerKey !== undefined) {
      Object.keys(preloadedStateAtReducerKey).forEach(function (key) {
        if (state[key] !== undefined) {
          state[key] = preloadedStateAtReducerKey[key];
        }
      });
    }
    // One reducer with no typical redux reducers.
    if (store.isOneReducer) {
      var currentState = store.getState();
      // Do not use initialState on HMR.
      if (currentState === undefined || currentState[reducerKey] === undefined) {
        // Set the initialState state at the reducerKey.
        store.setRState(reducerKey, state);
      }
      return;
    }
    // Generate the reducer for reducerKey.
    var reducer = generalReducer(reducerKey, state);
    // Add the reducer to the current list.
    store.currentReducersObject = _extends({}, store.currentReducersObject, _defineProperty({}, reducerKey, reducer));
    // Replace the redux reducers with the new list.
    store.replaceReducer((0, _redux.combineReducers)(store.currentReducersObject));
  };
};

//
// This must be called with the redux store as a parameter after a createStore.
// Then use the return of this function in the react-redux Provider element as the store.
// If you pass in a rootReducersObject then you can use simpler-redux dynamic loading of reducers.
// Note: rootReducersObject is the actual reducers object and not the combineReducers output.
// If you want only dynamic reducers, use state => state (null reducer) for the redux createStore reducer
// and { } as the rootReducersObject for the call below.
// If you use rootReducersObject then you should also pass in preloadedState (if it exists).
// options
//  1) isDynamicReducer - Default to dynamic reducer loading for react components so that you do not have to specify isDynamicReducer in each component module.
//
var registerSimplerRedux = exports.registerSimplerRedux = function registerSimplerRedux(
reduxStore,
rootReducersObject)


{var preloadedState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  exports.srOptions = srOptions = (0, _util.defaultOptions)(options);
  var wrappedReduxStore = Object.create(reduxStore);
  wrappedReduxStore.setRState = makeSetRState(wrappedReduxStore);
  wrappedReduxStore.getRState = makeGetRState(wrappedReduxStore);
  wrappedReduxStore.addListener = addListener(wrappedReduxStore);
  wrappedReduxStore.listenerId = 0;
  wrappedReduxStore.listeners = [];
  // Support for dynamic reducer loading.
  if (rootReducersObject !== undefined) {
    wrappedReduxStore.isDynamicReducerLoading = function () {return true;};
    wrappedReduxStore.currentReducersObject = _extends({}, rootReducersObject);
    wrappedReduxStore.addReducer = buildAddReducer(wrappedReduxStore, _extends({}, preloadedState));
  } else {
    wrappedReduxStore.isDynamicReducerLoading = function () {return false;};
    if (process.env.NODE_ENV !== 'production') {
      wrappedReduxStore.addReducer = function () {
        throw new Error('To call addReducer, you must specify a rootReducersObject in the 2nd argument of registerSimplerRedux which can be just {}.');
      };
    }
  }
  return wrappedReduxStore;
};

//
// One reducer is not compatible with existing redux code. Must be all simpler-redux.
// This is the only reducer called for all state transitions.
//
var oneReducer = function oneReducer() {var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var action = arguments[1];
  var reducerKey = action[simplerReduxReducerKey];
  var objToMerge = action[simplerReduxObjectToMergeKey];
  // This is some redux thing, not from our setRState.
  if (reducerKey === undefined) {
    return state;
  }
  // Must change the upper level redux state pointer or redux does not recognize a state change.
  state = _extends({}, state);
  // Merge the incoming reducerKey state at the reducerKey
  state[reducerKey] = _extends({}, state[reducerKey], objToMerge);
  return state;
};

// This cannot be used with redux reducers.
var createStore = exports.createStore = function createStore(preloadedState, enhancer) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var reduxStore = (0, _redux.createStore)(
  oneReducer,
  preloadedState,
  enhancer);

  var wrappedReduxStore = registerSimplerRedux(
  reduxStore,
  {},
  preloadedState,
  options);

  wrappedReduxStore.isOneReducer = true;
  return wrappedReduxStore;
};

// This makes it easier to access reducerKey state previously given a reducerKey.
var getStateFunction = exports.getStateFunction = function getStateFunction(reducerKey) {return (
    function (state, key) {return (
        state[reducerKey][key]);});};

// This makes it easier to set reducerKey state previously given a reducerKey.
var setStateFunction = exports.setStateFunction = function setStateFunction(reducerKey) {return (
    function (store, mergeState, type) {return (
        store.setRState(reducerKey, mergeState, type));});};

// Use this to generate shared module keys.
var makeSharedModuleKeyName = exports.makeSharedModuleKeyName = function makeSharedModuleKeyName(key, options) {return '' +
  key + options.id;};

// Sifts out dynamically loaded reducer keys from the preloaded state in order to avoid
// a redux warning. Use the return of this function to pass into the redux createStore.
var reducersPreloadedState = exports.reducersPreloadedState = function reducersPreloadedState(reducersObject, preloadedState) {return (
    Object.keys(preloadedState).reduce(function (obj, key) {
      if (reducersObject[key] !== undefined) {
        obj[key] = preloadedState[key];
      }
      return obj;
    }, {}));};

var getState = function getState(store, reducerKey) {return (
    function () {return store.getRState(reducerKey);});};

var setState = function setState(store, reducerKey) {return (
    function (mergeState, type) {
      if (process.env.NODE_ENV !== 'production') {
        if (!isObjectType(mergeState)) {
          throw new Error('setState: The first argument must be a primitive object type.');
        }
      }
      store.setRState(reducerKey, mergeState, type);
    });};

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

// Creates general purpose module data under a redux reducerKey.
// A redux store must be imported from your redux createStore module for the argument below.
var createModuleData = exports.createModuleData = function createModuleData(store, reducerKey, initialState) {
  if (process.env.NODE_ENV !== 'production') {
    if (!store.isDynamicReducerLoading()) {
      throw new Error('To call createModuleData, you must specify a rootReducersObject in the 2nd argument of registerSimplerRedux which can be just {}.');
    }
    if (store === undefined) {
      throw new Error('The first parameter (store) to createModuleData must be defined.');
    }
    if (typeof reducerKey !== 'string') {
      throw new Error('The seccond parameter (reducerKey) to createModuleData must a string.');
    }
    if (initialState === undefined) {
      throw new Error('The third parameter (initialState) to createModuleData must be defined.');
    }
  }
  store.addReducer(reducerKey, initialState);
  return stateAccessors(store, reducerKey, initialState);
};;(function () {var reactHotLoader = __webpack_require__(0).default;var leaveModule = __webpack_require__(0).leaveModule;if (!reactHotLoader) {return;}reactHotLoader.register(simplerReduxReducerKey, 'simplerReduxReducerKey', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(simplerReduxObjectToMergeKey, 'simplerReduxObjectToMergeKey', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(objectType, 'objectType', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(isObjectType, 'isObjectType', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(srOptions, 'srOptions', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(makeSetRState, 'makeSetRState', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(makeGetRState, 'makeGetRState', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(addListener, 'addListener', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(generalReducer, 'generalReducer', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(buildAddReducer, 'buildAddReducer', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(registerSimplerRedux, 'registerSimplerRedux', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(oneReducer, 'oneReducer', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(createStore, 'createStore', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(getStateFunction, 'getStateFunction', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(setStateFunction, 'setStateFunction', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(makeSharedModuleKeyName, 'makeSharedModuleKeyName', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(reducersPreloadedState, 'reducersPreloadedState', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(getState, 'getState', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(setState, 'setState', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(stateAccessors, 'stateAccessors', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');reactHotLoader.register(createModuleData, 'createModuleData', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/simpler-redux.js');leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module), __webpack_require__(3)))

/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(exports, "__esModule", { value: true });var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};(function () {var enterModule = __webpack_require__(0).enterModule;enterModule && enterModule(module);})();var totalMSTPCalcs = 0;
var totalMSTPCache = 0;

var shallowSubObjectCompare = exports.shallowSubObjectCompare = function shallowSubObjectCompare(obj, subObj, subObjectkeys) {
  var len = subObjectkeys.length;
  for (var i = 0; i < len; ++i) {
    var key = subObjectkeys[i];
    if (subObj[key] !== obj[key]) {
      return false;
    }
  }
  return true;
};

var shallowCopy = exports.shallowCopy = function shallowCopy(obj, copykeys) {
  if (copykeys === undefined) {
    copykeys = Object.keys(obj);
  }
  var subObj = {};
  var len = copykeys.length;
  for (var i = 0; i < len; ++i) {
    var key = copykeys[i];
    subObj[key] = obj[key];
  }
  return subObj;
};

var displayMessage = function displayMessage(obj) {
  if (!obj.prevState) {
    console.log(obj.msg);
  } else {
    console.log(obj.msg + "\nprevState: %onextState: %o",

    obj.prevState,
    obj.nextState);

  }

  // Give the stats as performance feedback to developers.
  console.log("totalMSTPCalcs=" + totalMSTPCalcs + ", totalMSTPCache=" + totalMSTPCache);
};

var mapStateToPropsCache = function mapStateToPropsCache(obj) {
  totalMSTPCache++;
  displayMessage(obj);
};

var mapStateToPropsCalc = function mapStateToPropsCalc(obj) {
  totalMSTPCalcs++;
  displayMessage(obj);
};

var defaultOptions = exports.defaultOptions = function defaultOptions(options) {
  if (options === undefined) {
    return;
  }
  options = _extends({}, options);
  if (!options.mapStateToPropsCache) {
    options.mapStateToPropsCache = function () {};
  }
  if (!options.mapStateToPropsCalc) {
    options.mapStateToPropsCalc = function () {};
  }
  if (options.useDefaultMSTPCacheLogging) {
    options.mapStateToPropsCalc = mapStateToPropsCalc;
    options.mapStateToPropsCache = mapStateToPropsCache;
  }
  return options;
};;(function () {var reactHotLoader = __webpack_require__(0).default;var leaveModule = __webpack_require__(0).leaveModule;if (!reactHotLoader) {return;}reactHotLoader.register(totalMSTPCalcs, "totalMSTPCalcs", "C:/Users/Andrew/Documents/GitHub/simpler-redux/src/util.js");reactHotLoader.register(totalMSTPCache, "totalMSTPCache", "C:/Users/Andrew/Documents/GitHub/simpler-redux/src/util.js");reactHotLoader.register(shallowSubObjectCompare, "shallowSubObjectCompare", "C:/Users/Andrew/Documents/GitHub/simpler-redux/src/util.js");reactHotLoader.register(shallowCopy, "shallowCopy", "C:/Users/Andrew/Documents/GitHub/simpler-redux/src/util.js");reactHotLoader.register(displayMessage, "displayMessage", "C:/Users/Andrew/Documents/GitHub/simpler-redux/src/util.js");reactHotLoader.register(mapStateToPropsCache, "mapStateToPropsCache", "C:/Users/Andrew/Documents/GitHub/simpler-redux/src/util.js");reactHotLoader.register(mapStateToPropsCalc, "mapStateToPropsCalc", "C:/Users/Andrew/Documents/GitHub/simpler-redux/src/util.js");reactHotLoader.register(defaultOptions, "defaultOptions", "C:/Users/Andrew/Documents/GitHub/simpler-redux/src/util.js");leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _simplerRedux = __webpack_require__(2);Object.keys(_simplerRedux).forEach(function (key) {if (key === "default" || key === "__esModule") return;Object.defineProperty(exports, key, { enumerable: true, get: function get() {return _simplerRedux[key];} });});var _reactSimplerRedux = __webpack_require__(10);
Object.keys(_reactSimplerRedux).forEach(function (key) {if (key === "default" || key === "__esModule") return;Object.defineProperty(exports, key, { enumerable: true, get: function get() {return _reactSimplerRedux[key];} });});

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}Object.defineProperty(exports,"__esModule",{value:!0});var React=_interopDefault(__webpack_require__(5)),classCallCheck=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},inherits=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)},possibleConstructorReturn=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},AppContainer=function(e){function t(){return classCallCheck(this,t),possibleConstructorReturn(this,e.apply(this,arguments))}return inherits(t,e),t.prototype.render=function(){return React.Children.only(this.props.children)},t}(React.Component),hot_prod=function(){return function(e){return e}},areComponentsEqual=function(e,t){return e===t},setConfig=function(){};exports.AppContainer=AppContainer,exports.hot=hot_prod,exports.areComponentsEqual=areComponentsEqual,exports.setConfig=setConfig;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(exports, "__esModule", { value: true });(function () {var enterModule = __webpack_require__(0).enterModule;enterModule && enterModule(module);})();function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var proxyDefined = function proxyDefined() {return (
    typeof Proxy !== 'undefined');};

var getReducerKeyValue = function getReducerKeyValue(simplerReduxStore, reducerKey, key) {return (
    simplerReduxStore.getRState(reducerKey)[key]);};

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

var simulateProxy = function simulateProxy(simplerReduxStore, reducerKey, initialState) {return (
    Object.keys(initialState).reduce(function (obj, key) {
      defineProxyGetSet(obj, simplerReduxStore, reducerKey, key);
      return obj;
    }, {}));};

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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module, process) {Object.defineProperty(exports, "__esModule", { value: true });exports.connectWithStore = exports.connectLifeCycleComponentWithStore = exports.hookedLifeCycleComponent = exports.buildSelectorsFromUIState = exports.allStateToPropsUsingSelectorList = exports.allStateToPropsUsingSelectors = exports.allStateToProps = exports.allServiceFunctionsToPropsUsingServiceFunctionList = exports.allServiceFunctionsToProps = exports.allServiceFunctionsToPropsWithStore = undefined;var _jsxFileName = 'C:\\Users\\Andrew\\Documents\\GitHub\\simpler-redux\\src\\react-simpler-redux.js';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};var _react = __webpack_require__(5);var _react2 = _interopRequireDefault(_react);
var _reactRedux = __webpack_require__(11);
var _propTypes = __webpack_require__(12);var _propTypes2 = _interopRequireDefault(_propTypes);
var _hoistNonReactStatics = __webpack_require__(13);var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);
var _simplerRedux = __webpack_require__(2);
var _util = __webpack_require__(4);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}(function () {var enterModule = __webpack_require__(0).enterModule;enterModule && enterModule(module);})();function _objectWithoutProperties(obj, keys) {var target = {};for (var i in obj) {if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];}return target;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}}

// React lifecycle events supported in the model code.
var reactLifeCycleEvents = {
  onConstructor: 'onConstructor',
  onRender: 'onRender',
  componentDidMount: 'componentDidMount',
  componentWillUnmount: 'componentWillUnmount',
  componentDidCatch: 'componentDidCatch',
  componentToRender: 'componentToRender'


  //
  // Builds a mapDispatchToProps function based on the service functions and adds the store as
  // the first parameter to each service function and the rest of the parameters given
  // by the react UI component when called in react.
  //
};var allServiceFunctionsToPropsWithStore = exports.allServiceFunctionsToPropsWithStore = function allServiceFunctionsToPropsWithStore(serviceFunctions) {
  var keys = Object.keys(serviceFunctions);
  return function (_dispatch, ownProps) {return (
      keys.reduce(function (obj, e) {
        obj[e] = function () {for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}return serviceFunctions[e].apply(serviceFunctions, [ownProps.store].concat(args));};
        return obj;
      }, {}));};
};

//
// Builds a mapDispatchToProps function based on the service functions and adds
// all of the parameters given by the react UI component when called in react.
//
var allServiceFunctionsToProps = exports.allServiceFunctionsToProps = function allServiceFunctionsToProps(serviceFunctions) {return (
    function () {return _extends({}, serviceFunctions);});};

//
// Builds a mapDispatchToProps function based on a serviceFunctionList object.
// This allows including service functions from various modules.
// The keylist allows selecting only a subset of a module's service functions.
// If keylist is not specified then all service functions will be included.
//
var allServiceFunctionsToPropsUsingServiceFunctionList = exports.allServiceFunctionsToPropsUsingServiceFunctionList = function allServiceFunctionsToPropsUsingServiceFunctionList(serviceFunctionList) {
  serviceFunctionList = [].concat(_toConsumableArray(serviceFunctionList));
  return function (_dispatch, ownProps) {return (
      serviceFunctionList.reduce(function (obj, e) {
        var keylist = e.keylist ? e.keylist : Object.keys(e.serviceFunctions);
        keylist.forEach(function (key) {
          if (e.withStore) {
            obj[key] = function () {var _e$serviceFunctions;for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {args[_key2] = arguments[_key2];}return (_e$serviceFunctions = e.serviceFunctions)[key].apply(_e$serviceFunctions, [ownProps.store].concat(args));};
          } else {
            obj[key] = function () {var _e$serviceFunctions2;return (_e$serviceFunctions2 = e.serviceFunctions)[key].apply(_e$serviceFunctions2, arguments);};
          }
        });
        return obj;
      }, {}));};
};

//
// Builds a mapStateToProps function that returns the entire reducer state.
//
var allStateToProps = exports.allStateToProps = function allStateToProps(reducerKey) {
  return function (state) {
    if (process.env.NODE_ENV !== 'production') {
      _simplerRedux.srOptions.mapStateToPropsCache({
        msg: 'mapStateToProps fast calculation at ' + reducerKey + ', cache not needed.',
        reducerKey: reducerKey });

    }
    return state[reducerKey];
  };
};

//
// Builds a mapStateToProps function based on a selectors object.
//
var allStateToPropsUsingSelectors = exports.allStateToPropsUsingSelectors = function allStateToPropsUsingSelectors(selectors, reducerKey) {
  var keys = Object.keys(selectors);
  if (!reducerKey) {
    return (
      function (state) {return (
          keys.reduce(function (obj, e) {
            obj[e] = selectors[e](state);
            return obj;
          }, {}));});

  }
  // Implements a caching mechanism below such that if the state at the reducerKey did not change
  // then we return the previously calculated object.
  var prevState = void 0;
  var lastresult = void 0;
  return function (state) {
    if (prevState !== state[reducerKey]) {
      if (process.env.NODE_ENV !== 'production') {
        _simplerRedux.srOptions.mapStateToPropsCalc({
          msg: 'selector calculated ' + reducerKey,
          prevState: prevState,
          nextState: state[reducerKey],
          reducerKey: reducerKey });

      }
      prevState = state[reducerKey];
      lastresult = keys.reduce(function (obj, e) {
        obj[e] = selectors[e](state);
        return obj;
      }, {});
    } else {
      if (process.env.NODE_ENV !== 'production') {
        _simplerRedux.srOptions.mapStateToPropsCache({
          msg: 'selector cache ' + reducerKey,
          prevState: prevState,
          nextState: state[reducerKey],
          reducerKey: reducerKey });

      }
    }
    return lastresult;
  };
};

//
// Builds a mapStateToProps function based on a selectorList object.
// This allows including selectors from various modules.
// The keylist allows selecting only a subset of a module's selectors.
// If keylist is not specified then all selectors will be included.
//
var allStateToPropsUsingSelectorList = exports.allStateToPropsUsingSelectorList = function allStateToPropsUsingSelectorList(selectorList, componentName) {
  selectorList = [].concat(_toConsumableArray(selectorList));
  var useCache = true;
  var reducerKeys = [];
  for (var i = 0; i < selectorList.length; ++i) {
    if (selectorList[i].keylist === undefined) {
      selectorList[i].keylist = Object.keys(selectorList[i].selectors);
    }
    var reducerKey = selectorList[i].reducerKey;
    if (reducerKey) {
      reducerKeys.push(reducerKey);
    } else {
      useCache = false;
    }
  }
  if (componentName === undefined) {
    componentName = reducerKeys.toString();
  }
  if (useCache) {
    var prevStates = {};
    var lastResult = void 0;
    return function (state) {
      if (!(0, _util.shallowSubObjectCompare)(state, prevStates, reducerKeys)) {
        if (process.env.NODE_ENV !== 'production') {
          _simplerRedux.srOptions.mapStateToPropsCalc({
            msg: 'Selector List calculated ' + componentName + '.',
            nextState: (0, _util.shallowCopy)(state, reducerKeys),
            prevState: prevStates,
            reducerKeys: reducerKeys });

        }
        prevStates = (0, _util.shallowCopy)(state, reducerKeys);
        lastResult = selectorList.reduce(function (obj, e) {
          e.keylist.forEach(function (key) {
            obj[key] = e.selectors[key](state);
          });
          return obj;
        }, {});
      } else {
        if (process.env.NODE_ENV !== 'production') {
          _simplerRedux.srOptions.mapStateToPropsCache({
            msg: 'Selector List cache ' + componentName + '.',
            nextState: (0, _util.shallowCopy)(state, reducerKeys),
            prevState: prevStates,
            reducerKeys: reducerKeys });

        }
      }
      return lastResult;
    };
  }
  reducerKeys = [];
  return function (state) {return (
      selectorList.reduce(function (obj, e) {
        e.keylist.forEach(function (key) {
          obj[key] = e.selectors[key](state);
        });
        return obj;
      }, {}));};
};

//
// Builds a model selectors object from either initialUIState or initialState.
// initialUIState should only contain keys that you want in the
// props of the react component.
// This is not for specialized selectors for the UI that require conjunctions or
// selectors from other modules, etc.
// It is only for simple selectors of the nature state => state[reducerKey][stateKey]
//
var buildSelectorsFromUIState = exports.buildSelectorsFromUIState = function buildSelectorsFromUIState(reducerKey, initialState) {
  var keys = Object.keys(initialState);
  return keys.reduce(function (obj, e) {
    obj[e] = function (state) {return state[reducerKey][e];};
    return obj;
  }, {});
};

//
// Builds a mapStateToProps function that returns key/UI State pairs
//
var allStateToPropsUsingUIState = function allStateToPropsUsingUIState(reducerKey, initialUIState) {
  var keys = Object.keys(initialUIState);
  var prevState = void 0;
  var lastResult = void 0;
  return function (state) {
    if (state[reducerKey] !== prevState) {
      if (process.env.NODE_ENV !== 'production') {
        _simplerRedux.srOptions.mapStateToPropsCalc({
          msg: 'State props calculated at ' + reducerKey + '.',
          nextState: state[reducerKey],
          prevState: prevState,
          reducerKey: reducerKey });

      }
      prevState = state[reducerKey];
      lastResult = (0, _util.shallowCopy)(state[reducerKey], keys);
    } else {
      if (process.env.NODE_ENV !== 'production') {
        _simplerRedux.srOptions.mapStateToPropsCache({
          msg: 'State props cache at ' + reducerKey + '.',
          nextState: state[reducerKey],
          prevState: prevState,
          reducerKey: reducerKey });

      }
    }
    return lastResult;
  };
};

var buildCachedMapStateToProps = function buildCachedMapStateToProps(mapStateToProps, mapStateToPropsReducerKeys, componentName) {
  if (!Array.isArray(mapStateToPropsReducerKeys)) {
    mapStateToPropsReducerKeys = [mapStateToPropsReducerKeys];
  }
  if (componentName === undefined) {
    componentName = mapStateToPropsReducerKeys.toString();
  }
  var prevStates = {};
  var lastResult = void 0;
  return function (state) {
    if (!(0, _util.shallowSubObjectCompare)(state, prevStates, mapStateToPropsReducerKeys)) {
      if (process.env.NODE_ENV !== 'production') {
        _simplerRedux.srOptions.mapStateToPropsCalc({
          msg: 'mapStateToProps calculated ' + componentName + '.',
          nextState: (0, _util.shallowCopy)(state, mapStateToPropsReducerKeys),
          prevState: prevStates,
          reducerKeys: mapStateToPropsReducerKeys });

      }
      prevStates = (0, _util.shallowCopy)(state, mapStateToPropsReducerKeys);
      lastResult = mapStateToProps(state);
    } else {
      if (process.env.NODE_ENV !== 'production') {
        _simplerRedux.srOptions.mapStateToPropsCache({
          msg: 'mapStateToProps cache ' + componentName + '.',
          nextState: (0, _util.shallowCopy)(state, mapStateToPropsReducerKeys),
          prevState: prevStates,
          reducerKeys: mapStateToPropsReducerKeys });

      }
    }
    return lastResult;
  };
};

var connectWithStoreBase = function connectWithStoreBase(
options)
{var

  uiComponent =
















  options.uiComponent,reduxOptions = options.reduxOptions,storeIsDefinedCallback = options.storeIsDefinedCallback,reducerKey = options.reducerKey,isDynamicReducer = options.isDynamicReducer,initialState = options.initialState,mapStateToProps = options.mapStateToProps,mapDispatchToProps = options.mapDispatchToProps,serviceFunctions = options.serviceFunctions,serviceFunctionList = options.serviceFunctionList,selectors = options.selectors,selectorList = options.selectorList,initialUIState = options.initialUIState,noStoreParameterOnServiceFunctions = options.noStoreParameterOnServiceFunctions,mergeProps = options.mergeProps,mapStateToPropsReducerKeys = options.mapStateToPropsReducerKeys,componentName = options.componentName;

  if (process.env.NODE_ENV !== 'production') {
    if (uiComponent === undefined) {
      throw new Error('connectWithStore: options.uiComponent cannot be undefined, reducerKey=' + reducerKey + '.');
    }
    if (storeIsDefinedCallback && typeof storeIsDefinedCallback !== 'function') {
      throw new Error('connectWithStore: options.storeIsDefinedCallback must be a function, reducerKey=' + reducerKey + '.');
    }
    if (selectors !== undefined && initialUIState !== undefined) {
      throw new Error('connectWithStore: Cannot export both selectors and initialUIState, reducerKey=' + reducerKey + '.');
    }
    var displayName = '';
    if (uiComponent !== undefined) {
      if (uiComponent.displayName !== undefined) {
        displayName = uiComponent.displayName;
      } else {
        displayName = uiComponent.name;
      }
    }
    if (selectorList !== undefined) {
      selectorList.forEach(function (e) {
        if (e.keylist !== undefined) {
          e.keylist.forEach(function (key) {
            if (typeof e.selectors[key] !== 'function') {
              throw new Error('connectWithStore ' + displayName + ': The selectors key ' + key + ' is not in the selectors ' + e.keylist.toString() + '.');
            }
          });
        }
      });
    }
    if (serviceFunctionList !== undefined) {
      serviceFunctionList.forEach(function (e) {
        if (e.keylist !== undefined) {
          e.keylist.forEach(function (key) {
            if (typeof e.serviceFunctions[key] !== 'function') {
              throw new Error('connectWithStore ' + displayName + ': The serviceFunctions key ' + key + ' is not in the serviceFunctionList ' + e.keylist.toString() + '.');
            }
          });
        }
      });
    }
  }

  if (componentName === undefined) {
    componentName = reducerKey;
  }

  // Default initialState (reducer state) to initialUIState (component props state).
  if (initialState === undefined) {
    initialState = initialUIState;
  }

  // Default initialUIState (component props state) to initialState (reducer state).
  if (initialUIState === undefined) {
    initialUIState = initialState;
  }

  var withRef = reduxOptions && reduxOptions.withRef;
  if (initialState !== undefined) {
    initialState = _extends({}, initialState);
  }

  // If mapStateToProps is defined by the consumer then keep it no matter what.
  if (mapStateToProps !== undefined) {
    if (mapStateToPropsReducerKeys !== undefined) {
      mapStateToProps = buildCachedMapStateToProps(mapStateToProps, mapStateToPropsReducerKeys, componentName);
    }
  } else {
    if (selectorList !== undefined) {
      mapStateToProps = allStateToPropsUsingSelectorList(selectorList, componentName);
    } else if (selectors !== undefined) {
      mapStateToProps = allStateToPropsUsingSelectors(selectors, reducerKey);
    } else if (reducerKey !== undefined && initialUIState !== undefined) {
      // This is for efficiency. initialUIState and initialState are the same so
      // mapStateToProps simply returns the entire reducerKey state.
      if (Object.keys(initialUIState).length === Object.keys(initialState).length) {
        mapStateToProps = allStateToProps(reducerKey);
      } else {
        mapStateToProps = allStateToPropsUsingUIState(reducerKey, initialUIState);
      }
    }
  }

  // If mapDispatchToProps is defined by the consumer then keep it no matter what.
  if (mapDispatchToProps === undefined) {
    if (serviceFunctionList !== undefined) {
      mapDispatchToProps = allServiceFunctionsToPropsUsingServiceFunctionList(serviceFunctionList);
    } else if (serviceFunctions !== undefined) {
      if (noStoreParameterOnServiceFunctions) {
        mapDispatchToProps = allServiceFunctionsToProps(serviceFunctions);
      } else {
        mapDispatchToProps = allServiceFunctionsToPropsWithStore(serviceFunctions);
      }
    }
  }

  // Call the react-redux connect.
  var ConnectedComponent = (0, _reactRedux.connect)(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  reduxOptions)(
  uiComponent);var

  HOC = function (_React$Component) {_inherits(HOC, _React$Component);
    function HOC(props, context) {_classCallCheck(this, HOC);

      // Handles the dynamic loading of the reducer.
      var _this = _possibleConstructorReturn(this, (HOC.__proto__ || Object.getPrototypeOf(HOC)).call(this, props, context));if (isDynamicReducer !== false && _this.context.store.isDynamicReducerLoading()) {
        // This will build the reducer and add it to the reducers object.
        if (reducerKey !== undefined && initialState !== undefined) {
          _this.context.store.addReducer(reducerKey, initialState);
        }
      }
      // Handles a callback for the consumer to cache and/or use the store.
      if (storeIsDefinedCallback) {
        storeIsDefinedCallback(_this.context.store, _simplerRedux.stateAccessors);
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
          if (process.env.NODE_ENV !== 'production') {
            if (typeof ref.getWrappedInstance !== 'function') {
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
            store: this.context.store, __source: { fileName: _jsxFileName, lineNumber: 446 } })));


      } }, { key: '__reactstandin__regenerateByEval', // @ts-ignore
      value: function __reactstandin__regenerateByEval(key, code) {// @ts-ignore
        this[key] = eval(code);} }]);return HOC;}(_react2.default.Component);
  HOC.displayName = 'connectWithStore(' + (ConnectedComponent.displayName || ConnectedComponent.name) + ')';
  // Opt in for the context.
  HOC.contextTypes = {
    store: _propTypes2.default.object };

  return (0, _hoistNonReactStatics2.default)(HOC, ConnectedComponent);
};

//
// This supports moving the react life cycle events into the model/business code serviceFunctions functions object.
//
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
    {for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {args[_key3] = arguments[_key3];}
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
  onConstructor: _propTypes2.default.func,
  onRender: _propTypes2.default.func,
  componentDidMount: _propTypes2.default.func,
  componentWillUnmount: _propTypes2.default.func,
  componentDidCatch: _propTypes2.default.func,
  componentToRender: _propTypes2.default.func.isRequired };


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
      componentToRender: function componentToRender() {return _react2.default.createElement(Component, _extends({}, propsToPass, { __source: { fileName: _jsxFileName, lineNumber: 517 } }));}, __source: { fileName: _jsxFileName, lineNumber: 511 } }));


};exports.hookedLifeCycleComponent = hookedLifeCycleComponent;

var connectLifeCycleComponentWithStore = exports.connectLifeCycleComponentWithStore = function connectLifeCycleComponentWithStore(options) {
  if (process.env.NODE_ENV !== 'production') {
    if (options.serviceFunctions === undefined) {
      throw new Error('connectLifeCycleComponentWithStore: You must define and export a serviceFunctions object in the model code in order to use this function.');
    }
  }
  var component = options.uiComponent;
  var hookedLCC = function hookedLCC(props) {return hookedLifeCycleComponent(component, props);};
  var newOptions = _extends({}, options, { uiComponent: hookedLCC });
  return connectWithStoreBase(newOptions);
};

/*
   options object parameter
   
   reducerKey - (required) The key in the redux store for this module
   initialState - (required) The initial state that will be used in the reducer for initialization.
   initialUIState - (optional) If this is specified then simpler-redux will build a mapStateToProps
     function based on the keys in this object.
   selectors - (optional) If this is specified then simpler-redux will build a mapStateToProps
     function based on the selectors object.
   selectorList - (Optionsl) An array of {selectors, keylist[list of selector keys]}. This allows
     combining selectors from different modules into one in order to build a mapStateToProps that
     includes key/values from other reducers keys including the component reducer selectors. If you
     specify keylist then you can include only a subset of the selectors indtead of all of them.
   serviceFunctions - (optional) If this is specified then simpler-redux will build a mapDispatchToProps
     function based on the keys in this object. These will be the service functions exposed to the
     the react component in the props.
   serviceFunctionList` - An array of {serviceFunctions, keylist[list of serviceFunctions keys],
     withStore}. This allows combining serviceFunctions from different modules into one in order
     to build a mapDispatchToProps that includes key/values from other module serviceFunctions.
     The keylist allows you to select only a subset of the associated service functions. The withStore
     set to true will cause the store to be the first parameter for all the service functions when
     called with the UI parameters following after.
   noStoreParameterOnServiceFunctions = true (Optional) - By default, simpler-redux injects the store as the
     first parameter when any service function is called by the UI. The UI parameters follow.
     If this is set to true then simpler-redux will not do this store injection.
   storeIsDefinedCallback(store, stateAccessors) - (Optional) If this is specified then simpler-redux will call
     this function with the simpler redux store as a parameter when the store becomes available to the react
     component. Use this to call the simpler-redux stateAccessors in order to gain access to
     setState, getState and reducerState.
     Example:
     let setState, reducerState
     export const storeIsDefinedCallback = (store, stateAccessors) =>
       ({setState, reducerState} = stateAccessors(store, reducerKey, initialState))
   isDynamicReducer - (Optional) This supports dynamic reducer loading. For this, simpler-redux
       automatically takes care of building the reducer and loading it into the reducers object.
   
   Note: If you present any redux state in the react component then you must define and export either
     a selectors object or an initialUIState object. Otherwise, you will not have any state in
     the props of the react component.
   */
var connectWithStore = exports.connectWithStore = function connectWithStore(options) {
  // First decide if the serviceFunctions object contains react lifecycle calls.
  if (options.serviceFunctions !== undefined) {
    var hasLifeCycle = Object.keys(options.serviceFunctions).some(function (e) {return (
        reactLifeCycleEvents[e] !== undefined);});

    if (hasLifeCycle) {
      return connectLifeCycleComponentWithStore(options);
    }
  }
  // No react lifecycle calls.
  return connectWithStoreBase(options);
};;(function () {var reactHotLoader = __webpack_require__(0).default;var leaveModule = __webpack_require__(0).leaveModule;if (!reactHotLoader) {return;}reactHotLoader.register(reactLifeCycleEvents, 'reactLifeCycleEvents', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/react-simpler-redux.js');reactHotLoader.register(allServiceFunctionsToPropsWithStore, 'allServiceFunctionsToPropsWithStore', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/react-simpler-redux.js');reactHotLoader.register(allServiceFunctionsToProps, 'allServiceFunctionsToProps', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/react-simpler-redux.js');reactHotLoader.register(allServiceFunctionsToPropsUsingServiceFunctionList, 'allServiceFunctionsToPropsUsingServiceFunctionList', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/react-simpler-redux.js');reactHotLoader.register(allStateToProps, 'allStateToProps', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/react-simpler-redux.js');reactHotLoader.register(allStateToPropsUsingSelectors, 'allStateToPropsUsingSelectors', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/react-simpler-redux.js');reactHotLoader.register(allStateToPropsUsingSelectorList, 'allStateToPropsUsingSelectorList', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/react-simpler-redux.js');reactHotLoader.register(buildSelectorsFromUIState, 'buildSelectorsFromUIState', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/react-simpler-redux.js');reactHotLoader.register(allStateToPropsUsingUIState, 'allStateToPropsUsingUIState', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/react-simpler-redux.js');reactHotLoader.register(buildCachedMapStateToProps, 'buildCachedMapStateToProps', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/react-simpler-redux.js');reactHotLoader.register(connectWithStoreBase, 'connectWithStoreBase', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/react-simpler-redux.js');reactHotLoader.register(ReactLifeCycleComponent, 'ReactLifeCycleComponent', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/react-simpler-redux.js');reactHotLoader.register(hookedLifeCycleComponent, 'hookedLifeCycleComponent', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/react-simpler-redux.js');reactHotLoader.register(connectLifeCycleComponentWithStore, 'connectLifeCycleComponentWithStore', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/react-simpler-redux.js');reactHotLoader.register(connectWithStore, 'connectWithStore', 'C:/Users/Andrew/Documents/GitHub/simpler-redux/src/react-simpler-redux.js');leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module), __webpack_require__(3)))

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 13 */
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