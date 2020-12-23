(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["APALoader"] = factory();
	else
		root["APALoader"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Events = function () {
  function Events(config) {
    _classCallCheck(this, Events);

    // document
    this.config = config;
  }

  _createClass(Events, [{
    key: 'on',
    value: function on() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'click';
      var elements = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var fn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

      if (!elements.length) {
        elements = [elements];
      }
      console.log('[ APALoader ]', elements);

      elements.forEach(function (item) {
        return item.addEventListener(event, fn);
      });
    }
  }, {
    key: 'delegate',
    value: function delegate() {
      var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
      var evt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'click';

      var _this = this;

      var sel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var handler = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

      el.addEventListener(evt, function (e) {
        // console.log('evt', e, sel);
        var t = e.target;
        while (t && t !== _this) {
          if (typeof t.matches === 'function') {
            if (t.matches(sel)) {
              handler.call(t, e, t.getAttribute("href"));
            }
          }
          t = t.parentNode;
        }
      });
    }
  }, {
    key: 'trigger',
    value: function trigger(el, type) {
      if ('createEvent' in document) {
        // modern browsers, IE9+
        var e = document.createEvent('HTMLEvents');
        e.initEvent(type, false, true);
        el.dispatchEvent(e);
      } else {
        // IE 8
        var e = document.createEventObject();
        e.eventType = type;
        el.fireEvent('on' + e.eventType, e);
      }
    }
  }]);

  return Events;
}();

if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
    var matches = (this.document || this.ownerDocument).querySelectorAll(s),
        i = matches.length;
    while (--i >= 0 && matches.item(i) !== this) {}
    return i > -1;
  };
}

exports.default = Events;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(10);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var SET_DEBUG_MODE = function SET_DEBUG_MODE() {
  return setCookie('gzh-debug', true);
}; // eslint-disable-line

var SET_HLG_MODE = function SET_HLG_MODE() {
  return setCookie('apa-loader-hlg', true);
}; // eslint-disable-line

var DEBUG_MODE = function DEBUG_MODE() {
  return typeof window !== 'undefined' && (window.location.href.indexOf('gzh-debug') !== -1 || getCookie('gzh-debug') === 'true');
}; // eslint-disable-line

var LOG = function LOG() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (isBrowser() && DEBUG_MODE()) {
    var _console;

    // eslint-disable-line
    var newArgs = Array.prototype.slice.call(args);
    newArgs.unshift('%c LOADER ', 'background: -webkit-linear-gradient(left, #fc6622 37%, #fdcd42 100%); background: linear-gradient(-270deg, #fc6622 37%, #fdcd42 100%); color: #151316; font-weight: 600; text-transform: uppercase;', '[DEBUG: ON]');
    (_console = console).log.apply(_console, _toConsumableArray(newArgs));
  }
};

