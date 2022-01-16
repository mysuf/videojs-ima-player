(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('video.js'), require('videojs-contrib-ads')) :
	typeof define === 'function' && define.amd ? define(['video.js', 'videojs-contrib-ads'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.videojs));
})(this, (function (videojs) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var videojs__default = /*#__PURE__*/_interopDefaultLegacy(videojs);

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global$y =
	  // eslint-disable-next-line es/no-global-this -- safe
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  // eslint-disable-next-line no-restricted-globals -- safe
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func -- fallback
	  (function () { return this; })() || Function('return this')();

	var fails$i = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var fails$h = fails$i;

	var functionBindNative = !fails$h(function () {
	  var test = (function () { /* empty */ }).bind();
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return typeof test != 'function' || test.hasOwnProperty('prototype');
	});

	var NATIVE_BIND$4 = functionBindNative;

	var FunctionPrototype$3 = Function.prototype;
	var apply$4 = FunctionPrototype$3.apply;
	var call$9 = FunctionPrototype$3.call;

	// eslint-disable-next-line es/no-reflect -- safe
	var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND$4 ? call$9.bind(apply$4) : function () {
	  return call$9.apply(apply$4, arguments);
	});

	var NATIVE_BIND$3 = functionBindNative;

	var FunctionPrototype$2 = Function.prototype;
	var bind$9 = FunctionPrototype$2.bind;
	var call$8 = FunctionPrototype$2.call;
	var uncurryThis$j = NATIVE_BIND$3 && bind$9.bind(call$8, call$8);

	var functionUncurryThis = NATIVE_BIND$3 ? function (fn) {
	  return fn && uncurryThis$j(fn);
	} : function (fn) {
	  return fn && function () {
	    return call$8.apply(fn, arguments);
	  };
	};

	// `IsCallable` abstract operation
	// https://tc39.es/ecma262/#sec-iscallable
	var isCallable$g = function (argument) {
	  return typeof argument == 'function';
	};

	var objectGetOwnPropertyDescriptor = {};

	var fails$g = fails$i;

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails$g(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var NATIVE_BIND$2 = functionBindNative;

	var call$7 = Function.prototype.call;

	var functionCall = NATIVE_BIND$2 ? call$7.bind(call$7) : function () {
	  return call$7.apply(call$7, arguments);
	};

	var objectPropertyIsEnumerable = {};

	var $propertyIsEnumerable$1 = {}.propertyIsEnumerable;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$7 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor$7 && !$propertyIsEnumerable$1.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$7(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable$1;

	var createPropertyDescriptor$5 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var uncurryThis$i = functionUncurryThis;

	var toString$6 = uncurryThis$i({}.toString);
	var stringSlice$1 = uncurryThis$i(''.slice);

	var classofRaw$1 = function (it) {
	  return stringSlice$1(toString$6(it), 8, -1);
	};

	var global$x = global$y;
	var uncurryThis$h = functionUncurryThis;
	var fails$f = fails$i;
	var classof$9 = classofRaw$1;

	var Object$8 = global$x.Object;
	var split = uncurryThis$h(''.split);

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails$f(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !Object$8('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof$9(it) == 'String' ? split(it, '') : Object$8(it);
	} : Object$8;

	var global$w = global$y;

	var TypeError$c = global$w.TypeError;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible$4 = function (it) {
	  if (it == undefined) throw TypeError$c("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings
	var IndexedObject$2 = indexedObject;
	var requireObjectCoercible$3 = requireObjectCoercible$4;

	var toIndexedObject$8 = function (it) {
	  return IndexedObject$2(requireObjectCoercible$3(it));
	};

	var isCallable$f = isCallable$g;

	var isObject$c = function (it) {
	  return typeof it == 'object' ? it !== null : isCallable$f(it);
	};

	var path$e = {};

	var path$d = path$e;
	var global$v = global$y;
	var isCallable$e = isCallable$g;

	var aFunction = function (variable) {
	  return isCallable$e(variable) ? variable : undefined;
	};

	var getBuiltIn$6 = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(path$d[namespace]) || aFunction(global$v[namespace])
	    : path$d[namespace] && path$d[namespace][method] || global$v[namespace] && global$v[namespace][method];
	};

	var uncurryThis$g = functionUncurryThis;

	var objectIsPrototypeOf = uncurryThis$g({}.isPrototypeOf);

	var getBuiltIn$5 = getBuiltIn$6;

	var engineUserAgent = getBuiltIn$5('navigator', 'userAgent') || '';

	var global$u = global$y;
	var userAgent$1 = engineUserAgent;

	var process = global$u.process;
	var Deno = global$u.Deno;
	var versions = process && process.versions || Deno && Deno.version;
	var v8 = versions && versions.v8;
	var match, version$1;

	if (v8) {
	  match = v8.split('.');
	  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
	  // but their correct versions are not interesting for us
	  version$1 = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
	}

	// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
	// so check `userAgent` even if `.v8` exists, but 0
	if (!version$1 && userAgent$1) {
	  match = userAgent$1.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = userAgent$1.match(/Chrome\/(\d+)/);
	    if (match) version$1 = +match[1];
	  }
	}

	var engineV8Version = version$1;

	/* eslint-disable es/no-symbol -- required for testing */

	var V8_VERSION$2 = engineV8Version;
	var fails$e = fails$i;

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$e(function () {
	  var symbol = Symbol();
	  // Chrome 38 Symbol has incorrect toString conversion
	  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
	  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    !Symbol.sham && V8_VERSION$2 && V8_VERSION$2 < 41;
	});

	/* eslint-disable es/no-symbol -- required for testing */

	var NATIVE_SYMBOL$2 = nativeSymbol;

	var useSymbolAsUid = NATIVE_SYMBOL$2
	  && !Symbol.sham
	  && typeof Symbol.iterator == 'symbol';

	var global$t = global$y;
	var getBuiltIn$4 = getBuiltIn$6;
	var isCallable$d = isCallable$g;
	var isPrototypeOf$5 = objectIsPrototypeOf;
	var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

	var Object$7 = global$t.Object;

	var isSymbol$3 = USE_SYMBOL_AS_UID$1 ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  var $Symbol = getBuiltIn$4('Symbol');
	  return isCallable$d($Symbol) && isPrototypeOf$5($Symbol.prototype, Object$7(it));
	};

	var global$s = global$y;

	var String$4 = global$s.String;

	var tryToString$2 = function (argument) {
	  try {
	    return String$4(argument);
	  } catch (error) {
	    return 'Object';
	  }
	};

	var global$r = global$y;
	var isCallable$c = isCallable$g;
	var tryToString$1 = tryToString$2;

	var TypeError$b = global$r.TypeError;

	// `Assert: IsCallable(argument) is true`
	var aCallable$3 = function (argument) {
	  if (isCallable$c(argument)) return argument;
	  throw TypeError$b(tryToString$1(argument) + ' is not a function');
	};

	var aCallable$2 = aCallable$3;

	// `GetMethod` abstract operation
	// https://tc39.es/ecma262/#sec-getmethod
	var getMethod$1 = function (V, P) {
	  var func = V[P];
	  return func == null ? undefined : aCallable$2(func);
	};

	var global$q = global$y;
	var call$6 = functionCall;
	var isCallable$b = isCallable$g;
	var isObject$b = isObject$c;

	var TypeError$a = global$q.TypeError;

	// `OrdinaryToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-ordinarytoprimitive
	var ordinaryToPrimitive$1 = function (input, pref) {
	  var fn, val;
	  if (pref === 'string' && isCallable$b(fn = input.toString) && !isObject$b(val = call$6(fn, input))) return val;
	  if (isCallable$b(fn = input.valueOf) && !isObject$b(val = call$6(fn, input))) return val;
	  if (pref !== 'string' && isCallable$b(fn = input.toString) && !isObject$b(val = call$6(fn, input))) return val;
	  throw TypeError$a("Can't convert object to primitive value");
	};

	var shared$4 = {exports: {}};

	var global$p = global$y;

	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty$a = Object.defineProperty;

	var setGlobal$1 = function (key, value) {
	  try {
	    defineProperty$a(global$p, key, { value: value, configurable: true, writable: true });
	  } catch (error) {
	    global$p[key] = value;
	  } return value;
	};

	var global$o = global$y;
	var setGlobal = setGlobal$1;

	var SHARED = '__core-js_shared__';
	var store$3 = global$o[SHARED] || setGlobal(SHARED, {});

	var sharedStore = store$3;

	var store$2 = sharedStore;

	(shared$4.exports = function (key, value) {
	  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.20.3',
	  mode: 'pure' ,
	  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
	  license: 'https://github.com/zloirock/core-js/blob/v3.20.3/LICENSE',
	  source: 'https://github.com/zloirock/core-js'
	});

	var global$n = global$y;
	var requireObjectCoercible$2 = requireObjectCoercible$4;

	var Object$6 = global$n.Object;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject$7 = function (argument) {
	  return Object$6(requireObjectCoercible$2(argument));
	};

	var uncurryThis$f = functionUncurryThis;
	var toObject$6 = toObject$7;

	var hasOwnProperty = uncurryThis$f({}.hasOwnProperty);

	// `HasOwnProperty` abstract operation
	// https://tc39.es/ecma262/#sec-hasownproperty
	var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
	  return hasOwnProperty(toObject$6(it), key);
	};

	var uncurryThis$e = functionUncurryThis;

	var id = 0;
	var postfix = Math.random();
	var toString$5 = uncurryThis$e(1.0.toString);

	var uid$3 = function (key) {
	  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$5(++id + postfix, 36);
	};

	var global$m = global$y;
	var shared$3 = shared$4.exports;
	var hasOwn$c = hasOwnProperty_1;
	var uid$2 = uid$3;
	var NATIVE_SYMBOL$1 = nativeSymbol;
	var USE_SYMBOL_AS_UID = useSymbolAsUid;

	var WellKnownSymbolsStore$1 = shared$3('wks');
	var Symbol$1 = global$m.Symbol;
	var symbolFor = Symbol$1 && Symbol$1['for'];
	var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$2;

	var wellKnownSymbol$e = function (name) {
	  if (!hasOwn$c(WellKnownSymbolsStore$1, name) || !(NATIVE_SYMBOL$1 || typeof WellKnownSymbolsStore$1[name] == 'string')) {
	    var description = 'Symbol.' + name;
	    if (NATIVE_SYMBOL$1 && hasOwn$c(Symbol$1, name)) {
	      WellKnownSymbolsStore$1[name] = Symbol$1[name];
	    } else if (USE_SYMBOL_AS_UID && symbolFor) {
	      WellKnownSymbolsStore$1[name] = symbolFor(description);
	    } else {
	      WellKnownSymbolsStore$1[name] = createWellKnownSymbol(description);
	    }
	  } return WellKnownSymbolsStore$1[name];
	};

	var global$l = global$y;
	var call$5 = functionCall;
	var isObject$a = isObject$c;
	var isSymbol$2 = isSymbol$3;
	var getMethod = getMethod$1;
	var ordinaryToPrimitive = ordinaryToPrimitive$1;
	var wellKnownSymbol$d = wellKnownSymbol$e;

	var TypeError$9 = global$l.TypeError;
	var TO_PRIMITIVE$1 = wellKnownSymbol$d('toPrimitive');

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	var toPrimitive$1 = function (input, pref) {
	  if (!isObject$a(input) || isSymbol$2(input)) return input;
	  var exoticToPrim = getMethod(input, TO_PRIMITIVE$1);
	  var result;
	  if (exoticToPrim) {
	    if (pref === undefined) pref = 'default';
	    result = call$5(exoticToPrim, input, pref);
	    if (!isObject$a(result) || isSymbol$2(result)) return result;
	    throw TypeError$9("Can't convert object to primitive value");
	  }
	  if (pref === undefined) pref = 'number';
	  return ordinaryToPrimitive(input, pref);
	};

	var toPrimitive = toPrimitive$1;
	var isSymbol$1 = isSymbol$3;

	// `ToPropertyKey` abstract operation
	// https://tc39.es/ecma262/#sec-topropertykey
	var toPropertyKey$4 = function (argument) {
	  var key = toPrimitive(argument, 'string');
	  return isSymbol$1(key) ? key : key + '';
	};

	var global$k = global$y;
	var isObject$9 = isObject$c;

	var document$1 = global$k.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS$1 = isObject$9(document$1) && isObject$9(document$1.createElement);

	var documentCreateElement$1 = function (it) {
	  return EXISTS$1 ? document$1.createElement(it) : {};
	};

	var DESCRIPTORS$b = descriptors;
	var fails$d = fails$i;
	var createElement = documentCreateElement$1;

	// Thanks to IE8 for its funny defineProperty
	var ie8DomDefine = !DESCRIPTORS$b && !fails$d(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(createElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var DESCRIPTORS$a = descriptors;
	var call$4 = functionCall;
	var propertyIsEnumerableModule$2 = objectPropertyIsEnumerable;
	var createPropertyDescriptor$4 = createPropertyDescriptor$5;
	var toIndexedObject$7 = toIndexedObject$8;
	var toPropertyKey$3 = toPropertyKey$4;
	var hasOwn$b = hasOwnProperty_1;
	var IE8_DOM_DEFINE$1 = ie8DomDefine;

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	objectGetOwnPropertyDescriptor.f = DESCRIPTORS$a ? $getOwnPropertyDescriptor$2 : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$7(O);
	  P = toPropertyKey$3(P);
	  if (IE8_DOM_DEFINE$1) try {
	    return $getOwnPropertyDescriptor$2(O, P);
	  } catch (error) { /* empty */ }
	  if (hasOwn$b(O, P)) return createPropertyDescriptor$4(!call$4(propertyIsEnumerableModule$2.f, O, P), O[P]);
	};

	var fails$c = fails$i;
	var isCallable$a = isCallable$g;

	var replacement = /#|\.prototype\./;

	var isForced$1 = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : isCallable$a(detection) ? fails$c(detection)
	    : !!detection;
	};

	var normalize = isForced$1.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced$1.data = {};
	var NATIVE = isForced$1.NATIVE = 'N';
	var POLYFILL = isForced$1.POLYFILL = 'P';

	var isForced_1 = isForced$1;

	var uncurryThis$d = functionUncurryThis;
	var aCallable$1 = aCallable$3;
	var NATIVE_BIND$1 = functionBindNative;

	var bind$8 = uncurryThis$d(uncurryThis$d.bind);

	// optional / simple context binding
	var functionBindContext = function (fn, that) {
	  aCallable$1(fn);
	  return that === undefined ? fn : NATIVE_BIND$1 ? bind$8(fn, that) : function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var objectDefineProperty = {};

	var DESCRIPTORS$9 = descriptors;
	var fails$b = fails$i;

	// V8 ~ Chrome 36-
	// https://bugs.chromium.org/p/v8/issues/detail?id=3334
	var v8PrototypeDefineBug = DESCRIPTORS$9 && fails$b(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
	    value: 42,
	    writable: false
	  }).prototype != 42;
	});

	var global$j = global$y;
	var isObject$8 = isObject$c;

	var String$3 = global$j.String;
	var TypeError$8 = global$j.TypeError;

	// `Assert: Type(argument) is Object`
	var anObject$7 = function (argument) {
	  if (isObject$8(argument)) return argument;
	  throw TypeError$8(String$3(argument) + ' is not an object');
	};

	var global$i = global$y;
	var DESCRIPTORS$8 = descriptors;
	var IE8_DOM_DEFINE = ie8DomDefine;
	var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
	var anObject$6 = anObject$7;
	var toPropertyKey$2 = toPropertyKey$4;

	var TypeError$7 = global$i.TypeError;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var $defineProperty$1 = Object.defineProperty;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
	var ENUMERABLE = 'enumerable';
	var CONFIGURABLE$1 = 'configurable';
	var WRITABLE = 'writable';

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	objectDefineProperty.f = DESCRIPTORS$8 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
	  anObject$6(O);
	  P = toPropertyKey$2(P);
	  anObject$6(Attributes);
	  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
	    var current = $getOwnPropertyDescriptor$1(O, P);
	    if (current && current[WRITABLE]) {
	      O[P] = Attributes.value;
	      Attributes = {
	        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
	        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
	        writable: false
	      };
	    }
	  } return $defineProperty$1(O, P, Attributes);
	} : $defineProperty$1 : function defineProperty(O, P, Attributes) {
	  anObject$6(O);
	  P = toPropertyKey$2(P);
	  anObject$6(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return $defineProperty$1(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError$7('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var DESCRIPTORS$7 = descriptors;
	var definePropertyModule$3 = objectDefineProperty;
	var createPropertyDescriptor$3 = createPropertyDescriptor$5;

	var createNonEnumerableProperty$5 = DESCRIPTORS$7 ? function (object, key, value) {
	  return definePropertyModule$3.f(object, key, createPropertyDescriptor$3(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var global$h = global$y;
	var apply$3 = functionApply;
	var uncurryThis$c = functionUncurryThis;
	var isCallable$9 = isCallable$g;
	var getOwnPropertyDescriptor$6 = objectGetOwnPropertyDescriptor.f;
	var isForced = isForced_1;
	var path$c = path$e;
	var bind$7 = functionBindContext;
	var createNonEnumerableProperty$4 = createNonEnumerableProperty$5;
	var hasOwn$a = hasOwnProperty_1;

	var wrapConstructor = function (NativeConstructor) {
	  var Wrapper = function (a, b, c) {
	    if (this instanceof Wrapper) {
	      switch (arguments.length) {
	        case 0: return new NativeConstructor();
	        case 1: return new NativeConstructor(a);
	        case 2: return new NativeConstructor(a, b);
	      } return new NativeConstructor(a, b, c);
	    } return apply$3(NativeConstructor, this, arguments);
	  };
	  Wrapper.prototype = NativeConstructor.prototype;
	  return Wrapper;
	};

	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	  options.name        - the .name of the function if it does not match the key
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var PROTO = options.proto;

	  var nativeSource = GLOBAL ? global$h : STATIC ? global$h[TARGET] : (global$h[TARGET] || {}).prototype;

	  var target = GLOBAL ? path$c : path$c[TARGET] || createNonEnumerableProperty$4(path$c, TARGET, {})[TARGET];
	  var targetPrototype = target.prototype;

	  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
	  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

	  for (key in source) {
	    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contains in native
	    USE_NATIVE = !FORCED && nativeSource && hasOwn$a(nativeSource, key);

	    targetProperty = target[key];

	    if (USE_NATIVE) if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$6(nativeSource, key);
	      nativeProperty = descriptor && descriptor.value;
	    } else nativeProperty = nativeSource[key];

	    // export native or implementation
	    sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];

	    if (USE_NATIVE && typeof targetProperty == typeof sourceProperty) continue;

	    // bind timers to global for call from export context
	    if (options.bind && USE_NATIVE) resultProperty = bind$7(sourceProperty, global$h);
	    // wrap global constructors for prevent changs in this version
	    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);
	    // make static versions for prototype methods
	    else if (PROTO && isCallable$9(sourceProperty)) resultProperty = uncurryThis$c(sourceProperty);
	    // default case
	    else resultProperty = sourceProperty;

	    // add a flag to not completely full polyfills
	    if (options.sham || (sourceProperty && sourceProperty.sham) || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty$4(resultProperty, 'sham', true);
	    }

	    createNonEnumerableProperty$4(target, key, resultProperty);

	    if (PROTO) {
	      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
	      if (!hasOwn$a(path$c, VIRTUAL_PROTOTYPE)) {
	        createNonEnumerableProperty$4(path$c, VIRTUAL_PROTOTYPE, {});
	      }
	      // export virtual prototype methods
	      createNonEnumerableProperty$4(path$c[VIRTUAL_PROTOTYPE], key, sourceProperty);
	      // export real prototype methods
	      if (options.real && targetPrototype && !targetPrototype[key]) {
	        createNonEnumerableProperty$4(targetPrototype, key, sourceProperty);
	      }
	    }
	  }
	};

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `ToIntegerOrInfinity` abstract operation
	// https://tc39.es/ecma262/#sec-tointegerorinfinity
	var toIntegerOrInfinity$3 = function (argument) {
	  var number = +argument;
	  // eslint-disable-next-line no-self-compare -- safe
	  return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
	};

	var toIntegerOrInfinity$2 = toIntegerOrInfinity$3;

	var max$1 = Math.max;
	var min$1 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex$2 = function (index, length) {
	  var integer = toIntegerOrInfinity$2(index);
	  return integer < 0 ? max$1(integer + length, 0) : min$1(integer, length);
	};

	var toIntegerOrInfinity$1 = toIntegerOrInfinity$3;

	var min = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength$1 = function (argument) {
	  return argument > 0 ? min(toIntegerOrInfinity$1(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var toLength = toLength$1;

	// `LengthOfArrayLike` abstract operation
	// https://tc39.es/ecma262/#sec-lengthofarraylike
	var lengthOfArrayLike$4 = function (obj) {
	  return toLength(obj.length);
	};

	var toIndexedObject$6 = toIndexedObject$8;
	var toAbsoluteIndex$1 = toAbsoluteIndex$2;
	var lengthOfArrayLike$3 = lengthOfArrayLike$4;

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$2 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$6($this);
	    var length = lengthOfArrayLike$3(O);
	    var index = toAbsoluteIndex$1(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare -- NaN check
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.es/ecma262/#sec-array.prototype.includes
	  includes: createMethod$2(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod$2(false)
	};

	var hiddenKeys$5 = {};

	var uncurryThis$b = functionUncurryThis;
	var hasOwn$9 = hasOwnProperty_1;
	var toIndexedObject$5 = toIndexedObject$8;
	var indexOf = arrayIncludes.indexOf;
	var hiddenKeys$4 = hiddenKeys$5;

	var push$3 = uncurryThis$b([].push);

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject$5(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !hasOwn$9(hiddenKeys$4, key) && hasOwn$9(O, key) && push$3(result, key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (hasOwn$9(O, key = names[i++])) {
	    ~indexOf(result, key) || push$3(result, key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys$3 = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var internalObjectKeys$1 = objectKeysInternal;
	var enumBugKeys$2 = enumBugKeys$3;

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	// eslint-disable-next-line es/no-object-keys -- safe
	var objectKeys$3 = Object.keys || function keys(O) {
	  return internalObjectKeys$1(O, enumBugKeys$2);
	};

	var objectGetOwnPropertySymbols = {};

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
	objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

	var DESCRIPTORS$6 = descriptors;
	var uncurryThis$a = functionUncurryThis;
	var call$3 = functionCall;
	var fails$a = fails$i;
	var objectKeys$2 = objectKeys$3;
	var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
	var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
	var toObject$5 = toObject$7;
	var IndexedObject$1 = indexedObject;

	// eslint-disable-next-line es/no-object-assign -- safe
	var $assign = Object.assign;
	// eslint-disable-next-line es/no-object-defineproperty -- required for testing
	var defineProperty$9 = Object.defineProperty;
	var concat$5 = uncurryThis$a([].concat);

	// `Object.assign` method
	// https://tc39.es/ecma262/#sec-object.assign
	var objectAssign = !$assign || fails$a(function () {
	  // should have correct order of operations (Edge bug)
	  if (DESCRIPTORS$6 && $assign({ b: 1 }, $assign(defineProperty$9({}, 'a', {
	    enumerable: true,
	    get: function () {
	      defineProperty$9(this, 'b', {
	        value: 3,
	        enumerable: false
	      });
	    }
	  }), { b: 2 })).b !== 1) return true;
	  // should work with symbols and should have deterministic property order (V8 bug)
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line es/no-symbol -- safe
	  var symbol = Symbol();
	  var alphabet = 'abcdefghijklmnopqrst';
	  A[symbol] = 7;
	  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
	  return $assign({}, A)[symbol] != 7 || objectKeys$2($assign({}, B)).join('') != alphabet;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
	  var T = toObject$5(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
	  var propertyIsEnumerable = propertyIsEnumerableModule$1.f;
	  while (argumentsLength > index) {
	    var S = IndexedObject$1(arguments[index++]);
	    var keys = getOwnPropertySymbols ? concat$5(objectKeys$2(S), getOwnPropertySymbols(S)) : objectKeys$2(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!DESCRIPTORS$6 || call$3(propertyIsEnumerable, S, key)) T[key] = S[key];
	    }
	  } return T;
	} : $assign;

	var $$f = _export;
	var assign$3 = objectAssign;

	// `Object.assign` method
	// https://tc39.es/ecma262/#sec-object.assign
	// eslint-disable-next-line es/no-object-assign -- required for testing
	$$f({ target: 'Object', stat: true, forced: Object.assign !== assign$3 }, {
	  assign: assign$3
	});

	var path$b = path$e;

	var assign$2 = path$b.Object.assign;

	var parent$t = assign$2;

	var assign$1 = parent$t;

	var assign = assign$1;

	var uncurryThis$9 = functionUncurryThis;

	var arraySlice$4 = uncurryThis$9([].slice);

	var global$g = global$y;
	var uncurryThis$8 = functionUncurryThis;
	var aCallable = aCallable$3;
	var isObject$7 = isObject$c;
	var hasOwn$8 = hasOwnProperty_1;
	var arraySlice$3 = arraySlice$4;
	var NATIVE_BIND = functionBindNative;

	var Function$2 = global$g.Function;
	var concat$4 = uncurryThis$8([].concat);
	var join = uncurryThis$8([].join);
	var factories = {};

	var construct$4 = function (C, argsLength, args) {
	  if (!hasOwn$8(factories, argsLength)) {
	    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
	    factories[argsLength] = Function$2('C,a', 'return new C(' + join(list, ',') + ')');
	  } return factories[argsLength](C, args);
	};

	// `Function.prototype.bind` method implementation
	// https://tc39.es/ecma262/#sec-function.prototype.bind
	var functionBind = NATIVE_BIND ? Function$2.bind : function bind(that /* , ...args */) {
	  var F = aCallable(this);
	  var Prototype = F.prototype;
	  var partArgs = arraySlice$3(arguments, 1);
	  var boundFunction = function bound(/* args... */) {
	    var args = concat$4(partArgs, arraySlice$3(arguments));
	    return this instanceof boundFunction ? construct$4(F, args.length, args) : F.apply(that, args);
	  };
	  if (isObject$7(Prototype)) boundFunction.prototype = Prototype;
	  return boundFunction;
	};

	var wellKnownSymbol$c = wellKnownSymbol$e;

	var TO_STRING_TAG$3 = wellKnownSymbol$c('toStringTag');
	var test = {};

	test[TO_STRING_TAG$3] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var global$f = global$y;
	var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
	var isCallable$8 = isCallable$g;
	var classofRaw = classofRaw$1;
	var wellKnownSymbol$b = wellKnownSymbol$e;

	var TO_STRING_TAG$2 = wellKnownSymbol$b('toStringTag');
	var Object$5 = global$f.Object;

	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof$8 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = Object$5(it), TO_STRING_TAG$2)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && isCallable$8(O.callee) ? 'Arguments' : result;
	};

	var uncurryThis$7 = functionUncurryThis;
	var isCallable$7 = isCallable$g;
	var store$1 = sharedStore;

	var functionToString = uncurryThis$7(Function.toString);

	// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
	if (!isCallable$7(store$1.inspectSource)) {
	  store$1.inspectSource = function (it) {
	    return functionToString(it);
	  };
	}

	var inspectSource$2 = store$1.inspectSource;

	var uncurryThis$6 = functionUncurryThis;
	var fails$9 = fails$i;
	var isCallable$6 = isCallable$g;
	var classof$7 = classof$8;
	var getBuiltIn$3 = getBuiltIn$6;
	var inspectSource$1 = inspectSource$2;

	var noop = function () { /* empty */ };
	var empty = [];
	var construct$3 = getBuiltIn$3('Reflect', 'construct');
	var constructorRegExp = /^\s*(?:class|function)\b/;
	var exec = uncurryThis$6(constructorRegExp.exec);
	var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

	var isConstructorModern = function isConstructor(argument) {
	  if (!isCallable$6(argument)) return false;
	  try {
	    construct$3(noop, empty, argument);
	    return true;
	  } catch (error) {
	    return false;
	  }
	};

	var isConstructorLegacy = function isConstructor(argument) {
	  if (!isCallable$6(argument)) return false;
	  switch (classof$7(argument)) {
	    case 'AsyncFunction':
	    case 'GeneratorFunction':
	    case 'AsyncGeneratorFunction': return false;
	  }
	  try {
	    // we can't check .prototype since constructors produced by .bind haven't it
	    // `Function#toString` throws on some built-it function in some legacy engines
	    // (for example, `DOMQuad` and similar in FF41-)
	    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource$1(argument));
	  } catch (error) {
	    return true;
	  }
	};

	isConstructorLegacy.sham = true;

	// `IsConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-isconstructor
	var isConstructor$2 = !construct$3 || fails$9(function () {
	  var called;
	  return isConstructorModern(isConstructorModern.call)
	    || !isConstructorModern(Object)
	    || !isConstructorModern(function () { called = true; })
	    || called;
	}) ? isConstructorLegacy : isConstructorModern;

	var global$e = global$y;
	var isConstructor$1 = isConstructor$2;
	var tryToString = tryToString$2;

	var TypeError$6 = global$e.TypeError;

	// `Assert: IsConstructor(argument) is true`
	var aConstructor$1 = function (argument) {
	  if (isConstructor$1(argument)) return argument;
	  throw TypeError$6(tryToString(argument) + ' is not a constructor');
	};

	var objectDefineProperties = {};

	var DESCRIPTORS$5 = descriptors;
	var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
	var definePropertyModule$2 = objectDefineProperty;
	var anObject$5 = anObject$7;
	var toIndexedObject$4 = toIndexedObject$8;
	var objectKeys$1 = objectKeys$3;

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es/no-object-defineproperties -- safe
	objectDefineProperties.f = DESCRIPTORS$5 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject$5(O);
	  var props = toIndexedObject$4(Properties);
	  var keys = objectKeys$1(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) definePropertyModule$2.f(O, key = keys[index++], props[key]);
	  return O;
	};

	var getBuiltIn$2 = getBuiltIn$6;

	var html$1 = getBuiltIn$2('document', 'documentElement');

	var shared$2 = shared$4.exports;
	var uid$1 = uid$3;

	var keys = shared$2('keys');

	var sharedKey$4 = function (key) {
	  return keys[key] || (keys[key] = uid$1(key));
	};

	/* global ActiveXObject -- old IE, WSH */

	var anObject$4 = anObject$7;
	var definePropertiesModule$1 = objectDefineProperties;
	var enumBugKeys$1 = enumBugKeys$3;
	var hiddenKeys$3 = hiddenKeys$5;
	var html = html$1;
	var documentCreateElement = documentCreateElement$1;
	var sharedKey$3 = sharedKey$4;

	var GT = '>';
	var LT = '<';
	var PROTOTYPE$1 = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO$1 = sharedKey$3('IE_PROTO');

	var EmptyConstructor = function () { /* empty */ };

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    activeXDocument = new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = typeof document != 'undefined'
	    ? document.domain && activeXDocument
	      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
	      : NullProtoObjectViaIFrame()
	    : NullProtoObjectViaActiveX(activeXDocument); // WSH
	  var length = enumBugKeys$1.length;
	  while (length--) delete NullProtoObject[PROTOTYPE$1][enumBugKeys$1[length]];
	  return NullProtoObject();
	};

	hiddenKeys$3[IE_PROTO$1] = true;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE$1] = anObject$4(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : definePropertiesModule$1.f(result, Properties);
	};

	var $$e = _export;
	var getBuiltIn$1 = getBuiltIn$6;
	var apply$2 = functionApply;
	var bind$6 = functionBind;
	var aConstructor = aConstructor$1;
	var anObject$3 = anObject$7;
	var isObject$6 = isObject$c;
	var create$8 = objectCreate;
	var fails$8 = fails$i;

	var nativeConstruct = getBuiltIn$1('Reflect', 'construct');
	var ObjectPrototype$2 = Object.prototype;
	var push$2 = [].push;

	// `Reflect.construct` method
	// https://tc39.es/ecma262/#sec-reflect.construct
	// MS Edge supports only 2 arguments and argumentsList argument is optional
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	var NEW_TARGET_BUG = fails$8(function () {
	  function F() { /* empty */ }
	  return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);
	});

	var ARGS_BUG = !fails$8(function () {
	  nativeConstruct(function () { /* empty */ });
	});

	var FORCED$2 = NEW_TARGET_BUG || ARGS_BUG;

	$$e({ target: 'Reflect', stat: true, forced: FORCED$2, sham: FORCED$2 }, {
	  construct: function construct(Target, args /* , newTarget */) {
	    aConstructor(Target);
	    anObject$3(args);
	    var newTarget = arguments.length < 3 ? Target : aConstructor(arguments[2]);
	    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
	    if (Target == newTarget) {
	      // w/o altered newTarget, optimization for 0-4 arguments
	      switch (args.length) {
	        case 0: return new Target();
	        case 1: return new Target(args[0]);
	        case 2: return new Target(args[0], args[1]);
	        case 3: return new Target(args[0], args[1], args[2]);
	        case 4: return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      apply$2(push$2, $args, args);
	      return new (apply$2(bind$6, Target, $args))();
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto = newTarget.prototype;
	    var instance = create$8(isObject$6(proto) ? proto : ObjectPrototype$2);
	    var result = apply$2(Target, instance, args);
	    return isObject$6(result) ? result : instance;
	  }
	});

	var path$a = path$e;

	var construct$2 = path$a.Reflect.construct;

	var parent$s = construct$2;

	var construct$1 = parent$s;

	var construct = construct$1;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var defineProperty$8 = {exports: {}};

	var $$d = _export;
	var DESCRIPTORS$4 = descriptors;
	var defineProperty$7 = objectDefineProperty.f;

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	$$d({ target: 'Object', stat: true, forced: Object.defineProperty !== defineProperty$7, sham: !DESCRIPTORS$4 }, {
	  defineProperty: defineProperty$7
	});

	var path$9 = path$e;

	var Object$4 = path$9.Object;

	var defineProperty$6 = defineProperty$8.exports = function defineProperty(it, key, desc) {
	  return Object$4.defineProperty(it, key, desc);
	};

	if (Object$4.defineProperty.sham) defineProperty$6.sham = true;

	var parent$r = defineProperty$8.exports;

	var defineProperty$5 = parent$r;

	var parent$q = defineProperty$5;

	var defineProperty$4 = parent$q;

	var parent$p = defineProperty$4;

	var defineProperty$3 = parent$p;

	var defineProperty$2 = defineProperty$3;

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;

	    defineProperty$2(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);

	  defineProperty$2(Constructor, "prototype", {
	    writable: false
	  });

	  return Constructor;
	}

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	var hasOwn$7 = hasOwnProperty_1;

	var isDataDescriptor$1 = function (descriptor) {
	  return descriptor !== undefined && (hasOwn$7(descriptor, 'value') || hasOwn$7(descriptor, 'writable'));
	};

	var fails$7 = fails$i;

	var correctPrototypeGetter = !fails$7(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var global$d = global$y;
	var hasOwn$6 = hasOwnProperty_1;
	var isCallable$5 = isCallable$g;
	var toObject$4 = toObject$7;
	var sharedKey$2 = sharedKey$4;
	var CORRECT_PROTOTYPE_GETTER$1 = correctPrototypeGetter;

	var IE_PROTO = sharedKey$2('IE_PROTO');
	var Object$3 = global$d.Object;
	var ObjectPrototype$1 = Object$3.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.getprototypeof
	var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER$1 ? Object$3.getPrototypeOf : function (O) {
	  var object = toObject$4(O);
	  if (hasOwn$6(object, IE_PROTO)) return object[IE_PROTO];
	  var constructor = object.constructor;
	  if (isCallable$5(constructor) && object instanceof constructor) {
	    return constructor.prototype;
	  } return object instanceof Object$3 ? ObjectPrototype$1 : null;
	};

	var $$c = _export;
	var call$2 = functionCall;
	var isObject$5 = isObject$c;
	var anObject$2 = anObject$7;
	var isDataDescriptor = isDataDescriptor$1;
	var getOwnPropertyDescriptorModule$1 = objectGetOwnPropertyDescriptor;
	var getPrototypeOf$7 = objectGetPrototypeOf;

	// `Reflect.get` method
	// https://tc39.es/ecma262/#sec-reflect.get
	function get$6(target, propertyKey /* , receiver */) {
	  var receiver = arguments.length < 3 ? target : arguments[2];
	  var descriptor, prototype;
	  if (anObject$2(target) === receiver) return target[propertyKey];
	  descriptor = getOwnPropertyDescriptorModule$1.f(target, propertyKey);
	  if (descriptor) return isDataDescriptor(descriptor)
	    ? descriptor.value
	    : descriptor.get === undefined ? undefined : call$2(descriptor.get, receiver);
	  if (isObject$5(prototype = getPrototypeOf$7(target))) return get$6(prototype, propertyKey, receiver);
	}

	$$c({ target: 'Reflect', stat: true }, {
	  get: get$6
	});

	var path$8 = path$e;

	var get$5 = path$8.Reflect.get;

	var parent$o = get$5;

	var get$4 = parent$o;

	var parent$n = get$4;

	var get$3 = parent$n;

	var parent$m = get$3;

	var get$2 = parent$m;

	var get$1 = get$2;

	var getOwnPropertyDescriptor$5 = {exports: {}};

	var $$b = _export;
	var fails$6 = fails$i;
	var toIndexedObject$3 = toIndexedObject$8;
	var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var DESCRIPTORS$3 = descriptors;

	var FAILS_ON_PRIMITIVES$1 = fails$6(function () { nativeGetOwnPropertyDescriptor$1(1); });
	var FORCED$1 = !DESCRIPTORS$3 || FAILS_ON_PRIMITIVES$1;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	$$b({ target: 'Object', stat: true, forced: FORCED$1, sham: !DESCRIPTORS$3 }, {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
	    return nativeGetOwnPropertyDescriptor$1(toIndexedObject$3(it), key);
	  }
	});

	var path$7 = path$e;

	var Object$2 = path$7.Object;

	var getOwnPropertyDescriptor$4 = getOwnPropertyDescriptor$5.exports = function getOwnPropertyDescriptor(it, key) {
	  return Object$2.getOwnPropertyDescriptor(it, key);
	};

	if (Object$2.getOwnPropertyDescriptor.sham) getOwnPropertyDescriptor$4.sham = true;

	var parent$l = getOwnPropertyDescriptor$5.exports;

	var getOwnPropertyDescriptor$3 = parent$l;

	var parent$k = getOwnPropertyDescriptor$3;

	var getOwnPropertyDescriptor$2 = parent$k;

	var parent$j = getOwnPropertyDescriptor$2;

	var getOwnPropertyDescriptor$1 = parent$j;

	var getOwnPropertyDescriptor = getOwnPropertyDescriptor$1;

	var global$c = global$y;
	var isCallable$4 = isCallable$g;

	var String$2 = global$c.String;
	var TypeError$5 = global$c.TypeError;

	var aPossiblePrototype$1 = function (argument) {
	  if (typeof argument == 'object' || isCallable$4(argument)) return argument;
	  throw TypeError$5("Can't set " + String$2(argument) + ' as a prototype');
	};

	/* eslint-disable no-proto -- safe */

	var uncurryThis$5 = functionUncurryThis;
	var anObject$1 = anObject$7;
	var aPossiblePrototype = aPossiblePrototype$1;

	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	// eslint-disable-next-line es/no-object-setprototypeof -- safe
	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	    setter = uncurryThis$5(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
	    setter(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    anObject$1(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var $$a = _export;
	var setPrototypeOf$5 = objectSetPrototypeOf;

	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	$$a({ target: 'Object', stat: true }, {
	  setPrototypeOf: setPrototypeOf$5
	});

	var path$6 = path$e;

	var setPrototypeOf$4 = path$6.Object.setPrototypeOf;

	var parent$i = setPrototypeOf$4;

	var setPrototypeOf$3 = parent$i;

	var parent$h = setPrototypeOf$3;

	var setPrototypeOf$2 = parent$h;

	var parent$g = setPrototypeOf$2;

	var setPrototypeOf$1 = parent$g;

	var setPrototypeOf = setPrototypeOf$1;

	var $$9 = _export;
	var fails$5 = fails$i;
	var toObject$3 = toObject$7;
	var nativeGetPrototypeOf = objectGetPrototypeOf;
	var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

	var FAILS_ON_PRIMITIVES = fails$5(function () { nativeGetPrototypeOf(1); });

	// `Object.getPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.getprototypeof
	$$9({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !CORRECT_PROTOTYPE_GETTER }, {
	  getPrototypeOf: function getPrototypeOf(it) {
	    return nativeGetPrototypeOf(toObject$3(it));
	  }
	});

	var path$5 = path$e;

	var getPrototypeOf$6 = path$5.Object.getPrototypeOf;

	var parent$f = getPrototypeOf$6;

	var getPrototypeOf$5 = parent$f;

	var parent$e = getPrototypeOf$5;

	var getPrototypeOf$4 = parent$e;

	var parent$d = getPrototypeOf$4;

	var getPrototypeOf$3 = parent$d;

	var getPrototypeOf$2 = getPrototypeOf$3;

	function _getPrototypeOf(o) {
	  _getPrototypeOf = setPrototypeOf ? getPrototypeOf$2 : function _getPrototypeOf(o) {
	    return o.__proto__ || getPrototypeOf$2(o);
	  };
	  return _getPrototypeOf(o);
	}

	function _superPropBase(object, property) {
	  while (!Object.prototype.hasOwnProperty.call(object, property)) {
	    object = _getPrototypeOf(object);
	    if (object === null) break;
	  }

	  return object;
	}

	function _get() {
	  if (typeof Reflect !== "undefined" && get$1) {
	    _get = get$1;
	  } else {
	    _get = function _get(target, property, receiver) {
	      var base = _superPropBase(target, property);
	      if (!base) return;

	      var desc = getOwnPropertyDescriptor(base, property);

	      if (desc.get) {
	        return desc.get.call(arguments.length < 3 ? target : receiver);
	      }

	      return desc.value;
	    };
	  }

	  return _get.apply(this, arguments);
	}

	var $$8 = _export;
	var DESCRIPTORS$2 = descriptors;
	var create$7 = objectCreate;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	$$8({ target: 'Object', stat: true, sham: !DESCRIPTORS$2 }, {
	  create: create$7
	});

	var path$4 = path$e;

	var Object$1 = path$4.Object;

	var create$6 = function create(P, D) {
	  return Object$1.create(P, D);
	};

	var parent$c = create$6;

	var create$5 = parent$c;

	var parent$b = create$5;

	var create$4 = parent$b;

	var parent$a = create$4;

	var create$3 = parent$a;

	var create$2 = create$3;

	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = create$2(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });

	  defineProperty$2(subClass, "prototype", {
	    writable: false
	  });

	  if (superClass) _setPrototypeOf(subClass, superClass);
	}

	var classof$6 = classofRaw$1;

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	// eslint-disable-next-line es/no-array-isarray -- safe
	var isArray$3 = Array.isArray || function isArray(argument) {
	  return classof$6(argument) == 'Array';
	};

	var toPropertyKey$1 = toPropertyKey$4;
	var definePropertyModule$1 = objectDefineProperty;
	var createPropertyDescriptor$2 = createPropertyDescriptor$5;

	var createProperty$2 = function (object, key, value) {
	  var propertyKey = toPropertyKey$1(key);
	  if (propertyKey in object) definePropertyModule$1.f(object, propertyKey, createPropertyDescriptor$2(0, value));
	  else object[propertyKey] = value;
	};

	var global$b = global$y;
	var isArray$2 = isArray$3;
	var isConstructor = isConstructor$2;
	var isObject$4 = isObject$c;
	var wellKnownSymbol$a = wellKnownSymbol$e;

	var SPECIES$1 = wellKnownSymbol$a('species');
	var Array$2 = global$b.Array;

	// a part of `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesConstructor$1 = function (originalArray) {
	  var C;
	  if (isArray$2(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (isConstructor(C) && (C === Array$2 || isArray$2(C.prototype))) C = undefined;
	    else if (isObject$4(C)) {
	      C = C[SPECIES$1];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? Array$2 : C;
	};

	var arraySpeciesConstructor = arraySpeciesConstructor$1;

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate$2 = function (originalArray, length) {
	  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
	};

	var fails$4 = fails$i;
	var wellKnownSymbol$9 = wellKnownSymbol$e;
	var V8_VERSION$1 = engineV8Version;

	var SPECIES = wellKnownSymbol$9('species');

	var arrayMethodHasSpeciesSupport$1 = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return V8_VERSION$1 >= 51 || !fails$4(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var $$7 = _export;
	var global$a = global$y;
	var fails$3 = fails$i;
	var isArray$1 = isArray$3;
	var isObject$3 = isObject$c;
	var toObject$2 = toObject$7;
	var lengthOfArrayLike$2 = lengthOfArrayLike$4;
	var createProperty$1 = createProperty$2;
	var arraySpeciesCreate$1 = arraySpeciesCreate$2;
	var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$1;
	var wellKnownSymbol$8 = wellKnownSymbol$e;
	var V8_VERSION = engineV8Version;

	var IS_CONCAT_SPREADABLE = wellKnownSymbol$8('isConcatSpreadable');
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';
	var TypeError$4 = global$a.TypeError;

	// We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679
	var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails$3(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

	var isConcatSpreadable = function (O) {
	  if (!isObject$3(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray$1(O);
	};

	var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

	// `Array.prototype.concat` method
	// https://tc39.es/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	$$7({ target: 'Array', proto: true, forced: FORCED }, {
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  concat: function concat(arg) {
	    var O = toObject$2(this);
	    var A = arraySpeciesCreate$1(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = lengthOfArrayLike$2(E);
	        if (n + len > MAX_SAFE_INTEGER) throw TypeError$4(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty$1(A, n, E[k]);
	      } else {
	        if (n >= MAX_SAFE_INTEGER) throw TypeError$4(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        createProperty$1(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});

	var global$9 = global$y;
	var classof$5 = classof$8;

	var String$1 = global$9.String;

	var toString$4 = function (argument) {
	  if (classof$5(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
	  return String$1(argument);
	};

	var objectGetOwnPropertyNames = {};

	var internalObjectKeys = objectKeysInternal;
	var enumBugKeys = enumBugKeys$3;

	var hiddenKeys$2 = enumBugKeys.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	// eslint-disable-next-line es/no-object-getownpropertynames -- safe
	objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return internalObjectKeys(O, hiddenKeys$2);
	};

	var objectGetOwnPropertyNamesExternal = {};

	var global$8 = global$y;
	var toAbsoluteIndex = toAbsoluteIndex$2;
	var lengthOfArrayLike$1 = lengthOfArrayLike$4;
	var createProperty = createProperty$2;

	var Array$1 = global$8.Array;
	var max = Math.max;

	var arraySliceSimple = function (O, start, end) {
	  var length = lengthOfArrayLike$1(O);
	  var k = toAbsoluteIndex(start, length);
	  var fin = toAbsoluteIndex(end === undefined ? length : end, length);
	  var result = Array$1(max(fin - k, 0));
	  for (var n = 0; k < fin; k++, n++) createProperty(result, n, O[k]);
	  result.length = n;
	  return result;
	};

	/* eslint-disable es/no-object-getownpropertynames -- safe */

	var classof$4 = classofRaw$1;
	var toIndexedObject$2 = toIndexedObject$8;
	var $getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
	var arraySlice$2 = arraySliceSimple;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return $getOwnPropertyNames$1(it);
	  } catch (error) {
	    return arraySlice$2(windowNames);
	  }
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
	  return windowNames && classof$4(it) == 'Window'
	    ? getWindowNames(it)
	    : $getOwnPropertyNames$1(toIndexedObject$2(it));
	};

	var createNonEnumerableProperty$3 = createNonEnumerableProperty$5;

	var redefine$3 = function (target, key, value, options) {
	  if (options && options.enumerable) target[key] = value;
	  else createNonEnumerableProperty$3(target, key, value);
	};

	var wellKnownSymbolWrapped = {};

	var wellKnownSymbol$7 = wellKnownSymbol$e;

	wellKnownSymbolWrapped.f = wellKnownSymbol$7;

	var path$3 = path$e;
	var hasOwn$5 = hasOwnProperty_1;
	var wrappedWellKnownSymbolModule$1 = wellKnownSymbolWrapped;
	var defineProperty$1 = objectDefineProperty.f;

	var defineWellKnownSymbol$l = function (NAME) {
	  var Symbol = path$3.Symbol || (path$3.Symbol = {});
	  if (!hasOwn$5(Symbol, NAME)) defineProperty$1(Symbol, NAME, {
	    value: wrappedWellKnownSymbolModule$1.f(NAME)
	  });
	};

	var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
	var classof$3 = classof$8;

	// `Object.prototype.toString` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
	  return '[object ' + classof$3(this) + ']';
	};

	var TO_STRING_TAG_SUPPORT = toStringTagSupport;
	var defineProperty = objectDefineProperty.f;
	var createNonEnumerableProperty$2 = createNonEnumerableProperty$5;
	var hasOwn$4 = hasOwnProperty_1;
	var toString$3 = objectToString;
	var wellKnownSymbol$6 = wellKnownSymbol$e;

	var TO_STRING_TAG$1 = wellKnownSymbol$6('toStringTag');

	var setToStringTag$4 = function (it, TAG, STATIC, SET_METHOD) {
	  if (it) {
	    var target = STATIC ? it : it.prototype;
	    if (!hasOwn$4(target, TO_STRING_TAG$1)) {
	      defineProperty(target, TO_STRING_TAG$1, { configurable: true, value: TAG });
	    }
	    if (SET_METHOD && !TO_STRING_TAG_SUPPORT) {
	      createNonEnumerableProperty$2(target, 'toString', toString$3);
	    }
	  }
	};

	var global$7 = global$y;
	var isCallable$3 = isCallable$g;
	var inspectSource = inspectSource$2;

	var WeakMap$1 = global$7.WeakMap;

	var nativeWeakMap = isCallable$3(WeakMap$1) && /native code/.test(inspectSource(WeakMap$1));

	var NATIVE_WEAK_MAP = nativeWeakMap;
	var global$6 = global$y;
	var uncurryThis$4 = functionUncurryThis;
	var isObject$2 = isObject$c;
	var createNonEnumerableProperty$1 = createNonEnumerableProperty$5;
	var hasOwn$3 = hasOwnProperty_1;
	var shared$1 = sharedStore;
	var sharedKey$1 = sharedKey$4;
	var hiddenKeys$1 = hiddenKeys$5;

	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
	var TypeError$3 = global$6.TypeError;
	var WeakMap = global$6.WeakMap;
	var set, get, has;

	var enforce = function (it) {
	  return has(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject$2(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError$3('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (NATIVE_WEAK_MAP || shared$1.state) {
	  var store = shared$1.state || (shared$1.state = new WeakMap());
	  var wmget = uncurryThis$4(store.get);
	  var wmhas = uncurryThis$4(store.has);
	  var wmset = uncurryThis$4(store.set);
	  set = function (it, metadata) {
	    if (wmhas(store, it)) throw new TypeError$3(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    wmset(store, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget(store, it) || {};
	  };
	  has = function (it) {
	    return wmhas(store, it);
	  };
	} else {
	  var STATE = sharedKey$1('state');
	  hiddenKeys$1[STATE] = true;
	  set = function (it, metadata) {
	    if (hasOwn$3(it, STATE)) throw new TypeError$3(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    createNonEnumerableProperty$1(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return hasOwn$3(it, STATE) ? it[STATE] : {};
	  };
	  has = function (it) {
	    return hasOwn$3(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var bind$5 = functionBindContext;
	var uncurryThis$3 = functionUncurryThis;
	var IndexedObject = indexedObject;
	var toObject$1 = toObject$7;
	var lengthOfArrayLike = lengthOfArrayLike$4;
	var arraySpeciesCreate = arraySpeciesCreate$2;

	var push$1 = uncurryThis$3([].push);

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
	var createMethod$1 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var IS_FILTER_REJECT = TYPE == 7;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject$1($this);
	    var self = IndexedObject(O);
	    var boundFunction = bind$5(callbackfn, that);
	    var length = lengthOfArrayLike(self);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: push$1(target, value);      // filter
	        } else switch (TYPE) {
	          case 4: return false;             // every
	          case 7: push$1(target, value);      // filterReject
	        }
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.es/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$1(0),
	  // `Array.prototype.map` method
	  // https://tc39.es/ecma262/#sec-array.prototype.map
	  map: createMethod$1(1),
	  // `Array.prototype.filter` method
	  // https://tc39.es/ecma262/#sec-array.prototype.filter
	  filter: createMethod$1(2),
	  // `Array.prototype.some` method
	  // https://tc39.es/ecma262/#sec-array.prototype.some
	  some: createMethod$1(3),
	  // `Array.prototype.every` method
	  // https://tc39.es/ecma262/#sec-array.prototype.every
	  every: createMethod$1(4),
	  // `Array.prototype.find` method
	  // https://tc39.es/ecma262/#sec-array.prototype.find
	  find: createMethod$1(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$1(6),
	  // `Array.prototype.filterReject` method
	  // https://github.com/tc39/proposal-array-filtering
	  filterReject: createMethod$1(7)
	};

	var $$6 = _export;
	var global$5 = global$y;
	var getBuiltIn = getBuiltIn$6;
	var apply$1 = functionApply;
	var call$1 = functionCall;
	var uncurryThis$2 = functionUncurryThis;
	var DESCRIPTORS$1 = descriptors;
	var NATIVE_SYMBOL = nativeSymbol;
	var fails$2 = fails$i;
	var hasOwn$2 = hasOwnProperty_1;
	var isArray = isArray$3;
	var isCallable$2 = isCallable$g;
	var isObject$1 = isObject$c;
	var isPrototypeOf$4 = objectIsPrototypeOf;
	var isSymbol = isSymbol$3;
	var anObject = anObject$7;
	var toObject = toObject$7;
	var toIndexedObject$1 = toIndexedObject$8;
	var toPropertyKey = toPropertyKey$4;
	var $toString = toString$4;
	var createPropertyDescriptor$1 = createPropertyDescriptor$5;
	var nativeObjectCreate = objectCreate;
	var objectKeys = objectKeys$3;
	var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
	var getOwnPropertyNamesExternal = objectGetOwnPropertyNamesExternal;
	var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
	var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
	var definePropertyModule = objectDefineProperty;
	var definePropertiesModule = objectDefineProperties;
	var propertyIsEnumerableModule = objectPropertyIsEnumerable;
	var arraySlice$1 = arraySlice$4;
	var redefine$2 = redefine$3;
	var shared = shared$4.exports;
	var sharedKey = sharedKey$4;
	var hiddenKeys = hiddenKeys$5;
	var uid = uid$3;
	var wellKnownSymbol$5 = wellKnownSymbol$e;
	var wrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
	var defineWellKnownSymbol$k = defineWellKnownSymbol$l;
	var setToStringTag$3 = setToStringTag$4;
	var InternalStateModule$2 = internalState;
	var $forEach$1 = arrayIteration.forEach;

	var HIDDEN = sharedKey('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE = 'prototype';
	var TO_PRIMITIVE = wellKnownSymbol$5('toPrimitive');

	var setInternalState$2 = InternalStateModule$2.set;
	var getInternalState$2 = InternalStateModule$2.getterFor(SYMBOL);

	var ObjectPrototype = Object[PROTOTYPE];
	var $Symbol = global$5.Symbol;
	var SymbolPrototype = $Symbol && $Symbol[PROTOTYPE];
	var TypeError$2 = global$5.TypeError;
	var QObject = global$5.QObject;
	var $stringify = getBuiltIn('JSON', 'stringify');
	var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	var nativeDefineProperty = definePropertyModule.f;
	var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
	var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
	var push = uncurryThis$2([].push);

	var AllSymbols = shared('symbols');
	var ObjectPrototypeSymbols = shared('op-symbols');
	var StringToSymbolRegistry = shared('string-to-symbol-registry');
	var SymbolToStringRegistry = shared('symbol-to-string-registry');
	var WellKnownSymbolsStore = shared('wks');

	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDescriptor = DESCRIPTORS$1 && fails$2(function () {
	  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
	    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
	  nativeDefineProperty(O, P, Attributes);
	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
	    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
	  }
	} : nativeDefineProperty;

	var wrap$1 = function (tag, description) {
	  var symbol = AllSymbols[tag] = nativeObjectCreate(SymbolPrototype);
	  setInternalState$2(symbol, {
	    type: SYMBOL,
	    tag: tag,
	    description: description
	  });
	  if (!DESCRIPTORS$1) symbol.description = description;
	  return symbol;
	};

	var $defineProperty = function defineProperty(O, P, Attributes) {
	  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject(O);
	  var key = toPropertyKey(P);
	  anObject(Attributes);
	  if (hasOwn$2(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!hasOwn$2(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor$1(1, {}));
	      O[HIDDEN][key] = true;
	    } else {
	      if (hasOwn$2(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor$1(0, false) });
	    } return setSymbolDescriptor(O, key, Attributes);
	  } return nativeDefineProperty(O, key, Attributes);
	};

	var $defineProperties = function defineProperties(O, Properties) {
	  anObject(O);
	  var properties = toIndexedObject$1(Properties);
	  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
	  $forEach$1(keys, function (key) {
	    if (!DESCRIPTORS$1 || call$1($propertyIsEnumerable, properties, key)) $defineProperty(O, key, properties[key]);
	  });
	  return O;
	};

	var $create = function create(O, Properties) {
	  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
	};

	var $propertyIsEnumerable = function propertyIsEnumerable(V) {
	  var P = toPropertyKey(V);
	  var enumerable = call$1(nativePropertyIsEnumerable, this, P);
	  if (this === ObjectPrototype && hasOwn$2(AllSymbols, P) && !hasOwn$2(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !hasOwn$2(this, P) || !hasOwn$2(AllSymbols, P) || hasOwn$2(this, HIDDEN) && this[HIDDEN][P]
	    ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject$1(O);
	  var key = toPropertyKey(P);
	  if (it === ObjectPrototype && hasOwn$2(AllSymbols, key) && !hasOwn$2(ObjectPrototypeSymbols, key)) return;
	  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
	  if (descriptor && hasOwn$2(AllSymbols, key) && !(hasOwn$2(it, HIDDEN) && it[HIDDEN][key])) {
	    descriptor.enumerable = true;
	  }
	  return descriptor;
	};

	var $getOwnPropertyNames = function getOwnPropertyNames(O) {
	  var names = nativeGetOwnPropertyNames(toIndexedObject$1(O));
	  var result = [];
	  $forEach$1(names, function (key) {
	    if (!hasOwn$2(AllSymbols, key) && !hasOwn$2(hiddenKeys, key)) push(result, key);
	  });
	  return result;
	};

	var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
	  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject$1(O));
	  var result = [];
	  $forEach$1(names, function (key) {
	    if (hasOwn$2(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn$2(ObjectPrototype, key))) {
	      push(result, AllSymbols[key]);
	    }
	  });
	  return result;
	};

	// `Symbol` constructor
	// https://tc39.es/ecma262/#sec-symbol-constructor
	if (!NATIVE_SYMBOL) {
	  $Symbol = function Symbol() {
	    if (isPrototypeOf$4(SymbolPrototype, this)) throw TypeError$2('Symbol is not a constructor');
	    var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0]);
	    var tag = uid(description);
	    var setter = function (value) {
	      if (this === ObjectPrototype) call$1(setter, ObjectPrototypeSymbols, value);
	      if (hasOwn$2(this, HIDDEN) && hasOwn$2(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor$1(1, value));
	    };
	    if (DESCRIPTORS$1 && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
	    return wrap$1(tag, description);
	  };

	  SymbolPrototype = $Symbol[PROTOTYPE];

	  redefine$2(SymbolPrototype, 'toString', function toString() {
	    return getInternalState$2(this).tag;
	  });

	  redefine$2($Symbol, 'withoutSetter', function (description) {
	    return wrap$1(uid(description), description);
	  });

	  propertyIsEnumerableModule.f = $propertyIsEnumerable;
	  definePropertyModule.f = $defineProperty;
	  definePropertiesModule.f = $defineProperties;
	  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
	  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
	  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

	  wrappedWellKnownSymbolModule.f = function (name) {
	    return wrap$1(wellKnownSymbol$5(name), name);
	  };

	  if (DESCRIPTORS$1) {
	    // https://github.com/tc39/proposal-Symbol-description
	    nativeDefineProperty(SymbolPrototype, 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState$2(this).description;
	      }
	    });
	  }
	}

	$$6({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
	  Symbol: $Symbol
	});

	$forEach$1(objectKeys(WellKnownSymbolsStore), function (name) {
	  defineWellKnownSymbol$k(name);
	});

	$$6({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
	  // `Symbol.for` method
	  // https://tc39.es/ecma262/#sec-symbol.for
	  'for': function (key) {
	    var string = $toString(key);
	    if (hasOwn$2(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
	    var symbol = $Symbol(string);
	    StringToSymbolRegistry[string] = symbol;
	    SymbolToStringRegistry[symbol] = string;
	    return symbol;
	  },
	  // `Symbol.keyFor` method
	  // https://tc39.es/ecma262/#sec-symbol.keyfor
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError$2(sym + ' is not a symbol');
	    if (hasOwn$2(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
	  },
	  useSetter: function () { USE_SETTER = true; },
	  useSimple: function () { USE_SETTER = false; }
	});

	$$6({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS$1 }, {
	  // `Object.create` method
	  // https://tc39.es/ecma262/#sec-object.create
	  create: $create,
	  // `Object.defineProperty` method
	  // https://tc39.es/ecma262/#sec-object.defineproperty
	  defineProperty: $defineProperty,
	  // `Object.defineProperties` method
	  // https://tc39.es/ecma262/#sec-object.defineproperties
	  defineProperties: $defineProperties,
	  // `Object.getOwnPropertyDescriptor` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
	});

	$$6({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
	  // `Object.getOwnPropertyNames` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertynames
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // `Object.getOwnPropertySymbols` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	$$6({ target: 'Object', stat: true, forced: fails$2(function () { getOwnPropertySymbolsModule.f(1); }) }, {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return getOwnPropertySymbolsModule.f(toObject(it));
	  }
	});

	// `JSON.stringify` method behavior with symbols
	// https://tc39.es/ecma262/#sec-json.stringify
	if ($stringify) {
	  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails$2(function () {
	    var symbol = $Symbol();
	    // MS Edge converts symbol values to JSON as {}
	    return $stringify([symbol]) != '[null]'
	      // WebKit converts symbol values to JSON as null
	      || $stringify({ a: symbol }) != '{}'
	      // V8 throws on boxed symbols
	      || $stringify(Object(symbol)) != '{}';
	  });

	  $$6({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
	    // eslint-disable-next-line no-unused-vars -- required for `.length`
	    stringify: function stringify(it, replacer, space) {
	      var args = arraySlice$1(arguments);
	      var $replacer = replacer;
	      if (!isObject$1(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	      if (!isArray(replacer)) replacer = function (key, value) {
	        if (isCallable$2($replacer)) value = call$1($replacer, this, key, value);
	        if (!isSymbol(value)) return value;
	      };
	      args[1] = replacer;
	      return apply$1($stringify, null, args);
	    }
	  });
	}

	// `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
	if (!SymbolPrototype[TO_PRIMITIVE]) {
	  var valueOf = SymbolPrototype.valueOf;
	  // eslint-disable-next-line no-unused-vars -- required for .length
	  redefine$2(SymbolPrototype, TO_PRIMITIVE, function (hint) {
	    // TODO: improve hint logic
	    return call$1(valueOf, this);
	  });
	}
	// `Symbol.prototype[@@toStringTag]` property
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
	setToStringTag$3($Symbol, SYMBOL);

	hiddenKeys[HIDDEN] = true;

	var defineWellKnownSymbol$j = defineWellKnownSymbol$l;

	// `Symbol.asyncIterator` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.asynciterator
	defineWellKnownSymbol$j('asyncIterator');

	var defineWellKnownSymbol$i = defineWellKnownSymbol$l;

	// `Symbol.hasInstance` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.hasinstance
	defineWellKnownSymbol$i('hasInstance');

	var defineWellKnownSymbol$h = defineWellKnownSymbol$l;

	// `Symbol.isConcatSpreadable` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.isconcatspreadable
	defineWellKnownSymbol$h('isConcatSpreadable');

	var defineWellKnownSymbol$g = defineWellKnownSymbol$l;

	// `Symbol.iterator` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.iterator
	defineWellKnownSymbol$g('iterator');

	var defineWellKnownSymbol$f = defineWellKnownSymbol$l;

	// `Symbol.match` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.match
	defineWellKnownSymbol$f('match');

	var defineWellKnownSymbol$e = defineWellKnownSymbol$l;

	// `Symbol.matchAll` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.matchall
	defineWellKnownSymbol$e('matchAll');

	var defineWellKnownSymbol$d = defineWellKnownSymbol$l;

	// `Symbol.replace` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.replace
	defineWellKnownSymbol$d('replace');

	var defineWellKnownSymbol$c = defineWellKnownSymbol$l;

	// `Symbol.search` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.search
	defineWellKnownSymbol$c('search');

	var defineWellKnownSymbol$b = defineWellKnownSymbol$l;

	// `Symbol.species` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.species
	defineWellKnownSymbol$b('species');

	var defineWellKnownSymbol$a = defineWellKnownSymbol$l;

	// `Symbol.split` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.split
	defineWellKnownSymbol$a('split');

	var defineWellKnownSymbol$9 = defineWellKnownSymbol$l;

	// `Symbol.toPrimitive` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.toprimitive
	defineWellKnownSymbol$9('toPrimitive');

	var defineWellKnownSymbol$8 = defineWellKnownSymbol$l;

	// `Symbol.toStringTag` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.tostringtag
	defineWellKnownSymbol$8('toStringTag');

	var defineWellKnownSymbol$7 = defineWellKnownSymbol$l;

	// `Symbol.unscopables` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.unscopables
	defineWellKnownSymbol$7('unscopables');

	var global$4 = global$y;
	var setToStringTag$2 = setToStringTag$4;

	// JSON[@@toStringTag] property
	// https://tc39.es/ecma262/#sec-json-@@tostringtag
	setToStringTag$2(global$4.JSON, 'JSON', true);

	var path$2 = path$e;

	var symbol$4 = path$2.Symbol;

	var iterators = {};

	var DESCRIPTORS = descriptors;
	var hasOwn$1 = hasOwnProperty_1;

	var FunctionPrototype$1 = Function.prototype;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

	var EXISTS = hasOwn$1(FunctionPrototype$1, 'name');
	// additional protection from minified / mangled / dropped function names
	var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
	var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype$1, 'name').configurable));

	var functionName = {
	  EXISTS: EXISTS,
	  PROPER: PROPER,
	  CONFIGURABLE: CONFIGURABLE
	};

	var fails$1 = fails$i;
	var isCallable$1 = isCallable$g;
	var create$1 = objectCreate;
	var getPrototypeOf$1 = objectGetPrototypeOf;
	var redefine$1 = redefine$3;
	var wellKnownSymbol$4 = wellKnownSymbol$e;

	var ITERATOR$1 = wellKnownSymbol$4('iterator');
	var BUGGY_SAFARI_ITERATORS$1 = false;

	// `%IteratorPrototype%` object
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype$1, PrototypeOfArrayIteratorPrototype, arrayIterator;

	/* eslint-disable es/no-array-prototype-keys -- safe */
	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$1 = PrototypeOfArrayIteratorPrototype;
	  }
	}

	var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$1 == undefined || fails$1(function () {
	  var test = {};
	  // FF44- legacy iterators case
	  return IteratorPrototype$1[ITERATOR$1].call(test) !== test;
	});

	if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$1 = {};
	else IteratorPrototype$1 = create$1(IteratorPrototype$1);

	// `%IteratorPrototype%[@@iterator]()` method
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
	if (!isCallable$1(IteratorPrototype$1[ITERATOR$1])) {
	  redefine$1(IteratorPrototype$1, ITERATOR$1, function () {
	    return this;
	  });
	}

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype$1,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
	};

	var IteratorPrototype = iteratorsCore.IteratorPrototype;
	var create = objectCreate;
	var createPropertyDescriptor = createPropertyDescriptor$5;
	var setToStringTag$1 = setToStringTag$4;
	var Iterators$3 = iterators;

	var returnThis$1 = function () { return this; };

	var createIteratorConstructor$1 = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
	  setToStringTag$1(IteratorConstructor, TO_STRING_TAG, false, true);
	  Iterators$3[TO_STRING_TAG] = returnThis$1;
	  return IteratorConstructor;
	};

	var $$5 = _export;
	var call = functionCall;
	var FunctionName = functionName;
	var createIteratorConstructor = createIteratorConstructor$1;
	var getPrototypeOf = objectGetPrototypeOf;
	var setToStringTag = setToStringTag$4;
	var redefine = redefine$3;
	var wellKnownSymbol$3 = wellKnownSymbol$e;
	var Iterators$2 = iterators;
	var IteratorsCore = iteratorsCore;

	var PROPER_FUNCTION_NAME = FunctionName.PROPER;
	var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR = wellKnownSymbol$3('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis = function () { return this; };

	var defineIterator$2 = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
	    switch (KIND) {
	      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
	      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
	      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
	    } return function () { return new IteratorConstructor(this); };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
	      Iterators$2[TO_STRING_TAG] = returnThis;
	    }
	  }

	  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
	  if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    {
	      INCORRECT_VALUES_NAME = true;
	      defaultIterator = function values() { return call(nativeIterator, this); };
	    }
	  }

	  // export additional methods
	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        redefine(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else $$5({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
	  }

	  // define iterator
	  if ((FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
	    redefine(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
	  }
	  Iterators$2[NAME] = defaultIterator;

	  return methods;
	};

	var toIndexedObject = toIndexedObject$8;
	var Iterators$1 = iterators;
	var InternalStateModule$1 = internalState;
	objectDefineProperty.f;
	var defineIterator$1 = defineIterator$2;

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState$1 = InternalStateModule$1.set;
	var getInternalState$1 = InternalStateModule$1.getterFor(ARRAY_ITERATOR);

	// `Array.prototype.entries` method
	// https://tc39.es/ecma262/#sec-array.prototype.entries
	// `Array.prototype.keys` method
	// https://tc39.es/ecma262/#sec-array.prototype.keys
	// `Array.prototype.values` method
	// https://tc39.es/ecma262/#sec-array.prototype.values
	// `Array.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
	// `CreateArrayIterator` internal method
	// https://tc39.es/ecma262/#sec-createarrayiterator
	defineIterator$1(Array, 'Array', function (iterated, kind) {
	  setInternalState$1(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState$1(this);
	  var target = state.target;
	  var kind = state.kind;
	  var index = state.index++;
	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return { value: undefined, done: true };
	  }
	  if (kind == 'keys') return { value: index, done: false };
	  if (kind == 'values') return { value: target[index], done: false };
	  return { value: [index, target[index]], done: false };
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values%
	// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
	// https://tc39.es/ecma262/#sec-createmappedargumentsobject
	Iterators$1.Arguments = Iterators$1.Array;

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	var DOMIterables$1 = domIterables;
	var global$3 = global$y;
	var classof$2 = classof$8;
	var createNonEnumerableProperty = createNonEnumerableProperty$5;
	var Iterators = iterators;
	var wellKnownSymbol$2 = wellKnownSymbol$e;

	var TO_STRING_TAG = wellKnownSymbol$2('toStringTag');

	for (var COLLECTION_NAME in DOMIterables$1) {
	  var Collection = global$3[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;
	  if (CollectionPrototype && classof$2(CollectionPrototype) !== TO_STRING_TAG) {
	    createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
	  }
	  Iterators[COLLECTION_NAME] = Iterators.Array;
	}

	var parent$9 = symbol$4;


	var symbol$3 = parent$9;

	var parent$8 = symbol$3;

	var symbol$2 = parent$8;

	var defineWellKnownSymbol$6 = defineWellKnownSymbol$l;

	// `Symbol.asyncDispose` well-known symbol
	// https://github.com/tc39/proposal-using-statement
	defineWellKnownSymbol$6('asyncDispose');

	var defineWellKnownSymbol$5 = defineWellKnownSymbol$l;

	// `Symbol.dispose` well-known symbol
	// https://github.com/tc39/proposal-using-statement
	defineWellKnownSymbol$5('dispose');

	var defineWellKnownSymbol$4 = defineWellKnownSymbol$l;

	// `Symbol.matcher` well-known symbol
	// https://github.com/tc39/proposal-pattern-matching
	defineWellKnownSymbol$4('matcher');

	var defineWellKnownSymbol$3 = defineWellKnownSymbol$l;

	// `Symbol.metadata` well-known symbol
	// https://github.com/tc39/proposal-decorators
	defineWellKnownSymbol$3('metadata');

	var defineWellKnownSymbol$2 = defineWellKnownSymbol$l;

	// `Symbol.observable` well-known symbol
	// https://github.com/tc39/proposal-observable
	defineWellKnownSymbol$2('observable');

	// TODO: remove from `core-js@4`
	var defineWellKnownSymbol$1 = defineWellKnownSymbol$l;

	// `Symbol.patternMatch` well-known symbol
	// https://github.com/tc39/proposal-pattern-matching
	defineWellKnownSymbol$1('patternMatch');

	// TODO: remove from `core-js@4`
	var defineWellKnownSymbol = defineWellKnownSymbol$l;

	defineWellKnownSymbol('replaceAll');

	var parent$7 = symbol$2;





	// TODO: Remove from `core-js@4`

	// TODO: Remove from `core-js@4`


	var symbol$1 = parent$7;

	var symbol = symbol$1;

	var uncurryThis$1 = functionUncurryThis;
	var toIntegerOrInfinity = toIntegerOrInfinity$3;
	var toString$2 = toString$4;
	var requireObjectCoercible$1 = requireObjectCoercible$4;

	var charAt$1 = uncurryThis$1(''.charAt);
	var charCodeAt = uncurryThis$1(''.charCodeAt);
	var stringSlice = uncurryThis$1(''.slice);

	var createMethod = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = toString$2(requireObjectCoercible$1($this));
	    var position = toIntegerOrInfinity(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = charCodeAt(S, position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING
	          ? charAt$1(S, position)
	          : first
	        : CONVERT_TO_STRING
	          ? stringSlice(S, position, position + 2)
	          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod(true)
	};

	var charAt = stringMultibyte.charAt;
	var toString$1 = toString$4;
	var InternalStateModule = internalState;
	var defineIterator = defineIterator$2;

	var STRING_ITERATOR = 'String Iterator';
	var setInternalState = InternalStateModule.set;
	var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

	// `String.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
	defineIterator(String, 'String', function (iterated) {
	  setInternalState(this, {
	    type: STRING_ITERATOR,
	    string: toString$1(iterated),
	    index: 0
	  });
	// `%StringIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return { value: undefined, done: true };
	  point = charAt(string, index);
	  state.index += point.length;
	  return { value: point, done: false };
	});

	var WrappedWellKnownSymbolModule = wellKnownSymbolWrapped;

	var iterator$4 = WrappedWellKnownSymbolModule.f('iterator');

	var parent$6 = iterator$4;


	var iterator$3 = parent$6;

	var parent$5 = iterator$3;

	var iterator$2 = parent$5;

	var parent$4 = iterator$2;

	var iterator$1 = parent$4;

	var iterator = iterator$1;

	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  return _typeof = "function" == typeof symbol && "symbol" == typeof iterator ? function (obj) {
	    return typeof obj;
	  } : function (obj) {
	    return obj && "function" == typeof symbol && obj.constructor === symbol && obj !== symbol.prototype ? "symbol" : typeof obj;
	  }, _typeof(obj);
	}

	function _possibleConstructorReturn(self, call) {
	  if (call && (_typeof(call) === "object" || typeof call === "function")) {
	    return call;
	  } else if (call !== void 0) {
	    throw new TypeError("Derived constructors may only return object or undefined");
	  }

	  return _assertThisInitialized(self);
	}

	var fails = fails$i;

	var arrayMethodIsStrict$1 = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
	    method.call(null, argument || function () { throw 1; }, 1);
	  });
	};

	var $forEach = arrayIteration.forEach;
	var arrayMethodIsStrict = arrayMethodIsStrict$1;

	var STRICT_METHOD = arrayMethodIsStrict('forEach');

	// `Array.prototype.forEach` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	var arrayForEach = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
	  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	// eslint-disable-next-line es/no-array-prototype-foreach -- safe
	} : [].forEach;

	var $$4 = _export;
	var forEach$4 = arrayForEach;

	// `Array.prototype.forEach` method
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	// eslint-disable-next-line es/no-array-prototype-foreach -- safe
	$$4({ target: 'Array', proto: true, forced: [].forEach != forEach$4 }, {
	  forEach: forEach$4
	});

	var path$1 = path$e;

	var entryVirtual$5 = function (CONSTRUCTOR) {
	  return path$1[CONSTRUCTOR + 'Prototype'];
	};

	var entryVirtual$4 = entryVirtual$5;

	var forEach$3 = entryVirtual$4('Array').forEach;

	var parent$3 = forEach$3;

	var forEach$2 = parent$3;

	var classof$1 = classof$8;
	var hasOwn = hasOwnProperty_1;
	var isPrototypeOf$3 = objectIsPrototypeOf;
	var method$2 = forEach$2;

	var ArrayPrototype$2 = Array.prototype;

	var DOMIterables = {
	  DOMTokenList: true,
	  NodeList: true
	};

	var forEach$1 = function (it) {
	  var own = it.forEach;
	  return it === ArrayPrototype$2 || (isPrototypeOf$3(ArrayPrototype$2, it) && own === ArrayPrototype$2.forEach)
	    || hasOwn(DOMIterables, classof$1(it)) ? method$2 : own;
	};

	var forEach = forEach$1;

	var $$3 = _export;
	var $includes = arrayIncludes.includes;

	// `Array.prototype.includes` method
	// https://tc39.es/ecma262/#sec-array.prototype.includes
	$$3({ target: 'Array', proto: true }, {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var entryVirtual$3 = entryVirtual$5;

	var includes$4 = entryVirtual$3('Array').includes;

	var isObject = isObject$c;
	var classof = classofRaw$1;
	var wellKnownSymbol$1 = wellKnownSymbol$e;

	var MATCH$1 = wellKnownSymbol$1('match');

	// `IsRegExp` abstract operation
	// https://tc39.es/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
	};

	var global$2 = global$y;
	var isRegExp = isRegexp;

	var TypeError$1 = global$2.TypeError;

	var notARegexp = function (it) {
	  if (isRegExp(it)) {
	    throw TypeError$1("The method doesn't accept regular expressions");
	  } return it;
	};

	var wellKnownSymbol = wellKnownSymbol$e;

	var MATCH = wellKnownSymbol('match');

	var correctIsRegexpLogic = function (METHOD_NAME) {
	  var regexp = /./;
	  try {
	    '/./'[METHOD_NAME](regexp);
	  } catch (error1) {
	    try {
	      regexp[MATCH] = false;
	      return '/./'[METHOD_NAME](regexp);
	    } catch (error2) { /* empty */ }
	  } return false;
	};

	var $$2 = _export;
	var uncurryThis = functionUncurryThis;
	var notARegExp = notARegexp;
	var requireObjectCoercible = requireObjectCoercible$4;
	var toString = toString$4;
	var correctIsRegExpLogic = correctIsRegexpLogic;

	var stringIndexOf = uncurryThis(''.indexOf);

	// `String.prototype.includes` method
	// https://tc39.es/ecma262/#sec-string.prototype.includes
	$$2({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~stringIndexOf(
	      toString(requireObjectCoercible(this)),
	      toString(notARegExp(searchString)),
	      arguments.length > 1 ? arguments[1] : undefined
	    );
	  }
	});

	var entryVirtual$2 = entryVirtual$5;

	var includes$3 = entryVirtual$2('String').includes;

	var isPrototypeOf$2 = objectIsPrototypeOf;
	var arrayMethod = includes$4;
	var stringMethod = includes$3;

	var ArrayPrototype$1 = Array.prototype;
	var StringPrototype = String.prototype;

	var includes$2 = function (it) {
	  var own = it.includes;
	  if (it === ArrayPrototype$1 || (isPrototypeOf$2(ArrayPrototype$1, it) && own === ArrayPrototype$1.includes)) return arrayMethod;
	  if (typeof it == 'string' || it === StringPrototype || (isPrototypeOf$2(StringPrototype, it) && own === StringPrototype.includes)) {
	    return stringMethod;
	  } return own;
	};

	var parent$2 = includes$2;

	var includes$1 = parent$2;

	var includes = includes$1;

	var entryVirtual$1 = entryVirtual$5;

	var concat$3 = entryVirtual$1('Array').concat;

	var isPrototypeOf$1 = objectIsPrototypeOf;
	var method$1 = concat$3;

	var ArrayPrototype = Array.prototype;

	var concat$2 = function (it) {
	  var own = it.concat;
	  return it === ArrayPrototype || (isPrototypeOf$1(ArrayPrototype, it) && own === ArrayPrototype.concat) ? method$1 : own;
	};

	var parent$1 = concat$2;

	var concat$1 = parent$1;

	var concat = concat$1;

	function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !construct) return false; if (construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
	var RemainingTimeDisplay = videojs__default["default"].getComponent("RemainingTimeDisplay");
	var TimeDisplay = videojs__default["default"].getComponent("TimeDisplay");

	var ImaRemainingTimeDisplay = /*#__PURE__*/function (_RemainingTimeDisplay) {
	  _inherits(ImaRemainingTimeDisplay, _RemainingTimeDisplay);

	  var _super = _createSuper$2(ImaRemainingTimeDisplay);

	  function ImaRemainingTimeDisplay() {
	    _classCallCheck(this, ImaRemainingTimeDisplay);

	    return _super.apply(this, arguments);
	  }

	  _createClass(ImaRemainingTimeDisplay, [{
	    key: "createEl",
	    value: // modified version of TimeDisplay method
	    function createEl() {
	      // prefix "-" in later versions of vjs7
	      // we need to call grandparent
	      return TimeDisplay.prototype.createEl.call(this);
	    }
	  }, {
	    key: "updateTextNode_",
	    value: function updateTextNode_() {
	      if (!this.contentEl_) {
	        return;
	      }

	      while (this.contentEl_.firstChild) {
	        this.contentEl_.removeChild(this.contentEl_.firstChild);
	      }

	      this.textNode_ = document.createTextNode(this.getRemainingTimeLabel() + (this.formattedTime_ || "-0:00").replace("-", ""));
	      this.contentEl_.appendChild(this.textNode_);
	    }
	  }, {
	    key: "getRemainingTimeLabel",
	    value: function getRemainingTimeLabel() {
	      var podCount = ": ";

	      if (this.player_.totalAds > 1) {
	        var _context, _context2;

	        podCount = concat(_context = concat(_context2 = " (".concat(this.player_.adPosition, " ")).call(_context2, this.options_.ofLabel, " ")).call(_context, this.player_.totalAds, "): ");
	      }

	      return this.options_.adLabel + podCount;
	    }
	  }]);

	  return ImaRemainingTimeDisplay;
	}(RemainingTimeDisplay);

	videojs__default["default"].registerComponent("imaRemainingTimeDisplay", ImaRemainingTimeDisplay);

	var $$1 = _export;
	var global$1 = global$y;
	var apply = functionApply;
	var isCallable = isCallable$g;
	var userAgent = engineUserAgent;
	var arraySlice = arraySlice$4;

	var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
	var Function$1 = global$1.Function;

	var wrap = function (scheduler) {
	  return function (handler, timeout /* , ...arguments */) {
	    var boundArgs = arguments.length > 2;
	    var args = boundArgs ? arraySlice(arguments, 2) : undefined;
	    return scheduler(boundArgs ? function () {
	      apply(isCallable(handler) ? handler : Function$1(handler), this, args);
	    } : handler, timeout);
	  };
	};

	// ie9- setTimeout & setInterval additional parameters fix
	// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
	$$1({ global: true, bind: true, forced: MSIE }, {
	  // `setTimeout` method
	  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
	  setTimeout: wrap(global$1.setTimeout),
	  // `setInterval` method
	  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
	  setInterval: wrap(global$1.setInterval)
	});

	var path = path$e;

	var setTimeout$1 = path.setTimeout;

	var setTimeout = setTimeout$1;

	var $ = _export;
	var bind$4 = functionBind;

	// `Function.prototype.bind` method
	// https://tc39.es/ecma262/#sec-function.prototype.bind
	$({ target: 'Function', proto: true, forced: Function.bind !== bind$4 }, {
	  bind: bind$4
	});

	var entryVirtual = entryVirtual$5;

	var bind$3 = entryVirtual('Function').bind;

	var isPrototypeOf = objectIsPrototypeOf;
	var method = bind$3;

	var FunctionPrototype = Function.prototype;

	var bind$2 = function (it) {
	  var own = it.bind;
	  return it === FunctionPrototype || (isPrototypeOf(FunctionPrototype, it) && own === FunctionPrototype.bind) ? method : own;
	};

	var parent = bind$2;

	var bind$1 = parent;

	var bind = bind$1;

	var version = "0.6.0";

	function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !construct) return false; if (construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
	var Tech = videojs__default["default"].getTech("Tech");

	var Ima = /*#__PURE__*/function (_Tech) {
	  _inherits(Ima, _Tech);

	  var _super = _createSuper$1(Ima);

	  function Ima(options, ready) {
	    var _this;

	    _classCallCheck(this, Ima);

	    _this = _super.call(this, options, ready);
	    _this.contentTracker = {
	      previousTime: 0,
	      currentTime: 0,
	      duration: 0,
	      seeking: false
	    };
	    _this.currentAd = null;
	    _this.source = options.source;
	    _this.adDisplayContainer = null;
	    _this.adsLoader = null;
	    _this.adsManager = null;
	    _this.width = 0;
	    _this.heght = 0;
	    _this.screenMode = "";
	    _this.volume_ = 1;
	    _this.muted_ = false; // initialized later via handleLateInit_ method
	    // called by ImaPlayer

	    return _this;
	  }
	  /* DEFAULT IMA SOURCE OPTIONS */


	  _createClass(Ima, [{
	    key: "mergeWithDefaults",
	    value: function mergeWithDefaults(options) {
	      var gis = google.ima.settings;
	      return assign({
	        showControlsForJSAds: true,
	        locale: gis.getLocale(),
	        disableFlashAds: gis.getDisableFlashAds(),
	        disableCustomPlaybackForIOS10Plus: videojs__default["default"].browser.IS_IOS,
	        numRedirects: gis.getNumRedirects(),
	        autoPlayAdBreaks: true,
	        vpaidMode: google.ima.ImaSdkSettings.VpaidMode.ENABLED,
	        adTagUrl: "",
	        adsResponse: "",
	        forceNonLinearFullSlot: false,
	        nonLinearWidth: 0,
	        nonLinearHeight: 0,
	        adWillAutoPlay: false,
	        adWillPlayMuted: false,
	        showCountdown: true,
	        adsRenderingSettings: {
	          loadVideoTimeout: options.timeout || 5000
	        }
	      }, options);
	    }
	    /* THESE ARE Tech's OVERRIDEN METHODS */

	  }, {
	    key: "createEl",
	    value: function createEl() {
	      var divWrapper = document.createElement("div");
	      divWrapper.className = "vjs-tech ima-ad-container";
	      divWrapper.id = this.options_.playerId + "-ad-container";
	      return divWrapper;
	    }
	  }, {
	    key: "controls",
	    value: function controls() {
	      return false;
	    }
	  }, {
	    key: "poster",
	    value: function poster() {
	      return null;
	    }
	  }, {
	    key: "setPoster",
	    value: function setPoster() {}
	  }, {
	    key: "src",
	    value: function src(source) {
	      this.setSource(source);
	      return this.source;
	    }
	  }, {
	    key: "currentSrc",
	    value: function currentSrc() {
	      return this.source.adTagUrl || this.source.adsResponse || "";
	    }
	  }, {
	    key: "setSource",
	    value: function setSource(source, init) {
	      if (!source || _typeof(source) !== "object") {
	        return;
	      }

	      this.source = this.mergeWithDefaults(source);
	      if (!init) this.reset();
	      this.trigger("loadstart"); // resets player classes

	      if (!this.source.adTagUrl && !this.source.adsResponse) {
	        // if no ads are provided we left tech reseted
	        // and let content know that no ads will be played
	        if (init) this.triggerReady();
	        this.trigger("adsready");
	        return;
	      }

	      this.isReady_ = false;
	      this.trigger("waiting");
	      this.initAdContainer();
	      this.requestAds();
	    }
	  }, {
	    key: "autoplay",
	    value: function autoplay() {
	      return this.source && this.source.autoPlayAdBreaks;
	    }
	  }, {
	    key: "setAutoplay",
	    value: function setAutoplay() {}
	  }, {
	    key: "loop",
	    value: function loop() {
	      return false;
	    }
	  }, {
	    key: "setLoop",
	    value: function setLoop() {}
	  }, {
	    key: "play",
	    value: function play() {
	      // state order dispatching
	      if (!this.isReady_) {
	        console.warn("Ads warning: ads not ready to play yet.");
	        return;
	      }

	      if (!this.adsManager || this.ended()) {
	        console.warn("Ads warning: No ads.");
	        return;
	      }

	      if (!this.contentHasStarted_) {
	        console.warn("Ads warning: content must be playing.");
	        return;
	      }

	      if (this.isLinearAd() && this.paused()) {
	        this.adsManager.resume();
	        return;
	      }

	      if (!this.hasStarted_ || !this.autoplay()) {
	        this.start();
	        return;
	      }
	    }
	  }, {
	    key: "pause",
	    value: function pause() {
	      if (this.isLinearAd() && !this.paused()) {
	        this.adsManager.pause();
	      }
	    }
	  }, {
	    key: "paused",
	    value: function paused() {
	      return !!this.paused_;
	    }
	  }, {
	    key: "currentTime",
	    value: function currentTime() {
	      var currentTime = this.adsManager ? this.duration() - this.adsManager.getRemainingTime() : 0;
	      return currentTime > 0 ? currentTime : 0;
	    }
	  }, {
	    key: "setCurrentTime",
	    value: function setCurrentTime() {}
	  }, {
	    key: "seeking",
	    value: function seeking() {
	      return false;
	    }
	  }, {
	    key: "seekable",
	    value: function seekable() {
	      return videojs__default["default"].createTimeRange();
	    }
	  }, {
	    key: "playbackRate",
	    value: function playbackRate() {
	      return 1.0;
	    }
	  }, {
	    key: "duration",
	    value: function duration() {
	      return this.currentAd && this.currentAd.getDuration() > 0 ? this.currentAd.getDuration() : 0;
	    }
	  }, {
	    key: "ended",
	    value: function ended() {
	      return !!this.ended_;
	    }
	  }, {
	    key: "volume",
	    value: function volume() {
	      return this.volume_;
	    } // throttle volume change (to reduce event emits)

	  }, {
	    key: "setManagerVolume",
	    value: function setManagerVolume(vol) {
	      var _this2 = this;

	      clearTimeout(this.volTimeout);
	      this.volTimeout = setTimeout(function () {
	        return _this2.adsManager && _this2.adsManager.setVolume(vol);
	      }, 250);
	    }
	  }, {
	    key: "setVolume",
	    value: function setVolume(vol) {
	      if (vol === this.volume_) return;
	      this.volume_ = vol;
	      this.muted_ = !vol;
	      this.trigger("volumechange");
	      this.setManagerVolume(vol);
	    }
	  }, {
	    key: "muted",
	    value: function muted() {
	      return this.muted_;
	    }
	  }, {
	    key: "setMuted",
	    value: function setMuted(mute) {
	      if (mute == this.muted_) return;
	      this.muted_ = mute;
	      this.trigger("volumechange");
	      this.setManagerVolume(!mute ? this.volume_ : 0);
	    }
	  }, {
	    key: "buffered",
	    value: function buffered() {
	      return videojs__default["default"].createTimeRange(0, this.currentTime());
	    }
	  }, {
	    key: "supportsFullScreen",
	    value: function supportsFullScreen() {
	      return true;
	    }
	  }, {
	    key: "preload",
	    value: function preload() {}
	  }, {
	    key: "load",
	    value: function load() {}
	  }, {
	    key: "reset",
	    value: function reset() {
	      if (this.adsManager) {
	        //Dispose of the IMA SDK
	        this.adsManager.stop();
	        this.adsManager.destroy();
	        this.adsManager = null;
	      }

	      if (!this.contentCompleted_) {
	        this.onContentCompleted();
	      }

	      this.err = null;
	      this.currentAd = null;
	      this.muted_ = false;
	      this.ended_ = false;
	      this.paused_ = false;
	      this.contentTracker.previousTime = 0;
	      this.contentTracker.currentTime = 0;
	      this.contentTracker.duration = 0;
	      this.contentTracker.seeking = false;
	      this.adsLoader && this.adsLoader.destroy() || "";
	      this.adsLoader = null;
	      this.adDisplayContainer && this.adDisplayContainer.destroy() || "";
	      this.adDisplayContainer = null;
	    }
	  }, {
	    key: "dispose",
	    value: function dispose() {
	      this.reset(true);
	      this.player_ = null; // allow object to be GCed
	      //Needs to be called after the IMA SDK is destroyed, otherwise there will be a null reference exception

	      _get(_getPrototypeOf(Ima.prototype), "dispose", this).call(this);
	    }
	    /* THESE METHODS ARE CALLED DURING SOURCE INITIALIZATION */

	  }, {
	    key: "handleLateInit_",
	    value: function handleLateInit_(contentInfo) {
	      this.player_ = contentInfo.imaPlayer;
	      this.source.contentMediaElement = contentInfo.mediaElement;
	      this.source.adWillAutoPlay = contentInfo.autoplay;
	      this.source.adWillPlayMuted = contentInfo.muted;
	      this.muted_ = contentInfo.muted;
	      this.volume_ = contentInfo.volume;
	      this.resize(contentInfo);
	      this.setSource(this.source, true);
	    }
	  }, {
	    key: "initAdContainer",
	    value: function initAdContainer() {
	      this.adDisplayContainer = new google.ima.AdDisplayContainer(this.el_, this.source.contentMediaElement);
	      this.setAdsLoader();
	    }
	  }, {
	    key: "setScreenMode",
	    value: function setScreenMode(isFullscreen) {
	      this.screenMode = isFullscreen ? google.ima.ViewMode.FULLSCREEN : google.ima.ViewMode.NORMAL;
	    }
	  }, {
	    key: "setAdsLoader",
	    value: function setAdsLoader() {
	      var _context, _context2;

	      this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer);
	      this.adsLoader.getSettings().setLocale(this.source.locale);
	      this.adsLoader.getSettings().setDisableFlashAds(this.source.disableFlashAds);
	      this.adsLoader.getSettings().setDisableCustomPlaybackForIOS10Plus(this.source.disableCustomPlaybackForIOS10Plus);
	      this.adsLoader.getSettings().setVpaidMode(this.source.vpaidMode);
	      this.adsLoader.getSettings().setNumRedirects(this.source.numRedirects);
	      this.adsLoader.getSettings().setPlayerType("videojs-ima-player");
	      this.adsLoader.getSettings().setPlayerVersion(version);
	      this.adsLoader.getSettings().setAutoPlayAdBreaks(this.source.autoPlayAdBreaks);
	      this.adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, bind(_context = this.onAdEvent).call(_context, this, this.onAdsManagerLoaded), false);
	      this.adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, bind(_context2 = this.onAdEvent).call(_context2, this, this.onAdsLoaderError), false);
	    }
	  }, {
	    key: "requestAds",
	    value: function requestAds() {
	      if (!this.source.adTagUrl && !this.source.adsResponse) {
	        return;
	      }

	      var adsRequest = new google.ima.AdsRequest();

	      if (this.source.adTagUrl) {
	        adsRequest.adTagUrl = this.source.adTagUrl;
	      } else {
	        adsRequest.adsResponse = this.source.adsResponse;
	      }

	      adsRequest.forceNonLinearFullSlot = this.source.forceNonLinearFullSlot;
	      adsRequest.linearAdSlotWidth = this.width;
	      adsRequest.linearAdSlotHeight = this.height;
	      adsRequest.nonLinearAdSlotWidth = this.source.nonLinearWidth || adsRequest.linearAdSlotWidth;
	      adsRequest.nonLinearAdSlotHeight = this.source.nonLinearHeight || adsRequest.linearAdSlotHeight / 3;
	      adsRequest.setAdWillAutoPlay(this.source.adWillAutoPlay);
	      adsRequest.setAdWillPlayMuted(this.source.adWillPlayMuted);
	      this.adsLoader.requestAds(adsRequest);
	    }
	  }, {
	    key: "setAdsManager",
	    value: function setAdsManager(e) {
	      var _context3, _context4, _context5, _context6, _context7, _context8, _context9, _context10, _context11, _context12, _context13, _context14, _context15, _context16, _context17, _context18, _context19, _context20, _context21, _context22, _context23, _context24, _context25, _context26;

	      this.adsRenderingSettings = new google.ima.AdsRenderingSettings(); // this should be handled by contrib ads statefullnes
	      //this.adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;

	      assign(this.adsRenderingSettings, this.source.adsRenderingSettings || {});

	      this.adsManager = e.getAdsManager(this.contentTracker, this.adsRenderingSettings);
	      this.adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, bind(_context3 = this.onAdEvent).call(_context3, this, this.onAdError));
	      this.adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, bind(_context4 = this.onAdEvent).call(_context4, this, this.onContentPauseRequested));
	      this.adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, bind(_context5 = this.onAdEvent).call(_context5, this, this.onContentResumeRequested));
	      this.adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, bind(_context6 = this.onAdEvent).call(_context6, this, this.onAllAdsCompleted));
	      this.adsManager.addEventListener(google.ima.AdEvent.Type.LOADED, bind(_context7 = this.onAdEvent).call(_context7, this, this.onAdLoaded));
	      this.adsManager.addEventListener(google.ima.AdEvent.Type.STARTED, bind(_context8 = this.onAdEvent).call(_context8, this, this.onAdStarted));
	      this.adsManager.addEventListener(google.ima.AdEvent.Type.CLICK, bind(_context9 = this.onAdEvent).call(_context9, this, this.onAdClick));
	      this.adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE, bind(_context10 = this.onAdEvent).call(_context10, this, this.onAdComplete));
	      this.adsManager.addEventListener(google.ima.AdEvent.Type.SKIPPED, bind(_context11 = this.onAdEvent).call(_context11, this, this.onAdSkipped));
	      this.adsManager.addEventListener(google.ima.AdEvent.Type.PAUSED, // we wont mix player's pause event with this
	      bind(_context12 = this.onAdPaused).call(_context12, this));
	      this.adsManager.addEventListener(google.ima.AdEvent.Type.RESUMED, bind(_context13 = this.onAdEvent).call(_context13, this, this.onAdResumed));
	      this.adsManager.addEventListener(google.ima.AdEvent.Type.VOLUME_CHANGED, bind(_context14 = this.onAdEvent).call(_context14, this, this.onVolumeChanged));
	      this.adsManager.addEventListener(google.ima.AdEvent.Type.VOLUME_MUTED, bind(_context15 = this.onAdEvent).call(_context15, this, this.onVolumeMuted)); // additional events retriggered to ima player

	      this.adsManager.addEventListener(google.ima.AdEvent.Type.AD_BREAK_READY, bind(_context16 = this.onAdEvent).call(_context16, this, null));
	      this.adsManager.addEventListener(google.ima.AdEvent.Type.AD_METADATA, bind(_context17 = this.onAdEvent).call(_context17, this, null));
	      this.adsManager.addEventListener(google.ima.AdEvent.Type.FIRST_QUARTILE, bind(_context18 = this.onAdEvent).call(_context18, this, null));
	      this.adsManager.addEventListener(google.ima.AdEvent.Type.IMPRESSION, bind(_context19 = this.onAdEvent).call(_context19, this, null));
	      this.adsManager.addEventListener(google.ima.AdEvent.Type.INTERACTION, bind(_context20 = this.onAdEvent).call(_context20, this, null));
	      this.adsManager.addEventListener(google.ima.AdEvent.Type.LINEAR_CHANGED, bind(_context21 = this.onAdEvent).call(_context21, this, null));
	      this.adsManager.addEventListener(google.ima.AdEvent.Type.LOG, bind(_context22 = this.onAdEvent).call(_context22, this, null));
	      this.adsManager.addEventListener(google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED, bind(_context23 = this.onAdEvent).call(_context23, this, null));
	      this.adsManager.addEventListener(google.ima.AdEvent.Type.MIDPOINT, bind(_context24 = this.onAdEvent).call(_context24, this, null));
	      this.adsManager.addEventListener(google.ima.AdEvent.Type.THIRD_QUARTILE, bind(_context25 = this.onAdEvent).call(_context25, this, null));
	      this.adsManager.addEventListener(google.ima.AdEvent.Type.USER_CLOSE, bind(_context26 = this.onAdEvent).call(_context26, this, null));
	      this.triggerReady();
	    }
	  }, {
	    key: "initAdsManager",
	    value: function initAdsManager() {
	      try {
	        this.adsManager.init(this.width, this.height, this.screenMode);
	        this.adsManager.setVolume(!this.muted_ ? this.volume_ : 0);
	        this.adDisplayContainer.initialize();
	      } catch (adError) {
	        this.onAdError(adError);
	      }
	    }
	  }, {
	    key: "start",
	    value: function start() {
	      if (this.currentAd) {
	        console.war("Ad warning: ad is already playing");
	        return;
	      }

	      if (!this.hasStarted_) {
	        this.triggerHasStartedEvents();
	      }

	      try {
	        this.adsManager.start();
	      } catch (e) {
	        this.onAdError(e);
	      }
	    }
	    /* TRIGGER HELPER */

	  }, {
	    key: "triggerHasStartedEvents",
	    value: function triggerHasStartedEvents() {
	      this.trigger("canplay");
	      this.trigger("loadedmetadata");
	      this.trigger("volumechange");
	      this.trigger("firstplay");
	      this.trigger("play");
	      this.trigger("playing");
	    }
	    /* THESE CUSTOM METHODS ARE CALLED DIRECTLY BY PLAYER */

	  }, {
	    key: "preroll",
	    value: function preroll() {
	      this.contentHasStarted_ = true;

	      if (this.adsManager) {
	        this.initAdsManager();
	        this.autoplay() && this.play() || "";
	      }
	    }
	  }, {
	    key: "postroll",
	    value: function postroll() {
	      if (!this.contentCompleted_) {
	        this.contentCompleted_ = true;
	        this.onContentCompleted();
	      }
	    }
	  }, {
	    key: "resize",
	    value: function resize(dimensions) {
	      this.width = dimensions.fullscreen ? window.screen.width : dimensions.width;
	      this.height = dimensions.fullscreen ? window.screen.height : dimensions.height;
	      this.setScreenMode(dimensions.fullscreen);

	      if (this.adsManager) {
	        this.adsManager.resize(this.width, this.height, this.screenMode);
	        this.trigger("resize");
	      }
	    }
	    /* THESE EVENT METHODS MOSTLY HANDLES ADS MANAGER */

	  }, {
	    key: "onOptionsChanged",
	    value: function onOptionsChanged(options) {
	      if (options) {
	        this.options_ = assign(this.source, options);
	      }
	    }
	  }, {
	    key: "onAdsLoaderError",
	    value: function onAdsLoaderError(e) {
	      this.onAdError(e, "AdsLoader");
	    }
	  }, {
	    key: "onAdError",
	    value: function onAdError(e, source) {
	      var type = (source || "Ad") + " error: ";
	      var msg = e.getError !== undefined ? e.getError().getMessage() : e.stack;
	      console.warn("VIDEOJS: " + type + msg);
	      this.trigger("adserror");
	    }
	  }, {
	    key: "onAdsManagerLoaded",
	    value: function onAdsManagerLoaded(e) {
	      this.setAdsManager(e);
	      this.trigger("adsready", this.adsManager.getCuePoints());
	    }
	  }, {
	    key: "onAdLoaded",
	    value: function onAdLoaded(e) {
	      this.currentAd = e.getAd();
	      var adPosition = 0,
	          totalAds = 0;

	      if (this.currentAd.getAdPodInfo && this.currentAd.getAdPodInfo()) {
	        adPosition = this.currentAd.getAdPodInfo().getAdPosition();
	        totalAds = this.currentAd.getAdPodInfo().getTotalAds();
	      }

	      this.trigger("adchange", {
	        adPosition: adPosition,
	        totalAds: totalAds
	      });
	      this.isLinearAd() ? this.onLinearAdLoaded() : this.onNonLinearAdLoaded();
	    }
	  }, {
	    key: "onLinearAdLoaded",
	    value: function onLinearAdLoaded() {
	      this.trigger("waiting");
	      this.trigger("ratechange");
	      this.trigger("durationchange");
	    }
	  }, {
	    key: "onNonLinearAdLoaded",
	    value: function onNonLinearAdLoaded() {}
	  }, {
	    key: "onContentPauseRequested",
	    value: function onContentPauseRequested() {
	      var isJSAd = this.currentAd && this.currentAd.getContentType() === "application/javascript";
	      this.trigger("linearadstarted", !isJSAd || this.source.showControlsForJSAds);
	      this.trigger("waiting");
	    }
	  }, {
	    key: "onContentResumeRequested",
	    value: function onContentResumeRequested() {
	      // skip sdk nopostroll/nopreroll calls, we have our own
	      this.trigger("linearadended");
	    }
	  }, {
	    key: "onAdStarted",
	    value: function onAdStarted() {
	      this.isLinearAd() ? this.onLinearAdStarted() : this.onNonLinearStarted();
	    }
	  }, {
	    key: "onLinearAdStarted",
	    value: function onLinearAdStarted() {
	      this.trigger("playing");
	    }
	  }, {
	    key: "onNonLinearStarted",
	    value: function onNonLinearStarted() {
	      this.trigger("nonlinearadstarted");
	    }
	  }, {
	    key: "onAdSkipped",
	    value: function onAdSkipped() {
	      if (this.paused()) {
	        this.onAdResumed();
	      }

	      this.onAdComplete();
	    }
	  }, {
	    key: "onAdComplete",
	    value: function onAdComplete() {
	      this.isLinearAd() ? this.onLinearAdEnded() : this.onNonLinearAdEnded();
	      this.currentAd = null;
	    }
	  }, {
	    key: "onLinearAdEnded",
	    value: function onLinearAdEnded() {}
	  }, {
	    key: "onNonLinearAdEnded",
	    value: function onNonLinearAdEnded() {
	      this.trigger("nonlinearadended");
	    }
	  }, {
	    key: "onAllAdsCompleted",
	    value: function onAllAdsCompleted() {
	      this.ended_ = true;
	      this.trigger("ended");
	      this.reset();
	    }
	  }, {
	    key: "onAdPaused",
	    value: function onAdPaused() {
	      this.paused_ = true;
	      this.trigger("pause");
	    }
	  }, {
	    key: "onAdResumed",
	    value: function onAdResumed() {
	      this.paused_ = false;
	      this.trigger("play");
	    }
	  }, {
	    key: "onAdClick",
	    value: function onAdClick() {
	      this.pause();
	    }
	  }, {
	    key: "onVolumeChanged",
	    value: function onVolumeChanged() {}
	  }, {
	    key: "onVolumeMuted",
	    value: function onVolumeMuted() {}
	  }, {
	    key: "onContentCompleted",
	    value: function onContentCompleted() {
	      this.adsLoader && this.adsLoader.contentComplete() || "";
	    }
	  }, {
	    key: "onAdEvent",
	    value: function onAdEvent(callback, e) {
	      this.player_.trigger(e);

	      if (typeof callback === "function") {
	        callback.call(this, e);
	      }
	    } // only helper shortcut method

	  }, {
	    key: "isLinearAd",
	    value: function isLinearAd() {
	      return this.adsManager && this.currentAd && this.currentAd.isLinear();
	    }
	  }]);

	  return Ima;
	}(Tech);

	Ima.isSupported = function () {
	  return true;
	};

	Ima.canPlaySource = function (source) {
	  return this.canPlayType(source);
	};

	Ima.canPlayType = function (source) {
	  return source && source.type === "video/ima";
	};

	videojs__default["default"].registerTech("Ima", Ima);

	function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !construct) return false; if (construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
	var Player = videojs__default["default"].getComponent("Player"); // Player is subclass of Component so is usable as part of parent player
	// plus is fully customizable and independent from content player

	var ImaPlayer = /*#__PURE__*/function (_Player) {
	  _inherits(ImaPlayer, _Player);

	  var _super = _createSuper(ImaPlayer);

	  function ImaPlayer(contentPlayer, options) {
	    var _this;

	    _classCallCheck(this, ImaPlayer);

	    // serve tag placeholder to player
	    var adPlayerContainer = document.createElement("div");
	    adPlayerContainer.id = contentPlayer.id_ + "_ima";
	    adPlayerContainer.className = "vjs-ima video-js";
	    options.src = options.adTagUrl || options.adsResponse || "placeholder";
	    options.type = "video/ima"; // sets basic player
	    // passes src placeholder to tech
	    // sets customized remaining time component

	    _this = _super.call(this, adPlayerContainer, {
	      controls: false,
	      sources: [options],
	      techOrder: ["ima"],
	      controlBar: {
	        imaRemainingTimeDisplay: {
	          adLabel: options.adLabel || "Advertisement",
	          ofLabel: options.ofLabel || "of"
	        },
	        children: ["playToggle", "volumePanel", "imaRemainingTimeDisplay", "progressControl", "customControlSpacer", "fullscreenToggle"]
	      },
	      children: ["mediaLoader", "loadingSpinner", "controlBar", "errorDisplay"]
	    });
	    _this.resizeType = contentPlayer.resizeManager ? "playerresize" : ["resize", "fullscreenchange"];

	    _this.hide(); // remove it from exposed players in case that somebody
	    // would manipulate with them globally


	    Player.players[_this.id_] = null;
	    _this.imaOptions = options; // through events we have these values up to date
	    // and exposed for component imaRemainingTimeDisplay

	    _this.adPosition = 0;
	    _this.totalAds = 0;
	    _this.adsReadyTriggered = false;
	    _this.noPreroll = false;
	    _this.noPostroll = false;
	    _this.contentHasStarted_ = false; // we wont toggle content player controls if controls disabled

	    _this.contentControlsDisabled = !contentPlayer.controls();
	    _this.contentPlayer = contentPlayer;
	    _this.isMobile = videojs__default["default"].browser.IS_IOS || videojs__default["default"].browser.IS_ANDROID;
	    if (_this.isMobile) _this.addClass("vjs-ima-mobile");

	    _this.setRemainingTimeVisibility();

	    _this.trackContentEvents(); // wait a tick to get content info


	    contentPlayer.ready(function () {
	      var mediaElement = _this.getContentTechElement();

	      if (!mediaElement) {
	        return;
	      }

	      _this.tech_.handleLateInit_({
	        imaPlayer: _assertThisInitialized(_this),
	        mediaElement: mediaElement,
	        width: contentPlayer.currentWidth(),
	        height: contentPlayer.currentHeight(),
	        volume: contentPlayer.volume(),
	        fullscreen: contentPlayer.isFullscreen(),
	        autoplay: contentPlayer.autoplay(),
	        muted: contentPlayer.muted()
	      });

	      _this.handleContentResize_();
	    });
	    return _this;
	  } // OVERRIDES default method
	  // we want aditional events on loadTech


	  _createClass(ImaPlayer, [{
	    key: "loadTech_",
	    value: function loadTech_(techName, source) {
	      _get(_getPrototypeOf(ImaPlayer.prototype), "loadTech_", this).call(this, techName, source);

	      this.trackImaEvents();
	    } // OVERRIDES default method
	    // calls api through contentPlayer

	  }, {
	    key: "requestFullscreen",
	    value: function requestFullscreen() {
	      if (!this.contentPlayer.isFullscreen()) {
	        this.contentPlayer.requestFullscreen();
	      }
	    } // OVERRIDES default method
	    // calls api through contentPlayer

	  }, {
	    key: "exitFullscreen",
	    value: function exitFullscreen() {
	      if (this.contentPlayer.isFullscreen()) {
	        this.contentPlayer.exitFullscreen();
	      }
	    } // OVERRIDES default method
	    // we wont reset waiting on timeupdate
	    // because tracker must run also during ads

	  }, {
	    key: "handleTechWaiting_",
	    value: function handleTechWaiting_() {
	      this.addClass("vjs-waiting");
	      this.trigger("waiting");
	    } // OVERRIDES default method
	    // there are aditional jobs that needs to be done

	  }, {
	    key: "reset",
	    value: function reset() {
	      this.setContentPlayerToDefault();
	      this.noPreroll = false;
	      this.noPostroll = false;

	      _get(_getPrototypeOf(ImaPlayer.prototype), "reset", this).call(this);

	      this.handleTechAdsReady_();
	    }
	    /* THESE METHODS ARE PART OF TECH INITIALIZATION */

	  }, {
	    key: "trackContentEvents",
	    value: function trackContentEvents() {
	      this.on(this.contentPlayer, "seek", this.handleContentSeek_);
	      this.on(this.contentPlayer, "seeked", this.handleContentSeeked_);
	      this.on(this.contentPlayer, "durationchange", this.handleContentDurationChange_);
	      this.on(this.contentPlayer, "timeupdate", this.handleContentTimeUpdate_);
	      this.on(this.contentPlayer, this.resizeType, this.handleContentResize_);
	      this.on(this.contentPlayer, "contentupdate", this.handleContentChanged_);
	      this.on(this.contentPlayer, "readyforpreroll", this.handleContentReadyForPreroll_);
	      this.on(this.contentPlayer, "readyforpostroll", this.handleContentReadyForPostroll_);
	    }
	  }, {
	    key: "trackImaEvents",
	    value: function trackImaEvents() {
	      // these events are removed together with tech
	      this.on(this.tech_, "adsready", this.handleTechAdsReady_);
	      this.on(this.tech_, "adchange", this.handleTechAdChange_);
	      this.on(this.tech_, "linearadstarted", this.handleTechLinearAdStarted_);
	      this.on(this.tech_, "linearadended", this.handleTechLinearAdEnded_);
	      this.on(this.tech_, "nonlinearadstarted", this.handleTechNonLinearAdStarted_);
	      this.on(this.tech_, "nonlinearadended", this.handleTechNonLinearAdEnded_);
	      this.on(this.tech_, "adserror", this.handleTechAdsError_);
	    }
	  }, {
	    key: "setContentPlayerToDefault",
	    value: function setContentPlayerToDefault() {
	      this.handleTechLinearAdEnded_();
	      this.handleTechNonLinearAdEnded_();
	    }
	  }, {
	    key: "getContentTechElement",
	    value: function getContentTechElement() {
	      var _this2 = this;

	      if (!this.contentPlayer.tech_ || !this.contentPlayer.tech_.el_) {
	        return;
	      }

	      if (this.contentPlayer.techName_ !== "Html5") {
	        var _context;

	        forEach(_context = ["canPlayType", "play", "pause"]).call(_context, function (method) {
	          if (!_this2.contentPlayer.tech_.el_[method]) {
	            _this2.contentPlayer.tech_.el_[method] = function () {
	              return false;
	            };
	          }
	        });
	      }

	      return this.contentPlayer.tech_.el_;
	    }
	  }, {
	    key: "setRemainingTimeVisibility",
	    value: function setRemainingTimeVisibility() {
	      if (this.imaOptions.showCountdown === false) {
	        this.controlBar.imaRemainingTimeDisplay.hide();
	        return;
	      }

	      this.controlBar.imaRemainingTimeDisplay.show();
	    }
	    /* IMA PLAYER METHODS USABLE FROM GLOBAL SPACE (PUBLIC) */

	  }, {
	    key: "updateOptions",
	    value: function updateOptions(options) {
	      if (this.imaOptions && options) {
	        assign(this.imaOptions, options);
	      } // force next call player.src to reset contrib-ads
	      // even if source is the same


	      this.contentPlayer.ads.contentSrc = "";
	    }
	    /* THESE METHODS CONTROLS CONTENT PLAYER */

	  }, {
	    key: "resumeContent",
	    value: function resumeContent() {
	      if (this.contentHasStarted_ && !this.contentEnded) {
	        this.contentPlayer.play();
	      }
	    }
	  }, {
	    key: "pauseContent",
	    value: function pauseContent() {
	      if (this.contentHasStarted_ && !this.contentEnded) {
	        this.contentPlayer.pause();
	      }
	    }
	  }, {
	    key: "setContentControls",
	    value: function setContentControls(bool) {
	      if (!this.contentControlsDisabled) {
	        this.contentPlayer.controls(bool);
	      }
	    }
	  }, {
	    key: "skipLinearAdMode",
	    value: function skipLinearAdMode() {
	      if (this.contentPlayer.ads.isWaitingForAdBreak()) {
	        this.contentPlayer.ads.skipLinearAdMode();
	      }
	    }
	    /* THESE METHODS HANDLES CONTENT PLAYER */

	  }, {
	    key: "handleContentReadyForPreroll_",
	    value: function handleContentReadyForPreroll_() {
	      this.contentHasStarted_ = true;

	      if (this.noPreroll) {
	        this.skipLinearAdMode();
	      }

	      this.techCall_("preroll");
	      this.noPreroll = true;
	    }
	  }, {
	    key: "handleContentReadyForPostroll_",
	    value: function handleContentReadyForPostroll_() {
	      // triggers only once per source
	      if (this.noPostroll) {
	        this.skipLinearAdMode();
	      }

	      if (!this.contentEnded) {
	        this.contentEnded = true;
	        this.techCall_("postroll");
	      }

	      this.noPostroll = true;
	    }
	  }, {
	    key: "handleContentChanged_",
	    value: function handleContentChanged_() {
	      this.setContentPlayerToDefault();
	      this.imaOptions.contentMediaElement = this.getContentTechElement();

	      if (!this.imaOptions.contentMediaElement) {
	        return;
	      }

	      this.contentEnded = false;
	      this.noPreroll = false;
	      this.noPostroll = false;
	      this.adsReadyTriggered = false;
	      this.src(this.imaOptions);
	      this.setRemainingTimeVisibility();
	    }
	  }, {
	    key: "handleContentTimeUpdate_",
	    value: function handleContentTimeUpdate_() {
	      var _this3 = this;

	      this.ready(function () {
	        _this3.tech_.contentTracker.previousTime = _this3.tech_.contentTracker.currentTime;
	        _this3.tech_.contentTracker.currentTime = _this3.contentPlayer.currentTime();
	      });
	    }
	  }, {
	    key: "handleContentResize_",
	    value: function handleContentResize_() {
	      this.isFullscreen(this.contentPlayer.isFullscreen());
	      this.techCall_("resize", {
	        width: this.contentPlayer.currentWidth(),
	        height: this.contentPlayer.currentHeight(),
	        fullscreen: this.isFullscreen()
	      });
	    }
	  }, {
	    key: "handleContentDurationChange_",
	    value: function handleContentDurationChange_() {
	      var _this4 = this;

	      this.ready(function () {
	        _this4.tech_.contentTracker.duration = _this4.contentPlayer.duration();
	      });
	    }
	  }, {
	    key: "handleContentSeek_",
	    value: function handleContentSeek_() {
	      var _this5 = this;

	      this.ready(function () {
	        _this5.tech_.contentTracker.seeking = true;
	      });
	    }
	  }, {
	    key: "handleContentSeeked_",
	    value: function handleContentSeeked_() {
	      var _this6 = this;

	      this.ready(function () {
	        _this6.tech_.contentTracker.seeking = false;
	      });
	    }
	    /* THESE METHODS HANDLES IMA TECH */

	  }, {
	    key: "handleTechAdsReady_",
	    value: function handleTechAdsReady_(e, cuePoints) {
	      this.noPreroll = !cuePoints;
	      this.noPostroll = !cuePoints || !includes(cuePoints).call(cuePoints, -1);

	      if (!this.adsReadyTriggered) {
	        this.adsReadyTriggered = true;
	        this.contentPlayer.trigger("adsready");
	      }
	    }
	  }, {
	    key: "handleTechAdChange_",
	    value: function handleTechAdChange_(e, adPodInfo) {
	      this.adPosition = adPodInfo.adPosition;
	      this.totalAds = adPodInfo.totalAds;
	    }
	  }, {
	    key: "handleTechLinearAdStarted_",
	    value: function handleTechLinearAdStarted_(e, isControlsAllowed) {
	      if (this.contentPlayer.ads.inAdBreak()) {
	        return;
	      }

	      this.volume(this.contentPlayer.volume());
	      this.muted(this.contentPlayer.muted());
	      this.contentPlayer.ads.startLinearAdMode();
	      this.contentPlayer.trigger("ads-ad-started");
	      this.setContentControls(false);
	      this.controls(isControlsAllowed);
	      this.pauseContent();
	      this.show();
	    }
	  }, {
	    key: "handleTechLinearAdEnded_",
	    value: function handleTechLinearAdEnded_() {
	      if (this.contentPlayer.ads.inAdBreak()) {
	        this.contentPlayer.volume(this.volume());
	        this.contentPlayer.muted(this.muted());
	        this.contentPlayer.ads.endLinearAdMode();
	      } else {
	        // covers silent errors like skippable on IOS
	        this.skipLinearAdMode();
	      }

	      this.controls(false);
	      this.setContentControls(true);
	      this.hide();
	      this.resumeContent();
	    }
	  }, {
	    key: "handleTechNonLinearAdStarted_",
	    value: function handleTechNonLinearAdStarted_() {
	      this.controls(false);
	      this.contentPlayer.addClass("non-linear-ad");
	      this.show();
	    }
	  }, {
	    key: "handleTechNonLinearAdEnded_",
	    value: function handleTechNonLinearAdEnded_() {
	      this.contentPlayer.removeClass("non-linear-ad");
	      this.hide();
	    }
	  }, {
	    key: "handleTechAdsError_",
	    value: function handleTechAdsError_() {
	      this.hide();
	      this.removeClass("waiting");
	      this.reset();
	    }
	  }]);

	  return ImaPlayer;
	}(Player); // registers player as normal component


	videojs__default["default"].registerComponent("imaPlayer", ImaPlayer);

	videojs__default["default"].registerPlugin("ima", function (options) {
	  // inits contrib-ads asap if not initialized yet
	  if (!this.ads) {
	    console.error("ima-player error: contrib-ads must be registered on player.");
	    return;
	  }

	  if (typeof this.ads === "function") {
	    this.ads(assign({
	      debug: options.debug || false,
	      timeout: options.timeout || 5000
	    }, options.contribAdsSettings || {}));
	  }

	  this.ima = this.addChild("imaPlayer", options);
	});

}));
