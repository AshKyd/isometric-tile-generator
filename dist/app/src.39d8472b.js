// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"QPfz":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectScope = void 0;
exports.computed = computed;
exports.customRef = customRef;
exports.default = Vue;
exports.defineAsyncComponent = defineAsyncComponent;
exports.defineComponent = defineComponent;
exports.del = del;
exports.effectScope = effectScope;
exports.getCurrentInstance = getCurrentInstance;
exports.getCurrentScope = getCurrentScope;
exports.h = h;
exports.inject = inject;
exports.isProxy = isProxy;
exports.isReactive = isReactive;
exports.isReadonly = isReadonly;
exports.isRef = isRef;
exports.isShallow = isShallow;
exports.markRaw = markRaw;
exports.mergeDefaults = mergeDefaults;
exports.nextTick = nextTick;
exports.onDeactivated = exports.onBeforeUpdate = exports.onBeforeUnmount = exports.onBeforeMount = exports.onActivated = void 0;
exports.onErrorCaptured = onErrorCaptured;
exports.onRenderTriggered = exports.onRenderTracked = exports.onMounted = void 0;
exports.onScopeDispose = onScopeDispose;
exports.onUpdated = exports.onUnmounted = exports.onServerPrefetch = void 0;
exports.provide = provide;
exports.proxyRefs = proxyRefs;
exports.reactive = reactive;
exports.readonly = readonly;
exports.ref = ref$1;
exports.set = set;
exports.shallowReactive = shallowReactive;
exports.shallowReadonly = shallowReadonly;
exports.shallowRef = shallowRef;
exports.toRaw = toRaw;
exports.toRef = toRef;
exports.toRefs = toRefs;
exports.triggerRef = triggerRef;
exports.unref = unref;
exports.useAttrs = useAttrs;
exports.useCssModule = useCssModule;
exports.useCssVars = useCssVars;
exports.useListeners = useListeners;
exports.useSlots = useSlots;
exports.version = void 0;
exports.watch = watch;
exports.watchEffect = watchEffect;
exports.watchPostEffect = watchPostEffect;
exports.watchSyncEffect = watchSyncEffect;
/*!
 * Vue.js v2.7.16
 * (c) 2014-2023 Evan You
 * Released under the MIT License.
 */
var emptyObject = Object.freeze({});
var isArray = Array.isArray;
// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef(v) {
  return v === undefined || v === null;
}
function isDef(v) {
  return v !== undefined && v !== null;
}
function isTrue(v) {
  return v === true;
}
function isFalse(v) {
  return v === false;
}
/**
 * Check if value is primitive.
 */
function isPrimitive(value) {
  return typeof value === 'string' || typeof value === 'number' ||
  // $flow-disable-line
  typeof value === 'symbol' || typeof value === 'boolean';
}
function isFunction(value) {
  return typeof value === 'function';
}
/**
 * Quick object check - this is primarily used to tell
 * objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}
/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;
function toRawType(value) {
  return _toString.call(value).slice(8, -1);
}
/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}
function isRegExp(v) {
  return _toString.call(v) === '[object RegExp]';
}
/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}
function isPromise(val) {
  return isDef(val) && typeof val.then === 'function' && typeof val.catch === 'function';
}
/**
 * Convert a value to a string that is actually rendered.
 */
function toString(val) {
  return val == null ? '' : Array.isArray(val) || isPlainObject(val) && val.toString === _toString ? JSON.stringify(val, replacer, 2) : String(val);
}
function replacer(_key, val) {
  // avoid circular deps from v3
  if (val && val.__v_isRef) {
    return val.value;
  }
  return val;
}
/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
}
/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap(str, expectsLowerCase) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? function (val) {
    return map[val.toLowerCase()];
  } : function (val) {
    return map[val];
  };
}
/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);
/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');
/**
 * Remove an item from an array.
 */
function remove$2(arr, item) {
  var len = arr.length;
  if (len) {
    // fast path for the only / last item
    if (item === arr[len - 1]) {
      arr.length = len - 1;
      return;
    }
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}
/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});
/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */
/* istanbul ignore next */
function polyfillBind(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  }
  boundFn._length = fn.length;
  return boundFn;
}
function nativeBind(fn, ctx) {
  return fn.bind(ctx);
}
// @ts-expect-error bind cannot be `undefined`
var bind = Function.prototype.bind ? nativeBind : polyfillBind;
/**
 * Convert an Array-like object to a real Array.
 */
function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret;
}
/**
 * Mix properties into target object.
 */
function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to;
}
/**
 * Merge an Array of Objects into a single Object.
 */
function toObject(arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
}
/* eslint-disable no-unused-vars */
/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop(a, b, c) {}
/**
 * Always return false.
 */
var no = function (a, b, c) {
  return false;
};
/* eslint-enable no-unused-vars */
/**
 * Return the same value.
 */
var identity = function (_) {
  return _;
};
/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual(a, b) {
  if (a === b) return true;
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        /* istanbul ignore next */
        return false;
      }
    } catch (e) {
      /* istanbul ignore next */
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}
/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) return i;
  }
  return -1;
}
/**
 * Ensure a function is called only once.
 */
function once(fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#polyfill
function hasChanged(x, y) {
  if (x === y) {
    return x === 0 && 1 / x !== 1 / y;
  } else {
    return x === x || y === y;
  }
}
var SSR_ATTR = 'data-server-rendered';
var ASSET_TYPES = ['component', 'directive', 'filter'];
var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated', 'errorCaptured', 'serverPrefetch', 'renderTracked', 'renderTriggered'];
var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),
  /**
   * Whether to suppress warnings.
   */
  silent: false,
  /**
   * Show production mode tip message on boot?
   */
  productionTip: "production" !== 'production',
  /**
   * Whether to enable devtools
   */
  devtools: "production" !== 'production',
  /**
   * Whether to record perf
   */
  performance: false,
  /**
   * Error handler for watcher errors
   */
  errorHandler: null,
  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,
  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],
  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),
  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,
  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,
  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,
  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,
  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,
  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,
  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,
  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
};

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
/**
 * Check if a string starts with $ or _
 */
function isReserved(str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5f;
}
/**
 * Define a property.
 */
function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}
/**
 * Parse simple path.
 */
var bailRE = new RegExp("[^".concat(unicodeRegExp.source, ".$_\\d]"));
function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) return;
      obj = obj[segments[i]];
    }
    return obj;
  };
}

// can we use __proto__?
var hasProto = ('__proto__' in {});
// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
UA && /chrome\/\d+/.test(UA) && !isEdge;
UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);
// Firefox has a "watch" function on Object.prototype...
// @ts-expect-error firebox support
var nativeWatch = {}.watch;
var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', {
      get: function () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    }); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}
// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer;
};
// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
/* istanbul ignore next */
function isNative(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}
var hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) && typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);
var _Set; // $flow-disable-line
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /** @class */function () {
    function Set() {
      this.set = Object.create(null);
    }
    Set.prototype.has = function (key) {
      return this.set[key] === true;
    };
    Set.prototype.add = function (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function () {
      this.set = Object.create(null);
    };
    return Set;
  }();
}
var currentInstance = null;
/**
 * This is exposed for compatibility with v3 (e.g. some functions in VueUse
 * relies on it). Do not use this internally, just use `currentInstance`.
 *
 * @internal this function needs manual type declaration because it relies
 * on previously manually authored types from Vue 2
 */
function getCurrentInstance() {
  return currentInstance && {
    proxy: currentInstance
  };
}
/**
 * @internal
 */
function setCurrentInstance(vm) {
  if (vm === void 0) {
    vm = null;
  }
  if (!vm) currentInstance && currentInstance._scope.off();
  currentInstance = vm;
  vm && vm._scope.on();
}

/**
 * @internal
 */
var VNode = /** @class */function () {
  function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text;
    this.elm = elm;
    this.ns = undefined;
    this.context = context;
    this.fnContext = undefined;
    this.fnOptions = undefined;
    this.fnScopeId = undefined;
    this.key = data && data.key;
    this.componentOptions = componentOptions;
    this.componentInstance = undefined;
    this.parent = undefined;
    this.raw = false;
    this.isStatic = false;
    this.isRootInsert = true;
    this.isComment = false;
    this.isCloned = false;
    this.isOnce = false;
    this.asyncFactory = asyncFactory;
    this.asyncMeta = undefined;
    this.isAsyncPlaceholder = false;
  }
  Object.defineProperty(VNode.prototype, "child", {
    // DEPRECATED: alias for componentInstance for backwards compat.
    /* istanbul ignore next */
    get: function () {
      return this.componentInstance;
    },
    enumerable: false,
    configurable: true
  });
  return VNode;
}();
var createEmptyVNode = function (text) {
  if (text === void 0) {
    text = '';
  }
  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node;
};
function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val));
}
// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode(vnode) {
  var cloned = new VNode(vnode.tag, vnode.data,
  // #7975
  // clone children array to avoid mutating original in case of cloning
  // a child.
  vnode.children && vnode.children.slice(), vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory);
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned;
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function () {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
var uid$2 = 0;
var pendingCleanupDeps = [];
var cleanupDeps = function () {
  for (var i = 0; i < pendingCleanupDeps.length; i++) {
    var dep = pendingCleanupDeps[i];
    dep.subs = dep.subs.filter(function (s) {
      return s;
    });
    dep._pending = false;
  }
  pendingCleanupDeps.length = 0;
};
/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 * @internal
 */
var Dep = /** @class */function () {
  function Dep() {
    // pending subs cleanup
    this._pending = false;
    this.id = uid$2++;
    this.subs = [];
  }
  Dep.prototype.addSub = function (sub) {
    this.subs.push(sub);
  };
  Dep.prototype.removeSub = function (sub) {
    // #12696 deps with massive amount of subscribers are extremely slow to
    // clean up in Chromium
    // to workaround this, we unset the sub for now, and clear them on
    // next scheduler flush.
    this.subs[this.subs.indexOf(sub)] = null;
    if (!this._pending) {
      this._pending = true;
      pendingCleanupDeps.push(this);
    }
  };
  Dep.prototype.depend = function (info) {
    if (Dep.target) {
      Dep.target.addDep(this);
      if ("production" !== 'production' && info && Dep.target.onTrack) {
        Dep.target.onTrack(__assign({
          effect: Dep.target
        }, info));
      }
    }
  };
  Dep.prototype.notify = function (info) {
    // stabilize the subscriber list first
    var subs = this.subs.filter(function (s) {
      return s;
    });
    if ("production" !== 'production' && !config.async) {
      // subs aren't sorted in scheduler if not running async
      // we need to sort them now to make sure they fire in correct
      // order
      subs.sort(function (a, b) {
        return a.id - b.id;
      });
    }
    for (var i = 0, l = subs.length; i < l; i++) {
      var sub = subs[i];
      if ("production" !== 'production' && info) {
        sub.onTrigger && sub.onTrigger(__assign({
          effect: subs[i]
        }, info));
      }
      sub.update();
    }
  };
  return Dep;
}();
// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
var targetStack = [];
function pushTarget(target) {
  targetStack.push(target);
  Dep.target = target;
}
function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */
var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);
var methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
        break;
    }
    if (inserted) ob.observeArray(inserted);
    // notify change
    if ("production" !== 'production') {
      ob.dep.notify({
        type: "array mutation" /* TriggerOpTypes.ARRAY_MUTATION */,
        target: this,
        key: method
      });
    } else {
      ob.dep.notify();
    }
    return result;
  });
});
var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
var NO_INITIAL_VALUE = {};
/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;
function toggleObserving(value) {
  shouldObserve = value;
}
// ssr mock dep
var mockDep = {
  notify: noop,
  depend: noop,
  addSub: noop,
  removeSub: noop
};
/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = /** @class */function () {
  function Observer(value, shallow, mock) {
    if (shallow === void 0) {
      shallow = false;
    }
    if (mock === void 0) {
      mock = false;
    }
    this.value = value;
    this.shallow = shallow;
    this.mock = mock;
    // this.value = value
    this.dep = mock ? mockDep : new Dep();
    this.vmCount = 0;
    def(value, '__ob__', this);
    if (isArray(value)) {
      if (!mock) {
        if (hasProto) {
          value.__proto__ = arrayMethods;
          /* eslint-enable no-proto */
        } else {
          for (var i = 0, l = arrayKeys.length; i < l; i++) {
            var key = arrayKeys[i];
            def(value, key, arrayMethods[key]);
          }
        }
      }
      if (!shallow) {
        this.observeArray(value);
      }
    } else {
      /**
       * Walk through all properties and convert them into
       * getter/setters. This method should only be called when
       * value type is Object.
       */
      var keys = Object.keys(value);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        defineReactive(value, key, NO_INITIAL_VALUE, undefined, shallow, mock);
      }
    }
  }
  /**
   * Observe a list of Array items.
   */
  Observer.prototype.observeArray = function (value) {
    for (var i = 0, l = value.length; i < l; i++) {
      observe(value[i], false, this.mock);
    }
  };
  return Observer;
}();
// helpers
/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe(value, shallow, ssrMockReactivity) {
  if (value && hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    return value.__ob__;
  }
  if (shouldObserve && (ssrMockReactivity || !isServerRendering()) && (isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value.__v_skip /* ReactiveFlags.SKIP */ && !isRef(value) && !(value instanceof VNode)) {
    return new Observer(value, shallow, ssrMockReactivity);
  }
}
/**
 * Define a reactive property on an Object.
 */
function defineReactive(obj, key, val, customSetter, shallow, mock, observeEvenIfShallow) {
  if (observeEvenIfShallow === void 0) {
    observeEvenIfShallow = false;
  }
  var dep = new Dep();
  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }
  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && (val === NO_INITIAL_VALUE || arguments.length === 2)) {
    val = obj[key];
  }
  var childOb = shallow ? val && val.__ob__ : observe(val, false, mock);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        if ("production" !== 'production') {
          dep.depend({
            target: obj,
            type: "get" /* TrackOpTypes.GET */,
            key: key
          });
        } else {
          dep.depend();
        }
        if (childOb) {
          childOb.dep.depend();
          if (isArray(value)) {
            dependArray(value);
          }
        }
      }
      return isRef(value) && !shallow ? value.value : value;
    },
    set: function reactiveSetter(newVal) {
      var value = getter ? getter.call(obj) : val;
      if (!hasChanged(value, newVal)) {
        return;
      }
      if ("production" !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else if (getter) {
        // #7981: for accessor properties without setter
        return;
      } else if (!shallow && isRef(value) && !isRef(newVal)) {
        value.value = newVal;
        return;
      } else {
        val = newVal;
      }
      childOb = shallow ? newVal && newVal.__ob__ : observe(newVal, false, mock);
      if ("production" !== 'production') {
        dep.notify({
          type: "set" /* TriggerOpTypes.SET */,
          target: obj,
          key: key,
          newValue: newVal,
          oldValue: value
        });
      } else {
        dep.notify();
      }
    }
  });
  return dep;
}
function set(target, key, val) {
  if ("production" !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot set reactive property on undefined, null, or primitive value: ".concat(target));
  }
  if (isReadonly(target)) {
    "production" !== 'production' && warn("Set operation on key \"".concat(key, "\" failed: target is readonly."));
    return;
  }
  var ob = target.__ob__;
  if (isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    // when mocking for SSR, array methods are not hijacked
    if (ob && !ob.shallow && ob.mock) {
      observe(val, false, true);
    }
    return val;
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }
  if (target._isVue || ob && ob.vmCount) {
    "production" !== 'production' && warn('Avoid adding reactive properties to a Vue instance or its root $data ' + 'at runtime - declare it upfront in the data option.');
    return val;
  }
  if (!ob) {
    target[key] = val;
    return val;
  }
  defineReactive(ob.value, key, val, undefined, ob.shallow, ob.mock);
  if ("production" !== 'production') {
    ob.dep.notify({
      type: "add" /* TriggerOpTypes.ADD */,
      target: target,
      key: key,
      newValue: val,
      oldValue: undefined
    });
  } else {
    ob.dep.notify();
  }
  return val;
}
function del(target, key) {
  if ("production" !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot delete reactive property on undefined, null, or primitive value: ".concat(target));
  }
  if (isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return;
  }
  var ob = target.__ob__;
  if (target._isVue || ob && ob.vmCount) {
    "production" !== 'production' && warn('Avoid deleting properties on a Vue instance or its root $data ' + '- just set it to null.');
    return;
  }
  if (isReadonly(target)) {
    "production" !== 'production' && warn("Delete operation on key \"".concat(key, "\" failed: target is readonly."));
    return;
  }
  if (!hasOwn(target, key)) {
    return;
  }
  delete target[key];
  if (!ob) {
    return;
  }
  if ("production" !== 'production') {
    ob.dep.notify({
      type: "delete" /* TriggerOpTypes.DELETE */,
      target: target,
      key: key
    });
  } else {
    ob.dep.notify();
  }
}
/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray(value) {
  for (var e = void 0, i = 0, l = value.length; i < l; i++) {
    e = value[i];
    if (e && e.__ob__) {
      e.__ob__.dep.depend();
    }
    if (isArray(e)) {
      dependArray(e);
    }
  }
}
function reactive(target) {
  makeReactive(target, false);
  return target;
}
/**
 * Return a shallowly-reactive copy of the original object, where only the root
 * level properties are reactive. It also does not auto-unwrap refs (even at the
 * root level).
 */
function shallowReactive(target) {
  makeReactive(target, true);
  def(target, "__v_isShallow" /* ReactiveFlags.IS_SHALLOW */, true);
  return target;
}
function makeReactive(target, shallow) {
  // if trying to observe a readonly proxy, return the readonly version.
  if (!isReadonly(target)) {
    if ("production" !== 'production') {
      if (isArray(target)) {
        warn("Avoid using Array as root value for ".concat(shallow ? "shallowReactive()" : "reactive()", " as it cannot be tracked in watch() or watchEffect(). Use ").concat(shallow ? "shallowRef()" : "ref()", " instead. This is a Vue-2-only limitation."));
      }
      var existingOb = target && target.__ob__;
      if (existingOb && existingOb.shallow !== shallow) {
        warn("Target is already a ".concat(existingOb.shallow ? "" : "non-", "shallow reactive object, and cannot be converted to ").concat(shallow ? "" : "non-", "shallow."));
      }
    }
    var ob = observe(target, shallow, isServerRendering() /* ssr mock reactivity */);
    if ("production" !== 'production' && !ob) {
      if (target == null || isPrimitive(target)) {
        warn("value cannot be made reactive: ".concat(String(target)));
      }
      if (isCollectionType(target)) {
        warn("Vue 2 does not support reactive collection types such as Map or Set.");
      }
    }
  }
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw" /* ReactiveFlags.RAW */]);
  }
  return !!(value && value.__ob__);
}
function isShallow(value) {
  return !!(value && value.__v_isShallow);
}
function isReadonly(value) {
  return !!(value && value.__v_isReadonly);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  var raw = observed && observed["__v_raw" /* ReactiveFlags.RAW */];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  // non-extensible objects won't be observed anyway
  if (Object.isExtensible(value)) {
    def(value, "__v_skip" /* ReactiveFlags.SKIP */, true);
  }
  return value;
}
/**
 * @internal
 */
function isCollectionType(value) {
  var type = toRawType(value);
  return type === 'Map' || type === 'WeakMap' || type === 'Set' || type === 'WeakSet';
}

/**
 * @internal
 */
var RefFlag = "__v_isRef";
function isRef(r) {
  return !!(r && r.__v_isRef === true);
}
function ref$1(value) {
  return createRef(value, false);
}
function shallowRef(value) {
  return createRef(value, true);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  var ref = {};
  def(ref, RefFlag, true);
  def(ref, "__v_isShallow" /* ReactiveFlags.IS_SHALLOW */, shallow);
  def(ref, 'dep', defineReactive(ref, 'value', rawValue, null, shallow, isServerRendering()));
  return ref;
}
function triggerRef(ref) {
  if ("production" !== 'production' && !ref.dep) {
    warn("received object is not a triggerable ref.");
  }
  if ("production" !== 'production') {
    ref.dep && ref.dep.notify({
      type: "set" /* TriggerOpTypes.SET */,
      target: ref,
      key: 'value'
    });
  } else {
    ref.dep && ref.dep.notify();
  }
}
function unref(ref) {
  return isRef(ref) ? ref.value : ref;
}
function proxyRefs(objectWithRefs) {
  if (isReactive(objectWithRefs)) {
    return objectWithRefs;
  }
  var proxy = {};
  var keys = Object.keys(objectWithRefs);
  for (var i = 0; i < keys.length; i++) {
    proxyWithRefUnwrap(proxy, objectWithRefs, keys[i]);
  }
  return proxy;
}
function proxyWithRefUnwrap(target, source, key) {
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      var val = source[key];
      if (isRef(val)) {
        return val.value;
      } else {
        var ob = val && val.__ob__;
        if (ob) ob.dep.depend();
        return val;
      }
    },
    set: function (value) {
      var oldValue = source[key];
      if (isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
      } else {
        source[key] = value;
      }
    }
  });
}
function customRef(factory) {
  var dep = new Dep();
  var _a = factory(function () {
      if ("production" !== 'production') {
        dep.depend({
          target: ref,
          type: "get" /* TrackOpTypes.GET */,
          key: 'value'
        });
      } else {
        dep.depend();
      }
    }, function () {
      if ("production" !== 'production') {
        dep.notify({
          target: ref,
          type: "set" /* TriggerOpTypes.SET */,
          key: 'value'
        });
      } else {
        dep.notify();
      }
    }),
    get = _a.get,
    set = _a.set;
  var ref = {
    get value() {
      return get();
    },
    set value(newVal) {
      set(newVal);
    }
  };
  def(ref, RefFlag, true);
  return ref;
}
function toRefs(object) {
  if ("production" !== 'production' && !isReactive(object)) {
    warn("toRefs() expects a reactive object but received a plain one.");
  }
  var ret = isArray(object) ? new Array(object.length) : {};
  for (var key in object) {
    ret[key] = toRef(object, key);
  }
  return ret;
}
function toRef(object, key, defaultValue) {
  var val = object[key];
  if (isRef(val)) {
    return val;
  }
  var ref = {
    get value() {
      var val = object[key];
      return val === undefined ? defaultValue : val;
    },
    set value(newVal) {
      object[key] = newVal;
    }
  };
  def(ref, RefFlag, true);
  return ref;
}
var rawToReadonlyFlag = "__v_rawToReadonly";
var rawToShallowReadonlyFlag = "__v_rawToShallowReadonly";
function readonly(target) {
  return createReadonly(target, false);
}
function createReadonly(target, shallow) {
  if (!isPlainObject(target)) {
    if ("production" !== 'production') {
      if (isArray(target)) {
        warn("Vue 2 does not support readonly arrays.");
      } else if (isCollectionType(target)) {
        warn("Vue 2 does not support readonly collection types such as Map or Set.");
      } else {
        warn("value cannot be made readonly: ".concat(typeof target));
      }
    }
    return target;
  }
  if ("production" !== 'production' && !Object.isExtensible(target)) {
    warn("Vue 2 does not support creating readonly proxy for non-extensible object.");
  }
  // already a readonly object
  if (isReadonly(target)) {
    return target;
  }
  // already has a readonly proxy
  var existingFlag = shallow ? rawToShallowReadonlyFlag : rawToReadonlyFlag;
  var existingProxy = target[existingFlag];
  if (existingProxy) {
    return existingProxy;
  }
  var proxy = Object.create(Object.getPrototypeOf(target));
  def(target, existingFlag, proxy);
  def(proxy, "__v_isReadonly" /* ReactiveFlags.IS_READONLY */, true);
  def(proxy, "__v_raw" /* ReactiveFlags.RAW */, target);
  if (isRef(target)) {
    def(proxy, RefFlag, true);
  }
  if (shallow || isShallow(target)) {
    def(proxy, "__v_isShallow" /* ReactiveFlags.IS_SHALLOW */, true);
  }
  var keys = Object.keys(target);
  for (var i = 0; i < keys.length; i++) {
    defineReadonlyProperty(proxy, target, keys[i], shallow);
  }
  return proxy;
}
function defineReadonlyProperty(proxy, target, key, shallow) {
  Object.defineProperty(proxy, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      var val = target[key];
      return shallow || !isPlainObject(val) ? val : readonly(val);
    },
    set: function () {
      "production" !== 'production' && warn("Set operation on key \"".concat(key, "\" failed: target is readonly."));
    }
  });
}
/**
 * Returns a reactive-copy of the original object, where only the root level
 * properties are readonly, and does NOT unwrap refs nor recursively convert
 * returned properties.
 * This is used for creating the props proxy object for stateful components.
 */
function shallowReadonly(target) {
  return createReadonly(target, true);
}
function computed(getterOrOptions, debugOptions) {
  var getter;
  var setter;
  var onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = "production" !== 'production' ? function () {
      warn('Write operation failed: computed value is readonly');
    } : noop;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  var watcher = isServerRendering() ? null : new Watcher(currentInstance, getter, noop, {
    lazy: true
  });
  if ("production" !== 'production' && watcher && debugOptions) {
    watcher.onTrack = debugOptions.onTrack;
    watcher.onTrigger = debugOptions.onTrigger;
  }
  var ref = {
    // some libs rely on the presence effect for checking computed refs
    // from normal refs, but the implementation doesn't matter
    effect: watcher,
    get value() {
      if (watcher) {
        if (watcher.dirty) {
          watcher.evaluate();
        }
        if (Dep.target) {
          if ("production" !== 'production' && Dep.target.onTrack) {
            Dep.target.onTrack({
              effect: Dep.target,
              target: ref,
              type: "get" /* TrackOpTypes.GET */,
              key: 'value'
            });
          }
          watcher.depend();
        }
        return watcher.value;
      } else {
        return getter();
      }
    },
    set value(newVal) {
      setter(newVal);
    }
  };
  def(ref, RefFlag, true);
  def(ref, "__v_isReadonly" /* ReactiveFlags.IS_READONLY */, onlyGetter);
  return ref;
}
var WATCHER = "watcher";
var WATCHER_CB = "".concat(WATCHER, " callback");
var WATCHER_GETTER = "".concat(WATCHER, " getter");
var WATCHER_CLEANUP = "".concat(WATCHER, " cleanup");
// Simple effect.
function watchEffect(effect, options) {
  return doWatch(effect, null, options);
}
function watchPostEffect(effect, options) {
  return doWatch(effect, null, "production" !== 'production' ? __assign(__assign({}, options), {
    flush: 'post'
  }) : {
    flush: 'post'
  });
}
function watchSyncEffect(effect, options) {
  return doWatch(effect, null, "production" !== 'production' ? __assign(__assign({}, options), {
    flush: 'sync'
  }) : {
    flush: 'sync'
  });
}
// initial value for watchers to trigger on undefined initial values
var INITIAL_WATCHER_VALUE = {};
// implementation
function watch(source, cb, options) {
  if ("production" !== 'production' && typeof cb !== 'function') {
    warn("`watch(fn, options?)` signature has been moved to a separate API. " + "Use `watchEffect(fn, options?)` instead. `watch` now only " + "supports `watch(source, cb, options?) signature.");
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb, _a) {
  var _b = _a === void 0 ? emptyObject : _a,
    immediate = _b.immediate,
    deep = _b.deep,
    _c = _b.flush,
    flush = _c === void 0 ? 'pre' : _c,
    onTrack = _b.onTrack,
    onTrigger = _b.onTrigger;
  if ("production" !== 'production' && !cb) {
    if (immediate !== undefined) {
      warn("watch() \"immediate\" option is only respected when using the " + "watch(source, callback, options?) signature.");
    }
    if (deep !== undefined) {
      warn("watch() \"deep\" option is only respected when using the " + "watch(source, callback, options?) signature.");
    }
  }
  var warnInvalidSource = function (s) {
    warn("Invalid watch source: ".concat(s, ". A watch source can only be a getter/effect ") + "function, a ref, a reactive object, or an array of these types.");
  };
  var instance = currentInstance;
  var call = function (fn, type, args) {
    if (args === void 0) {
      args = null;
    }
    var res = invokeWithErrorHandling(fn, null, args, instance, type);
    if (deep && res && res.__ob__) res.__ob__.dep.depend();
    return res;
  };
  var getter;
  var forceTrigger = false;
  var isMultiSource = false;
  if (isRef(source)) {
    getter = function () {
      return source.value;
    };
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = function () {
      source.__ob__.dep.depend();
      return source;
    };
    deep = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some(function (s) {
      return isReactive(s) || isShallow(s);
    });
    getter = function () {
      return source.map(function (s) {
        if (isRef(s)) {
          return s.value;
        } else if (isReactive(s)) {
          s.__ob__.dep.depend();
          return traverse(s);
        } else if (isFunction(s)) {
          return call(s, WATCHER_GETTER);
        } else {
          "production" !== 'production' && warnInvalidSource(s);
        }
      });
    };
  } else if (isFunction(source)) {
    if (cb) {
      // getter with cb
      getter = function () {
        return call(source, WATCHER_GETTER);
      };
    } else {
      // no cb -> simple effect
      getter = function () {
        if (instance && instance._isDestroyed) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return call(source, WATCHER, [onCleanup]);
      };
    }
  } else {
    getter = noop;
    "production" !== 'production' && warnInvalidSource(source);
  }
  if (cb && deep) {
    var baseGetter_1 = getter;
    getter = function () {
      return traverse(baseGetter_1());
    };
  }
  var cleanup;
  var onCleanup = function (fn) {
    cleanup = watcher.onStop = function () {
      call(fn, WATCHER_CLEANUP);
    };
  };
  // in SSR there is no need to setup an actual effect, and it should be noop
  // unless it's eager
  if (isServerRendering()) {
    // we will also not call the invalidate callback (+ runner is not set up)
    onCleanup = noop;
    if (!cb) {
      getter();
    } else if (immediate) {
      call(cb, WATCHER_CB, [getter(), isMultiSource ? [] : undefined, onCleanup]);
    }
    return noop;
  }
  var watcher = new Watcher(currentInstance, getter, noop, {
    lazy: true
  });
  watcher.noRecurse = !cb;
  var oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
  // overwrite default run
  watcher.run = function () {
    if (!watcher.active) {
      return;
    }
    if (cb) {
      // watch(source, cb)
      var newValue = watcher.get();
      if (deep || forceTrigger || (isMultiSource ? newValue.some(function (v, i) {
        return hasChanged(v, oldValue[i]);
      }) : hasChanged(newValue, oldValue))) {
        // cleanup before running cb again
        if (cleanup) {
          cleanup();
        }
        call(cb, WATCHER_CB, [newValue,
        // pass undefined as the old value when it's changed for the first time
        oldValue === INITIAL_WATCHER_VALUE ? undefined : oldValue, onCleanup]);
        oldValue = newValue;
      }
    } else {
      // watchEffect
      watcher.get();
    }
  };
  if (flush === 'sync') {
    watcher.update = watcher.run;
  } else if (flush === 'post') {
    watcher.post = true;
    watcher.update = function () {
      return queueWatcher(watcher);
    };
  } else {
    // pre
    watcher.update = function () {
      if (instance && instance === currentInstance && !instance._isMounted) {
        // pre-watcher triggered before
        var buffer = instance._preWatchers || (instance._preWatchers = []);
        if (buffer.indexOf(watcher) < 0) buffer.push(watcher);
      } else {
        queueWatcher(watcher);
      }
    };
  }
  if ("production" !== 'production') {
    watcher.onTrack = onTrack;
    watcher.onTrigger = onTrigger;
  }
  // initial run
  if (cb) {
    if (immediate) {
      watcher.run();
    } else {
      oldValue = watcher.get();
    }
  } else if (flush === 'post' && instance) {
    instance.$once('hook:mounted', function () {
      return watcher.get();
    });
  } else {
    watcher.get();
  }
  return function () {
    watcher.teardown();
  };
}
var activeEffectScope;
var EffectScope = exports.EffectScope = /** @class */function () {
  function EffectScope(detached) {
    if (detached === void 0) {
      detached = false;
    }
    this.detached = detached;
    /**
     * @internal
     */
    this.active = true;
    /**
     * @internal
     */
    this.effects = [];
    /**
     * @internal
     */
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  EffectScope.prototype.run = function (fn) {
    if (this.active) {
      var currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else if ("production" !== 'production') {
      warn("cannot run an inactive effect scope.");
    }
  };
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  EffectScope.prototype.on = function () {
    activeEffectScope = this;
  };
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  EffectScope.prototype.off = function () {
    activeEffectScope = this.parent;
  };
  EffectScope.prototype.stop = function (fromParent) {
    if (this.active) {
      var i = void 0,
        l = void 0;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].teardown();
      }
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
      }
      // nested scope, dereference from parent to avoid memory leaks
      if (!this.detached && this.parent && !fromParent) {
        // optimized O(1) removal
        var last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = undefined;
      this.active = false;
    }
  };
  return EffectScope;
}();
function effectScope(detached) {
  return new EffectScope(detached);
}
/**
 * @internal
 */
function recordEffectScope(effect, scope) {
  if (scope === void 0) {
    scope = activeEffectScope;
  }
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
function onScopeDispose(fn) {
  if (activeEffectScope) {
    activeEffectScope.cleanups.push(fn);
  } else if ("production" !== 'production') {
    warn("onScopeDispose() is called when there is no active effect scope" + " to be associated with.");
  }
}
function provide(key, value) {
  if (!currentInstance) {
    if ("production" !== 'production') {
      warn("provide() can only be used inside setup().");
    }
  } else {
    // TS doesn't allow symbol as index type
    resolveProvided(currentInstance)[key] = value;
  }
}
function resolveProvided(vm) {
  // by default an instance inherits its parent's provides object
  // but when it needs to provide values of its own, it creates its
  // own provides object using parent provides object as prototype.
  // this way in `inject` we can simply look up injections from direct
  // parent and let the prototype chain do the work.
  var existing = vm._provided;
  var parentProvides = vm.$parent && vm.$parent._provided;
  if (parentProvides === existing) {
    return vm._provided = Object.create(parentProvides);
  } else {
    return existing;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory) {
  if (treatDefaultAsFactory === void 0) {
    treatDefaultAsFactory = false;
  }
  // fallback to `currentRenderingInstance` so that this can be called in
  // a functional component
  var instance = currentInstance;
  if (instance) {
    // #2400
    // to support `app.use` plugins,
    // fallback to appContext's `provides` if the instance is at root
    var provides = instance.$parent && instance.$parent._provided;
    if (provides && key in provides) {
      // TS doesn't allow symbol as index type
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance) : defaultValue;
    } else if ("production" !== 'production') {
      warn("injection \"".concat(String(key), "\" not found."));
    }
  } else if ("production" !== 'production') {
    warn("inject() can only be used inside setup() or functional components.");
  }
}
var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once,
    capture: capture,
    passive: passive
  };
});
function createFnInvoker(fns, vm) {
  function invoker() {
    var fns = invoker.fns;
    if (isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler");
    }
  }
  invoker.fns = fns;
  return invoker;
}
function updateListeners(on, oldOn, add, remove, createOnceHandler, vm) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      "production" !== 'production' && warn("Invalid handler for event \"".concat(event.name, "\": got ") + String(cur), vm);
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove(event.name, oldOn[name], event.capture);
    }
  }
}
function mergeVNodeHook(def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];
  function wrappedHook() {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove$2(invoker.fns, wrappedHook);
  }
  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }
  invoker.merged = true;
  def[hookKey] = invoker;
}
function extractPropsFromVNodeData(data, Ctor, tag) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return;
  }
  var res = {};
  var attrs = data.attrs,
    props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if ("production" !== 'production') {
        var keyInLowerCase = key.toLowerCase();
        if (key !== keyInLowerCase && attrs && hasOwn(attrs, keyInLowerCase)) {
          tip("Prop \"".concat(keyInLowerCase, "\" is passed to component ") + "".concat(formatComponentName(
          // @ts-expect-error tag is string
          tag || Ctor), ", but the declared prop name is") + " \"".concat(key, "\". ") + "Note that HTML attributes are case-insensitive and camelCased " + "props need to use their kebab-case equivalents when using in-DOM " + "templates. You should probably use \"".concat(altKey, "\" instead of \"").concat(key, "\"."));
        }
      }
      checkProp(res, props, key, altKey, true) || checkProp(res, attrs, key, altKey, false);
    }
  }
  return res;
}
function checkProp(res, hash, key, altKey, preserve) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true;
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true;
    }
  }
  return false;
}

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:
// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren(children) {
  for (var i = 0; i < children.length; i++) {
    if (isArray(children[i])) {
      return Array.prototype.concat.apply([], children);
    }
  }
  return children;
}
// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren(children) {
  return isPrimitive(children) ? [createTextVNode(children)] : isArray(children) ? normalizeArrayChildren(children) : undefined;
}
function isTextNode(node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment);
}
function normalizeArrayChildren(children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') continue;
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, "".concat(nestedIndex || '', "_").concat(i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + c[0].text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
          c.key = "__vlist".concat(nestedIndex, "_").concat(i, "__");
        }
        res.push(c);
      }
    }
  }
  return res;
}

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList(val, render) {
  var ret = null,
    i,
    l,
    keys,
    key;
  if (isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  ret._isVList = true;
  return ret;
}

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot(name, fallbackRender, props, bindObject) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) {
    // scoped slot
    props = props || {};
    if (bindObject) {
      if ("production" !== 'production' && !isObject(bindObject)) {
        warn('slot v-bind without argument expects an Object', this);
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || (isFunction(fallbackRender) ? fallbackRender() : fallbackRender);
  } else {
    nodes = this.$slots[name] || (isFunction(fallbackRender) ? fallbackRender() : fallbackRender);
  }
  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', {
      slot: target
    }, nodes);
  } else {
    return nodes;
  }
}

/**
 * Runtime helper for resolving filters
 */
function resolveFilter(id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity;
}
function isKeyNotMatch(expect, actual) {
  if (isArray(expect)) {
    return expect.indexOf(actual) === -1;
  } else {
    return expect !== actual;
  }
}
/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName);
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode);
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key;
  }
  return eventKeyCode === undefined;
}

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps(data, tag, value, asProp, isSync) {
  if (value) {
    if (!isObject(value)) {
      "production" !== 'production' && warn('v-bind without argument expects an Object or Array value', this);
    } else {
      if (isArray(value)) {
        value = toObject(value);
      }
      var hash = void 0;
      var _loop_1 = function (key) {
        if (key === 'class' || key === 'style' || isReservedAttribute(key)) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];
          if (isSync) {
            var on = data.on || (data.on = {});
            on["update:".concat(key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };
      for (var key in value) {
        _loop_1(key);
      }
    }
  }
  return data;
}

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic(index, isInFor) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree;
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(this._renderProxy, this._c, this // for render fns generated for functional component templates
  );
  markStatic(tree, "__static__".concat(index), false);
  return tree;
}
/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce(tree, index, key) {
  markStatic(tree, "__once__".concat(index).concat(key ? "_".concat(key) : ""), true);
  return tree;
}
function markStatic(tree, key, isOnce) {
  if (isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], "".concat(key, "_").concat(i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}
function markStaticNode(node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}
function bindObjectListeners(data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "production" !== 'production' && warn('v-on without argument expects an Object value', this);
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data;
}
function resolveScopedSlots(fns, res,
// the following are added in 2.6
hasDynamicKeys, contentHashKey) {
  res = res || {
    $stable: !hasDynamicKeys
  };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      // @ts-expect-error
      if (slot.proxy) {
        // @ts-expect-error
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    res.$key = contentHashKey;
  }
  return res;
}

// helper to process dynamic keys for dynamic arguments in v-bind and v-on.
function bindDynamicKeys(baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ("production" !== 'production' && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn("Invalid value for dynamic directive argument (expected string or null): ".concat(key), this);
    }
  }
  return baseObj;
}
// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier(value, symbol) {
  return typeof value === 'string' ? symbol + value : value;
}
function installRenderHelpers(target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots(children, context) {
  if (!children || !children.length) {
    return {};
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) && data && data.slot != null) {
      var name_1 = data.slot;
      var slot = slots[name_1] || (slots[name_1] = []);
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name_2 in slots) {
    if (slots[name_2].every(isWhitespace)) {
      delete slots[name_2];
    }
  }
  return slots;
}
function isWhitespace(node) {
  return node.isComment && !node.asyncFactory || node.text === ' ';
}
function isAsyncPlaceholder(node) {
  // @ts-expect-error not really boolean type
  return node.isComment && node.asyncFactory;
}
function normalizeScopedSlots(ownerVm, scopedSlots, normalSlots, prevScopedSlots) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = scopedSlots ? !!scopedSlots.$stable : !hasNormalSlots;
  var key = scopedSlots && scopedSlots.$key;
  if (!scopedSlots) {
    res = {};
  } else if (scopedSlots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return scopedSlots._normalized;
  } else if (isStable && prevScopedSlots && prevScopedSlots !== emptyObject && key === prevScopedSlots.$key && !hasNormalSlots && !prevScopedSlots.$hasNormal) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevScopedSlots;
  } else {
    res = {};
    for (var key_1 in scopedSlots) {
      if (scopedSlots[key_1] && key_1[0] !== '$') {
        res[key_1] = normalizeScopedSlot(ownerVm, normalSlots, key_1, scopedSlots[key_1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key_2 in normalSlots) {
    if (!(key_2 in res)) {
      res[key_2] = proxyNormalSlot(normalSlots, key_2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (scopedSlots && Object.isExtensible(scopedSlots)) {
    scopedSlots._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res;
}
function normalizeScopedSlot(vm, normalSlots, key, fn) {
  var normalized = function () {
    var cur = currentInstance;
    setCurrentInstance(vm);
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !isArray(res) ? [res] // single vnode
    : normalizeChildren(res);
    var vnode = res && res[0];
    setCurrentInstance(cur);
    return res && (!vnode || res.length === 1 && vnode.isComment && !isAsyncPlaceholder(vnode)) // #9658, #10391
    ? undefined : res;
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized;
}
function proxyNormalSlot(slots, key) {
  return function () {
    return slots[key];
  };
}
function initSetup(vm) {
  var options = vm.$options;
  var setup = options.setup;
  if (setup) {
    var ctx = vm._setupContext = createSetupContext(vm);
    setCurrentInstance(vm);
    pushTarget();
    var setupResult = invokeWithErrorHandling(setup, null, [vm._props || shallowReactive({}), ctx], vm, "setup");
    popTarget();
    setCurrentInstance();
    if (isFunction(setupResult)) {
      // render function
      // @ts-ignore
      options.render = setupResult;
    } else if (isObject(setupResult)) {
      // bindings
      if ("production" !== 'production' && setupResult instanceof VNode) {
        warn("setup() should not return VNodes directly - " + "return a render function instead.");
      }
      vm._setupState = setupResult;
      // __sfc indicates compiled bindings from <script setup>
      if (!setupResult.__sfc) {
        for (var key in setupResult) {
          if (!isReserved(key)) {
            proxyWithRefUnwrap(vm, setupResult, key);
          } else if ("production" !== 'production') {
            warn("Avoid using variables that start with _ or $ in setup().");
          }
        }
      } else {
        // exposed for compiled render fn
        var proxy = vm._setupProxy = {};
        for (var key in setupResult) {
          if (key !== '__sfc') {
            proxyWithRefUnwrap(proxy, setupResult, key);
          }
        }
      }
    } else if ("production" !== 'production' && setupResult !== undefined) {
      warn("setup() should return an object. Received: ".concat(setupResult === null ? 'null' : typeof setupResult));
    }
  }
}
function createSetupContext(vm) {
  var exposeCalled = false;
  return {
    get attrs() {
      if (!vm._attrsProxy) {
        var proxy = vm._attrsProxy = {};
        def(proxy, '_v_attr_proxy', true);
        syncSetupProxy(proxy, vm.$attrs, emptyObject, vm, '$attrs');
      }
      return vm._attrsProxy;
    },
    get listeners() {
      if (!vm._listenersProxy) {
        var proxy = vm._listenersProxy = {};
        syncSetupProxy(proxy, vm.$listeners, emptyObject, vm, '$listeners');
      }
      return vm._listenersProxy;
    },
    get slots() {
      return initSlotsProxy(vm);
    },
    emit: bind(vm.$emit, vm),
    expose: function (exposed) {
      if ("production" !== 'production') {
        if (exposeCalled) {
          warn("expose() should be called only once per setup().", vm);
        }
        exposeCalled = true;
      }
      if (exposed) {
        Object.keys(exposed).forEach(function (key) {
          return proxyWithRefUnwrap(vm, exposed, key);
        });
      }
    }
  };
}
function syncSetupProxy(to, from, prev, instance, type) {
  var changed = false;
  for (var key in from) {
    if (!(key in to)) {
      changed = true;
      defineProxyAttr(to, key, instance, type);
    } else if (from[key] !== prev[key]) {
      changed = true;
    }
  }
  for (var key in to) {
    if (!(key in from)) {
      changed = true;
      delete to[key];
    }
  }
  return changed;
}
function defineProxyAttr(proxy, key, instance, type) {
  Object.defineProperty(proxy, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      return instance[type][key];
    }
  });
}
function initSlotsProxy(vm) {
  if (!vm._slotsProxy) {
    syncSetupSlots(vm._slotsProxy = {}, vm.$scopedSlots);
  }
  return vm._slotsProxy;
}
function syncSetupSlots(to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
  for (var key in to) {
    if (!(key in from)) {
      delete to[key];
    }
  }
}
/**
 * @internal use manual type def because public setup context type relies on
 * legacy VNode types
 */
function useSlots() {
  return getContext().slots;
}
/**
 * @internal use manual type def because public setup context type relies on
 * legacy VNode types
 */
function useAttrs() {
  return getContext().attrs;
}
/**
 * Vue 2 only
 * @internal use manual type def because public setup context type relies on
 * legacy VNode types
 */
function useListeners() {
  return getContext().listeners;
}
function getContext() {
  if ("production" !== 'production' && !currentInstance) {
    warn("useContext() called without active instance.");
  }
  var vm = currentInstance;
  return vm._setupContext || (vm._setupContext = createSetupContext(vm));
}
/**
 * Runtime helper for merging default declarations. Imported by compiled code
 * only.
 * @internal
 */
function mergeDefaults(raw, defaults) {
  var props = isArray(raw) ? raw.reduce(function (normalized, p) {
    return normalized[p] = {}, normalized;
  }, {}) : raw;
  for (var key in defaults) {
    var opt = props[key];
    if (opt) {
      if (isArray(opt) || isFunction(opt)) {
        props[key] = {
          type: opt,
          default: defaults[key]
        };
      } else {
        opt.default = defaults[key];
      }
    } else if (opt === null) {
      props[key] = {
        default: defaults[key]
      };
    } else if ("production" !== 'production') {
      warn("props default key \"".concat(key, "\" has no corresponding declaration."));
    }
  }
  return props;
}
function initRender(vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = parentVnode ? normalizeScopedSlots(vm.$parent, parentVnode.data.scopedSlots, vm.$slots) : emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  // @ts-expect-error
  vm._c = function (a, b, c, d) {
    return createElement$1(vm, a, b, c, d, false);
  };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  // @ts-expect-error
  vm.$createElement = function (a, b, c, d) {
    return createElement$1(vm, a, b, c, d, true);
  };
  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;
  /* istanbul ignore else */
  if ("production" !== 'production') {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}
var currentRenderingInstance = null;
function renderMixin(Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this);
  };
  Vue.prototype._render = function () {
    var vm = this;
    var _a = vm.$options,
      render = _a.render,
      _parentVnode = _a._parentVnode;
    if (_parentVnode && vm._isMounted) {
      vm.$scopedSlots = normalizeScopedSlots(vm.$parent, _parentVnode.data.scopedSlots, vm.$slots, vm.$scopedSlots);
      if (vm._slotsProxy) {
        syncSetupSlots(vm._slotsProxy, vm.$scopedSlots);
      }
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var prevInst = currentInstance;
    var prevRenderInst = currentRenderingInstance;
    var vnode;
    try {
      setCurrentInstance(vm);
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ("production" !== 'production' && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = prevRenderInst;
      setCurrentInstance(prevInst);
    }
    // if the returned array contains only a single node, allow it
    if (isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ("production" !== 'production' && isArray(vnode)) {
        warn('Multiple root nodes returned from render function. Render function ' + 'should return a single root node.', vm);
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode;
  };
}
function ensureCtor(comp, base) {
  if (comp.__esModule || hasSymbol && comp[Symbol.toStringTag] === 'Module') {
    comp = comp.default;
  }
  return isObject(comp) ? base.extend(comp) : comp;
}
function createAsyncPlaceholder(factory, data, context, children, tag) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = {
    data: data,
    context: context,
    children: children,
    tag: tag
  };
  return node;
}
function resolveAsyncComponent(factory, baseCtor) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp;
  }
  if (isDef(factory.resolved)) {
    return factory.resolved;
  }
  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }
  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp;
  }
  if (owner && !isDef(factory.owners)) {
    var owners_1 = factory.owners = [owner];
    var sync_1 = true;
    var timerLoading_1 = null;
    var timerTimeout_1 = null;
    owner.$on('hook:destroyed', function () {
      return remove$2(owners_1, owner);
    });
    var forceRender_1 = function (renderCompleted) {
      for (var i = 0, l = owners_1.length; i < l; i++) {
        owners_1[i].$forceUpdate();
      }
      if (renderCompleted) {
        owners_1.length = 0;
        if (timerLoading_1 !== null) {
          clearTimeout(timerLoading_1);
          timerLoading_1 = null;
        }
        if (timerTimeout_1 !== null) {
          clearTimeout(timerTimeout_1);
          timerTimeout_1 = null;
        }
      }
    };
    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync_1) {
        forceRender_1(true);
      } else {
        owners_1.length = 0;
      }
    });
    var reject_1 = once(function (reason) {
      "production" !== 'production' && warn("Failed to resolve async component: ".concat(String(factory)) + (reason ? "\nReason: ".concat(reason) : ''));
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender_1(true);
      }
    });
    var res_1 = factory(resolve, reject_1);
    if (isObject(res_1)) {
      if (isPromise(res_1)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res_1.then(resolve, reject_1);
        }
      } else if (isPromise(res_1.component)) {
        res_1.component.then(resolve, reject_1);
        if (isDef(res_1.error)) {
          factory.errorComp = ensureCtor(res_1.error, baseCtor);
        }
        if (isDef(res_1.loading)) {
          factory.loadingComp = ensureCtor(res_1.loading, baseCtor);
          if (res_1.delay === 0) {
            factory.loading = true;
          } else {
            // @ts-expect-error NodeJS timeout type
            timerLoading_1 = setTimeout(function () {
              timerLoading_1 = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender_1(false);
              }
            }, res_1.delay || 200);
          }
        }
        if (isDef(res_1.timeout)) {
          // @ts-expect-error NodeJS timeout type
          timerTimeout_1 = setTimeout(function () {
            timerTimeout_1 = null;
            if (isUndef(factory.resolved)) {
              reject_1("production" !== 'production' ? "timeout (".concat(res_1.timeout, "ms)") : null);
            }
          }, res_1.timeout);
        }
      }
    }
    sync_1 = false;
    // return in case resolved synchronously
    return factory.loading ? factory.loadingComp : factory.resolved;
  }
}
function getFirstComponentChild(children) {
  if (isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
}
var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;
// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement$1(context, tag, data, children, normalizationType, alwaysNormalize) {
  if (isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType);
}
function _createElement(context, tag, data, children, normalizationType) {
  if (isDef(data) && isDef(data.__ob__)) {
    "production" !== 'production' && warn("Avoid using observed data object as vnode data: ".concat(JSON.stringify(data), "\n") + 'Always create fresh vnode data objects in each render!', context);
    return createEmptyVNode();
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode();
  }
  // warn against non-primitive key
  if ("production" !== 'production' && isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {
    warn('Avoid using non-primitive value as key, ' + 'use string/number value instead.', context);
  }
  // support single function children as default scoped slot
  if (isArray(children) && isFunction(children[0])) {
    data = data || {};
    data.scopedSlots = {
      default: children[0]
    };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor = void 0;
    ns = context.$vnode && context.$vnode.ns || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ("production" !== 'production' && isDef(data) && isDef(data.nativeOn) && data.tag !== 'component') {
        warn("The .native modifier for v-on is only valid on components but it was used on <".concat(tag, ">."), context);
      }
      vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(tag, data, children, undefined, undefined, context);
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isArray(vnode)) {
    return vnode;
  } else if (isDef(vnode)) {
    if (isDef(ns)) applyNS(vnode, ns);
    if (isDef(data)) registerDeepBindings(data);
    return vnode;
  } else {
    return createEmptyVNode();
  }
}
function applyNS(vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force) && child.tag !== 'svg')) {
        applyNS(child, ns, force);
      }
    }
  }
}
// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings(data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/**
 * @internal this function needs manual public type declaration because it relies
 * on previously manually authored types from Vue 2
 */
function h(type, props, children) {
  if (!currentInstance) {
    "production" !== 'production' && warn("globally imported h() can only be invoked when there is an active " + "component instance, e.g. synchronously in a component's render or setup function.");
  }
  return createElement$1(currentInstance, type, props, children, 2, true);
}
function handleError(err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while (cur = cur.$parent) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) return;
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}
function invokeWithErrorHandling(handler, context, args, vm, info) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) {
        return handleError(e, vm, info + " (Promise/async)");
      });
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res;
}
function globalHandleError(err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info);
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}
function logError(err, vm, info) {
  if ("production" !== 'production') {
    warn("Error in ".concat(info, ": \"").concat(err.toString(), "\""), vm);
  }
  /* istanbul ignore else */
  if (inBrowser && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err;
  }
}

/* globals MutationObserver */
var isUsingMicroTask = false;
var callbacks = [];
var pending = false;
function flushCallbacks() {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}
// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;
// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p_1 = Promise.resolve();
  timerFunc = function () {
    p_1.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) setTimeout(noop);
  };
  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== 'undefined' && (isNative(MutationObserver) ||
// PhantomJS and iOS 7.x
MutationObserver.toString() === '[object MutationObserverConstructor]')) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter_1 = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode_1 = document.createTextNode(String(counter_1));
  observer.observe(textNode_1, {
    characterData: true
  });
  timerFunc = function () {
    counter_1 = (counter_1 + 1) % 2;
    textNode_1.data = String(counter_1);
  };
  isUsingMicroTask = true;
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}
/**
 * @internal
 */
function nextTick(cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    });
  }
}
function useCssModule(name) {
  if (name === void 0) {
    name = '$style';
  }
  /* istanbul ignore else */
  {
    if (!currentInstance) {
      "production" !== 'production' && warn("useCssModule must be called inside setup()");
      return emptyObject;
    }
    var mod = currentInstance[name];
    if (!mod) {
      "production" !== 'production' && warn("Current instance does not have CSS module named \"".concat(name, "\"."));
      return emptyObject;
    }
    return mod;
  }
}

/**
 * Runtime helper for SFC's CSS variable injection feature.
 * @private
 */
function useCssVars(getter) {
  if (!inBrowser && !false) return;
  var instance = currentInstance;
  if (!instance) {
    "production" !== 'production' && warn("useCssVars is called without current active component instance.");
    return;
  }
  watchPostEffect(function () {
    var el = instance.$el;
    var vars = getter(instance, instance._setupProxy);
    if (el && el.nodeType === 1) {
      var style = el.style;
      for (var key in vars) {
        style.setProperty("--".concat(key), vars[key]);
      }
    }
  });
}

/**
 * v3-compatible async component API.
 * @internal the type is manually declared in <root>/types/v3-define-async-component.d.ts
 * because it relies on existing manual types
 */
function defineAsyncComponent(source) {
  if (isFunction(source)) {
    source = {
      loader: source
    };
  }
  var loader = source.loader,
    loadingComponent = source.loadingComponent,
    errorComponent = source.errorComponent,
    _a = source.delay,
    delay = _a === void 0 ? 200 : _a,
    timeout = source.timeout,
    // undefined = never times out
    _b = source.suspensible,
    // undefined = never times out
    suspensible = _b === void 0 ? false : _b,
    // in Vue 3 default is true
    userOnError = source.onError;
  if ("production" !== 'production' && suspensible) {
    warn("The suspensible option for async components is not supported in Vue2. It is ignored.");
  }
  var pendingRequest = null;
  var retries = 0;
  var retry = function () {
    retries++;
    pendingRequest = null;
    return load();
  };
  var load = function () {
    var thisRequest;
    return pendingRequest || (thisRequest = pendingRequest = loader().catch(function (err) {
      err = err instanceof Error ? err : new Error(String(err));
      if (userOnError) {
        return new Promise(function (resolve, reject) {
          var userRetry = function () {
            return resolve(retry());
          };
          var userFail = function () {
            return reject(err);
          };
          userOnError(err, userRetry, userFail, retries + 1);
        });
      } else {
        throw err;
      }
    }).then(function (comp) {
      if (thisRequest !== pendingRequest && pendingRequest) {
        return pendingRequest;
      }
      if ("production" !== 'production' && !comp) {
        warn("Async component loader resolved to undefined. " + "If you are using retry(), make sure to return its return value.");
      }
      // interop module default
      if (comp && (comp.__esModule || comp[Symbol.toStringTag] === 'Module')) {
        comp = comp.default;
      }
      if ("production" !== 'production' && comp && !isObject(comp) && !isFunction(comp)) {
        throw new Error("Invalid async component load result: ".concat(comp));
      }
      return comp;
    }));
  };
  return function () {
    var component = load();
    return {
      component: component,
      delay: delay,
      timeout: timeout,
      error: errorComponent,
      loading: loadingComponent
    };
  };
}
function createLifeCycle(hookName) {
  return function (fn, target) {
    if (target === void 0) {
      target = currentInstance;
    }
    if (!target) {
      "production" !== 'production' && warn("".concat(formatName(hookName), " is called when there is no active component instance to be ") + "associated with. " + "Lifecycle injection APIs can only be used during execution of setup().");
      return;
    }
    return injectHook(target, hookName, fn);
  };
}
function formatName(name) {
  if (name === 'beforeDestroy') {
    name = 'beforeUnmount';
  } else if (name === 'destroyed') {
    name = 'unmounted';
  }
  return "on".concat(name[0].toUpperCase() + name.slice(1));
}
function injectHook(instance, hookName, fn) {
  var options = instance.$options;
  options[hookName] = mergeLifecycleHook(options[hookName], fn);
}
var onBeforeMount = exports.onBeforeMount = createLifeCycle('beforeMount');
var onMounted = exports.onMounted = createLifeCycle('mounted');
var onBeforeUpdate = exports.onBeforeUpdate = createLifeCycle('beforeUpdate');
var onUpdated = exports.onUpdated = createLifeCycle('updated');
var onBeforeUnmount = exports.onBeforeUnmount = createLifeCycle('beforeDestroy');
var onUnmounted = exports.onUnmounted = createLifeCycle('destroyed');
var onActivated = exports.onActivated = createLifeCycle('activated');
var onDeactivated = exports.onDeactivated = createLifeCycle('deactivated');
var onServerPrefetch = exports.onServerPrefetch = createLifeCycle('serverPrefetch');
var onRenderTracked = exports.onRenderTracked = createLifeCycle('renderTracked');
var onRenderTriggered = exports.onRenderTriggered = createLifeCycle('renderTriggered');
var injectErrorCapturedHook = createLifeCycle('errorCaptured');
function onErrorCaptured(hook, target) {
  if (target === void 0) {
    target = currentInstance;
  }
  injectErrorCapturedHook(hook, target);
}

/**
 * Note: also update dist/vue.runtime.mjs when adding new exports to this file.
 */
var version = exports.version = '2.7.16';
/**
 * @internal type is manually declared in <root>/types/v3-define-component.d.ts
 */
function defineComponent(options) {
  return options;
}
var seenObjects = new _Set();
/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse(val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
  return val;
}
function _traverse(val, seen) {
  var i, keys;
  var isA = isArray(val);
  if (!isA && !isObject(val) || val.__v_skip /* ReactiveFlags.SKIP */ || Object.isFrozen(val) || val instanceof VNode) {
    return;
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return;
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) _traverse(val[i], seen);
  } else if (isRef(val)) {
    _traverse(val.value, seen);
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) _traverse(val[keys[i]], seen);
  }
}
var uid$1 = 0;
/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 * @internal
 */
var Watcher = /** @class */function () {
  function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
    recordEffectScope(this,
    // if the active effect scope is manually created (not a component scope),
    // prioritize it
    activeEffectScope && !activeEffectScope._vm ? activeEffectScope : vm ? vm._scope : undefined);
    if ((this.vm = vm) && isRenderWatcher) {
      vm._watcher = this;
    }
    // options
    if (options) {
      this.deep = !!options.deep;
      this.user = !!options.user;
      this.lazy = !!options.lazy;
      this.sync = !!options.sync;
      this.before = options.before;
      if ("production" !== 'production') {
        this.onTrack = options.onTrack;
        this.onTrigger = options.onTrigger;
      }
    } else {
      this.deep = this.user = this.lazy = this.sync = false;
    }
    this.cb = cb;
    this.id = ++uid$1; // uid for batching
    this.active = true;
    this.post = false;
    this.dirty = this.lazy; // for lazy watchers
    this.deps = [];
    this.newDeps = [];
    this.depIds = new _Set();
    this.newDepIds = new _Set();
    this.expression = "production" !== 'production' ? expOrFn.toString() : '';
    // parse expression for getter
    if (isFunction(expOrFn)) {
      this.getter = expOrFn;
    } else {
      this.getter = parsePath(expOrFn);
      if (!this.getter) {
        this.getter = noop;
        "production" !== 'production' && warn("Failed watching path: \"".concat(expOrFn, "\" ") + 'Watcher only accepts simple dot-delimited paths. ' + 'For full control, use a function instead.', vm);
      }
    }
    this.value = this.lazy ? undefined : this.get();
  }
  /**
   * Evaluate the getter, and re-collect dependencies.
   */
  Watcher.prototype.get = function () {
    pushTarget(this);
    var value;
    var vm = this.vm;
    try {
      value = this.getter.call(vm, vm);
    } catch (e) {
      if (this.user) {
        handleError(e, vm, "getter for watcher \"".concat(this.expression, "\""));
      } else {
        throw e;
      }
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      if (this.deep) {
        traverse(value);
      }
      popTarget();
      this.cleanupDeps();
    }
    return value;
  };
  /**
   * Add a dependency to this directive.
   */
  Watcher.prototype.addDep = function (dep) {
    var id = dep.id;
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id);
      this.newDeps.push(dep);
      if (!this.depIds.has(id)) {
        dep.addSub(this);
      }
    }
  };
  /**
   * Clean up for dependency collection.
   */
  Watcher.prototype.cleanupDeps = function () {
    var i = this.deps.length;
    while (i--) {
      var dep = this.deps[i];
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this);
      }
    }
    var tmp = this.depIds;
    this.depIds = this.newDepIds;
    this.newDepIds = tmp;
    this.newDepIds.clear();
    tmp = this.deps;
    this.deps = this.newDeps;
    this.newDeps = tmp;
    this.newDeps.length = 0;
  };
  /**
   * Subscriber interface.
   * Will be called when a dependency changes.
   */
  Watcher.prototype.update = function () {
    /* istanbul ignore else */
    if (this.lazy) {
      this.dirty = true;
    } else if (this.sync) {
      this.run();
    } else {
      queueWatcher(this);
    }
  };
  /**
   * Scheduler job interface.
   * Will be called by the scheduler.
   */
  Watcher.prototype.run = function () {
    if (this.active) {
      var value = this.get();
      if (value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) || this.deep) {
        // set new value
        var oldValue = this.value;
        this.value = value;
        if (this.user) {
          var info = "callback for watcher \"".concat(this.expression, "\"");
          invokeWithErrorHandling(this.cb, this.vm, [value, oldValue], this.vm, info);
        } else {
          this.cb.call(this.vm, value, oldValue);
        }
      }
    }
  };
  /**
   * Evaluate the value of the watcher.
   * This only gets called for lazy watchers.
   */
  Watcher.prototype.evaluate = function () {
    this.value = this.get();
    this.dirty = false;
  };
  /**
   * Depend on all deps collected by this watcher.
   */
  Watcher.prototype.depend = function () {
    var i = this.deps.length;
    while (i--) {
      this.deps[i].depend();
    }
  };
  /**
   * Remove self from all dependencies' subscriber list.
   */
  Watcher.prototype.teardown = function () {
    if (this.vm && !this.vm._isBeingDestroyed) {
      remove$2(this.vm._scope.effects, this);
    }
    if (this.active) {
      var i = this.deps.length;
      while (i--) {
        this.deps[i].removeSub(this);
      }
      this.active = false;
      if (this.onStop) {
        this.onStop();
      }
    }
  };
  return Watcher;
}();
var mark;
var measure;
if ("production" !== 'production') {
  var perf_1 = inBrowser && window.performance;
  /* istanbul ignore if */
  if (perf_1 &&
  // @ts-ignore
  perf_1.mark &&
  // @ts-ignore
  perf_1.measure &&
  // @ts-ignore
  perf_1.clearMarks &&
  // @ts-ignore
  perf_1.clearMeasures) {
    mark = function (tag) {
      return perf_1.mark(tag);
    };
    measure = function (name, startTag, endTag) {
      perf_1.measure(name, startTag, endTag);
      perf_1.clearMarks(startTag);
      perf_1.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}
function initEvents(vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}
var target$1;
function add$1(event, fn) {
  target$1.$on(event, fn);
}
function remove$1(event, fn) {
  target$1.$off(event, fn);
}
function createOnceHandler$1(event, fn) {
  var _target = target$1;
  return function onceHandler() {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  };
}
function updateComponentListeners(vm, listeners, oldListeners) {
  target$1 = vm;
  updateListeners(listeners, oldListeners || {}, add$1, remove$1, createOnceHandler$1, vm);
  target$1 = undefined;
}
function eventsMixin(Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm;
  };
  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on() {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm;
  };
  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm;
    }
    // array of events
    if (isArray(event)) {
      for (var i_1 = 0, l = event.length; i_1 < l; i_1++) {
        vm.$off(event[i_1], fn);
      }
      return vm;
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm;
    }
    if (!fn) {
      vm._events[event] = null;
      return vm;
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break;
      }
    }
    return vm;
  };
  Vue.prototype.$emit = function (event) {
    var vm = this;
    if ("production" !== 'production') {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip("Event \"".concat(lowerCaseEvent, "\" is emitted in component ") + "".concat(formatComponentName(vm), " but the handler is registered for \"").concat(event, "\". ") + "Note that HTML attributes are case-insensitive and you cannot use " + "v-on to listen to camelCase events when using in-DOM templates. " + "You should probably use \"".concat(hyphenate(event), "\" instead of \"").concat(event, "\"."));
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"".concat(event, "\"");
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm;
  };
}
var activeInstance = null;
var isUpdatingChildComponent = false;
function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  };
}
function initLifecycle(vm) {
  var options = vm.$options;
  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }
  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;
  vm.$children = [];
  vm.$refs = {};
  vm._provided = parent ? parent._provided : Object.create(null);
  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}
function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    var wrapper = vm;
    while (wrapper && wrapper.$vnode && wrapper.$parent && wrapper.$vnode === wrapper.$parent._vnode) {
      wrapper.$parent.$el = wrapper.$el;
      wrapper = wrapper.$parent;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };
  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };
  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return;
    }
    callHook$1(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove$2(parent.$children, vm);
    }
    // teardown scope. this includes both the render watcher and other
    // watchers created
    vm._scope.stop();
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook$1(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}
function mountComponent(vm, el, hydrating) {
  vm.$el = el;
  if (!vm.$options.render) {
    // @ts-expect-error invalid type
    vm.$options.render = createEmptyVNode;
    if ("production" !== 'production') {
      /* istanbul ignore if */
      if (vm.$options.template && vm.$options.template.charAt(0) !== '#' || vm.$options.el || el) {
        warn('You are using the runtime-only build of Vue where the template ' + 'compiler is not available. Either pre-compile the templates into ' + 'render functions, or use the compiler-included build.', vm);
      } else {
        warn('Failed to mount component: template or render function not defined.', vm);
      }
    }
  }
  callHook$1(vm, 'beforeMount');
  var updateComponent;
  /* istanbul ignore if */
  if ("production" !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:".concat(id);
      var endTag = "vue-perf-end:".concat(id);
      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure("vue ".concat(name, " render"), startTag, endTag);
      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure("vue ".concat(name, " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }
  var watcherOptions = {
    before: function () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook$1(vm, 'beforeUpdate');
      }
    }
  };
  if ("production" !== 'production') {
    watcherOptions.onTrack = function (e) {
      return callHook$1(vm, 'renderTracked', [e]);
    };
    watcherOptions.onTrigger = function (e) {
      return callHook$1(vm, 'renderTriggered', [e]);
    };
  }
  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, watcherOptions, true /* isRenderWatcher */);
  hydrating = false;
  // flush buffer for flush: "pre" watchers queued in setup()
  var preWatchers = vm._preWatchers;
  if (preWatchers) {
    for (var i = 0; i < preWatchers.length; i++) {
      preWatchers[i].run();
    }
  }
  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook$1(vm, 'mounted');
  }
  return vm;
}
function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
  if ("production" !== 'production') {
    isUpdatingChildComponent = true;
  }
  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.
  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(newScopedSlots && !newScopedSlots.$stable || oldScopedSlots !== emptyObject && !oldScopedSlots.$stable || newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key || !newScopedSlots && vm.$scopedSlots.$key);
  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(renderChildren ||
  // has new static slots
  vm.$options._renderChildren ||
  // has old static slots
  hasDynamicScopedSlot);
  var prevVNode = vm.$vnode;
  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render
  if (vm._vnode) {
    // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;
  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  var attrs = parentVnode.data.attrs || emptyObject;
  if (vm._attrsProxy) {
    // force update if attrs are accessed and has changed since it may be
    // passed to a child component.
    if (syncSetupProxy(vm._attrsProxy, attrs, prevVNode.data && prevVNode.data.attrs || emptyObject, vm, '$attrs')) {
      needsForceUpdate = true;
    }
  }
  vm.$attrs = attrs;
  // update listeners
  listeners = listeners || emptyObject;
  var prevListeners = vm.$options._parentListeners;
  if (vm._listenersProxy) {
    syncSetupProxy(vm._listenersProxy, listeners, prevListeners || emptyObject, vm, '$listeners');
  }
  vm.$listeners = vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, prevListeners);
  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }
  if ("production" !== 'production') {
    isUpdatingChildComponent = false;
  }
}
function isInInactiveTree(vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) return true;
  }
  return false;
}
function activateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return;
    }
  } else if (vm._directInactive) {
    return;
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook$1(vm, 'activated');
  }
}
function deactivateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return;
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook$1(vm, 'deactivated');
  }
}
function callHook$1(vm, hook, args, setContext) {
  if (setContext === void 0) {
    setContext = true;
  }
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var prevInst = currentInstance;
  var prevScope = getCurrentScope();
  setContext && setCurrentInstance(vm);
  var handlers = vm.$options[hook];
  var info = "".concat(hook, " hook");
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, args || null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  if (setContext) {
    setCurrentInstance(prevInst);
    prevScope && prevScope.on();
  }
  popTarget();
}
var MAX_UPDATE_COUNT = 100;
var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;
/**
 * Reset the scheduler's state.
 */
function resetSchedulerState() {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if ("production" !== 'production') {
    circular = {};
  }
  waiting = flushing = false;
}
// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;
// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;
// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance_1 = window.performance;
  if (performance_1 && typeof performance_1.now === 'function' && getNow() > document.createEvent('Event').timeStamp) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () {
      return performance_1.now();
    };
  }
}
var sortCompareFn = function (a, b) {
  if (a.post) {
    if (!b.post) return 1;
  } else if (b.post) {
    return -1;
  }
  return a.id - b.id;
};
/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue() {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;
  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(sortCompareFn);
  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ("production" !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn('You may have an infinite update loop ' + (watcher.user ? "in watcher with expression \"".concat(watcher.expression, "\"") : "in a component render function."), watcher.vm);
        break;
      }
    }
  }
  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();
  resetSchedulerState();
  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);
  cleanupDeps();
  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}
function callUpdatedHooks(queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm && vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook$1(vm, 'updated');
    }
  }
}
/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent(vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}
function callActivatedHooks(queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}
/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher(watcher) {
  var id = watcher.id;
  if (has[id] != null) {
    return;
  }
  if (watcher === Dep.target && watcher.noRecurse) {
    return;
  }
  has[id] = true;
  if (!flushing) {
    queue.push(watcher);
  } else {
    // if already flushing, splice the watcher based on its id
    // if already past its id, it will be run next immediately.
    var i = queue.length - 1;
    while (i > index && queue[i].id > watcher.id) {
      i--;
    }
    queue.splice(i + 1, 0, watcher);
  }
  // queue the flush
  if (!waiting) {
    waiting = true;
    if ("production" !== 'production' && !config.async) {
      flushSchedulerQueue();
      return;
    }
    nextTick(flushSchedulerQueue);
  }
}
function initProvide(vm) {
  var provideOption = vm.$options.provide;
  if (provideOption) {
    var provided = isFunction(provideOption) ? provideOption.call(vm) : provideOption;
    if (!isObject(provided)) {
      return;
    }
    var source = resolveProvided(vm);
    // IE9 doesn't support Object.getOwnPropertyDescriptors so we have to
    // iterate the keys ourselves.
    var keys = hasSymbol ? Reflect.ownKeys(provided) : Object.keys(provided);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      Object.defineProperty(source, key, Object.getOwnPropertyDescriptor(provided, key));
    }
  }
}
function initInjections(vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if ("production" !== 'production') {
        defineReactive(vm, key, result[key], function () {
          warn("Avoid mutating an injected value directly since the changes will be " + "overwritten whenever the provided component re-renders. " + "injection being mutated: \"".concat(key, "\""), vm);
        });
      } else {
        defineReactive(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}
function resolveInject(inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') continue;
      var provideKey = inject[key].from;
      if (provideKey in vm._provided) {
        result[key] = vm._provided[provideKey];
      } else if ('default' in inject[key]) {
        var provideDefault = inject[key].default;
        result[key] = isFunction(provideDefault) ? provideDefault.call(vm) : provideDefault;
      } else if ("production" !== 'production') {
        warn("Injection \"".concat(key, "\" not found"), vm);
      }
    }
    return result;
  }
}
function FunctionalRenderContext(data, props, children, parent, Ctor) {
  var _this = this;
  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // @ts-ignore
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!_this.$slots) {
      normalizeScopedSlots(parent, data.scopedSlots, _this.$slots = resolveSlots(children, parent));
    }
    return _this.$slots;
  };
  Object.defineProperty(this, 'scopedSlots', {
    enumerable: true,
    get: function () {
      return normalizeScopedSlots(parent, data.scopedSlots, this.slots());
    }
  });
  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(parent, data.scopedSlots, this.$slots);
  }
  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement$1(contextVm, a, b, c, d, needNormalization);
      if (vnode && !isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode;
    };
  } else {
    this._c = function (a, b, c, d) {
      return createElement$1(contextVm, a, b, c, d, needNormalization);
    };
  }
}
installRenderHelpers(FunctionalRenderContext.prototype);
function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) mergeProps(props, data.attrs);
    if (isDef(data.props)) mergeProps(props, data.props);
  }
  var renderContext = new FunctionalRenderContext(data, props, children, contextVm, Ctor);
  var vnode = options.render.call(null, renderContext._c, renderContext);
  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext);
  } else if (isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res;
  }
}
function cloneAndMarkFunctionalResult(vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if ("production" !== 'production') {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone;
}
function mergeProps(to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}
function getComponentName(options) {
  return options.name || options.__name || options._componentTag;
}
// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function (vnode, hydrating) {
    if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance);
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },
  prepatch: function (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(child, options.propsData,
    // updated props
    options.listeners,
    // updated listeners
    vnode,
    // new parent vnode
    options.children // new children
    );
  },
  insert: function (vnode) {
    var context = vnode.context,
      componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook$1(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },
  destroy: function (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};
var hooksToMerge = Object.keys(componentVNodeHooks);
function createComponent(Ctor, data, context, children, tag) {
  if (isUndef(Ctor)) {
    return;
  }
  var baseCtor = context.$options._base;
  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }
  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if ("production" !== 'production') {
      warn("Invalid Component definition: ".concat(String(Ctor)), context);
    }
    return;
  }
  // async component
  var asyncFactory;
  // @ts-expect-error
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
    }
  }
  data = data || {};
  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);
  // transform component v-model data into props & events
  if (isDef(data.model)) {
    // @ts-expect-error
    transformModel(Ctor.options, data);
  }
  // extract props
  // @ts-expect-error
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);
  // functional component
  // @ts-expect-error
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children);
  }
  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;
  // @ts-expect-error
  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot
    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }
  // install component management hooks onto the placeholder node
  installComponentHooks(data);
  // return a placeholder vnode
  // @ts-expect-error
  var name = getComponentName(Ctor.options) || tag;
  var vnode = new VNode(
  // @ts-expect-error
  "vue-component-".concat(Ctor.cid).concat(name ? "-".concat(name) : ''), data, undefined, undefined, undefined, context,
  // @ts-expect-error
  {
    Ctor: Ctor,
    propsData: propsData,
    listeners: listeners,
    tag: tag,
    children: children
  }, asyncFactory);
  return vnode;
}
function createComponentInstanceForVnode(
// we know it's MountedComponentVNode but flow doesn't
vnode,
// activeInstance in lifecycle state
parent) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options);
}
function installComponentHooks(data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    // @ts-expect-error
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook(toMerge, existing) : toMerge;
    }
  }
}
function mergeHook(f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged;
}
// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel(options, data) {
  var prop = options.model && options.model.prop || 'value';
  var event = options.model && options.model.event || 'input';
  (data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (isArray(existing) ? existing.indexOf(callback) === -1 : existing !== callback) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}
var warn = noop;
var tip = noop;
var generateComponentTrace; // work around flow check
var formatComponentName;
if ("production" !== 'production') {
  var hasConsole_1 = typeof console !== 'undefined';
  var classifyRE_1 = /(?:^|[-_])(\w)/g;
  var classify_1 = function (str) {
    return str.replace(classifyRE_1, function (c) {
      return c.toUpperCase();
    }).replace(/[-_]/g, '');
  };
  warn = function (msg, vm) {
    if (vm === void 0) {
      vm = currentInstance;
    }
    var trace = vm ? generateComponentTrace(vm) : '';
    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole_1 && !config.silent) {
      console.error("[Vue warn]: ".concat(msg).concat(trace));
    }
  };
  tip = function (msg, vm) {
    if (hasConsole_1 && !config.silent) {
      console.warn("[Vue tip]: ".concat(msg) + (vm ? generateComponentTrace(vm) : ''));
    }
  };
  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>';
    }
    var options = isFunction(vm) && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm;
    var name = getComponentName(options);
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }
    return (name ? "<".concat(classify_1(name), ">") : "<Anonymous>") + (file && includeFile !== false ? " at ".concat(file) : '');
  };
  var repeat_1 = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) res += str;
      if (n > 1) str += str;
      n >>= 1;
    }
    return res;
  };
  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue;
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree.map(function (vm, i) {
        return "".concat(i === 0 ? '---> ' : repeat_1(' ', 5 + i * 2)).concat(isArray(vm) ? "".concat(formatComponentName(vm[0]), "... (").concat(vm[1], " recursive calls)") : formatComponentName(vm));
      }).join('\n');
    } else {
      return "\n\n(found in ".concat(formatComponentName(vm), ")");
    }
  };
}

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;
/**
 * Options with restrictions
 */
if ("production" !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn("option \"".concat(key, "\" can only be used during instance ") + 'creation with the `new` keyword.');
    }
    return defaultStrat(parent, child);
  };
}
/**
 * Helper that recursively merges two data objects together.
 */
function mergeData(to, from, recursive) {
  if (recursive === void 0) {
    recursive = true;
  }
  if (!from) return to;
  var key, toVal, fromVal;
  var keys = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') continue;
    toVal = to[key];
    fromVal = from[key];
    if (!recursive || !hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (toVal !== fromVal && isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to;
}
/**
 * Data
 */
function mergeDataOrFn(parentVal, childVal, vm) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal;
    }
    if (!parentVal) {
      return childVal;
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn() {
      return mergeData(isFunction(childVal) ? childVal.call(this, this) : childVal, isFunction(parentVal) ? parentVal.call(this, this) : parentVal);
    };
  } else {
    return function mergedInstanceDataFn() {
      // instance merge
      var instanceData = isFunction(childVal) ? childVal.call(vm, vm) : childVal;
      var defaultData = isFunction(parentVal) ? parentVal.call(vm, vm) : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData);
      } else {
        return defaultData;
      }
    };
  }
}
strats.data = function (parentVal, childVal, vm) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "production" !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
      return parentVal;
    }
    return mergeDataOrFn(parentVal, childVal);
  }
  return mergeDataOrFn(parentVal, childVal, vm);
};
/**
 * Hooks and props are merged as arrays.
 */
function mergeLifecycleHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeLifecycleHook;
});
/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets(parentVal, childVal, vm, key) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    "production" !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal);
  } else {
    return res;
  }
}
ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});
/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal, vm, key) {
  // work around Firefox's Object.prototype.watch...
  //@ts-expect-error work around
  if (parentVal === nativeWatch) parentVal = undefined;
  //@ts-expect-error work around
  if (childVal === nativeWatch) childVal = undefined;
  /* istanbul ignore if */
  if (!childVal) return Object.create(parentVal || null);
  if ("production" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) return childVal;
  var ret = {};
  extend(ret, parentVal);
  for (var key_1 in childVal) {
    var parent_1 = ret[key_1];
    var child = childVal[key_1];
    if (parent_1 && !isArray(parent_1)) {
      parent_1 = [parent_1];
    }
    ret[key_1] = parent_1 ? parent_1.concat(child) : isArray(child) ? child : [child];
  }
  return ret;
};
/**
 * Other object hashes.
 */
strats.props = strats.methods = strats.inject = strats.computed = function (parentVal, childVal, vm, key) {
  if (childVal && "production" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) return childVal;
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) extend(ret, childVal);
  return ret;
};
strats.provide = function (parentVal, childVal) {
  if (!parentVal) return childVal;
  return function () {
    var ret = Object.create(null);
    mergeData(ret, isFunction(parentVal) ? parentVal.call(this) : parentVal);
    if (childVal) {
      mergeData(ret, isFunction(childVal) ? childVal.call(this) : childVal, false // non-recursive
      );
    }
    return ret;
  };
};
/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined ? parentVal : childVal;
};
/**
 * Validate component names
 */
function checkComponents(options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}
function validateComponentName(name) {
  if (!new RegExp("^[a-zA-Z][\\-\\.0-9_".concat(unicodeRegExp.source, "]*$")).test(name)) {
    warn('Invalid component name: "' + name + '". Component names ' + 'should conform to valid custom element name in html5 specification.');
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + name);
  }
}
/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps(options, vm) {
  var props = options.props;
  if (!props) return;
  var res = {};
  var i, val, name;
  if (isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = {
          type: null
        };
      } else if ("production" !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val) ? val : {
        type: val
      };
    }
  } else if ("production" !== 'production') {
    warn("Invalid value for option \"props\": expected an Array or an Object, " + "but got ".concat(toRawType(props), "."), vm);
  }
  options.props = res;
}
/**
 * Normalize all injections into Object-based format
 */
function normalizeInject(options, vm) {
  var inject = options.inject;
  if (!inject) return;
  var normalized = options.inject = {};
  if (isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = {
        from: inject[i]
      };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val) ? extend({
        from: key
      }, val) : {
        from: val
      };
    }
  } else if ("production" !== 'production') {
    warn("Invalid value for option \"inject\": expected an Array or an Object, " + "but got ".concat(toRawType(inject), "."), vm);
  }
}
/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives$1(options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (isFunction(def)) {
        dirs[key] = {
          bind: def,
          update: def
        };
      }
    }
  }
}
function assertObjectType(name, value, vm) {
  if (!isPlainObject(value)) {
    warn("Invalid value for option \"".concat(name, "\": expected an Object, ") + "but got ".concat(toRawType(value), "."), vm);
  }
}
/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions(parent, child, vm) {
  if ("production" !== 'production') {
    checkComponents(child);
  }
  if (isFunction(child)) {
    // @ts-expect-error
    child = child.options;
  }
  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives$1(child);
  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField(key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options;
}
/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset(options, type, id, warnMissing) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return;
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) return assets[id];
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) return assets[camelizedId];
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) return assets[PascalCaseId];
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ("production" !== 'production' && warnMissing && !res) {
    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id);
  }
  return res;
}
function validateProp(key, propOptions, propsData, vm) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if ("production" !== 'production') {
    assertProp(prop, key, value, vm, absent);
  }
  return value;
}
/**
 * Get the default value of a prop.
 */
function getPropDefaultValue(vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined;
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ("production" !== 'production' && isObject(def)) {
    warn('Invalid default value for prop "' + key + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData && vm.$options.propsData[key] === undefined && vm._props[key] !== undefined) {
    return vm._props[key];
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return isFunction(def) && getType(prop.type) !== 'Function' ? def.call(vm) : def;
}
/**
 * Assert whether a prop is valid.
 */
function assertProp(prop, name, value, vm, absent) {
  if (prop.required && absent) {
    warn('Missing required prop: "' + name + '"', vm);
    return;
  }
  if (value == null && !prop.required) {
    return;
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i], vm);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  var haveExpectedTypes = expectedTypes.some(function (t) {
    return t;
  });
  if (!valid && haveExpectedTypes) {
    warn(getInvalidTypeMessage(name, value, expectedTypes), vm);
    return;
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
    }
  }
}
var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol|BigInt)$/;
function assertType(value, type, vm) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = isArray(value);
  } else {
    try {
      valid = value instanceof type;
    } catch (e) {
      warn('Invalid prop type: "' + String(type) + '" is not a constructor', vm);
      valid = false;
    }
  }
  return {
    valid: valid,
    expectedType: expectedType
  };
}
var functionTypeCheckRE = /^\s*function (\w+)/;
/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType(fn) {
  var match = fn && fn.toString().match(functionTypeCheckRE);
  return match ? match[1] : '';
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
  if (!isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i;
    }
  }
  return -1;
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"".concat(name, "\".") + " Expected ".concat(expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 && isExplicable(expectedType) && isExplicable(typeof value) && !isBoolean(expectedType, receivedType)) {
    message += " with value ".concat(styleValue(value, expectedType));
  }
  message += ", got ".concat(receivedType, " ");
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value ".concat(styleValue(value, receivedType), ".");
  }
  return message;
}
function styleValue(value, type) {
  if (type === 'String') {
    return "\"".concat(value, "\"");
  } else if (type === 'Number') {
    return "".concat(Number(value));
  } else {
    return "".concat(value);
  }
}
var EXPLICABLE_TYPES = ['string', 'number', 'boolean'];
function isExplicable(value) {
  return EXPLICABLE_TYPES.some(function (elem) {
    return value.toLowerCase() === elem;
  });
}
function isBoolean() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  return args.some(function (elem) {
    return elem.toLowerCase() === 'boolean';
  });
}

/* not type checking this file because flow doesn't play well with Proxy */
var initProxy;
if ("production" !== 'production') {
  var allowedGlobals_1 = makeMap('Infinity,undefined,NaN,isFinite,isNaN,' + 'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' + 'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,' + 'require' // for Webpack/Browserify
  );
  var warnNonPresent_1 = function (target, key) {
    warn("Property or method \"".concat(key, "\" is not defined on the instance but ") + 'referenced during render. Make sure that this property is reactive, ' + 'either in the data option, or for class-based components, by ' + 'initializing the property. ' + 'See: https://v2.vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.', target);
  };
  var warnReservedPrefix_1 = function (target, key) {
    warn("Property \"".concat(key, "\" must be accessed with \"$data.").concat(key, "\" because ") + 'properties starting with "$" or "_" are not proxied in the Vue instance to ' + 'prevent conflicts with Vue internals. ' + 'See: https://v2.vuejs.org/v2/api/#data', target);
  };
  var hasProxy_1 = typeof Proxy !== 'undefined' && isNative(Proxy);
  if (hasProxy_1) {
    var isBuiltInModifier_1 = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function (target, key, value) {
        if (isBuiltInModifier_1(key)) {
          warn("Avoid overwriting built-in modifier in config.keyCodes: .".concat(key));
          return false;
        } else {
          target[key] = value;
          return true;
        }
      }
    });
  }
  var hasHandler_1 = {
    has: function (target, key) {
      var has = (key in target);
      var isAllowed = allowedGlobals_1(key) || typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data);
      if (!has && !isAllowed) {
        if (key in target.$data) warnReservedPrefix_1(target, key);else warnNonPresent_1(target, key);
      }
      return has || !isAllowed;
    }
  };
  var getHandler_1 = {
    get: function (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) warnReservedPrefix_1(target, key);else warnNonPresent_1(target, key);
      }
      return target[key];
    }
  };
  initProxy = function initProxy(vm) {
    if (hasProxy_1) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped ? getHandler_1 : hasHandler_1;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}
var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};
function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}
function initState(vm) {
  var opts = vm.$options;
  if (opts.props) initProps$1(vm, opts.props);
  // Composition API
  initSetup(vm);
  if (opts.methods) initMethods(vm, opts.methods);
  if (opts.data) {
    initData(vm);
  } else {
    var ob = observe(vm._data = {});
    ob && ob.vmCount++;
  }
  if (opts.computed) initComputed$1(vm, opts.computed);
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}
function initProps$1(vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = shallowReactive({});
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var _loop_1 = function (key) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if ("production" !== 'production') {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) || config.isReservedAttr(hyphenatedKey)) {
        warn("\"".concat(hyphenatedKey, "\" is a reserved attribute and cannot be used as component prop."), vm);
      }
      defineReactive(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          warn("Avoid mutating a prop directly since the value will be " + "overwritten whenever the parent component re-renders. " + "Instead, use a data or computed property based on the prop's " + "value. Prop being mutated: \"".concat(key, "\""), vm);
        }
      }, true /* shallow */);
    } else {
      defineReactive(props, key, value, undefined, true /* shallow */);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };
  for (var key in propsOptions) {
    _loop_1(key);
  }
  toggleObserving(true);
}
function initData(vm) {
  var data = vm.$options.data;
  data = vm._data = isFunction(data) ? getData(data, vm) : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "production" !== 'production' && warn('data functions should return an object:\n' + 'https://v2.vuejs.org/v2/guide/components.html#data-Must-Be-a-Function', vm);
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if ("production" !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn("Method \"".concat(key, "\" has already been defined as a data property."), vm);
      }
    }
    if (props && hasOwn(props, key)) {
      "production" !== 'production' && warn("The data property \"".concat(key, "\" is already declared as a prop. ") + "Use prop default value instead.", vm);
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  var ob = observe(data);
  ob && ob.vmCount++;
}
function getData(data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm);
  } catch (e) {
    handleError(e, vm, "data()");
    return {};
  } finally {
    popTarget();
  }
}
var computedWatcherOptions = {
  lazy: true
};
function initComputed$1(vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();
  for (var key in computed) {
    var userDef = computed[key];
    var getter = isFunction(userDef) ? userDef : userDef.get;
    if ("production" !== 'production' && getter == null) {
      warn("Getter is missing for computed property \"".concat(key, "\"."), vm);
    }
    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
    }
    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if ("production" !== 'production') {
      if (key in vm.$data) {
        warn("The computed property \"".concat(key, "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn("The computed property \"".concat(key, "\" is already defined as a prop."), vm);
      } else if (vm.$options.methods && key in vm.$options.methods) {
        warn("The computed property \"".concat(key, "\" is already defined as a method."), vm);
      }
    }
  }
}
function defineComputed(target, key, userDef) {
  var shouldCache = !isServerRendering();
  if (isFunction(userDef)) {
    sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter(key) : createGetterInvoker(userDef.get) : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ("production" !== 'production' && sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn("Computed property \"".concat(key, "\" was assigned to but it has no setter."), this);
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}
function createComputedGetter(key) {
  return function computedGetter() {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        if ("production" !== 'production' && Dep.target.onTrack) {
          Dep.target.onTrack({
            effect: Dep.target,
            target: this,
            type: "get" /* TrackOpTypes.GET */,
            key: key
          });
        }
        watcher.depend();
      }
      return watcher.value;
    }
  };
}
function createGetterInvoker(fn) {
  return function computedGetter() {
    return fn.call(this, this);
  };
}
function initMethods(vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if ("production" !== 'production') {
      if (typeof methods[key] !== 'function') {
        warn("Method \"".concat(key, "\" has type \"").concat(typeof methods[key], "\" in the component definition. ") + "Did you reference the function correctly?", vm);
      }
      if (props && hasOwn(props, key)) {
        warn("Method \"".concat(key, "\" has already been defined as a prop."), vm);
      }
      if (key in vm && isReserved(key)) {
        warn("Method \"".concat(key, "\" conflicts with an existing Vue instance method. ") + "Avoid defining component methods that start with _ or $.");
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}
function initWatch(vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}
function createWatcher(vm, expOrFn, handler, options) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options);
}
function stateMixin(Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () {
    return this._data;
  };
  var propsDef = {};
  propsDef.get = function () {
    return this._props;
  };
  if ("production" !== 'production') {
    dataDef.set = function () {
      warn('Avoid replacing instance root $data. ' + 'Use nested data properties instead.', this);
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);
  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;
  Vue.prototype.$watch = function (expOrFn, cb, options) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options);
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      var info = "callback for immediate watcher \"".concat(watcher.expression, "\"");
      pushTarget();
      invokeWithErrorHandling(cb, vm, [watcher.value], vm, info);
      popTarget();
    }
    return function unwatchFn() {
      watcher.teardown();
    };
  };
}
var uid = 0;
function initMixin$1(Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid++;
    var startTag, endTag;
    /* istanbul ignore if */
    if ("production" !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:".concat(vm._uid);
      endTag = "vue-perf-end:".concat(vm._uid);
      mark(startTag);
    }
    // a flag to mark this as a Vue instance without having to do instanceof
    // check
    vm._isVue = true;
    // avoid instances from being observed
    vm.__v_skip = true;
    // effect scope
    vm._scope = new EffectScope(true /* detached */);
    // #13134 edge case where a child component is manually created during the
    // render of a parent component
    vm._scope.parent = undefined;
    vm._scope._vm = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
    }
    /* istanbul ignore else */
    if ("production" !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook$1(vm, 'beforeCreate', undefined, false /* setContext */);
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook$1(vm, 'created');
    /* istanbul ignore if */
    if ("production" !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure("vue ".concat(vm._name, " init"), startTag, endTag);
    }
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}
function initInternalComponent(vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}
function resolveConstructorOptions(Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options;
}
function resolveModifiedOptions(Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) modified = {};
      modified[key] = latest[key];
    }
  }
  return modified;
}
function Vue(options) {
  if ("production" !== 'production' && !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}
//@ts-expect-error Vue has function type
initMixin$1(Vue);
//@ts-expect-error Vue has function type
stateMixin(Vue);
//@ts-expect-error Vue has function type
eventsMixin(Vue);
//@ts-expect-error Vue has function type
lifecycleMixin(Vue);
//@ts-expect-error Vue has function type
renderMixin(Vue);
function initUse(Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = this._installedPlugins || (this._installedPlugins = []);
    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    }
    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (isFunction(plugin.install)) {
      plugin.install.apply(plugin, args);
    } else if (isFunction(plugin)) {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this;
  };
}
function initMixin(Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this;
  };
}
function initExtend(Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;
  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId];
    }
    var name = getComponentName(extendOptions) || getComponentName(Super.options);
    if ("production" !== 'production' && name) {
      validateComponentName(name);
    }
    var Sub = function VueComponent(options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(Super.options, extendOptions);
    Sub['super'] = Super;
    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps(Sub);
    }
    if (Sub.options.computed) {
      initComputed(Sub);
    }
    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;
    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }
    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);
    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub;
  };
}
function initProps(Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}
function initComputed(Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}
function initAssetRegisters(Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    // @ts-expect-error function is not exact same type
    Vue[type] = function (id, definition) {
      if (!definition) {
        return this.options[type + 's'][id];
      } else {
        /* istanbul ignore if */
        if ("production" !== 'production' && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          // @ts-expect-error
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && isFunction(definition)) {
          definition = {
            bind: definition,
            update: definition
          };
        }
        this.options[type + 's'][id] = definition;
        return definition;
      }
    };
  });
}
function _getComponentName(opts) {
  return opts && (getComponentName(opts.Ctor.options) || opts.tag);
}
function matches(pattern, name) {
  if (isArray(pattern)) {
    return pattern.indexOf(name) > -1;
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1;
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  /* istanbul ignore next */
  return false;
}
function pruneCache(keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache,
    keys = keepAliveInstance.keys,
    _vnode = keepAliveInstance._vnode,
    $vnode = keepAliveInstance.$vnode;
  for (var key in cache) {
    var entry = cache[key];
    if (entry) {
      var name_1 = entry.name;
      if (name_1 && !filter(name_1)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
  $vnode.componentOptions.children = undefined;
}
function pruneCacheEntry(cache, key, keys, current) {
  var entry = cache[key];
  if (entry && (!current || entry.tag !== current.tag)) {
    // @ts-expect-error can be undefined
    entry.componentInstance.$destroy();
  }
  cache[key] = null;
  remove$2(keys, key);
}
var patternTypes = [String, RegExp, Array];
// TODO defineComponent
var KeepAlive = {
  name: 'keep-alive',
  abstract: true,
  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },
  methods: {
    cacheVNode: function () {
      var _a = this,
        cache = _a.cache,
        keys = _a.keys,
        vnodeToCache = _a.vnodeToCache,
        keyToCache = _a.keyToCache;
      if (vnodeToCache) {
        var tag = vnodeToCache.tag,
          componentInstance = vnodeToCache.componentInstance,
          componentOptions = vnodeToCache.componentOptions;
        cache[keyToCache] = {
          name: _getComponentName(componentOptions),
          tag: tag,
          componentInstance: componentInstance
        };
        keys.push(keyToCache);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
        this.vnodeToCache = null;
      }
    }
  },
  created: function () {
    this.cache = Object.create(null);
    this.keys = [];
  },
  destroyed: function () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },
  mounted: function () {
    var _this = this;
    this.cacheVNode();
    this.$watch('include', function (val) {
      pruneCache(_this, function (name) {
        return matches(val, name);
      });
    });
    this.$watch('exclude', function (val) {
      pruneCache(_this, function (name) {
        return !matches(val, name);
      });
    });
  },
  updated: function () {
    this.cacheVNode();
  },
  render: function () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name_2 = _getComponentName(componentOptions);
      var _a = this,
        include = _a.include,
        exclude = _a.exclude;
      if (
      // not included
      include && (!name_2 || !matches(include, name_2)) ||
      // excluded
      exclude && name_2 && matches(exclude, name_2)) {
        return vnode;
      }
      var _b = this,
        cache = _b.cache,
        keys = _b.keys;
      var key = vnode.key == null ?
      // same constructor may get registered as different local components
      // so cid alone is not enough (#3269)
      componentOptions.Ctor.cid + (componentOptions.tag ? "::".concat(componentOptions.tag) : '') : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove$2(keys, key);
        keys.push(key);
      } else {
        // delay setting the cache until update
        this.vnodeToCache = vnode;
        this.keyToCache = key;
      }
      // @ts-expect-error can vnode.data can be undefined
      vnode.data.keepAlive = true;
    }
    return vnode || slot && slot[0];
  }
};
var builtInComponents = {
  KeepAlive: KeepAlive
};
function initGlobalAPI(Vue) {
  // config
  var configDef = {};
  configDef.get = function () {
    return config;
  };
  if ("production" !== 'production') {
    configDef.set = function () {
      warn('Do not replace the Vue.config object, set individual fields instead.');
    };
  }
  Object.defineProperty(Vue, 'config', configDef);
  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };
  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;
  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj;
  };
  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });
  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;
  extend(Vue.options.components, builtInComponents);
  initUse(Vue);
  initMixin(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}
initGlobalAPI(Vue);
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});
Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext;
  }
});
// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});
Vue.version = version;

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');
// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return attr === 'value' && acceptValue(tag) && type !== 'button' || attr === 'selected' && tag === 'option' || attr === 'checked' && tag === 'input' || attr === 'muted' && tag === 'video';
};
var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');
var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');
var convertEnumeratedValue = function (key, value) {
  return isFalsyAttrValue(value) || value === 'false' ? 'false' :
  // allow arbitrary string value for contenteditable
  key === 'contenteditable' && isValidContentEditableValue(value) ? value : 'true';
};
var isBooleanAttr = makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' + 'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' + 'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' + 'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' + 'required,reversed,scoped,seamless,selected,sortable,' + 'truespeed,typemustmatch,visible');
var xlinkNS = 'http://www.w3.org/1999/xlink';
var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink';
};
var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : '';
};
var isFalsyAttrValue = function (val) {
  return val == null || val === false;
};
function genClassForVnode(vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  // @ts-expect-error parentNode.parent not VNodeWithData
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class);
}
function mergeClassData(child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class) ? [child.class, parent.class] : parent.class
  };
}
function renderClass(staticClass, dynamicClass) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass));
  }
  /* istanbul ignore next */
  return '';
}
function concat(a, b) {
  return a ? b ? a + ' ' + b : a : b || '';
}
function stringifyClass(value) {
  if (Array.isArray(value)) {
    return stringifyArray(value);
  }
  if (isObject(value)) {
    return stringifyObject(value);
  }
  if (typeof value === 'string') {
    return value;
  }
  /* istanbul ignore next */
  return '';
}
function stringifyArray(value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) res += ' ';
      res += stringified;
    }
  }
  return res;
}
function stringifyObject(value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) res += ' ';
      res += key;
    }
  }
  return res;
}
var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};
var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' + 'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' + 'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' + 'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' + 's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' + 'embed,object,param,source,canvas,script,noscript,del,ins,' + 'caption,col,colgroup,table,thead,tbody,td,th,tr,' + 'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' + 'output,progress,select,textarea,' + 'details,dialog,menu,menuitem,summary,' + 'content,element,shadow,template,blockquote,iframe,tfoot');
// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' + 'foreignobject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' + 'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);
var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag);
};
function getTagNamespace(tag) {
  if (isSVG(tag)) {
    return 'svg';
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math';
  }
}
var unknownElementCache = Object.create(null);
function isUnknownElement(tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true;
  }
  if (isReservedTag(tag)) {
    return false;
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag];
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // https://stackoverflow.com/a/28210364/1070244
    return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
  } else {
    return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
  }
}
var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/**
 * Query an element selector if it's not an element already.
 */
function query(el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      "production" !== 'production' && warn('Cannot find element: ' + el);
      return document.createElement('div');
    }
    return selected;
  } else {
    return el;
  }
}
function createElement(tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm;
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm;
}
function createElementNS(namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName);
}
function createTextNode(text) {
  return document.createTextNode(text);
}
function createComment(text) {
  return document.createComment(text);
}
function insertBefore(parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}
function removeChild(node, child) {
  node.removeChild(child);
}
function appendChild(node, child) {
  node.appendChild(child);
}
function parentNode(node) {
  return node.parentNode;
}
function nextSibling(node) {
  return node.nextSibling;
}
function tagName(node) {
  return node.tagName;
}
function setTextContent(node, text) {
  node.textContent = text;
}
function setStyleScope(node, scopeId) {
  node.setAttribute(scopeId, '');
}
var nodeOps = /*#__PURE__*/Object.freeze({
  __proto__: null,
  createElement: createElement,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});
var ref = {
  create: function (_, vnode) {
    registerRef(vnode);
  },
  update: function (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function (vnode) {
    registerRef(vnode, true);
  }
};
function registerRef(vnode, isRemoval) {
  var ref = vnode.data.ref;
  if (!isDef(ref)) return;
  var vm = vnode.context;
  var refValue = vnode.componentInstance || vnode.elm;
  var value = isRemoval ? null : refValue;
  var $refsValue = isRemoval ? undefined : refValue;
  if (isFunction(ref)) {
    invokeWithErrorHandling(ref, vm, [value], vm, "template ref function");
    return;
  }
  var isFor = vnode.data.refInFor;
  var _isString = typeof ref === 'string' || typeof ref === 'number';
  var _isRef = isRef(ref);
  var refs = vm.$refs;
  if (_isString || _isRef) {
    if (isFor) {
      var existing = _isString ? refs[ref] : ref.value;
      if (isRemoval) {
        isArray(existing) && remove$2(existing, refValue);
      } else {
        if (!isArray(existing)) {
          if (_isString) {
            refs[ref] = [refValue];
            setSetupRef(vm, ref, refs[ref]);
          } else {
            ref.value = [refValue];
          }
        } else if (!existing.includes(refValue)) {
          existing.push(refValue);
        }
      }
    } else if (_isString) {
      if (isRemoval && refs[ref] !== refValue) {
        return;
      }
      refs[ref] = $refsValue;
      setSetupRef(vm, ref, value);
    } else if (_isRef) {
      if (isRemoval && ref.value !== refValue) {
        return;
      }
      ref.value = value;
    } else if ("production" !== 'production') {
      warn("Invalid template ref type: ".concat(typeof ref));
    }
  }
}
function setSetupRef(_a, key, val) {
  var _setupState = _a._setupState;
  if (_setupState && hasOwn(_setupState, key)) {
    if (isRef(_setupState[key])) {
      _setupState[key].value = val;
    } else {
      _setupState[key] = val;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */
var emptyNode = new VNode('', {}, []);
var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];
function sameVnode(a, b) {
  return a.key === b.key && a.asyncFactory === b.asyncFactory && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && isUndef(b.asyncFactory.error));
}
function sameInputType(a, b) {
  if (a.tag !== 'input') return true;
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB);
}
function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) map[key] = i;
  }
  return map;
}
function createPatchFunction(backend) {
  var i, j;
  var cbs = {};
  var modules = backend.modules,
    nodeOps = backend.nodeOps;
  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }
  function emptyNodeAt(elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
  }
  function createRmCb(childElm, listeners) {
    function remove() {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove;
  }
  function removeNode(el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }
  function isUnknownElement(vnode, inVPre) {
    return !inVPre && !vnode.ns && !(config.ignoredElements.length && config.ignoredElements.some(function (ignore) {
      return isRegExp(ignore) ? ignore.test(vnode.tag) : ignore === vnode.tag;
    })) && config.isUnknownElement(vnode.tag);
  }
  var creatingElmInVPre = 0;
  function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return;
    }
    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if ("production" !== 'production') {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement(vnode, creatingElmInVPre)) {
          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.', vnode.context);
        }
      }
      vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag, vnode);
      setScope(vnode);
      createChildren(vnode, children, insertedVnodeQueue);
      if (isDef(data)) {
        invokeCreateHooks(vnode, insertedVnodeQueue);
      }
      insert(parentElm, vnode.elm, refElm);
      if ("production" !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }
  function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true;
      }
    }
  }
  function initComponent(vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }
  function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break;
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }
  function insert(parent, elm, ref) {
    if (isDef(parent)) {
      if (isDef(ref)) {
        if (nodeOps.parentNode(ref) === parent) {
          nodeOps.insertBefore(parent, elm, ref);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }
  function createChildren(vnode, children, insertedVnodeQueue) {
    if (isArray(children)) {
      if ("production" !== 'production') {
        checkDuplicateKeys(children);
      }
      for (var i_1 = 0; i_1 < children.length; ++i_1) {
        createElm(children[i_1], insertedVnodeQueue, vnode.elm, null, true, children, i_1);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }
  function isPatchable(vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag);
  }
  function invokeCreateHooks(vnode, insertedVnodeQueue) {
    for (var i_2 = 0; i_2 < cbs.create.length; ++i_2) {
      cbs.create[i_2](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) i.create(emptyNode, vnode);
      if (isDef(i.insert)) insertedVnodeQueue.push(vnode);
    }
  }
  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope(vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) && i !== vnode.context && i !== vnode.fnContext && isDef(i = i.$options._scopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }
  function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }
  function invokeDestroyHook(vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) i(vnode);
      for (i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode);
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }
  function removeVnodes(vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else {
          // Text node
          removeNode(ch.elm);
        }
      }
    }
  }
  function removeAndInvokeRemoveHook(vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i_3;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i_3 = vnode.componentInstance) && isDef(i_3 = i_3._vnode) && isDef(i_3.data)) {
        removeAndInvokeRemoveHook(i_3, rm);
      }
      for (i_3 = 0; i_3 < cbs.remove.length; ++i_3) {
        cbs.remove[i_3](vnode, rm);
      }
      if (isDef(i_3 = vnode.data.hook) && isDef(i_3 = i_3.remove)) {
        i_3(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }
  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;
    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;
    if ("production" !== 'production') {
      checkDuplicateKeys(newCh);
    }
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) {
          // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
  }
  function checkDuplicateKeys(children) {
    var seenKeys = {};
    for (var i_4 = 0; i_4 < children.length; i_4++) {
      var vnode = children[i_4];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn("Duplicate keys detected: '".concat(key, "'. This may cause an update error."), vnode.context);
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }
  function findIdxInOld(node, oldCh, start, end) {
    for (var i_5 = start; i_5 < end; i_5++) {
      var c = oldCh[i_5];
      if (isDef(c) && sameVnode(node, c)) return i_5;
    }
  }
  function patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index, removeOnly) {
    if (oldVnode === vnode) {
      return;
    }
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode);
    }
    var elm = vnode.elm = oldVnode.elm;
    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return;
    }
    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
      vnode.componentInstance = oldVnode.componentInstance;
      return;
    }
    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }
    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);
      if (isDef(i = data.hook) && isDef(i = i.update)) i(oldVnode, vnode);
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
      } else if (isDef(ch)) {
        if ("production" !== 'production') {
          checkDuplicateKeys(ch);
        }
        if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, '');
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) i(oldVnode, vnode);
    }
  }
  function invokeInsertHook(vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i_6 = 0; i_6 < queue.length; ++i_6) {
        queue[i_6].data.hook.insert(queue[i_6]);
      }
    }
  }
  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');
  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag,
      data = vnode.data,
      children = vnode.children;
    inVPre = inVPre || data && data.pre;
    vnode.elm = elm;
    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true;
    }
    // assert node match
    if ("production" !== 'production') {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false;
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) i(vnode, true /* hydrating */);
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true;
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if ("production" !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false;
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i_7 = 0; i_7 < children.length; i_7++) {
              if (!childNode || !hydrate(childNode, children[i_7], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break;
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if ("production" !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false;
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break;
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true;
  }
  function assertNodeMatch(node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || !isUnknownElement(vnode, inVPre) && vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase());
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3);
    }
  }
  return function patch(oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) invokeDestroyHook(oldVnode);
      return;
    }
    var isInitialPatch = false;
    var insertedVnodeQueue = [];
    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode;
            } else if ("production" !== 'production') {
              warn('The client-side rendered virtual DOM tree is not matching ' + 'server-rendered content. This is likely caused by incorrect ' + 'HTML markup, for example nesting block-level elements inside ' + '<p>, or missing <tbody>. Bailing hydration and performing ' + 'full client-side render.');
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }
        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm = nodeOps.parentNode(oldElm);
        // create new node
        createElm(vnode, insertedVnodeQueue,
        // extremely rare edge case: do not insert if old element is in a
        // leaving transition. Only happens when combining transition +
        // keep-alive + HOCs. (#4590)
        oldElm._leaveCb ? null : parentElm, nodeOps.nextSibling(oldElm));
        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i_8 = 0; i_8 < cbs.destroy.length; ++i_8) {
              cbs.destroy[i_8](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i_9 = 0; i_9 < cbs.create.length; ++i_9) {
                cbs.create[i_9](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert_1 = ancestor.data.hook.insert;
              if (insert_1.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                // clone insert hooks to avoid being mutated during iteration.
                // e.g. for customed directives under transition group.
                var cloned = insert_1.fns.slice(1);
                for (var i_10 = 0; i_10 < cloned.length; i_10++) {
                  cloned[i_10]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }
        // destroy old node
        if (isDef(parentElm)) {
          removeVnodes([oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }
    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm;
  };
}
var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives(vnode) {
    // @ts-expect-error emptyNode is not VNodeWithData
    updateDirectives(vnode, emptyNode);
  }
};
function updateDirectives(oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}
function _update(oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives(vnode.data.directives, vnode.context);
  var dirsWithInsert = [];
  var dirsWithPostpatch = [];
  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }
  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }
  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }
  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}
var emptyModifiers = Object.create(null);
function normalizeDirectives(dirs, vm) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res;
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    if (vm._setupState && vm._setupState.__sfc) {
      var setupDef = dir.def || resolveAsset(vm, '_setupState', 'v-' + dir.name);
      if (typeof setupDef === 'function') {
        dir.def = {
          bind: setupDef,
          update: setupDef
        };
      } else {
        dir.def = setupDef;
      }
    }
    dir.def = dir.def || resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res;
}
function getRawDirName(dir) {
  return dir.rawName || "".concat(dir.name, ".").concat(Object.keys(dir.modifiers || {}).join('.'));
}
function callHook(dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, "directive ".concat(dir.name, " ").concat(hook, " hook"));
    }
  }
}
var baseModules = [ref, directives];
function updateAttrs(oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return;
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return;
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__) || isTrue(attrs._v_attr_proxy)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }
  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur, vnode.data.pre);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}
function setAttr(el, key, value, isInPre) {
  if (isInPre || el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED' ? 'true' : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}
function baseSetAttr(el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.
    /* istanbul ignore if */
    if (isIE && !isIE9 && el.tagName === 'TEXTAREA' && key === 'placeholder' && value !== '' && !el.__ieph) {
      var blocker_1 = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker_1);
      };
      el.addEventListener('input', blocker_1);
      // $flow-disable-line
      el.__ieph = true; /* IE placeholder patched */
    }
    el.setAttribute(key, value);
  }
}
var attrs = {
  create: updateAttrs,
  update: updateAttrs
};
function updateClass(oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (isUndef(data.staticClass) && isUndef(data.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
    return;
  }
  var cls = genClassForVnode(vnode);
  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }
  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}
var klass = {
  create: updateClass,
  update: updateClass
};

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents(on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event_1 = isIE ? 'change' : 'input';
    on[event_1] = [].concat(on[RANGE_TOKEN], on[event_1] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}
var target;
function createOnceHandler(event, handler, capture) {
  var _target = target; // save current target element in closure
  return function onceHandler() {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove(event, onceHandler, capture, _target);
    }
  };
}
// #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
// implementation and does not fire microtasks in between event propagation, so
// safe to exclude.
var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);
function add(name, handler, capture, passive) {
  // async edge case #6566: inner click event triggers patch, event handler
  // attached to outer element during patch, and triggered again. This
  // happens because browsers fire microtask ticks between event propagation.
  // the solution is simple: we save the timestamp when a handler is attached,
  // and the handler would only fire if the event passed to it was fired
  // AFTER it was attached.
  if (useMicrotaskFix) {
    var attachedTimestamp_1 = currentFlushTimestamp;
    var original_1 = handler;
    //@ts-expect-error
    handler = original_1._wrapper = function (e) {
      if (
      // no bubbling, should always fire.
      // this is just a safety net in case event.timeStamp is unreliable in
      // certain weird environments...
      e.target === e.currentTarget ||
      // event is fired after handler attachment
      e.timeStamp >= attachedTimestamp_1 ||
      // bail for environments that have buggy event.timeStamp implementations
      // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
      // #9681 QtWebEngine event.timeStamp is negative value
      e.timeStamp <= 0 ||
      // #9448 bail if event is fired in another document in a multi-page
      // electron/nw.js app, since event.timeStamp will be using a different
      // starting reference
      e.target.ownerDocument !== document) {
        return original_1.apply(this, arguments);
      }
    };
  }
  target.addEventListener(name, handler, supportsPassive ? {
    capture: capture,
    passive: passive
  } : capture);
}
function remove(name, handler, capture, _target) {
  (_target || target).removeEventListener(name,
  //@ts-expect-error
  handler._wrapper || handler, capture);
}
function updateDOMListeners(oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return;
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  // vnode is empty when removing all listeners,
  // and use old vnode dom element
  target = vnode.elm || oldVnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add, remove, createOnceHandler, vnode.context);
  target = undefined;
}
var events = {
  create: updateDOMListeners,
  update: updateDOMListeners,
  // @ts-expect-error emptyNode has actually data
  destroy: function (vnode) {
    return updateDOMListeners(vnode, emptyNode);
  }
};
var svgContainer;
function updateDOMProps(oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return;
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__) || isTrue(props._v_attr_proxy)) {
    props = vnode.data.domProps = extend({}, props);
  }
  for (key in oldProps) {
    if (!(key in props)) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) vnode.children.length = 0;
      if (cur === oldProps[key]) continue;
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }
    if (key === 'value' && elm.tagName !== 'PROGRESS') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      // IE doesn't support innerHTML for SVG elements
      svgContainer = svgContainer || document.createElement('div');
      svgContainer.innerHTML = "<svg>".concat(cur, "</svg>");
      var svg = svgContainer.firstChild;
      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }
      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if (
    // skip the update if old and new VDOM state is the same.
    // `value` is handled separately because the DOM value may be temporarily
    // out of sync with VDOM state due to focus, composition and modifiers.
    // This  #4521 by skipping the unnecessary `checked` update.
    cur !== oldProps[key]) {
      // some property updates can throw
      // e.g. `value` on <progress> w/ non-finite value
      try {
        elm[key] = cur;
      } catch (e) {}
    }
  }
}
function shouldUpdateValue(elm, checkVal) {
  return (
    //@ts-expect-error
    !elm.composing && (elm.tagName === 'OPTION' || isNotInFocusAndDirty(elm, checkVal) || isDirtyWithModifiers(elm, checkVal))
  );
}
function isNotInFocusAndDirty(elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try {
    notInFocus = document.activeElement !== elm;
  } catch (e) {}
  return notInFocus && elm.value !== checkVal;
}
function isDirtyWithModifiers(elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal);
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim();
    }
  }
  return value !== newVal;
}
var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};
var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res;
});
// merge static and dynamic style data on the same vnode
function normalizeStyleData(data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle ? extend(data.staticStyle, style) : style;
}
// normalize possible array / string values into Object
function normalizeStyleBinding(bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle);
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle);
  }
  return bindingStyle;
}
/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle(vnode, checkChild) {
  var res = {};
  var styleData;
  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode && childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }
  if (styleData = normalizeStyleData(vnode.data)) {
    extend(res, styleData);
  }
  var parentNode = vnode;
  // @ts-expect-error parentNode.parent not VNodeWithData
  while (parentNode = parentNode.parent) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res;
}
var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};
var vendorNames = ['Webkit', 'Moz', 'ms'];
var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && prop in emptyStyle) {
    return prop;
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name_1 = vendorNames[i] + capName;
    if (name_1 in emptyStyle) {
      return name_1;
    }
  }
});
function updateStyle(oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (isUndef(data.staticStyle) && isUndef(data.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
    return;
  }
  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};
  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;
  var style = normalizeStyleBinding(vnode.data.style) || {};
  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__) ? extend({}, style) : style;
  var newStyle = getStyle(vnode, true);
  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    // ie9 setting to null has no effect, must use empty string
    setProp(el, name, cur == null ? '' : cur);
  }
}
var style = {
  create: updateStyle,
  update: updateStyle
};
var whitespaceRE = /\s+/;
/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) {
        return el.classList.add(c);
      });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " ".concat(el.getAttribute('class') || '', " ");
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}
/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) {
        return el.classList.remove(c);
      });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " ".concat(el.getAttribute('class') || '', " ");
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}
function resolveTransition(def) {
  if (!def) {
    return;
  }
  /* istanbul ignore else */
  if (typeof def === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res;
  } else if (typeof def === 'string') {
    return autoCssTransition(def);
  }
}
var autoCssTransition = cached(function (name) {
  return {
    enterClass: "".concat(name, "-enter"),
    enterToClass: "".concat(name, "-enter-to"),
    enterActiveClass: "".concat(name, "-enter-active"),
    leaveClass: "".concat(name, "-leave"),
    leaveToClass: "".concat(name, "-leave-to"),
    leaveActiveClass: "".concat(name, "-leave-active")
  };
});
var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';
// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}
// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout : /* istanbul ignore next */function ( /* istanbul ignore next */fn) {
  return fn();
};
function nextFrame(fn) {
  raf(function () {
    // @ts-expect-error
    raf(fn);
  });
}
function addTransitionClass(el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}
function removeTransitionClass(el, cls) {
  if (el._transitionClasses) {
    remove$2(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}
function whenTransitionEnds(el, expectedType, cb) {
  var _a = getTransitionInfo(el, expectedType),
    type = _a.type,
    timeout = _a.timeout,
    propCount = _a.propCount;
  if (!type) return cb();
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}
var transformRE = /\b(transform|all)(,|$)/;
function getTransitionInfo(el, expectedType) {
  var styles = window.getComputedStyle(el);
  // JSDOM may return undefined for transition properties
  var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
  var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
  var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);
  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  };
}
function getTimeout(delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i]);
  }));
}
// Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
// in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
// as a floor function) causing unexpected behaviors
function toMs(s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000;
}
function enter(vnode, toggleDisplay) {
  var el = vnode.elm;
  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }
  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return;
  }
  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return;
  }
  var css = data.css,
    type = data.type,
    enterClass = data.enterClass,
    enterToClass = data.enterToClass,
    enterActiveClass = data.enterActiveClass,
    appearClass = data.appearClass,
    appearToClass = data.appearToClass,
    appearActiveClass = data.appearActiveClass,
    beforeEnter = data.beforeEnter,
    enter = data.enter,
    afterEnter = data.afterEnter,
    enterCancelled = data.enterCancelled,
    beforeAppear = data.beforeAppear,
    appear = data.appear,
    afterAppear = data.afterAppear,
    appearCancelled = data.appearCancelled,
    duration = data.duration;
  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context;
    transitionNode = transitionNode.parent;
  }
  var isAppear = !context._isMounted || !vnode.isRootInsert;
  if (isAppear && !appear && appear !== '') {
    return;
  }
  var startClass = isAppear && appearClass ? appearClass : enterClass;
  var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
  var toClass = isAppear && appearToClass ? appearToClass : enterToClass;
  var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
  var enterHook = isAppear ? isFunction(appear) ? appear : enter : enter;
  var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
  var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;
  var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);
  if ("production" !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }
  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);
  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    // @ts-expect-error
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });
  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }
  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      // @ts-expect-error
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }
  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }
  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}
function leave(vnode, rm) {
  var el = vnode.elm;
  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }
  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm();
  }
  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return;
  }
  var css = data.css,
    type = data.type,
    leaveClass = data.leaveClass,
    leaveToClass = data.leaveToClass,
    leaveActiveClass = data.leaveActiveClass,
    beforeLeave = data.beforeLeave,
    leave = data.leave,
    afterLeave = data.afterLeave,
    leaveCancelled = data.leaveCancelled,
    delayLeave = data.delayLeave,
    duration = data.duration;
  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);
  var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);
  if ("production" !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }
  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    // @ts-expect-error
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });
  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }
  function performLeave() {
    // the delayed leave may have already been cancelled
    // @ts-expect-error
    if (cb.cancelled) {
      return;
    }
    // record leaving element
    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        // @ts-expect-error
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}
// only used in dev mode
function checkDuration(val, name, vnode) {
  if (typeof val !== 'number') {
    warn("<transition> explicit ".concat(name, " duration is not a valid number - ") + "got ".concat(JSON.stringify(val), "."), vnode.context);
  } else if (isNaN(val)) {
    warn("<transition> explicit ".concat(name, " duration is NaN - ") + 'the duration expression might be incorrect.', vnode.context);
  }
}
function isValidDuration(val) {
  return typeof val === 'number' && !isNaN(val);
}
/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength(fn) {
  if (isUndef(fn)) {
    return false;
  }
  // @ts-expect-error
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
  } else {
    // @ts-expect-error
    return (fn._length || fn.length) > 1;
  }
}
function _enter(_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}
var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      // @ts-expect-error
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};
var platformModules = [attrs, klass, events, domProps, style, transition];

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);
var patch = createPatchFunction({
  nodeOps: nodeOps,
  modules: modules
});

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */
/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    // @ts-expect-error
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}
var directive = {
  inserted: function (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions_1 = el._vOptions;
      var curOptions_1 = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions_1.some(function (o, i) {
        return !looseEqual(o, prevOptions_1[i]);
      })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple ? binding.value.some(function (v) {
          return hasNoMatchingOption(v, curOptions_1);
        }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions_1);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};
function setSelected(el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}
function actuallySetSelected(el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    "production" !== 'production' && warn("<select multiple v-model=\"".concat(binding.expression, "\"> ") + "expects an Array value for its binding, but got ".concat(Object.prototype.toString.call(value).slice(8, -1)), vm);
    return;
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return;
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}
function hasNoMatchingOption(value, options) {
  return options.every(function (o) {
    return !looseEqual(o, value);
  });
}
function getValue(option) {
  return '_value' in option ? option._value : option.value;
}
function onCompositionStart(e) {
  e.target.composing = true;
}
function onCompositionEnd(e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) return;
  e.target.composing = false;
  trigger(e.target, 'input');
}
function trigger(el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

// recursively search for possible transition defined inside the component root
function locateNode(vnode) {
  // @ts-expect-error
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
}
var show = {
  bind: function (el, _a, vnode) {
    var value = _a.value;
    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay = el.style.display === 'none' ? '' : el.style.display;
    if (value && transition) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },
  update: function (el, _a, vnode) {
    var value = _a.value,
      oldValue = _a.oldValue;
    /* istanbul ignore if */
    if (!value === !oldValue) return;
    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    if (transition) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },
  unbind: function (el, binding, vnode, oldVnode, isDestroy) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};
var platformDirectives = {
  model: directive,
  show: show
};

// Provides transition support for a single element/component.
var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};
// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild(vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children));
  } else {
    return vnode;
  }
}
function extractTransitionData(comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key in listeners) {
    data[camelize(key)] = listeners[key];
  }
  return data;
}
function placeholder(h, rawChild) {
  // @ts-expect-error
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    });
  }
}
function hasParentTransition(vnode) {
  while (vnode = vnode.parent) {
    if (vnode.data.transition) {
      return true;
    }
  }
}
function isSameChild(child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag;
}
var isNotTextNode = function (c) {
  return c.tag || isAsyncPlaceholder(c);
};
var isVShowDirective = function (d) {
  return d.name === 'show';
};
var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,
  render: function (h) {
    var _this = this;
    var children = this.$slots.default;
    if (!children) {
      return;
    }
    // filter out text nodes (possible whitespaces)
    children = children.filter(isNotTextNode);
    /* istanbul ignore if */
    if (!children.length) {
      return;
    }
    // warn multiple elements
    if ("production" !== 'production' && children.length > 1) {
      warn('<transition> can only be used on a single element. Use ' + '<transition-group> for lists.', this.$parent);
    }
    var mode = this.mode;
    // warn invalid mode
    if ("production" !== 'production' && mode && mode !== 'in-out' && mode !== 'out-in') {
      warn('invalid <transition> mode: ' + mode, this.$parent);
    }
    var rawChild = children[0];
    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild;
    }
    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild;
    }
    if (this._leaving) {
      return placeholder(h, rawChild);
    }
    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-".concat(this._uid, "-");
    child.key = child.key == null ? child.isComment ? id + 'comment' : id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;
    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);
    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }
    if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild) &&
    // #6687 component root is a comment node
    !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          _this._leaving = false;
          _this.$forceUpdate();
        });
        return placeholder(h, rawChild);
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild;
        }
        var delayedLeave_1;
        var performLeave = function () {
          delayedLeave_1();
        };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
          delayedLeave_1 = leave;
        });
      }
    }
    return rawChild;
  }
};

// Provides transition support for list items.
var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);
delete props.mode;
var TransitionGroup = {
  props: props,
  beforeMount: function () {
    var _this = this;
    var update = this._update;
    this._update = function (vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(_this);
      // force removing pass
      _this.__patch__(_this._vnode, _this.kept, false,
      // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
      );
      _this._vnode = _this.kept;
      restoreActiveInstance();
      update.call(_this, vnode, hydrating);
    };
  },
  render: function (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);
    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c;
          (c.data || (c.data = {})).transition = transitionData;
        } else if ("production" !== 'production') {
          var opts = c.componentOptions;
          var name_1 = opts ? getComponentName(opts.Ctor.options) || opts.tag || '' : c.tag;
          warn("<transition-group> children must be keyed: <".concat(name_1, ">"));
        }
      }
    }
    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i = 0; i < prevChildren.length; i++) {
        var c = prevChildren[i];
        c.data.transition = transitionData;
        // @ts-expect-error .getBoundingClientRect is not typed in Node
        c.data.pos = c.elm.getBoundingClientRect();
        if (map[c.key]) {
          kept.push(c);
        } else {
          removed.push(c);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }
    return h(tag, null, children);
  },
  updated: function () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || (this.name || 'v') + '-move';
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return;
    }
    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);
    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;
    children.forEach(function (c) {
      if (c.data.moved) {
        var el_1 = c.elm;
        var s = el_1.style;
        addTransitionClass(el_1, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el_1.addEventListener(transitionEndEvent, el_1._moveCb = function cb(e) {
          if (e && e.target !== el_1) {
            return;
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el_1.removeEventListener(transitionEndEvent, cb);
            el_1._moveCb = null;
            removeTransitionClass(el_1, moveClass);
          }
        });
      }
    });
  },
  methods: {
    hasMove: function (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false;
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove;
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) {
          removeClass(clone, cls);
        });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return this._hasMove = info.hasTransform;
    }
  }
};
function callPendingCbs(c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}
function recordPosition(c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}
function applyTranslation(c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(".concat(dx, "px,").concat(dy, "px)");
    s.transitionDuration = '0s';
  }
}
var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

// install platform specific utils
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;
// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);
// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;
// public mount method
Vue.prototype.$mount = function (el, hydrating) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating);
};
// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if ("production" !== 'production' && "production" !== 'test') {
        // @ts-expect-error
        console[console.info ? 'info' : 'log']('Download the Vue Devtools extension for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
      }
    }
    if ("production" !== 'production' && "production" !== 'test' && config.productionTip !== false && typeof console !== 'undefined') {
      // @ts-expect-error
      console[console.info ? 'info' : 'log']("You are running Vue in development mode.\n" + "Make sure to turn on production mode when deploying for production.\n" + "See more tips at https://vuejs.org/guide/deployment.html");
    }
  }, 0);
}
},{}],"Ql7V":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = exports.default = {
  props: {
    width: Number,
    height: Number,
    image: String,
    assetTop: Object,
    assetLeft: Object,
    assetRight: Object
  },
  mounted: function mounted() {
    this.$emit("input", this.$refs.svg);
  },
  updated: function updated() {
    this.$emit("input", this.$refs.svg);
  },
  computed: {
    edgeHeight: function edgeHeight() {
      return (this.height || this.width) / this.width;
    }
  }
};
        var $a83757 = exports.default || module.exports;
      
      if (typeof $a83757 === 'function') {
        $a83757 = $a83757.options;
      }
    
        /* template */
        Object.assign($a83757, (function () {
          var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('svg',{ref:"svg",attrs:{"xmlns:rdf":"http://www.w3.org/1999/02/22-rdf-syntax-ns#","xmlns":"http://www.w3.org/2000/svg","width":_vm.width,"height":_vm.width / 2 + _vm.height / 2,"version":"1.1","xmlns:xlink":"http://www.w3.org/1999/xlink"}},[_c('defs',[_c('g',{attrs:{"id":"flat","transform":("matrix(1,-.5,1,.5,0," + (_vm.width / 4) + ")")}},[_c('use',{attrs:{"xlink:href":"#assetTop"}})]),_vm._v(" "),_c('g',{attrs:{"id":"side-left","transform":("matrix(1,0.5,0," + _vm.edgeHeight + ",0," + (_vm.width / 4) + ")")}},[_c('use',{attrs:{"xlink:href":"#assetLeft"}})]),_vm._v(" "),_c('g',{attrs:{"id":"side-right","transform":("matrix(1,-0.5,0," + _vm.edgeHeight + "," + (_vm.width / 2) + "," + (_vm.width / 2) + ")")}},[_c('use',{attrs:{"xlink:href":"#assetRight"}})]),_vm._v(" "),(_vm.assetTop.image)?_c('image',{key:_vm.assetTop.image + 1,attrs:{"id":"assetTop","href":_vm.assetTop.image,"x":"0","y":"0","height":_vm.width/2,"width":_vm.width/2}}):_c('rect',{key:_vm.assetTop.color + 2,attrs:{"id":"assetTop","x":"0","y":"0","fill":_vm.assetTop.color,"height":_vm.width/2,"width":_vm.width/2}}),_vm._v(" "),(_vm.assetLeft.image && _vm.height)?_c('image',{key:_vm.assetLeft.image + 3,attrs:{"id":"assetLeft","href":_vm.assetLeft.image,"x":"0","y":"0","height":_vm.width/2,"width":_vm.width/2}}):_vm._e(),_vm._v(" "),(!_vm.assetLeft.image && _vm.height)?_c('rect',{key:_vm.assetLeft.color + 4,attrs:{"id":"assetLeft","x":"0","y":"0","fill":_vm.assetLeft.color,"height":_vm.width/2,"width":_vm.width/2}}):_vm._e(),_vm._v(" "),(_vm.assetRight.image && _vm.height)?_c('image',{key:_vm.assetRight.image + 5,attrs:{"id":"assetRight","href":_vm.assetRight.image,"x":"0","y":"0","height":_vm.width/2,"width":_vm.width/2}}):_vm._e(),_vm._v(" "),(!_vm.assetRight.image && _vm.height)?_c('rect',{key:_vm.assetRight.color + 6,attrs:{"id":"assetRight","x":"0","y":"0","fill":_vm.assetRight.color,"height":_vm.width/2,"width":_vm.width/2}}):_vm._e()]),_vm._v(" "),_c('g',[_c('use',{attrs:{"x":"0","y":"0","xlink:href":"#flat"}}),_vm._v(" "),_c('use',{attrs:{"x":"0","y":"0","xlink:href":"#side-left"}}),_vm._v(" "),_c('use',{attrs:{"x":"0","y":"0","xlink:href":"#side-right"}})])])])}
var staticRenderFns = []

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{}],"iIGc":[function(require,module,exports) {
var define;
var global = arguments[3];
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : (global = global || self, factory(global.throttleDebounce = {}));
})(this, function (exports) {
  'use strict';

  /* eslint-disable no-undefined,no-param-reassign,no-shadow */

  /**
   * Throttle execution of a function. Especially useful for rate limiting
   * execution of handlers on events like resize and scroll.
   *
   * @param  {number}    delay -          A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
   * @param  {boolean}   [noTrailing] -   Optional, defaults to false. If noTrailing is true, callback will only execute every `delay` milliseconds while the
   *                                    throttled-function is being called. If noTrailing is false or unspecified, callback will be executed one final time
   *                                    after the last throttled-function call. (After the throttled-function has not been called for `delay` milliseconds,
   *                                    the internal counter is reset).
   * @param  {Function}  callback -       A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
   *                                    to `callback` when the throttled-function is executed.
   * @param  {boolean}   [debounceMode] - If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms. If `debounceMode` is false (at end),
   *                                    schedule `callback` to execute after `delay` ms.
   *
   * @returns {Function}  A new, throttled, function.
   */
  function throttle(delay, noTrailing, callback, debounceMode) {
    /*
     * After wrapper has stopped being called, this timeout ensures that
     * `callback` is executed at the proper times in `throttle` and `end`
     * debounce modes.
     */
    var timeoutID;
    var cancelled = false; // Keep track of the last time `callback` was executed.

    var lastExec = 0; // Function to clear existing timeout

    function clearExistingTimeout() {
      if (timeoutID) {
        clearTimeout(timeoutID);
      }
    } // Function to cancel next exec

    function cancel() {
      clearExistingTimeout();
      cancelled = true;
    } // `noTrailing` defaults to falsy.

    if (typeof noTrailing !== 'boolean') {
      debounceMode = callback;
      callback = noTrailing;
      noTrailing = undefined;
    }
    /*
     * The `wrapper` function encapsulates all of the throttling / debouncing
     * functionality and when executed will limit the rate at which `callback`
     * is executed.
     */

    function wrapper() {
      for (var _len = arguments.length, arguments_ = new Array(_len), _key = 0; _key < _len; _key++) {
        arguments_[_key] = arguments[_key];
      }
      var self = this;
      var elapsed = Date.now() - lastExec;
      if (cancelled) {
        return;
      } // Execute `callback` and update the `lastExec` timestamp.

      function exec() {
        lastExec = Date.now();
        callback.apply(self, arguments_);
      }
      /*
       * If `debounceMode` is true (at begin) this is used to clear the flag
       * to allow future `callback` executions.
       */

      function clear() {
        timeoutID = undefined;
      }
      if (debounceMode && !timeoutID) {
        /*
         * Since `wrapper` is being called for the first time and
         * `debounceMode` is true (at begin), execute `callback`.
         */
        exec();
      }
      clearExistingTimeout();
      if (debounceMode === undefined && elapsed > delay) {
        /*
         * In throttle mode, if `delay` time has been exceeded, execute
         * `callback`.
         */
        exec();
      } else if (noTrailing !== true) {
        /*
         * In trailing throttle mode, since `delay` time has not been
         * exceeded, schedule `callback` to execute `delay` ms after most
         * recent execution.
         *
         * If `debounceMode` is true (at begin), schedule `clear` to execute
         * after `delay` ms.
         *
         * If `debounceMode` is false (at end), schedule `callback` to
         * execute after `delay` ms.
         */
        timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
      }
    }
    wrapper.cancel = cancel; // Return the wrapper function.

    return wrapper;
  }

  /* eslint-disable no-undefined */
  /**
   * Debounce execution of a function. Debouncing, unlike throttling,
   * guarantees that a function is only executed a single time, either at the
   * very beginning of a series of calls, or at the very end.
   *
   * @param  {number}   delay -         A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
   * @param  {boolean}  [atBegin] -     Optional, defaults to false. If atBegin is false or unspecified, callback will only be executed `delay` milliseconds
   *                                  after the last debounced-function call. If atBegin is true, callback will be executed only at the first debounced-function call.
   *                                  (After the throttled-function has not been called for `delay` milliseconds, the internal counter is reset).
   * @param  {Function} callback -      A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
   *                                  to `callback` when the debounced-function is executed.
   *
   * @returns {Function} A new, debounced function.
   */

  function debounce(delay, atBegin, callback) {
    return callback === undefined ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false);
  }
  exports.debounce = debounce;
  exports.throttle = throttle;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});
},{}],"oOm1":[function(require,module,exports) {
/**
 * @name getCanvas
 * @param {number} w - width
 * @param {number} h - height
 */
function getCanvas(w, h) {
    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;

    return canvas;
}

/**
 * @name getPixels
 * @param {object} canvas
 * @param {object} context
 * @param {object} imageData
 */
function getPixels(canvas, context, imageData) {
    context.putImageData(imageData, 0, 0);
    return context.getImageData(0, 0, canvas.width, canvas.height);
}

/**
 * @name convertToDataURL
 * @param {object} canvas
 * @param {object} context
 */
function convertToDataURL(canvas, context, imageData) {
    context.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
}

module.exports = {
    getCanvas: getCanvas,
    getPixels: getPixels,
    convertToDataURL: convertToDataURL
};

},{}],"ZqJy":[function(require,module,exports) {
var utils = require('./utils');

/**
 * @name transform
 * @param {object} imageData
 * Iterate over the array applying the brightness transformation
 */
function transform(imageData, adjustment) {
    var data = imageData.data;

    for (var i = 0; i < data.length; i += 4) {
        data[i] += adjustment;
        data[i+1] += adjustment;
        data[i+2] += adjustment;
    }

    return imageData;
}

/**
 * @name imageBrightness
 * @param {object} options
 * @param {string} options.data
 * @param {string} options.adjustment - adjustment value to apply
 * @param {bool} options.asDataURL
 */
module.exports = function imageBrightness(options) {
    var element;
    var data;
    var factor
    var canvas;
    var context;

    if (!options.data || !options.adjustment) {
        throw new Error('image-brightness:: invalid options provided');
    }

    canvas = utils.getCanvas(options.data.width, options.data.height);
    context = canvas.getContext('2d');

    options.data = utils.getPixels(canvas, context, options.data);

    result = transform(options.data, options.adjustment);

    if (options.asDataURL) {
        return utils.convertToDataURL(canvas, context, result);
    }

    return result;
}

},{"./utils":"oOm1"}],"pBGv":[function(require,module,exports) {

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
function defaultClearTimeout() {
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
})();
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
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
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
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
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
  while (len) {
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
process.listeners = function (name) {
  return [];
};
process.binding = function (name) {
  throw new Error('process.binding is not supported');
};
process.cwd = function () {
  return '/';
};
process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};
process.umask = function () {
  return 0;
};
},{}],"Zt7E":[function(require,module,exports) {
var define;
var global = arguments[3];
var process = require("process");
/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.8+1e68dce6
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && typeof require === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    var then$$1 = void 0;
    try {
      then$$1 = value.then;
    } catch (error) {
      reject(promise, error);
      return;
    }
    handleMaybeThenable(promise, value, then$$1);
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = true;

  if (hasCallback) {
    try {
      value = callback(detail);
    } catch (e) {
      succeeded = false;
      error = e;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (succeeded === false) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = void 0;
      var error = void 0;
      var didError = false;
      try {
        _then = entry.then;
      } catch (e) {
        didError = true;
        error = e;
      }

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
        var promise = new c(noop);
        if (didError) {
          reject(promise, error);
        } else {
          handleMaybeThenable(promise, entry, _then);
        }
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$1(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    if (isFunction(callback)) {
      return promise.then(function (value) {
        return constructor.resolve(callback()).then(function () {
          return value;
        });
      }, function (reason) {
        return constructor.resolve(callback()).then(function () {
          throw reason;
        });
      });
    }

    return promise.then(callback, callback);
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return;
    }
  }

  local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));





},{"process":"pBGv"}],"KHzD":[function(require,module,exports) {
// This file can be required in Browserify and Node.js for automatic polyfill
// To use it:  require('es6-promise/auto');
'use strict';
module.exports = require('./').polyfill();

},{"./":"Zt7E"}],"tyqG":[function(require,module,exports) {
module.exports = function (self) {
    self.addEventListener('message', function (e) {
        importScripts(e.data.transformationURL);

        var canvasData = e.data.canvasData;

        var length = e.data.length;
        var index = e.data.index;

        transform(canvasData.data, length, e.data.options);

        self.postMessage({
            result: canvasData,
            index: index
        });

        self.close();
    });
};

},{}],"llYA":[function(require,module,exports) {
require('es6-promise/auto');
var worker = require('./worker');

/**
* It returns a canvas with the given width and height
* @name getCanvas
* @param {Number} w - width
* @param {Number} h - height
* @returns {Object}
*/
function getCanvas(w, h) {
    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;

    return canvas;
}

/**
* Given a ImageData it returns the dataURL
* @name convertImageDataToCanvasURL
* @param {ImageData} imageData
* @returns {String}
*/
function convertImageDataToCanvasURL(imageData) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    ctx.putImageData(imageData, 0, 0);

    return canvas.toDataURL();
}

/**
* Transforms the body of a function into a string
* This is used to require the worker function and create a new Blob
* @method  extractBodyFunction
* @param   {Function} fn
* @returns {String}
*/
function extractBodyFunction(fn) {
    return fn.toString().trim().match(
        /^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/
    )[1];
}

/**
 * Creates a Worker from the contents in ./worker.js
 * @method  createWorker
 * @returns {Worker}
 */
function createWorkerURL() {
    var functionBody = extractBodyFunction(worker);
    var blob = new Blob([functionBody], { type: 'text/javascript' });

    return window.URL.createObjectURL(blob);
}

/**
 * Creats transformation ObjectURL so that this function
 * can be imported in the worker
 * @method  createTransformation
 * @param   {Function} transform
 * @returns {String}
 */
function createTransformation(transform) {
    var blob = new Blob(['' + transform], { type: 'text/javascript' });

    return window.URL.createObjectURL(blob);
}

/**
* Given a worker file with the transformation the work is split
* between the configured number of workers and the transformation is applied
* returning a Promise
* @name apply
* @param {Function} worker
* @param {Number} options
* @returns {Promise}
*/
function apply(data, transform, options, nWorkers) {
    var transformationURL = createTransformation(transform);
    var workerURL = createWorkerURL();
    var canvas = getCanvas(data.width, data.height);
    var context = canvas.getContext('2d');
    var finished = 0;
    var blockSize;

    // Drawing the source image into the target canvas
    context.putImageData(data, 0, 0);

    // Minimum number of workers = 1
    if (!nWorkers) {
        nWorkers = 1;
    }

    // Height of the picture chunck for every worker
    blockSize = Math.floor(canvas.height / nWorkers);

    return new Promise(function (resolve) {
        var w;
        var height;
        var canvasData;

        for (var index = 0; index < nWorkers; index++) {
            w = new Worker(workerURL);

            w.addEventListener('message', function (e) {
                // Data is retrieved using a memory clone operation
                var resultCanvasData = e.data.result;

                // Copying back canvas data to canvas
                // If the first webworker  (index 0) returns data, apply it at pixel (0, 0) onwards
                // If the second webworker  (index 1) returns data, apply it at pixel (0, canvas.height/4) onwards, and so on
                context.putImageData(resultCanvasData, 0, blockSize * e.data.index);

                finished++;

                if (finished === nWorkers) {
                    resolve(context.getImageData(0, 0, canvas.width, canvas.height));
                }
            });

            // In the last worker we have to make sure we process whatever is missing
            height = blockSize;
            if ((index + 1) === nWorkers) {
                height = canvas.height - (blockSize * index);
            }

            // Getting the picture
            canvasData = context.getImageData(0, blockSize * index, canvas.width, height);

            // Sending canvas data to the worker using a copy memory operation
            w.postMessage({
                canvasData: canvasData,
                index: index,
                length: height * canvas.width * 4,
                options: options,
                transformationURL: transformationURL
            });
        }
    });
}

module.exports = {
    apply: apply,
    convertImageDataToCanvasURL: convertImageDataToCanvasURL,
    getCanvas: getCanvas
};

},{"es6-promise/auto":"KHzD","./worker":"tyqG"}],"KAEt":[function(require,module,exports) {
var define;
var global = arguments[3];
(function(a,b){if("function"==typeof define&&define.amd)define([],b);else if("undefined"!=typeof exports)b();else{b(),a.FileSaver={exports:{}}.exports}})(this,function(){"use strict";function b(a,b){return"undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(a,b,c){var d=new XMLHttpRequest;d.open("GET",a),d.responseType="blob",d.onload=function(){g(d.response,b,c)},d.onerror=function(){console.error("could not download file")},d.send()}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send()}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,a=f.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),g=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype&&!a?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href)},4E4),setTimeout(function(){e(j)},0))}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i)})}}:function(b,d,e,g){if(g=g||open("","_blank"),g&&(g.document.title=g.document.body.innerText="downloading..."),"string"==typeof b)return c(b,d,e);var h="application/octet-stream"===b.type,i=/constructor/i.test(f.HTMLElement)||f.safari,j=/CriOS\/[\d]+/.test(navigator.userAgent);if((j||h&&i||a)&&"undefined"!=typeof FileReader){var k=new FileReader;k.onloadend=function(){var a=k.result;a=j?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),g?g.location.href=a:location=a,g=null},k.readAsDataURL(b)}else{var l=f.URL||f.webkitURL,m=l.createObjectURL(b);g?g.location=m:location.href=m,g=null,setTimeout(function(){l.revokeObjectURL(m)},4E4)}});f.saveAs=g.saveAs=g,"undefined"!=typeof module&&(module.exports=g)});


},{}],"Ylh2":[function(require,module,exports) {
module.exports = function _atob(str) {
  return atob(str)
}

},{}],"wEGI":[function(require,module,exports) {
var define;
(function(root) {
  'use strict';

  function isBase64(v, opts) {
    if (v instanceof Boolean || typeof v === 'boolean') {
      return false
    }
    if (!(opts instanceof Object)) {
      opts = {}
    }
    if (opts.hasOwnProperty('allowBlank') && !opts.allowBlank && v === '') {
      return false
    }

    var regex = '(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}==|[A-Za-z0-9+\/]{3}=)?';

    if (opts.mime) {
      regex = '(data:\\w+\\/[a-zA-Z\\+\\-\\.]+;base64,)?' + regex
    }

    if (opts.paddingRequired === false) {
      regex = '(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}(==)?|[A-Za-z0-9+\\/]{3}=?)?'
    }

    return (new RegExp('^' + regex + '$', 'gi')).test(v);
  }

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = isBase64;
    }
    exports.isBase64 = isBase64;
  } else if (typeof define === 'function' && define.amd) {
    define([], function() {
      return isBase64;
    });
  } else {
    root.isBase64 = isBase64;
  }
})(this);

},{}],"zJ6x":[function(require,module,exports) {
/**
 * @module  string-to-arraybuffer
 */

'use strict'

var atob = require('atob-lite')
var isBase64 = require('is-base64')

module.exports = function stringToArrayBuffer (arg) {
	if (typeof arg !== 'string') throw Error('Argument should be a string')

	//valid data uri
	if (/^data\:/i.test(arg)) return decode(arg)

	//base64
	if (isBase64(arg)) arg = atob(arg)

	return str2ab(arg)
}

function str2ab (str) {
	var array = new Uint8Array(str.length);
	for(var i = 0; i < str.length; i++) {
		array[i] = str.charCodeAt(i);
	}
	return array.buffer
}

function decode(uri) {
	// strip newlines
	uri = uri.replace(/\r?\n/g, '');

	// split the URI up into the "metadata" and the "data" portions
	var firstComma = uri.indexOf(',');
	if (-1 === firstComma || firstComma <= 4) throw new TypeError('malformed data-URI');

	// remove the "data:" scheme and parse the metadata
	var meta = uri.substring(5, firstComma).split(';');

	var base64 = false;
	var charset = 'US-ASCII';
	for (var i = 0; i < meta.length; i++) {
		if ('base64' == meta[i]) {
			base64 = true;
		} else if (0 == meta[i].indexOf('charset=')) {
			charset = meta[i].substring(8);
		}
	}

	// get the encoded data portion and decode URI-encoded chars
	var data = unescape(uri.substring(firstComma + 1));

	if (base64) data = atob(data)

	var abuf = str2ab(data)

	abuf.type = meta[0] || 'text/plain'
	abuf.charset = charset

	return abuf
}

},{"atob-lite":"Ylh2","is-base64":"wEGI"}],"iMMC":[function(require,module,exports) {
module.exports = function (dtype) {
  switch (dtype) {
    case 'int8':
      return Int8Array;
    case 'int16':
      return Int16Array;
    case 'int32':
      return Int32Array;
    case 'uint8':
      return Uint8Array;
    case 'uint16':
      return Uint16Array;
    case 'uint32':
      return Uint32Array;
    case 'float32':
      return Float32Array;
    case 'float64':
      return Float64Array;
    case 'array':
      return Array;
    case 'uint8_clamped':
      return Uint8ClampedArray;
  }
};
},{}],"kRNp":[function(require,module,exports) {
/*eslint new-cap:0*/
var dtype = require('dtype')

module.exports = flattenVertexData

function flattenVertexData (data, output, offset) {
  if (!data) throw new TypeError('must specify data as first parameter')
  offset = +(offset || 0) | 0

  if (Array.isArray(data) && (data[0] && typeof data[0][0] === 'number')) {
    var dim = data[0].length
    var length = data.length * dim
    var i, j, k, l

    // no output specified, create a new typed array
    if (!output || typeof output === 'string') {
      output = new (dtype(output || 'float32'))(length + offset)
    }

    var dstLength = output.length - offset
    if (length !== dstLength) {
      throw new Error('source length ' + length + ' (' + dim + 'x' + data.length + ')' +
        ' does not match destination length ' + dstLength)
    }

    for (i = 0, k = offset; i < data.length; i++) {
      for (j = 0; j < dim; j++) {
        output[k++] = data[i][j] === null ? NaN : data[i][j]
      }
    }
  } else {
    if (!output || typeof output === 'string') {
      // no output, create a new one
      var Ctor = dtype(output || 'float32')

      // handle arrays separately due to possible nulls
      if (Array.isArray(data) || output === 'array') {
        output = new Ctor(data.length + offset)
        for (i = 0, k = offset, l = output.length; k < l; k++, i++) {
          output[k] = data[i] === null ? NaN : data[i]
        }
      } else {
        if (offset === 0) {
          output = new Ctor(data)
        } else {
          output = new Ctor(data.length + offset)

          output.set(data, offset)
        }
      }
    } else {
      // store output in existing array
      output.set(data, offset)
    }
  }

  return output
}

},{"dtype":"iMMC"}],"aFuf":[function(require,module,exports) {
/**
 * @module  to-array-buffer
 */

'use strict'

var str2ab = require('string-to-arraybuffer')
var flat = require('flatten-vertex-data')
// var isBlob = require('is-blob')


module.exports = function toArrayBuffer (arg) {
	//zero-length or undefined-like
	if (!arg) return null

	//array buffer
	if (arg instanceof ArrayBuffer) return arg

	//try to decode data-uri
	if (typeof arg === 'string') {
		return str2ab(arg)
	}

	// File & Blob
	// if (isBlob(src) || (src instanceof global.File)) {
		// FIXME: we cannot use it here bc FileReader is async
	// }

	//array buffer view: TypedArray, DataView, Buffer etc
	if (ArrayBuffer.isView(arg)) {
		// if byteOffset is not 0, return sub-reference (slice is the only way)
		if (arg.byteOffset) {
			return arg.buffer.slice(arg.byteOffset, arg.byteOffset + arg.byteLength)
		}
		return arg.buffer
	}

	//buffer/data nested: NDArray, ImageData etc.
	//FIXME: NDArrays with custom data type may be invalid for this procedure
	if (arg.buffer || arg.data || arg._data) {
		var result = toArrayBuffer(arg.buffer || arg.data || arg._data)
		return result
	}

	// detect if flat
	if (Array.isArray(arg)) {
		for (var i = 0; i < arg.length; i++) {
			if (arg[i].length != null) {
				arg = flat(arg)
				break
			}
		}
	}

	//array-like or unknown
	//consider Uint8Array knows how to treat the input
	var result = new Uint8Array(arg)

	if (!result.length) return null
	return result.buffer
}

},{"string-to-arraybuffer":"zJ6x","flatten-vertex-data":"kRNp"}],"s8zI":[function(require,module,exports) {
// A simple mime database.
var types;
module.exports = function setup(defaultMime) {
  return function getMime(path) {
    path = path.toLowerCase().trim();
    var index = path.lastIndexOf("/");
    if (index >= 0) {
      path = path.substr(index + 1);
    }
    index = path.lastIndexOf(".");
    if (index >= 0) {
      path = path.substr(index + 1);
    }
    return types[path] || defaultMime;
  };
};

// Borrowed and passed around from who knows where, last grabbed from connect.
types = {
  "3gp": "video/3gpp",
  a: "application/octet-stream",
  ai: "application/postscript",
  aif: "audio/x-aiff",
  aiff: "audio/x-aiff",
  asc: "application/pgp-signature",
  asf: "video/x-ms-asf",
  asm: "text/x-asm",
  asx: "video/x-ms-asf",
  atom: "application/atom+xml",
  au: "audio/basic",
  avi: "video/x-msvideo",
  bat: "application/x-msdownload",
  bin: "application/octet-stream",
  bmp: "image/bmp",
  bz2: "application/x-bzip2",
  c: "text/x-csrc",
  cab: "application/vnd.ms-cab-compressed",
  can: "application/candor",
  cc: "text/x-c++src",
  chm: "application/vnd.ms-htmlhelp",
  "class": "application/octet-stream",
  com: "application/x-msdownload",
  conf: "text/plain",
  cpp: "text/x-c",
  crt: "application/x-x509-ca-cert",
  css: "text/css",
  csv: "text/csv",
  cxx: "text/x-c",
  deb: "application/x-debian-package",
  der: "application/x-x509-ca-cert",
  diff: "text/x-diff",
  djv: "image/vnd.djvu",
  djvu: "image/vnd.djvu",
  dll: "application/x-msdownload",
  dmg: "application/octet-stream",
  doc: "application/msword",
  dot: "application/msword",
  dtd: "application/xml-dtd",
  dvi: "application/x-dvi",
  ear: "application/java-archive",
  eml: "message/rfc822",
  eps: "application/postscript",
  exe: "application/x-msdownload",
  f: "text/x-fortran",
  f77: "text/x-fortran",
  f90: "text/x-fortran",
  flv: "video/x-flv",
  "for": "text/x-fortran",
  gem: "application/octet-stream",
  gemspec: "text/x-script.ruby",
  gif: "image/gif",
  gyp: "text/x-script.python",
  gypi: "text/x-script.python",
  gz: "application/x-gzip",
  h: "text/x-chdr",
  hh: "text/x-c++hdr",
  htm: "text/html",
  html: "text/html",
  ico: "image/vnd.microsoft.icon",
  ics: "text/calendar",
  ifb: "text/calendar",
  iso: "application/octet-stream",
  jar: "application/java-archive",
  java: "text/x-java-source",
  jnlp: "application/x-java-jnlp-file",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  js: "application/javascript",
  json: "application/json",
  less: "text/css",
  log: "text/plain",
  lua: "text/x-script.lua",
  luac: "application/x-bytecode.lua",
  makefile: "text/x-makefile",
  m3u: "audio/x-mpegurl",
  m4v: "video/mp4",
  man: "text/troff",
  manifest: "text/cache-manifest",
  markdown: "text/x-markdown",
  mathml: "application/mathml+xml",
  mbox: "application/mbox",
  mdoc: "text/troff",
  md: "text/x-markdown",
  me: "text/troff",
  mid: "audio/midi",
  midi: "audio/midi",
  mime: "message/rfc822",
  mml: "application/mathml+xml",
  mng: "video/x-mng",
  mov: "video/quicktime",
  mp3: "audio/mpeg",
  mp4: "video/mp4",
  mp4v: "video/mp4",
  mpeg: "video/mpeg",
  mpg: "video/mpeg",
  ms: "text/troff",
  msi: "application/x-msdownload",
  odp: "application/vnd.oasis.opendocument.presentation",
  ods: "application/vnd.oasis.opendocument.spreadsheet",
  odt: "application/vnd.oasis.opendocument.text",
  ogg: "application/ogg",
  p: "text/x-pascal",
  pas: "text/x-pascal",
  pbm: "image/x-portable-bitmap",
  pdf: "application/pdf",
  pem: "application/x-x509-ca-cert",
  pgm: "image/x-portable-graymap",
  pgp: "application/pgp-encrypted",
  pkg: "application/octet-stream",
  pl: "text/x-script.perl",
  pm: "text/x-script.perl-module",
  png: "image/png",
  pnm: "image/x-portable-anymap",
  ppm: "image/x-portable-pixmap",
  pps: "application/vnd.ms-powerpoint",
  ppt: "application/vnd.ms-powerpoint",
  ps: "application/postscript",
  psd: "image/vnd.adobe.photoshop",
  py: "text/x-script.python",
  qt: "video/quicktime",
  ra: "audio/x-pn-realaudio",
  rake: "text/x-script.ruby",
  ram: "audio/x-pn-realaudio",
  rar: "application/x-rar-compressed",
  rb: "text/x-script.ruby",
  rdf: "application/rdf+xml",
  roff: "text/troff",
  rpm: "application/x-redhat-package-manager",
  rss: "application/rss+xml",
  rtf: "application/rtf",
  ru: "text/x-script.ruby",
  s: "text/x-asm",
  sgm: "text/sgml",
  sgml: "text/sgml",
  sh: "application/x-sh",
  sig: "application/pgp-signature",
  snd: "audio/basic",
  so: "application/octet-stream",
  svg: "image/svg+xml",
  svgz: "image/svg+xml",
  swf: "application/x-shockwave-flash",
  t: "text/troff",
  tar: "application/x-tar",
  tbz: "application/x-bzip-compressed-tar",
  tci: "application/x-topcloud",
  tcl: "application/x-tcl",
  tex: "application/x-tex",
  texi: "application/x-texinfo",
  texinfo: "application/x-texinfo",
  text: "text/plain",
  tif: "image/tiff",
  tiff: "image/tiff",
  torrent: "application/x-bittorrent",
  tr: "text/troff",
  ttf: "application/x-font-ttf",
  txt: "text/plain",
  vcf: "text/x-vcard",
  vcs: "text/x-vcalendar",
  vrml: "model/vrml",
  war   : "application/java-archive",
  wav   : "audio/x-wav",
  webapp: "application/x-web-app-manifest+json",
  webm: "video/webm",
  wma: "audio/x-ms-wma",
  wmv: "video/x-ms-wmv",
  wmx: "video/x-ms-wmx",
  wrl: "model/vrml",
  wsdl: "application/wsdl+xml",
  xbm: "image/x-xbitmap",
  xhtml: "application/xhtml+xml",
  xls: "application/vnd.ms-excel",
  xml: "application/xml",
  xpm: "image/x-xpixmap",
  xsl: "application/xml",
  xslt: "application/xslt+xml",
  yaml: "text/yaml",
  yml: "text/yaml",
  zip: "application/zip"
};

},{}],"DRGS":[function(require,module,exports) {
/* globals Blob */
'use strict';

var toString = Object.prototype.toString;
module.exports = function (x) {
  return x instanceof Blob || toString.call(x) === '[object Blob]';
};
},{}],"GXfg":[function(require,module,exports) {
'use strict'

var ab = require('to-array-buffer')
var getMimeType = require('simple-mime')('application/octect-stream')
var isBlob = require('is-blob')

module.exports = function toBlob (data, filename) {
	//create blob, if not already
	if (!isBlob(data) && !(data instanceof File)) {
		data = ab(data)
		var mime = getMimeType(filename || '')
		data = new Blob([data], {type: mime})
	}

	return data
}

},{"to-array-buffer":"aFuf","simple-mime":"s8zI","is-blob":"DRGS"}],"lP0s":[function(require,module,exports) {
/**
 * Save file in browser
 *
 * @module save-file/browser
 */
'use strict'

var saveAs = require('file-saver').saveAs
var toBlob = require('./src/to-blob')

var planned = null

module.exports = save
module.exports.save = save
module.exports.saveSync = saveSync

function save (data, filename) {
	// swap data/filename
	if (typeof data === 'string') {
		// writing string to string - take the lengthier
		if (typeof filename !== 'string' || filename.length > data.length) {
			var x = filename
			filename = data
			data = x
		}
	}

	var blob = toBlob(data, filename)

	if (planned) {
		return planned.then(function () {
			planned = save(data, filename)
			return planned
		})
	}
	else {
		planned = new Promise(function (ok, nok) {

			saveAs(blob, filename)

			//prompt next dialog only when window got focus back
			window.addEventListener('focus', function resolve() {
				planned = null
				window.removeEventListener('focus', resolve)
				ok()
			})
		})

		return planned
	}
}

function saveSync (data, filename) {
	return saveAs(toBlob(data, filename), filename)
}

},{"file-saver":"KAEt","./src/to-blob":"GXfg"}],"rdKr":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getImageBinaryFromSvg = getImageBinaryFromSvg;
exports.getImageData = getImageData;
exports.runFilters = runFilters;
exports.svgToDownload = svgToDownload;
var _throttleDebounce = require("throttle-debounce");
var _imageBrightness = _interopRequireDefault(require("image-brightness"));
var imageFilter = _interopRequireWildcard(require("image-filter-core"));
var _saveFile = _interopRequireDefault(require("save-file"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function createCanvas() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    image = _ref.image;
  var canvas = document.createElement("canvas");
  if (image) {
    canvas.width = image.width;
    canvas.height = image.height;
  }
  var context = canvas.getContext("2d");
  return {
    canvas: canvas,
    context: context
  };
}
function getImageData(base64Url) {
  return new Promise(function (resolve, reject) {
    var image = document.createElement("img");
    image.src = base64Url;
    image.onload = function () {
      var _createCanvas = createCanvas({
          image: image
        }),
        canvas = _createCanvas.canvas,
        context = _createCanvas.context;
      context.drawImage(image, 0, 0);
      resolve(context.getImageData(0, 0, image.width, image.height));
    };
    image.onerror = function (e) {
      return reject(new Error("Could not load this image."));
    };
  });
}
var runFiltersThrottled = (0, _throttleDebounce.throttle)(50, function (data, filters, callback) {
  try {
    var newImageData = (0, _imageBrightness.default)({
      data: data,
      adjustment: Number(filters.brightness) + 0.01
    });
    callback(null, imageFilter.convertImageDataToCanvasURL(newImageData));
  } catch (error) {
    callback(error);
  }
});
function runFilters(imageData, filters) {
  return new Promise(function (resolve, reject) {
    runFiltersThrottled(imageData, filters, function (err, base64Url) {
      if (err) return reject(err);
      return resolve(base64Url);
    });
  });
}
function getImageBinaryFromSvg(svgString) {
  return new Promise(function (resolve, reject) {
    var svg = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8"
    });
    var url = URL.createObjectURL(svg);
    var image = document.createElement("img");
    image.onload = function () {
      var _createCanvas2 = createCanvas({
          image: image
        }),
        canvas = _createCanvas2.canvas,
        context = _createCanvas2.context;
      context.drawImage(image, 0, 0);
      URL.revokeObjectURL(url);
      canvas.toBlob(resolve, "image/png");
    };
    image.src = url;

    // the onerror handler isn't working here for some reason
    setTimeout(function () {
      if (image.complete) reject(new Error("Error exporting image. Sorry!"));
      image.src = "";
    }, 2000);
  });
}
function svgToDownload(svgString) {
  return getImageBinaryFromSvg(svgString).then(function (blob) {
    return (0, _saveFile.default)(blob, "image.png");
  });
}
},{"throttle-debounce":"iIGc","image-brightness":"ZqJy","image-filter-core":"llYA","save-file":"lP0s"}],"q518":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _image = require("../lib/image.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var materialError = function materialError(error) {
  console.log("oh no an error");
  console.error(error);
  M.toast({
    html: error.message
  });
};
var _default = exports.default = {
  props: {
    name: String,
    initialValues: Object
  },
  data: function data() {
    return {
      id: Math.round(Math.random() * 1e10),
      brightness: this.initialValues.brightness || 1,
      image: this.initialValues.image,
      originalImage: this.initialValues.image,
      isImage: !!this.initialValues.image,
      color: this.initialValues.color,
      dragging: false
    };
  },
  methods: {
    label: function label(name) {
      return "image-asset-picker-".concat(name);
    },
    onChange: function onChange() {
      this.$emit("input", {
        brightness: this.brightness,
        color: this.color,
        image: this.image
      });
    },
    dragOver: function dragOver(event) {},
    dragEnter: function dragEnter() {
      this.dragging = true;
    },
    dragLeave: function dragLeave() {
      this.dragging = false;
    },
    drop: function drop(event) {
      this.dragging = false;
      if (event.dataTransfer.files) return this.loadFile(event.dataTransfer.files[0]);
    },
    onFilePick: function onFilePick(event) {
      this.loadFile(this.$refs.filepicker.files[0]);
    },
    loadFile: function loadFile(file) {
      var _this = this;
      var reader = new FileReader();
      reader.onload = function (event) {
        (0, _image.getImageData)(event.target.result).then(function (imageData) {
          _this.originalImage = imageData;
          _this.brightness = 0;
          _this.isImage = true;
          _this.applyFilters();
        }).catch(materialError);
      };
      reader.onerror = materialError;
      reader.readAsDataURL(file);
    },
    applyFilters: function applyFilters() {
      var _this2 = this;
      if (!this.originalImage) return M.toast({
        html: "Click Load or drag a file onto the preview."
      });
      (0, _image.runFilters)(this.originalImage, {
        brightness: this.brightness
      }).then(function (base64Url) {
        _this2.image = base64Url;
        _this2.onChange();
      }).catch(materialError);
    },
    toggleImage: function toggleImage() {
      this.isImage = !this.isImage;
      if (this.isImage) {
        this.applyFilters();
      } else {
        this.image = undefined;
        this.onChange();
      }
    }
  }
};
        var $e5fe8f = exports.default || module.exports;
      
      if (typeof $e5fe8f === 'function') {
        $e5fe8f = $e5fe8f.options;
      }
    
        /* template */
        Object.assign($e5fe8f, (function () {
          var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card"},[_c('div',{staticClass:"card-image"},[_c('div',{ref:"dropTarget",staticClass:"image",class:{
        dragging: _vm.dragging
      },style:({
        'background-color': _vm.color,
        'background-image': ("url(" + _vm.image + ")"),
      }),on:{"dragover":function($event){$event.preventDefault();return _vm.dragOver.apply(null, arguments)},"dragenter":_vm.dragEnter,"dragleave":_vm.dragLeave,"drop":function($event){$event.preventDefault();return _vm.drop.apply(null, arguments)}}}),_vm._v(" "),_c('span',{staticClass:"card-title"},[_vm._v(_vm._s(_vm.name))])]),_vm._v(" "),_c('div',{staticClass:"card-content card-content-no-padding"},[_c('ul',{staticClass:"collection collection-no-padding"},[_c('li',{staticClass:"collection-item switch"},[_c('label',{staticClass:"justify-between"},[_vm._v("\n        Color\n        "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.isImage),expression:"isImage"}],attrs:{"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.isImage)?_vm._i(_vm.isImage,null)>-1:(_vm.isImage)},on:{"input":_vm.toggleImage,"change":function($event){var $$a=_vm.isImage,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.isImage=$$a.concat([$$v]))}else{$$i>-1&&(_vm.isImage=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.isImage=$$c}}}}),_vm._v(" "),_c('span',{staticClass:"lever"}),_vm._v("\n        Image\n      ")])]),_vm._v(" "),(_vm.isImage)?_c('li',{staticClass:"collection-item justify-between"},[_c('label',{attrs:{"for":_vm.label('file-picker')}},[_vm._v("File:")]),_vm._v(" "),_c('button',{staticClass:"waves-effect waves-light btn-small",on:{"click":function($event){return _vm.$refs.filepicker.click()}}},[_vm._v("Load")]),_vm._v(" "),_c('input',{ref:"filepicker",attrs:{"hidden":"","id":_vm.label('file-picker'),"type":"file"},on:{"input":_vm.onFilePick}})]):_vm._e(),_vm._v(" "),(_vm.isImage)?_c('li',{staticClass:"collection-item"},[_c('label',{attrs:{"for":_vm.label('brightness')}},[_vm._v("Brightness:")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.brightness),expression:"brightness"}],attrs:{"id":_vm.label('brightness'),"type":"range","min":"-255","max":"255"},domProps:{"value":(_vm.brightness)},on:{"input":_vm.applyFilters,"__r":function($event){_vm.brightness=$event.target.value}}})]):_vm._e(),_vm._v(" "),(!_vm.isImage)?_c('li',{staticClass:"collection-item justify-between"},[_c('label',{attrs:{"for":_vm.label('color-picker')}},[_vm._v("Color picker:")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.color),expression:"color"}],attrs:{"id":_vm.label('color-picker'),"type":"color"},domProps:{"value":(_vm.color)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.color=$event.target.value},_vm.onChange]}})]):_vm._e(),_vm._v(" "),(!_vm.isImage)?_c('li',{staticClass:"collection-item"},[_c('label',{attrs:{"for":_vm.label('color-hex')}},[_vm._v("Hex code:")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.color),expression:"color"}],attrs:{"id":_vm.label('color-hex'),"type":"text"},domProps:{"value":(_vm.color)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.color=$event.target.value},_vm.onChange]}})]):_vm._e()])])])}
var staticRenderFns = []

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-e5fe8f",
            functional: undefined
          };
        })());
      
},{"../lib/image.js":"rdKr"}],"tyLK":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = exports.default = {
  components: {},
  props: {
    value: Object
  },
  data: function data() {
    return Object.assign(this.value || {
      width: 256,
      height: 256,
      linkEdges: false,
      lockToCube: false
    });
  },
  methods: {
    save: function save() {
      this.$emit("input", this);
    }
  }
};
        var $5e9491 = exports.default || module.exports;
      
      if (typeof $5e9491 === 'function') {
        $5e9491 = $5e9491.options;
      }
    
        /* template */
        Object.assign($5e9491, (function () {
          var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sidebar"},[_c('div',{staticClass:"link form-item"},[_c('label',[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.linkEdges),expression:"linkEdges"}],staticClass:"filled-in",attrs:{"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.linkEdges)?_vm._i(_vm.linkEdges,null)>-1:(_vm.linkEdges)},on:{"change":[function($event){var $$a=_vm.linkEdges,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.linkEdges=$$a.concat([$$v]))}else{$$i>-1&&(_vm.linkEdges=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.linkEdges=$$c}},_vm.save]}}),_vm._v(" "),_c('span',{staticClass:"sr-only"},[_vm._v("Link edges")])]),_vm._v(" "),_c('label',[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.lockToCube),expression:"lockToCube"}],staticClass:"filled-in",attrs:{"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.lockToCube)?_vm._i(_vm.lockToCube,null)>-1:(_vm.lockToCube)},on:{"change":[function($event){var $$a=_vm.lockToCube,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.lockToCube=$$a.concat([$$v]))}else{$$i>-1&&(_vm.lockToCube=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.lockToCube=$$c}},_vm.save]}}),_vm._v(" "),_c('span',{staticClass:"sr-only"},[_vm._v("Lock to cube")])])]),_vm._v(" "),_c('div',{staticClass:"dimensions-width form-item"},[_c('label',{attrs:{"for":"width"}},[_vm._v("Size")]),_vm._v(" "),_c('div',{staticClass:"inline"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.width),expression:"width"}],attrs:{"type":"range","min":"8","max":"1024","step":"8"},domProps:{"value":(_vm.width)},on:{"__r":function($event){_vm.width=$event.target.value}}}),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.width),expression:"width"}],attrs:{"type":"text","id":"width","name":"width"},domProps:{"value":(_vm.width)},on:{"input":function($event){if($event.target.composing){ return; }_vm.width=$event.target.value}}})])]),_vm._v(" "),(!_vm.lockToCube)?_c('div',{staticClass:"dimensions-height form-item"},[_c('label',{attrs:{"for":"height"}},[_vm._v("Height")]),_vm._v(" "),_c('div',{staticClass:"inline"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.height),expression:"height"}],attrs:{"type":"range","min":"0","max":"1024","step":"8"},domProps:{"value":(_vm.height)},on:{"__r":function($event){_vm.height=$event.target.value}}}),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.height),expression:"height"}],attrs:{"type":"text","id":"height","name":"height"},domProps:{"value":(_vm.height)},on:{"input":function($event){if($event.target.composing){ return; }_vm.height=$event.target.value}}})])]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"save"},[_c('button',{staticClass:"btn",on:{"click":function($event){return _vm.$emit('save')}}},[_vm._v("Export PNG")])])])}
var staticRenderFns = []

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-5e9491",
            functional: undefined
          };
        })());
      
},{}],"DQUe":[function(require,module,exports) {
var global = arguments[3];
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var Symbol = root.Symbol,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

/**
 * Creates a `_.flow` or `_.flowRight` function.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new flow function.
 */
function createFlow(fromRight) {
  return baseRest(function(funcs) {
    funcs = baseFlatten(funcs, 1);

    var length = funcs.length,
        index = length;

    if (fromRight) {
      funcs.reverse();
    }
    while (index--) {
      if (typeof funcs[index] != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
    }
    return function() {
      var index = 0,
          result = length ? funcs[index].apply(this, arguments) : arguments[0];

      while (++index < length) {
        result = funcs[index].call(this, result);
      }
      return result;
    };
  });
}

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Creates a function that returns the result of invoking the given functions
 * with the `this` binding of the created function, where each successive
 * invocation is supplied the return value of the previous.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Util
 * @param {...(Function|Function[])} [funcs] The functions to invoke.
 * @returns {Function} Returns the new composite function.
 * @see _.flowRight
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * var addSquare = _.flow([_.add, square]);
 * addSquare(1, 2);
 * // => 9
 */
var flow = createFlow();

module.exports = flow;

},{}],"PeJD":[function(require,module,exports) {
var global = arguments[3];
/**
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    nullTag = '[object Null]',
    proxyTag = '[object Proxy]',
    undefinedTag = '[object Undefined]';

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var Symbol = root.Symbol,
    symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isFunction;

},{}],"xCMa":[function(require,module,exports) {
/**
 * lodash 4.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;

},{}],"HLiM":[function(require,module,exports) {
// expected hue range: [0, 360)
// expected saturation range: [0, 1]
// expected lightness range: [0, 1]
var hslToRgb = function(hue, saturation, lightness){
  // based on algorithm from http://en.wikipedia.org/wiki/HSL_and_HSV#Converting_to_RGB
  if( hue == undefined ){
    return [0, 0, 0];
  }

  var chroma = (1 - Math.abs((2 * lightness) - 1)) * saturation;
  var huePrime = hue / 60;
  var secondComponent = chroma * (1 - Math.abs((huePrime % 2) - 1));

  huePrime = Math.floor(huePrime);
  var red;
  var green;
  var blue;

  if( huePrime === 0 ){
    red = chroma;
    green = secondComponent;
    blue = 0;
  }else if( huePrime === 1 ){
    red = secondComponent;
    green = chroma;
    blue = 0;
  }else if( huePrime === 2 ){
    red = 0;
    green = chroma;
    blue = secondComponent;
  }else if( huePrime === 3 ){
    red = 0;
    green = secondComponent;
    blue = chroma;
  }else if( huePrime === 4 ){
    red = secondComponent;
    green = 0;
    blue = chroma;
  }else if( huePrime === 5 ){
    red = chroma;
    green = 0;
    blue = secondComponent;
  }

  var lightnessAdjustment = lightness - (chroma / 2);
  red += lightnessAdjustment;
  green += lightnessAdjustment;
  blue += lightnessAdjustment;

  return [
      Math.abs(Math.round(red * 255)),
      Math.abs(Math.round(green * 255)),
      Math.abs(Math.round(blue * 255))
  ];

};

module.exports = hslToRgb;

},{}],"lmSM":[function(require,module,exports) {
// In our case, there's only one dependency

var toRgb = require('hsl-to-rgb-for-reals')

// Typically all dependencies should be declared at the top of the file.

// Now let's define an API for our module, we're taking hue, saturation and luminosity values and outputting a CSS compatible hex string.
// Hue is in degrees, between 0 and 359. Since degrees a cyclical in nature, we'll support numbers greater than 359 or less than 0 by "spinning" them around until they fall within the 0 to 359 range.
// Saturation and luminosity are both percentages, we'll represent these percentages with whole numbers between 0 and 100. For these numbers we'll need to enforce a maximum and a minimum, anything below 0 will become 0, anything above 100 will become 100.
// Let's write some utility functions to handle this logic:

function max (val, n) {
  return (val > n) ? n : val
}

function min (val, n) {
  return (val < n) ? n : val
}

function cycle (val) {
  // for safety:
  val = max(val, 1e7)
  val = min(val, -1e7)
  // cycle value:
  while (val < 0) { val += 360 }
  while (val > 359) { val -= 360 }
  return val
}

// Now for the main piece, the `hsl` function:

function hsl (hue, saturation, luminosity) {
  // resolve degrees to 0 - 359 range
  hue = cycle(hue)

  // enforce constraints
  saturation = min(max(saturation, 100), 0)
  luminosity = min(max(luminosity, 100), 0)

  // convert to 0 to 1 range used by hsl-to-rgb-for-reals
  saturation /= 100
  luminosity /= 100

  // let hsl-to-rgb-for-reals do the hard work
  var rgb = toRgb(hue, saturation, luminosity)

  // convert each value in the returned RGB array
  // to a 2 character hex value, join the array into
  // a string, prefixed with a hash
  return '#' + rgb
    .map(function (n) {
      return (256 + n).toString(16).substr(-2)
    })
    .join('')
}

// In order to make our code into a bona fide module we have to export it:

module.exports = hsl

},{"hsl-to-rgb-for-reals":"HLiM"}],"yfXM":[function(require,module,exports) {
(function() {
  module.exports = function(r, g, b) {
    var d, h, l, max, min, s;
    r /= 255;
    g /= 255;
    b /= 255;
    max = Math.max(r, g, b);
    min = Math.min(r, g, b);
    h = 0;
    s = 0;
    l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
      }
      h /= 6;
    }
    h = Math.ceil(h * 360);
    s = (Math.ceil(s * 100)) + "%";
    l = (Math.ceil(l * 100)) + "%";
    return [h, s, l];
  };

}).call(this);

},{}],"vIdV":[function(require,module,exports) {
module.exports = function hexToRgb (hex) {

  if (hex.charAt && hex.charAt(0) === '#') {
    hex = removeHash(hex)
  }

  if (hex.length === 3) {
    hex = expand(hex)
  }

  var bigint = parseInt(hex, 16)
  var r = (bigint >> 16) & 255
  var g = (bigint >> 8) & 255
  var b = bigint & 255

  return [r, g, b]
}

function removeHash (hex) {

  var arr = hex.split('')
  arr.shift()
  return arr.join('')
}

function expand (hex) {

  return hex
    .split('')
    .reduce(function (accum, value) {

      return accum.concat([value, value])
    }, [])
    .join('')
}

},{}],"bmxe":[function(require,module,exports) {

var rgbToHsl = require('rgb-to-hsl');
var hexToRgb = require('hex-to-rgb');

module.exports = function (hex) {
	var hsl = rgbToHsl.apply(rgbToHsl, hexToRgb(hex));
	return [hsl[0], parseInt(hsl[1], 10), parseInt(hsl[2], 10)];
};

},{"rgb-to-hsl":"yfXM","hex-to-rgb":"vIdV"}],"Z6vK":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var flow = _interopDefault(require('lodash.flow'));
var isFunction = _interopDefault(require('lodash.isfunction'));
var isArray = _interopDefault(require('lodash.isarray'));
var _hslToHex = _interopDefault(require('hsl-to-hex'));
var hexToHsl = _interopDefault(require('hex-to-hsl'));

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

// Change an hsl object { hue: int, sat: int, lit: int } to an array [int, int, int]
var hslObjToArray = function hslObjToArray(_ref) {
	var hue = _ref.hue;
	var sat = _ref.sat;
	var lit = _ref.lit;
	return [hue, sat, lit];
};

// Returns a boolean telling if this is a valid hsl array [int, int, int]
var isHSLArray = function isHSLArray(c) {
	return isArray(c) && c.length === 3 && typeof c[0] === 'number' && c[0] >= 0 && c[0] <= 360 && typeof c[1] === 'number' && c[1] >= 0 && c[1] <= 100 && typeof c[2] === 'number' && c[2] >= 0 && c[2] <= 100;
};

// Returns a boolean telling if this is a valid hsl object { hue: int, sat: int, lit: int }
var isHSLObject = function isHSLObject(c) {
	return (typeof c === 'undefined' ? 'undefined' : _typeof(c)) === 'object' && isHSLArray(hslObjToArray(c));
};

// Returns a boolean telling if this is a valid hex color '#000000'
var isHexColor = function isHexColor(c) {
	return typeof c === 'string' && c[0] === '#' && (c.length === 7 || c.length === 4);
};

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Return an HSL array whatever the color type is passed
var colorToHSL = function colorToHSL(c) {
	if (isHSLArray(c)) {
		return c;
	}

	if (isHSLObject(c)) {
		return hslObjToArray(c);
	}

	if (isHexColor(c)) {
		return hexToHsl(c);
	}

	return c;
};

// Returns an hex string value, whatever color type is passed in argument
var colorToHex = function colorToHex(c) {
	if (isArray(c)) {
		return _hslToHex.apply(undefined, _toConsumableArray(c));
	}

	if (isHSLObject(c)) {
		return _hslToHex(c.hue, c.sat, c.lit);
	}

	if (isHexColor(c)) {
		return c;
	}

	return c;
};

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// Makes sure the function gets an HSL object
var withHSL = function withHSL(func) {
	return function (c) {
		return func(colorToHSL(c));
	};
};

var isValidColor = function isValidColor(col) {
	return col && (isHSLArray(col) || isHSLObject(col) || isHexColor(col));
};

// Return hex from a color
var color = function color(col) {
	for (var _len = arguments.length, colAlts = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		colAlts[_key - 1] = arguments[_key];
	}

	// If the color passed is a function, execute it
	if (isFunction(col)) {
		col = col();
	}

	// If nothing is passed, return a black color by default
	if (!col) {
		return '#000000';
	}

	// Validate
	if (!isValidColor(col)) {
		throw new Error('Color passed is not a valid color');
	}

	// When alterations are passed, process the color and return an hex value
	if (colAlts.length) {
		var alteration = flow(colAlts);
		return colorToHex(alteration(col));
	}

	// If just a color is passed, return a function which takes alterations
	return function () {
		for (var _len2 = arguments.length, alts = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			alts[_key2] = arguments[_key2];
		}

		var firstArg = alts[0];
		if (firstArg && isValidColor(firstArg)) {
			return color(firstArg);
		}

		// Return the altered color wrapper if alterations are passed
		if (alts.length) {
			var _alteration = flow(alts);
			return color(_alteration(col));
		}

		// If no argument is passed, return the hex color
		return colorToHex(col);
	};
};

// British proxy
var colour = color;

// Alter lightness of an hsl color
var lightness = function lightness(percent) {
	return withHSL(function (_ref) {
		var _ref2 = _slicedToArray(_ref, 3);

		var hue = _ref2[0];
		var sat = _ref2[1];
		var lit = _ref2[2];
		return [hue, sat, lit + percent];
	});
};

// Alter saturation of an hsl color
var saturation = function saturation(percent) {
	return withHSL(function (_ref3) {
		var _ref4 = _slicedToArray(_ref3, 3);

		var hue = _ref4[0];
		var sat = _ref4[1];
		var lit = _ref4[2];
		return [hue, sat + percent, lit];
	});
};

// Alter hue of an hsl color
var hue = function hue(percent) {
	return withHSL(function (_ref5) {
		var _ref6 = _slicedToArray(_ref5, 3);

		var hue = _ref6[0];
		var sat = _ref6[1];
		var lit = _ref6[2];
		return [hue + percent, sat, lit];
	});
};

exports.color = color;
exports.colour = colour;
exports.lightness = lightness;
exports.saturation = saturation;
exports.hue = hue;


},{"lodash.flow":"DQUe","lodash.isfunction":"PeJD","lodash.isarray":"xCMa","hsl-to-hex":"lmSM","hex-to-hsl":"bmxe"}],"DOFq":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _IsometricTile = _interopRequireDefault(require("./IsometricTile.vue"));
var _ImageAsset = _interopRequireDefault(require("./ImageAsset.vue"));
var _IsometricViewerSidebar = _interopRequireDefault(require("./IsometricViewerSidebar.vue"));
var _kewler = require("kewler");
var _image = require("../lib/image");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = exports.default = {
  components: {
    IsometricTile: _IsometricTile.default,
    ImageAsset: _ImageAsset.default,
    IsometricViewerSidebar: _IsometricViewerSidebar.default
  },
  data: function data() {
    return {
      assetTop: {
        color: "#6536e9",
        brightness: 0
      },
      assetLeft: {
        color: "#3e357e",
        brightness: 0
      },
      assetRight: {
        color: "#4c418b",
        brightness: 0
      },
      svgRef: false,
      sidebar: {
        linkEdges: false,
        width: 256,
        height: 256,
        lockToCube: true
      },
      lastBackgroundColor: "",
      lastForegroundColor: ""
    };
  },
  methods: {
    save: function save() {
      (0, _image.svgToDownload)(this.svgRef.outerHTML).catch(function (e) {
        return M.toast({
          html: e.message
        });
      });
    },
    limit: function limit(value) {
      // FIXME: slowww
      if (!this.$refs.preview) return value;
      var style = window.getComputedStyle(this.$refs.preview);
      var size = parseInt(style.height) - 50;
      return Math.min(value, size);
    }
  },
  computed: {
    backgroundColor: function backgroundColor() {
      var baseColor;
      if (!this.assetTop.isImage) {
        baseColor = this.assetTop.color;
      } else {
        baseColor = "#000000";
      }
      try {
        var color1 = (0, _kewler.color)(baseColor)((0, _kewler.lightness)(-45))((0, _kewler.saturation)(-20))();
        this.lastBackgroundColor = color1;
        var style = {
          "background-color": color1
        };
        return style;
      } catch (e) {
        return this.lastBackgroundColor;
      }
    }
  }
};
        var $9e6fa9 = exports.default || module.exports;
      
      if (typeof $9e6fa9 === 'function') {
        $9e6fa9 = $9e6fa9.options;
      }
    
        /* template */
        Object.assign($9e6fa9, (function () {
          var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"isometric-viewer iso-col",style:(_vm.backgroundColor)},[_c('div',{ref:"preview",staticClass:"left-item preview"},[_c('IsometricTile',{attrs:{"width":this.limit(this.sidebar.width),"height":this.limit(_vm.sidebar.lockToCube ? this.sidebar.width : this.sidebar.height),"asset-top":_vm.assetTop,"asset-left":_vm.assetLeft,"asset-right":_vm.sidebar.linkEdges ? _vm.assetLeft : _vm.assetRight},model:{value:(_vm.svgRef),callback:function ($$v) {_vm.svgRef=$$v},expression:"svgRef"}})],1),_vm._v(" "),_c('div',{staticClass:"iso-row z-depth-5"},[_c('div',{staticClass:"asset"},[_c('ImageAsset',{attrs:{"name":"Top","initial-values":_vm.assetTop},model:{value:(_vm.assetTop),callback:function ($$v) {_vm.assetTop=$$v},expression:"assetTop"}})],1),_vm._v(" "),_c('div',{staticClass:"asset"},[_c('ImageAsset',{attrs:{"name":"Left","initial-values":_vm.assetLeft},model:{value:(_vm.assetLeft),callback:function ($$v) {_vm.assetLeft=$$v},expression:"assetLeft"}})],1),_vm._v(" "),_c('div',{staticClass:"asset"},[(!_vm.sidebar.linkEdges)?_c('ImageAsset',{attrs:{"name":"Right","initial-values":_vm.assetRight},model:{value:(_vm.assetRight),callback:function ($$v) {_vm.assetRight=$$v},expression:"assetRight"}}):_vm._e()],1),_vm._v(" "),_c('IsometricViewerSidebar',{on:{"save":_vm.save},model:{value:(_vm.sidebar),callback:function ($$v) {_vm.sidebar=$$v},expression:"sidebar"}})],1)])}
var staticRenderFns = []

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-9e6fa9",
            functional: undefined
          };
        })());
      
},{"./IsometricTile.vue":"Ql7V","./ImageAsset.vue":"q518","./IsometricViewerSidebar.vue":"tyLK","kewler":"Z6vK","../lib/image":"rdKr"}],"TC2m":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _IsometricViewer = _interopRequireDefault(require("./IsometricViewer.vue"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//
//
//
//
//
//
var _default = exports.default = {
  components: {
    IsometricViewer: _IsometricViewer.default
  }
};
        var $68106d = exports.default || module.exports;
      
      if (typeof $68106d === 'function') {
        $68106d = $68106d.options;
      }
    
        /* template */
        Object.assign($68106d, (function () {
          var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',[_c('IsometricViewer')],1)])}
var staticRenderFns = []

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"./IsometricViewer.vue":"DOFq"}],"Kmah":[function(require,module,exports) {
var define;
var global = arguments[3];
/*!
 * Materialize v1.0.0 (http://materializecss.com)
 * Copyright 2014-2017 Materialize
 * MIT License (https://raw.githubusercontent.com/Dogfalo/materialize/master/LICENSE)
 */
var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*! cash-dom 1.3.5, https://github.com/kenwheeler/cash @license MIT */
(function (factory) {
  window.cash = factory();
})(function () {
  var doc = document,
      win = window,
      ArrayProto = Array.prototype,
      slice = ArrayProto.slice,
      filter = ArrayProto.filter,
      push = ArrayProto.push;

  var noop = function () {},
      isFunction = function (item) {
    // @see https://crbug.com/568448
    return typeof item === typeof noop && item.call;
  },
      isString = function (item) {
    return typeof item === typeof "";
  };

  var idMatch = /^#[\w-]*$/,
      classMatch = /^\.[\w-]*$/,
      htmlMatch = /<.+>/,
      singlet = /^\w+$/;

  function find(selector, context) {
    context = context || doc;
    var elems = classMatch.test(selector) ? context.getElementsByClassName(selector.slice(1)) : singlet.test(selector) ? context.getElementsByTagName(selector) : context.querySelectorAll(selector);
    return elems;
  }

  var frag;
  function parseHTML(str) {
    if (!frag) {
      frag = doc.implementation.createHTMLDocument(null);
      var base = frag.createElement("base");
      base.href = doc.location.href;
      frag.head.appendChild(base);
    }

    frag.body.innerHTML = str;

    return frag.body.childNodes;
  }

  function onReady(fn) {
    if (doc.readyState !== "loading") {
      fn();
    } else {
      doc.addEventListener("DOMContentLoaded", fn);
    }
  }

  function Init(selector, context) {
    if (!selector) {
      return this;
    }

    // If already a cash collection, don't do any further processing
    if (selector.cash && selector !== win) {
      return selector;
    }

    var elems = selector,
        i = 0,
        length;

    if (isString(selector)) {
      elems = idMatch.test(selector) ?
      // If an ID use the faster getElementById check
      doc.getElementById(selector.slice(1)) : htmlMatch.test(selector) ?
      // If HTML, parse it into real elements
      parseHTML(selector) :
      // else use `find`
      find(selector, context);

      // If function, use as shortcut for DOM ready
    } else if (isFunction(selector)) {
      onReady(selector);return this;
    }

    if (!elems) {
      return this;
    }

    // If a single DOM element is passed in or received via ID, return the single element
    if (elems.nodeType || elems === win) {
      this[0] = elems;
      this.length = 1;
    } else {
      // Treat like an array and loop through each item.
      length = this.length = elems.length;
      for (; i < length; i++) {
        this[i] = elems[i];
      }
    }

    return this;
  }

  function cash(selector, context) {
    return new Init(selector, context);
  }

  var fn = cash.fn = cash.prototype = Init.prototype = { // jshint ignore:line
    cash: true,
    length: 0,
    push: push,
    splice: ArrayProto.splice,
    map: ArrayProto.map,
    init: Init
  };

  Object.defineProperty(fn, "constructor", { value: cash });

  cash.parseHTML = parseHTML;
  cash.noop = noop;
  cash.isFunction = isFunction;
  cash.isString = isString;

  cash.extend = fn.extend = function (target) {
    target = target || {};

    var args = slice.call(arguments),
        length = args.length,
        i = 1;

    if (args.length === 1) {
      target = this;
      i = 0;
    }

    for (; i < length; i++) {
      if (!args[i]) {
        continue;
      }
      for (var key in args[i]) {
        if (args[i].hasOwnProperty(key)) {
          target[key] = args[i][key];
        }
      }
    }

    return target;
  };

  function each(collection, callback) {
    var l = collection.length,
        i = 0;

    for (; i < l; i++) {
      if (callback.call(collection[i], collection[i], i, collection) === false) {
        break;
      }
    }
  }

  function matches(el, selector) {
    var m = el && (el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector || el.oMatchesSelector);
    return !!m && m.call(el, selector);
  }

  function getCompareFunction(selector) {
    return (
      /* Use browser's `matches` function if string */
      isString(selector) ? matches :
      /* Match a cash element */
      selector.cash ? function (el) {
        return selector.is(el);
      } :
      /* Direct comparison */
      function (el, selector) {
        return el === selector;
      }
    );
  }

  function unique(collection) {
    return cash(slice.call(collection).filter(function (item, index, self) {
      return self.indexOf(item) === index;
    }));
  }

  cash.extend({
    merge: function (first, second) {
      var len = +second.length,
          i = first.length,
          j = 0;

      for (; j < len; i++, j++) {
        first[i] = second[j];
      }

      first.length = i;
      return first;
    },

    each: each,
    matches: matches,
    unique: unique,
    isArray: Array.isArray,
    isNumeric: function (n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

  });

  var uid = cash.uid = "_cash" + Date.now();

  function getDataCache(node) {
    return node[uid] = node[uid] || {};
  }

  function setData(node, key, value) {
    return getDataCache(node)[key] = value;
  }

  function getData(node, key) {
    var c = getDataCache(node);
    if (c[key] === undefined) {
      c[key] = node.dataset ? node.dataset[key] : cash(node).attr("data-" + key);
    }
    return c[key];
  }

  function removeData(node, key) {
    var c = getDataCache(node);
    if (c) {
      delete c[key];
    } else if (node.dataset) {
      delete node.dataset[key];
    } else {
      cash(node).removeAttr("data-" + name);
    }
  }

  fn.extend({
    data: function (name, value) {
      if (isString(name)) {
        return value === undefined ? getData(this[0], name) : this.each(function (v) {
          return setData(v, name, value);
        });
      }

      for (var key in name) {
        this.data(key, name[key]);
      }

      return this;
    },

    removeData: function (key) {
      return this.each(function (v) {
        return removeData(v, key);
      });
    }

  });

  var notWhiteMatch = /\S+/g;

  function getClasses(c) {
    return isString(c) && c.match(notWhiteMatch);
  }

  function hasClass(v, c) {
    return v.classList ? v.classList.contains(c) : new RegExp("(^| )" + c + "( |$)", "gi").test(v.className);
  }

  function addClass(v, c, spacedName) {
    if (v.classList) {
      v.classList.add(c);
    } else if (spacedName.indexOf(" " + c + " ")) {
      v.className += " " + c;
    }
  }

  function removeClass(v, c) {
    if (v.classList) {
      v.classList.remove(c);
    } else {
      v.className = v.className.replace(c, "");
    }
  }

  fn.extend({
    addClass: function (c) {
      var classes = getClasses(c);

      return classes ? this.each(function (v) {
        var spacedName = " " + v.className + " ";
        each(classes, function (c) {
          addClass(v, c, spacedName);
        });
      }) : this;
    },

    attr: function (name, value) {
      if (!name) {
        return undefined;
      }

      if (isString(name)) {
        if (value === undefined) {
          return this[0] ? this[0].getAttribute ? this[0].getAttribute(name) : this[0][name] : undefined;
        }

        return this.each(function (v) {
          if (v.setAttribute) {
            v.setAttribute(name, value);
          } else {
            v[name] = value;
          }
        });
      }

      for (var key in name) {
        this.attr(key, name[key]);
      }

      return this;
    },

    hasClass: function (c) {
      var check = false,
          classes = getClasses(c);
      if (classes && classes.length) {
        this.each(function (v) {
          check = hasClass(v, classes[0]);
          return !check;
        });
      }
      return check;
    },

    prop: function (name, value) {
      if (isString(name)) {
        return value === undefined ? this[0][name] : this.each(function (v) {
          v[name] = value;
        });
      }

      for (var key in name) {
        this.prop(key, name[key]);
      }

      return this;
    },

    removeAttr: function (name) {
      return this.each(function (v) {
        if (v.removeAttribute) {
          v.removeAttribute(name);
        } else {
          delete v[name];
        }
      });
    },

    removeClass: function (c) {
      if (!arguments.length) {
        return this.attr("class", "");
      }
      var classes = getClasses(c);
      return classes ? this.each(function (v) {
        each(classes, function (c) {
          removeClass(v, c);
        });
      }) : this;
    },

    removeProp: function (name) {
      return this.each(function (v) {
        delete v[name];
      });
    },

    toggleClass: function (c, state) {
      if (state !== undefined) {
        return this[state ? "addClass" : "removeClass"](c);
      }
      var classes = getClasses(c);
      return classes ? this.each(function (v) {
        var spacedName = " " + v.className + " ";
        each(classes, function (c) {
          if (hasClass(v, c)) {
            removeClass(v, c);
          } else {
            addClass(v, c, spacedName);
          }
        });
      }) : this;
    } });

  fn.extend({
    add: function (selector, context) {
      return unique(cash.merge(this, cash(selector, context)));
    },

    each: function (callback) {
      each(this, callback);
      return this;
    },

    eq: function (index) {
      return cash(this.get(index));
    },

    filter: function (selector) {
      if (!selector) {
        return this;
      }

      var comparator = isFunction(selector) ? selector : getCompareFunction(selector);

      return cash(filter.call(this, function (e) {
        return comparator(e, selector);
      }));
    },

    first: function () {
      return this.eq(0);
    },

    get: function (index) {
      if (index === undefined) {
        return slice.call(this);
      }
      return index < 0 ? this[index + this.length] : this[index];
    },

    index: function (elem) {
      var child = elem ? cash(elem)[0] : this[0],
          collection = elem ? this : cash(child).parent().children();
      return slice.call(collection).indexOf(child);
    },

    last: function () {
      return this.eq(-1);
    }

  });

  var camelCase = function () {
    var camelRegex = /(?:^\w|[A-Z]|\b\w)/g,
        whiteSpace = /[\s-_]+/g;
    return function (str) {
      return str.replace(camelRegex, function (letter, index) {
        return letter[index === 0 ? "toLowerCase" : "toUpperCase"]();
      }).replace(whiteSpace, "");
    };
  }();

  var getPrefixedProp = function () {
    var cache = {},
        doc = document,
        div = doc.createElement("div"),
        style = div.style;

    return function (prop) {
      prop = camelCase(prop);
      if (cache[prop]) {
        return cache[prop];
      }

      var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
          prefixes = ["webkit", "moz", "ms", "o"],
          props = (prop + " " + prefixes.join(ucProp + " ") + ucProp).split(" ");

      each(props, function (p) {
        if (p in style) {
          cache[p] = prop = cache[prop] = p;
          return false;
        }
      });

      return cache[prop];
    };
  }();

  cash.prefixedProp = getPrefixedProp;
  cash.camelCase = camelCase;

  fn.extend({
    css: function (prop, value) {
      if (isString(prop)) {
        prop = getPrefixedProp(prop);
        return arguments.length > 1 ? this.each(function (v) {
          return v.style[prop] = value;
        }) : win.getComputedStyle(this[0])[prop];
      }

      for (var key in prop) {
        this.css(key, prop[key]);
      }

      return this;
    }

  });

  function compute(el, prop) {
    return parseInt(win.getComputedStyle(el[0], null)[prop], 10) || 0;
  }

  each(["Width", "Height"], function (v) {
    var lower = v.toLowerCase();

    fn[lower] = function () {
      return this[0].getBoundingClientRect()[lower];
    };

    fn["inner" + v] = function () {
      return this[0]["client" + v];
    };

    fn["outer" + v] = function (margins) {
      return this[0]["offset" + v] + (margins ? compute(this, "margin" + (v === "Width" ? "Left" : "Top")) + compute(this, "margin" + (v === "Width" ? "Right" : "Bottom")) : 0);
    };
  });

  function registerEvent(node, eventName, callback) {
    var eventCache = getData(node, "_cashEvents") || setData(node, "_cashEvents", {});
    eventCache[eventName] = eventCache[eventName] || [];
    eventCache[eventName].push(callback);
    node.addEventListener(eventName, callback);
  }

  function removeEvent(node, eventName, callback) {
    var events = getData(node, "_cashEvents"),
        eventCache = events && events[eventName],
        index;

    if (!eventCache) {
      return;
    }

    if (callback) {
      node.removeEventListener(eventName, callback);
      index = eventCache.indexOf(callback);
      if (index >= 0) {
        eventCache.splice(index, 1);
      }
    } else {
      each(eventCache, function (event) {
        node.removeEventListener(eventName, event);
      });
      eventCache = [];
    }
  }

  fn.extend({
    off: function (eventName, callback) {
      return this.each(function (v) {
        return removeEvent(v, eventName, callback);
      });
    },

    on: function (eventName, delegate, callback, runOnce) {
      // jshint ignore:line
      var originalCallback;
      if (!isString(eventName)) {
        for (var key in eventName) {
          this.on(key, delegate, eventName[key]);
        }
        return this;
      }

      if (isFunction(delegate)) {
        callback = delegate;
        delegate = null;
      }

      if (eventName === "ready") {
        onReady(callback);
        return this;
      }

      if (delegate) {
        originalCallback = callback;
        callback = function (e) {
          var t = e.target;
          while (!matches(t, delegate)) {
            if (t === this || t === null) {
              return t = false;
            }

            t = t.parentNode;
          }

          if (t) {
            originalCallback.call(t, e);
          }
        };
      }

      return this.each(function (v) {
        var finalCallback = callback;
        if (runOnce) {
          finalCallback = function () {
            callback.apply(this, arguments);
            removeEvent(v, eventName, finalCallback);
          };
        }
        registerEvent(v, eventName, finalCallback);
      });
    },

    one: function (eventName, delegate, callback) {
      return this.on(eventName, delegate, callback, true);
    },

    ready: onReady,

    /**
     * Modified
     * Triggers browser event
     * @param String eventName
     * @param Object data - Add properties to event object
     */
    trigger: function (eventName, data) {
      if (document.createEvent) {
        var evt = document.createEvent('HTMLEvents');
        evt.initEvent(eventName, true, false);
        evt = this.extend(evt, data);
        return this.each(function (v) {
          return v.dispatchEvent(evt);
        });
      }
    }

  });

  function encode(name, value) {
    return "&" + encodeURIComponent(name) + "=" + encodeURIComponent(value).replace(/%20/g, "+");
  }

  function getSelectMultiple_(el) {
    var values = [];
    each(el.options, function (o) {
      if (o.selected) {
        values.push(o.value);
      }
    });
    return values.length ? values : null;
  }

  function getSelectSingle_(el) {
    var selectedIndex = el.selectedIndex;
    return selectedIndex >= 0 ? el.options[selectedIndex].value : null;
  }

  function getValue(el) {
    var type = el.type;
    if (!type) {
      return null;
    }
    switch (type.toLowerCase()) {
      case "select-one":
        return getSelectSingle_(el);
      case "select-multiple":
        return getSelectMultiple_(el);
      case "radio":
        return el.checked ? el.value : null;
      case "checkbox":
        return el.checked ? el.value : null;
      default:
        return el.value ? el.value : null;
    }
  }

  fn.extend({
    serialize: function () {
      var query = "";

      each(this[0].elements || this, function (el) {
        if (el.disabled || el.tagName === "FIELDSET") {
          return;
        }
        var name = el.name;
        switch (el.type.toLowerCase()) {
          case "file":
          case "reset":
          case "submit":
          case "button":
            break;
          case "select-multiple":
            var values = getValue(el);
            if (values !== null) {
              each(values, function (value) {
                query += encode(name, value);
              });
            }
            break;
          default:
            var value = getValue(el);
            if (value !== null) {
              query += encode(name, value);
            }
        }
      });

      return query.substr(1);
    },

    val: function (value) {
      if (value === undefined) {
        return getValue(this[0]);
      }

      return this.each(function (v) {
        return v.value = value;
      });
    }

  });

  function insertElement(el, child, prepend) {
    if (prepend) {
      var first = el.childNodes[0];
      el.insertBefore(child, first);
    } else {
      el.appendChild(child);
    }
  }

  function insertContent(parent, child, prepend) {
    var str = isString(child);

    if (!str && child.length) {
      each(child, function (v) {
        return insertContent(parent, v, prepend);
      });
      return;
    }

    each(parent, str ? function (v) {
      return v.insertAdjacentHTML(prepend ? "afterbegin" : "beforeend", child);
    } : function (v, i) {
      return insertElement(v, i === 0 ? child : child.cloneNode(true), prepend);
    });
  }

  fn.extend({
    after: function (selector) {
      cash(selector).insertAfter(this);
      return this;
    },

    append: function (content) {
      insertContent(this, content);
      return this;
    },

    appendTo: function (parent) {
      insertContent(cash(parent), this);
      return this;
    },

    before: function (selector) {
      cash(selector).insertBefore(this);
      return this;
    },

    clone: function () {
      return cash(this.map(function (v) {
        return v.cloneNode(true);
      }));
    },

    empty: function () {
      this.html("");
      return this;
    },

    html: function (content) {
      if (content === undefined) {
        return this[0].innerHTML;
      }
      var source = content.nodeType ? content[0].outerHTML : content;
      return this.each(function (v) {
        return v.innerHTML = source;
      });
    },

    insertAfter: function (selector) {
      var _this = this;

      cash(selector).each(function (el, i) {
        var parent = el.parentNode,
            sibling = el.nextSibling;
        _this.each(function (v) {
          parent.insertBefore(i === 0 ? v : v.cloneNode(true), sibling);
        });
      });

      return this;
    },

    insertBefore: function (selector) {
      var _this2 = this;
      cash(selector).each(function (el, i) {
        var parent = el.parentNode;
        _this2.each(function (v) {
          parent.insertBefore(i === 0 ? v : v.cloneNode(true), el);
        });
      });
      return this;
    },

    prepend: function (content) {
      insertContent(this, content, true);
      return this;
    },

    prependTo: function (parent) {
      insertContent(cash(parent), this, true);
      return this;
    },

    remove: function () {
      return this.each(function (v) {
        if (!!v.parentNode) {
          return v.parentNode.removeChild(v);
        }
      });
    },

    text: function (content) {
      if (content === undefined) {
        return this[0].textContent;
      }
      return this.each(function (v) {
        return v.textContent = content;
      });
    }

  });

  var docEl = doc.documentElement;

  fn.extend({
    position: function () {
      var el = this[0];
      return {
        left: el.offsetLeft,
        top: el.offsetTop
      };
    },

    offset: function () {
      var rect = this[0].getBoundingClientRect();
      return {
        top: rect.top + win.pageYOffset - docEl.clientTop,
        left: rect.left + win.pageXOffset - docEl.clientLeft
      };
    },

    offsetParent: function () {
      return cash(this[0].offsetParent);
    }

  });

  fn.extend({
    children: function (selector) {
      var elems = [];
      this.each(function (el) {
        push.apply(elems, el.children);
      });
      elems = unique(elems);

      return !selector ? elems : elems.filter(function (v) {
        return matches(v, selector);
      });
    },

    closest: function (selector) {
      if (!selector || this.length < 1) {
        return cash();
      }
      if (this.is(selector)) {
        return this.filter(selector);
      }
      return this.parent().closest(selector);
    },

    is: function (selector) {
      if (!selector) {
        return false;
      }

      var match = false,
          comparator = getCompareFunction(selector);

      this.each(function (el) {
        match = comparator(el, selector);
        return !match;
      });

      return match;
    },

    find: function (selector) {
      if (!selector || selector.nodeType) {
        return cash(selector && this.has(selector).length ? selector : null);
      }

      var elems = [];
      this.each(function (el) {
        push.apply(elems, find(selector, el));
      });

      return unique(elems);
    },

    has: function (selector) {
      var comparator = isString(selector) ? function (el) {
        return find(selector, el).length !== 0;
      } : function (el) {
        return el.contains(selector);
      };

      return this.filter(comparator);
    },

    next: function () {
      return cash(this[0].nextElementSibling);
    },

    not: function (selector) {
      if (!selector) {
        return this;
      }

      var comparator = getCompareFunction(selector);

      return this.filter(function (el) {
        return !comparator(el, selector);
      });
    },

    parent: function () {
      var result = [];

      this.each(function (item) {
        if (item && item.parentNode) {
          result.push(item.parentNode);
        }
      });

      return unique(result);
    },

    parents: function (selector) {
      var last,
          result = [];

      this.each(function (item) {
        last = item;

        while (last && last.parentNode && last !== doc.body.parentNode) {
          last = last.parentNode;

          if (!selector || selector && matches(last, selector)) {
            result.push(last);
          }
        }
      });

      return unique(result);
    },

    prev: function () {
      return cash(this[0].previousElementSibling);
    },

    siblings: function (selector) {
      var collection = this.parent().children(selector),
          el = this[0];

      return collection.filter(function (i) {
        return i !== el;
      });
    }

  });

  return cash;
});
;
var Component = function () {
  /**
   * Generic constructor for all components
   * @constructor
   * @param {Element} el
   * @param {Object} options
   */
  function Component(classDef, el, options) {
    _classCallCheck(this, Component);

    // Display error if el is valid HTML Element
    if (!(el instanceof Element)) {
      console.error(Error(el + ' is not an HTML Element'));
    }

    // If exists, destroy and reinitialize in child
    var ins = classDef.getInstance(el);
    if (!!ins) {
      ins.destroy();
    }

    this.el = el;
    this.$el = cash(el);
  }

  /**
   * Initializes components
   * @param {class} classDef
   * @param {Element | NodeList | jQuery} els
   * @param {Object} options
   */


  _createClass(Component, null, [{
    key: "init",
    value: function init(classDef, els, options) {
      var instances = null;
      if (els instanceof Element) {
        instances = new classDef(els, options);
      } else if (!!els && (els.jquery || els.cash || els instanceof NodeList)) {
        var instancesArr = [];
        for (var i = 0; i < els.length; i++) {
          instancesArr.push(new classDef(els[i], options));
        }
        instances = instancesArr;
      }

      return instances;
    }
  }]);

  return Component;
}();

; // Required for Meteor package, the use of window prevents export by Meteor
(function (window) {
  if (window.Package) {
    M = {};
  } else {
    window.M = {};
  }

  // Check for jQuery
  M.jQueryLoaded = !!window.jQuery;
})(window);

// AMD
if (typeof define === 'function' && define.amd) {
  define('M', [], function () {
    return M;
  });

  // Common JS
} else if (typeof exports !== 'undefined' && !exports.nodeType) {
  if (typeof module !== 'undefined' && !module.nodeType && module.exports) {
    exports = module.exports = M;
  }
  exports.default = M;
}

M.version = '1.0.0';

M.keys = {
  TAB: 9,
  ENTER: 13,
  ESC: 27,
  ARROW_UP: 38,
  ARROW_DOWN: 40
};

/**
 * TabPress Keydown handler
 */
M.tabPressed = false;
M.keyDown = false;
var docHandleKeydown = function (e) {
  M.keyDown = true;
  if (e.which === M.keys.TAB || e.which === M.keys.ARROW_DOWN || e.which === M.keys.ARROW_UP) {
    M.tabPressed = true;
  }
};
var docHandleKeyup = function (e) {
  M.keyDown = false;
  if (e.which === M.keys.TAB || e.which === M.keys.ARROW_DOWN || e.which === M.keys.ARROW_UP) {
    M.tabPressed = false;
  }
};
var docHandleFocus = function (e) {
  if (M.keyDown) {
    document.body.classList.add('keyboard-focused');
  }
};
var docHandleBlur = function (e) {
  document.body.classList.remove('keyboard-focused');
};
document.addEventListener('keydown', docHandleKeydown, true);
document.addEventListener('keyup', docHandleKeyup, true);
document.addEventListener('focus', docHandleFocus, true);
document.addEventListener('blur', docHandleBlur, true);

/**
 * Initialize jQuery wrapper for plugin
 * @param {Class} plugin  javascript class
 * @param {string} pluginName  jQuery plugin name
 * @param {string} classRef  Class reference name
 */
M.initializeJqueryWrapper = function (plugin, pluginName, classRef) {
  jQuery.fn[pluginName] = function (methodOrOptions) {
    // Call plugin method if valid method name is passed in
    if (plugin.prototype[methodOrOptions]) {
      var params = Array.prototype.slice.call(arguments, 1);

      // Getter methods
      if (methodOrOptions.slice(0, 3) === 'get') {
        var instance = this.first()[0][classRef];
        return instance[methodOrOptions].apply(instance, params);
      }

      // Void methods
      return this.each(function () {
        var instance = this[classRef];
        instance[methodOrOptions].apply(instance, params);
      });

      // Initialize plugin if options or no argument is passed in
    } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
      plugin.init(this, arguments[0]);
      return this;
    }

    // Return error if an unrecognized  method name is passed in
    jQuery.error("Method " + methodOrOptions + " does not exist on jQuery." + pluginName);
  };
};

/**
 * Automatically initialize components
 * @param {Element} context  DOM Element to search within for components
 */
M.AutoInit = function (context) {
  // Use document.body if no context is given
  var root = !!context ? context : document.body;

  var registry = {
    Autocomplete: root.querySelectorAll('.autocomplete:not(.no-autoinit)'),
    Carousel: root.querySelectorAll('.carousel:not(.no-autoinit)'),
    Chips: root.querySelectorAll('.chips:not(.no-autoinit)'),
    Collapsible: root.querySelectorAll('.collapsible:not(.no-autoinit)'),
    Datepicker: root.querySelectorAll('.datepicker:not(.no-autoinit)'),
    Dropdown: root.querySelectorAll('.dropdown-trigger:not(.no-autoinit)'),
    Materialbox: root.querySelectorAll('.materialboxed:not(.no-autoinit)'),
    Modal: root.querySelectorAll('.modal:not(.no-autoinit)'),
    Parallax: root.querySelectorAll('.parallax:not(.no-autoinit)'),
    Pushpin: root.querySelectorAll('.pushpin:not(.no-autoinit)'),
    ScrollSpy: root.querySelectorAll('.scrollspy:not(.no-autoinit)'),
    FormSelect: root.querySelectorAll('select:not(.no-autoinit)'),
    Sidenav: root.querySelectorAll('.sidenav:not(.no-autoinit)'),
    Tabs: root.querySelectorAll('.tabs:not(.no-autoinit)'),
    TapTarget: root.querySelectorAll('.tap-target:not(.no-autoinit)'),
    Timepicker: root.querySelectorAll('.timepicker:not(.no-autoinit)'),
    Tooltip: root.querySelectorAll('.tooltipped:not(.no-autoinit)'),
    FloatingActionButton: root.querySelectorAll('.fixed-action-btn:not(.no-autoinit)')
  };

  for (var pluginName in registry) {
    var plugin = M[pluginName];
    plugin.init(registry[pluginName]);
  }
};

/**
 * Generate approximated selector string for a jQuery object
 * @param {jQuery} obj  jQuery object to be parsed
 * @returns {string}
 */
M.objectSelectorString = function (obj) {
  var tagStr = obj.prop('tagName') || '';
  var idStr = obj.attr('id') || '';
  var classStr = obj.attr('class') || '';
  return (tagStr + idStr + classStr).replace(/\s/g, '');
};

// Unique Random ID
M.guid = function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return function () {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  };
}();

/**
 * Escapes hash from special characters
 * @param {string} hash  String returned from this.hash
 * @returns {string}
 */
M.escapeHash = function (hash) {
  return hash.replace(/(:|\.|\[|\]|,|=|\/)/g, '\\$1');
};

M.elementOrParentIsFixed = function (element) {
  var $element = $(element);
  var $checkElements = $element.add($element.parents());
  var isFixed = false;
  $checkElements.each(function () {
    if ($(this).css('position') === 'fixed') {
      isFixed = true;
      return false;
    }
  });
  return isFixed;
};

/**
 * @typedef {Object} Edges
 * @property {Boolean} top  If the top edge was exceeded
 * @property {Boolean} right  If the right edge was exceeded
 * @property {Boolean} bottom  If the bottom edge was exceeded
 * @property {Boolean} left  If the left edge was exceeded
 */

/**
 * @typedef {Object} Bounding
 * @property {Number} left  left offset coordinate
 * @property {Number} top  top offset coordinate
 * @property {Number} width
 * @property {Number} height
 */

/**
 * Escapes hash from special characters
 * @param {Element} container  Container element that acts as the boundary
 * @param {Bounding} bounding  element bounding that is being checked
 * @param {Number} offset  offset from edge that counts as exceeding
 * @returns {Edges}
 */
M.checkWithinContainer = function (container, bounding, offset) {
  var edges = {
    top: false,
    right: false,
    bottom: false,
    left: false
  };

  var containerRect = container.getBoundingClientRect();
  // If body element is smaller than viewport, use viewport height instead.
  var containerBottom = container === document.body ? Math.max(containerRect.bottom, window.innerHeight) : containerRect.bottom;

  var scrollLeft = container.scrollLeft;
  var scrollTop = container.scrollTop;

  var scrolledX = bounding.left - scrollLeft;
  var scrolledY = bounding.top - scrollTop;

  // Check for container and viewport for each edge
  if (scrolledX < containerRect.left + offset || scrolledX < offset) {
    edges.left = true;
  }

  if (scrolledX + bounding.width > containerRect.right - offset || scrolledX + bounding.width > window.innerWidth - offset) {
    edges.right = true;
  }

  if (scrolledY < containerRect.top + offset || scrolledY < offset) {
    edges.top = true;
  }

  if (scrolledY + bounding.height > containerBottom - offset || scrolledY + bounding.height > window.innerHeight - offset) {
    edges.bottom = true;
  }

  return edges;
};

M.checkPossibleAlignments = function (el, container, bounding, offset) {
  var canAlign = {
    top: true,
    right: true,
    bottom: true,
    left: true,
    spaceOnTop: null,
    spaceOnRight: null,
    spaceOnBottom: null,
    spaceOnLeft: null
  };

  var containerAllowsOverflow = getComputedStyle(container).overflow === 'visible';
  var containerRect = container.getBoundingClientRect();
  var containerHeight = Math.min(containerRect.height, window.innerHeight);
  var containerWidth = Math.min(containerRect.width, window.innerWidth);
  var elOffsetRect = el.getBoundingClientRect();

  var scrollLeft = container.scrollLeft;
  var scrollTop = container.scrollTop;

  var scrolledX = bounding.left - scrollLeft;
  var scrolledYTopEdge = bounding.top - scrollTop;
  var scrolledYBottomEdge = bounding.top + elOffsetRect.height - scrollTop;

  // Check for container and viewport for left
  canAlign.spaceOnRight = !containerAllowsOverflow ? containerWidth - (scrolledX + bounding.width) : window.innerWidth - (elOffsetRect.left + bounding.width);
  if (canAlign.spaceOnRight < 0) {
    canAlign.left = false;
  }

  // Check for container and viewport for Right
  canAlign.spaceOnLeft = !containerAllowsOverflow ? scrolledX - bounding.width + elOffsetRect.width : elOffsetRect.right - bounding.width;
  if (canAlign.spaceOnLeft < 0) {
    canAlign.right = false;
  }

  // Check for container and viewport for Top
  canAlign.spaceOnBottom = !containerAllowsOverflow ? containerHeight - (scrolledYTopEdge + bounding.height + offset) : window.innerHeight - (elOffsetRect.top + bounding.height + offset);
  if (canAlign.spaceOnBottom < 0) {
    canAlign.top = false;
  }

  // Check for container and viewport for Bottom
  canAlign.spaceOnTop = !containerAllowsOverflow ? scrolledYBottomEdge - (bounding.height - offset) : elOffsetRect.bottom - (bounding.height + offset);
  if (canAlign.spaceOnTop < 0) {
    canAlign.bottom = false;
  }

  return canAlign;
};

M.getOverflowParent = function (element) {
  if (element == null) {
    return null;
  }

  if (element === document.body || getComputedStyle(element).overflow !== 'visible') {
    return element;
  }

  return M.getOverflowParent(element.parentElement);
};

/**
 * Gets id of component from a trigger
 * @param {Element} trigger  trigger
 * @returns {string}
 */
M.getIdFromTrigger = function (trigger) {
  var id = trigger.getAttribute('data-target');
  if (!id) {
    id = trigger.getAttribute('href');
    if (id) {
      id = id.slice(1);
    } else {
      id = '';
    }
  }
  return id;
};

/**
 * Multi browser support for document scroll top
 * @returns {Number}
 */
M.getDocumentScrollTop = function () {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
};

/**
 * Multi browser support for document scroll left
 * @returns {Number}
 */
M.getDocumentScrollLeft = function () {
  return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
};

/**
 * @typedef {Object} Edges
 * @property {Boolean} top  If the top edge was exceeded
 * @property {Boolean} right  If the right edge was exceeded
 * @property {Boolean} bottom  If the bottom edge was exceeded
 * @property {Boolean} left  If the left edge was exceeded
 */

/**
 * @typedef {Object} Bounding
 * @property {Number} left  left offset coordinate
 * @property {Number} top  top offset coordinate
 * @property {Number} width
 * @property {Number} height
 */

/**
 * Get time in ms
 * @license https://raw.github.com/jashkenas/underscore/master/LICENSE
 * @type {function}
 * @return {number}
 */
var getTime = Date.now || function () {
  return new Date().getTime();
};

/**
 * Returns a function, that, when invoked, will only be triggered at most once
 * during a given window of time. Normally, the throttled function will run
 * as much as it can, without ever going more than once per `wait` duration;
 * but if you'd like to disable the execution on the leading edge, pass
 * `{leading: false}`. To disable execution on the trailing edge, ditto.
 * @license https://raw.github.com/jashkenas/underscore/master/LICENSE
 * @param {function} func
 * @param {number} wait
 * @param {Object=} options
 * @returns {Function}
 */
M.throttle = function (func, wait, options) {
  var context = void 0,
      args = void 0,
      result = void 0;
  var timeout = null;
  var previous = 0;
  options || (options = {});
  var later = function () {
    previous = options.leading === false ? 0 : getTime();
    timeout = null;
    result = func.apply(context, args);
    context = args = null;
  };
  return function () {
    var now = getTime();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
      context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};
; /*
  v2.2.0
  2017 Julian Garnier
  Released under the MIT license
  */
var $jscomp = { scope: {} };$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function (e, r, p) {
  if (p.get || p.set) throw new TypeError("ES3 does not support getters and setters.");e != Array.prototype && e != Object.prototype && (e[r] = p.value);
};$jscomp.getGlobal = function (e) {
  return "undefined" != typeof window && window === e ? e : "undefined" != typeof global && null != global ? global : e;
};$jscomp.global = $jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function () {
  $jscomp.initSymbol = function () {};$jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};$jscomp.symbolCounter_ = 0;$jscomp.Symbol = function (e) {
  return $jscomp.SYMBOL_PREFIX + (e || "") + $jscomp.symbolCounter_++;
};
$jscomp.initSymbolIterator = function () {
  $jscomp.initSymbol();var e = $jscomp.global.Symbol.iterator;e || (e = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));"function" != typeof Array.prototype[e] && $jscomp.defineProperty(Array.prototype, e, { configurable: !0, writable: !0, value: function () {
      return $jscomp.arrayIterator(this);
    } });$jscomp.initSymbolIterator = function () {};
};$jscomp.arrayIterator = function (e) {
  var r = 0;return $jscomp.iteratorPrototype(function () {
    return r < e.length ? { done: !1, value: e[r++] } : { done: !0 };
  });
};
$jscomp.iteratorPrototype = function (e) {
  $jscomp.initSymbolIterator();e = { next: e };e[$jscomp.global.Symbol.iterator] = function () {
    return this;
  };return e;
};$jscomp.array = $jscomp.array || {};$jscomp.iteratorFromArray = function (e, r) {
  $jscomp.initSymbolIterator();e instanceof String && (e += "");var p = 0,
      m = { next: function () {
      if (p < e.length) {
        var u = p++;return { value: r(u, e[u]), done: !1 };
      }m.next = function () {
        return { done: !0, value: void 0 };
      };return m.next();
    } };m[Symbol.iterator] = function () {
    return m;
  };return m;
};
$jscomp.polyfill = function (e, r, p, m) {
  if (r) {
    p = $jscomp.global;e = e.split(".");for (m = 0; m < e.length - 1; m++) {
      var u = e[m];u in p || (p[u] = {});p = p[u];
    }e = e[e.length - 1];m = p[e];r = r(m);r != m && null != r && $jscomp.defineProperty(p, e, { configurable: !0, writable: !0, value: r });
  }
};$jscomp.polyfill("Array.prototype.keys", function (e) {
  return e ? e : function () {
    return $jscomp.iteratorFromArray(this, function (e) {
      return e;
    });
  };
}, "es6-impl", "es3");var $jscomp$this = this;
(function (r) {
  M.anime = r();
})(function () {
  function e(a) {
    if (!h.col(a)) try {
      return document.querySelectorAll(a);
    } catch (c) {}
  }function r(a, c) {
    for (var d = a.length, b = 2 <= arguments.length ? arguments[1] : void 0, f = [], n = 0; n < d; n++) {
      if (n in a) {
        var k = a[n];c.call(b, k, n, a) && f.push(k);
      }
    }return f;
  }function p(a) {
    return a.reduce(function (a, d) {
      return a.concat(h.arr(d) ? p(d) : d);
    }, []);
  }function m(a) {
    if (h.arr(a)) return a;
    h.str(a) && (a = e(a) || a);return a instanceof NodeList || a instanceof HTMLCollection ? [].slice.call(a) : [a];
  }function u(a, c) {
    return a.some(function (a) {
      return a === c;
    });
  }function C(a) {
    var c = {},
        d;for (d in a) {
      c[d] = a[d];
    }return c;
  }function D(a, c) {
    var d = C(a),
        b;for (b in a) {
      d[b] = c.hasOwnProperty(b) ? c[b] : a[b];
    }return d;
  }function z(a, c) {
    var d = C(a),
        b;for (b in c) {
      d[b] = h.und(a[b]) ? c[b] : a[b];
    }return d;
  }function T(a) {
    a = a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (a, c, d, k) {
      return c + c + d + d + k + k;
    });var c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
    a = parseInt(c[1], 16);var d = parseInt(c[2], 16),
        c = parseInt(c[3], 16);return "rgba(" + a + "," + d + "," + c + ",1)";
  }function U(a) {
    function c(a, c, b) {
      0 > b && (b += 1);1 < b && --b;return b < 1 / 6 ? a + 6 * (c - a) * b : .5 > b ? c : b < 2 / 3 ? a + (c - a) * (2 / 3 - b) * 6 : a;
    }var d = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(a) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(a);a = parseInt(d[1]) / 360;var b = parseInt(d[2]) / 100,
        f = parseInt(d[3]) / 100,
        d = d[4] || 1;if (0 == b) f = b = a = f;else {
      var n = .5 > f ? f * (1 + b) : f + b - f * b,
          k = 2 * f - n,
          f = c(k, n, a + 1 / 3),
          b = c(k, n, a);a = c(k, n, a - 1 / 3);
    }return "rgba(" + 255 * f + "," + 255 * b + "," + 255 * a + "," + d + ")";
  }function y(a) {
    if (a = /([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(a)) return a[2];
  }function V(a) {
    if (-1 < a.indexOf("translate") || "perspective" === a) return "px";if (-1 < a.indexOf("rotate") || -1 < a.indexOf("skew")) return "deg";
  }function I(a, c) {
    return h.fnc(a) ? a(c.target, c.id, c.total) : a;
  }function E(a, c) {
    if (c in a.style) return getComputedStyle(a).getPropertyValue(c.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()) || "0";
  }function J(a, c) {
    if (h.dom(a) && u(W, c)) return "transform";if (h.dom(a) && (a.getAttribute(c) || h.svg(a) && a[c])) return "attribute";if (h.dom(a) && "transform" !== c && E(a, c)) return "css";if (null != a[c]) return "object";
  }function X(a, c) {
    var d = V(c),
        d = -1 < c.indexOf("scale") ? 1 : 0 + d;a = a.style.transform;if (!a) return d;for (var b = [], f = [], n = [], k = /(\w+)\((.+?)\)/g; b = k.exec(a);) {
      f.push(b[1]), n.push(b[2]);
    }a = r(n, function (a, b) {
      return f[b] === c;
    });return a.length ? a[0] : d;
  }function K(a, c) {
    switch (J(a, c)) {case "transform":
        return X(a, c);case "css":
        return E(a, c);case "attribute":
        return a.getAttribute(c);}return a[c] || 0;
  }function L(a, c) {
    var d = /^(\*=|\+=|-=)/.exec(a);if (!d) return a;var b = y(a) || 0;c = parseFloat(c);a = parseFloat(a.replace(d[0], ""));switch (d[0][0]) {case "+":
        return c + a + b;case "-":
        return c - a + b;case "*":
        return c * a + b;}
  }function F(a, c) {
    return Math.sqrt(Math.pow(c.x - a.x, 2) + Math.pow(c.y - a.y, 2));
  }function M(a) {
    a = a.points;for (var c = 0, d, b = 0; b < a.numberOfItems; b++) {
      var f = a.getItem(b);0 < b && (c += F(d, f));d = f;
    }return c;
  }function N(a) {
    if (a.getTotalLength) return a.getTotalLength();switch (a.tagName.toLowerCase()) {case "circle":
        return 2 * Math.PI * a.getAttribute("r");case "rect":
        return 2 * a.getAttribute("width") + 2 * a.getAttribute("height");case "line":
        return F({ x: a.getAttribute("x1"), y: a.getAttribute("y1") }, { x: a.getAttribute("x2"), y: a.getAttribute("y2") });case "polyline":
        return M(a);case "polygon":
        var c = a.points;return M(a) + F(c.getItem(c.numberOfItems - 1), c.getItem(0));}
  }function Y(a, c) {
    function d(b) {
      b = void 0 === b ? 0 : b;return a.el.getPointAtLength(1 <= c + b ? c + b : 0);
    }var b = d(),
        f = d(-1),
        n = d(1);switch (a.property) {case "x":
        return b.x;case "y":
        return b.y;
      case "angle":
        return 180 * Math.atan2(n.y - f.y, n.x - f.x) / Math.PI;}
  }function O(a, c) {
    var d = /-?\d*\.?\d+/g,
        b;b = h.pth(a) ? a.totalLength : a;if (h.col(b)) {
      if (h.rgb(b)) {
        var f = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(b);b = f ? "rgba(" + f[1] + ",1)" : b;
      } else b = h.hex(b) ? T(b) : h.hsl(b) ? U(b) : void 0;
    } else f = (f = y(b)) ? b.substr(0, b.length - f.length) : b, b = c && !/\s/g.test(b) ? f + c : f;b += "";return { original: b, numbers: b.match(d) ? b.match(d).map(Number) : [0], strings: h.str(a) || c ? b.split(d) : [] };
  }function P(a) {
    a = a ? p(h.arr(a) ? a.map(m) : m(a)) : [];return r(a, function (a, d, b) {
      return b.indexOf(a) === d;
    });
  }function Z(a) {
    var c = P(a);return c.map(function (a, b) {
      return { target: a, id: b, total: c.length };
    });
  }function aa(a, c) {
    var d = C(c);if (h.arr(a)) {
      var b = a.length;2 !== b || h.obj(a[0]) ? h.fnc(c.duration) || (d.duration = c.duration / b) : a = { value: a };
    }return m(a).map(function (a, b) {
      b = b ? 0 : c.delay;a = h.obj(a) && !h.pth(a) ? a : { value: a };h.und(a.delay) && (a.delay = b);return a;
    }).map(function (a) {
      return z(a, d);
    });
  }function ba(a, c) {
    var d = {},
        b;for (b in a) {
      var f = I(a[b], c);h.arr(f) && (f = f.map(function (a) {
        return I(a, c);
      }), 1 === f.length && (f = f[0]));d[b] = f;
    }d.duration = parseFloat(d.duration);d.delay = parseFloat(d.delay);return d;
  }function ca(a) {
    return h.arr(a) ? A.apply(this, a) : Q[a];
  }function da(a, c) {
    var d;return a.tweens.map(function (b) {
      b = ba(b, c);var f = b.value,
          e = K(c.target, a.name),
          k = d ? d.to.original : e,
          k = h.arr(f) ? f[0] : k,
          w = L(h.arr(f) ? f[1] : f, k),
          e = y(w) || y(k) || y(e);b.from = O(k, e);b.to = O(w, e);b.start = d ? d.end : a.offset;b.end = b.start + b.delay + b.duration;b.easing = ca(b.easing);b.elasticity = (1E3 - Math.min(Math.max(b.elasticity, 1), 999)) / 1E3;b.isPath = h.pth(f);b.isColor = h.col(b.from.original);b.isColor && (b.round = 1);return d = b;
    });
  }function ea(a, c) {
    return r(p(a.map(function (a) {
      return c.map(function (b) {
        var c = J(a.target, b.name);if (c) {
          var d = da(b, a);b = { type: c, property: b.name, animatable: a, tweens: d, duration: d[d.length - 1].end, delay: d[0].delay };
        } else b = void 0;return b;
      });
    })), function (a) {
      return !h.und(a);
    });
  }function R(a, c, d, b) {
    var f = "delay" === a;return c.length ? (f ? Math.min : Math.max).apply(Math, c.map(function (b) {
      return b[a];
    })) : f ? b.delay : d.offset + b.delay + b.duration;
  }function fa(a) {
    var c = D(ga, a),
        d = D(S, a),
        b = Z(a.targets),
        f = [],
        e = z(c, d),
        k;for (k in a) {
      e.hasOwnProperty(k) || "targets" === k || f.push({ name: k, offset: e.offset, tweens: aa(a[k], d) });
    }a = ea(b, f);return z(c, { children: [], animatables: b, animations: a, duration: R("duration", a, c, d), delay: R("delay", a, c, d) });
  }function q(a) {
    function c() {
      return window.Promise && new Promise(function (a) {
        return p = a;
      });
    }function d(a) {
      return g.reversed ? g.duration - a : a;
    }function b(a) {
      for (var b = 0, c = {}, d = g.animations, f = d.length; b < f;) {
        var e = d[b],
            k = e.animatable,
            h = e.tweens,
            n = h.length - 1,
            l = h[n];n && (l = r(h, function (b) {
          return a < b.end;
        })[0] || l);for (var h = Math.min(Math.max(a - l.start - l.delay, 0), l.duration) / l.duration, w = isNaN(h) ? 1 : l.easing(h, l.elasticity), h = l.to.strings, p = l.round, n = [], m = void 0, m = l.to.numbers.length, t = 0; t < m; t++) {
          var x = void 0,
              x = l.to.numbers[t],
              q = l.from.numbers[t],
              x = l.isPath ? Y(l.value, w * x) : q + w * (x - q);p && (l.isColor && 2 < t || (x = Math.round(x * p) / p));n.push(x);
        }if (l = h.length) for (m = h[0], w = 0; w < l; w++) {
          p = h[w + 1], t = n[w], isNaN(t) || (m = p ? m + (t + p) : m + (t + " "));
        } else m = n[0];ha[e.type](k.target, e.property, m, c, k.id);e.currentValue = m;b++;
      }if (b = Object.keys(c).length) for (d = 0; d < b; d++) {
        H || (H = E(document.body, "transform") ? "transform" : "-webkit-transform"), g.animatables[d].target.style[H] = c[d].join(" ");
      }g.currentTime = a;g.progress = a / g.duration * 100;
    }function f(a) {
      if (g[a]) g[a](g);
    }function e() {
      g.remaining && !0 !== g.remaining && g.remaining--;
    }function k(a) {
      var k = g.duration,
          n = g.offset,
          w = n + g.delay,
          r = g.currentTime,
          x = g.reversed,
          q = d(a);if (g.children.length) {
        var u = g.children,
            v = u.length;
        if (q >= g.currentTime) for (var G = 0; G < v; G++) {
          u[G].seek(q);
        } else for (; v--;) {
          u[v].seek(q);
        }
      }if (q >= w || !k) g.began || (g.began = !0, f("begin")), f("run");if (q > n && q < k) b(q);else if (q <= n && 0 !== r && (b(0), x && e()), q >= k && r !== k || !k) b(k), x || e();f("update");a >= k && (g.remaining ? (t = h, "alternate" === g.direction && (g.reversed = !g.reversed)) : (g.pause(), g.completed || (g.completed = !0, f("complete"), "Promise" in window && (p(), m = c()))), l = 0);
    }a = void 0 === a ? {} : a;var h,
        t,
        l = 0,
        p = null,
        m = c(),
        g = fa(a);g.reset = function () {
      var a = g.direction,
          c = g.loop;g.currentTime = 0;g.progress = 0;g.paused = !0;g.began = !1;g.completed = !1;g.reversed = "reverse" === a;g.remaining = "alternate" === a && 1 === c ? 2 : c;b(0);for (a = g.children.length; a--;) {
        g.children[a].reset();
      }
    };g.tick = function (a) {
      h = a;t || (t = h);k((l + h - t) * q.speed);
    };g.seek = function (a) {
      k(d(a));
    };g.pause = function () {
      var a = v.indexOf(g);-1 < a && v.splice(a, 1);g.paused = !0;
    };g.play = function () {
      g.paused && (g.paused = !1, t = 0, l = d(g.currentTime), v.push(g), B || ia());
    };g.reverse = function () {
      g.reversed = !g.reversed;t = 0;l = d(g.currentTime);
    };g.restart = function () {
      g.pause();
      g.reset();g.play();
    };g.finished = m;g.reset();g.autoplay && g.play();return g;
  }var ga = { update: void 0, begin: void 0, run: void 0, complete: void 0, loop: 1, direction: "normal", autoplay: !0, offset: 0 },
      S = { duration: 1E3, delay: 0, easing: "easeOutElastic", elasticity: 500, round: 0 },
      W = "translateX translateY translateZ rotate rotateX rotateY rotateZ scale scaleX scaleY scaleZ skewX skewY perspective".split(" "),
      H,
      h = { arr: function (a) {
      return Array.isArray(a);
    }, obj: function (a) {
      return -1 < Object.prototype.toString.call(a).indexOf("Object");
    },
    pth: function (a) {
      return h.obj(a) && a.hasOwnProperty("totalLength");
    }, svg: function (a) {
      return a instanceof SVGElement;
    }, dom: function (a) {
      return a.nodeType || h.svg(a);
    }, str: function (a) {
      return "string" === typeof a;
    }, fnc: function (a) {
      return "function" === typeof a;
    }, und: function (a) {
      return "undefined" === typeof a;
    }, hex: function (a) {
      return (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a)
      );
    }, rgb: function (a) {
      return (/^rgb/.test(a)
      );
    }, hsl: function (a) {
      return (/^hsl/.test(a)
      );
    }, col: function (a) {
      return h.hex(a) || h.rgb(a) || h.hsl(a);
    } },
      A = function () {
    function a(a, d, b) {
      return (((1 - 3 * b + 3 * d) * a + (3 * b - 6 * d)) * a + 3 * d) * a;
    }return function (c, d, b, f) {
      if (0 <= c && 1 >= c && 0 <= b && 1 >= b) {
        var e = new Float32Array(11);if (c !== d || b !== f) for (var k = 0; 11 > k; ++k) {
          e[k] = a(.1 * k, c, b);
        }return function (k) {
          if (c === d && b === f) return k;if (0 === k) return 0;if (1 === k) return 1;for (var h = 0, l = 1; 10 !== l && e[l] <= k; ++l) {
            h += .1;
          }--l;var l = h + (k - e[l]) / (e[l + 1] - e[l]) * .1,
              n = 3 * (1 - 3 * b + 3 * c) * l * l + 2 * (3 * b - 6 * c) * l + 3 * c;if (.001 <= n) {
            for (h = 0; 4 > h; ++h) {
              n = 3 * (1 - 3 * b + 3 * c) * l * l + 2 * (3 * b - 6 * c) * l + 3 * c;if (0 === n) break;var m = a(l, c, b) - k,
                  l = l - m / n;
            }k = l;
          } else if (0 === n) k = l;else {
            var l = h,
                h = h + .1,
                g = 0;do {
              m = l + (h - l) / 2, n = a(m, c, b) - k, 0 < n ? h = m : l = m;
            } while (1e-7 < Math.abs(n) && 10 > ++g);k = m;
          }return a(k, d, f);
        };
      }
    };
  }(),
      Q = function () {
    function a(a, b) {
      return 0 === a || 1 === a ? a : -Math.pow(2, 10 * (a - 1)) * Math.sin(2 * (a - 1 - b / (2 * Math.PI) * Math.asin(1)) * Math.PI / b);
    }var c = "Quad Cubic Quart Quint Sine Expo Circ Back Elastic".split(" "),
        d = { In: [[.55, .085, .68, .53], [.55, .055, .675, .19], [.895, .03, .685, .22], [.755, .05, .855, .06], [.47, 0, .745, .715], [.95, .05, .795, .035], [.6, .04, .98, .335], [.6, -.28, .735, .045], a], Out: [[.25, .46, .45, .94], [.215, .61, .355, 1], [.165, .84, .44, 1], [.23, 1, .32, 1], [.39, .575, .565, 1], [.19, 1, .22, 1], [.075, .82, .165, 1], [.175, .885, .32, 1.275], function (b, c) {
        return 1 - a(1 - b, c);
      }], InOut: [[.455, .03, .515, .955], [.645, .045, .355, 1], [.77, 0, .175, 1], [.86, 0, .07, 1], [.445, .05, .55, .95], [1, 0, 0, 1], [.785, .135, .15, .86], [.68, -.55, .265, 1.55], function (b, c) {
        return .5 > b ? a(2 * b, c) / 2 : 1 - a(-2 * b + 2, c) / 2;
      }] },
        b = { linear: A(.25, .25, .75, .75) },
        f = {},
        e;for (e in d) {
      f.type = e, d[f.type].forEach(function (a) {
        return function (d, f) {
          b["ease" + a.type + c[f]] = h.fnc(d) ? d : A.apply($jscomp$this, d);
        };
      }(f)), f = { type: f.type };
    }return b;
  }(),
      ha = { css: function (a, c, d) {
      return a.style[c] = d;
    }, attribute: function (a, c, d) {
      return a.setAttribute(c, d);
    }, object: function (a, c, d) {
      return a[c] = d;
    }, transform: function (a, c, d, b, f) {
      b[f] || (b[f] = []);b[f].push(c + "(" + d + ")");
    } },
      v = [],
      B = 0,
      ia = function () {
    function a() {
      B = requestAnimationFrame(c);
    }function c(c) {
      var b = v.length;if (b) {
        for (var d = 0; d < b;) {
          v[d] && v[d].tick(c), d++;
        }a();
      } else cancelAnimationFrame(B), B = 0;
    }return a;
  }();q.version = "2.2.0";q.speed = 1;q.running = v;q.remove = function (a) {
    a = P(a);for (var c = v.length; c--;) {
      for (var d = v[c], b = d.animations, f = b.length; f--;) {
        u(a, b[f].animatable.target) && (b.splice(f, 1), b.length || d.pause());
      }
    }
  };q.getValue = K;q.path = function (a, c) {
    var d = h.str(a) ? e(a)[0] : a,
        b = c || 100;return function (a) {
      return { el: d, property: a, totalLength: N(d) * (b / 100) };
    };
  };q.setDashoffset = function (a) {
    var c = N(a);a.setAttribute("stroke-dasharray", c);return c;
  };q.bezier = A;q.easings = Q;q.timeline = function (a) {
    var c = q(a);c.pause();c.duration = 0;c.add = function (d) {
      c.children.forEach(function (a) {
        a.began = !0;a.completed = !0;
      });m(d).forEach(function (b) {
        var d = z(b, D(S, a || {}));d.targets = d.targets || a.targets;b = c.duration;var e = d.offset;d.autoplay = !1;d.direction = c.direction;d.offset = h.und(e) ? b : L(e, b);c.began = !0;c.completed = !0;c.seek(d.offset);d = q(d);d.began = !0;d.completed = !0;d.duration > b && (c.duration = d.duration);c.children.push(d);
      });c.seek(0);c.reset();c.autoplay && c.restart();return c;
    };return c;
  };q.random = function (a, c) {
    return Math.floor(Math.random() * (c - a + 1)) + a;
  };return q;
});
;(function ($, anim) {
  'use strict';

  var _defaults = {
    accordion: true,
    onOpenStart: undefined,
    onOpenEnd: undefined,
    onCloseStart: undefined,
    onCloseEnd: undefined,
    inDuration: 300,
    outDuration: 300
  };

  /**
   * @class
   *
   */

  var Collapsible = function (_Component) {
    _inherits(Collapsible, _Component);

    /**
     * Construct Collapsible instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Collapsible(el, options) {
      _classCallCheck(this, Collapsible);

      var _this3 = _possibleConstructorReturn(this, (Collapsible.__proto__ || Object.getPrototypeOf(Collapsible)).call(this, Collapsible, el, options));

      _this3.el.M_Collapsible = _this3;

      /**
       * Options for the collapsible
       * @member Collapsible#options
       * @prop {Boolean} [accordion=false] - Type of the collapsible
       * @prop {Function} onOpenStart - Callback function called before collapsible is opened
       * @prop {Function} onOpenEnd - Callback function called after collapsible is opened
       * @prop {Function} onCloseStart - Callback function called before collapsible is closed
       * @prop {Function} onCloseEnd - Callback function called after collapsible is closed
       * @prop {Number} inDuration - Transition in duration in milliseconds.
       * @prop {Number} outDuration - Transition duration in milliseconds.
       */
      _this3.options = $.extend({}, Collapsible.defaults, options);

      // Setup tab indices
      _this3.$headers = _this3.$el.children('li').children('.collapsible-header');
      _this3.$headers.attr('tabindex', 0);

      _this3._setupEventHandlers();

      // Open first active
      var $activeBodies = _this3.$el.children('li.active').children('.collapsible-body');
      if (_this3.options.accordion) {
        // Handle Accordion
        $activeBodies.first().css('display', 'block');
      } else {
        // Handle Expandables
        $activeBodies.css('display', 'block');
      }
      return _this3;
    }

    _createClass(Collapsible, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this.el.M_Collapsible = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        var _this4 = this;

        this._handleCollapsibleClickBound = this._handleCollapsibleClick.bind(this);
        this._handleCollapsibleKeydownBound = this._handleCollapsibleKeydown.bind(this);
        this.el.addEventListener('click', this._handleCollapsibleClickBound);
        this.$headers.each(function (header) {
          header.addEventListener('keydown', _this4._handleCollapsibleKeydownBound);
        });
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        var _this5 = this;

        this.el.removeEventListener('click', this._handleCollapsibleClickBound);
        this.$headers.each(function (header) {
          header.removeEventListener('keydown', _this5._handleCollapsibleKeydownBound);
        });
      }

      /**
       * Handle Collapsible Click
       * @param {Event} e
       */

    }, {
      key: "_handleCollapsibleClick",
      value: function _handleCollapsibleClick(e) {
        var $header = $(e.target).closest('.collapsible-header');
        if (e.target && $header.length) {
          var $collapsible = $header.closest('.collapsible');
          if ($collapsible[0] === this.el) {
            var $collapsibleLi = $header.closest('li');
            var $collapsibleLis = $collapsible.children('li');
            var isActive = $collapsibleLi[0].classList.contains('active');
            var index = $collapsibleLis.index($collapsibleLi);

            if (isActive) {
              this.close(index);
            } else {
              this.open(index);
            }
          }
        }
      }

      /**
       * Handle Collapsible Keydown
       * @param {Event} e
       */

    }, {
      key: "_handleCollapsibleKeydown",
      value: function _handleCollapsibleKeydown(e) {
        if (e.keyCode === 13) {
          this._handleCollapsibleClickBound(e);
        }
      }

      /**
       * Animate in collapsible slide
       * @param {Number} index - 0th index of slide
       */

    }, {
      key: "_animateIn",
      value: function _animateIn(index) {
        var _this6 = this;

        var $collapsibleLi = this.$el.children('li').eq(index);
        if ($collapsibleLi.length) {
          var $body = $collapsibleLi.children('.collapsible-body');

          anim.remove($body[0]);
          $body.css({
            display: 'block',
            overflow: 'hidden',
            height: 0,
            paddingTop: '',
            paddingBottom: ''
          });

          var pTop = $body.css('padding-top');
          var pBottom = $body.css('padding-bottom');
          var finalHeight = $body[0].scrollHeight;
          $body.css({
            paddingTop: 0,
            paddingBottom: 0
          });

          anim({
            targets: $body[0],
            height: finalHeight,
            paddingTop: pTop,
            paddingBottom: pBottom,
            duration: this.options.inDuration,
            easing: 'easeInOutCubic',
            complete: function (anim) {
              $body.css({
                overflow: '',
                paddingTop: '',
                paddingBottom: '',
                height: ''
              });

              // onOpenEnd callback
              if (typeof _this6.options.onOpenEnd === 'function') {
                _this6.options.onOpenEnd.call(_this6, $collapsibleLi[0]);
              }
            }
          });
        }
      }

      /**
       * Animate out collapsible slide
       * @param {Number} index - 0th index of slide to open
       */

    }, {
      key: "_animateOut",
      value: function _animateOut(index) {
        var _this7 = this;

        var $collapsibleLi = this.$el.children('li').eq(index);
        if ($collapsibleLi.length) {
          var $body = $collapsibleLi.children('.collapsible-body');
          anim.remove($body[0]);
          $body.css('overflow', 'hidden');
          anim({
            targets: $body[0],
            height: 0,
            paddingTop: 0,
            paddingBottom: 0,
            duration: this.options.outDuration,
            easing: 'easeInOutCubic',
            complete: function () {
              $body.css({
                height: '',
                overflow: '',
                padding: '',
                display: ''
              });

              // onCloseEnd callback
              if (typeof _this7.options.onCloseEnd === 'function') {
                _this7.options.onCloseEnd.call(_this7, $collapsibleLi[0]);
              }
            }
          });
        }
      }

      /**
       * Open Collapsible
       * @param {Number} index - 0th index of slide
       */

    }, {
      key: "open",
      value: function open(index) {
        var _this8 = this;

        var $collapsibleLi = this.$el.children('li').eq(index);
        if ($collapsibleLi.length && !$collapsibleLi[0].classList.contains('active')) {
          // onOpenStart callback
          if (typeof this.options.onOpenStart === 'function') {
            this.options.onOpenStart.call(this, $collapsibleLi[0]);
          }

          // Handle accordion behavior
          if (this.options.accordion) {
            var $collapsibleLis = this.$el.children('li');
            var $activeLis = this.$el.children('li.active');
            $activeLis.each(function (el) {
              var index = $collapsibleLis.index($(el));
              _this8.close(index);
            });
          }

          // Animate in
          $collapsibleLi[0].classList.add('active');
          this._animateIn(index);
        }
      }

      /**
       * Close Collapsible
       * @param {Number} index - 0th index of slide
       */

    }, {
      key: "close",
      value: function close(index) {
        var $collapsibleLi = this.$el.children('li').eq(index);
        if ($collapsibleLi.length && $collapsibleLi[0].classList.contains('active')) {
          // onCloseStart callback
          if (typeof this.options.onCloseStart === 'function') {
            this.options.onCloseStart.call(this, $collapsibleLi[0]);
          }

          // Animate out
          $collapsibleLi[0].classList.remove('active');
          this._animateOut(index);
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Collapsible.__proto__ || Object.getPrototypeOf(Collapsible), "init", this).call(this, this, els, options);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Collapsible;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Collapsible;
  }(Component);

  M.Collapsible = Collapsible;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Collapsible, 'collapsible', 'M_Collapsible');
  }
})(cash, M.anime);
;(function ($, anim) {
  'use strict';

  var _defaults = {
    alignment: 'left',
    autoFocus: true,
    constrainWidth: true,
    container: null,
    coverTrigger: true,
    closeOnClick: true,
    hover: false,
    inDuration: 150,
    outDuration: 250,
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null,
    onItemClick: null
  };

  /**
   * @class
   */

  var Dropdown = function (_Component2) {
    _inherits(Dropdown, _Component2);

    function Dropdown(el, options) {
      _classCallCheck(this, Dropdown);

      var _this9 = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, Dropdown, el, options));

      _this9.el.M_Dropdown = _this9;
      Dropdown._dropdowns.push(_this9);

      _this9.id = M.getIdFromTrigger(el);
      _this9.dropdownEl = document.getElementById(_this9.id);
      _this9.$dropdownEl = $(_this9.dropdownEl);

      /**
       * Options for the dropdown
       * @member Dropdown#options
       * @prop {String} [alignment='left'] - Edge which the dropdown is aligned to
       * @prop {Boolean} [autoFocus=true] - Automatically focus dropdown el for keyboard
       * @prop {Boolean} [constrainWidth=true] - Constrain width to width of the button
       * @prop {Element} container - Container element to attach dropdown to (optional)
       * @prop {Boolean} [coverTrigger=true] - Place dropdown over trigger
       * @prop {Boolean} [closeOnClick=true] - Close on click of dropdown item
       * @prop {Boolean} [hover=false] - Open dropdown on hover
       * @prop {Number} [inDuration=150] - Duration of open animation in ms
       * @prop {Number} [outDuration=250] - Duration of close animation in ms
       * @prop {Function} onOpenStart - Function called when dropdown starts opening
       * @prop {Function} onOpenEnd - Function called when dropdown finishes opening
       * @prop {Function} onCloseStart - Function called when dropdown starts closing
       * @prop {Function} onCloseEnd - Function called when dropdown finishes closing
       */
      _this9.options = $.extend({}, Dropdown.defaults, options);

      /**
       * Describes open/close state of dropdown
       * @type {Boolean}
       */
      _this9.isOpen = false;

      /**
       * Describes if dropdown content is scrollable
       * @type {Boolean}
       */
      _this9.isScrollable = false;

      /**
       * Describes if touch moving on dropdown content
       * @type {Boolean}
       */
      _this9.isTouchMoving = false;

      _this9.focusedIndex = -1;
      _this9.filterQuery = [];

      // Move dropdown-content after dropdown-trigger
      if (!!_this9.options.container) {
        $(_this9.options.container).append(_this9.dropdownEl);
      } else {
        _this9.$el.after(_this9.dropdownEl);
      }

      _this9._makeDropdownFocusable();
      _this9._resetFilterQueryBound = _this9._resetFilterQuery.bind(_this9);
      _this9._handleDocumentClickBound = _this9._handleDocumentClick.bind(_this9);
      _this9._handleDocumentTouchmoveBound = _this9._handleDocumentTouchmove.bind(_this9);
      _this9._handleDropdownClickBound = _this9._handleDropdownClick.bind(_this9);
      _this9._handleDropdownKeydownBound = _this9._handleDropdownKeydown.bind(_this9);
      _this9._handleTriggerKeydownBound = _this9._handleTriggerKeydown.bind(_this9);
      _this9._setupEventHandlers();
      return _this9;
    }

    _createClass(Dropdown, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._resetDropdownStyles();
        this._removeEventHandlers();
        Dropdown._dropdowns.splice(Dropdown._dropdowns.indexOf(this), 1);
        this.el.M_Dropdown = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        // Trigger keydown handler
        this.el.addEventListener('keydown', this._handleTriggerKeydownBound);

        // Item click handler
        this.dropdownEl.addEventListener('click', this._handleDropdownClickBound);

        // Hover event handlers
        if (this.options.hover) {
          this._handleMouseEnterBound = this._handleMouseEnter.bind(this);
          this.el.addEventListener('mouseenter', this._handleMouseEnterBound);
          this._handleMouseLeaveBound = this._handleMouseLeave.bind(this);
          this.el.addEventListener('mouseleave', this._handleMouseLeaveBound);
          this.dropdownEl.addEventListener('mouseleave', this._handleMouseLeaveBound);

          // Click event handlers
        } else {
          this._handleClickBound = this._handleClick.bind(this);
          this.el.addEventListener('click', this._handleClickBound);
        }
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener('keydown', this._handleTriggerKeydownBound);
        this.dropdownEl.removeEventListener('click', this._handleDropdownClickBound);

        if (this.options.hover) {
          this.el.removeEventListener('mouseenter', this._handleMouseEnterBound);
          this.el.removeEventListener('mouseleave', this._handleMouseLeaveBound);
          this.dropdownEl.removeEventListener('mouseleave', this._handleMouseLeaveBound);
        } else {
          this.el.removeEventListener('click', this._handleClickBound);
        }
      }
    }, {
      key: "_setupTemporaryEventHandlers",
      value: function _setupTemporaryEventHandlers() {
        // Use capture phase event handler to prevent click
        document.body.addEventListener('click', this._handleDocumentClickBound, true);
        document.body.addEventListener('touchend', this._handleDocumentClickBound);
        document.body.addEventListener('touchmove', this._handleDocumentTouchmoveBound);
        this.dropdownEl.addEventListener('keydown', this._handleDropdownKeydownBound);
      }
    }, {
      key: "_removeTemporaryEventHandlers",
      value: function _removeTemporaryEventHandlers() {
        // Use capture phase event handler to prevent click
        document.body.removeEventListener('click', this._handleDocumentClickBound, true);
        document.body.removeEventListener('touchend', this._handleDocumentClickBound);
        document.body.removeEventListener('touchmove', this._handleDocumentTouchmoveBound);
        this.dropdownEl.removeEventListener('keydown', this._handleDropdownKeydownBound);
      }
    }, {
      key: "_handleClick",
      value: function _handleClick(e) {
        e.preventDefault();
        this.open();
      }
    }, {
      key: "_handleMouseEnter",
      value: function _handleMouseEnter() {
        this.open();
      }
    }, {
      key: "_handleMouseLeave",
      value: function _handleMouseLeave(e) {
        var toEl = e.toElement || e.relatedTarget;
        var leaveToDropdownContent = !!$(toEl).closest('.dropdown-content').length;
        var leaveToActiveDropdownTrigger = false;

        var $closestTrigger = $(toEl).closest('.dropdown-trigger');
        if ($closestTrigger.length && !!$closestTrigger[0].M_Dropdown && $closestTrigger[0].M_Dropdown.isOpen) {
          leaveToActiveDropdownTrigger = true;
        }

        // Close hover dropdown if mouse did not leave to either active dropdown-trigger or dropdown-content
        if (!leaveToActiveDropdownTrigger && !leaveToDropdownContent) {
          this.close();
        }
      }
    }, {
      key: "_handleDocumentClick",
      value: function _handleDocumentClick(e) {
        var _this10 = this;

        var $target = $(e.target);
        if (this.options.closeOnClick && $target.closest('.dropdown-content').length && !this.isTouchMoving) {
          // isTouchMoving to check if scrolling on mobile.
          setTimeout(function () {
            _this10.close();
          }, 0);
        } else if ($target.closest('.dropdown-trigger').length || !$target.closest('.dropdown-content').length) {
          setTimeout(function () {
            _this10.close();
          }, 0);
        }
        this.isTouchMoving = false;
      }
    }, {
      key: "_handleTriggerKeydown",
      value: function _handleTriggerKeydown(e) {
        // ARROW DOWN OR ENTER WHEN SELECT IS CLOSED - open Dropdown
        if ((e.which === M.keys.ARROW_DOWN || e.which === M.keys.ENTER) && !this.isOpen) {
          e.preventDefault();
          this.open();
        }
      }

      /**
       * Handle Document Touchmove
       * @param {Event} e
       */

    }, {
      key: "_handleDocumentTouchmove",
      value: function _handleDocumentTouchmove(e) {
        var $target = $(e.target);
        if ($target.closest('.dropdown-content').length) {
          this.isTouchMoving = true;
        }
      }

      /**
       * Handle Dropdown Click
       * @param {Event} e
       */

    }, {
      key: "_handleDropdownClick",
      value: function _handleDropdownClick(e) {
        // onItemClick callback
        if (typeof this.options.onItemClick === 'function') {
          var itemEl = $(e.target).closest('li')[0];
          this.options.onItemClick.call(this, itemEl);
        }
      }

      /**
       * Handle Dropdown Keydown
       * @param {Event} e
       */

    }, {
      key: "_handleDropdownKeydown",
      value: function _handleDropdownKeydown(e) {
        if (e.which === M.keys.TAB) {
          e.preventDefault();
          this.close();

          // Navigate down dropdown list
        } else if ((e.which === M.keys.ARROW_DOWN || e.which === M.keys.ARROW_UP) && this.isOpen) {
          e.preventDefault();
          var direction = e.which === M.keys.ARROW_DOWN ? 1 : -1;
          var newFocusedIndex = this.focusedIndex;
          var foundNewIndex = false;
          do {
            newFocusedIndex = newFocusedIndex + direction;

            if (!!this.dropdownEl.children[newFocusedIndex] && this.dropdownEl.children[newFocusedIndex].tabIndex !== -1) {
              foundNewIndex = true;
              break;
            }
          } while (newFocusedIndex < this.dropdownEl.children.length && newFocusedIndex >= 0);

          if (foundNewIndex) {
            this.focusedIndex = newFocusedIndex;
            this._focusFocusedItem();
          }

          // ENTER selects choice on focused item
        } else if (e.which === M.keys.ENTER && this.isOpen) {
          // Search for <a> and <button>
          var focusedElement = this.dropdownEl.children[this.focusedIndex];
          var $activatableElement = $(focusedElement).find('a, button').first();

          // Click a or button tag if exists, otherwise click li tag
          if (!!$activatableElement.length) {
            $activatableElement[0].click();
          } else if (!!focusedElement) {
            focusedElement.click();
          }

          // Close dropdown on ESC
        } else if (e.which === M.keys.ESC && this.isOpen) {
          e.preventDefault();
          this.close();
        }

        // CASE WHEN USER TYPE LETTERS
        var letter = String.fromCharCode(e.which).toLowerCase(),
            nonLetters = [9, 13, 27, 38, 40];
        if (letter && nonLetters.indexOf(e.which) === -1) {
          this.filterQuery.push(letter);

          var string = this.filterQuery.join(''),
              newOptionEl = $(this.dropdownEl).find('li').filter(function (el) {
            return $(el).text().toLowerCase().indexOf(string) === 0;
          })[0];

          if (newOptionEl) {
            this.focusedIndex = $(newOptionEl).index();
            this._focusFocusedItem();
          }
        }

        this.filterTimeout = setTimeout(this._resetFilterQueryBound, 1000);
      }

      /**
       * Setup dropdown
       */

    }, {
      key: "_resetFilterQuery",
      value: function _resetFilterQuery() {
        this.filterQuery = [];
      }
    }, {
      key: "_resetDropdownStyles",
      value: function _resetDropdownStyles() {
        this.$dropdownEl.css({
          display: '',
          width: '',
          height: '',
          left: '',
          top: '',
          'transform-origin': '',
          transform: '',
          opacity: ''
        });
      }
    }, {
      key: "_makeDropdownFocusable",
      value: function _makeDropdownFocusable() {
        // Needed for arrow key navigation
        this.dropdownEl.tabIndex = 0;

        // Only set tabindex if it hasn't been set by user
        $(this.dropdownEl).children().each(function (el) {
          if (!el.getAttribute('tabindex')) {
            el.setAttribute('tabindex', 0);
          }
        });
      }
    }, {
      key: "_focusFocusedItem",
      value: function _focusFocusedItem() {
        if (this.focusedIndex >= 0 && this.focusedIndex < this.dropdownEl.children.length && this.options.autoFocus) {
          this.dropdownEl.children[this.focusedIndex].focus();
        }
      }
    }, {
      key: "_getDropdownPosition",
      value: function _getDropdownPosition() {
        var offsetParentBRect = this.el.offsetParent.getBoundingClientRect();
        var triggerBRect = this.el.getBoundingClientRect();
        var dropdownBRect = this.dropdownEl.getBoundingClientRect();

        var idealHeight = dropdownBRect.height;
        var idealWidth = dropdownBRect.width;
        var idealXPos = triggerBRect.left - dropdownBRect.left;
        var idealYPos = triggerBRect.top - dropdownBRect.top;

        var dropdownBounds = {
          left: idealXPos,
          top: idealYPos,
          height: idealHeight,
          width: idealWidth
        };

        // Countainer here will be closest ancestor with overflow: hidden
        var closestOverflowParent = !!this.dropdownEl.offsetParent ? this.dropdownEl.offsetParent : this.dropdownEl.parentNode;

        var alignments = M.checkPossibleAlignments(this.el, closestOverflowParent, dropdownBounds, this.options.coverTrigger ? 0 : triggerBRect.height);

        var verticalAlignment = 'top';
        var horizontalAlignment = this.options.alignment;
        idealYPos += this.options.coverTrigger ? 0 : triggerBRect.height;

        // Reset isScrollable
        this.isScrollable = false;

        if (!alignments.top) {
          if (alignments.bottom) {
            verticalAlignment = 'bottom';
          } else {
            this.isScrollable = true;

            // Determine which side has most space and cutoff at correct height
            if (alignments.spaceOnTop > alignments.spaceOnBottom) {
              verticalAlignment = 'bottom';
              idealHeight += alignments.spaceOnTop;
              idealYPos -= alignments.spaceOnTop;
            } else {
              idealHeight += alignments.spaceOnBottom;
            }
          }
        }

        // If preferred horizontal alignment is possible
        if (!alignments[horizontalAlignment]) {
          var oppositeAlignment = horizontalAlignment === 'left' ? 'right' : 'left';
          if (alignments[oppositeAlignment]) {
            horizontalAlignment = oppositeAlignment;
          } else {
            // Determine which side has most space and cutoff at correct height
            if (alignments.spaceOnLeft > alignments.spaceOnRight) {
              horizontalAlignment = 'right';
              idealWidth += alignments.spaceOnLeft;
              idealXPos -= alignments.spaceOnLeft;
            } else {
              horizontalAlignment = 'left';
              idealWidth += alignments.spaceOnRight;
            }
          }
        }

        if (verticalAlignment === 'bottom') {
          idealYPos = idealYPos - dropdownBRect.height + (this.options.coverTrigger ? triggerBRect.height : 0);
        }
        if (horizontalAlignment === 'right') {
          idealXPos = idealXPos - dropdownBRect.width + triggerBRect.width;
        }
        return {
          x: idealXPos,
          y: idealYPos,
          verticalAlignment: verticalAlignment,
          horizontalAlignment: horizontalAlignment,
          height: idealHeight,
          width: idealWidth
        };
      }

      /**
       * Animate in dropdown
       */

    }, {
      key: "_animateIn",
      value: function _animateIn() {
        var _this11 = this;

        anim.remove(this.dropdownEl);
        anim({
          targets: this.dropdownEl,
          opacity: {
            value: [0, 1],
            easing: 'easeOutQuad'
          },
          scaleX: [0.3, 1],
          scaleY: [0.3, 1],
          duration: this.options.inDuration,
          easing: 'easeOutQuint',
          complete: function (anim) {
            if (_this11.options.autoFocus) {
              _this11.dropdownEl.focus();
            }

            // onOpenEnd callback
            if (typeof _this11.options.onOpenEnd === 'function') {
              _this11.options.onOpenEnd.call(_this11, _this11.el);
            }
          }
        });
      }

      /**
       * Animate out dropdown
       */

    }, {
      key: "_animateOut",
      value: function _animateOut() {
        var _this12 = this;

        anim.remove(this.dropdownEl);
        anim({
          targets: this.dropdownEl,
          opacity: {
            value: 0,
            easing: 'easeOutQuint'
          },
          scaleX: 0.3,
          scaleY: 0.3,
          duration: this.options.outDuration,
          easing: 'easeOutQuint',
          complete: function (anim) {
            _this12._resetDropdownStyles();

            // onCloseEnd callback
            if (typeof _this12.options.onCloseEnd === 'function') {
              _this12.options.onCloseEnd.call(_this12, _this12.el);
            }
          }
        });
      }

      /**
       * Place dropdown
       */

    }, {
      key: "_placeDropdown",
      value: function _placeDropdown() {
        // Set width before calculating positionInfo
        var idealWidth = this.options.constrainWidth ? this.el.getBoundingClientRect().width : this.dropdownEl.getBoundingClientRect().width;
        this.dropdownEl.style.width = idealWidth + 'px';

        var positionInfo = this._getDropdownPosition();
        this.dropdownEl.style.left = positionInfo.x + 'px';
        this.dropdownEl.style.top = positionInfo.y + 'px';
        this.dropdownEl.style.height = positionInfo.height + 'px';
        this.dropdownEl.style.width = positionInfo.width + 'px';
        this.dropdownEl.style.transformOrigin = (positionInfo.horizontalAlignment === 'left' ? '0' : '100%') + " " + (positionInfo.verticalAlignment === 'top' ? '0' : '100%');
      }

      /**
       * Open Dropdown
       */

    }, {
      key: "open",
      value: function open() {
        if (this.isOpen) {
          return;
        }
        this.isOpen = true;

        // onOpenStart callback
        if (typeof this.options.onOpenStart === 'function') {
          this.options.onOpenStart.call(this, this.el);
        }

        // Reset styles
        this._resetDropdownStyles();
        this.dropdownEl.style.display = 'block';

        this._placeDropdown();
        this._animateIn();
        this._setupTemporaryEventHandlers();
      }

      /**
       * Close Dropdown
       */

    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }
        this.isOpen = false;
        this.focusedIndex = -1;

        // onCloseStart callback
        if (typeof this.options.onCloseStart === 'function') {
          this.options.onCloseStart.call(this, this.el);
        }

        this._animateOut();
        this._removeTemporaryEventHandlers();

        if (this.options.autoFocus) {
          this.el.focus();
        }
      }

      /**
       * Recalculate dimensions
       */

    }, {
      key: "recalculateDimensions",
      value: function recalculateDimensions() {
        if (this.isOpen) {
          this.$dropdownEl.css({
            width: '',
            height: '',
            left: '',
            top: '',
            'transform-origin': ''
          });
          this._placeDropdown();
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Dropdown.__proto__ || Object.getPrototypeOf(Dropdown), "init", this).call(this, this, els, options);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Dropdown;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Dropdown;
  }(Component);

  /**
   * @static
   * @memberof Dropdown
   */


  Dropdown._dropdowns = [];

  M.Dropdown = Dropdown;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Dropdown, 'dropdown', 'M_Dropdown');
  }
})(cash, M.anime);
;(function ($, anim) {
  'use strict';

  var _defaults = {
    opacity: 0.5,
    inDuration: 250,
    outDuration: 250,
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null,
    preventScrolling: true,
    dismissible: true,
    startingTop: '4%',
    endingTop: '10%'
  };

  /**
   * @class
   *
   */

  var Modal = function (_Component3) {
    _inherits(Modal, _Component3);

    /**
     * Construct Modal instance and set up overlay
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Modal(el, options) {
      _classCallCheck(this, Modal);

      var _this13 = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, Modal, el, options));

      _this13.el.M_Modal = _this13;

      /**
       * Options for the modal
       * @member Modal#options
       * @prop {Number} [opacity=0.5] - Opacity of the modal overlay
       * @prop {Number} [inDuration=250] - Length in ms of enter transition
       * @prop {Number} [outDuration=250] - Length in ms of exit transition
       * @prop {Function} onOpenStart - Callback function called before modal is opened
       * @prop {Function} onOpenEnd - Callback function called after modal is opened
       * @prop {Function} onCloseStart - Callback function called before modal is closed
       * @prop {Function} onCloseEnd - Callback function called after modal is closed
       * @prop {Boolean} [dismissible=true] - Allow modal to be dismissed by keyboard or overlay click
       * @prop {String} [startingTop='4%'] - startingTop
       * @prop {String} [endingTop='10%'] - endingTop
       */
      _this13.options = $.extend({}, Modal.defaults, options);

      /**
       * Describes open/close state of modal
       * @type {Boolean}
       */
      _this13.isOpen = false;

      _this13.id = _this13.$el.attr('id');
      _this13._openingTrigger = undefined;
      _this13.$overlay = $('<div class="modal-overlay"></div>');
      _this13.el.tabIndex = 0;
      _this13._nthModalOpened = 0;

      Modal._count++;
      _this13._setupEventHandlers();
      return _this13;
    }

    _createClass(Modal, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        Modal._count--;
        this._removeEventHandlers();
        this.el.removeAttribute('style');
        this.$overlay.remove();
        this.el.M_Modal = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleOverlayClickBound = this._handleOverlayClick.bind(this);
        this._handleModalCloseClickBound = this._handleModalCloseClick.bind(this);

        if (Modal._count === 1) {
          document.body.addEventListener('click', this._handleTriggerClick);
        }
        this.$overlay[0].addEventListener('click', this._handleOverlayClickBound);
        this.el.addEventListener('click', this._handleModalCloseClickBound);
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        if (Modal._count === 0) {
          document.body.removeEventListener('click', this._handleTriggerClick);
        }
        this.$overlay[0].removeEventListener('click', this._handleOverlayClickBound);
        this.el.removeEventListener('click', this._handleModalCloseClickBound);
      }

      /**
       * Handle Trigger Click
       * @param {Event} e
       */

    }, {
      key: "_handleTriggerClick",
      value: function _handleTriggerClick(e) {
        var $trigger = $(e.target).closest('.modal-trigger');
        if ($trigger.length) {
          var modalId = M.getIdFromTrigger($trigger[0]);
          var modalInstance = document.getElementById(modalId).M_Modal;
          if (modalInstance) {
            modalInstance.open($trigger);
          }
          e.preventDefault();
        }
      }

      /**
       * Handle Overlay Click
       */

    }, {
      key: "_handleOverlayClick",
      value: function _handleOverlayClick() {
        if (this.options.dismissible) {
          this.close();
        }
      }

      /**
       * Handle Modal Close Click
       * @param {Event} e
       */

    }, {
      key: "_handleModalCloseClick",
      value: function _handleModalCloseClick(e) {
        var $closeTrigger = $(e.target).closest('.modal-close');
        if ($closeTrigger.length) {
          this.close();
        }
      }

      /**
       * Handle Keydown
       * @param {Event} e
       */

    }, {
      key: "_handleKeydown",
      value: function _handleKeydown(e) {
        // ESC key
        if (e.keyCode === 27 && this.options.dismissible) {
          this.close();
        }
      }

      /**
       * Handle Focus
       * @param {Event} e
       */

    }, {
      key: "_handleFocus",
      value: function _handleFocus(e) {
        // Only trap focus if this modal is the last model opened (prevents loops in nested modals).
        if (!this.el.contains(e.target) && this._nthModalOpened === Modal._modalsOpen) {
          this.el.focus();
        }
      }

      /**
       * Animate in modal
       */

    }, {
      key: "_animateIn",
      value: function _animateIn() {
        var _this14 = this;

        // Set initial styles
        $.extend(this.el.style, {
          display: 'block',
          opacity: 0
        });
        $.extend(this.$overlay[0].style, {
          display: 'block',
          opacity: 0
        });

        // Animate overlay
        anim({
          targets: this.$overlay[0],
          opacity: this.options.opacity,
          duration: this.options.inDuration,
          easing: 'easeOutQuad'
        });

        // Define modal animation options
        var enterAnimOptions = {
          targets: this.el,
          duration: this.options.inDuration,
          easing: 'easeOutCubic',
          // Handle modal onOpenEnd callback
          complete: function () {
            if (typeof _this14.options.onOpenEnd === 'function') {
              _this14.options.onOpenEnd.call(_this14, _this14.el, _this14._openingTrigger);
            }
          }
        };

        // Bottom sheet animation
        if (this.el.classList.contains('bottom-sheet')) {
          $.extend(enterAnimOptions, {
            bottom: 0,
            opacity: 1
          });
          anim(enterAnimOptions);

          // Normal modal animation
        } else {
          $.extend(enterAnimOptions, {
            top: [this.options.startingTop, this.options.endingTop],
            opacity: 1,
            scaleX: [0.8, 1],
            scaleY: [0.8, 1]
          });
          anim(enterAnimOptions);
        }
      }

      /**
       * Animate out modal
       */

    }, {
      key: "_animateOut",
      value: function _animateOut() {
        var _this15 = this;

        // Animate overlay
        anim({
          targets: this.$overlay[0],
          opacity: 0,
          duration: this.options.outDuration,
          easing: 'easeOutQuart'
        });

        // Define modal animation options
        var exitAnimOptions = {
          targets: this.el,
          duration: this.options.outDuration,
          easing: 'easeOutCubic',
          // Handle modal ready callback
          complete: function () {
            _this15.el.style.display = 'none';
            _this15.$overlay.remove();

            // Call onCloseEnd callback
            if (typeof _this15.options.onCloseEnd === 'function') {
              _this15.options.onCloseEnd.call(_this15, _this15.el);
            }
          }
        };

        // Bottom sheet animation
        if (this.el.classList.contains('bottom-sheet')) {
          $.extend(exitAnimOptions, {
            bottom: '-100%',
            opacity: 0
          });
          anim(exitAnimOptions);

          // Normal modal animation
        } else {
          $.extend(exitAnimOptions, {
            top: [this.options.endingTop, this.options.startingTop],
            opacity: 0,
            scaleX: 0.8,
            scaleY: 0.8
          });
          anim(exitAnimOptions);
        }
      }

      /**
       * Open Modal
       * @param {cash} [$trigger]
       */

    }, {
      key: "open",
      value: function open($trigger) {
        if (this.isOpen) {
          return;
        }

        this.isOpen = true;
        Modal._modalsOpen++;
        this._nthModalOpened = Modal._modalsOpen;

        // Set Z-Index based on number of currently open modals
        this.$overlay[0].style.zIndex = 1000 + Modal._modalsOpen * 2;
        this.el.style.zIndex = 1000 + Modal._modalsOpen * 2 + 1;

        // Set opening trigger, undefined indicates modal was opened by javascript
        this._openingTrigger = !!$trigger ? $trigger[0] : undefined;

        // onOpenStart callback
        if (typeof this.options.onOpenStart === 'function') {
          this.options.onOpenStart.call(this, this.el, this._openingTrigger);
        }

        if (this.options.preventScrolling) {
          document.body.style.overflow = 'hidden';
        }

        this.el.classList.add('open');
        this.el.insertAdjacentElement('afterend', this.$overlay[0]);

        if (this.options.dismissible) {
          this._handleKeydownBound = this._handleKeydown.bind(this);
          this._handleFocusBound = this._handleFocus.bind(this);
          document.addEventListener('keydown', this._handleKeydownBound);
          document.addEventListener('focus', this._handleFocusBound, true);
        }

        anim.remove(this.el);
        anim.remove(this.$overlay[0]);
        this._animateIn();

        // Focus modal
        this.el.focus();

        return this;
      }

      /**
       * Close Modal
       */

    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }

        this.isOpen = false;
        Modal._modalsOpen--;
        this._nthModalOpened = 0;

        // Call onCloseStart callback
        if (typeof this.options.onCloseStart === 'function') {
          this.options.onCloseStart.call(this, this.el);
        }

        this.el.classList.remove('open');

        // Enable body scrolling only if there are no more modals open.
        if (Modal._modalsOpen === 0) {
          document.body.style.overflow = '';
        }

        if (this.options.dismissible) {
          document.removeEventListener('keydown', this._handleKeydownBound);
          document.removeEventListener('focus', this._handleFocusBound, true);
        }

        anim.remove(this.el);
        anim.remove(this.$overlay[0]);
        this._animateOut();
        return this;
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Modal.__proto__ || Object.getPrototypeOf(Modal), "init", this).call(this, this, els, options);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Modal;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Modal;
  }(Component);

  /**
   * @static
   * @memberof Modal
   */


  Modal._modalsOpen = 0;

  /**
   * @static
   * @memberof Modal
   */
  Modal._count = 0;

  M.Modal = Modal;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Modal, 'modal', 'M_Modal');
  }
})(cash, M.anime);
;(function ($, anim) {
  'use strict';

  var _defaults = {
    inDuration: 275,
    outDuration: 200,
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null
  };

  /**
   * @class
   *
   */

  var Materialbox = function (_Component4) {
    _inherits(Materialbox, _Component4);

    /**
     * Construct Materialbox instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Materialbox(el, options) {
      _classCallCheck(this, Materialbox);

      var _this16 = _possibleConstructorReturn(this, (Materialbox.__proto__ || Object.getPrototypeOf(Materialbox)).call(this, Materialbox, el, options));

      _this16.el.M_Materialbox = _this16;

      /**
       * Options for the modal
       * @member Materialbox#options
       * @prop {Number} [inDuration=275] - Length in ms of enter transition
       * @prop {Number} [outDuration=200] - Length in ms of exit transition
       * @prop {Function} onOpenStart - Callback function called before materialbox is opened
       * @prop {Function} onOpenEnd - Callback function called after materialbox is opened
       * @prop {Function} onCloseStart - Callback function called before materialbox is closed
       * @prop {Function} onCloseEnd - Callback function called after materialbox is closed
       */
      _this16.options = $.extend({}, Materialbox.defaults, options);

      _this16.overlayActive = false;
      _this16.doneAnimating = true;
      _this16.placeholder = $('<div></div>').addClass('material-placeholder');
      _this16.originalWidth = 0;
      _this16.originalHeight = 0;
      _this16.originInlineStyles = _this16.$el.attr('style');
      _this16.caption = _this16.el.getAttribute('data-caption') || '';

      // Wrap
      _this16.$el.before(_this16.placeholder);
      _this16.placeholder.append(_this16.$el);

      _this16._setupEventHandlers();
      return _this16;
    }

    _createClass(Materialbox, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this.el.M_Materialbox = undefined;

        // Unwrap image
        $(this.placeholder).after(this.el).remove();

        this.$el.removeAttr('style');
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleMaterialboxClickBound = this._handleMaterialboxClick.bind(this);
        this.el.addEventListener('click', this._handleMaterialboxClickBound);
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener('click', this._handleMaterialboxClickBound);
      }

      /**
       * Handle Materialbox Click
       * @param {Event} e
       */

    }, {
      key: "_handleMaterialboxClick",
      value: function _handleMaterialboxClick(e) {
        // If already modal, return to original
        if (this.doneAnimating === false || this.overlayActive && this.doneAnimating) {
          this.close();
        } else {
          this.open();
        }
      }

      /**
       * Handle Window Scroll
       */

    }, {
      key: "_handleWindowScroll",
      value: function _handleWindowScroll() {
        if (this.overlayActive) {
          this.close();
        }
      }

      /**
       * Handle Window Resize
       */

    }, {
      key: "_handleWindowResize",
      value: function _handleWindowResize() {
        if (this.overlayActive) {
          this.close();
        }
      }

      /**
       * Handle Window Resize
       * @param {Event} e
       */

    }, {
      key: "_handleWindowEscape",
      value: function _handleWindowEscape(e) {
        // ESC key
        if (e.keyCode === 27 && this.doneAnimating && this.overlayActive) {
          this.close();
        }
      }

      /**
       * Find ancestors with overflow: hidden; and make visible
       */

    }, {
      key: "_makeAncestorsOverflowVisible",
      value: function _makeAncestorsOverflowVisible() {
        this.ancestorsChanged = $();
        var ancestor = this.placeholder[0].parentNode;
        while (ancestor !== null && !$(ancestor).is(document)) {
          var curr = $(ancestor);
          if (curr.css('overflow') !== 'visible') {
            curr.css('overflow', 'visible');
            if (this.ancestorsChanged === undefined) {
              this.ancestorsChanged = curr;
            } else {
              this.ancestorsChanged = this.ancestorsChanged.add(curr);
            }
          }
          ancestor = ancestor.parentNode;
        }
      }

      /**
       * Animate image in
       */

    }, {
      key: "_animateImageIn",
      value: function _animateImageIn() {
        var _this17 = this;

        var animOptions = {
          targets: this.el,
          height: [this.originalHeight, this.newHeight],
          width: [this.originalWidth, this.newWidth],
          left: M.getDocumentScrollLeft() + this.windowWidth / 2 - this.placeholder.offset().left - this.newWidth / 2,
          top: M.getDocumentScrollTop() + this.windowHeight / 2 - this.placeholder.offset().top - this.newHeight / 2,
          duration: this.options.inDuration,
          easing: 'easeOutQuad',
          complete: function () {
            _this17.doneAnimating = true;

            // onOpenEnd callback
            if (typeof _this17.options.onOpenEnd === 'function') {
              _this17.options.onOpenEnd.call(_this17, _this17.el);
            }
          }
        };

        // Override max-width or max-height if needed
        this.maxWidth = this.$el.css('max-width');
        this.maxHeight = this.$el.css('max-height');
        if (this.maxWidth !== 'none') {
          animOptions.maxWidth = this.newWidth;
        }
        if (this.maxHeight !== 'none') {
          animOptions.maxHeight = this.newHeight;
        }

        anim(animOptions);
      }

      /**
       * Animate image out
       */

    }, {
      key: "_animateImageOut",
      value: function _animateImageOut() {
        var _this18 = this;

        var animOptions = {
          targets: this.el,
          width: this.originalWidth,
          height: this.originalHeight,
          left: 0,
          top: 0,
          duration: this.options.outDuration,
          easing: 'easeOutQuad',
          complete: function () {
            _this18.placeholder.css({
              height: '',
              width: '',
              position: '',
              top: '',
              left: ''
            });

            // Revert to width or height attribute
            if (_this18.attrWidth) {
              _this18.$el.attr('width', _this18.attrWidth);
            }
            if (_this18.attrHeight) {
              _this18.$el.attr('height', _this18.attrHeight);
            }

            _this18.$el.removeAttr('style');
            _this18.originInlineStyles && _this18.$el.attr('style', _this18.originInlineStyles);

            // Remove class
            _this18.$el.removeClass('active');
            _this18.doneAnimating = true;

            // Remove overflow overrides on ancestors
            if (_this18.ancestorsChanged.length) {
              _this18.ancestorsChanged.css('overflow', '');
            }

            // onCloseEnd callback
            if (typeof _this18.options.onCloseEnd === 'function') {
              _this18.options.onCloseEnd.call(_this18, _this18.el);
            }
          }
        };

        anim(animOptions);
      }

      /**
       * Update open and close vars
       */

    }, {
      key: "_updateVars",
      value: function _updateVars() {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        this.caption = this.el.getAttribute('data-caption') || '';
      }

      /**
       * Open Materialbox
       */

    }, {
      key: "open",
      value: function open() {
        var _this19 = this;

        this._updateVars();
        this.originalWidth = this.el.getBoundingClientRect().width;
        this.originalHeight = this.el.getBoundingClientRect().height;

        // Set states
        this.doneAnimating = false;
        this.$el.addClass('active');
        this.overlayActive = true;

        // onOpenStart callback
        if (typeof this.options.onOpenStart === 'function') {
          this.options.onOpenStart.call(this, this.el);
        }

        // Set positioning for placeholder
        this.placeholder.css({
          width: this.placeholder[0].getBoundingClientRect().width + 'px',
          height: this.placeholder[0].getBoundingClientRect().height + 'px',
          position: 'relative',
          top: 0,
          left: 0
        });

        this._makeAncestorsOverflowVisible();

        // Set css on origin
        this.$el.css({
          position: 'absolute',
          'z-index': 1000,
          'will-change': 'left, top, width, height'
        });

        // Change from width or height attribute to css
        this.attrWidth = this.$el.attr('width');
        this.attrHeight = this.$el.attr('height');
        if (this.attrWidth) {
          this.$el.css('width', this.attrWidth + 'px');
          this.$el.removeAttr('width');
        }
        if (this.attrHeight) {
          this.$el.css('width', this.attrHeight + 'px');
          this.$el.removeAttr('height');
        }

        // Add overlay
        this.$overlay = $('<div id="materialbox-overlay"></div>').css({
          opacity: 0
        }).one('click', function () {
          if (_this19.doneAnimating) {
            _this19.close();
          }
        });

        // Put before in origin image to preserve z-index layering.
        this.$el.before(this.$overlay);

        // Set dimensions if needed
        var overlayOffset = this.$overlay[0].getBoundingClientRect();
        this.$overlay.css({
          width: this.windowWidth + 'px',
          height: this.windowHeight + 'px',
          left: -1 * overlayOffset.left + 'px',
          top: -1 * overlayOffset.top + 'px'
        });

        anim.remove(this.el);
        anim.remove(this.$overlay[0]);

        // Animate Overlay
        anim({
          targets: this.$overlay[0],
          opacity: 1,
          duration: this.options.inDuration,
          easing: 'easeOutQuad'
        });

        // Add and animate caption if it exists
        if (this.caption !== '') {
          if (this.$photocaption) {
            anim.remove(this.$photoCaption[0]);
          }
          this.$photoCaption = $('<div class="materialbox-caption"></div>');
          this.$photoCaption.text(this.caption);
          $('body').append(this.$photoCaption);
          this.$photoCaption.css({ display: 'inline' });

          anim({
            targets: this.$photoCaption[0],
            opacity: 1,
            duration: this.options.inDuration,
            easing: 'easeOutQuad'
          });
        }

        // Resize Image
        var ratio = 0;
        var widthPercent = this.originalWidth / this.windowWidth;
        var heightPercent = this.originalHeight / this.windowHeight;
        this.newWidth = 0;
        this.newHeight = 0;

        if (widthPercent > heightPercent) {
          ratio = this.originalHeight / this.originalWidth;
          this.newWidth = this.windowWidth * 0.9;
          this.newHeight = this.windowWidth * 0.9 * ratio;
        } else {
          ratio = this.originalWidth / this.originalHeight;
          this.newWidth = this.windowHeight * 0.9 * ratio;
          this.newHeight = this.windowHeight * 0.9;
        }

        this._animateImageIn();

        // Handle Exit triggers
        this._handleWindowScrollBound = this._handleWindowScroll.bind(this);
        this._handleWindowResizeBound = this._handleWindowResize.bind(this);
        this._handleWindowEscapeBound = this._handleWindowEscape.bind(this);

        window.addEventListener('scroll', this._handleWindowScrollBound);
        window.addEventListener('resize', this._handleWindowResizeBound);
        window.addEventListener('keyup', this._handleWindowEscapeBound);
      }

      /**
       * Close Materialbox
       */

    }, {
      key: "close",
      value: function close() {
        var _this20 = this;

        this._updateVars();
        this.doneAnimating = false;

        // onCloseStart callback
        if (typeof this.options.onCloseStart === 'function') {
          this.options.onCloseStart.call(this, this.el);
        }

        anim.remove(this.el);
        anim.remove(this.$overlay[0]);

        if (this.caption !== '') {
          anim.remove(this.$photoCaption[0]);
        }

        // disable exit handlers
        window.removeEventListener('scroll', this._handleWindowScrollBound);
        window.removeEventListener('resize', this._handleWindowResizeBound);
        window.removeEventListener('keyup', this._handleWindowEscapeBound);

        anim({
          targets: this.$overlay[0],
          opacity: 0,
          duration: this.options.outDuration,
          easing: 'easeOutQuad',
          complete: function () {
            _this20.overlayActive = false;
            _this20.$overlay.remove();
          }
        });

        this._animateImageOut();

        // Remove Caption + reset css settings on image
        if (this.caption !== '') {
          anim({
            targets: this.$photoCaption[0],
            opacity: 0,
            duration: this.options.outDuration,
            easing: 'easeOutQuad',
            complete: function () {
              _this20.$photoCaption.remove();
            }
          });
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Materialbox.__proto__ || Object.getPrototypeOf(Materialbox), "init", this).call(this, this, els, options);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Materialbox;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Materialbox;
  }(Component);

  M.Materialbox = Materialbox;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Materialbox, 'materialbox', 'M_Materialbox');
  }
})(cash, M.anime);
;(function ($) {
  'use strict';

  var _defaults = {
    responsiveThreshold: 0 // breakpoint for swipeable
  };

  var Parallax = function (_Component5) {
    _inherits(Parallax, _Component5);

    function Parallax(el, options) {
      _classCallCheck(this, Parallax);

      var _this21 = _possibleConstructorReturn(this, (Parallax.__proto__ || Object.getPrototypeOf(Parallax)).call(this, Parallax, el, options));

      _this21.el.M_Parallax = _this21;

      /**
       * Options for the Parallax
       * @member Parallax#options
       * @prop {Number} responsiveThreshold
       */
      _this21.options = $.extend({}, Parallax.defaults, options);
      _this21._enabled = window.innerWidth > _this21.options.responsiveThreshold;

      _this21.$img = _this21.$el.find('img').first();
      _this21.$img.each(function () {
        var el = this;
        if (el.complete) $(el).trigger('load');
      });

      _this21._updateParallax();
      _this21._setupEventHandlers();
      _this21._setupStyles();

      Parallax._parallaxes.push(_this21);
      return _this21;
    }

    _createClass(Parallax, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        Parallax._parallaxes.splice(Parallax._parallaxes.indexOf(this), 1);
        this.$img[0].style.transform = '';
        this._removeEventHandlers();

        this.$el[0].M_Parallax = undefined;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleImageLoadBound = this._handleImageLoad.bind(this);
        this.$img[0].addEventListener('load', this._handleImageLoadBound);

        if (Parallax._parallaxes.length === 0) {
          Parallax._handleScrollThrottled = M.throttle(Parallax._handleScroll, 5);
          window.addEventListener('scroll', Parallax._handleScrollThrottled);

          Parallax._handleWindowResizeThrottled = M.throttle(Parallax._handleWindowResize, 5);
          window.addEventListener('resize', Parallax._handleWindowResizeThrottled);
        }
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.$img[0].removeEventListener('load', this._handleImageLoadBound);

        if (Parallax._parallaxes.length === 0) {
          window.removeEventListener('scroll', Parallax._handleScrollThrottled);
          window.removeEventListener('resize', Parallax._handleWindowResizeThrottled);
        }
      }
    }, {
      key: "_setupStyles",
      value: function _setupStyles() {
        this.$img[0].style.opacity = 1;
      }
    }, {
      key: "_handleImageLoad",
      value: function _handleImageLoad() {
        this._updateParallax();
      }
    }, {
      key: "_updateParallax",
      value: function _updateParallax() {
        var containerHeight = this.$el.height() > 0 ? this.el.parentNode.offsetHeight : 500;
        var imgHeight = this.$img[0].offsetHeight;
        var parallaxDist = imgHeight - containerHeight;
        var bottom = this.$el.offset().top + containerHeight;
        var top = this.$el.offset().top;
        var scrollTop = M.getDocumentScrollTop();
        var windowHeight = window.innerHeight;
        var windowBottom = scrollTop + windowHeight;
        var percentScrolled = (windowBottom - top) / (containerHeight + windowHeight);
        var parallax = parallaxDist * percentScrolled;

        if (!this._enabled) {
          this.$img[0].style.transform = '';
        } else if (bottom > scrollTop && top < scrollTop + windowHeight) {
          this.$img[0].style.transform = "translate3D(-50%, " + parallax + "px, 0)";
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Parallax.__proto__ || Object.getPrototypeOf(Parallax), "init", this).call(this, this, els, options);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Parallax;
      }
    }, {
      key: "_handleScroll",
      value: function _handleScroll() {
        for (var i = 0; i < Parallax._parallaxes.length; i++) {
          var parallaxInstance = Parallax._parallaxes[i];
          parallaxInstance._updateParallax.call(parallaxInstance);
        }
      }
    }, {
      key: "_handleWindowResize",
      value: function _handleWindowResize() {
        for (var i = 0; i < Parallax._parallaxes.length; i++) {
          var parallaxInstance = Parallax._parallaxes[i];
          parallaxInstance._enabled = window.innerWidth > parallaxInstance.options.responsiveThreshold;
        }
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Parallax;
  }(Component);

  /**
   * @static
   * @memberof Parallax
   */


  Parallax._parallaxes = [];

  M.Parallax = Parallax;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Parallax, 'parallax', 'M_Parallax');
  }
})(cash);
;(function ($, anim) {
  'use strict';

  var _defaults = {
    duration: 300,
    onShow: null,
    swipeable: false,
    responsiveThreshold: Infinity // breakpoint for swipeable
  };

  /**
   * @class
   *
   */

  var Tabs = function (_Component6) {
    _inherits(Tabs, _Component6);

    /**
     * Construct Tabs instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Tabs(el, options) {
      _classCallCheck(this, Tabs);

      var _this22 = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, Tabs, el, options));

      _this22.el.M_Tabs = _this22;

      /**
       * Options for the Tabs
       * @member Tabs#options
       * @prop {Number} duration
       * @prop {Function} onShow
       * @prop {Boolean} swipeable
       * @prop {Number} responsiveThreshold
       */
      _this22.options = $.extend({}, Tabs.defaults, options);

      // Setup
      _this22.$tabLinks = _this22.$el.children('li.tab').children('a');
      _this22.index = 0;
      _this22._setupActiveTabLink();

      // Setup tabs content
      if (_this22.options.swipeable) {
        _this22._setupSwipeableTabs();
      } else {
        _this22._setupNormalTabs();
      }

      // Setup tabs indicator after content to ensure accurate widths
      _this22._setTabsAndTabWidth();
      _this22._createIndicator();

      _this22._setupEventHandlers();
      return _this22;
    }

    _createClass(Tabs, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this._indicator.parentNode.removeChild(this._indicator);

        if (this.options.swipeable) {
          this._teardownSwipeableTabs();
        } else {
          this._teardownNormalTabs();
        }

        this.$el[0].M_Tabs = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleWindowResizeBound = this._handleWindowResize.bind(this);
        window.addEventListener('resize', this._handleWindowResizeBound);

        this._handleTabClickBound = this._handleTabClick.bind(this);
        this.el.addEventListener('click', this._handleTabClickBound);
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        window.removeEventListener('resize', this._handleWindowResizeBound);
        this.el.removeEventListener('click', this._handleTabClickBound);
      }

      /**
       * Handle window Resize
       */

    }, {
      key: "_handleWindowResize",
      value: function _handleWindowResize() {
        this._setTabsAndTabWidth();

        if (this.tabWidth !== 0 && this.tabsWidth !== 0) {
          this._indicator.style.left = this._calcLeftPos(this.$activeTabLink) + 'px';
          this._indicator.style.right = this._calcRightPos(this.$activeTabLink) + 'px';
        }
      }

      /**
       * Handle tab click
       * @param {Event} e
       */

    }, {
      key: "_handleTabClick",
      value: function _handleTabClick(e) {
        var _this23 = this;

        var tab = $(e.target).closest('li.tab');
        var tabLink = $(e.target).closest('a');

        // Handle click on tab link only
        if (!tabLink.length || !tabLink.parent().hasClass('tab')) {
          return;
        }

        if (tab.hasClass('disabled')) {
          e.preventDefault();
          return;
        }

        // Act as regular link if target attribute is specified.
        if (!!tabLink.attr('target')) {
          return;
        }

        // Make the old tab inactive.
        this.$activeTabLink.removeClass('active');
        var $oldContent = this.$content;

        // Update the variables with the new link and content
        this.$activeTabLink = tabLink;
        this.$content = $(M.escapeHash(tabLink[0].hash));
        this.$tabLinks = this.$el.children('li.tab').children('a');

        // Make the tab active.
        this.$activeTabLink.addClass('active');
        var prevIndex = this.index;
        this.index = Math.max(this.$tabLinks.index(tabLink), 0);

        // Swap content
        if (this.options.swipeable) {
          if (this._tabsCarousel) {
            this._tabsCarousel.set(this.index, function () {
              if (typeof _this23.options.onShow === 'function') {
                _this23.options.onShow.call(_this23, _this23.$content[0]);
              }
            });
          }
        } else {
          if (this.$content.length) {
            this.$content[0].style.display = 'block';
            this.$content.addClass('active');
            if (typeof this.options.onShow === 'function') {
              this.options.onShow.call(this, this.$content[0]);
            }

            if ($oldContent.length && !$oldContent.is(this.$content)) {
              $oldContent[0].style.display = 'none';
              $oldContent.removeClass('active');
            }
          }
        }

        // Update widths after content is swapped (scrollbar bugfix)
        this._setTabsAndTabWidth();

        // Update indicator
        this._animateIndicator(prevIndex);

        // Prevent the anchor's default click action
        e.preventDefault();
      }

      /**
       * Generate elements for tab indicator.
       */

    }, {
      key: "_createIndicator",
      value: function _createIndicator() {
        var _this24 = this;

        var indicator = document.createElement('li');
        indicator.classList.add('indicator');

        this.el.appendChild(indicator);
        this._indicator = indicator;

        setTimeout(function () {
          _this24._indicator.style.left = _this24._calcLeftPos(_this24.$activeTabLink) + 'px';
          _this24._indicator.style.right = _this24._calcRightPos(_this24.$activeTabLink) + 'px';
        }, 0);
      }

      /**
       * Setup first active tab link.
       */

    }, {
      key: "_setupActiveTabLink",
      value: function _setupActiveTabLink() {
        // If the location.hash matches one of the links, use that as the active tab.
        this.$activeTabLink = $(this.$tabLinks.filter('[href="' + location.hash + '"]'));

        // If no match is found, use the first link or any with class 'active' as the initial active tab.
        if (this.$activeTabLink.length === 0) {
          this.$activeTabLink = this.$el.children('li.tab').children('a.active').first();
        }
        if (this.$activeTabLink.length === 0) {
          this.$activeTabLink = this.$el.children('li.tab').children('a').first();
        }

        this.$tabLinks.removeClass('active');
        this.$activeTabLink[0].classList.add('active');

        this.index = Math.max(this.$tabLinks.index(this.$activeTabLink), 0);

        if (this.$activeTabLink.length) {
          this.$content = $(M.escapeHash(this.$activeTabLink[0].hash));
          this.$content.addClass('active');
        }
      }

      /**
       * Setup swipeable tabs
       */

    }, {
      key: "_setupSwipeableTabs",
      value: function _setupSwipeableTabs() {
        var _this25 = this;

        // Change swipeable according to responsive threshold
        if (window.innerWidth > this.options.responsiveThreshold) {
          this.options.swipeable = false;
        }

        var $tabsContent = $();
        this.$tabLinks.each(function (link) {
          var $currContent = $(M.escapeHash(link.hash));
          $currContent.addClass('carousel-item');
          $tabsContent = $tabsContent.add($currContent);
        });

        var $tabsWrapper = $('<div class="tabs-content carousel carousel-slider"></div>');
        $tabsContent.first().before($tabsWrapper);
        $tabsWrapper.append($tabsContent);
        $tabsContent[0].style.display = '';

        // Keep active tab index to set initial carousel slide
        var activeTabIndex = this.$activeTabLink.closest('.tab').index();

        this._tabsCarousel = M.Carousel.init($tabsWrapper[0], {
          fullWidth: true,
          noWrap: true,
          onCycleTo: function (item) {
            var prevIndex = _this25.index;
            _this25.index = $(item).index();
            _this25.$activeTabLink.removeClass('active');
            _this25.$activeTabLink = _this25.$tabLinks.eq(_this25.index);
            _this25.$activeTabLink.addClass('active');
            _this25._animateIndicator(prevIndex);
            if (typeof _this25.options.onShow === 'function') {
              _this25.options.onShow.call(_this25, _this25.$content[0]);
            }
          }
        });

        // Set initial carousel slide to active tab
        this._tabsCarousel.set(activeTabIndex);
      }

      /**
       * Teardown normal tabs.
       */

    }, {
      key: "_teardownSwipeableTabs",
      value: function _teardownSwipeableTabs() {
        var $tabsWrapper = this._tabsCarousel.$el;
        this._tabsCarousel.destroy();

        // Unwrap
        $tabsWrapper.after($tabsWrapper.children());
        $tabsWrapper.remove();
      }

      /**
       * Setup normal tabs.
       */

    }, {
      key: "_setupNormalTabs",
      value: function _setupNormalTabs() {
        // Hide Tabs Content
        this.$tabLinks.not(this.$activeTabLink).each(function (link) {
          if (!!link.hash) {
            var $currContent = $(M.escapeHash(link.hash));
            if ($currContent.length) {
              $currContent[0].style.display = 'none';
            }
          }
        });
      }

      /**
       * Teardown normal tabs.
       */

    }, {
      key: "_teardownNormalTabs",
      value: function _teardownNormalTabs() {
        // show Tabs Content
        this.$tabLinks.each(function (link) {
          if (!!link.hash) {
            var $currContent = $(M.escapeHash(link.hash));
            if ($currContent.length) {
              $currContent[0].style.display = '';
            }
          }
        });
      }

      /**
       * set tabs and tab width
       */

    }, {
      key: "_setTabsAndTabWidth",
      value: function _setTabsAndTabWidth() {
        this.tabsWidth = this.$el.width();
        this.tabWidth = Math.max(this.tabsWidth, this.el.scrollWidth) / this.$tabLinks.length;
      }

      /**
       * Finds right attribute for indicator based on active tab.
       * @param {cash} el
       */

    }, {
      key: "_calcRightPos",
      value: function _calcRightPos(el) {
        return Math.ceil(this.tabsWidth - el.position().left - el[0].getBoundingClientRect().width);
      }

      /**
       * Finds left attribute for indicator based on active tab.
       * @param {cash} el
       */

    }, {
      key: "_calcLeftPos",
      value: function _calcLeftPos(el) {
        return Math.floor(el.position().left);
      }
    }, {
      key: "updateTabIndicator",
      value: function updateTabIndicator() {
        this._setTabsAndTabWidth();
        this._animateIndicator(this.index);
      }

      /**
       * Animates Indicator to active tab.
       * @param {Number} prevIndex
       */

    }, {
      key: "_animateIndicator",
      value: function _animateIndicator(prevIndex) {
        var leftDelay = 0,
            rightDelay = 0;

        if (this.index - prevIndex >= 0) {
          leftDelay = 90;
        } else {
          rightDelay = 90;
        }

        // Animate
        var animOptions = {
          targets: this._indicator,
          left: {
            value: this._calcLeftPos(this.$activeTabLink),
            delay: leftDelay
          },
          right: {
            value: this._calcRightPos(this.$activeTabLink),
            delay: rightDelay
          },
          duration: this.options.duration,
          easing: 'easeOutQuad'
        };
        anim.remove(this._indicator);
        anim(animOptions);
      }

      /**
       * Select tab.
       * @param {String} tabId
       */

    }, {
      key: "select",
      value: function select(tabId) {
        var tab = this.$tabLinks.filter('[href="#' + tabId + '"]');
        if (tab.length) {
          tab.trigger('click');
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Tabs.__proto__ || Object.getPrototypeOf(Tabs), "init", this).call(this, this, els, options);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Tabs;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Tabs;
  }(Component);

  M.Tabs = Tabs;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Tabs, 'tabs', 'M_Tabs');
  }
})(cash, M.anime);
;(function ($, anim) {
  'use strict';

  var _defaults = {
    exitDelay: 200,
    enterDelay: 0,
    html: null,
    margin: 5,
    inDuration: 250,
    outDuration: 200,
    position: 'bottom',
    transitionMovement: 10
  };

  /**
   * @class
   *
   */

  var Tooltip = function (_Component7) {
    _inherits(Tooltip, _Component7);

    /**
     * Construct Tooltip instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Tooltip(el, options) {
      _classCallCheck(this, Tooltip);

      var _this26 = _possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call(this, Tooltip, el, options));

      _this26.el.M_Tooltip = _this26;
      _this26.options = $.extend({}, Tooltip.defaults, options);

      _this26.isOpen = false;
      _this26.isHovered = false;
      _this26.isFocused = false;
      _this26._appendTooltipEl();
      _this26._setupEventHandlers();
      return _this26;
    }

    _createClass(Tooltip, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        $(this.tooltipEl).remove();
        this._removeEventHandlers();
        this.el.M_Tooltip = undefined;
      }
    }, {
      key: "_appendTooltipEl",
      value: function _appendTooltipEl() {
        var tooltipEl = document.createElement('div');
        tooltipEl.classList.add('material-tooltip');
        this.tooltipEl = tooltipEl;

        var tooltipContentEl = document.createElement('div');
        tooltipContentEl.classList.add('tooltip-content');
        tooltipContentEl.innerHTML = this.options.html;
        tooltipEl.appendChild(tooltipContentEl);
        document.body.appendChild(tooltipEl);
      }
    }, {
      key: "_updateTooltipContent",
      value: function _updateTooltipContent() {
        this.tooltipEl.querySelector('.tooltip-content').innerHTML = this.options.html;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleMouseEnterBound = this._handleMouseEnter.bind(this);
        this._handleMouseLeaveBound = this._handleMouseLeave.bind(this);
        this._handleFocusBound = this._handleFocus.bind(this);
        this._handleBlurBound = this._handleBlur.bind(this);
        this.el.addEventListener('mouseenter', this._handleMouseEnterBound);
        this.el.addEventListener('mouseleave', this._handleMouseLeaveBound);
        this.el.addEventListener('focus', this._handleFocusBound, true);
        this.el.addEventListener('blur', this._handleBlurBound, true);
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener('mouseenter', this._handleMouseEnterBound);
        this.el.removeEventListener('mouseleave', this._handleMouseLeaveBound);
        this.el.removeEventListener('focus', this._handleFocusBound, true);
        this.el.removeEventListener('blur', this._handleBlurBound, true);
      }
    }, {
      key: "open",
      value: function open(isManual) {
        if (this.isOpen) {
          return;
        }
        isManual = isManual === undefined ? true : undefined; // Default value true
        this.isOpen = true;
        // Update tooltip content with HTML attribute options
        this.options = $.extend({}, this.options, this._getAttributeOptions());
        this._updateTooltipContent();
        this._setEnterDelayTimeout(isManual);
      }
    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }

        this.isHovered = false;
        this.isFocused = false;
        this.isOpen = false;
        this._setExitDelayTimeout();
      }

      /**
       * Create timeout which delays when the tooltip closes
       */

    }, {
      key: "_setExitDelayTimeout",
      value: function _setExitDelayTimeout() {
        var _this27 = this;

        clearTimeout(this._exitDelayTimeout);

        this._exitDelayTimeout = setTimeout(function () {
          if (_this27.isHovered || _this27.isFocused) {
            return;
          }

          _this27._animateOut();
        }, this.options.exitDelay);
      }

      /**
       * Create timeout which delays when the toast closes
       */

    }, {
      key: "_setEnterDelayTimeout",
      value: function _setEnterDelayTimeout(isManual) {
        var _this28 = this;

        clearTimeout(this._enterDelayTimeout);

        this._enterDelayTimeout = setTimeout(function () {
          if (!_this28.isHovered && !_this28.isFocused && !isManual) {
            return;
          }

          _this28._animateIn();
        }, this.options.enterDelay);
      }
    }, {
      key: "_positionTooltip",
      value: function _positionTooltip() {
        var origin = this.el,
            tooltip = this.tooltipEl,
            originHeight = origin.offsetHeight,
            originWidth = origin.offsetWidth,
            tooltipHeight = tooltip.offsetHeight,
            tooltipWidth = tooltip.offsetWidth,
            newCoordinates = void 0,
            margin = this.options.margin,
            targetTop = void 0,
            targetLeft = void 0;

        this.xMovement = 0, this.yMovement = 0;

        targetTop = origin.getBoundingClientRect().top + M.getDocumentScrollTop();
        targetLeft = origin.getBoundingClientRect().left + M.getDocumentScrollLeft();

        if (this.options.position === 'top') {
          targetTop += -tooltipHeight - margin;
          targetLeft += originWidth / 2 - tooltipWidth / 2;
          this.yMovement = -this.options.transitionMovement;
        } else if (this.options.position === 'right') {
          targetTop += originHeight / 2 - tooltipHeight / 2;
          targetLeft += originWidth + margin;
          this.xMovement = this.options.transitionMovement;
        } else if (this.options.position === 'left') {
          targetTop += originHeight / 2 - tooltipHeight / 2;
          targetLeft += -tooltipWidth - margin;
          this.xMovement = -this.options.transitionMovement;
        } else {
          targetTop += originHeight + margin;
          targetLeft += originWidth / 2 - tooltipWidth / 2;
          this.yMovement = this.options.transitionMovement;
        }

        newCoordinates = this._repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);
        $(tooltip).css({
          top: newCoordinates.y + 'px',
          left: newCoordinates.x + 'px'
        });
      }
    }, {
      key: "_repositionWithinScreen",
      value: function _repositionWithinScreen(x, y, width, height) {
        var scrollLeft = M.getDocumentScrollLeft();
        var scrollTop = M.getDocumentScrollTop();
        var newX = x - scrollLeft;
        var newY = y - scrollTop;

        var bounding = {
          left: newX,
          top: newY,
          width: width,
          height: height
        };

        var offset = this.options.margin + this.options.transitionMovement;
        var edges = M.checkWithinContainer(document.body, bounding, offset);

        if (edges.left) {
          newX = offset;
        } else if (edges.right) {
          newX -= newX + width - window.innerWidth;
        }

        if (edges.top) {
          newY = offset;
        } else if (edges.bottom) {
          newY -= newY + height - window.innerHeight;
        }

        return {
          x: newX + scrollLeft,
          y: newY + scrollTop
        };
      }
    }, {
      key: "_animateIn",
      value: function _animateIn() {
        this._positionTooltip();
        this.tooltipEl.style.visibility = 'visible';
        anim.remove(this.tooltipEl);
        anim({
          targets: this.tooltipEl,
          opacity: 1,
          translateX: this.xMovement,
          translateY: this.yMovement,
          duration: this.options.inDuration,
          easing: 'easeOutCubic'
        });
      }
    }, {
      key: "_animateOut",
      value: function _animateOut() {
        anim.remove(this.tooltipEl);
        anim({
          targets: this.tooltipEl,
          opacity: 0,
          translateX: 0,
          translateY: 0,
          duration: this.options.outDuration,
          easing: 'easeOutCubic'
        });
      }
    }, {
      key: "_handleMouseEnter",
      value: function _handleMouseEnter() {
        this.isHovered = true;
        this.isFocused = false; // Allows close of tooltip when opened by focus.
        this.open(false);
      }
    }, {
      key: "_handleMouseLeave",
      value: function _handleMouseLeave() {
        this.isHovered = false;
        this.isFocused = false; // Allows close of tooltip when opened by focus.
        this.close();
      }
    }, {
      key: "_handleFocus",
      value: function _handleFocus() {
        if (M.tabPressed) {
          this.isFocused = true;
          this.open(false);
        }
      }
    }, {
      key: "_handleBlur",
      value: function _handleBlur() {
        this.isFocused = false;
        this.close();
      }
    }, {
      key: "_getAttributeOptions",
      value: function _getAttributeOptions() {
        var attributeOptions = {};
        var tooltipTextOption = this.el.getAttribute('data-tooltip');
        var positionOption = this.el.getAttribute('data-position');

        if (tooltipTextOption) {
          attributeOptions.html = tooltipTextOption;
        }

        if (positionOption) {
          attributeOptions.position = positionOption;
        }
        return attributeOptions;
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Tooltip.__proto__ || Object.getPrototypeOf(Tooltip), "init", this).call(this, this, els, options);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Tooltip;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Tooltip;
  }(Component);

  M.Tooltip = Tooltip;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Tooltip, 'tooltip', 'M_Tooltip');
  }
})(cash, M.anime);
; /*!
  * Waves v0.6.4
  * http://fian.my.id/Waves
  *
  * Copyright 2014 Alfiana E. Sibuea and other contributors
  * Released under the MIT license
  * https://github.com/fians/Waves/blob/master/LICENSE
  */

;(function (window) {
  'use strict';

  var Waves = Waves || {};
  var $$ = document.querySelectorAll.bind(document);

  // Find exact position of element
  function isWindow(obj) {
    return obj !== null && obj === obj.window;
  }

  function getWindow(elem) {
    return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
  }

  function offset(elem) {
    var docElem,
        win,
        box = { top: 0, left: 0 },
        doc = elem && elem.ownerDocument;

    docElem = doc.documentElement;

    if (typeof elem.getBoundingClientRect !== typeof undefined) {
      box = elem.getBoundingClientRect();
    }
    win = getWindow(doc);
    return {
      top: box.top + win.pageYOffset - docElem.clientTop,
      left: box.left + win.pageXOffset - docElem.clientLeft
    };
  }

  function convertStyle(obj) {
    var style = '';

    for (var a in obj) {
      if (obj.hasOwnProperty(a)) {
        style += a + ':' + obj[a] + ';';
      }
    }

    return style;
  }

  var Effect = {

    // Effect delay
    duration: 750,

    show: function (e, element) {

      // Disable right click
      if (e.button === 2) {
        return false;
      }

      var el = element || this;

      // Create ripple
      var ripple = document.createElement('div');
      ripple.className = 'waves-ripple';
      el.appendChild(ripple);

      // Get click coordinate and element witdh
      var pos = offset(el);
      var relativeY = e.pageY - pos.top;
      var relativeX = e.pageX - pos.left;
      var scale = 'scale(' + el.clientWidth / 100 * 10 + ')';

      // Support for touch devices
      if ('touches' in e) {
        relativeY = e.touches[0].pageY - pos.top;
        relativeX = e.touches[0].pageX - pos.left;
      }

      // Attach data to element
      ripple.setAttribute('data-hold', Date.now());
      ripple.setAttribute('data-scale', scale);
      ripple.setAttribute('data-x', relativeX);
      ripple.setAttribute('data-y', relativeY);

      // Set ripple position
      var rippleStyle = {
        'top': relativeY + 'px',
        'left': relativeX + 'px'
      };

      ripple.className = ripple.className + ' waves-notransition';
      ripple.setAttribute('style', convertStyle(rippleStyle));
      ripple.className = ripple.className.replace('waves-notransition', '');

      // Scale the ripple
      rippleStyle['-webkit-transform'] = scale;
      rippleStyle['-moz-transform'] = scale;
      rippleStyle['-ms-transform'] = scale;
      rippleStyle['-o-transform'] = scale;
      rippleStyle.transform = scale;
      rippleStyle.opacity = '1';

      rippleStyle['-webkit-transition-duration'] = Effect.duration + 'ms';
      rippleStyle['-moz-transition-duration'] = Effect.duration + 'ms';
      rippleStyle['-o-transition-duration'] = Effect.duration + 'ms';
      rippleStyle['transition-duration'] = Effect.duration + 'ms';

      rippleStyle['-webkit-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
      rippleStyle['-moz-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
      rippleStyle['-o-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
      rippleStyle['transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';

      ripple.setAttribute('style', convertStyle(rippleStyle));
    },

    hide: function (e) {
      TouchHandler.touchup(e);

      var el = this;
      var width = el.clientWidth * 1.4;

      // Get first ripple
      var ripple = null;
      var ripples = el.getElementsByClassName('waves-ripple');
      if (ripples.length > 0) {
        ripple = ripples[ripples.length - 1];
      } else {
        return false;
      }

      var relativeX = ripple.getAttribute('data-x');
      var relativeY = ripple.getAttribute('data-y');
      var scale = ripple.getAttribute('data-scale');

      // Get delay beetween mousedown and mouse leave
      var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
      var delay = 350 - diff;

      if (delay < 0) {
        delay = 0;
      }

      // Fade out ripple after delay
      setTimeout(function () {
        var style = {
          'top': relativeY + 'px',
          'left': relativeX + 'px',
          'opacity': '0',

          // Duration
          '-webkit-transition-duration': Effect.duration + 'ms',
          '-moz-transition-duration': Effect.duration + 'ms',
          '-o-transition-duration': Effect.duration + 'ms',
          'transition-duration': Effect.duration + 'ms',
          '-webkit-transform': scale,
          '-moz-transform': scale,
          '-ms-transform': scale,
          '-o-transform': scale,
          'transform': scale
        };

        ripple.setAttribute('style', convertStyle(style));

        setTimeout(function () {
          try {
            el.removeChild(ripple);
          } catch (e) {
            return false;
          }
        }, Effect.duration);
      }, delay);
    },

    // Little hack to make <input> can perform waves effect
    wrapInput: function (elements) {
      for (var a = 0; a < elements.length; a++) {
        var el = elements[a];

        if (el.tagName.toLowerCase() === 'input') {
          var parent = el.parentNode;

          // If input already have parent just pass through
          if (parent.tagName.toLowerCase() === 'i' && parent.className.indexOf('waves-effect') !== -1) {
            continue;
          }

          // Put element class and style to the specified parent
          var wrapper = document.createElement('i');
          wrapper.className = el.className + ' waves-input-wrapper';

          var elementStyle = el.getAttribute('style');

          if (!elementStyle) {
            elementStyle = '';
          }

          wrapper.setAttribute('style', elementStyle);

          el.className = 'waves-button-input';
          el.removeAttribute('style');

          // Put element as child
          parent.replaceChild(wrapper, el);
          wrapper.appendChild(el);
        }
      }
    }
  };

  /**
   * Disable mousedown event for 500ms during and after touch
   */
  var TouchHandler = {
    /* uses an integer rather than bool so there's no issues with
     * needing to clear timeouts if another touch event occurred
     * within the 500ms. Cannot mouseup between touchstart and
     * touchend, nor in the 500ms after touchend. */
    touches: 0,
    allowEvent: function (e) {
      var allow = true;

      if (e.type === 'touchstart') {
        TouchHandler.touches += 1; //push
      } else if (e.type === 'touchend' || e.type === 'touchcancel') {
        setTimeout(function () {
          if (TouchHandler.touches > 0) {
            TouchHandler.touches -= 1; //pop after 500ms
          }
        }, 500);
      } else if (e.type === 'mousedown' && TouchHandler.touches > 0) {
        allow = false;
      }

      return allow;
    },
    touchup: function (e) {
      TouchHandler.allowEvent(e);
    }
  };

  /**
   * Delegated click handler for .waves-effect element.
   * returns null when .waves-effect element not in "click tree"
   */
  function getWavesEffectElement(e) {
    if (TouchHandler.allowEvent(e) === false) {
      return null;
    }

    var element = null;
    var target = e.target || e.srcElement;

    while (target.parentNode !== null) {
      if (!(target instanceof SVGElement) && target.className.indexOf('waves-effect') !== -1) {
        element = target;
        break;
      }
      target = target.parentNode;
    }
    return element;
  }

  /**
   * Bubble the click and show effect if .waves-effect elem was found
   */
  function showEffect(e) {
    var element = getWavesEffectElement(e);

    if (element !== null) {
      Effect.show(e, element);

      if ('ontouchstart' in window) {
        element.addEventListener('touchend', Effect.hide, false);
        element.addEventListener('touchcancel', Effect.hide, false);
      }

      element.addEventListener('mouseup', Effect.hide, false);
      element.addEventListener('mouseleave', Effect.hide, false);
      element.addEventListener('dragend', Effect.hide, false);
    }
  }

  Waves.displayEffect = function (options) {
    options = options || {};

    if ('duration' in options) {
      Effect.duration = options.duration;
    }

    //Wrap input inside <i> tag
    Effect.wrapInput($$('.waves-effect'));

    if ('ontouchstart' in window) {
      document.body.addEventListener('touchstart', showEffect, false);
    }

    document.body.addEventListener('mousedown', showEffect, false);
  };

  /**
   * Attach Waves to an input element (or any element which doesn't
   * bubble mouseup/mousedown events).
   *   Intended to be used with dynamically loaded forms/inputs, or
   * where the user doesn't want a delegated click handler.
   */
  Waves.attach = function (element) {
    //FUTURE: automatically add waves classes and allow users
    // to specify them with an options param? Eg. light/classic/button
    if (element.tagName.toLowerCase() === 'input') {
      Effect.wrapInput([element]);
      element = element.parentNode;
    }

    if ('ontouchstart' in window) {
      element.addEventListener('touchstart', showEffect, false);
    }

    element.addEventListener('mousedown', showEffect, false);
  };

  window.Waves = Waves;

  document.addEventListener('DOMContentLoaded', function () {
    Waves.displayEffect();
  }, false);
})(window);
;(function ($, anim) {
  'use strict';

  var _defaults = {
    html: '',
    displayLength: 4000,
    inDuration: 300,
    outDuration: 375,
    classes: '',
    completeCallback: null,
    activationPercent: 0.8
  };

  var Toast = function () {
    function Toast(options) {
      _classCallCheck(this, Toast);

      /**
       * Options for the toast
       * @member Toast#options
       */
      this.options = $.extend({}, Toast.defaults, options);
      this.message = this.options.html;

      /**
       * Describes current pan state toast
       * @type {Boolean}
       */
      this.panning = false;

      /**
       * Time remaining until toast is removed
       */
      this.timeRemaining = this.options.displayLength;

      if (Toast._toasts.length === 0) {
        Toast._createContainer();
      }

      // Create new toast
      Toast._toasts.push(this);
      var toastElement = this._createToast();
      toastElement.M_Toast = this;
      this.el = toastElement;
      this.$el = $(toastElement);
      this._animateIn();
      this._setTimer();
    }

    _createClass(Toast, [{
      key: "_createToast",


      /**
       * Create toast and append it to toast container
       */
      value: function _createToast() {
        var toast = document.createElement('div');
        toast.classList.add('toast');

        // Add custom classes onto toast
        if (!!this.options.classes.length) {
          $(toast).addClass(this.options.classes);
        }

        // Set content
        if (typeof HTMLElement === 'object' ? this.message instanceof HTMLElement : this.message && typeof this.message === 'object' && this.message !== null && this.message.nodeType === 1 && typeof this.message.nodeName === 'string') {
          toast.appendChild(this.message);

          // Check if it is jQuery object
        } else if (!!this.message.jquery) {
          $(toast).append(this.message[0]);

          // Insert as html;
        } else {
          toast.innerHTML = this.message;
        }

        // Append toasft
        Toast._container.appendChild(toast);
        return toast;
      }

      /**
       * Animate in toast
       */

    }, {
      key: "_animateIn",
      value: function _animateIn() {
        // Animate toast in
        anim({
          targets: this.el,
          top: 0,
          opacity: 1,
          duration: this.options.inDuration,
          easing: 'easeOutCubic'
        });
      }

      /**
       * Create setInterval which automatically removes toast when timeRemaining >= 0
       * has been reached
       */

    }, {
      key: "_setTimer",
      value: function _setTimer() {
        var _this29 = this;

        if (this.timeRemaining !== Infinity) {
          this.counterInterval = setInterval(function () {
            // If toast is not being dragged, decrease its time remaining
            if (!_this29.panning) {
              _this29.timeRemaining -= 20;
            }

            // Animate toast out
            if (_this29.timeRemaining <= 0) {
              _this29.dismiss();
            }
          }, 20);
        }
      }

      /**
       * Dismiss toast with animation
       */

    }, {
      key: "dismiss",
      value: function dismiss() {
        var _this30 = this;

        window.clearInterval(this.counterInterval);
        var activationDistance = this.el.offsetWidth * this.options.activationPercent;

        if (this.wasSwiped) {
          this.el.style.transition = 'transform .05s, opacity .05s';
          this.el.style.transform = "translateX(" + activationDistance + "px)";
          this.el.style.opacity = 0;
        }

        anim({
          targets: this.el,
          opacity: 0,
          marginTop: -40,
          duration: this.options.outDuration,
          easing: 'easeOutExpo',
          complete: function () {
            // Call the optional callback
            if (typeof _this30.options.completeCallback === 'function') {
              _this30.options.completeCallback();
            }
            // Remove toast from DOM
            _this30.$el.remove();
            Toast._toasts.splice(Toast._toasts.indexOf(_this30), 1);
            if (Toast._toasts.length === 0) {
              Toast._removeContainer();
            }
          }
        });
      }
    }], [{
      key: "getInstance",


      /**
       * Get Instance
       */
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Toast;
      }

      /**
       * Append toast container and add event handlers
       */

    }, {
      key: "_createContainer",
      value: function _createContainer() {
        var container = document.createElement('div');
        container.setAttribute('id', 'toast-container');

        // Add event handler
        container.addEventListener('touchstart', Toast._onDragStart);
        container.addEventListener('touchmove', Toast._onDragMove);
        container.addEventListener('touchend', Toast._onDragEnd);

        container.addEventListener('mousedown', Toast._onDragStart);
        document.addEventListener('mousemove', Toast._onDragMove);
        document.addEventListener('mouseup', Toast._onDragEnd);

        document.body.appendChild(container);
        Toast._container = container;
      }

      /**
       * Remove toast container and event handlers
       */

    }, {
      key: "_removeContainer",
      value: function _removeContainer() {
        // Add event handler
        document.removeEventListener('mousemove', Toast._onDragMove);
        document.removeEventListener('mouseup', Toast._onDragEnd);

        $(Toast._container).remove();
        Toast._container = null;
      }

      /**
       * Begin drag handler
       * @param {Event} e
       */

    }, {
      key: "_onDragStart",
      value: function _onDragStart(e) {
        if (e.target && $(e.target).closest('.toast').length) {
          var $toast = $(e.target).closest('.toast');
          var toast = $toast[0].M_Toast;
          toast.panning = true;
          Toast._draggedToast = toast;
          toast.el.classList.add('panning');
          toast.el.style.transition = '';
          toast.startingXPos = Toast._xPos(e);
          toast.time = Date.now();
          toast.xPos = Toast._xPos(e);
        }
      }

      /**
       * Drag move handler
       * @param {Event} e
       */

    }, {
      key: "_onDragMove",
      value: function _onDragMove(e) {
        if (!!Toast._draggedToast) {
          e.preventDefault();
          var toast = Toast._draggedToast;
          toast.deltaX = Math.abs(toast.xPos - Toast._xPos(e));
          toast.xPos = Toast._xPos(e);
          toast.velocityX = toast.deltaX / (Date.now() - toast.time);
          toast.time = Date.now();

          var totalDeltaX = toast.xPos - toast.startingXPos;
          var activationDistance = toast.el.offsetWidth * toast.options.activationPercent;
          toast.el.style.transform = "translateX(" + totalDeltaX + "px)";
          toast.el.style.opacity = 1 - Math.abs(totalDeltaX / activationDistance);
        }
      }

      /**
       * End drag handler
       */

    }, {
      key: "_onDragEnd",
      value: function _onDragEnd() {
        if (!!Toast._draggedToast) {
          var toast = Toast._draggedToast;
          toast.panning = false;
          toast.el.classList.remove('panning');

          var totalDeltaX = toast.xPos - toast.startingXPos;
          var activationDistance = toast.el.offsetWidth * toast.options.activationPercent;
          var shouldBeDismissed = Math.abs(totalDeltaX) > activationDistance || toast.velocityX > 1;

          // Remove toast
          if (shouldBeDismissed) {
            toast.wasSwiped = true;
            toast.dismiss();

            // Animate toast back to original position
          } else {
            toast.el.style.transition = 'transform .2s, opacity .2s';
            toast.el.style.transform = '';
            toast.el.style.opacity = '';
          }
          Toast._draggedToast = null;
        }
      }

      /**
       * Get x position of mouse or touch event
       * @param {Event} e
       */

    }, {
      key: "_xPos",
      value: function _xPos(e) {
        if (e.targetTouches && e.targetTouches.length >= 1) {
          return e.targetTouches[0].clientX;
        }
        // mouse event
        return e.clientX;
      }

      /**
       * Remove all toasts
       */

    }, {
      key: "dismissAll",
      value: function dismissAll() {
        for (var toastIndex in Toast._toasts) {
          Toast._toasts[toastIndex].dismiss();
        }
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Toast;
  }();

  /**
   * @static
   * @memberof Toast
   * @type {Array.<Toast>}
   */


  Toast._toasts = [];

  /**
   * @static
   * @memberof Toast
   */
  Toast._container = null;

  /**
   * @static
   * @memberof Toast
   * @type {Toast}
   */
  Toast._draggedToast = null;

  M.Toast = Toast;
  M.toast = function (options) {
    return new Toast(options);
  };
})(cash, M.anime);
;(function ($, anim) {
  'use strict';

  var _defaults = {
    edge: 'left',
    draggable: true,
    inDuration: 250,
    outDuration: 200,
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null,
    preventScrolling: true
  };

  /**
   * @class
   */

  var Sidenav = function (_Component8) {
    _inherits(Sidenav, _Component8);

    /**
     * Construct Sidenav instance and set up overlay
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Sidenav(el, options) {
      _classCallCheck(this, Sidenav);

      var _this31 = _possibleConstructorReturn(this, (Sidenav.__proto__ || Object.getPrototypeOf(Sidenav)).call(this, Sidenav, el, options));

      _this31.el.M_Sidenav = _this31;
      _this31.id = _this31.$el.attr('id');

      /**
       * Options for the Sidenav
       * @member Sidenav#options
       * @prop {String} [edge='left'] - Side of screen on which Sidenav appears
       * @prop {Boolean} [draggable=true] - Allow swipe gestures to open/close Sidenav
       * @prop {Number} [inDuration=250] - Length in ms of enter transition
       * @prop {Number} [outDuration=200] - Length in ms of exit transition
       * @prop {Function} onOpenStart - Function called when sidenav starts entering
       * @prop {Function} onOpenEnd - Function called when sidenav finishes entering
       * @prop {Function} onCloseStart - Function called when sidenav starts exiting
       * @prop {Function} onCloseEnd - Function called when sidenav finishes exiting
       */
      _this31.options = $.extend({}, Sidenav.defaults, options);

      /**
       * Describes open/close state of Sidenav
       * @type {Boolean}
       */
      _this31.isOpen = false;

      /**
       * Describes if Sidenav is fixed
       * @type {Boolean}
       */
      _this31.isFixed = _this31.el.classList.contains('sidenav-fixed');

      /**
       * Describes if Sidenav is being draggeed
       * @type {Boolean}
       */
      _this31.isDragged = false;

      // Window size variables for window resize checks
      _this31.lastWindowWidth = window.innerWidth;
      _this31.lastWindowHeight = window.innerHeight;

      _this31._createOverlay();
      _this31._createDragTarget();
      _this31._setupEventHandlers();
      _this31._setupClasses();
      _this31._setupFixed();

      Sidenav._sidenavs.push(_this31);
      return _this31;
    }

    _createClass(Sidenav, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this._enableBodyScrolling();
        this._overlay.parentNode.removeChild(this._overlay);
        this.dragTarget.parentNode.removeChild(this.dragTarget);
        this.el.M_Sidenav = undefined;
        this.el.style.transform = '';

        var index = Sidenav._sidenavs.indexOf(this);
        if (index >= 0) {
          Sidenav._sidenavs.splice(index, 1);
        }
      }
    }, {
      key: "_createOverlay",
      value: function _createOverlay() {
        var overlay = document.createElement('div');
        this._closeBound = this.close.bind(this);
        overlay.classList.add('sidenav-overlay');

        overlay.addEventListener('click', this._closeBound);

        document.body.appendChild(overlay);
        this._overlay = overlay;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        if (Sidenav._sidenavs.length === 0) {
          document.body.addEventListener('click', this._handleTriggerClick);
        }

        this._handleDragTargetDragBound = this._handleDragTargetDrag.bind(this);
        this._handleDragTargetReleaseBound = this._handleDragTargetRelease.bind(this);
        this._handleCloseDragBound = this._handleCloseDrag.bind(this);
        this._handleCloseReleaseBound = this._handleCloseRelease.bind(this);
        this._handleCloseTriggerClickBound = this._handleCloseTriggerClick.bind(this);

        this.dragTarget.addEventListener('touchmove', this._handleDragTargetDragBound);
        this.dragTarget.addEventListener('touchend', this._handleDragTargetReleaseBound);
        this._overlay.addEventListener('touchmove', this._handleCloseDragBound);
        this._overlay.addEventListener('touchend', this._handleCloseReleaseBound);
        this.el.addEventListener('touchmove', this._handleCloseDragBound);
        this.el.addEventListener('touchend', this._handleCloseReleaseBound);
        this.el.addEventListener('click', this._handleCloseTriggerClickBound);

        // Add resize for side nav fixed
        if (this.isFixed) {
          this._handleWindowResizeBound = this._handleWindowResize.bind(this);
          window.addEventListener('resize', this._handleWindowResizeBound);
        }
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        if (Sidenav._sidenavs.length === 1) {
          document.body.removeEventListener('click', this._handleTriggerClick);
        }

        this.dragTarget.removeEventListener('touchmove', this._handleDragTargetDragBound);
        this.dragTarget.removeEventListener('touchend', this._handleDragTargetReleaseBound);
        this._overlay.removeEventListener('touchmove', this._handleCloseDragBound);
        this._overlay.removeEventListener('touchend', this._handleCloseReleaseBound);
        this.el.removeEventListener('touchmove', this._handleCloseDragBound);
        this.el.removeEventListener('touchend', this._handleCloseReleaseBound);
        this.el.removeEventListener('click', this._handleCloseTriggerClickBound);

        // Remove resize for side nav fixed
        if (this.isFixed) {
          window.removeEventListener('resize', this._handleWindowResizeBound);
        }
      }

      /**
       * Handle Trigger Click
       * @param {Event} e
       */

    }, {
      key: "_handleTriggerClick",
      value: function _handleTriggerClick(e) {
        var $trigger = $(e.target).closest('.sidenav-trigger');
        if (e.target && $trigger.length) {
          var sidenavId = M.getIdFromTrigger($trigger[0]);

          var sidenavInstance = document.getElementById(sidenavId).M_Sidenav;
          if (sidenavInstance) {
            sidenavInstance.open($trigger);
          }
          e.preventDefault();
        }
      }

      /**
       * Set variables needed at the beggining of drag
       * and stop any current transition.
       * @param {Event} e
       */

    }, {
      key: "_startDrag",
      value: function _startDrag(e) {
        var clientX = e.targetTouches[0].clientX;
        this.isDragged = true;
        this._startingXpos = clientX;
        this._xPos = this._startingXpos;
        this._time = Date.now();
        this._width = this.el.getBoundingClientRect().width;
        this._overlay.style.display = 'block';
        this._initialScrollTop = this.isOpen ? this.el.scrollTop : M.getDocumentScrollTop();
        this._verticallyScrolling = false;
        anim.remove(this.el);
        anim.remove(this._overlay);
      }

      /**
       * Set variables needed at each drag move update tick
       * @param {Event} e
       */

    }, {
      key: "_dragMoveUpdate",
      value: function _dragMoveUpdate(e) {
        var clientX = e.targetTouches[0].clientX;
        var currentScrollTop = this.isOpen ? this.el.scrollTop : M.getDocumentScrollTop();
        this.deltaX = Math.abs(this._xPos - clientX);
        this._xPos = clientX;
        this.velocityX = this.deltaX / (Date.now() - this._time);
        this._time = Date.now();
        if (this._initialScrollTop !== currentScrollTop) {
          this._verticallyScrolling = true;
        }
      }

      /**
       * Handles Dragging of Sidenav
       * @param {Event} e
       */

    }, {
      key: "_handleDragTargetDrag",
      value: function _handleDragTargetDrag(e) {
        // Check if draggable
        if (!this.options.draggable || this._isCurrentlyFixed() || this._verticallyScrolling) {
          return;
        }

        // If not being dragged, set initial drag start variables
        if (!this.isDragged) {
          this._startDrag(e);
        }

        // Run touchmove updates
        this._dragMoveUpdate(e);

        // Calculate raw deltaX
        var totalDeltaX = this._xPos - this._startingXpos;

        // dragDirection is the attempted user drag direction
        var dragDirection = totalDeltaX > 0 ? 'right' : 'left';

        // Don't allow totalDeltaX to exceed Sidenav width or be dragged in the opposite direction
        totalDeltaX = Math.min(this._width, Math.abs(totalDeltaX));
        if (this.options.edge === dragDirection) {
          totalDeltaX = 0;
        }

        /**
         * transformX is the drag displacement
         * transformPrefix is the initial transform placement
         * Invert values if Sidenav is right edge
         */
        var transformX = totalDeltaX;
        var transformPrefix = 'translateX(-100%)';
        if (this.options.edge === 'right') {
          transformPrefix = 'translateX(100%)';
          transformX = -transformX;
        }

        // Calculate open/close percentage of sidenav, with open = 1 and close = 0
        this.percentOpen = Math.min(1, totalDeltaX / this._width);

        // Set transform and opacity styles
        this.el.style.transform = transformPrefix + " translateX(" + transformX + "px)";
        this._overlay.style.opacity = this.percentOpen;
      }

      /**
       * Handle Drag Target Release
       */

    }, {
      key: "_handleDragTargetRelease",
      value: function _handleDragTargetRelease() {
        if (this.isDragged) {
          if (this.percentOpen > 0.2) {
            this.open();
          } else {
            this._animateOut();
          }

          this.isDragged = false;
          this._verticallyScrolling = false;
        }
      }

      /**
       * Handle Close Drag
       * @param {Event} e
       */

    }, {
      key: "_handleCloseDrag",
      value: function _handleCloseDrag(e) {
        if (this.isOpen) {
          // Check if draggable
          if (!this.options.draggable || this._isCurrentlyFixed() || this._verticallyScrolling) {
            return;
          }

          // If not being dragged, set initial drag start variables
          if (!this.isDragged) {
            this._startDrag(e);
          }

          // Run touchmove updates
          this._dragMoveUpdate(e);

          // Calculate raw deltaX
          var totalDeltaX = this._xPos - this._startingXpos;

          // dragDirection is the attempted user drag direction
          var dragDirection = totalDeltaX > 0 ? 'right' : 'left';

          // Don't allow totalDeltaX to exceed Sidenav width or be dragged in the opposite direction
          totalDeltaX = Math.min(this._width, Math.abs(totalDeltaX));
          if (this.options.edge !== dragDirection) {
            totalDeltaX = 0;
          }

          var transformX = -totalDeltaX;
          if (this.options.edge === 'right') {
            transformX = -transformX;
          }

          // Calculate open/close percentage of sidenav, with open = 1 and close = 0
          this.percentOpen = Math.min(1, 1 - totalDeltaX / this._width);

          // Set transform and opacity styles
          this.el.style.transform = "translateX(" + transformX + "px)";
          this._overlay.style.opacity = this.percentOpen;
        }
      }

      /**
       * Handle Close Release
       */

    }, {
      key: "_handleCloseRelease",
      value: function _handleCloseRelease() {
        if (this.isOpen && this.isDragged) {
          if (this.percentOpen > 0.8) {
            this._animateIn();
          } else {
            this.close();
          }

          this.isDragged = false;
          this._verticallyScrolling = false;
        }
      }

      /**
       * Handles closing of Sidenav when element with class .sidenav-close
       */

    }, {
      key: "_handleCloseTriggerClick",
      value: function _handleCloseTriggerClick(e) {
        var $closeTrigger = $(e.target).closest('.sidenav-close');
        if ($closeTrigger.length && !this._isCurrentlyFixed()) {
          this.close();
        }
      }

      /**
       * Handle Window Resize
       */

    }, {
      key: "_handleWindowResize",
      value: function _handleWindowResize() {
        // Only handle horizontal resizes
        if (this.lastWindowWidth !== window.innerWidth) {
          if (window.innerWidth > 992) {
            this.open();
          } else {
            this.close();
          }
        }

        this.lastWindowWidth = window.innerWidth;
        this.lastWindowHeight = window.innerHeight;
      }
    }, {
      key: "_setupClasses",
      value: function _setupClasses() {
        if (this.options.edge === 'right') {
          this.el.classList.add('right-aligned');
          this.dragTarget.classList.add('right-aligned');
        }
      }
    }, {
      key: "_removeClasses",
      value: function _removeClasses() {
        this.el.classList.remove('right-aligned');
        this.dragTarget.classList.remove('right-aligned');
      }
    }, {
      key: "_setupFixed",
      value: function _setupFixed() {
        if (this._isCurrentlyFixed()) {
          this.open();
        }
      }
    }, {
      key: "_isCurrentlyFixed",
      value: function _isCurrentlyFixed() {
        return this.isFixed && window.innerWidth > 992;
      }
    }, {
      key: "_createDragTarget",
      value: function _createDragTarget() {
        var dragTarget = document.createElement('div');
        dragTarget.classList.add('drag-target');
        document.body.appendChild(dragTarget);
        this.dragTarget = dragTarget;
      }
    }, {
      key: "_preventBodyScrolling",
      value: function _preventBodyScrolling() {
        var body = document.body;
        body.style.overflow = 'hidden';
      }
    }, {
      key: "_enableBodyScrolling",
      value: function _enableBodyScrolling() {
        var body = document.body;
        body.style.overflow = '';
      }
    }, {
      key: "open",
      value: function open() {
        if (this.isOpen === true) {
          return;
        }

        this.isOpen = true;

        // Run onOpenStart callback
        if (typeof this.options.onOpenStart === 'function') {
          this.options.onOpenStart.call(this, this.el);
        }

        // Handle fixed Sidenav
        if (this._isCurrentlyFixed()) {
          anim.remove(this.el);
          anim({
            targets: this.el,
            translateX: 0,
            duration: 0,
            easing: 'easeOutQuad'
          });
          this._enableBodyScrolling();
          this._overlay.style.display = 'none';

          // Handle non-fixed Sidenav
        } else {
          if (this.options.preventScrolling) {
            this._preventBodyScrolling();
          }

          if (!this.isDragged || this.percentOpen != 1) {
            this._animateIn();
          }
        }
      }
    }, {
      key: "close",
      value: function close() {
        if (this.isOpen === false) {
          return;
        }

        this.isOpen = false;

        // Run onCloseStart callback
        if (typeof this.options.onCloseStart === 'function') {
          this.options.onCloseStart.call(this, this.el);
        }

        // Handle fixed Sidenav
        if (this._isCurrentlyFixed()) {
          var transformX = this.options.edge === 'left' ? '-105%' : '105%';
          this.el.style.transform = "translateX(" + transformX + ")";

          // Handle non-fixed Sidenav
        } else {
          this._enableBodyScrolling();

          if (!this.isDragged || this.percentOpen != 0) {
            this._animateOut();
          } else {
            this._overlay.style.display = 'none';
          }
        }
      }
    }, {
      key: "_animateIn",
      value: function _animateIn() {
        this._animateSidenavIn();
        this._animateOverlayIn();
      }
    }, {
      key: "_animateSidenavIn",
      value: function _animateSidenavIn() {
        var _this32 = this;

        var slideOutPercent = this.options.edge === 'left' ? -1 : 1;
        if (this.isDragged) {
          slideOutPercent = this.options.edge === 'left' ? slideOutPercent + this.percentOpen : slideOutPercent - this.percentOpen;
        }

        anim.remove(this.el);
        anim({
          targets: this.el,
          translateX: [slideOutPercent * 100 + "%", 0],
          duration: this.options.inDuration,
          easing: 'easeOutQuad',
          complete: function () {
            // Run onOpenEnd callback
            if (typeof _this32.options.onOpenEnd === 'function') {
              _this32.options.onOpenEnd.call(_this32, _this32.el);
            }
          }
        });
      }
    }, {
      key: "_animateOverlayIn",
      value: function _animateOverlayIn() {
        var start = 0;
        if (this.isDragged) {
          start = this.percentOpen;
        } else {
          $(this._overlay).css({
            display: 'block'
          });
        }

        anim.remove(this._overlay);
        anim({
          targets: this._overlay,
          opacity: [start, 1],
          duration: this.options.inDuration,
          easing: 'easeOutQuad'
        });
      }
    }, {
      key: "_animateOut",
      value: function _animateOut() {
        this._animateSidenavOut();
        this._animateOverlayOut();
      }
    }, {
      key: "_animateSidenavOut",
      value: function _animateSidenavOut() {
        var _this33 = this;

        var endPercent = this.options.edge === 'left' ? -1 : 1;
        var slideOutPercent = 0;
        if (this.isDragged) {
          slideOutPercent = this.options.edge === 'left' ? endPercent + this.percentOpen : endPercent - this.percentOpen;
        }

        anim.remove(this.el);
        anim({
          targets: this.el,
          translateX: [slideOutPercent * 100 + "%", endPercent * 105 + "%"],
          duration: this.options.outDuration,
          easing: 'easeOutQuad',
          complete: function () {
            // Run onOpenEnd callback
            if (typeof _this33.options.onCloseEnd === 'function') {
              _this33.options.onCloseEnd.call(_this33, _this33.el);
            }
          }
        });
      }
    }, {
      key: "_animateOverlayOut",
      value: function _animateOverlayOut() {
        var _this34 = this;

        anim.remove(this._overlay);
        anim({
          targets: this._overlay,
          opacity: 0,
          duration: this.options.outDuration,
          easing: 'easeOutQuad',
          complete: function () {
            $(_this34._overlay).css('display', 'none');
          }
        });
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Sidenav.__proto__ || Object.getPrototypeOf(Sidenav), "init", this).call(this, this, els, options);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Sidenav;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Sidenav;
  }(Component);

  /**
   * @static
   * @memberof Sidenav
   * @type {Array.<Sidenav>}
   */


  Sidenav._sidenavs = [];

  M.Sidenav = Sidenav;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Sidenav, 'sidenav', 'M_Sidenav');
  }
})(cash, M.anime);
;(function ($, anim) {
  'use strict';

  var _defaults = {
    throttle: 100,
    scrollOffset: 200, // offset - 200 allows elements near bottom of page to scroll
    activeClass: 'active',
    getActiveElement: function (id) {
      return 'a[href="#' + id + '"]';
    }
  };

  /**
   * @class
   *
   */

  var ScrollSpy = function (_Component9) {
    _inherits(ScrollSpy, _Component9);

    /**
     * Construct ScrollSpy instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function ScrollSpy(el, options) {
      _classCallCheck(this, ScrollSpy);

      var _this35 = _possibleConstructorReturn(this, (ScrollSpy.__proto__ || Object.getPrototypeOf(ScrollSpy)).call(this, ScrollSpy, el, options));

      _this35.el.M_ScrollSpy = _this35;

      /**
       * Options for the modal
       * @member Modal#options
       * @prop {Number} [throttle=100] - Throttle of scroll handler
       * @prop {Number} [scrollOffset=200] - Offset for centering element when scrolled to
       * @prop {String} [activeClass='active'] - Class applied to active elements
       * @prop {Function} [getActiveElement] - Used to find active element
       */
      _this35.options = $.extend({}, ScrollSpy.defaults, options);

      // setup
      ScrollSpy._elements.push(_this35);
      ScrollSpy._count++;
      ScrollSpy._increment++;
      _this35.tickId = -1;
      _this35.id = ScrollSpy._increment;
      _this35._setupEventHandlers();
      _this35._handleWindowScroll();
      return _this35;
    }

    _createClass(ScrollSpy, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        ScrollSpy._elements.splice(ScrollSpy._elements.indexOf(this), 1);
        ScrollSpy._elementsInView.splice(ScrollSpy._elementsInView.indexOf(this), 1);
        ScrollSpy._visibleElements.splice(ScrollSpy._visibleElements.indexOf(this.$el), 1);
        ScrollSpy._count--;
        this._removeEventHandlers();
        $(this.options.getActiveElement(this.$el.attr('id'))).removeClass(this.options.activeClass);
        this.el.M_ScrollSpy = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        var throttledResize = M.throttle(this._handleWindowScroll, 200);
        this._handleThrottledResizeBound = throttledResize.bind(this);
        this._handleWindowScrollBound = this._handleWindowScroll.bind(this);
        if (ScrollSpy._count === 1) {
          window.addEventListener('scroll', this._handleWindowScrollBound);
          window.addEventListener('resize', this._handleThrottledResizeBound);
          document.body.addEventListener('click', this._handleTriggerClick);
        }
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        if (ScrollSpy._count === 0) {
          window.removeEventListener('scroll', this._handleWindowScrollBound);
          window.removeEventListener('resize', this._handleThrottledResizeBound);
          document.body.removeEventListener('click', this._handleTriggerClick);
        }
      }

      /**
       * Handle Trigger Click
       * @param {Event} e
       */

    }, {
      key: "_handleTriggerClick",
      value: function _handleTriggerClick(e) {
        var $trigger = $(e.target);
        for (var i = ScrollSpy._elements.length - 1; i >= 0; i--) {
          var scrollspy = ScrollSpy._elements[i];
          if ($trigger.is('a[href="#' + scrollspy.$el.attr('id') + '"]')) {
            e.preventDefault();
            var offset = scrollspy.$el.offset().top + 1;

            anim({
              targets: [document.documentElement, document.body],
              scrollTop: offset - scrollspy.options.scrollOffset,
              duration: 400,
              easing: 'easeOutCubic'
            });
            break;
          }
        }
      }

      /**
       * Handle Window Scroll
       */

    }, {
      key: "_handleWindowScroll",
      value: function _handleWindowScroll() {
        // unique tick id
        ScrollSpy._ticks++;

        // viewport rectangle
        var top = M.getDocumentScrollTop(),
            left = M.getDocumentScrollLeft(),
            right = left + window.innerWidth,
            bottom = top + window.innerHeight;

        // determine which elements are in view
        var intersections = ScrollSpy._findElements(top, right, bottom, left);
        for (var i = 0; i < intersections.length; i++) {
          var scrollspy = intersections[i];
          var lastTick = scrollspy.tickId;
          if (lastTick < 0) {
            // entered into view
            scrollspy._enter();
          }

          // update tick id
          scrollspy.tickId = ScrollSpy._ticks;
        }

        for (var _i = 0; _i < ScrollSpy._elementsInView.length; _i++) {
          var _scrollspy = ScrollSpy._elementsInView[_i];
          var _lastTick = _scrollspy.tickId;
          if (_lastTick >= 0 && _lastTick !== ScrollSpy._ticks) {
            // exited from view
            _scrollspy._exit();
            _scrollspy.tickId = -1;
          }
        }

        // remember elements in view for next tick
        ScrollSpy._elementsInView = intersections;
      }

      /**
       * Find elements that are within the boundary
       * @param {number} top
       * @param {number} right
       * @param {number} bottom
       * @param {number} left
       * @return {Array.<ScrollSpy>}   A collection of elements
       */

    }, {
      key: "_enter",
      value: function _enter() {
        ScrollSpy._visibleElements = ScrollSpy._visibleElements.filter(function (value) {
          return value.height() != 0;
        });

        if (ScrollSpy._visibleElements[0]) {
          $(this.options.getActiveElement(ScrollSpy._visibleElements[0].attr('id'))).removeClass(this.options.activeClass);
          if (ScrollSpy._visibleElements[0][0].M_ScrollSpy && this.id < ScrollSpy._visibleElements[0][0].M_ScrollSpy.id) {
            ScrollSpy._visibleElements.unshift(this.$el);
          } else {
            ScrollSpy._visibleElements.push(this.$el);
          }
        } else {
          ScrollSpy._visibleElements.push(this.$el);
        }

        $(this.options.getActiveElement(ScrollSpy._visibleElements[0].attr('id'))).addClass(this.options.activeClass);
      }
    }, {
      key: "_exit",
      value: function _exit() {
        var _this36 = this;

        ScrollSpy._visibleElements = ScrollSpy._visibleElements.filter(function (value) {
          return value.height() != 0;
        });

        if (ScrollSpy._visibleElements[0]) {
          $(this.options.getActiveElement(ScrollSpy._visibleElements[0].attr('id'))).removeClass(this.options.activeClass);

          ScrollSpy._visibleElements = ScrollSpy._visibleElements.filter(function (el) {
            return el.attr('id') != _this36.$el.attr('id');
          });
          if (ScrollSpy._visibleElements[0]) {
            // Check if empty
            $(this.options.getActiveElement(ScrollSpy._visibleElements[0].attr('id'))).addClass(this.options.activeClass);
          }
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(ScrollSpy.__proto__ || Object.getPrototypeOf(ScrollSpy), "init", this).call(this, this, els, options);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_ScrollSpy;
      }
    }, {
      key: "_findElements",
      value: function _findElements(top, right, bottom, left) {
        var hits = [];
        for (var i = 0; i < ScrollSpy._elements.length; i++) {
          var scrollspy = ScrollSpy._elements[i];
          var currTop = top + scrollspy.options.scrollOffset || 200;

          if (scrollspy.$el.height() > 0) {
            var elTop = scrollspy.$el.offset().top,
                elLeft = scrollspy.$el.offset().left,
                elRight = elLeft + scrollspy.$el.width(),
                elBottom = elTop + scrollspy.$el.height();

            var isIntersect = !(elLeft > right || elRight < left || elTop > bottom || elBottom < currTop);

            if (isIntersect) {
              hits.push(scrollspy);
            }
          }
        }
        return hits;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return ScrollSpy;
  }(Component);

  /**
   * @static
   * @memberof ScrollSpy
   * @type {Array.<ScrollSpy>}
   */


  ScrollSpy._elements = [];

  /**
   * @static
   * @memberof ScrollSpy
   * @type {Array.<ScrollSpy>}
   */
  ScrollSpy._elementsInView = [];

  /**
   * @static
   * @memberof ScrollSpy
   * @type {Array.<cash>}
   */
  ScrollSpy._visibleElements = [];

  /**
   * @static
   * @memberof ScrollSpy
   */
  ScrollSpy._count = 0;

  /**
   * @static
   * @memberof ScrollSpy
   */
  ScrollSpy._increment = 0;

  /**
   * @static
   * @memberof ScrollSpy
   */
  ScrollSpy._ticks = 0;

  M.ScrollSpy = ScrollSpy;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(ScrollSpy, 'scrollSpy', 'M_ScrollSpy');
  }
})(cash, M.anime);
;(function ($) {
  'use strict';

  var _defaults = {
    data: {}, // Autocomplete data set
    limit: Infinity, // Limit of results the autocomplete shows
    onAutocomplete: null, // Callback for when autocompleted
    minLength: 1, // Min characters before autocomplete starts
    sortFunction: function (a, b, inputString) {
      // Sort function for sorting autocomplete results
      return a.indexOf(inputString) - b.indexOf(inputString);
    }
  };

  /**
   * @class
   *
   */

  var Autocomplete = function (_Component10) {
    _inherits(Autocomplete, _Component10);

    /**
     * Construct Autocomplete instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Autocomplete(el, options) {
      _classCallCheck(this, Autocomplete);

      var _this37 = _possibleConstructorReturn(this, (Autocomplete.__proto__ || Object.getPrototypeOf(Autocomplete)).call(this, Autocomplete, el, options));

      _this37.el.M_Autocomplete = _this37;

      /**
       * Options for the autocomplete
       * @member Autocomplete#options
       * @prop {Number} duration
       * @prop {Number} dist
       * @prop {number} shift
       * @prop {number} padding
       * @prop {Boolean} fullWidth
       * @prop {Boolean} indicators
       * @prop {Boolean} noWrap
       * @prop {Function} onCycleTo
       */
      _this37.options = $.extend({}, Autocomplete.defaults, options);

      // Setup
      _this37.isOpen = false;
      _this37.count = 0;
      _this37.activeIndex = -1;
      _this37.oldVal;
      _this37.$inputField = _this37.$el.closest('.input-field');
      _this37.$active = $();
      _this37._mousedown = false;
      _this37._setupDropdown();

      _this37._setupEventHandlers();
      return _this37;
    }

    _createClass(Autocomplete, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this._removeDropdown();
        this.el.M_Autocomplete = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleInputBlurBound = this._handleInputBlur.bind(this);
        this._handleInputKeyupAndFocusBound = this._handleInputKeyupAndFocus.bind(this);
        this._handleInputKeydownBound = this._handleInputKeydown.bind(this);
        this._handleInputClickBound = this._handleInputClick.bind(this);
        this._handleContainerMousedownAndTouchstartBound = this._handleContainerMousedownAndTouchstart.bind(this);
        this._handleContainerMouseupAndTouchendBound = this._handleContainerMouseupAndTouchend.bind(this);

        this.el.addEventListener('blur', this._handleInputBlurBound);
        this.el.addEventListener('keyup', this._handleInputKeyupAndFocusBound);
        this.el.addEventListener('focus', this._handleInputKeyupAndFocusBound);
        this.el.addEventListener('keydown', this._handleInputKeydownBound);
        this.el.addEventListener('click', this._handleInputClickBound);
        this.container.addEventListener('mousedown', this._handleContainerMousedownAndTouchstartBound);
        this.container.addEventListener('mouseup', this._handleContainerMouseupAndTouchendBound);

        if (typeof window.ontouchstart !== 'undefined') {
          this.container.addEventListener('touchstart', this._handleContainerMousedownAndTouchstartBound);
          this.container.addEventListener('touchend', this._handleContainerMouseupAndTouchendBound);
        }
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener('blur', this._handleInputBlurBound);
        this.el.removeEventListener('keyup', this._handleInputKeyupAndFocusBound);
        this.el.removeEventListener('focus', this._handleInputKeyupAndFocusBound);
        this.el.removeEventListener('keydown', this._handleInputKeydownBound);
        this.el.removeEventListener('click', this._handleInputClickBound);
        this.container.removeEventListener('mousedown', this._handleContainerMousedownAndTouchstartBound);
        this.container.removeEventListener('mouseup', this._handleContainerMouseupAndTouchendBound);

        if (typeof window.ontouchstart !== 'undefined') {
          this.container.removeEventListener('touchstart', this._handleContainerMousedownAndTouchstartBound);
          this.container.removeEventListener('touchend', this._handleContainerMouseupAndTouchendBound);
        }
      }

      /**
       * Setup dropdown
       */

    }, {
      key: "_setupDropdown",
      value: function _setupDropdown() {
        var _this38 = this;

        this.container = document.createElement('ul');
        this.container.id = "autocomplete-options-" + M.guid();
        $(this.container).addClass('autocomplete-content dropdown-content');
        this.$inputField.append(this.container);
        this.el.setAttribute('data-target', this.container.id);

        this.dropdown = M.Dropdown.init(this.el, {
          autoFocus: false,
          closeOnClick: false,
          coverTrigger: false,
          onItemClick: function (itemEl) {
            _this38.selectOption($(itemEl));
          }
        });

        // Sketchy removal of dropdown click handler
        this.el.removeEventListener('click', this.dropdown._handleClickBound);
      }

      /**
       * Remove dropdown
       */

    }, {
      key: "_removeDropdown",
      value: function _removeDropdown() {
        this.container.parentNode.removeChild(this.container);
      }

      /**
       * Handle Input Blur
       */

    }, {
      key: "_handleInputBlur",
      value: function _handleInputBlur() {
        if (!this._mousedown) {
          this.close();
          this._resetAutocomplete();
        }
      }

      /**
       * Handle Input Keyup and Focus
       * @param {Event} e
       */

    }, {
      key: "_handleInputKeyupAndFocus",
      value: function _handleInputKeyupAndFocus(e) {
        if (e.type === 'keyup') {
          Autocomplete._keydown = false;
        }

        this.count = 0;
        var val = this.el.value.toLowerCase();

        // Don't capture enter or arrow key usage.
        if (e.keyCode === 13 || e.keyCode === 38 || e.keyCode === 40) {
          return;
        }

        // Check if the input isn't empty
        // Check if focus triggered by tab
        if (this.oldVal !== val && (M.tabPressed || e.type !== 'focus')) {
          this.open();
        }

        // Update oldVal
        this.oldVal = val;
      }

      /**
       * Handle Input Keydown
       * @param {Event} e
       */

    }, {
      key: "_handleInputKeydown",
      value: function _handleInputKeydown(e) {
        Autocomplete._keydown = true;

        // Arrow keys and enter key usage
        var keyCode = e.keyCode,
            liElement = void 0,
            numItems = $(this.container).children('li').length;

        // select element on Enter
        if (keyCode === M.keys.ENTER && this.activeIndex >= 0) {
          liElement = $(this.container).children('li').eq(this.activeIndex);
          if (liElement.length) {
            this.selectOption(liElement);
            e.preventDefault();
          }
          return;
        }

        // Capture up and down key
        if (keyCode === M.keys.ARROW_UP || keyCode === M.keys.ARROW_DOWN) {
          e.preventDefault();

          if (keyCode === M.keys.ARROW_UP && this.activeIndex > 0) {
            this.activeIndex--;
          }

          if (keyCode === M.keys.ARROW_DOWN && this.activeIndex < numItems - 1) {
            this.activeIndex++;
          }

          this.$active.removeClass('active');
          if (this.activeIndex >= 0) {
            this.$active = $(this.container).children('li').eq(this.activeIndex);
            this.$active.addClass('active');
          }
        }
      }

      /**
       * Handle Input Click
       * @param {Event} e
       */

    }, {
      key: "_handleInputClick",
      value: function _handleInputClick(e) {
        this.open();
      }

      /**
       * Handle Container Mousedown and Touchstart
       * @param {Event} e
       */

    }, {
      key: "_handleContainerMousedownAndTouchstart",
      value: function _handleContainerMousedownAndTouchstart(e) {
        this._mousedown = true;
      }

      /**
       * Handle Container Mouseup and Touchend
       * @param {Event} e
       */

    }, {
      key: "_handleContainerMouseupAndTouchend",
      value: function _handleContainerMouseupAndTouchend(e) {
        this._mousedown = false;
      }

      /**
       * Highlight partial match
       */

    }, {
      key: "_highlight",
      value: function _highlight(string, $el) {
        var img = $el.find('img');
        var matchStart = $el.text().toLowerCase().indexOf('' + string.toLowerCase() + ''),
            matchEnd = matchStart + string.length - 1,
            beforeMatch = $el.text().slice(0, matchStart),
            matchText = $el.text().slice(matchStart, matchEnd + 1),
            afterMatch = $el.text().slice(matchEnd + 1);
        $el.html("<span>" + beforeMatch + "<span class='highlight'>" + matchText + "</span>" + afterMatch + "</span>");
        if (img.length) {
          $el.prepend(img);
        }
      }

      /**
       * Reset current element position
       */

    }, {
      key: "_resetCurrentElement",
      value: function _resetCurrentElement() {
        this.activeIndex = -1;
        this.$active.removeClass('active');
      }

      /**
       * Reset autocomplete elements
       */

    }, {
      key: "_resetAutocomplete",
      value: function _resetAutocomplete() {
        $(this.container).empty();
        this._resetCurrentElement();
        this.oldVal = null;
        this.isOpen = false;
        this._mousedown = false;
      }

      /**
       * Select autocomplete option
       * @param {Element} el  Autocomplete option list item element
       */

    }, {
      key: "selectOption",
      value: function selectOption(el) {
        var text = el.text().trim();
        this.el.value = text;
        this.$el.trigger('change');
        this._resetAutocomplete();
        this.close();

        // Handle onAutocomplete callback.
        if (typeof this.options.onAutocomplete === 'function') {
          this.options.onAutocomplete.call(this, text);
        }
      }

      /**
       * Render dropdown content
       * @param {Object} data  data set
       * @param {String} val  current input value
       */

    }, {
      key: "_renderDropdown",
      value: function _renderDropdown(data, val) {
        var _this39 = this;

        this._resetAutocomplete();

        var matchingData = [];

        // Gather all matching data
        for (var key in data) {
          if (data.hasOwnProperty(key) && key.toLowerCase().indexOf(val) !== -1) {
            // Break if past limit
            if (this.count >= this.options.limit) {
              break;
            }

            var entry = {
              data: data[key],
              key: key
            };
            matchingData.push(entry);

            this.count++;
          }
        }

        // Sort
        if (this.options.sortFunction) {
          var sortFunctionBound = function (a, b) {
            return _this39.options.sortFunction(a.key.toLowerCase(), b.key.toLowerCase(), val.toLowerCase());
          };
          matchingData.sort(sortFunctionBound);
        }

        // Render
        for (var i = 0; i < matchingData.length; i++) {
          var _entry = matchingData[i];
          var $autocompleteOption = $('<li></li>');
          if (!!_entry.data) {
            $autocompleteOption.append("<img src=\"" + _entry.data + "\" class=\"right circle\"><span>" + _entry.key + "</span>");
          } else {
            $autocompleteOption.append('<span>' + _entry.key + '</span>');
          }

          $(this.container).append($autocompleteOption);
          this._highlight(val, $autocompleteOption);
        }
      }

      /**
       * Open Autocomplete Dropdown
       */

    }, {
      key: "open",
      value: function open() {
        var val = this.el.value.toLowerCase();

        this._resetAutocomplete();

        if (val.length >= this.options.minLength) {
          this.isOpen = true;
          this._renderDropdown(this.options.data, val);
        }

        // Open dropdown
        if (!this.dropdown.isOpen) {
          this.dropdown.open();
        } else {
          // Recalculate dropdown when its already open
          this.dropdown.recalculateDimensions();
        }
      }

      /**
       * Close Autocomplete Dropdown
       */

    }, {
      key: "close",
      value: function close() {
        this.dropdown.close();
      }

      /**
       * Update Data
       * @param {Object} data
       */

    }, {
      key: "updateData",
      value: function updateData(data) {
        var val = this.el.value.toLowerCase();
        this.options.data = data;

        if (this.isOpen) {
          this._renderDropdown(data, val);
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Autocomplete.__proto__ || Object.getPrototypeOf(Autocomplete), "init", this).call(this, this, els, options);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Autocomplete;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Autocomplete;
  }(Component);

  /**
   * @static
   * @memberof Autocomplete
   */


  Autocomplete._keydown = false;

  M.Autocomplete = Autocomplete;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Autocomplete, 'autocomplete', 'M_Autocomplete');
  }
})(cash);
;(function ($) {
  // Function to update labels of text fields
  M.updateTextFields = function () {
    var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], input[type=date], input[type=time], textarea';
    $(input_selector).each(function (element, index) {
      var $this = $(this);
      if (element.value.length > 0 || $(element).is(':focus') || element.autofocus || $this.attr('placeholder') !== null) {
        $this.siblings('label').addClass('active');
      } else if (element.validity) {
        $this.siblings('label').toggleClass('active', element.validity.badInput === true);
      } else {
        $this.siblings('label').removeClass('active');
      }
    });
  };

  M.validate_field = function (object) {
    var hasLength = object.attr('data-length') !== null;
    var lenAttr = parseInt(object.attr('data-length'));
    var len = object[0].value.length;

    if (len === 0 && object[0].validity.badInput === false && !object.is(':required')) {
      if (object.hasClass('validate')) {
        object.removeClass('valid');
        object.removeClass('invalid');
      }
    } else {
      if (object.hasClass('validate')) {
        // Check for character counter attributes
        if (object.is(':valid') && hasLength && len <= lenAttr || object.is(':valid') && !hasLength) {
          object.removeClass('invalid');
          object.addClass('valid');
        } else {
          object.removeClass('valid');
          object.addClass('invalid');
        }
      }
    }
  };

  M.textareaAutoResize = function ($textarea) {
    // Wrap if native element
    if ($textarea instanceof Element) {
      $textarea = $($textarea);
    }

    if (!$textarea.length) {
      console.error('No textarea element found');
      return;
    }

    // Textarea Auto Resize
    var hiddenDiv = $('.hiddendiv').first();
    if (!hiddenDiv.length) {
      hiddenDiv = $('<div class="hiddendiv common"></div>');
      $('body').append(hiddenDiv);
    }

    // Set font properties of hiddenDiv
    var fontFamily = $textarea.css('font-family');
    var fontSize = $textarea.css('font-size');
    var lineHeight = $textarea.css('line-height');

    // Firefox can't handle padding shorthand.
    var paddingTop = $textarea.css('padding-top');
    var paddingRight = $textarea.css('padding-right');
    var paddingBottom = $textarea.css('padding-bottom');
    var paddingLeft = $textarea.css('padding-left');

    if (fontSize) {
      hiddenDiv.css('font-size', fontSize);
    }
    if (fontFamily) {
      hiddenDiv.css('font-family', fontFamily);
    }
    if (lineHeight) {
      hiddenDiv.css('line-height', lineHeight);
    }
    if (paddingTop) {
      hiddenDiv.css('padding-top', paddingTop);
    }
    if (paddingRight) {
      hiddenDiv.css('padding-right', paddingRight);
    }
    if (paddingBottom) {
      hiddenDiv.css('padding-bottom', paddingBottom);
    }
    if (paddingLeft) {
      hiddenDiv.css('padding-left', paddingLeft);
    }

    // Set original-height, if none
    if (!$textarea.data('original-height')) {
      $textarea.data('original-height', $textarea.height());
    }

    if ($textarea.attr('wrap') === 'off') {
      hiddenDiv.css('overflow-wrap', 'normal').css('white-space', 'pre');
    }

    hiddenDiv.text($textarea[0].value + '\n');
    var content = hiddenDiv.html().replace(/\n/g, '<br>');
    hiddenDiv.html(content);

    // When textarea is hidden, width goes crazy.
    // Approximate with half of window size

    if ($textarea[0].offsetWidth > 0 && $textarea[0].offsetHeight > 0) {
      hiddenDiv.css('width', $textarea.width() + 'px');
    } else {
      hiddenDiv.css('width', window.innerWidth / 2 + 'px');
    }

    /**
     * Resize if the new height is greater than the
     * original height of the textarea
     */
    if ($textarea.data('original-height') <= hiddenDiv.innerHeight()) {
      $textarea.css('height', hiddenDiv.innerHeight() + 'px');
    } else if ($textarea[0].value.length < $textarea.data('previous-length')) {
      /**
       * In case the new height is less than original height, it
       * means the textarea has less text than before
       * So we set the height to the original one
       */
      $textarea.css('height', $textarea.data('original-height') + 'px');
    }
    $textarea.data('previous-length', $textarea[0].value.length);
  };

  $(document).ready(function () {
    // Text based inputs
    var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], input[type=date], input[type=time], textarea';

    // Add active if form auto complete
    $(document).on('change', input_selector, function () {
      if (this.value.length !== 0 || $(this).attr('placeholder') !== null) {
        $(this).siblings('label').addClass('active');
      }
      M.validate_field($(this));
    });

    // Add active if input element has been pre-populated on document ready
    $(document).ready(function () {
      M.updateTextFields();
    });

    // HTML DOM FORM RESET handling
    $(document).on('reset', function (e) {
      var formReset = $(e.target);
      if (formReset.is('form')) {
        formReset.find(input_selector).removeClass('valid').removeClass('invalid');
        formReset.find(input_selector).each(function (e) {
          if (this.value.length) {
            $(this).siblings('label').removeClass('active');
          }
        });

        // Reset select (after native reset)
        setTimeout(function () {
          formReset.find('select').each(function () {
            // check if initialized
            if (this.M_FormSelect) {
              $(this).trigger('change');
            }
          });
        }, 0);
      }
    });

    /**
     * Add active when element has focus
     * @param {Event} e
     */
    document.addEventListener('focus', function (e) {
      if ($(e.target).is(input_selector)) {
        $(e.target).siblings('label, .prefix').addClass('active');
      }
    }, true);

    /**
     * Remove active when element is blurred
     * @param {Event} e
     */
    document.addEventListener('blur', function (e) {
      var $inputElement = $(e.target);
      if ($inputElement.is(input_selector)) {
        var selector = '.prefix';

        if ($inputElement[0].value.length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr('placeholder') === null) {
          selector += ', label';
        }
        $inputElement.siblings(selector).removeClass('active');
        M.validate_field($inputElement);
      }
    }, true);

    // Radio and Checkbox focus class
    var radio_checkbox = 'input[type=radio], input[type=checkbox]';
    $(document).on('keyup', radio_checkbox, function (e) {
      // TAB, check if tabbing to radio or checkbox.
      if (e.which === M.keys.TAB) {
        $(this).addClass('tabbed');
        var $this = $(this);
        $this.one('blur', function (e) {
          $(this).removeClass('tabbed');
        });
        return;
      }
    });

    var text_area_selector = '.materialize-textarea';
    $(text_area_selector).each(function () {
      var $textarea = $(this);
      /**
       * Resize textarea on document load after storing
       * the original height and the original length
       */
      $textarea.data('original-height', $textarea.height());
      $textarea.data('previous-length', this.value.length);
      M.textareaAutoResize($textarea);
    });

    $(document).on('keyup', text_area_selector, function () {
      M.textareaAutoResize($(this));
    });
    $(document).on('keydown', text_area_selector, function () {
      M.textareaAutoResize($(this));
    });

    // File Input Path
    $(document).on('change', '.file-field input[type="file"]', function () {
      var file_field = $(this).closest('.file-field');
      var path_input = file_field.find('input.file-path');
      var files = $(this)[0].files;
      var file_names = [];
      for (var i = 0; i < files.length; i++) {
        file_names.push(files[i].name);
      }
      path_input[0].value = file_names.join(', ');
      path_input.trigger('change');
    });
  }); // End of $(document).ready
})(cash);
;(function ($, anim) {
  'use strict';

  var _defaults = {
    indicators: true,
    height: 400,
    duration: 500,
    interval: 6000
  };

  /**
   * @class
   *
   */

  var Slider = function (_Component11) {
    _inherits(Slider, _Component11);

    /**
     * Construct Slider instance and set up overlay
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Slider(el, options) {
      _classCallCheck(this, Slider);

      var _this40 = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, Slider, el, options));

      _this40.el.M_Slider = _this40;

      /**
       * Options for the modal
       * @member Slider#options
       * @prop {Boolean} [indicators=true] - Show indicators
       * @prop {Number} [height=400] - height of slider
       * @prop {Number} [duration=500] - Length in ms of slide transition
       * @prop {Number} [interval=6000] - Length in ms of slide interval
       */
      _this40.options = $.extend({}, Slider.defaults, options);

      // setup
      _this40.$slider = _this40.$el.find('.slides');
      _this40.$slides = _this40.$slider.children('li');
      _this40.activeIndex = _this40.$slides.filter(function (item) {
        return $(item).hasClass('active');
      }).first().index();
      if (_this40.activeIndex != -1) {
        _this40.$active = _this40.$slides.eq(_this40.activeIndex);
      }

      _this40._setSliderHeight();

      // Set initial positions of captions
      _this40.$slides.find('.caption').each(function (el) {
        _this40._animateCaptionIn(el, 0);
      });

      // Move img src into background-image
      _this40.$slides.find('img').each(function (el) {
        var placeholderBase64 = 'data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
        if ($(el).attr('src') !== placeholderBase64) {
          $(el).css('background-image', 'url("' + $(el).attr('src') + '")');
          $(el).attr('src', placeholderBase64);
        }
      });

      _this40._setupIndicators();

      // Show active slide
      if (_this40.$active) {
        _this40.$active.css('display', 'block');
      } else {
        _this40.$slides.first().addClass('active');
        anim({
          targets: _this40.$slides.first()[0],
          opacity: 1,
          duration: _this40.options.duration,
          easing: 'easeOutQuad'
        });

        _this40.activeIndex = 0;
        _this40.$active = _this40.$slides.eq(_this40.activeIndex);

        // Update indicators
        if (_this40.options.indicators) {
          _this40.$indicators.eq(_this40.activeIndex).addClass('active');
        }
      }

      // Adjust height to current slide
      _this40.$active.find('img').each(function (el) {
        anim({
          targets: _this40.$active.find('.caption')[0],
          opacity: 1,
          translateX: 0,
          translateY: 0,
          duration: _this40.options.duration,
          easing: 'easeOutQuad'
        });
      });

      _this40._setupEventHandlers();

      // auto scroll
      _this40.start();
      return _this40;
    }

    _createClass(Slider, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this.pause();
        this._removeIndicators();
        this._removeEventHandlers();
        this.el.M_Slider = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        var _this41 = this;

        this._handleIntervalBound = this._handleInterval.bind(this);
        this._handleIndicatorClickBound = this._handleIndicatorClick.bind(this);

        if (this.options.indicators) {
          this.$indicators.each(function (el) {
            el.addEventListener('click', _this41._handleIndicatorClickBound);
          });
        }
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        var _this42 = this;

        if (this.options.indicators) {
          this.$indicators.each(function (el) {
            el.removeEventListener('click', _this42._handleIndicatorClickBound);
          });
        }
      }

      /**
       * Handle indicator click
       * @param {Event} e
       */

    }, {
      key: "_handleIndicatorClick",
      value: function _handleIndicatorClick(e) {
        var currIndex = $(e.target).index();
        this.set(currIndex);
      }

      /**
       * Handle Interval
       */

    }, {
      key: "_handleInterval",
      value: function _handleInterval() {
        var newActiveIndex = this.$slider.find('.active').index();
        if (this.$slides.length === newActiveIndex + 1) newActiveIndex = 0;
        // loop to start
        else newActiveIndex += 1;

        this.set(newActiveIndex);
      }

      /**
       * Animate in caption
       * @param {Element} caption
       * @param {Number} duration
       */

    }, {
      key: "_animateCaptionIn",
      value: function _animateCaptionIn(caption, duration) {
        var animOptions = {
          targets: caption,
          opacity: 0,
          duration: duration,
          easing: 'easeOutQuad'
        };

        if ($(caption).hasClass('center-align')) {
          animOptions.translateY = -100;
        } else if ($(caption).hasClass('right-align')) {
          animOptions.translateX = 100;
        } else if ($(caption).hasClass('left-align')) {
          animOptions.translateX = -100;
        }

        anim(animOptions);
      }

      /**
       * Set height of slider
       */

    }, {
      key: "_setSliderHeight",
      value: function _setSliderHeight() {
        // If fullscreen, do nothing
        if (!this.$el.hasClass('fullscreen')) {
          if (this.options.indicators) {
            // Add height if indicators are present
            this.$el.css('height', this.options.height + 40 + 'px');
          } else {
            this.$el.css('height', this.options.height + 'px');
          }
          this.$slider.css('height', this.options.height + 'px');
        }
      }

      /**
       * Setup indicators
       */

    }, {
      key: "_setupIndicators",
      value: function _setupIndicators() {
        var _this43 = this;

        if (this.options.indicators) {
          this.$indicators = $('<ul class="indicators"></ul>');
          this.$slides.each(function (el, index) {
            var $indicator = $('<li class="indicator-item"></li>');
            _this43.$indicators.append($indicator[0]);
          });
          this.$el.append(this.$indicators[0]);
          this.$indicators = this.$indicators.children('li.indicator-item');
        }
      }

      /**
       * Remove indicators
       */

    }, {
      key: "_removeIndicators",
      value: function _removeIndicators() {
        this.$el.find('ul.indicators').remove();
      }

      /**
       * Cycle to nth item
       * @param {Number} index
       */

    }, {
      key: "set",
      value: function set(index) {
        var _this44 = this;

        // Wrap around indices.
        if (index >= this.$slides.length) index = 0;else if (index < 0) index = this.$slides.length - 1;

        // Only do if index changes
        if (this.activeIndex != index) {
          this.$active = this.$slides.eq(this.activeIndex);
          var $caption = this.$active.find('.caption');
          this.$active.removeClass('active');

          anim({
            targets: this.$active[0],
            opacity: 0,
            duration: this.options.duration,
            easing: 'easeOutQuad',
            complete: function () {
              _this44.$slides.not('.active').each(function (el) {
                anim({
                  targets: el,
                  opacity: 0,
                  translateX: 0,
                  translateY: 0,
                  duration: 0,
                  easing: 'easeOutQuad'
                });
              });
            }
          });

          this._animateCaptionIn($caption[0], this.options.duration);

          // Update indicators
          if (this.options.indicators) {
            this.$indicators.eq(this.activeIndex).removeClass('active');
            this.$indicators.eq(index).addClass('active');
          }

          anim({
            targets: this.$slides.eq(index)[0],
            opacity: 1,
            duration: this.options.duration,
            easing: 'easeOutQuad'
          });

          anim({
            targets: this.$slides.eq(index).find('.caption')[0],
            opacity: 1,
            translateX: 0,
            translateY: 0,
            duration: this.options.duration,
            delay: this.options.duration,
            easing: 'easeOutQuad'
          });

          this.$slides.eq(index).addClass('active');
          this.activeIndex = index;

          // Reset interval
          this.start();
        }
      }

      /**
       * Pause slider interval
       */

    }, {
      key: "pause",
      value: function pause() {
        clearInterval(this.interval);
      }

      /**
       * Start slider interval
       */

    }, {
      key: "start",
      value: function start() {
        clearInterval(this.interval);
        this.interval = setInterval(this._handleIntervalBound, this.options.duration + this.options.interval);
      }

      /**
       * Move to next slide
       */

    }, {
      key: "next",
      value: function next() {
        var newIndex = this.activeIndex + 1;

        // Wrap around indices.
        if (newIndex >= this.$slides.length) newIndex = 0;else if (newIndex < 0) newIndex = this.$slides.length - 1;

        this.set(newIndex);
      }

      /**
       * Move to previous slide
       */

    }, {
      key: "prev",
      value: function prev() {
        var newIndex = this.activeIndex - 1;

        // Wrap around indices.
        if (newIndex >= this.$slides.length) newIndex = 0;else if (newIndex < 0) newIndex = this.$slides.length - 1;

        this.set(newIndex);
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Slider.__proto__ || Object.getPrototypeOf(Slider), "init", this).call(this, this, els, options);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Slider;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Slider;
  }(Component);

  M.Slider = Slider;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Slider, 'slider', 'M_Slider');
  }
})(cash, M.anime);
;(function ($, anim) {
  $(document).on('click', '.card', function (e) {
    if ($(this).children('.card-reveal').length) {
      var $card = $(e.target).closest('.card');
      if ($card.data('initialOverflow') === undefined) {
        $card.data('initialOverflow', $card.css('overflow') === undefined ? '' : $card.css('overflow'));
      }
      var $cardReveal = $(this).find('.card-reveal');
      if ($(e.target).is($('.card-reveal .card-title')) || $(e.target).is($('.card-reveal .card-title i'))) {
        // Make Reveal animate down and display none
        anim({
          targets: $cardReveal[0],
          translateY: 0,
          duration: 225,
          easing: 'easeInOutQuad',
          complete: function (anim) {
            var el = anim.animatables[0].target;
            $(el).css({ display: 'none' });
            $card.css('overflow', $card.data('initialOverflow'));
          }
        });
      } else if ($(e.target).is($('.card .activator')) || $(e.target).is($('.card .activator i'))) {
        $card.css('overflow', 'hidden');
        $cardReveal.css({ display: 'block' });
        anim({
          targets: $cardReveal[0],
          translateY: '-100%',
          duration: 300,
          easing: 'easeInOutQuad'
        });
      }
    }
  });
})(cash, M.anime);
;(function ($) {
  'use strict';

  var _defaults = {
    data: [],
    placeholder: '',
    secondaryPlaceholder: '',
    autocompleteOptions: {},
    limit: Infinity,
    onChipAdd: null,
    onChipSelect: null,
    onChipDelete: null
  };

  /**
   * @typedef {Object} chip
   * @property {String} tag  chip tag string
   * @property {String} [image]  chip avatar image string
   */

  /**
   * @class
   *
   */

  var Chips = function (_Component12) {
    _inherits(Chips, _Component12);

    /**
     * Construct Chips instance and set up overlay
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Chips(el, options) {
      _classCallCheck(this, Chips);

      var _this45 = _possibleConstructorReturn(this, (Chips.__proto__ || Object.getPrototypeOf(Chips)).call(this, Chips, el, options));

      _this45.el.M_Chips = _this45;

      /**
       * Options for the modal
       * @member Chips#options
       * @prop {Array} data
       * @prop {String} placeholder
       * @prop {String} secondaryPlaceholder
       * @prop {Object} autocompleteOptions
       */
      _this45.options = $.extend({}, Chips.defaults, options);

      _this45.$el.addClass('chips input-field');
      _this45.chipsData = [];
      _this45.$chips = $();
      _this45._setupInput();
      _this45.hasAutocomplete = Object.keys(_this45.options.autocompleteOptions).length > 0;

      // Set input id
      if (!_this45.$input.attr('id')) {
        _this45.$input.attr('id', M.guid());
      }

      // Render initial chips
      if (_this45.options.data.length) {
        _this45.chipsData = _this45.options.data;
        _this45._renderChips(_this45.chipsData);
      }

      // Setup autocomplete if needed
      if (_this45.hasAutocomplete) {
        _this45._setupAutocomplete();
      }

      _this45._setPlaceholder();
      _this45._setupLabel();
      _this45._setupEventHandlers();
      return _this45;
    }

    _createClass(Chips, [{
      key: "getData",


      /**
       * Get Chips Data
       */
      value: function getData() {
        return this.chipsData;
      }

      /**
       * Teardown component
       */

    }, {
      key: "destroy",
      value: function destroy() {
        this._removeEventHandlers();
        this.$chips.remove();
        this.el.M_Chips = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleChipClickBound = this._handleChipClick.bind(this);
        this._handleInputKeydownBound = this._handleInputKeydown.bind(this);
        this._handleInputFocusBound = this._handleInputFocus.bind(this);
        this._handleInputBlurBound = this._handleInputBlur.bind(this);

        this.el.addEventListener('click', this._handleChipClickBound);
        document.addEventListener('keydown', Chips._handleChipsKeydown);
        document.addEventListener('keyup', Chips._handleChipsKeyup);
        this.el.addEventListener('blur', Chips._handleChipsBlur, true);
        this.$input[0].addEventListener('focus', this._handleInputFocusBound);
        this.$input[0].addEventListener('blur', this._handleInputBlurBound);
        this.$input[0].addEventListener('keydown', this._handleInputKeydownBound);
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener('click', this._handleChipClickBound);
        document.removeEventListener('keydown', Chips._handleChipsKeydown);
        document.removeEventListener('keyup', Chips._handleChipsKeyup);
        this.el.removeEventListener('blur', Chips._handleChipsBlur, true);
        this.$input[0].removeEventListener('focus', this._handleInputFocusBound);
        this.$input[0].removeEventListener('blur', this._handleInputBlurBound);
        this.$input[0].removeEventListener('keydown', this._handleInputKeydownBound);
      }

      /**
       * Handle Chip Click
       * @param {Event} e
       */

    }, {
      key: "_handleChipClick",
      value: function _handleChipClick(e) {
        var $chip = $(e.target).closest('.chip');
        var clickedClose = $(e.target).is('.close');
        if ($chip.length) {
          var index = $chip.index();
          if (clickedClose) {
            // delete chip
            this.deleteChip(index);
            this.$input[0].focus();
          } else {
            // select chip
            this.selectChip(index);
          }

          // Default handle click to focus on input
        } else {
          this.$input[0].focus();
        }
      }

      /**
       * Handle Chips Keydown
       * @param {Event} e
       */

    }, {
      key: "_handleInputFocus",


      /**
       * Handle Input Focus
       */
      value: function _handleInputFocus() {
        this.$el.addClass('focus');
      }

      /**
       * Handle Input Blur
       */

    }, {
      key: "_handleInputBlur",
      value: function _handleInputBlur() {
        this.$el.removeClass('focus');
      }

      /**
       * Handle Input Keydown
       * @param {Event} e
       */

    }, {
      key: "_handleInputKeydown",
      value: function _handleInputKeydown(e) {
        Chips._keydown = true;

        // enter
        if (e.keyCode === 13) {
          // Override enter if autocompleting.
          if (this.hasAutocomplete && this.autocomplete && this.autocomplete.isOpen) {
            return;
          }

          e.preventDefault();
          this.addChip({
            tag: this.$input[0].value
          });
          this.$input[0].value = '';

          // delete or left
        } else if ((e.keyCode === 8 || e.keyCode === 37) && this.$input[0].value === '' && this.chipsData.length) {
          e.preventDefault();
          this.selectChip(this.chipsData.length - 1);
        }
      }

      /**
       * Render Chip
       * @param {chip} chip
       * @return {Element}
       */

    }, {
      key: "_renderChip",
      value: function _renderChip(chip) {
        if (!chip.tag) {
          return;
        }

        var renderedChip = document.createElement('div');
        var closeIcon = document.createElement('i');
        renderedChip.classList.add('chip');
        renderedChip.textContent = chip.tag;
        renderedChip.setAttribute('tabindex', 0);
        $(closeIcon).addClass('material-icons close');
        closeIcon.textContent = 'close';

        // attach image if needed
        if (chip.image) {
          var img = document.createElement('img');
          img.setAttribute('src', chip.image);
          renderedChip.insertBefore(img, renderedChip.firstChild);
        }

        renderedChip.appendChild(closeIcon);
        return renderedChip;
      }

      /**
       * Render Chips
       */

    }, {
      key: "_renderChips",
      value: function _renderChips() {
        this.$chips.remove();
        for (var i = 0; i < this.chipsData.length; i++) {
          var chipEl = this._renderChip(this.chipsData[i]);
          this.$el.append(chipEl);
          this.$chips.add(chipEl);
        }

        // move input to end
        this.$el.append(this.$input[0]);
      }

      /**
       * Setup Autocomplete
       */

    }, {
      key: "_setupAutocomplete",
      value: function _setupAutocomplete() {
        var _this46 = this;

        this.options.autocompleteOptions.onAutocomplete = function (val) {
          _this46.addChip({
            tag: val
          });
          _this46.$input[0].value = '';
          _this46.$input[0].focus();
        };

        this.autocomplete = M.Autocomplete.init(this.$input[0], this.options.autocompleteOptions);
      }

      /**
       * Setup Input
       */

    }, {
      key: "_setupInput",
      value: function _setupInput() {
        this.$input = this.$el.find('input');
        if (!this.$input.length) {
          this.$input = $('<input></input>');
          this.$el.append(this.$input);
        }

        this.$input.addClass('input');
      }

      /**
       * Setup Label
       */

    }, {
      key: "_setupLabel",
      value: function _setupLabel() {
        this.$label = this.$el.find('label');
        if (this.$label.length) {
          this.$label.setAttribute('for', this.$input.attr('id'));
        }
      }

      /**
       * Set placeholder
       */

    }, {
      key: "_setPlaceholder",
      value: function _setPlaceholder() {
        if (this.chipsData !== undefined && !this.chipsData.length && this.options.placeholder) {
          $(this.$input).prop('placeholder', this.options.placeholder);
        } else if ((this.chipsData === undefined || !!this.chipsData.length) && this.options.secondaryPlaceholder) {
          $(this.$input).prop('placeholder', this.options.secondaryPlaceholder);
        }
      }

      /**
       * Check if chip is valid
       * @param {chip} chip
       */

    }, {
      key: "_isValid",
      value: function _isValid(chip) {
        if (chip.hasOwnProperty('tag') && chip.tag !== '') {
          var exists = false;
          for (var i = 0; i < this.chipsData.length; i++) {
            if (this.chipsData[i].tag === chip.tag) {
              exists = true;
              break;
            }
          }
          return !exists;
        }

        return false;
      }

      /**
       * Add chip
       * @param {chip} chip
       */

    }, {
      key: "addChip",
      value: function addChip(chip) {
        if (!this._isValid(chip) || this.chipsData.length >= this.options.limit) {
          return;
        }

        var renderedChip = this._renderChip(chip);
        this.$chips.add(renderedChip);
        this.chipsData.push(chip);
        $(this.$input).before(renderedChip);
        this._setPlaceholder();

        // fire chipAdd callback
        if (typeof this.options.onChipAdd === 'function') {
          this.options.onChipAdd.call(this, this.$el, renderedChip);
        }
      }

      /**
       * Delete chip
       * @param {Number} chip
       */

    }, {
      key: "deleteChip",
      value: function deleteChip(chipIndex) {
        var $chip = this.$chips.eq(chipIndex);
        this.$chips.eq(chipIndex).remove();
        this.$chips = this.$chips.filter(function (el) {
          return $(el).index() >= 0;
        });
        this.chipsData.splice(chipIndex, 1);
        this._setPlaceholder();

        // fire chipDelete callback
        if (typeof this.options.onChipDelete === 'function') {
          this.options.onChipDelete.call(this, this.$el, $chip[0]);
        }
      }

      /**
       * Select chip
       * @param {Number} chip
       */

    }, {
      key: "selectChip",
      value: function selectChip(chipIndex) {
        var $chip = this.$chips.eq(chipIndex);
        this._selectedChip = $chip;
        $chip[0].focus();

        // fire chipSelect callback
        if (typeof this.options.onChipSelect === 'function') {
          this.options.onChipSelect.call(this, this.$el, $chip[0]);
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Chips.__proto__ || Object.getPrototypeOf(Chips), "init", this).call(this, this, els, options);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Chips;
      }
    }, {
      key: "_handleChipsKeydown",
      value: function _handleChipsKeydown(e) {
        Chips._keydown = true;

        var $chips = $(e.target).closest('.chips');
        var chipsKeydown = e.target && $chips.length;

        // Don't handle keydown inputs on input and textarea
        if ($(e.target).is('input, textarea') || !chipsKeydown) {
          return;
        }

        var currChips = $chips[0].M_Chips;

        // backspace and delete
        if (e.keyCode === 8 || e.keyCode === 46) {
          e.preventDefault();

          var selectIndex = currChips.chipsData.length;
          if (currChips._selectedChip) {
            var index = currChips._selectedChip.index();
            currChips.deleteChip(index);
            currChips._selectedChip = null;

            // Make sure selectIndex doesn't go negative
            selectIndex = Math.max(index - 1, 0);
          }

          if (currChips.chipsData.length) {
            currChips.selectChip(selectIndex);
          }

          // left arrow key
        } else if (e.keyCode === 37) {
          if (currChips._selectedChip) {
            var _selectIndex = currChips._selectedChip.index() - 1;
            if (_selectIndex < 0) {
              return;
            }
            currChips.selectChip(_selectIndex);
          }

          // right arrow key
        } else if (e.keyCode === 39) {
          if (currChips._selectedChip) {
            var _selectIndex2 = currChips._selectedChip.index() + 1;

            if (_selectIndex2 >= currChips.chipsData.length) {
              currChips.$input[0].focus();
            } else {
              currChips.selectChip(_selectIndex2);
            }
          }
        }
      }

      /**
       * Handle Chips Keyup
       * @param {Event} e
       */

    }, {
      key: "_handleChipsKeyup",
      value: function _handleChipsKeyup(e) {
        Chips._keydown = false;
      }

      /**
       * Handle Chips Blur
       * @param {Event} e
       */

    }, {
      key: "_handleChipsBlur",
      value: function _handleChipsBlur(e) {
        if (!Chips._keydown) {
          var $chips = $(e.target).closest('.chips');
          var currChips = $chips[0].M_Chips;

          currChips._selectedChip = null;
        }
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Chips;
  }(Component);

  /**
   * @static
   * @memberof Chips
   */


  Chips._keydown = false;

  M.Chips = Chips;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Chips, 'chips', 'M_Chips');
  }

  $(document).ready(function () {
    // Handle removal of static chips.
    $(document.body).on('click', '.chip .close', function () {
      var $chips = $(this).closest('.chips');
      if ($chips.length && $chips[0].M_Chips) {
        return;
      }
      $(this).closest('.chip').remove();
    });
  });
})(cash);
;(function ($) {
  'use strict';

  var _defaults = {
    top: 0,
    bottom: Infinity,
    offset: 0,
    onPositionChange: null
  };

  /**
   * @class
   *
   */

  var Pushpin = function (_Component13) {
    _inherits(Pushpin, _Component13);

    /**
     * Construct Pushpin instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Pushpin(el, options) {
      _classCallCheck(this, Pushpin);

      var _this47 = _possibleConstructorReturn(this, (Pushpin.__proto__ || Object.getPrototypeOf(Pushpin)).call(this, Pushpin, el, options));

      _this47.el.M_Pushpin = _this47;

      /**
       * Options for the modal
       * @member Pushpin#options
       */
      _this47.options = $.extend({}, Pushpin.defaults, options);

      _this47.originalOffset = _this47.el.offsetTop;
      Pushpin._pushpins.push(_this47);
      _this47._setupEventHandlers();
      _this47._updatePosition();
      return _this47;
    }

    _createClass(Pushpin, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this.el.style.top = null;
        this._removePinClasses();
        this._removeEventHandlers();

        // Remove pushpin Inst
        var index = Pushpin._pushpins.indexOf(this);
        Pushpin._pushpins.splice(index, 1);
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        document.addEventListener('scroll', Pushpin._updateElements);
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        document.removeEventListener('scroll', Pushpin._updateElements);
      }
    }, {
      key: "_updatePosition",
      value: function _updatePosition() {
        var scrolled = M.getDocumentScrollTop() + this.options.offset;

        if (this.options.top <= scrolled && this.options.bottom >= scrolled && !this.el.classList.contains('pinned')) {
          this._removePinClasses();
          this.el.style.top = this.options.offset + "px";
          this.el.classList.add('pinned');

          // onPositionChange callback
          if (typeof this.options.onPositionChange === 'function') {
            this.options.onPositionChange.call(this, 'pinned');
          }
        }

        // Add pin-top (when scrolled position is above top)
        if (scrolled < this.options.top && !this.el.classList.contains('pin-top')) {
          this._removePinClasses();
          this.el.style.top = 0;
          this.el.classList.add('pin-top');

          // onPositionChange callback
          if (typeof this.options.onPositionChange === 'function') {
            this.options.onPositionChange.call(this, 'pin-top');
          }
        }

        // Add pin-bottom (when scrolled position is below bottom)
        if (scrolled > this.options.bottom && !this.el.classList.contains('pin-bottom')) {
          this._removePinClasses();
          this.el.classList.add('pin-bottom');
          this.el.style.top = this.options.bottom - this.originalOffset + "px";

          // onPositionChange callback
          if (typeof this.options.onPositionChange === 'function') {
            this.options.onPositionChange.call(this, 'pin-bottom');
          }
        }
      }
    }, {
      key: "_removePinClasses",
      value: function _removePinClasses() {
        // IE 11 bug (can't remove multiple classes in one line)
        this.el.classList.remove('pin-top');
        this.el.classList.remove('pinned');
        this.el.classList.remove('pin-bottom');
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Pushpin.__proto__ || Object.getPrototypeOf(Pushpin), "init", this).call(this, this, els, options);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Pushpin;
      }
    }, {
      key: "_updateElements",
      value: function _updateElements() {
        for (var elIndex in Pushpin._pushpins) {
          var pInstance = Pushpin._pushpins[elIndex];
          pInstance._updatePosition();
        }
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Pushpin;
  }(Component);

  /**
   * @static
   * @memberof Pushpin
   */


  Pushpin._pushpins = [];

  M.Pushpin = Pushpin;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Pushpin, 'pushpin', 'M_Pushpin');
  }
})(cash);
;(function ($, anim) {
  'use strict';

  var _defaults = {
    direction: 'top',
    hoverEnabled: true,
    toolbarEnabled: false
  };

  $.fn.reverse = [].reverse;

  /**
   * @class
   *
   */

  var FloatingActionButton = function (_Component14) {
    _inherits(FloatingActionButton, _Component14);

    /**
     * Construct FloatingActionButton instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function FloatingActionButton(el, options) {
      _classCallCheck(this, FloatingActionButton);

      var _this48 = _possibleConstructorReturn(this, (FloatingActionButton.__proto__ || Object.getPrototypeOf(FloatingActionButton)).call(this, FloatingActionButton, el, options));

      _this48.el.M_FloatingActionButton = _this48;

      /**
       * Options for the fab
       * @member FloatingActionButton#options
       * @prop {Boolean} [direction] - Direction fab menu opens
       * @prop {Boolean} [hoverEnabled=true] - Enable hover vs click
       * @prop {Boolean} [toolbarEnabled=false] - Enable toolbar transition
       */
      _this48.options = $.extend({}, FloatingActionButton.defaults, options);

      _this48.isOpen = false;
      _this48.$anchor = _this48.$el.children('a').first();
      _this48.$menu = _this48.$el.children('ul').first();
      _this48.$floatingBtns = _this48.$el.find('ul .btn-floating');
      _this48.$floatingBtnsReverse = _this48.$el.find('ul .btn-floating').reverse();
      _this48.offsetY = 0;
      _this48.offsetX = 0;

      _this48.$el.addClass("direction-" + _this48.options.direction);
      if (_this48.options.direction === 'top') {
        _this48.offsetY = 40;
      } else if (_this48.options.direction === 'right') {
        _this48.offsetX = -40;
      } else if (_this48.options.direction === 'bottom') {
        _this48.offsetY = -40;
      } else {
        _this48.offsetX = 40;
      }
      _this48._setupEventHandlers();
      return _this48;
    }

    _createClass(FloatingActionButton, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this.el.M_FloatingActionButton = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleFABClickBound = this._handleFABClick.bind(this);
        this._handleOpenBound = this.open.bind(this);
        this._handleCloseBound = this.close.bind(this);

        if (this.options.hoverEnabled && !this.options.toolbarEnabled) {
          this.el.addEventListener('mouseenter', this._handleOpenBound);
          this.el.addEventListener('mouseleave', this._handleCloseBound);
        } else {
          this.el.addEventListener('click', this._handleFABClickBound);
        }
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        if (this.options.hoverEnabled && !this.options.toolbarEnabled) {
          this.el.removeEventListener('mouseenter', this._handleOpenBound);
          this.el.removeEventListener('mouseleave', this._handleCloseBound);
        } else {
          this.el.removeEventListener('click', this._handleFABClickBound);
        }
      }

      /**
       * Handle FAB Click
       */

    }, {
      key: "_handleFABClick",
      value: function _handleFABClick() {
        if (this.isOpen) {
          this.close();
        } else {
          this.open();
        }
      }

      /**
       * Handle Document Click
       * @param {Event} e
       */

    }, {
      key: "_handleDocumentClick",
      value: function _handleDocumentClick(e) {
        if (!$(e.target).closest(this.$menu).length) {
          this.close();
        }
      }

      /**
       * Open FAB
       */

    }, {
      key: "open",
      value: function open() {
        if (this.isOpen) {
          return;
        }

        if (this.options.toolbarEnabled) {
          this._animateInToolbar();
        } else {
          this._animateInFAB();
        }
        this.isOpen = true;
      }

      /**
       * Close FAB
       */

    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }

        if (this.options.toolbarEnabled) {
          window.removeEventListener('scroll', this._handleCloseBound, true);
          document.body.removeEventListener('click', this._handleDocumentClickBound, true);
          this._animateOutToolbar();
        } else {
          this._animateOutFAB();
        }
        this.isOpen = false;
      }

      /**
       * Classic FAB Menu open
       */

    }, {
      key: "_animateInFAB",
      value: function _animateInFAB() {
        var _this49 = this;

        this.$el.addClass('active');

        var time = 0;
        this.$floatingBtnsReverse.each(function (el) {
          anim({
            targets: el,
            opacity: 1,
            scale: [0.4, 1],
            translateY: [_this49.offsetY, 0],
            translateX: [_this49.offsetX, 0],
            duration: 275,
            delay: time,
            easing: 'easeInOutQuad'
          });
          time += 40;
        });
      }

      /**
       * Classic FAB Menu close
       */

    }, {
      key: "_animateOutFAB",
      value: function _animateOutFAB() {
        var _this50 = this;

        this.$floatingBtnsReverse.each(function (el) {
          anim.remove(el);
          anim({
            targets: el,
            opacity: 0,
            scale: 0.4,
            translateY: _this50.offsetY,
            translateX: _this50.offsetX,
            duration: 175,
            easing: 'easeOutQuad',
            complete: function () {
              _this50.$el.removeClass('active');
            }
          });
        });
      }

      /**
       * Toolbar transition Menu open
       */

    }, {
      key: "_animateInToolbar",
      value: function _animateInToolbar() {
        var _this51 = this;

        var scaleFactor = void 0;
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var btnRect = this.el.getBoundingClientRect();
        var backdrop = $('<div class="fab-backdrop"></div>');
        var fabColor = this.$anchor.css('background-color');
        this.$anchor.append(backdrop);

        this.offsetX = btnRect.left - windowWidth / 2 + btnRect.width / 2;
        this.offsetY = windowHeight - btnRect.bottom;
        scaleFactor = windowWidth / backdrop[0].clientWidth;
        this.btnBottom = btnRect.bottom;
        this.btnLeft = btnRect.left;
        this.btnWidth = btnRect.width;

        // Set initial state
        this.$el.addClass('active');
        this.$el.css({
          'text-align': 'center',
          width: '100%',
          bottom: 0,
          left: 0,
          transform: 'translateX(' + this.offsetX + 'px)',
          transition: 'none'
        });
        this.$anchor.css({
          transform: 'translateY(' + -this.offsetY + 'px)',
          transition: 'none'
        });
        backdrop.css({
          'background-color': fabColor
        });

        setTimeout(function () {
          _this51.$el.css({
            transform: '',
            transition: 'transform .2s cubic-bezier(0.550, 0.085, 0.680, 0.530), background-color 0s linear .2s'
          });
          _this51.$anchor.css({
            overflow: 'visible',
            transform: '',
            transition: 'transform .2s'
          });

          setTimeout(function () {
            _this51.$el.css({
              overflow: 'hidden',
              'background-color': fabColor
            });
            backdrop.css({
              transform: 'scale(' + scaleFactor + ')',
              transition: 'transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)'
            });
            _this51.$menu.children('li').children('a').css({
              opacity: 1
            });

            // Scroll to close.
            _this51._handleDocumentClickBound = _this51._handleDocumentClick.bind(_this51);
            window.addEventListener('scroll', _this51._handleCloseBound, true);
            document.body.addEventListener('click', _this51._handleDocumentClickBound, true);
          }, 100);
        }, 0);
      }

      /**
       * Toolbar transition Menu close
       */

    }, {
      key: "_animateOutToolbar",
      value: function _animateOutToolbar() {
        var _this52 = this;

        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var backdrop = this.$el.find('.fab-backdrop');
        var fabColor = this.$anchor.css('background-color');

        this.offsetX = this.btnLeft - windowWidth / 2 + this.btnWidth / 2;
        this.offsetY = windowHeight - this.btnBottom;

        // Hide backdrop
        this.$el.removeClass('active');
        this.$el.css({
          'background-color': 'transparent',
          transition: 'none'
        });
        this.$anchor.css({
          transition: 'none'
        });
        backdrop.css({
          transform: 'scale(0)',
          'background-color': fabColor
        });
        this.$menu.children('li').children('a').css({
          opacity: ''
        });

        setTimeout(function () {
          backdrop.remove();

          // Set initial state.
          _this52.$el.css({
            'text-align': '',
            width: '',
            bottom: '',
            left: '',
            overflow: '',
            'background-color': '',
            transform: 'translate3d(' + -_this52.offsetX + 'px,0,0)'
          });
          _this52.$anchor.css({
            overflow: '',
            transform: 'translate3d(0,' + _this52.offsetY + 'px,0)'
          });

          setTimeout(function () {
            _this52.$el.css({
              transform: 'translate3d(0,0,0)',
              transition: 'transform .2s'
            });
            _this52.$anchor.css({
              transform: 'translate3d(0,0,0)',
              transition: 'transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)'
            });
          }, 20);
        }, 200);
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(FloatingActionButton.__proto__ || Object.getPrototypeOf(FloatingActionButton), "init", this).call(this, this, els, options);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_FloatingActionButton;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return FloatingActionButton;
  }(Component);

  M.FloatingActionButton = FloatingActionButton;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(FloatingActionButton, 'floatingActionButton', 'M_FloatingActionButton');
  }
})(cash, M.anime);
;(function ($) {
  'use strict';

  var _defaults = {
    // Close when date is selected
    autoClose: false,

    // the default output format for the input field value
    format: 'mmm dd, yyyy',

    // Used to create date object from current input string
    parse: null,

    // The initial date to view when first opened
    defaultDate: null,

    // Make the `defaultDate` the initial selected value
    setDefaultDate: false,

    disableWeekends: false,

    disableDayFn: null,

    // First day of week (0: Sunday, 1: Monday etc)
    firstDay: 0,

    // The earliest date that can be selected
    minDate: null,
    // Thelatest date that can be selected
    maxDate: null,

    // Number of years either side, or array of upper/lower range
    yearRange: 10,

    // used internally (don't config outside)
    minYear: 0,
    maxYear: 9999,
    minMonth: undefined,
    maxMonth: undefined,

    startRange: null,
    endRange: null,

    isRTL: false,

    // Render the month after year in the calendar title
    showMonthAfterYear: false,

    // Render days of the calendar grid that fall in the next or previous month
    showDaysInNextAndPreviousMonths: false,

    // Specify a DOM element to render the calendar in
    container: null,

    // Show clear button
    showClearBtn: false,

    // internationalization
    i18n: {
      cancel: 'Cancel',
      clear: 'Clear',
      done: 'Ok',
      previousMonth: '‹',
      nextMonth: '›',
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      weekdaysAbbrev: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    },

    // events array
    events: [],

    // callback function
    onSelect: null,
    onOpen: null,
    onClose: null,
    onDraw: null
  };

  /**
   * @class
   *
   */

  var Datepicker = function (_Component15) {
    _inherits(Datepicker, _Component15);

    /**
     * Construct Datepicker instance and set up overlay
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Datepicker(el, options) {
      _classCallCheck(this, Datepicker);

      var _this53 = _possibleConstructorReturn(this, (Datepicker.__proto__ || Object.getPrototypeOf(Datepicker)).call(this, Datepicker, el, options));

      _this53.el.M_Datepicker = _this53;

      _this53.options = $.extend({}, Datepicker.defaults, options);

      // make sure i18n defaults are not lost when only few i18n option properties are passed
      if (!!options && options.hasOwnProperty('i18n') && typeof options.i18n === 'object') {
        _this53.options.i18n = $.extend({}, Datepicker.defaults.i18n, options.i18n);
      }

      // Remove time component from minDate and maxDate options
      if (_this53.options.minDate) _this53.options.minDate.setHours(0, 0, 0, 0);
      if (_this53.options.maxDate) _this53.options.maxDate.setHours(0, 0, 0, 0);

      _this53.id = M.guid();

      _this53._setupVariables();
      _this53._insertHTMLIntoDOM();
      _this53._setupModal();

      _this53._setupEventHandlers();

      if (!_this53.options.defaultDate) {
        _this53.options.defaultDate = new Date(Date.parse(_this53.el.value));
      }

      var defDate = _this53.options.defaultDate;
      if (Datepicker._isDate(defDate)) {
        if (_this53.options.setDefaultDate) {
          _this53.setDate(defDate, true);
          _this53.setInputValue();
        } else {
          _this53.gotoDate(defDate);
        }
      } else {
        _this53.gotoDate(new Date());
      }

      /**
       * Describes open/close state of datepicker
       * @type {Boolean}
       */
      _this53.isOpen = false;
      return _this53;
    }

    _createClass(Datepicker, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this.modal.destroy();
        $(this.modalEl).remove();
        this.destroySelects();
        this.el.M_Datepicker = undefined;
      }
    }, {
      key: "destroySelects",
      value: function destroySelects() {
        var oldYearSelect = this.calendarEl.querySelector('.orig-select-year');
        if (oldYearSelect) {
          M.FormSelect.getInstance(oldYearSelect).destroy();
        }
        var oldMonthSelect = this.calendarEl.querySelector('.orig-select-month');
        if (oldMonthSelect) {
          M.FormSelect.getInstance(oldMonthSelect).destroy();
        }
      }
    }, {
      key: "_insertHTMLIntoDOM",
      value: function _insertHTMLIntoDOM() {
        if (this.options.showClearBtn) {
          $(this.clearBtn).css({ visibility: '' });
          this.clearBtn.innerHTML = this.options.i18n.clear;
        }

        this.doneBtn.innerHTML = this.options.i18n.done;
        this.cancelBtn.innerHTML = this.options.i18n.cancel;

        if (this.options.container) {
          this.$modalEl.appendTo(this.options.container);
        } else {
          this.$modalEl.insertBefore(this.el);
        }
      }
    }, {
      key: "_setupModal",
      value: function _setupModal() {
        var _this54 = this;

        this.modalEl.id = 'modal-' + this.id;
        this.modal = M.Modal.init(this.modalEl, {
          onCloseEnd: function () {
            _this54.isOpen = false;
          }
        });
      }
    }, {
      key: "toString",
      value: function toString(format) {
        var _this55 = this;

        format = format || this.options.format;
        if (!Datepicker._isDate(this.date)) {
          return '';
        }

        var formatArray = format.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g);
        var formattedDate = formatArray.map(function (label) {
          if (_this55.formats[label]) {
            return _this55.formats[label]();
          }

          return label;
        }).join('');
        return formattedDate;
      }
    }, {
      key: "setDate",
      value: function setDate(date, preventOnSelect) {
        if (!date) {
          this.date = null;
          this._renderDateDisplay();
          return this.draw();
        }
        if (typeof date === 'string') {
          date = new Date(Date.parse(date));
        }
        if (!Datepicker._isDate(date)) {
          return;
        }

        var min = this.options.minDate,
            max = this.options.maxDate;

        if (Datepicker._isDate(min) && date < min) {
          date = min;
        } else if (Datepicker._isDate(max) && date > max) {
          date = max;
        }

        this.date = new Date(date.getTime());

        this._renderDateDisplay();

        Datepicker._setToStartOfDay(this.date);
        this.gotoDate(this.date);

        if (!preventOnSelect && typeof this.options.onSelect === 'function') {
          this.options.onSelect.call(this, this.date);
        }
      }
    }, {
      key: "setInputValue",
      value: function setInputValue() {
        this.el.value = this.toString();
        this.$el.trigger('change', { firedBy: this });
      }
    }, {
      key: "_renderDateDisplay",
      value: function _renderDateDisplay() {
        var displayDate = Datepicker._isDate(this.date) ? this.date : new Date();
        var i18n = this.options.i18n;
        var day = i18n.weekdaysShort[displayDate.getDay()];
        var month = i18n.monthsShort[displayDate.getMonth()];
        var date = displayDate.getDate();
        this.yearTextEl.innerHTML = displayDate.getFullYear();
        this.dateTextEl.innerHTML = day + ", " + month + " " + date;
      }

      /**
       * change view to a specific date
       */

    }, {
      key: "gotoDate",
      value: function gotoDate(date) {
        var newCalendar = true;

        if (!Datepicker._isDate(date)) {
          return;
        }

        if (this.calendars) {
          var firstVisibleDate = new Date(this.calendars[0].year, this.calendars[0].month, 1),
              lastVisibleDate = new Date(this.calendars[this.calendars.length - 1].year, this.calendars[this.calendars.length - 1].month, 1),
              visibleDate = date.getTime();
          // get the end of the month
          lastVisibleDate.setMonth(lastVisibleDate.getMonth() + 1);
          lastVisibleDate.setDate(lastVisibleDate.getDate() - 1);
          newCalendar = visibleDate < firstVisibleDate.getTime() || lastVisibleDate.getTime() < visibleDate;
        }

        if (newCalendar) {
          this.calendars = [{
            month: date.getMonth(),
            year: date.getFullYear()
          }];
        }

        this.adjustCalendars();
      }
    }, {
      key: "adjustCalendars",
      value: function adjustCalendars() {
        this.calendars[0] = this.adjustCalendar(this.calendars[0]);
        this.draw();
      }
    }, {
      key: "adjustCalendar",
      value: function adjustCalendar(calendar) {
        if (calendar.month < 0) {
          calendar.year -= Math.ceil(Math.abs(calendar.month) / 12);
          calendar.month += 12;
        }
        if (calendar.month > 11) {
          calendar.year += Math.floor(Math.abs(calendar.month) / 12);
          calendar.month -= 12;
        }
        return calendar;
      }
    }, {
      key: "nextMonth",
      value: function nextMonth() {
        this.calendars[0].month++;
        this.adjustCalendars();
      }
    }, {
      key: "prevMonth",
      value: function prevMonth() {
        this.calendars[0].month--;
        this.adjustCalendars();
      }
    }, {
      key: "render",
      value: function render(year, month, randId) {
        var opts = this.options,
            now = new Date(),
            days = Datepicker._getDaysInMonth(year, month),
            before = new Date(year, month, 1).getDay(),
            data = [],
            row = [];
        Datepicker._setToStartOfDay(now);
        if (opts.firstDay > 0) {
          before -= opts.firstDay;
          if (before < 0) {
            before += 7;
          }
        }
        var previousMonth = month === 0 ? 11 : month - 1,
            nextMonth = month === 11 ? 0 : month + 1,
            yearOfPreviousMonth = month === 0 ? year - 1 : year,
            yearOfNextMonth = month === 11 ? year + 1 : year,
            daysInPreviousMonth = Datepicker._getDaysInMonth(yearOfPreviousMonth, previousMonth);
        var cells = days + before,
            after = cells;
        while (after > 7) {
          after -= 7;
        }
        cells += 7 - after;
        var isWeekSelected = false;
        for (var i = 0, r = 0; i < cells; i++) {
          var day = new Date(year, month, 1 + (i - before)),
              isSelected = Datepicker._isDate(this.date) ? Datepicker._compareDates(day, this.date) : false,
              isToday = Datepicker._compareDates(day, now),
              hasEvent = opts.events.indexOf(day.toDateString()) !== -1 ? true : false,
              isEmpty = i < before || i >= days + before,
              dayNumber = 1 + (i - before),
              monthNumber = month,
              yearNumber = year,
              isStartRange = opts.startRange && Datepicker._compareDates(opts.startRange, day),
              isEndRange = opts.endRange && Datepicker._compareDates(opts.endRange, day),
              isInRange = opts.startRange && opts.endRange && opts.startRange < day && day < opts.endRange,
              isDisabled = opts.minDate && day < opts.minDate || opts.maxDate && day > opts.maxDate || opts.disableWeekends && Datepicker._isWeekend(day) || opts.disableDayFn && opts.disableDayFn(day);

          if (isEmpty) {
            if (i < before) {
              dayNumber = daysInPreviousMonth + dayNumber;
              monthNumber = previousMonth;
              yearNumber = yearOfPreviousMonth;
            } else {
              dayNumber = dayNumber - days;
              monthNumber = nextMonth;
              yearNumber = yearOfNextMonth;
            }
          }

          var dayConfig = {
            day: dayNumber,
            month: monthNumber,
            year: yearNumber,
            hasEvent: hasEvent,
            isSelected: isSelected,
            isToday: isToday,
            isDisabled: isDisabled,
            isEmpty: isEmpty,
            isStartRange: isStartRange,
            isEndRange: isEndRange,
            isInRange: isInRange,
            showDaysInNextAndPreviousMonths: opts.showDaysInNextAndPreviousMonths
          };

          row.push(this.renderDay(dayConfig));

          if (++r === 7) {
            data.push(this.renderRow(row, opts.isRTL, isWeekSelected));
            row = [];
            r = 0;
            isWeekSelected = false;
          }
        }
        return this.renderTable(opts, data, randId);
      }
    }, {
      key: "renderDay",
      value: function renderDay(opts) {
        var arr = [];
        var ariaSelected = 'false';
        if (opts.isEmpty) {
          if (opts.showDaysInNextAndPreviousMonths) {
            arr.push('is-outside-current-month');
            arr.push('is-selection-disabled');
          } else {
            return '<td class="is-empty"></td>';
          }
        }
        if (opts.isDisabled) {
          arr.push('is-disabled');
        }

        if (opts.isToday) {
          arr.push('is-today');
        }
        if (opts.isSelected) {
          arr.push('is-selected');
          ariaSelected = 'true';
        }
        if (opts.hasEvent) {
          arr.push('has-event');
        }
        if (opts.isInRange) {
          arr.push('is-inrange');
        }
        if (opts.isStartRange) {
          arr.push('is-startrange');
        }
        if (opts.isEndRange) {
          arr.push('is-endrange');
        }
        return "<td data-day=\"" + opts.day + "\" class=\"" + arr.join(' ') + "\" aria-selected=\"" + ariaSelected + "\">" + ("<button class=\"datepicker-day-button\" type=\"button\" data-year=\"" + opts.year + "\" data-month=\"" + opts.month + "\" data-day=\"" + opts.day + "\">" + opts.day + "</button>") + '</td>';
      }
    }, {
      key: "renderRow",
      value: function renderRow(days, isRTL, isRowSelected) {
        return '<tr class="datepicker-row' + (isRowSelected ? ' is-selected' : '') + '">' + (isRTL ? days.reverse() : days).join('') + '</tr>';
      }
    }, {
      key: "renderTable",
      value: function renderTable(opts, data, randId) {
        return '<div class="datepicker-table-wrapper"><table cellpadding="0" cellspacing="0" class="datepicker-table" role="grid" aria-labelledby="' + randId + '">' + this.renderHead(opts) + this.renderBody(data) + '</table></div>';
      }
    }, {
      key: "renderHead",
      value: function renderHead(opts) {
        var i = void 0,
            arr = [];
        for (i = 0; i < 7; i++) {
          arr.push("<th scope=\"col\"><abbr title=\"" + this.renderDayName(opts, i) + "\">" + this.renderDayName(opts, i, true) + "</abbr></th>");
        }
        return '<thead><tr>' + (opts.isRTL ? arr.reverse() : arr).join('') + '</tr></thead>';
      }
    }, {
      key: "renderBody",
      value: function renderBody(rows) {
        return '<tbody>' + rows.join('') + '</tbody>';
      }
    }, {
      key: "renderTitle",
      value: function renderTitle(instance, c, year, month, refYear, randId) {
        var i = void 0,
            j = void 0,
            arr = void 0,
            opts = this.options,
            isMinYear = year === opts.minYear,
            isMaxYear = year === opts.maxYear,
            html = '<div id="' + randId + '" class="datepicker-controls" role="heading" aria-live="assertive">',
            monthHtml = void 0,
            yearHtml = void 0,
            prev = true,
            next = true;

        for (arr = [], i = 0; i < 12; i++) {
          arr.push('<option value="' + (year === refYear ? i - c : 12 + i - c) + '"' + (i === month ? ' selected="selected"' : '') + (isMinYear && i < opts.minMonth || isMaxYear && i > opts.maxMonth ? 'disabled="disabled"' : '') + '>' + opts.i18n.months[i] + '</option>');
        }

        monthHtml = '<select class="datepicker-select orig-select-month" tabindex="-1">' + arr.join('') + '</select>';

        if ($.isArray(opts.yearRange)) {
          i = opts.yearRange[0];
          j = opts.yearRange[1] + 1;
        } else {
          i = year - opts.yearRange;
          j = 1 + year + opts.yearRange;
        }

        for (arr = []; i < j && i <= opts.maxYear; i++) {
          if (i >= opts.minYear) {
            arr.push("<option value=\"" + i + "\" " + (i === year ? 'selected="selected"' : '') + ">" + i + "</option>");
          }
        }

        yearHtml = "<select class=\"datepicker-select orig-select-year\" tabindex=\"-1\">" + arr.join('') + "</select>";

        var leftArrow = '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/><path d="M0-.5h24v24H0z" fill="none"/></svg>';
        html += "<button class=\"month-prev" + (prev ? '' : ' is-disabled') + "\" type=\"button\">" + leftArrow + "</button>";

        html += '<div class="selects-container">';
        if (opts.showMonthAfterYear) {
          html += yearHtml + monthHtml;
        } else {
          html += monthHtml + yearHtml;
        }
        html += '</div>';

        if (isMinYear && (month === 0 || opts.minMonth >= month)) {
          prev = false;
        }

        if (isMaxYear && (month === 11 || opts.maxMonth <= month)) {
          next = false;
        }

        var rightArrow = '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/><path d="M0-.25h24v24H0z" fill="none"/></svg>';
        html += "<button class=\"month-next" + (next ? '' : ' is-disabled') + "\" type=\"button\">" + rightArrow + "</button>";

        return html += '</div>';
      }

      /**
       * refresh the HTML
       */

    }, {
      key: "draw",
      value: function draw(force) {
        if (!this.isOpen && !force) {
          return;
        }
        var opts = this.options,
            minYear = opts.minYear,
            maxYear = opts.maxYear,
            minMonth = opts.minMonth,
            maxMonth = opts.maxMonth,
            html = '',
            randId = void 0;

        if (this._y <= minYear) {
          this._y = minYear;
          if (!isNaN(minMonth) && this._m < minMonth) {
            this._m = minMonth;
          }
        }
        if (this._y >= maxYear) {
          this._y = maxYear;
          if (!isNaN(maxMonth) && this._m > maxMonth) {
            this._m = maxMonth;
          }
        }

        randId = 'datepicker-title-' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 2);

        for (var c = 0; c < 1; c++) {
          this._renderDateDisplay();
          html += this.renderTitle(this, c, this.calendars[c].year, this.calendars[c].month, this.calendars[0].year, randId) + this.render(this.calendars[c].year, this.calendars[c].month, randId);
        }

        this.destroySelects();

        this.calendarEl.innerHTML = html;

        // Init Materialize Select
        var yearSelect = this.calendarEl.querySelector('.orig-select-year');
        var monthSelect = this.calendarEl.querySelector('.orig-select-month');
        M.FormSelect.init(yearSelect, {
          classes: 'select-year',
          dropdownOptions: { container: document.body, constrainWidth: false }
        });
        M.FormSelect.init(monthSelect, {
          classes: 'select-month',
          dropdownOptions: { container: document.body, constrainWidth: false }
        });

        // Add change handlers for select
        yearSelect.addEventListener('change', this._handleYearChange.bind(this));
        monthSelect.addEventListener('change', this._handleMonthChange.bind(this));

        if (typeof this.options.onDraw === 'function') {
          this.options.onDraw(this);
        }
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleInputKeydownBound = this._handleInputKeydown.bind(this);
        this._handleInputClickBound = this._handleInputClick.bind(this);
        this._handleInputChangeBound = this._handleInputChange.bind(this);
        this._handleCalendarClickBound = this._handleCalendarClick.bind(this);
        this._finishSelectionBound = this._finishSelection.bind(this);
        this._handleMonthChange = this._handleMonthChange.bind(this);
        this._closeBound = this.close.bind(this);

        this.el.addEventListener('click', this._handleInputClickBound);
        this.el.addEventListener('keydown', this._handleInputKeydownBound);
        this.el.addEventListener('change', this._handleInputChangeBound);
        this.calendarEl.addEventListener('click', this._handleCalendarClickBound);
        this.doneBtn.addEventListener('click', this._finishSelectionBound);
        this.cancelBtn.addEventListener('click', this._closeBound);

        if (this.options.showClearBtn) {
          this._handleClearClickBound = this._handleClearClick.bind(this);
          this.clearBtn.addEventListener('click', this._handleClearClickBound);
        }
      }
    }, {
      key: "_setupVariables",
      value: function _setupVariables() {
        var _this56 = this;

        this.$modalEl = $(Datepicker._template);
        this.modalEl = this.$modalEl[0];

        this.calendarEl = this.modalEl.querySelector('.datepicker-calendar');

        this.yearTextEl = this.modalEl.querySelector('.year-text');
        this.dateTextEl = this.modalEl.querySelector('.date-text');
        if (this.options.showClearBtn) {
          this.clearBtn = this.modalEl.querySelector('.datepicker-clear');
        }
        this.doneBtn = this.modalEl.querySelector('.datepicker-done');
        this.cancelBtn = this.modalEl.querySelector('.datepicker-cancel');

        this.formats = {
          d: function () {
            return _this56.date.getDate();
          },
          dd: function () {
            var d = _this56.date.getDate();
            return (d < 10 ? '0' : '') + d;
          },
          ddd: function () {
            return _this56.options.i18n.weekdaysShort[_this56.date.getDay()];
          },
          dddd: function () {
            return _this56.options.i18n.weekdays[_this56.date.getDay()];
          },
          m: function () {
            return _this56.date.getMonth() + 1;
          },
          mm: function () {
            var m = _this56.date.getMonth() + 1;
            return (m < 10 ? '0' : '') + m;
          },
          mmm: function () {
            return _this56.options.i18n.monthsShort[_this56.date.getMonth()];
          },
          mmmm: function () {
            return _this56.options.i18n.months[_this56.date.getMonth()];
          },
          yy: function () {
            return ('' + _this56.date.getFullYear()).slice(2);
          },
          yyyy: function () {
            return _this56.date.getFullYear();
          }
        };
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener('click', this._handleInputClickBound);
        this.el.removeEventListener('keydown', this._handleInputKeydownBound);
        this.el.removeEventListener('change', this._handleInputChangeBound);
        this.calendarEl.removeEventListener('click', this._handleCalendarClickBound);
      }
    }, {
      key: "_handleInputClick",
      value: function _handleInputClick() {
        this.open();
      }
    }, {
      key: "_handleInputKeydown",
      value: function _handleInputKeydown(e) {
        if (e.which === M.keys.ENTER) {
          e.preventDefault();
          this.open();
        }
      }
    }, {
      key: "_handleCalendarClick",
      value: function _handleCalendarClick(e) {
        if (!this.isOpen) {
          return;
        }

        var $target = $(e.target);
        if (!$target.hasClass('is-disabled')) {
          if ($target.hasClass('datepicker-day-button') && !$target.hasClass('is-empty') && !$target.parent().hasClass('is-disabled')) {
            this.setDate(new Date(e.target.getAttribute('data-year'), e.target.getAttribute('data-month'), e.target.getAttribute('data-day')));
            if (this.options.autoClose) {
              this._finishSelection();
            }
          } else if ($target.closest('.month-prev').length) {
            this.prevMonth();
          } else if ($target.closest('.month-next').length) {
            this.nextMonth();
          }
        }
      }
    }, {
      key: "_handleClearClick",
      value: function _handleClearClick() {
        this.date = null;
        this.setInputValue();
        this.close();
      }
    }, {
      key: "_handleMonthChange",
      value: function _handleMonthChange(e) {
        this.gotoMonth(e.target.value);
      }
    }, {
      key: "_handleYearChange",
      value: function _handleYearChange(e) {
        this.gotoYear(e.target.value);
      }

      /**
       * change view to a specific month (zero-index, e.g. 0: January)
       */

    }, {
      key: "gotoMonth",
      value: function gotoMonth(month) {
        if (!isNaN(month)) {
          this.calendars[0].month = parseInt(month, 10);
          this.adjustCalendars();
        }
      }

      /**
       * change view to a specific full year (e.g. "2012")
       */

    }, {
      key: "gotoYear",
      value: function gotoYear(year) {
        if (!isNaN(year)) {
          this.calendars[0].year = parseInt(year, 10);
          this.adjustCalendars();
        }
      }
    }, {
      key: "_handleInputChange",
      value: function _handleInputChange(e) {
        var date = void 0;

        // Prevent change event from being fired when triggered by the plugin
        if (e.firedBy === this) {
          return;
        }
        if (this.options.parse) {
          date = this.options.parse(this.el.value, this.options.format);
        } else {
          date = new Date(Date.parse(this.el.value));
        }

        if (Datepicker._isDate(date)) {
          this.setDate(date);
        }
      }
    }, {
      key: "renderDayName",
      value: function renderDayName(opts, day, abbr) {
        day += opts.firstDay;
        while (day >= 7) {
          day -= 7;
        }
        return abbr ? opts.i18n.weekdaysAbbrev[day] : opts.i18n.weekdays[day];
      }

      /**
       * Set input value to the selected date and close Datepicker
       */

    }, {
      key: "_finishSelection",
      value: function _finishSelection() {
        this.setInputValue();
        this.close();
      }

      /**
       * Open Datepicker
       */

    }, {
      key: "open",
      value: function open() {
        if (this.isOpen) {
          return;
        }

        this.isOpen = true;
        if (typeof this.options.onOpen === 'function') {
          this.options.onOpen.call(this);
        }
        this.draw();
        this.modal.open();
        return this;
      }

      /**
       * Close Datepicker
       */

    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }

        this.isOpen = false;
        if (typeof this.options.onClose === 'function') {
          this.options.onClose.call(this);
        }
        this.modal.close();
        return this;
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Datepicker.__proto__ || Object.getPrototypeOf(Datepicker), "init", this).call(this, this, els, options);
      }
    }, {
      key: "_isDate",
      value: function _isDate(obj) {
        return (/Date/.test(Object.prototype.toString.call(obj)) && !isNaN(obj.getTime())
        );
      }
    }, {
      key: "_isWeekend",
      value: function _isWeekend(date) {
        var day = date.getDay();
        return day === 0 || day === 6;
      }
    }, {
      key: "_setToStartOfDay",
      value: function _setToStartOfDay(date) {
        if (Datepicker._isDate(date)) date.setHours(0, 0, 0, 0);
      }
    }, {
      key: "_getDaysInMonth",
      value: function _getDaysInMonth(year, month) {
        return [31, Datepicker._isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
      }
    }, {
      key: "_isLeapYear",
      value: function _isLeapYear(year) {
        // solution by Matti Virkkunen: http://stackoverflow.com/a/4881951
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
      }
    }, {
      key: "_compareDates",
      value: function _compareDates(a, b) {
        // weak date comparison (use setToStartOfDay(date) to ensure correct result)
        return a.getTime() === b.getTime();
      }
    }, {
      key: "_setToStartOfDay",
      value: function _setToStartOfDay(date) {
        if (Datepicker._isDate(date)) date.setHours(0, 0, 0, 0);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Datepicker;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Datepicker;
  }(Component);

  Datepicker._template = ['<div class= "modal datepicker-modal">', '<div class="modal-content datepicker-container">', '<div class="datepicker-date-display">', '<span class="year-text"></span>', '<span class="date-text"></span>', '</div>', '<div class="datepicker-calendar-container">', '<div class="datepicker-calendar"></div>', '<div class="datepicker-footer">', '<button class="btn-flat datepicker-clear waves-effect" style="visibility: hidden;" type="button"></button>', '<div class="confirmation-btns">', '<button class="btn-flat datepicker-cancel waves-effect" type="button"></button>', '<button class="btn-flat datepicker-done waves-effect" type="button"></button>', '</div>', '</div>', '</div>', '</div>', '</div>'].join('');

  M.Datepicker = Datepicker;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Datepicker, 'datepicker', 'M_Datepicker');
  }
})(cash);
;(function ($) {
  'use strict';

  var _defaults = {
    dialRadius: 135,
    outerRadius: 105,
    innerRadius: 70,
    tickRadius: 20,
    duration: 350,
    container: null,
    defaultTime: 'now', // default time, 'now' or '13:14' e.g.
    fromNow: 0, // Millisecond offset from the defaultTime
    showClearBtn: false,

    // internationalization
    i18n: {
      cancel: 'Cancel',
      clear: 'Clear',
      done: 'Ok'
    },

    autoClose: false, // auto close when minute is selected
    twelveHour: true, // change to 12 hour AM/PM clock from 24 hour
    vibrate: true, // vibrate the device when dragging clock hand

    // Callbacks
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null,
    onSelect: null
  };

  /**
   * @class
   *
   */

  var Timepicker = function (_Component16) {
    _inherits(Timepicker, _Component16);

    function Timepicker(el, options) {
      _classCallCheck(this, Timepicker);

      var _this57 = _possibleConstructorReturn(this, (Timepicker.__proto__ || Object.getPrototypeOf(Timepicker)).call(this, Timepicker, el, options));

      _this57.el.M_Timepicker = _this57;

      _this57.options = $.extend({}, Timepicker.defaults, options);

      _this57.id = M.guid();
      _this57._insertHTMLIntoDOM();
      _this57._setupModal();
      _this57._setupVariables();
      _this57._setupEventHandlers();

      _this57._clockSetup();
      _this57._pickerSetup();
      return _this57;
    }

    _createClass(Timepicker, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this.modal.destroy();
        $(this.modalEl).remove();
        this.el.M_Timepicker = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleInputKeydownBound = this._handleInputKeydown.bind(this);
        this._handleInputClickBound = this._handleInputClick.bind(this);
        this._handleClockClickStartBound = this._handleClockClickStart.bind(this);
        this._handleDocumentClickMoveBound = this._handleDocumentClickMove.bind(this);
        this._handleDocumentClickEndBound = this._handleDocumentClickEnd.bind(this);

        this.el.addEventListener('click', this._handleInputClickBound);
        this.el.addEventListener('keydown', this._handleInputKeydownBound);
        this.plate.addEventListener('mousedown', this._handleClockClickStartBound);
        this.plate.addEventListener('touchstart', this._handleClockClickStartBound);

        $(this.spanHours).on('click', this.showView.bind(this, 'hours'));
        $(this.spanMinutes).on('click', this.showView.bind(this, 'minutes'));
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener('click', this._handleInputClickBound);
        this.el.removeEventListener('keydown', this._handleInputKeydownBound);
      }
    }, {
      key: "_handleInputClick",
      value: function _handleInputClick() {
        this.open();
      }
    }, {
      key: "_handleInputKeydown",
      value: function _handleInputKeydown(e) {
        if (e.which === M.keys.ENTER) {
          e.preventDefault();
          this.open();
        }
      }
    }, {
      key: "_handleClockClickStart",
      value: function _handleClockClickStart(e) {
        e.preventDefault();
        var clockPlateBR = this.plate.getBoundingClientRect();
        var offset = { x: clockPlateBR.left, y: clockPlateBR.top };

        this.x0 = offset.x + this.options.dialRadius;
        this.y0 = offset.y + this.options.dialRadius;
        this.moved = false;
        var clickPos = Timepicker._Pos(e);
        this.dx = clickPos.x - this.x0;
        this.dy = clickPos.y - this.y0;

        // Set clock hands
        this.setHand(this.dx, this.dy, false);

        // Mousemove on document
        document.addEventListener('mousemove', this._handleDocumentClickMoveBound);
        document.addEventListener('touchmove', this._handleDocumentClickMoveBound);

        // Mouseup on document
        document.addEventListener('mouseup', this._handleDocumentClickEndBound);
        document.addEventListener('touchend', this._handleDocumentClickEndBound);
      }
    }, {
      key: "_handleDocumentClickMove",
      value: function _handleDocumentClickMove(e) {
        e.preventDefault();
        var clickPos = Timepicker._Pos(e);
        var x = clickPos.x - this.x0;
        var y = clickPos.y - this.y0;
        this.moved = true;
        this.setHand(x, y, false, true);
      }
    }, {
      key: "_handleDocumentClickEnd",
      value: function _handleDocumentClickEnd(e) {
        var _this58 = this;

        e.preventDefault();
        document.removeEventListener('mouseup', this._handleDocumentClickEndBound);
        document.removeEventListener('touchend', this._handleDocumentClickEndBound);
        var clickPos = Timepicker._Pos(e);
        var x = clickPos.x - this.x0;
        var y = clickPos.y - this.y0;
        if (this.moved && x === this.dx && y === this.dy) {
          this.setHand(x, y);
        }

        if (this.currentView === 'hours') {
          this.showView('minutes', this.options.duration / 2);
        } else if (this.options.autoClose) {
          $(this.minutesView).addClass('timepicker-dial-out');
          setTimeout(function () {
            _this58.done();
          }, this.options.duration / 2);
        }

        if (typeof this.options.onSelect === 'function') {
          this.options.onSelect.call(this, this.hours, this.minutes);
        }

        // Unbind mousemove event
        document.removeEventListener('mousemove', this._handleDocumentClickMoveBound);
        document.removeEventListener('touchmove', this._handleDocumentClickMoveBound);
      }
    }, {
      key: "_insertHTMLIntoDOM",
      value: function _insertHTMLIntoDOM() {
        this.$modalEl = $(Timepicker._template);
        this.modalEl = this.$modalEl[0];
        this.modalEl.id = 'modal-' + this.id;

        // Append popover to input by default
        var containerEl = document.querySelector(this.options.container);
        if (this.options.container && !!containerEl) {
          this.$modalEl.appendTo(containerEl);
        } else {
          this.$modalEl.insertBefore(this.el);
        }
      }
    }, {
      key: "_setupModal",
      value: function _setupModal() {
        var _this59 = this;

        this.modal = M.Modal.init(this.modalEl, {
          onOpenStart: this.options.onOpenStart,
          onOpenEnd: this.options.onOpenEnd,
          onCloseStart: this.options.onCloseStart,
          onCloseEnd: function () {
            if (typeof _this59.options.onCloseEnd === 'function') {
              _this59.options.onCloseEnd.call(_this59);
            }
            _this59.isOpen = false;
          }
        });
      }
    }, {
      key: "_setupVariables",
      value: function _setupVariables() {
        this.currentView = 'hours';
        this.vibrate = navigator.vibrate ? 'vibrate' : navigator.webkitVibrate ? 'webkitVibrate' : null;

        this._canvas = this.modalEl.querySelector('.timepicker-canvas');
        this.plate = this.modalEl.querySelector('.timepicker-plate');

        this.hoursView = this.modalEl.querySelector('.timepicker-hours');
        this.minutesView = this.modalEl.querySelector('.timepicker-minutes');
        this.spanHours = this.modalEl.querySelector('.timepicker-span-hours');
        this.spanMinutes = this.modalEl.querySelector('.timepicker-span-minutes');
        this.spanAmPm = this.modalEl.querySelector('.timepicker-span-am-pm');
        this.footer = this.modalEl.querySelector('.timepicker-footer');
        this.amOrPm = 'PM';
      }
    }, {
      key: "_pickerSetup",
      value: function _pickerSetup() {
        var $clearBtn = $("<button class=\"btn-flat timepicker-clear waves-effect\" style=\"visibility: hidden;\" type=\"button\" tabindex=\"" + (this.options.twelveHour ? '3' : '1') + "\">" + this.options.i18n.clear + "</button>").appendTo(this.footer).on('click', this.clear.bind(this));
        if (this.options.showClearBtn) {
          $clearBtn.css({ visibility: '' });
        }

        var confirmationBtnsContainer = $('<div class="confirmation-btns"></div>');
        $('<button class="btn-flat timepicker-close waves-effect" type="button" tabindex="' + (this.options.twelveHour ? '3' : '1') + '">' + this.options.i18n.cancel + '</button>').appendTo(confirmationBtnsContainer).on('click', this.close.bind(this));
        $('<button class="btn-flat timepicker-close waves-effect" type="button" tabindex="' + (this.options.twelveHour ? '3' : '1') + '">' + this.options.i18n.done + '</button>').appendTo(confirmationBtnsContainer).on('click', this.done.bind(this));
        confirmationBtnsContainer.appendTo(this.footer);
      }
    }, {
      key: "_clockSetup",
      value: function _clockSetup() {
        if (this.options.twelveHour) {
          this.$amBtn = $('<div class="am-btn">AM</div>');
          this.$pmBtn = $('<div class="pm-btn">PM</div>');
          this.$amBtn.on('click', this._handleAmPmClick.bind(this)).appendTo(this.spanAmPm);
          this.$pmBtn.on('click', this._handleAmPmClick.bind(this)).appendTo(this.spanAmPm);
        }

        this._buildHoursView();
        this._buildMinutesView();
        this._buildSVGClock();
      }
    }, {
      key: "_buildSVGClock",
      value: function _buildSVGClock() {
        // Draw clock hands and others
        var dialRadius = this.options.dialRadius;
        var tickRadius = this.options.tickRadius;
        var diameter = dialRadius * 2;

        var svg = Timepicker._createSVGEl('svg');
        svg.setAttribute('class', 'timepicker-svg');
        svg.setAttribute('width', diameter);
        svg.setAttribute('height', diameter);
        var g = Timepicker._createSVGEl('g');
        g.setAttribute('transform', 'translate(' + dialRadius + ',' + dialRadius + ')');
        var bearing = Timepicker._createSVGEl('circle');
        bearing.setAttribute('class', 'timepicker-canvas-bearing');
        bearing.setAttribute('cx', 0);
        bearing.setAttribute('cy', 0);
        bearing.setAttribute('r', 4);
        var hand = Timepicker._createSVGEl('line');
        hand.setAttribute('x1', 0);
        hand.setAttribute('y1', 0);
        var bg = Timepicker._createSVGEl('circle');
        bg.setAttribute('class', 'timepicker-canvas-bg');
        bg.setAttribute('r', tickRadius);
        g.appendChild(hand);
        g.appendChild(bg);
        g.appendChild(bearing);
        svg.appendChild(g);
        this._canvas.appendChild(svg);

        this.hand = hand;
        this.bg = bg;
        this.bearing = bearing;
        this.g = g;
      }
    }, {
      key: "_buildHoursView",
      value: function _buildHoursView() {
        var $tick = $('<div class="timepicker-tick"></div>');
        // Hours view
        if (this.options.twelveHour) {
          for (var i = 1; i < 13; i += 1) {
            var tick = $tick.clone();
            var radian = i / 6 * Math.PI;
            var radius = this.options.outerRadius;
            tick.css({
              left: this.options.dialRadius + Math.sin(radian) * radius - this.options.tickRadius + 'px',
              top: this.options.dialRadius - Math.cos(radian) * radius - this.options.tickRadius + 'px'
            });
            tick.html(i === 0 ? '00' : i);
            this.hoursView.appendChild(tick[0]);
            // tick.on(mousedownEvent, mousedown);
          }
        } else {
          for (var _i2 = 0; _i2 < 24; _i2 += 1) {
            var _tick = $tick.clone();
            var _radian = _i2 / 6 * Math.PI;
            var inner = _i2 > 0 && _i2 < 13;
            var _radius = inner ? this.options.innerRadius : this.options.outerRadius;
            _tick.css({
              left: this.options.dialRadius + Math.sin(_radian) * _radius - this.options.tickRadius + 'px',
              top: this.options.dialRadius - Math.cos(_radian) * _radius - this.options.tickRadius + 'px'
            });
            _tick.html(_i2 === 0 ? '00' : _i2);
            this.hoursView.appendChild(_tick[0]);
            // tick.on(mousedownEvent, mousedown);
          }
        }
      }
    }, {
      key: "_buildMinutesView",
      value: function _buildMinutesView() {
        var $tick = $('<div class="timepicker-tick"></div>');
        // Minutes view
        for (var i = 0; i < 60; i += 5) {
          var tick = $tick.clone();
          var radian = i / 30 * Math.PI;
          tick.css({
            left: this.options.dialRadius + Math.sin(radian) * this.options.outerRadius - this.options.tickRadius + 'px',
            top: this.options.dialRadius - Math.cos(radian) * this.options.outerRadius - this.options.tickRadius + 'px'
          });
          tick.html(Timepicker._addLeadingZero(i));
          this.minutesView.appendChild(tick[0]);
        }
      }
    }, {
      key: "_handleAmPmClick",
      value: function _handleAmPmClick(e) {
        var $btnClicked = $(e.target);
        this.amOrPm = $btnClicked.hasClass('am-btn') ? 'AM' : 'PM';
        this._updateAmPmView();
      }
    }, {
      key: "_updateAmPmView",
      value: function _updateAmPmView() {
        if (this.options.twelveHour) {
          this.$amBtn.toggleClass('text-primary', this.amOrPm === 'AM');
          this.$pmBtn.toggleClass('text-primary', this.amOrPm === 'PM');
        }
      }
    }, {
      key: "_updateTimeFromInput",
      value: function _updateTimeFromInput() {
        // Get the time
        var value = ((this.el.value || this.options.defaultTime || '') + '').split(':');
        if (this.options.twelveHour && !(typeof value[1] === 'undefined')) {
          if (value[1].toUpperCase().indexOf('AM') > 0) {
            this.amOrPm = 'AM';
          } else {
            this.amOrPm = 'PM';
          }
          value[1] = value[1].replace('AM', '').replace('PM', '');
        }
        if (value[0] === 'now') {
          var now = new Date(+new Date() + this.options.fromNow);
          value = [now.getHours(), now.getMinutes()];
          if (this.options.twelveHour) {
            this.amOrPm = value[0] >= 12 && value[0] < 24 ? 'PM' : 'AM';
          }
        }
        this.hours = +value[0] || 0;
        this.minutes = +value[1] || 0;
        this.spanHours.innerHTML = this.hours;
        this.spanMinutes.innerHTML = Timepicker._addLeadingZero(this.minutes);

        this._updateAmPmView();
      }
    }, {
      key: "showView",
      value: function showView(view, delay) {
        if (view === 'minutes' && $(this.hoursView).css('visibility') === 'visible') {
          // raiseCallback(this.options.beforeHourSelect);
        }
        var isHours = view === 'hours',
            nextView = isHours ? this.hoursView : this.minutesView,
            hideView = isHours ? this.minutesView : this.hoursView;
        this.currentView = view;

        $(this.spanHours).toggleClass('text-primary', isHours);
        $(this.spanMinutes).toggleClass('text-primary', !isHours);

        // Transition view
        hideView.classList.add('timepicker-dial-out');
        $(nextView).css('visibility', 'visible').removeClass('timepicker-dial-out');

        // Reset clock hand
        this.resetClock(delay);

        // After transitions ended
        clearTimeout(this.toggleViewTimer);
        this.toggleViewTimer = setTimeout(function () {
          $(hideView).css('visibility', 'hidden');
        }, this.options.duration);
      }
    }, {
      key: "resetClock",
      value: function resetClock(delay) {
        var view = this.currentView,
            value = this[view],
            isHours = view === 'hours',
            unit = Math.PI / (isHours ? 6 : 30),
            radian = value * unit,
            radius = isHours && value > 0 && value < 13 ? this.options.innerRadius : this.options.outerRadius,
            x = Math.sin(radian) * radius,
            y = -Math.cos(radian) * radius,
            self = this;

        if (delay) {
          $(this.canvas).addClass('timepicker-canvas-out');
          setTimeout(function () {
            $(self.canvas).removeClass('timepicker-canvas-out');
            self.setHand(x, y);
          }, delay);
        } else {
          this.setHand(x, y);
        }
      }
    }, {
      key: "setHand",
      value: function setHand(x, y, roundBy5) {
        var _this60 = this;

        var radian = Math.atan2(x, -y),
            isHours = this.currentView === 'hours',
            unit = Math.PI / (isHours || roundBy5 ? 6 : 30),
            z = Math.sqrt(x * x + y * y),
            inner = isHours && z < (this.options.outerRadius + this.options.innerRadius) / 2,
            radius = inner ? this.options.innerRadius : this.options.outerRadius;

        if (this.options.twelveHour) {
          radius = this.options.outerRadius;
        }

        // Radian should in range [0, 2PI]
        if (radian < 0) {
          radian = Math.PI * 2 + radian;
        }

        // Get the round value
        var value = Math.round(radian / unit);

        // Get the round radian
        radian = value * unit;

        // Correct the hours or minutes
        if (this.options.twelveHour) {
          if (isHours) {
            if (value === 0) value = 12;
          } else {
            if (roundBy5) value *= 5;
            if (value === 60) value = 0;
          }
        } else {
          if (isHours) {
            if (value === 12) {
              value = 0;
            }
            value = inner ? value === 0 ? 12 : value : value === 0 ? 0 : value + 12;
          } else {
            if (roundBy5) {
              value *= 5;
            }
            if (value === 60) {
              value = 0;
            }
          }
        }

        // Once hours or minutes changed, vibrate the device
        if (this[this.currentView] !== value) {
          if (this.vibrate && this.options.vibrate) {
            // Do not vibrate too frequently
            if (!this.vibrateTimer) {
              navigator[this.vibrate](10);
              this.vibrateTimer = setTimeout(function () {
                _this60.vibrateTimer = null;
              }, 100);
            }
          }
        }

        this[this.currentView] = value;
        if (isHours) {
          this['spanHours'].innerHTML = value;
        } else {
          this['spanMinutes'].innerHTML = Timepicker._addLeadingZero(value);
        }

        // Set clock hand and others' position
        var cx1 = Math.sin(radian) * (radius - this.options.tickRadius),
            cy1 = -Math.cos(radian) * (radius - this.options.tickRadius),
            cx2 = Math.sin(radian) * radius,
            cy2 = -Math.cos(radian) * radius;
        this.hand.setAttribute('x2', cx1);
        this.hand.setAttribute('y2', cy1);
        this.bg.setAttribute('cx', cx2);
        this.bg.setAttribute('cy', cy2);
      }
    }, {
      key: "open",
      value: function open() {
        if (this.isOpen) {
          return;
        }

        this.isOpen = true;
        this._updateTimeFromInput();
        this.showView('hours');

        this.modal.open();
      }
    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }

        this.isOpen = false;
        this.modal.close();
      }

      /**
       * Finish timepicker selection.
       */

    }, {
      key: "done",
      value: function done(e, clearValue) {
        // Set input value
        var last = this.el.value;
        var value = clearValue ? '' : Timepicker._addLeadingZero(this.hours) + ':' + Timepicker._addLeadingZero(this.minutes);
        this.time = value;
        if (!clearValue && this.options.twelveHour) {
          value = value + " " + this.amOrPm;
        }
        this.el.value = value;

        // Trigger change event
        if (value !== last) {
          this.$el.trigger('change');
        }

        this.close();
        this.el.focus();
      }
    }, {
      key: "clear",
      value: function clear() {
        this.done(null, true);
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Timepicker.__proto__ || Object.getPrototypeOf(Timepicker), "init", this).call(this, this, els, options);
      }
    }, {
      key: "_addLeadingZero",
      value: function _addLeadingZero(num) {
        return (num < 10 ? '0' : '') + num;
      }
    }, {
      key: "_createSVGEl",
      value: function _createSVGEl(name) {
        var svgNS = 'http://www.w3.org/2000/svg';
        return document.createElementNS(svgNS, name);
      }

      /**
       * @typedef {Object} Point
       * @property {number} x The X Coordinate
       * @property {number} y The Y Coordinate
       */

      /**
       * Get x position of mouse or touch event
       * @param {Event} e
       * @return {Point} x and y location
       */

    }, {
      key: "_Pos",
      value: function _Pos(e) {
        if (e.targetTouches && e.targetTouches.length >= 1) {
          return { x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY };
        }
        // mouse event
        return { x: e.clientX, y: e.clientY };
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Timepicker;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Timepicker;
  }(Component);

  Timepicker._template = ['<div class= "modal timepicker-modal">', '<div class="modal-content timepicker-container">', '<div class="timepicker-digital-display">', '<div class="timepicker-text-container">', '<div class="timepicker-display-column">', '<span class="timepicker-span-hours text-primary"></span>', ':', '<span class="timepicker-span-minutes"></span>', '</div>', '<div class="timepicker-display-column timepicker-display-am-pm">', '<div class="timepicker-span-am-pm"></div>', '</div>', '</div>', '</div>', '<div class="timepicker-analog-display">', '<div class="timepicker-plate">', '<div class="timepicker-canvas"></div>', '<div class="timepicker-dial timepicker-hours"></div>', '<div class="timepicker-dial timepicker-minutes timepicker-dial-out"></div>', '</div>', '<div class="timepicker-footer"></div>', '</div>', '</div>', '</div>'].join('');

  M.Timepicker = Timepicker;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Timepicker, 'timepicker', 'M_Timepicker');
  }
})(cash);
;(function ($) {
  'use strict';

  var _defaults = {};

  /**
   * @class
   *
   */

  var CharacterCounter = function (_Component17) {
    _inherits(CharacterCounter, _Component17);

    /**
     * Construct CharacterCounter instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function CharacterCounter(el, options) {
      _classCallCheck(this, CharacterCounter);

      var _this61 = _possibleConstructorReturn(this, (CharacterCounter.__proto__ || Object.getPrototypeOf(CharacterCounter)).call(this, CharacterCounter, el, options));

      _this61.el.M_CharacterCounter = _this61;

      /**
       * Options for the character counter
       */
      _this61.options = $.extend({}, CharacterCounter.defaults, options);

      _this61.isInvalid = false;
      _this61.isValidLength = false;
      _this61._setupCounter();
      _this61._setupEventHandlers();
      return _this61;
    }

    _createClass(CharacterCounter, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this.el.CharacterCounter = undefined;
        this._removeCounter();
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleUpdateCounterBound = this.updateCounter.bind(this);

        this.el.addEventListener('focus', this._handleUpdateCounterBound, true);
        this.el.addEventListener('input', this._handleUpdateCounterBound, true);
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener('focus', this._handleUpdateCounterBound, true);
        this.el.removeEventListener('input', this._handleUpdateCounterBound, true);
      }

      /**
       * Setup counter element
       */

    }, {
      key: "_setupCounter",
      value: function _setupCounter() {
        this.counterEl = document.createElement('span');
        $(this.counterEl).addClass('character-counter').css({
          float: 'right',
          'font-size': '12px',
          height: 1
        });

        this.$el.parent().append(this.counterEl);
      }

      /**
       * Remove counter element
       */

    }, {
      key: "_removeCounter",
      value: function _removeCounter() {
        $(this.counterEl).remove();
      }

      /**
       * Update counter
       */

    }, {
      key: "updateCounter",
      value: function updateCounter() {
        var maxLength = +this.$el.attr('data-length'),
            actualLength = this.el.value.length;
        this.isValidLength = actualLength <= maxLength;
        var counterString = actualLength;

        if (maxLength) {
          counterString += '/' + maxLength;
          this._validateInput();
        }

        $(this.counterEl).html(counterString);
      }

      /**
       * Add validation classes
       */

    }, {
      key: "_validateInput",
      value: function _validateInput() {
        if (this.isValidLength && this.isInvalid) {
          this.isInvalid = false;
          this.$el.removeClass('invalid');
        } else if (!this.isValidLength && !this.isInvalid) {
          this.isInvalid = true;
          this.$el.removeClass('valid');
          this.$el.addClass('invalid');
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(CharacterCounter.__proto__ || Object.getPrototypeOf(CharacterCounter), "init", this).call(this, this, els, options);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_CharacterCounter;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return CharacterCounter;
  }(Component);

  M.CharacterCounter = CharacterCounter;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(CharacterCounter, 'characterCounter', 'M_CharacterCounter');
  }
})(cash);
;(function ($) {
  'use strict';

  var _defaults = {
    duration: 200, // ms
    dist: -100, // zoom scale TODO: make this more intuitive as an option
    shift: 0, // spacing for center image
    padding: 0, // Padding between non center items
    numVisible: 5, // Number of visible items in carousel
    fullWidth: false, // Change to full width styles
    indicators: false, // Toggle indicators
    noWrap: false, // Don't wrap around and cycle through items.
    onCycleTo: null // Callback for when a new slide is cycled to.
  };

  /**
   * @class
   *
   */

  var Carousel = function (_Component18) {
    _inherits(Carousel, _Component18);

    /**
     * Construct Carousel instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Carousel(el, options) {
      _classCallCheck(this, Carousel);

      var _this62 = _possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this, Carousel, el, options));

      _this62.el.M_Carousel = _this62;

      /**
       * Options for the carousel
       * @member Carousel#options
       * @prop {Number} duration
       * @prop {Number} dist
       * @prop {Number} shift
       * @prop {Number} padding
       * @prop {Number} numVisible
       * @prop {Boolean} fullWidth
       * @prop {Boolean} indicators
       * @prop {Boolean} noWrap
       * @prop {Function} onCycleTo
       */
      _this62.options = $.extend({}, Carousel.defaults, options);

      // Setup
      _this62.hasMultipleSlides = _this62.$el.find('.carousel-item').length > 1;
      _this62.showIndicators = _this62.options.indicators && _this62.hasMultipleSlides;
      _this62.noWrap = _this62.options.noWrap || !_this62.hasMultipleSlides;
      _this62.pressed = false;
      _this62.dragged = false;
      _this62.offset = _this62.target = 0;
      _this62.images = [];
      _this62.itemWidth = _this62.$el.find('.carousel-item').first().innerWidth();
      _this62.itemHeight = _this62.$el.find('.carousel-item').first().innerHeight();
      _this62.dim = _this62.itemWidth * 2 + _this62.options.padding || 1; // Make sure dim is non zero for divisions.
      _this62._autoScrollBound = _this62._autoScroll.bind(_this62);
      _this62._trackBound = _this62._track.bind(_this62);

      // Full Width carousel setup
      if (_this62.options.fullWidth) {
        _this62.options.dist = 0;
        _this62._setCarouselHeight();

        // Offset fixed items when indicators.
        if (_this62.showIndicators) {
          _this62.$el.find('.carousel-fixed-item').addClass('with-indicators');
        }
      }

      // Iterate through slides
      _this62.$indicators = $('<ul class="indicators"></ul>');
      _this62.$el.find('.carousel-item').each(function (el, i) {
        _this62.images.push(el);
        if (_this62.showIndicators) {
          var $indicator = $('<li class="indicator-item"></li>');

          // Add active to first by default.
          if (i === 0) {
            $indicator[0].classList.add('active');
          }

          _this62.$indicators.append($indicator);
        }
      });
      if (_this62.showIndicators) {
        _this62.$el.append(_this62.$indicators);
      }
      _this62.count = _this62.images.length;

      // Cap numVisible at count
      _this62.options.numVisible = Math.min(_this62.count, _this62.options.numVisible);

      // Setup cross browser string
      _this62.xform = 'transform';
      ['webkit', 'Moz', 'O', 'ms'].every(function (prefix) {
        var e = prefix + 'Transform';
        if (typeof document.body.style[e] !== 'undefined') {
          _this62.xform = e;
          return false;
        }
        return true;
      });

      _this62._setupEventHandlers();
      _this62._scroll(_this62.offset);
      return _this62;
    }

    _createClass(Carousel, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this.el.M_Carousel = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        var _this63 = this;

        this._handleCarouselTapBound = this._handleCarouselTap.bind(this);
        this._handleCarouselDragBound = this._handleCarouselDrag.bind(this);
        this._handleCarouselReleaseBound = this._handleCarouselRelease.bind(this);
        this._handleCarouselClickBound = this._handleCarouselClick.bind(this);

        if (typeof window.ontouchstart !== 'undefined') {
          this.el.addEventListener('touchstart', this._handleCarouselTapBound);
          this.el.addEventListener('touchmove', this._handleCarouselDragBound);
          this.el.addEventListener('touchend', this._handleCarouselReleaseBound);
        }

        this.el.addEventListener('mousedown', this._handleCarouselTapBound);
        this.el.addEventListener('mousemove', this._handleCarouselDragBound);
        this.el.addEventListener('mouseup', this._handleCarouselReleaseBound);
        this.el.addEventListener('mouseleave', this._handleCarouselReleaseBound);
        this.el.addEventListener('click', this._handleCarouselClickBound);

        if (this.showIndicators && this.$indicators) {
          this._handleIndicatorClickBound = this._handleIndicatorClick.bind(this);
          this.$indicators.find('.indicator-item').each(function (el, i) {
            el.addEventListener('click', _this63._handleIndicatorClickBound);
          });
        }

        // Resize
        var throttledResize = M.throttle(this._handleResize, 200);
        this._handleThrottledResizeBound = throttledResize.bind(this);

        window.addEventListener('resize', this._handleThrottledResizeBound);
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        var _this64 = this;

        if (typeof window.ontouchstart !== 'undefined') {
          this.el.removeEventListener('touchstart', this._handleCarouselTapBound);
          this.el.removeEventListener('touchmove', this._handleCarouselDragBound);
          this.el.removeEventListener('touchend', this._handleCarouselReleaseBound);
        }
        this.el.removeEventListener('mousedown', this._handleCarouselTapBound);
        this.el.removeEventListener('mousemove', this._handleCarouselDragBound);
        this.el.removeEventListener('mouseup', this._handleCarouselReleaseBound);
        this.el.removeEventListener('mouseleave', this._handleCarouselReleaseBound);
        this.el.removeEventListener('click', this._handleCarouselClickBound);

        if (this.showIndicators && this.$indicators) {
          this.$indicators.find('.indicator-item').each(function (el, i) {
            el.removeEventListener('click', _this64._handleIndicatorClickBound);
          });
        }

        window.removeEventListener('resize', this._handleThrottledResizeBound);
      }

      /**
       * Handle Carousel Tap
       * @param {Event} e
       */

    }, {
      key: "_handleCarouselTap",
      value: function _handleCarouselTap(e) {
        // Fixes firefox draggable image bug
        if (e.type === 'mousedown' && $(e.target).is('img')) {
          e.preventDefault();
        }
        this.pressed = true;
        this.dragged = false;
        this.verticalDragged = false;
        this.reference = this._xpos(e);
        this.referenceY = this._ypos(e);

        this.velocity = this.amplitude = 0;
        this.frame = this.offset;
        this.timestamp = Date.now();
        clearInterval(this.ticker);
        this.ticker = setInterval(this._trackBound, 100);
      }

      /**
       * Handle Carousel Drag
       * @param {Event} e
       */

    }, {
      key: "_handleCarouselDrag",
      value: function _handleCarouselDrag(e) {
        var x = void 0,
            y = void 0,
            delta = void 0,
            deltaY = void 0;
        if (this.pressed) {
          x = this._xpos(e);
          y = this._ypos(e);
          delta = this.reference - x;
          deltaY = Math.abs(this.referenceY - y);
          if (deltaY < 30 && !this.verticalDragged) {
            // If vertical scrolling don't allow dragging.
            if (delta > 2 || delta < -2) {
              this.dragged = true;
              this.reference = x;
              this._scroll(this.offset + delta);
            }
          } else if (this.dragged) {
            // If dragging don't allow vertical scroll.
            e.preventDefault();
            e.stopPropagation();
            return false;
          } else {
            // Vertical scrolling.
            this.verticalDragged = true;
          }
        }

        if (this.dragged) {
          // If dragging don't allow vertical scroll.
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      }

      /**
       * Handle Carousel Release
       * @param {Event} e
       */

    }, {
      key: "_handleCarouselRelease",
      value: function _handleCarouselRelease(e) {
        if (this.pressed) {
          this.pressed = false;
        } else {
          return;
        }

        clearInterval(this.ticker);
        this.target = this.offset;
        if (this.velocity > 10 || this.velocity < -10) {
          this.amplitude = 0.9 * this.velocity;
          this.target = this.offset + this.amplitude;
        }
        this.target = Math.round(this.target / this.dim) * this.dim;

        // No wrap of items.
        if (this.noWrap) {
          if (this.target >= this.dim * (this.count - 1)) {
            this.target = this.dim * (this.count - 1);
          } else if (this.target < 0) {
            this.target = 0;
          }
        }
        this.amplitude = this.target - this.offset;
        this.timestamp = Date.now();
        requestAnimationFrame(this._autoScrollBound);

        if (this.dragged) {
          e.preventDefault();
          e.stopPropagation();
        }
        return false;
      }

      /**
       * Handle Carousel CLick
       * @param {Event} e
       */

    }, {
      key: "_handleCarouselClick",
      value: function _handleCarouselClick(e) {
        // Disable clicks if carousel was dragged.
        if (this.dragged) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        } else if (!this.options.fullWidth) {
          var clickedIndex = $(e.target).closest('.carousel-item').index();
          var diff = this._wrap(this.center) - clickedIndex;

          // Disable clicks if carousel was shifted by click
          if (diff !== 0) {
            e.preventDefault();
            e.stopPropagation();
          }
          this._cycleTo(clickedIndex);
        }
      }

      /**
       * Handle Indicator CLick
       * @param {Event} e
       */

    }, {
      key: "_handleIndicatorClick",
      value: function _handleIndicatorClick(e) {
        e.stopPropagation();

        var indicator = $(e.target).closest('.indicator-item');
        if (indicator.length) {
          this._cycleTo(indicator.index());
        }
      }

      /**
       * Handle Throttle Resize
       * @param {Event} e
       */

    }, {
      key: "_handleResize",
      value: function _handleResize(e) {
        if (this.options.fullWidth) {
          this.itemWidth = this.$el.find('.carousel-item').first().innerWidth();
          this.imageHeight = this.$el.find('.carousel-item.active').height();
          this.dim = this.itemWidth * 2 + this.options.padding;
          this.offset = this.center * 2 * this.itemWidth;
          this.target = this.offset;
          this._setCarouselHeight(true);
        } else {
          this._scroll();
        }
      }

      /**
       * Set carousel height based on first slide
       * @param {Booleam} imageOnly - true for image slides
       */

    }, {
      key: "_setCarouselHeight",
      value: function _setCarouselHeight(imageOnly) {
        var _this65 = this;

        var firstSlide = this.$el.find('.carousel-item.active').length ? this.$el.find('.carousel-item.active').first() : this.$el.find('.carousel-item').first();
        var firstImage = firstSlide.find('img').first();
        if (firstImage.length) {
          if (firstImage[0].complete) {
            // If image won't trigger the load event
            var imageHeight = firstImage.height();
            if (imageHeight > 0) {
              this.$el.css('height', imageHeight + 'px');
            } else {
              // If image still has no height, use the natural dimensions to calculate
              var naturalWidth = firstImage[0].naturalWidth;
              var naturalHeight = firstImage[0].naturalHeight;
              var adjustedHeight = this.$el.width() / naturalWidth * naturalHeight;
              this.$el.css('height', adjustedHeight + 'px');
            }
          } else {
            // Get height when image is loaded normally
            firstImage.one('load', function (el, i) {
              _this65.$el.css('height', el.offsetHeight + 'px');
            });
          }
        } else if (!imageOnly) {
          var slideHeight = firstSlide.height();
          this.$el.css('height', slideHeight + 'px');
        }
      }

      /**
       * Get x position from event
       * @param {Event} e
       */

    }, {
      key: "_xpos",
      value: function _xpos(e) {
        // touch event
        if (e.targetTouches && e.targetTouches.length >= 1) {
          return e.targetTouches[0].clientX;
        }

        // mouse event
        return e.clientX;
      }

      /**
       * Get y position from event
       * @param {Event} e
       */

    }, {
      key: "_ypos",
      value: function _ypos(e) {
        // touch event
        if (e.targetTouches && e.targetTouches.length >= 1) {
          return e.targetTouches[0].clientY;
        }

        // mouse event
        return e.clientY;
      }

      /**
       * Wrap index
       * @param {Number} x
       */

    }, {
      key: "_wrap",
      value: function _wrap(x) {
        return x >= this.count ? x % this.count : x < 0 ? this._wrap(this.count + x % this.count) : x;
      }

      /**
       * Tracks scrolling information
       */

    }, {
      key: "_track",
      value: function _track() {
        var now = void 0,
            elapsed = void 0,
            delta = void 0,
            v = void 0;

        now = Date.now();
        elapsed = now - this.timestamp;
        this.timestamp = now;
        delta = this.offset - this.frame;
        this.frame = this.offset;

        v = 1000 * delta / (1 + elapsed);
        this.velocity = 0.8 * v + 0.2 * this.velocity;
      }

      /**
       * Auto scrolls to nearest carousel item.
       */

    }, {
      key: "_autoScroll",
      value: function _autoScroll() {
        var elapsed = void 0,
            delta = void 0;

        if (this.amplitude) {
          elapsed = Date.now() - this.timestamp;
          delta = this.amplitude * Math.exp(-elapsed / this.options.duration);
          if (delta > 2 || delta < -2) {
            this._scroll(this.target - delta);
            requestAnimationFrame(this._autoScrollBound);
          } else {
            this._scroll(this.target);
          }
        }
      }

      /**
       * Scroll to target
       * @param {Number} x
       */

    }, {
      key: "_scroll",
      value: function _scroll(x) {
        var _this66 = this;

        // Track scrolling state
        if (!this.$el.hasClass('scrolling')) {
          this.el.classList.add('scrolling');
        }
        if (this.scrollingTimeout != null) {
          window.clearTimeout(this.scrollingTimeout);
        }
        this.scrollingTimeout = window.setTimeout(function () {
          _this66.$el.removeClass('scrolling');
        }, this.options.duration);

        // Start actual scroll
        var i = void 0,
            half = void 0,
            delta = void 0,
            dir = void 0,
            tween = void 0,
            el = void 0,
            alignment = void 0,
            zTranslation = void 0,
            tweenedOpacity = void 0,
            centerTweenedOpacity = void 0;
        var lastCenter = this.center;
        var numVisibleOffset = 1 / this.options.numVisible;

        this.offset = typeof x === 'number' ? x : this.offset;
        this.center = Math.floor((this.offset + this.dim / 2) / this.dim);
        delta = this.offset - this.center * this.dim;
        dir = delta < 0 ? 1 : -1;
        tween = -dir * delta * 2 / this.dim;
        half = this.count >> 1;

        if (this.options.fullWidth) {
          alignment = 'translateX(0)';
          centerTweenedOpacity = 1;
        } else {
          alignment = 'translateX(' + (this.el.clientWidth - this.itemWidth) / 2 + 'px) ';
          alignment += 'translateY(' + (this.el.clientHeight - this.itemHeight) / 2 + 'px)';
          centerTweenedOpacity = 1 - numVisibleOffset * tween;
        }

        // Set indicator active
        if (this.showIndicators) {
          var diff = this.center % this.count;
          var activeIndicator = this.$indicators.find('.indicator-item.active');
          if (activeIndicator.index() !== diff) {
            activeIndicator.removeClass('active');
            this.$indicators.find('.indicator-item').eq(diff)[0].classList.add('active');
          }
        }

        // center
        // Don't show wrapped items.
        if (!this.noWrap || this.center >= 0 && this.center < this.count) {
          el = this.images[this._wrap(this.center)];

          // Add active class to center item.
          if (!$(el).hasClass('active')) {
            this.$el.find('.carousel-item').removeClass('active');
            el.classList.add('active');
          }
          var transformString = alignment + " translateX(" + -delta / 2 + "px) translateX(" + dir * this.options.shift * tween * i + "px) translateZ(" + this.options.dist * tween + "px)";
          this._updateItemStyle(el, centerTweenedOpacity, 0, transformString);
        }

        for (i = 1; i <= half; ++i) {
          // right side
          if (this.options.fullWidth) {
            zTranslation = this.options.dist;
            tweenedOpacity = i === half && delta < 0 ? 1 - tween : 1;
          } else {
            zTranslation = this.options.dist * (i * 2 + tween * dir);
            tweenedOpacity = 1 - numVisibleOffset * (i * 2 + tween * dir);
          }
          // Don't show wrapped items.
          if (!this.noWrap || this.center + i < this.count) {
            el = this.images[this._wrap(this.center + i)];
            var _transformString = alignment + " translateX(" + (this.options.shift + (this.dim * i - delta) / 2) + "px) translateZ(" + zTranslation + "px)";
            this._updateItemStyle(el, tweenedOpacity, -i, _transformString);
          }

          // left side
          if (this.options.fullWidth) {
            zTranslation = this.options.dist;
            tweenedOpacity = i === half && delta > 0 ? 1 - tween : 1;
          } else {
            zTranslation = this.options.dist * (i * 2 - tween * dir);
            tweenedOpacity = 1 - numVisibleOffset * (i * 2 - tween * dir);
          }
          // Don't show wrapped items.
          if (!this.noWrap || this.center - i >= 0) {
            el = this.images[this._wrap(this.center - i)];
            var _transformString2 = alignment + " translateX(" + (-this.options.shift + (-this.dim * i - delta) / 2) + "px) translateZ(" + zTranslation + "px)";
            this._updateItemStyle(el, tweenedOpacity, -i, _transformString2);
          }
        }

        // center
        // Don't show wrapped items.
        if (!this.noWrap || this.center >= 0 && this.center < this.count) {
          el = this.images[this._wrap(this.center)];
          var _transformString3 = alignment + " translateX(" + -delta / 2 + "px) translateX(" + dir * this.options.shift * tween + "px) translateZ(" + this.options.dist * tween + "px)";
          this._updateItemStyle(el, centerTweenedOpacity, 0, _transformString3);
        }

        // onCycleTo callback
        var $currItem = this.$el.find('.carousel-item').eq(this._wrap(this.center));
        if (lastCenter !== this.center && typeof this.options.onCycleTo === 'function') {
          this.options.onCycleTo.call(this, $currItem[0], this.dragged);
        }

        // One time callback
        if (typeof this.oneTimeCallback === 'function') {
          this.oneTimeCallback.call(this, $currItem[0], this.dragged);
          this.oneTimeCallback = null;
        }
      }

      /**
       * Cycle to target
       * @param {Element} el
       * @param {Number} opacity
       * @param {Number} zIndex
       * @param {String} transform
       */

    }, {
      key: "_updateItemStyle",
      value: function _updateItemStyle(el, opacity, zIndex, transform) {
        el.style[this.xform] = transform;
        el.style.zIndex = zIndex;
        el.style.opacity = opacity;
        el.style.visibility = 'visible';
      }

      /**
       * Cycle to target
       * @param {Number} n
       * @param {Function} callback
       */

    }, {
      key: "_cycleTo",
      value: function _cycleTo(n, callback) {
        var diff = this.center % this.count - n;

        // Account for wraparound.
        if (!this.noWrap) {
          if (diff < 0) {
            if (Math.abs(diff + this.count) < Math.abs(diff)) {
              diff += this.count;
            }
          } else if (diff > 0) {
            if (Math.abs(diff - this.count) < diff) {
              diff -= this.count;
            }
          }
        }

        this.target = this.dim * Math.round(this.offset / this.dim);
        // Next
        if (diff < 0) {
          this.target += this.dim * Math.abs(diff);

          // Prev
        } else if (diff > 0) {
          this.target -= this.dim * diff;
        }

        // Set one time callback
        if (typeof callback === 'function') {
          this.oneTimeCallback = callback;
        }

        // Scroll
        if (this.offset !== this.target) {
          this.amplitude = this.target - this.offset;
          this.timestamp = Date.now();
          requestAnimationFrame(this._autoScrollBound);
        }
      }

      /**
       * Cycle to next item
       * @param {Number} [n]
       */

    }, {
      key: "next",
      value: function next(n) {
        if (n === undefined || isNaN(n)) {
          n = 1;
        }

        var index = this.center + n;
        if (index >= this.count || index < 0) {
          if (this.noWrap) {
            return;
          }

          index = this._wrap(index);
        }
        this._cycleTo(index);
      }

      /**
       * Cycle to previous item
       * @param {Number} [n]
       */

    }, {
      key: "prev",
      value: function prev(n) {
        if (n === undefined || isNaN(n)) {
          n = 1;
        }

        var index = this.center - n;
        if (index >= this.count || index < 0) {
          if (this.noWrap) {
            return;
          }

          index = this._wrap(index);
        }

        this._cycleTo(index);
      }

      /**
       * Cycle to nth item
       * @param {Number} [n]
       * @param {Function} callback
       */

    }, {
      key: "set",
      value: function set(n, callback) {
        if (n === undefined || isNaN(n)) {
          n = 0;
        }

        if (n > this.count || n < 0) {
          if (this.noWrap) {
            return;
          }

          n = this._wrap(n);
        }

        this._cycleTo(n, callback);
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Carousel.__proto__ || Object.getPrototypeOf(Carousel), "init", this).call(this, this, els, options);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Carousel;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Carousel;
  }(Component);

  M.Carousel = Carousel;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Carousel, 'carousel', 'M_Carousel');
  }
})(cash);
;(function ($) {
  'use strict';

  var _defaults = {
    onOpen: undefined,
    onClose: undefined
  };

  /**
   * @class
   *
   */

  var TapTarget = function (_Component19) {
    _inherits(TapTarget, _Component19);

    /**
     * Construct TapTarget instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function TapTarget(el, options) {
      _classCallCheck(this, TapTarget);

      var _this67 = _possibleConstructorReturn(this, (TapTarget.__proto__ || Object.getPrototypeOf(TapTarget)).call(this, TapTarget, el, options));

      _this67.el.M_TapTarget = _this67;

      /**
       * Options for the select
       * @member TapTarget#options
       * @prop {Function} onOpen - Callback function called when feature discovery is opened
       * @prop {Function} onClose - Callback function called when feature discovery is closed
       */
      _this67.options = $.extend({}, TapTarget.defaults, options);

      _this67.isOpen = false;

      // setup
      _this67.$origin = $('#' + _this67.$el.attr('data-target'));
      _this67._setup();

      _this67._calculatePositioning();
      _this67._setupEventHandlers();
      return _this67;
    }

    _createClass(TapTarget, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this.el.TapTarget = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleDocumentClickBound = this._handleDocumentClick.bind(this);
        this._handleTargetClickBound = this._handleTargetClick.bind(this);
        this._handleOriginClickBound = this._handleOriginClick.bind(this);

        this.el.addEventListener('click', this._handleTargetClickBound);
        this.originEl.addEventListener('click', this._handleOriginClickBound);

        // Resize
        var throttledResize = M.throttle(this._handleResize, 200);
        this._handleThrottledResizeBound = throttledResize.bind(this);

        window.addEventListener('resize', this._handleThrottledResizeBound);
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener('click', this._handleTargetClickBound);
        this.originEl.removeEventListener('click', this._handleOriginClickBound);
        window.removeEventListener('resize', this._handleThrottledResizeBound);
      }

      /**
       * Handle Target Click
       * @param {Event} e
       */

    }, {
      key: "_handleTargetClick",
      value: function _handleTargetClick(e) {
        this.open();
      }

      /**
       * Handle Origin Click
       * @param {Event} e
       */

    }, {
      key: "_handleOriginClick",
      value: function _handleOriginClick(e) {
        this.close();
      }

      /**
       * Handle Resize
       * @param {Event} e
       */

    }, {
      key: "_handleResize",
      value: function _handleResize(e) {
        this._calculatePositioning();
      }

      /**
       * Handle Resize
       * @param {Event} e
       */

    }, {
      key: "_handleDocumentClick",
      value: function _handleDocumentClick(e) {
        if (!$(e.target).closest('.tap-target-wrapper').length) {
          this.close();
          e.preventDefault();
          e.stopPropagation();
        }
      }

      /**
       * Setup Tap Target
       */

    }, {
      key: "_setup",
      value: function _setup() {
        // Creating tap target
        this.wrapper = this.$el.parent()[0];
        this.waveEl = $(this.wrapper).find('.tap-target-wave')[0];
        this.originEl = $(this.wrapper).find('.tap-target-origin')[0];
        this.contentEl = this.$el.find('.tap-target-content')[0];

        // Creating wrapper
        if (!$(this.wrapper).hasClass('.tap-target-wrapper')) {
          this.wrapper = document.createElement('div');
          this.wrapper.classList.add('tap-target-wrapper');
          this.$el.before($(this.wrapper));
          this.wrapper.append(this.el);
        }

        // Creating content
        if (!this.contentEl) {
          this.contentEl = document.createElement('div');
          this.contentEl.classList.add('tap-target-content');
          this.$el.append(this.contentEl);
        }

        // Creating foreground wave
        if (!this.waveEl) {
          this.waveEl = document.createElement('div');
          this.waveEl.classList.add('tap-target-wave');

          // Creating origin
          if (!this.originEl) {
            this.originEl = this.$origin.clone(true, true);
            this.originEl.addClass('tap-target-origin');
            this.originEl.removeAttr('id');
            this.originEl.removeAttr('style');
            this.originEl = this.originEl[0];
            this.waveEl.append(this.originEl);
          }

          this.wrapper.append(this.waveEl);
        }
      }

      /**
       * Calculate positioning
       */

    }, {
      key: "_calculatePositioning",
      value: function _calculatePositioning() {
        // Element or parent is fixed position?
        var isFixed = this.$origin.css('position') === 'fixed';
        if (!isFixed) {
          var parents = this.$origin.parents();
          for (var i = 0; i < parents.length; i++) {
            isFixed = $(parents[i]).css('position') == 'fixed';
            if (isFixed) {
              break;
            }
          }
        }

        // Calculating origin
        var originWidth = this.$origin.outerWidth();
        var originHeight = this.$origin.outerHeight();
        var originTop = isFixed ? this.$origin.offset().top - M.getDocumentScrollTop() : this.$origin.offset().top;
        var originLeft = isFixed ? this.$origin.offset().left - M.getDocumentScrollLeft() : this.$origin.offset().left;

        // Calculating screen
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var centerX = windowWidth / 2;
        var centerY = windowHeight / 2;
        var isLeft = originLeft <= centerX;
        var isRight = originLeft > centerX;
        var isTop = originTop <= centerY;
        var isBottom = originTop > centerY;
        var isCenterX = originLeft >= windowWidth * 0.25 && originLeft <= windowWidth * 0.75;

        // Calculating tap target
        var tapTargetWidth = this.$el.outerWidth();
        var tapTargetHeight = this.$el.outerHeight();
        var tapTargetTop = originTop + originHeight / 2 - tapTargetHeight / 2;
        var tapTargetLeft = originLeft + originWidth / 2 - tapTargetWidth / 2;
        var tapTargetPosition = isFixed ? 'fixed' : 'absolute';

        // Calculating content
        var tapTargetTextWidth = isCenterX ? tapTargetWidth : tapTargetWidth / 2 + originWidth;
        var tapTargetTextHeight = tapTargetHeight / 2;
        var tapTargetTextTop = isTop ? tapTargetHeight / 2 : 0;
        var tapTargetTextBottom = 0;
        var tapTargetTextLeft = isLeft && !isCenterX ? tapTargetWidth / 2 - originWidth : 0;
        var tapTargetTextRight = 0;
        var tapTargetTextPadding = originWidth;
        var tapTargetTextAlign = isBottom ? 'bottom' : 'top';

        // Calculating wave
        var tapTargetWaveWidth = originWidth > originHeight ? originWidth * 2 : originWidth * 2;
        var tapTargetWaveHeight = tapTargetWaveWidth;
        var tapTargetWaveTop = tapTargetHeight / 2 - tapTargetWaveHeight / 2;
        var tapTargetWaveLeft = tapTargetWidth / 2 - tapTargetWaveWidth / 2;

        // Setting tap target
        var tapTargetWrapperCssObj = {};
        tapTargetWrapperCssObj.top = isTop ? tapTargetTop + 'px' : '';
        tapTargetWrapperCssObj.right = isRight ? windowWidth - tapTargetLeft - tapTargetWidth + 'px' : '';
        tapTargetWrapperCssObj.bottom = isBottom ? windowHeight - tapTargetTop - tapTargetHeight + 'px' : '';
        tapTargetWrapperCssObj.left = isLeft ? tapTargetLeft + 'px' : '';
        tapTargetWrapperCssObj.position = tapTargetPosition;
        $(this.wrapper).css(tapTargetWrapperCssObj);

        // Setting content
        $(this.contentEl).css({
          width: tapTargetTextWidth + 'px',
          height: tapTargetTextHeight + 'px',
          top: tapTargetTextTop + 'px',
          right: tapTargetTextRight + 'px',
          bottom: tapTargetTextBottom + 'px',
          left: tapTargetTextLeft + 'px',
          padding: tapTargetTextPadding + 'px',
          verticalAlign: tapTargetTextAlign
        });

        // Setting wave
        $(this.waveEl).css({
          top: tapTargetWaveTop + 'px',
          left: tapTargetWaveLeft + 'px',
          width: tapTargetWaveWidth + 'px',
          height: tapTargetWaveHeight + 'px'
        });
      }

      /**
       * Open TapTarget
       */

    }, {
      key: "open",
      value: function open() {
        if (this.isOpen) {
          return;
        }

        // onOpen callback
        if (typeof this.options.onOpen === 'function') {
          this.options.onOpen.call(this, this.$origin[0]);
        }

        this.isOpen = true;
        this.wrapper.classList.add('open');

        document.body.addEventListener('click', this._handleDocumentClickBound, true);
        document.body.addEventListener('touchend', this._handleDocumentClickBound);
      }

      /**
       * Close Tap Target
       */

    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }

        // onClose callback
        if (typeof this.options.onClose === 'function') {
          this.options.onClose.call(this, this.$origin[0]);
        }

        this.isOpen = false;
        this.wrapper.classList.remove('open');

        document.body.removeEventListener('click', this._handleDocumentClickBound, true);
        document.body.removeEventListener('touchend', this._handleDocumentClickBound);
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(TapTarget.__proto__ || Object.getPrototypeOf(TapTarget), "init", this).call(this, this, els, options);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_TapTarget;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return TapTarget;
  }(Component);

  M.TapTarget = TapTarget;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(TapTarget, 'tapTarget', 'M_TapTarget');
  }
})(cash);
;(function ($) {
  'use strict';

  var _defaults = {
    classes: '',
    dropdownOptions: {}
  };

  /**
   * @class
   *
   */

  var FormSelect = function (_Component20) {
    _inherits(FormSelect, _Component20);

    /**
     * Construct FormSelect instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function FormSelect(el, options) {
      _classCallCheck(this, FormSelect);

      // Don't init if browser default version
      var _this68 = _possibleConstructorReturn(this, (FormSelect.__proto__ || Object.getPrototypeOf(FormSelect)).call(this, FormSelect, el, options));

      if (_this68.$el.hasClass('browser-default')) {
        return _possibleConstructorReturn(_this68);
      }

      _this68.el.M_FormSelect = _this68;

      /**
       * Options for the select
       * @member FormSelect#options
       */
      _this68.options = $.extend({}, FormSelect.defaults, options);

      _this68.isMultiple = _this68.$el.prop('multiple');

      // Setup
      _this68.el.tabIndex = -1;
      _this68._keysSelected = {};
      _this68._valueDict = {}; // Maps key to original and generated option element.
      _this68._setupDropdown();

      _this68._setupEventHandlers();
      return _this68;
    }

    _createClass(FormSelect, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this._removeDropdown();
        this.el.M_FormSelect = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        var _this69 = this;

        this._handleSelectChangeBound = this._handleSelectChange.bind(this);
        this._handleOptionClickBound = this._handleOptionClick.bind(this);
        this._handleInputClickBound = this._handleInputClick.bind(this);

        $(this.dropdownOptions).find('li:not(.optgroup)').each(function (el) {
          el.addEventListener('click', _this69._handleOptionClickBound);
        });
        this.el.addEventListener('change', this._handleSelectChangeBound);
        this.input.addEventListener('click', this._handleInputClickBound);
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        var _this70 = this;

        $(this.dropdownOptions).find('li:not(.optgroup)').each(function (el) {
          el.removeEventListener('click', _this70._handleOptionClickBound);
        });
        this.el.removeEventListener('change', this._handleSelectChangeBound);
        this.input.removeEventListener('click', this._handleInputClickBound);
      }

      /**
       * Handle Select Change
       * @param {Event} e
       */

    }, {
      key: "_handleSelectChange",
      value: function _handleSelectChange(e) {
        this._setValueToInput();
      }

      /**
       * Handle Option Click
       * @param {Event} e
       */

    }, {
      key: "_handleOptionClick",
      value: function _handleOptionClick(e) {
        e.preventDefault();
        var option = $(e.target).closest('li')[0];
        var key = option.id;
        if (!$(option).hasClass('disabled') && !$(option).hasClass('optgroup') && key.length) {
          var selected = true;

          if (this.isMultiple) {
            // Deselect placeholder option if still selected.
            var placeholderOption = $(this.dropdownOptions).find('li.disabled.selected');
            if (placeholderOption.length) {
              placeholderOption.removeClass('selected');
              placeholderOption.find('input[type="checkbox"]').prop('checked', false);
              this._toggleEntryFromArray(placeholderOption[0].id);
            }
            selected = this._toggleEntryFromArray(key);
          } else {
            $(this.dropdownOptions).find('li').removeClass('selected');
            $(option).toggleClass('selected', selected);
          }

          // Set selected on original select option
          // Only trigger if selected state changed
          var prevSelected = $(this._valueDict[key].el).prop('selected');
          if (prevSelected !== selected) {
            $(this._valueDict[key].el).prop('selected', selected);
            this.$el.trigger('change');
          }
        }

        e.stopPropagation();
      }

      /**
       * Handle Input Click
       */

    }, {
      key: "_handleInputClick",
      value: function _handleInputClick() {
        if (this.dropdown && this.dropdown.isOpen) {
          this._setValueToInput();
          this._setSelectedStates();
        }
      }

      /**
       * Setup dropdown
       */

    }, {
      key: "_setupDropdown",
      value: function _setupDropdown() {
        var _this71 = this;

        this.wrapper = document.createElement('div');
        $(this.wrapper).addClass('select-wrapper ' + this.options.classes);
        this.$el.before($(this.wrapper));
        this.wrapper.appendChild(this.el);

        if (this.el.disabled) {
          this.wrapper.classList.add('disabled');
        }

        // Create dropdown
        this.$selectOptions = this.$el.children('option, optgroup');
        this.dropdownOptions = document.createElement('ul');
        this.dropdownOptions.id = "select-options-" + M.guid();
        $(this.dropdownOptions).addClass('dropdown-content select-dropdown ' + (this.isMultiple ? 'multiple-select-dropdown' : ''));

        // Create dropdown structure.
        if (this.$selectOptions.length) {
          this.$selectOptions.each(function (el) {
            if ($(el).is('option')) {
              // Direct descendant option.
              var optionEl = void 0;
              if (_this71.isMultiple) {
                optionEl = _this71._appendOptionWithIcon(_this71.$el, el, 'multiple');
              } else {
                optionEl = _this71._appendOptionWithIcon(_this71.$el, el);
              }

              _this71._addOptionToValueDict(el, optionEl);
            } else if ($(el).is('optgroup')) {
              // Optgroup.
              var selectOptions = $(el).children('option');
              $(_this71.dropdownOptions).append($('<li class="optgroup"><span>' + el.getAttribute('label') + '</span></li>')[0]);

              selectOptions.each(function (el) {
                var optionEl = _this71._appendOptionWithIcon(_this71.$el, el, 'optgroup-option');
                _this71._addOptionToValueDict(el, optionEl);
              });
            }
          });
        }

        this.$el.after(this.dropdownOptions);

        // Add input dropdown
        this.input = document.createElement('input');
        $(this.input).addClass('select-dropdown dropdown-trigger');
        this.input.setAttribute('type', 'text');
        this.input.setAttribute('readonly', 'true');
        this.input.setAttribute('data-target', this.dropdownOptions.id);
        if (this.el.disabled) {
          $(this.input).prop('disabled', 'true');
        }

        this.$el.before(this.input);
        this._setValueToInput();

        // Add caret
        var dropdownIcon = $('<svg class="caret" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
        this.$el.before(dropdownIcon[0]);

        // Initialize dropdown
        if (!this.el.disabled) {
          var dropdownOptions = $.extend({}, this.options.dropdownOptions);

          // Add callback for centering selected option when dropdown content is scrollable
          dropdownOptions.onOpenEnd = function (el) {
            var selectedOption = $(_this71.dropdownOptions).find('.selected').first();

            if (selectedOption.length) {
              // Focus selected option in dropdown
              M.keyDown = true;
              _this71.dropdown.focusedIndex = selectedOption.index();
              _this71.dropdown._focusFocusedItem();
              M.keyDown = false;

              // Handle scrolling to selected option
              if (_this71.dropdown.isScrollable) {
                var scrollOffset = selectedOption[0].getBoundingClientRect().top - _this71.dropdownOptions.getBoundingClientRect().top; // scroll to selected option
                scrollOffset -= _this71.dropdownOptions.clientHeight / 2; // center in dropdown
                _this71.dropdownOptions.scrollTop = scrollOffset;
              }
            }
          };

          if (this.isMultiple) {
            dropdownOptions.closeOnClick = false;
          }
          this.dropdown = M.Dropdown.init(this.input, dropdownOptions);
        }

        // Add initial selections
        this._setSelectedStates();
      }

      /**
       * Add option to value dict
       * @param {Element} el  original option element
       * @param {Element} optionEl  generated option element
       */

    }, {
      key: "_addOptionToValueDict",
      value: function _addOptionToValueDict(el, optionEl) {
        var index = Object.keys(this._valueDict).length;
        var key = this.dropdownOptions.id + index;
        var obj = {};
        optionEl.id = key;

        obj.el = el;
        obj.optionEl = optionEl;
        this._valueDict[key] = obj;
      }

      /**
       * Remove dropdown
       */

    }, {
      key: "_removeDropdown",
      value: function _removeDropdown() {
        $(this.wrapper).find('.caret').remove();
        $(this.input).remove();
        $(this.dropdownOptions).remove();
        $(this.wrapper).before(this.$el);
        $(this.wrapper).remove();
      }

      /**
       * Setup dropdown
       * @param {Element} select  select element
       * @param {Element} option  option element from select
       * @param {String} type
       * @return {Element}  option element added
       */

    }, {
      key: "_appendOptionWithIcon",
      value: function _appendOptionWithIcon(select, option, type) {
        // Add disabled attr if disabled
        var disabledClass = option.disabled ? 'disabled ' : '';
        var optgroupClass = type === 'optgroup-option' ? 'optgroup-option ' : '';
        var multipleCheckbox = this.isMultiple ? "<label><input type=\"checkbox\"" + disabledClass + "\"/><span>" + option.innerHTML + "</span></label>" : option.innerHTML;
        var liEl = $('<li></li>');
        var spanEl = $('<span></span>');
        spanEl.html(multipleCheckbox);
        liEl.addClass(disabledClass + " " + optgroupClass);
        liEl.append(spanEl);

        // add icons
        var iconUrl = option.getAttribute('data-icon');
        if (!!iconUrl) {
          var imgEl = $("<img alt=\"\" src=\"" + iconUrl + "\">");
          liEl.prepend(imgEl);
        }

        // Check for multiple type.
        $(this.dropdownOptions).append(liEl[0]);
        return liEl[0];
      }

      /**
       * Toggle entry from option
       * @param {String} key  Option key
       * @return {Boolean}  if entry was added or removed
       */

    }, {
      key: "_toggleEntryFromArray",
      value: function _toggleEntryFromArray(key) {
        var notAdded = !this._keysSelected.hasOwnProperty(key);
        var $optionLi = $(this._valueDict[key].optionEl);

        if (notAdded) {
          this._keysSelected[key] = true;
        } else {
          delete this._keysSelected[key];
        }

        $optionLi.toggleClass('selected', notAdded);

        // Set checkbox checked value
        $optionLi.find('input[type="checkbox"]').prop('checked', notAdded);

        // use notAdded instead of true (to detect if the option is selected or not)
        $optionLi.prop('selected', notAdded);

        return notAdded;
      }

      /**
       * Set text value to input
       */

    }, {
      key: "_setValueToInput",
      value: function _setValueToInput() {
        var values = [];
        var options = this.$el.find('option');

        options.each(function (el) {
          if ($(el).prop('selected')) {
            var text = $(el).text();
            values.push(text);
          }
        });

        if (!values.length) {
          var firstDisabled = this.$el.find('option:disabled').eq(0);
          if (firstDisabled.length && firstDisabled[0].value === '') {
            values.push(firstDisabled.text());
          }
        }

        this.input.value = values.join(', ');
      }

      /**
       * Set selected state of dropdown to match actual select element
       */

    }, {
      key: "_setSelectedStates",
      value: function _setSelectedStates() {
        this._keysSelected = {};

        for (var key in this._valueDict) {
          var option = this._valueDict[key];
          var optionIsSelected = $(option.el).prop('selected');
          $(option.optionEl).find('input[type="checkbox"]').prop('checked', optionIsSelected);
          if (optionIsSelected) {
            this._activateOption($(this.dropdownOptions), $(option.optionEl));
            this._keysSelected[key] = true;
          } else {
            $(option.optionEl).removeClass('selected');
          }
        }
      }

      /**
       * Make option as selected and scroll to selected position
       * @param {jQuery} collection  Select options jQuery element
       * @param {Element} newOption  element of the new option
       */

    }, {
      key: "_activateOption",
      value: function _activateOption(collection, newOption) {
        if (newOption) {
          if (!this.isMultiple) {
            collection.find('li.selected').removeClass('selected');
          }
          var option = $(newOption);
          option.addClass('selected');
        }
      }

      /**
       * Get Selected Values
       * @return {Array}  Array of selected values
       */

    }, {
      key: "getSelectedValues",
      value: function getSelectedValues() {
        var selectedValues = [];
        for (var key in this._keysSelected) {
          selectedValues.push(this._valueDict[key].el.value);
        }
        return selectedValues;
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(FormSelect.__proto__ || Object.getPrototypeOf(FormSelect), "init", this).call(this, this, els, options);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_FormSelect;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return FormSelect;
  }(Component);

  M.FormSelect = FormSelect;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(FormSelect, 'formSelect', 'M_FormSelect');
  }
})(cash);
;(function ($, anim) {
  'use strict';

  var _defaults = {};

  /**
   * @class
   *
   */

  var Range = function (_Component21) {
    _inherits(Range, _Component21);

    /**
     * Construct Range instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Range(el, options) {
      _classCallCheck(this, Range);

      var _this72 = _possibleConstructorReturn(this, (Range.__proto__ || Object.getPrototypeOf(Range)).call(this, Range, el, options));

      _this72.el.M_Range = _this72;

      /**
       * Options for the range
       * @member Range#options
       */
      _this72.options = $.extend({}, Range.defaults, options);

      _this72._mousedown = false;

      // Setup
      _this72._setupThumb();

      _this72._setupEventHandlers();
      return _this72;
    }

    _createClass(Range, [{
      key: "destroy",


      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();
        this._removeThumb();
        this.el.M_Range = undefined;
      }

      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleRangeChangeBound = this._handleRangeChange.bind(this);
        this._handleRangeMousedownTouchstartBound = this._handleRangeMousedownTouchstart.bind(this);
        this._handleRangeInputMousemoveTouchmoveBound = this._handleRangeInputMousemoveTouchmove.bind(this);
        this._handleRangeMouseupTouchendBound = this._handleRangeMouseupTouchend.bind(this);
        this._handleRangeBlurMouseoutTouchleaveBound = this._handleRangeBlurMouseoutTouchleave.bind(this);

        this.el.addEventListener('change', this._handleRangeChangeBound);

        this.el.addEventListener('mousedown', this._handleRangeMousedownTouchstartBound);
        this.el.addEventListener('touchstart', this._handleRangeMousedownTouchstartBound);

        this.el.addEventListener('input', this._handleRangeInputMousemoveTouchmoveBound);
        this.el.addEventListener('mousemove', this._handleRangeInputMousemoveTouchmoveBound);
        this.el.addEventListener('touchmove', this._handleRangeInputMousemoveTouchmoveBound);

        this.el.addEventListener('mouseup', this._handleRangeMouseupTouchendBound);
        this.el.addEventListener('touchend', this._handleRangeMouseupTouchendBound);

        this.el.addEventListener('blur', this._handleRangeBlurMouseoutTouchleaveBound);
        this.el.addEventListener('mouseout', this._handleRangeBlurMouseoutTouchleaveBound);
        this.el.addEventListener('touchleave', this._handleRangeBlurMouseoutTouchleaveBound);
      }

      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener('change', this._handleRangeChangeBound);

        this.el.removeEventListener('mousedown', this._handleRangeMousedownTouchstartBound);
        this.el.removeEventListener('touchstart', this._handleRangeMousedownTouchstartBound);

        this.el.removeEventListener('input', this._handleRangeInputMousemoveTouchmoveBound);
        this.el.removeEventListener('mousemove', this._handleRangeInputMousemoveTouchmoveBound);
        this.el.removeEventListener('touchmove', this._handleRangeInputMousemoveTouchmoveBound);

        this.el.removeEventListener('mouseup', this._handleRangeMouseupTouchendBound);
        this.el.removeEventListener('touchend', this._handleRangeMouseupTouchendBound);

        this.el.removeEventListener('blur', this._handleRangeBlurMouseoutTouchleaveBound);
        this.el.removeEventListener('mouseout', this._handleRangeBlurMouseoutTouchleaveBound);
        this.el.removeEventListener('touchleave', this._handleRangeBlurMouseoutTouchleaveBound);
      }

      /**
       * Handle Range Change
       * @param {Event} e
       */

    }, {
      key: "_handleRangeChange",
      value: function _handleRangeChange() {
        $(this.value).html(this.$el.val());

        if (!$(this.thumb).hasClass('active')) {
          this._showRangeBubble();
        }

        var offsetLeft = this._calcRangeOffset();
        $(this.thumb).addClass('active').css('left', offsetLeft + 'px');
      }

      /**
       * Handle Range Mousedown and Touchstart
       * @param {Event} e
       */

    }, {
      key: "_handleRangeMousedownTouchstart",
      value: function _handleRangeMousedownTouchstart(e) {
        // Set indicator value
        $(this.value).html(this.$el.val());

        this._mousedown = true;
        this.$el.addClass('active');

        if (!$(this.thumb).hasClass('active')) {
          this._showRangeBubble();
        }

        if (e.type !== 'input') {
          var offsetLeft = this._calcRangeOffset();
          $(this.thumb).addClass('active').css('left', offsetLeft + 'px');
        }
      }

      /**
       * Handle Range Input, Mousemove and Touchmove
       */

    }, {
      key: "_handleRangeInputMousemoveTouchmove",
      value: function _handleRangeInputMousemoveTouchmove() {
        if (this._mousedown) {
          if (!$(this.thumb).hasClass('active')) {
            this._showRangeBubble();
          }

          var offsetLeft = this._calcRangeOffset();
          $(this.thumb).addClass('active').css('left', offsetLeft + 'px');
          $(this.value).html(this.$el.val());
        }
      }

      /**
       * Handle Range Mouseup and Touchend
       */

    }, {
      key: "_handleRangeMouseupTouchend",
      value: function _handleRangeMouseupTouchend() {
        this._mousedown = false;
        this.$el.removeClass('active');
      }

      /**
       * Handle Range Blur, Mouseout and Touchleave
       */

    }, {
      key: "_handleRangeBlurMouseoutTouchleave",
      value: function _handleRangeBlurMouseoutTouchleave() {
        if (!this._mousedown) {
          var paddingLeft = parseInt(this.$el.css('padding-left'));
          var marginLeft = 7 + paddingLeft + 'px';

          if ($(this.thumb).hasClass('active')) {
            anim.remove(this.thumb);
            anim({
              targets: this.thumb,
              height: 0,
              width: 0,
              top: 10,
              easing: 'easeOutQuad',
              marginLeft: marginLeft,
              duration: 100
            });
          }
          $(this.thumb).removeClass('active');
        }
      }

      /**
       * Setup dropdown
       */

    }, {
      key: "_setupThumb",
      value: function _setupThumb() {
        this.thumb = document.createElement('span');
        this.value = document.createElement('span');
        $(this.thumb).addClass('thumb');
        $(this.value).addClass('value');
        $(this.thumb).append(this.value);
        this.$el.after(this.thumb);
      }

      /**
       * Remove dropdown
       */

    }, {
      key: "_removeThumb",
      value: function _removeThumb() {
        $(this.thumb).remove();
      }

      /**
       * morph thumb into bubble
       */

    }, {
      key: "_showRangeBubble",
      value: function _showRangeBubble() {
        var paddingLeft = parseInt($(this.thumb).parent().css('padding-left'));
        var marginLeft = -7 + paddingLeft + 'px'; // TODO: fix magic number?
        anim.remove(this.thumb);
        anim({
          targets: this.thumb,
          height: 30,
          width: 30,
          top: -30,
          marginLeft: marginLeft,
          duration: 300,
          easing: 'easeOutQuint'
        });
      }

      /**
       * Calculate the offset of the thumb
       * @return {Number}  offset in pixels
       */

    }, {
      key: "_calcRangeOffset",
      value: function _calcRangeOffset() {
        var width = this.$el.width() - 15;
        var max = parseFloat(this.$el.attr('max')) || 100; // Range default max
        var min = parseFloat(this.$el.attr('min')) || 0; // Range default min
        var percent = (parseFloat(this.$el.val()) - min) / (max - min);
        return percent * width;
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Range.__proto__ || Object.getPrototypeOf(Range), "init", this).call(this, this, els, options);
      }

      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Range;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);

    return Range;
  }(Component);

  M.Range = Range;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Range, 'range', 'M_Range');
  }

  Range.init($('input[type=range]'));
})(cash, M.anime);

},{}],"Focm":[function(require,module,exports) {
"use strict";

var _vue = _interopRequireDefault(require("vue"));
var _App = _interopRequireDefault(require("./components/App.vue"));
var _materialize = _interopRequireDefault(require("materialize-css/dist/js/materialize.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
new _vue.default(_App.default).$mount("#app");
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/app/sw.js");
}
},{"vue":"QPfz","./components/App.vue":"TC2m","materialize-css/dist/js/materialize.js":"Kmah","./sw.js":[["sw.js","NqYy"],"sw.js.map","NqYy"]}]},{},["Focm"], null)
//# sourceMappingURL=/app/src.39d8472b.js.map