var getCookie = function getCookie(cname) {
  var name = cname + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

var setCookie = function setCookie(name, value) {
  var twoWeeksInMs = 60 * 1000 * 60 * 24 * 14;
  var today = Date.now();
  var twoWeeksFromNow = new Date(today + twoWeeksInMs);

  document.cookie = name + '=' + value + '; expires=' + twoWeeksFromNow + '; domain=.clicrbs.com.br; path=/;'; // eslint-disable-line
  document.cookie = name + '=' + value + '; expires=' + twoWeeksFromNow + '; path=/;'; // eslint-disable-line
};

var setCustomreferrer = function setCustomreferrer(referrer) {
  return referrer === '' || referrer.indexOf('gauchazh.clicrbs.com.br') !== -1 || referrer.indexOf('campanha.assinanterbs.com.br') !== -1 || referrer.indexOf('localhost') !== -1 ? 'direto' : referrer;
};

var getCurrDevice = function getCurrDevice() {
  return window.navigator.userAgent.match(/Tablet|iPad/i) ? 'tablet' : navigator.userAgent.match(/IEMobile|Windows Phone|Lumia|Android|webOS|iPhone|iPod|Blackberry|PlayBook|BB10|Mobile Safari|Opera Mini|\bCrMo\/|Opera Mobi/i) ? 'mobile' : 'desktop';
}; // eslint-disable-line

var getUserAgent = function getUserAgent() {
  if (window.navigator.userAgent.match(/Firefox/g)) {
    return 'Firefox';
  }
  if (window.navigator.userAgent.match(/Chrome/g)) {
    return 'Chrome';
  }
  if (window.navigator.userAgent.match(/Safari/g)) {
    return 'Safari';
  }
  if (window.navigator.userAgent.match(/Opera/g)) {
    return 'Opera';
  }
};

var isValid = function isValid(data) {
  return typeof data !== 'undefined' && data !== null && data !== '';
};

var isValidObj = function isValidObj(data) {
  return Object.keys(data).length > 0;
};

var isBrowser = new Function('try {return this===window;}catch(e){ return false;}'); // eslint-disable-line

var isServer = function isServer() {
  return typeof window === 'undefined';
};

var addEventListener = function addEventListener(el, eventName, handler) {
  if (el.addEventListener) {
    el.addEventListener(eventName, handler);
  } else {
    el.attachEvent('on' + eventName, function () {
      handler.call(el);
    });
  }
};

var triggerEvent = function triggerEvent(el, eventName, options) {
  var event = void 0;

  if (typeof window.CustomEvent === 'function') {
    event = new CustomEvent(eventName, options); // eslint-disable-line
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(eventName, true, true, options);
  }

  el.dispatchEvent(event);
};

var parseQueryString = function parseQueryString(queryString) {
  var arr = queryString.replace(/\?/g, '').split('&');
  LOG('[ parseQueryString ]', arr);
  var queryParsed = {};
  arr.map(function (item, i) {
    LOG('[ parseQueryString ]', item);
    var itemSplitted = item.split('=');
    LOG('[ parseQueryString ]', itemSplitted);
    queryParsed[itemSplitted[0]] = itemSplitted[1];
  });

  return queryParsed;
};

var stringifyObject = function stringifyObject(obj) {
  var queryString = '?';
  Object.keys(obj).forEach(function (value, key) {
    queryString += '' + (key === 0 ? '' : '&') + value + '=' + obj[value];
  });

  return queryString;
};

var getParameterByName = function getParameterByName(name, url) {
  var location = void 0;
  if (!url) {
    location = window.location.search;
  }

  var stringName = name.replace(/[[]]/g, '\\$&');
  var regex = new RegExp('[?&]' + stringName + '(=([^&#]*)|&|#|$)');
  var results = regex.exec(location);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

var extractInfoFromURl = function extractInfoFromURl(url) {
  var splittedUrl = url.split('/').slice(3);
  var articleId = /-([\w\d]+)\.html$/gm.exec(url);

  var infoObject = {
    editoria: splittedUrl[0],
    subeditoria: splittedUrl[1],
    idMateria: articleId && articleId.length ? articleId[1] : '',
    url: url
  };

  if (splittedUrl[1] === 'noticia' || splittedUrl[2] === '') {
    infoObject.subeditoria = '';
  }

  return infoObject;
};

var isFacebookNavigator = function isFacebookNavigator() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (userAgent.indexOf('FBAN') > -1 || userAgent.indexOf('FBAV') > -1) {
    return true;
  }
  return false;
};

var redirectToNossaSite = function redirectToNossaSite(offerId) {
  var query = parseQueryString(window.location.search);
  var isHlg = query['apa-loader-hlg'] || getCookie('apa-loader-hlg');
  var idUrl = isHlg ? 'identificacao-hlg.clicrbs.com.br' : 'identificacao.clicrbs.com.br';
  var currLocationWithoutParams = location.protocol + '//' + window.location.host;
  var params = '?redirect_to=' + currLocationWithoutParams + '&fromEasycheckout=true';

  window.location.href = 'https://' + idUrl + '/nossa/' + offerId + '/identifique-se' + params;
};

exports.getParameterByName = getParameterByName;
exports.extractInfoFromURl = extractInfoFromURl;
exports.setCustomreferrer = setCustomreferrer;
exports.addEventListener = addEventListener;
exports.parseQueryString = parseQueryString;
exports.stringifyObject = stringifyObject;
exports.SET_DEBUG_MODE = SET_DEBUG_MODE;
exports.getCurrDevice = getCurrDevice;
exports.getUserAgent = getUserAgent;
exports.SET_HLG_MODE = SET_HLG_MODE;
exports.triggerEvent = triggerEvent;
exports.isValidObj = isValidObj;
exports.DEBUG_MODE = DEBUG_MODE;
exports.isBrowser = isBrowser;
exports.getCookie = getCookie;
exports.setCookie = setCookie;
exports.isServer = isServer;
exports.isValid = isValid;
exports.LOG = LOG;
exports.isFacebookNavigator = isFacebookNavigator;
exports.redirectToNossaSite = redirectToNossaSite;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var variable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'APP_ENV';

  console.log('APP_ENV', variable, Object({"APP_ENV":"production"})[variable]);
  console.log('ENV', Object({"APP_ENV":"production"}));
  console.log('ENV', process);
  // if (isBrowser()) {
  //   return JSON.parse(decodeURI(window.__ISOMORPHIC_DATA__)).env[variable];
  // }

  return Object({"APP_ENV":"production"})[variable];
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.API = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Events = __webpack_require__(0);

var _Events2 = _interopRequireDefault(_Events);

var _APASiteContainer = __webpack_require__(6);

var _APASiteContainer2 = _interopRequireDefault(_APASiteContainer);

var _env = __webpack_require__(4);

var _env2 = _interopRequireDefault(_env);

var _utils = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var apa_payment_url = (0, _env2.default)() === 'production' ? 'https://pagamento.clicrbs.com.br' : 'http://apa-store.clicrbs.com.br:3002';
(0, _utils.LOG)('env', (0, _env2.default)());

var APALoader = function () {
  function APALoader() {
    _classCallCheck(this, APALoader);

    this.events = new _Events2.default();
    this.config = {
      afterLogin: function afterLogin() {},
      afterLogout: function afterLogout() {},
      afterPurchase: function afterPurchase() {},
      getMetrics: function getMetrics() {},
      afterShowModal: function afterShowModal() {},
      afterCloseModal: function afterCloseModal() {}
      /*
      Ativa o modo de HLG para Loader
       */
    };var query = (0, _utils.parseQueryString)(window.location.search);
    (0, _utils.LOG)('parseQueryString', query);
    if (query['apa-loader-hlg'] || window.location.host === 'gauchazh-hlg.clicrbs.com.br') {
      apa_payment_url = 'https://pagamento-hlg.clicrbs.com.br';
    }

    /*
    Ativa o modo de debug para O GAUCHA ZH
     */
    if (query['gzh-debug']) {
      (0, _utils.LOG)('parseQueryString');
      (0, _utils.SET_DEBUG_MODE)();
    }

    this.container = new _APASiteContainer2.default(apa_payment_url, this);
  }

  _createClass(APALoader, [{
    key: 'init',
    value: function init(config) {
      var _this = this;

      var defaultConfig = this.config;
      this.config = _extends({}, defaultConfig, config);
      (0, _utils.LOG)('[ APALoader ]', 'Initialized');
      (0, _utils.LOG)('[ APALoader ]', 'Configs', this.config);
      (0, _utils.LOG)('[ APALoader ]', 'Events', this.events);

      // Dispatch events
      this.events.delegate(document, 'click', this.container.config.offer.buttonsSelector, function (e) {
        e.preventDefault();
        _this.showModal(e);
      });
      (0, _utils.LOG)("this.container.config.offer.linksSelector", this.container.config.offer.linksSelector);
      this.events.delegate(document, 'click', this.container.config.offer.linksSelector, function (e, link) {
        e.preventDefault();
        _this.showModal(e, link);
      });
    }
  }, {
    key: 'closeModal',
    value: function closeModal() {
      (0, _utils.LOG)('closeModal');
      this.container.closeModal();

      return this.config.afterCloseModal();
    }
  }, {
    key: 'showModal',
    value: function showModal(e, link) {
      (0, _utils.LOG)('showModal');
      if (link) {
        this.container.openLink(e, link);
      } else {
        this.container.openModal(e);
      }

      return this.config.afterShowModal();
    }
  }, {
    key: 'appReady',
    value: function appReady() {
      (0, _utils.LOG)('appReady');
      return this.container.appReady();
    }
  }, {
    key: 'afterLogin',
    value: function afterLogin(params) {
      (0, _utils.LOG)('afterLogin', params);
      return this.config.afterLogin(params);
    }
  }, {
    key: 'afterLogout',
    value: function afterLogout(params) {
      (0, _utils.LOG)('afterLogout', params);
      return this.config.afterLogout(params);
    }
  }, {
    key: 'afterPurchase',
    value: function afterPurchase(params) {
      (0, _utils.LOG)('afterPurchase', params);
      return this.config.afterPurchase(params);
    }
  }, {
    key: 'loadOnHash',
    value: function loadOnHash() {
      var hash = decodeURI(window.location.hash);
      (0, _utils.LOG)('loadOnHash', hash);
      var match = hash ? hash.match(/#EC-([0-9]{0,9})/) : '';
      var hasFlagWrs = match && match.input.includes('?nossa');
      var ghostButton = document.createElement("button");
      if (match[1]) {
        //group with offer id
        var offerId = match[1];
        (0, _utils.LOG)('ghostButton', 'LOAD OFFER', offerId);
        ghostButton.setAttribute('data-apa-loader-offer', '' + offerId);
        ghostButton.setAttribute('data-apa-loader-nossa', hasFlagWrs);
        ghostButton.style.display = 'none';
        document.body.appendChild(ghostButton);
        ghostButton.click();
      }
    }
  }, {
    key: 'redirectToNossaSite',
    value: function redirectToNossaSite(offerId) {
      (0, _utils.redirectToNossaSite)(offerId);
    }
  }]);

  return APALoader;
}();

var API = new APALoader();
/*
    Call an event to start application
 */
(function () {
  // add listener to APALoaderReady event
  (0, _utils.LOG)('[ APALoader ]');

  API.events.on('message', [window], function (message, domain) {
    if (message.origin == apa_payment_url) {
      (0, _utils.LOG)('[APALoader]', '[Messages]', message);
      if (API[message.data.fn]) {
        API[message.data.fn](message.data.params);
      }
    }
  });

  API.events.on('APALoaderReady', [window], function () {
    (0, _utils.LOG)('[ APALoader ]', 'APALoaderReady');
    window.APASDK = API;
    window.APAAsyncInit(API);
    API.loadOnHash();
  });
  //dispatch event APALoaderReady
  API.events.trigger(window, 'APALoaderReady');
})();

exports.API = API;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tingle = __webpack_require__(7);

var _tingle2 = _interopRequireDefault(_tingle);

var _tingle3 = __webpack_require__(8);

var _tingle4 = _interopRequireDefault(_tingle3);

var _main = __webpack_require__(11);

var _main2 = _interopRequireDefault(_main);

var _utils = __webpack_require__(3);

var _env = __webpack_require__(4);

var _env2 = _interopRequireDefault(_env);

var _Events = __webpack_require__(0);

var _Events2 = _interopRequireDefault(_Events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var pkg = __webpack_require__(14);

var APASiteContainer = function () {
  function APASiteContainer(url, reference) {
    _classCallCheck(this, APASiteContainer);

    this.config = {
      baseURL: url + '/oferta',
      width: 320,
      height: 580,
      offer: {
        buttonsSelector: '[data-apa-loader-offer]',
        mediumSelector: '[data-apa-loader-medium]',
        campaignSelector: '[data-apa-loader-campaign]',
        contentSelector: '[data-apa-loader-content]',
        nossaSelector: '[data-apa-loader-nossa]',
        linksSelector: 'a[href*=\'' + url.replace("http://", "").replace("https://", "") + '\']'
      },
      loaderMetrics: 'loaderMetrics'
    };
    this.data = {};
    this.events = new _Events2.default();
    this.reference = reference;

    // Set iframe width/height
    this.setIframeSize();

    // Create modal instance
    this.createModalInstance();

    // Log version
    (0, _utils.LOG)('[APALoader][Version]', pkg.version);
  }

  /**
   * Create new tingle modal instance
   */


  _createClass(APASiteContainer, [{
    key: 'createModalInstance',
    value: function createModalInstance() {
      var self = this;
      this.modal = new _tingle2.default.modal({
        footer: false,
        stickyFooter: false,
        closeMethods: [],
        onOpen: function onOpen(instance) {},
        onClose: function onClose() {
          (0, _utils.LOG)('[APALoader]', 'modal closed');
        }
      });
    }

    /**
     * Set iframe width/height to fit small devices
     */

  }, {
    key: 'setIframeSize',
    value: function setIframeSize() {
      var wWidth = window.innerWidth;
      var wHeight = window.innerHeight;
      var css = void 0;
      var appDimensions = {};
      if (wHeight < 580) {
        if ((0, _utils.getUserAgent)() !== 'Firefox' && (0, _utils.getCurrDevice)() === 'mobile') {
          this.config.height = wHeight + 1; // +1 to prevent bug on small iOS devices
          this.config.width = wWidth;

          // Set width for tingle modal wrapper
          css = document.createElement("style");
          css.type = "text/css";
          css.innerHTML = '.tingle-modal-box { width: ' + this.config.width + 'px; left: 0 !important; } .tingle-modal-box__content{ padding: 0; }';
          document.body.appendChild(css);

          appDimensions = {
            width: wWidth,
            height: wHeight
          };
        }
      }

      this.appDimensions = appDimensions;
    }

    /**
     * Set custom metrics to be sent to EasyCheckout
     */

  }, {
    key: 'setMetrics',
    value: function setMetrics(medium, campaign, content, locationHref, isNossa) {
      (0, _utils.LOG)('[APALoader][referrer]', (0, _utils.setCustomreferrer)(document.referrer));
      (0, _utils.LOG)('[APALoader][utm_source]', (0, _utils.getParameterByName)('utm_source'));

      this.data = _extends({
        meio: medium,
        campaign: campaign,
        content: content
      }, _extends({
        dispositivo: (0, _utils.getCurrDevice)(),
        origem: (0, _utils.setCustomreferrer)(document.referrer),
        plataforma: 'site'
      }, locationHref ? { url: locationHref } : {}), {
        isNossa: isNossa
      });

      if (this.reference.config.getMetrics()) {
        this.data = _extends({}, this.data, this.reference.config.getMetrics());
      }

      // override source(origem) if utm_source exists in the url
      if ((0, _utils.getParameterByName)('utm_source')) {
        this.data = _extends({}, this.data, {
          origem: (0, _utils.getParameterByName)('utm_source')
        });
      }

      // override editoria if custom referrer exists
      var queryString = window.location.search ? (0, _utils.parseQueryString)(window.location.search) : [];
      if (queryString['referrer'] && queryString['referrer'].match(/.clicrbs.com.br/)) {
        (0, _utils.extractInfoFromURl)(queryString['referrer']);
        this.data = _extends({}, this.data, (0, _utils.extractInfoFromURl)(queryString['referrer']));
      }

      (0, _utils.LOG)('[ APALoader ] Metrics', this.data);
    }

    /**
     * Set iframe content and open the modal
     */

  }, {
    key: 'triggerModal',
    value: function triggerModal(offerId) {
      var self = this;
      var apaUrl = self.loadUrlOffer(offerId, this.data);
      var isLogged = (0, _utils.getCookie)('nossaSession') || (0, _utils.getCookie)('nossaUid');

      if (!isLogged && (0, _utils.isFacebookNavigator)()) {
        return (0, _utils.redirectToNossaSite)(offerId);
      }

      self.modal.setContent('<iframe id="APASite" src="' + apaUrl + '" width="' + self.config.width + '" height="' + self.config.height + '" frameborder="0" scrolling="no"></iframe>');
      setTimeout(function () {
        return self.modal.open();
      }, 200);
    }

    /**
     * Open modal based on data-offer-id
     */

  }, {
    key: 'openModal',
    value: function openModal(e) {
      var self = this;

      // Get attributes from target button
      var offerId = e.target.getAttribute('data-apa-loader-offer') || null;
      var medium = e.target.getAttribute('data-apa-loader-medium') || '';
      var campaign = e.target.getAttribute('data-apa-loader-campaign') || '';
      var content = e.target.getAttribute('data-apa-loader-content') || '';
      var isNossa = e.target.getAttribute('data-apa-loader-nossa') || false;

      // Set metrics
      this.setMetrics(medium, campaign, content, window.location.href, isNossa);

      // Open modal
      this.triggerModal(offerId);
    }

    /**
     * Open modal based on href link
     */

  }, {
    key: 'openLink',
    value: function openLink(e, link) {
      var self = this;
      var LINK_URL = decodeURI(link) || '';
      var queryString = LINK_URL.split('?');
      var metrics = queryString[1] ? (0, _utils.parseQueryString)(queryString[1]) : [];

      (0, _utils.LOG)('[LINK_URL]', LINK_URL);
      (0, _utils.LOG)('[metrics]', metrics);

      // Get attributes from target button
      var REGEX = /oferta\/(\d+)|\/oferta%2f(\d+)/gi;
      (0, _utils.LOG)('[REGEX]', REGEX);
      var matches = REGEX.exec(LINK_URL);
      (0, _utils.LOG)('[ matches ]', matches, this.findOfferId(matches));
      var offerId = this.findOfferId(matches);
      var medium = metrics.utm_medium || '';
      var campaign = metrics.utm_campaign || '';
      var content = metrics.utm_content || '';
      var isNossa = metrics.nossa;

      // Set metrics
      this.setMetrics(medium, campaign, content, null, isNossa);

      // Open modal
      this.triggerModal(offerId);
    }

    /**
     * Find offer ID in regexp array
     * @param  {[type]} array Regexp array
     * @return {[type]} string|number Offer ID
     */

  }, {
    key: 'findOfferId',
    value: function findOfferId(array) {
      if (array) {
        var matchedValue = void 0;
        Object.keys(array).forEach(function (value, key) {
          var val = parseInt(array[value]);
          if (!isNaN(val) && value !== 'index') {
            matchedValue = val;
          }
        });

        return matchedValue;
      }

      return 0;
    }

    /**
     * Close tingle modal
     * @return {[type]} Return function to close EC modal
     */

  }, {
    key: 'closeModal',
    value: function closeModal() {
      return this.modal.close();
    }

    /**
     * Load iframe url based on params
     * @param  {[type]} offerId
     * @param  {[type]} data    Genreal data (metrics, sizes)
     * @return {[type]}         Return the complete url iframe
     */

  }, {
    key: 'loadUrlOffer',
    value: function loadUrlOffer(offerId, data) {
      var queryString = window.location.search ? (0, _utils.parseQueryString)(window.location.search) : [];
      queryString['utm_campaign'] = data.campaign ? encodeURI(data.campaign) : queryString['utm_campaign'];
      queryString['utm_content'] = queryString['utm_content'] ? encodeURI(data.content + '|' + queryString['utm_content']) : data.content;
      queryString['utm_medium'] = encodeURI(queryString['utm_medium'] ? '' + queryString['utm_medium'] : "none"); // dont use (none)
      queryString['utm_source'] = queryString['utm_source'] ? queryString['utm_source'] : encodeURI(data.origem.replace(/(http(s)?:\/\/)/g, ''));
      queryString['nossa'] = data.isNossa ? encodeURI(data.isNossa) : false;

      Object.keys(queryString).forEach(function (value, key) {
        if (queryString[value] === '') {
          delete queryString[value];
        }
      });

      return this.config.baseURL + '/' + offerId + '/revisao/' + (0, _utils.stringifyObject)(queryString);
    }

    /**
     * Trigger click event on all elements with data-offer-id or *pagamento.clicrbs.com.br*
     * @return {[type]} [description]
     */

  }, {
    key: 'dispatcherElements',
    value: function dispatcherElements() {
      return document.querySelectorAll(this.config.offer.buttonsSelector);
    }

    /**
     * Function to be dispatched after the iframe is opened.
     * It also send the postMessage with metrics and size dimensions
     * @return {[type]} [description]
     */

  }, {
    key: 'appReady',
    value: function appReady() {
      var self = this;
      var iframe = document.getElementById("APASite").contentWindow;
      (0, _utils.LOG)('[APALoader]', 'Iframe', iframe);
      iframe.postMessage("APAIframeLoaded", self.config.baseURL);
      (0, _utils.LOG)('[APALoader]', 'open and send message to iframe');
      (0, _utils.LOG)('[APALoader]', { metrics: self.data });
      iframe.postMessage({ metrics: self.data, appDimensions: self.appDimensions }, self.config.baseURL);
    }
  }]);

  return APASiteContainer;
}();

exports.default = APASiteContainer;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (t, o) {
   true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (o),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = o() : t.tingle = o();
}(undefined, function () {
  function t(t) {
    var o = { onClose: null, onOpen: null, beforeOpen: null, beforeClose: null, stickyFooter: !1, footer: !1, cssClass: [], closeLabel: "Close", closeMethods: ["overlay", "button", "escape"] };this.opts = r({}, o, t), this.init();
  }function o() {
    this.modalBoxFooter && (this.modalBoxFooter.style.width = this.modalBox.clientWidth + "px", this.modalBoxFooter.style.left = this.modalBox.offsetLeft + "px");
  }function e() {
    this.modal = document.createElement("div"), this.modal.classList.add("tingle-modal"), 0 !== this.opts.closeMethods.length && this.opts.closeMethods.indexOf("overlay") !== -1 || this.modal.classList.add("tingle-modal--noOverlayClose"), this.modal.style.display = "none", this.opts.cssClass.forEach(function (t) {
      "string" == typeof t && this.modal.classList.add(t);
    }, this), this.opts.closeMethods.indexOf("button") !== -1 && (this.modalCloseBtn = document.createElement("button"), this.modalCloseBtn.classList.add("tingle-modal__close"), this.modalCloseBtnIcon = document.createElement("span"), this.modalCloseBtnIcon.classList.add("tingle-modal__closeIcon"), this.modalCloseBtnIcon.innerHTML = "×", this.modalCloseBtnLabel = document.createElement("span"), this.modalCloseBtnLabel.classList.add("tingle-modal__closeLabel"), this.modalCloseBtnLabel.innerHTML = this.opts.closeLabel, this.modalCloseBtn.appendChild(this.modalCloseBtnIcon), this.modalCloseBtn.appendChild(this.modalCloseBtnLabel)), this.modalBox = document.createElement("div"), this.modalBox.classList.add("tingle-modal-box"), this.modalBoxContent = document.createElement("div"), this.modalBoxContent.classList.add("tingle-modal-box__content"), this.modalBox.appendChild(this.modalBoxContent), this.opts.closeMethods.indexOf("button") !== -1 && this.modal.appendChild(this.modalCloseBtn), this.modal.appendChild(this.modalBox);
  }function s() {
    this.modalBoxFooter = document.createElement("div"), this.modalBoxFooter.classList.add("tingle-modal-box__footer"), this.modalBox.appendChild(this.modalBoxFooter);
  }function i() {
    this._events = { clickCloseBtn: this.close.bind(this), clickOverlay: l.bind(this), resize: this.checkOverflow.bind(this), keyboardNav: n.bind(this) }, this.opts.closeMethods.indexOf("button") !== -1 && this.modalCloseBtn.addEventListener("click", this._events.clickCloseBtn), this.modal.addEventListener("mousedown", this._events.clickOverlay), window.addEventListener("resize", this._events.resize), document.addEventListener("keydown", this._events.keyboardNav);
  }function n(t) {
    this.opts.closeMethods.indexOf("escape") !== -1 && 27 === t.which && this.isOpen() && this.close();
  }function l(t) {
    this.opts.closeMethods.indexOf("overlay") !== -1 && !d(t.target, "tingle-modal") && t.clientX < this.modal.clientWidth && this.close();
  }function d(t, o) {
    for (; (t = t.parentElement) && !t.classList.contains(o);) {}return t;
  }function a() {
    this.opts.closeMethods.indexOf("button") !== -1 && this.modalCloseBtn.removeEventListener("click", this._events.clickCloseBtn), this.modal.removeEventListener("mousedown", this._events.clickOverlay), window.removeEventListener("resize", this._events.resize), document.removeEventListener("keydown", this._events.keyboardNav);
  }function r() {
    for (var t = 1; t < arguments.length; t++) {
      for (var o in arguments[t]) {
        arguments[t].hasOwnProperty(o) && (arguments[0][o] = arguments[t][o]);
      }
    }return arguments[0];
  }function h() {
    var t,
        o = document.createElement("tingle-test-transition"),
        e = { transition: "transitionend", OTransition: "oTransitionEnd", MozTransition: "transitionend", WebkitTransition: "webkitTransitionEnd" };for (t in e) {
      if (void 0 !== o.style[t]) return e[t];
    }
  }var c = h();return t.prototype.init = function () {
    this.modal || (e.call(this), i.call(this), document.body.insertBefore(this.modal, document.body.firstChild), this.opts.footer && this.addFooter());
  }, t.prototype.destroy = function () {
    null !== this.modal && (a.call(this), this.modal.parentNode.removeChild(this.modal), this.modal = null);
  }, t.prototype.open = function () {
    var t = this;"function" == typeof t.opts.beforeOpen && t.opts.beforeOpen(), this.modal.style.removeProperty ? this.modal.style.removeProperty("display") : this.modal.style.removeAttribute("display"), this._scrollPosition = window.pageYOffset, document.body.classList.add("tingle-enabled"), document.body.style.top = -this._scrollPosition + "px", this.setStickyFooter(this.opts.stickyFooter), this.modal.classList.add("tingle-modal--visible"), c ? this.modal.addEventListener(c, function o() {
      "function" == typeof t.opts.onOpen && t.opts.onOpen.call(t), t.modal.removeEventListener(c, o, !1);
    }, !1) : "function" == typeof t.opts.onOpen && t.opts.onOpen.call(t), this.checkOverflow();
  }, t.prototype.isOpen = function () {
    return !!this.modal.classList.contains("tingle-modal--visible");
  }, t.prototype.close = function () {
    if ("function" == typeof this.opts.beforeClose) {
      var t = this.opts.beforeClose.call(this);if (!t) return;
    }document.body.classList.remove("tingle-enabled"), window.scrollTo(0, this._scrollPosition), document.body.style.top = null, this.modal.classList.remove("tingle-modal--visible");var o = this;c ? this.modal.addEventListener(c, function t() {
      o.modal.removeEventListener(c, t, !1), o.modal.style.display = "none", "function" == typeof o.opts.onClose && o.opts.onClose.call(this);
    }, !1) : (o.modal.style.display = "none", "function" == typeof o.opts.onClose && o.opts.onClose.call(this));
  }, t.prototype.setContent = function (t) {
    "string" == typeof t ? this.modalBoxContent.innerHTML = t : (this.modalBoxContent.innerHTML = "", this.modalBoxContent.appendChild(t));
  }, t.prototype.getContent = function () {
    return this.modalBoxContent;
  }, t.prototype.addFooter = function () {
    s.call(this);
  }, t.prototype.setFooterContent = function (t) {
    this.modalBoxFooter.innerHTML = t;
  }, t.prototype.getFooterContent = function () {
    return this.modalBoxFooter;
  }, t.prototype.setStickyFooter = function (t) {
    this.isOverflow() || (t = !1), t ? this.modalBox.contains(this.modalBoxFooter) && (this.modalBox.removeChild(this.modalBoxFooter), this.modal.appendChild(this.modalBoxFooter), this.modalBoxFooter.classList.add("tingle-modal-box__footer--sticky"), o.call(this), this.modalBoxContent.style["padding-bottom"] = this.modalBoxFooter.clientHeight + 20 + "px") : this.modalBoxFooter && (this.modalBox.contains(this.modalBoxFooter) || (this.modal.removeChild(this.modalBoxFooter), this.modalBox.appendChild(this.modalBoxFooter), this.modalBoxFooter.style.width = "auto", this.modalBoxFooter.style.left = "", this.modalBoxContent.style["padding-bottom"] = "", this.modalBoxFooter.classList.remove("tingle-modal-box__footer--sticky")));
  }, t.prototype.addFooterBtn = function (t, o, e) {
    var s = document.createElement("button");return s.innerHTML = t, s.addEventListener("click", e), "string" == typeof o && o.length && o.split(" ").forEach(function (t) {
      s.classList.add(t);
    }), this.modalBoxFooter.appendChild(s), s;
  }, t.prototype.resize = function () {
    console.warn("Resize is deprecated and will be removed in version 1.0");
  }, t.prototype.isOverflow = function () {
    var t = window.innerHeight,
        o = this.modalBox.clientHeight;return o >= t;
  }, t.prototype.checkOverflow = function () {
    this.modal.classList.contains("tingle-modal--visible") && (this.isOverflow() ? this.modal.classList.add("tingle-modal--overflow") : this.modal.classList.remove("tingle-modal--overflow"), !this.isOverflow() && this.opts.stickyFooter ? this.setStickyFooter(!1) : this.isOverflow() && this.opts.stickyFooter && (o.call(this), this.setStickyFooter(!0)));
  }, { modal: t };
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../css-loader/index.js!./tingle.css", function() {
			var newContent = require("!!../../css-loader/index.js!./tingle.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "/* ----------------------------------------------------------- */\n/* == tingle v0.13.2 */\n/* ----------------------------------------------------------- */\n\n.tingle-modal * {\n  box-sizing: border-box;\n}\n\n.tingle-modal {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1000;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  visibility: hidden;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  overflow: hidden;\n  -webkit-overflow-scrolling: touch;\n  background: rgba(0, 0, 0, .8);\n  opacity: 0;\n  cursor: pointer;\n  -webkit-transition: -webkit-transform .2s ease;\n  transition: -webkit-transform .2s ease;\n  transition: transform .2s ease;\n  transition: transform .2s ease, -webkit-transform .2s ease;\n}\n\n/* confirm and alerts\n-------------------------------------------------------------- */\n\n.tingle-modal--confirm .tingle-modal-box {\n  text-align: center;\n}\n\n/* modal\n-------------------------------------------------------------- */\n\n.tingle-modal--noOverlayClose {\n  cursor: default;\n}\n\n.tingle-modal--noClose .tingle-modal__close {\n  display: none;\n}\n\n.tingle-modal__close {\n  position: fixed;\n  top: 10px;\n  right: 28px;\n  z-index: 1000;\n  padding: 0;\n  width: 5rem;\n  height: 5rem;\n  border: none;\n  background-color: transparent;\n  color: #f0f0f0;\n  font-size: 6rem;\n  font-family: monospace;\n  line-height: 1;\n  cursor: pointer;\n  -webkit-transition: color .3s ease;\n  transition: color .3s ease;\n}\n\n.tingle-modal__closeLabel {\n  display: none;\n}\n\n.tingle-modal__close:hover {\n  color: #fff;\n}\n\n.tingle-modal-box {\n  position: relative;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  margin-top: auto;\n  margin-bottom: auto;\n  width: 60%;\n  border-radius: 4px;\n  background: #fff;\n  opacity: 1;\n  cursor: auto;\n  -webkit-transition: -webkit-transform .3s cubic-bezier(.175, .885, .32, 1.275);\n  transition: -webkit-transform .3s cubic-bezier(.175, .885, .32, 1.275);\n  transition: transform .3s cubic-bezier(.175, .885, .32, 1.275);\n  transition: transform .3s cubic-bezier(.175, .885, .32, 1.275), -webkit-transform .3s cubic-bezier(.175, .885, .32, 1.275);\n  -webkit-transform: scale(.8);\n  -ms-transform: scale(.8);\n  transform: scale(.8);\n}\n\n.tingle-modal-box__content {\n  padding: 3rem 3rem;\n}\n\n.tingle-modal-box__footer {\n  padding: 1.5rem 2rem;\n  width: auto;\n  border-bottom-right-radius: 4px;\n  border-bottom-left-radius: 4px;\n  background-color: #f5f5f5;\n  cursor: auto;\n}\n\n.tingle-modal-box__footer::after {\n  display: table;\n  clear: both;\n  content: \"\";\n}\n\n.tingle-modal-box__footer--sticky {\n  position: fixed;\n  bottom: -200px; /* TODO : find a better way */\n  z-index: 10001;\n  opacity: 1;\n  -webkit-transition: bottom .3s ease-in-out .3s;\n  transition: bottom .3s ease-in-out .3s;\n}\n\n/* state\n-------------------------------------------------------------- */\n\n.tingle-enabled {\n  position: fixed;\n  overflow: hidden;\n  left: 0;\n  right: 0;\n}\n\n.tingle-modal--visible .tingle-modal-box__footer {\n  bottom: 0;\n}\n\n.tingle-enabled .tingle-content-wrapper {\n  -webkit-filter: blur(8px);\n  filter: blur(8px);\n}\n\n.tingle-modal--visible {\n  visibility: visible;\n  opacity: 1;\n}\n\n.tingle-modal--visible .tingle-modal-box {\n  -webkit-transform: scale(1);\n  -ms-transform: scale(1);\n  transform: scale(1);\n}\n\n.tingle-modal--overflow {\n  overflow-y: scroll;\n  padding-top: 8vh;\n}\n\n/* btn\n-------------------------------------------------------------- */\n\n.tingle-btn {\n  display: inline-block;\n  margin: 0 .5rem;\n  padding: 1rem 2rem;\n  border: none;\n  background-color: grey;\n  box-shadow: none;\n  color: #fff;\n  vertical-align: middle;\n  text-decoration: none;\n  font-size: inherit;\n  font-family: inherit;\n  line-height: normal;\n  cursor: pointer;\n  -webkit-transition: background-color .4s ease;\n  transition: background-color .4s ease;\n}\n\n.tingle-btn--primary {\n  background-color: #3498db;\n}\n\n.tingle-btn--danger {\n  background-color: #e74c3c;\n}\n\n.tingle-btn--default {\n  background-color: #34495e;\n}\n\n.tingle-btn--pull-left {\n  float: left;\n}\n\n.tingle-btn--pull-right {\n  float: right;\n}\n\n/* responsive\n-------------------------------------------------------------- */\n\n@media (max-width : 540px) {\n  .tingle-modal {\n    top: 0px;\n    display: block;\n    padding-top: 60px;\n    width: 100%;\n  }\n\n  .tingle-modal-box {\n    width: auto;\n    border-radius: 0;\n  }\n\n  .tingle-modal-box__content {\n    overflow-y: scroll;\n  }\n\n  .tingle-modal--noClose {\n    top: 0;\n  }\n\n  .tingle-modal--noOverlayClose {\n    padding-top: 0;\n  }\n\n  .tingle-modal-box__footer .tingle-btn {\n    display: block;\n    float: none;\n    margin-bottom: 1rem;\n    width: 100%;\n  }\n\n  .tingle-modal__close {\n    top: 0;\n    right: 0;\n    left: 0;\n    display: block;\n    width: 100%;\n    height: 60px;\n    border: none;\n    background-color: #2c3e50;\n    box-shadow: none;\n    color: #fff;\n    line-height: 55px;\n  }\n\n  .tingle-modal__closeLabel {\n    display: inline-block;\n    vertical-align: middle;\n    font-size: 1.5rem;\n    font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\n  }\n\n  .tingle-modal__closeIcon {\n    display: inline-block;\n    margin-right: .5rem;\n    vertical-align: middle;\n    font-size: 4rem;\n  }\n}\n\n@supports ((-webkit-backdrop-filter: blur(12px)) or (backdrop-filter: blur(12px))) {\n  .tingle-modal {\n    -webkit-backdrop-filter: blur(20px);\n    backdrop-filter: blur(20px);\n  }\n\n  @media (max-width : 540px) {\n    .tingle-modal {\n      -webkit-backdrop-filter: blur(8px);\n      backdrop-filter: blur(8px);\n    }\n  }\n\n  .tingle-enabled .tingle-content-wrapper {\n    -webkit-filter: none;\n    filter: none;\n  }\n}\n", ""]);

// exports


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(12);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./main.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./main.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".tingle-modal {\n  z-index: 999999;\n  backdrop-filter: none !important;\n  -webkit-backdrop-filter: none !important;\n}\n.tingle-modal-box__content {\n  padding-left: 0px;\n  padding-right: 0px;\n  text-align: center;\n}\n.tingle-modal--overflow {\n  padding-top: 0;\n}\n.tingle-modal-box {\n  width: 320px;\n  background: transparent !important;\n  -webkit-border-radius: none;\n  -moz-border-radius: none;\n  border-radius: none;\n}\n.tingle-enabled {\n  /* position: inherit !important; */\n  -webkit-overflow-scrolling: none;\n}\niframe {\n  border-radius: 5px;\n}\n.tingle-modal-box {\n  background: transparent !important;\n} \n\n@media (max-width: 540px) {\n  /* .tingle-modal-box {\n    left: calc(50% - 160px);\n  } */\n  .tingle-modal {\n    /* display: inline-flex; */\n  }\n}\n", ""]);

// exports


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = {"name":"apa-loader","description":"APA-LOADER is a embed solution to APA-SITE implementation","version":"1.9.4","dependencies":{"babel-core":"^6.26.0","babel-loader":"^7.1.2","babel-preset-env":"^1.6.1","babel-preset-es2015":"^6.24.1","babel-preset-react":"^6.24.1","babel-preset-stage-0":"^6.24.1","css-loader":"^0.28.9","html-webpack-plugin":"^2.30.1","style-loader":"^0.19.1","tingle.js":"^0.13.0","webpack":"^3.10.0","webpack-dev-server":"^2.11.5","webpack-merge":"^4.1.2"},"scripts":{"start":"webpack-dev-server --config development.js --open","build":"webpack --config production.js"},"author":"","license":"ISC"}

/***/ })
/******/ ]);
});
//# sourceMappingURL=apa-loader.js.map