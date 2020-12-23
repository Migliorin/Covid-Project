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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return _log; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return _device; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _debug; });
/* unused harmony export _target */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return getTargetsURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return testContentPolice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getPassback; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return getCookie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return triggerEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return addEventListener; });
/* unused harmony export hasClass */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return addClass; });
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}
/* MODULE ADS - Helper Functions */

/** Overwrite default console.log and set a custom layer */


var _log = function _log() {
  var _console;

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  } // eslint-disable-line


  var newArgs = Array.prototype.slice.call(args);
  var hours = '';
  var minutes = '';
  var seconds = '';
  var intHours = 0;
  var intMinutes = 0;
  var intSeconds = 0;
  var today = '';
  today = new Date();
  intHours = today.getHours();
  intMinutes = today.getMinutes();
  intSeconds = today.getSeconds();

  if (intHours < 10) {
    hours = "0".concat(intHours);
  } else {
    hours = intHours;
  }

  if (intMinutes < 10) {
    minutes = "0".concat(intMinutes);
  } else {
    minutes = intMinutes;
  }

  if (intSeconds < 10) {
    seconds = "0".concat(intSeconds);
  } else {
    seconds = intSeconds;
  }

  newArgs.unshift('%cMODULE ADS', 'color: #383636; font-weight: 600; text-transform: uppercase; border: 1px solid #5f5e5e; padding-left: 1px; padding-right: 1px;', '[DEBUG: ON]', "[".concat(hours, ":").concat(minutes, ":").concat(seconds, "]")); // eslint-disable-line

  (_console = console).log.apply(_console, _toConsumableArray(newArgs));
};
/** Get user Agent and return users current device */


var _device = function _device() {
  return window.navigator.userAgent.match(/Tablet|iPad/i) ? 'tablet' : navigator.userAgent.match(/IEMobile|Windows Phone|Lumia|Android|webOS|iPhone|iPod|Blackberry|PlayBook|BB10|Mobile Safari|Opera Mini|\bCrMo\/|Opera Mobi/i) ? 'mobile' : 'desktop';
}; // eslint-disable-line

/** Check */


var _debug = function _debug() {
  return typeof window !== 'undefined' && (window.location.href.indexOf('module-ads-debug') !== -1 || getCookie('module-ads-debug') === 'true');
}; // eslint-disable-line

/** Check */


var _target = function _target() {
  return typeof window !== 'undefined' && (window.location.href.indexOf('module-ads-target') !== -1 || getCookie('module-ads-target') !== '');
}; // eslint-disable-line


var getCookie = function getCookie(cname) {
  var name = "".concat(cname, "=");
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
/** Dispatch custom event */


var triggerEvent = function triggerEvent(el, eventName, options) {
  var event;

  if (typeof window.CustomEvent === 'function') {
    event = new CustomEvent(eventName, options); // eslint-disable-line
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(eventName, true, true, options);
  }

  el.dispatchEvent(event);
};
/** Criar targets de testes para as publicidades */


var getTargetsURL = function getTargetsURL(name) {
  var url = location.href; // eslint-disable-line

  var name_ = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]"); // eslint-disable-line

  var regexS = "[\\?&]" + name_ + "=([^&#]*)"; // eslint-disable-line

  var regex = new RegExp(regexS);
  var results = regex.exec(url);
  return results == null ? null : results[1];
};
/** Cria teste de content polices */


var testContentPolice = function testContentPolice(polices) {
  var url = /-([0-9A-z]+)\.html/.exec(window.location.href); // eslint-disable-line

  var content_id = '';

  if (url && url[1]) {
    content_id = url[1]; // eslint-disable-line
  }

  return polices.findIndex(function (content) {
    return content === content_id;
  });
};
/** getPassback function aux */


var getPassback = function getPassback(passback, passback_item, itens) {
  _log('passback', passback);

  _log('passback_item', passback_item);

  _log('adserver_page_passback', itens); // const passback_itens = passback.item;


  var passback_conten_infos = passback.findIndex(function (item) {
    return item === passback_item;
  }); // return passback_infos;
  // return passback_itens.findIndex(item => item === passback_item);

  return itens[passback_conten_infos];
};

var addEventListener = function addEventListener(el, eventName, handler) {
  if (el.addEventListener) {
    el.addEventListener(eventName, handler);
  } else {
    el.attachEvent("on".concat(eventName), function () {
      handler.call(el);
    });
  }
};

var hasClass = function hasClass(element, className) {
  return " ".concat(element.className, " ").indexOf(" ".concat(className, " ")) > -1;
};
/** Function to add class in elements */


var addClass = function addClass(el, className) {
  var element = el;

  if (element.classList) {
    // eslint-disable-line
    element.classList.add(className);
  } else if (!hasClass(element, className)) {
    element.className += " ".concat(className);
  }
};



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "moduleADS", function() { return moduleADS; });
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
/* MODULE ADS */
// Helpers




var ModuleADS = function ModuleADS() {
  var _this = this;

  _classCallCheck(this, ModuleADS);
  /** General Public Configs */


  this.DEBUG = false;
  this.DEVICE = 'desktop';
  this.PAGE = 'home';
  this.VERSION = '1.1.8';
  /** General Private Configs */

  var module_update_timeout = 500;
  var module_ads_site = '';
  var module_configs_json = '';
  var module_slots_map = '';
  var module_slots_map_all = '';
  var module_custom_formats = '';
  var module_all_page_slots_ids = '';
  var module_page_slots_ids = '';
  var module_page_slots_map = '';
  var module_page_section = '';
  var module_page_polices = '';
  var module_page_passback = '';
  var module_ads_test_section = ''; // let module_pages = '';

  var module_label_ads = '';
  var module_custom_css = '';
  var module_debug_css = '';
  var module_lazyload = '';
  var module_refresh_ads_enable = true;
  var module_refresh_ads_time = 60;
  var module_tags = '';
  var module_user = '';
  var module_targets_test = '';
  var moduleAdserver = {};
  var modulePrebid = {};
  var module_custom_config = '';
  var adserver_account_id = 0;
  var adserver_name = false;
  var adserver_static_host = '';
  var prebid_enable = false;
  var prebid_version = false;
  var prebid_timeout = 2000;
  var module_custom_params = {};
  var module_custom_slots = null;
  this.module_ready = false;
  this.prebid_ready = false;
  this.adserver_ready = false;
  this.adserver_ads_rendered = false;
  /** Get external data and return a Promisse */

  var getXMLHttpRequest = function getXMLHttpRequest(src) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      method: 'GET',
      mimeType: 'application/json'
    };
    var callback = arguments.length > 2 ? arguments[2] : undefined;
    var request = new XMLHttpRequest();
    request.overrideMimeType(options.mimeType);
    request.open(options.method, src, true);

    request.onreadystatechange = function () {
      if (request.readyState === 4 && request.status === 200) {
        callback(request.responseText);
      }
    };

    request.send(null);
  };
  /** Load External Vendor Scripts */


  var loadScripts = function loadScripts(src, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    document.head.appendChild(script);

    script.onload = function () {
      return callback();
    };
  };
  /** Listen to some module control events ... */


  var startModuleEvents = function startModuleEvents() {
    /** Listen to this.prebid_ready trigger  ... */
    if (prebid_enable) {
      Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* addEventListener */ "e"])(document, 'prebid-ready', function () {
        _this.prebid_ready = true;

        if (prebid_enable && _this.prebid_ready && _this.adserver_ready || !prebid_enable && !_this.prebid_ready && _this.adserver_ready) {
          _this.module_ready = true;
          Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* triggerEvent */ "j"])(document, 'module-ready');
        }
      });
    }
    /** Listen to this.adserver_ready trigger  ... */


    Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* addEventListener */ "e"])(document, 'adserver-ready', function () {
      _this.adserver_ready = true;

      if (prebid_enable && _this.prebid_ready && _this.adserver_ready || !prebid_enable && !_this.prebid_ready && _this.adserver_ready) {
        _this.module_ready = true;
        Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* triggerEvent */ "j"])(document, 'module-ready');
      }
    });
    /** Listen to this.adserver_ready trigger  ... */

    Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* addEventListener */ "e"])(document, 'adserver-ads-rendered', function () {
      _this.adserver_ads_rendered = true;
    });
  };
  /** Parse slots map and return only the slots for the current page */


  var parsePageTPL = function parsePageTPL() {
    var pageTPL = [];
    var slots_map = module_slots_map[_this.DEVICE];
    if (_this.DEBUG) Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* _log */ "c"])('[ModuleADS][slots]', _this.DEVICE, slots_map);

    try {
      /** Filter only the slots that are used in the current page */
      for (var i = 0; i < slots_map.length; i++) {
        for (var j = 0; j < module_page_slots_ids.length; j++) {
          /** Check if current slot is on the page slots list */
          if (slots_map[i].id === module_page_slots_ids[j]) {
            /** if slot type is intext-native */
            if (slots_map[i].type === 'intext-native') {
              pageTPL.push(slots_map[i]);
            } else if (document.getElementById(slots_map[i].id)) {
              /** Check if current slot is on the page DOM */
              pageTPL.push(slots_map[i]);
            }
          }
        }
      }
    } catch (error) {
      console.log('[ModuleADS] Error parsePageTPL: ', error);
    }

    return pageTPL;
  };
  /** Parse in a variable a dinamic slot */


  var parseDinamicsSlots = function parseDinamicsSlots(page, custom_slots, configs) {
    var slotsTPL = [];
    if (_this.DEBUG) Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* _log */ "c"])('[ModuleADS][parseDinamicsSlots][dinamics slots]', page, custom_slots, configs);
    if (_this.DEBUG) Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* _log */ "c"])('[ModuleADS][parseDinamicsSlots][dinamics slots length]', custom_slots.length);
    if (_this.DEBUG) Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* _log */ "c"])('[ModuleADS][parseDinamicsSlots][dinamics slots]', configs[page]);

    if (custom_slots.length > 1) {
      for (var i = 0; i < custom_slots.length; i++) {
        if (page !== 'minamin') {
          slotsTPL.push({
            id: custom_slots[i].id,
            sizes: configs[page].sizes,
            target: configs[page].target,
            type: configs[page].type,
            prebid: configs[page].prebid,
            tag: custom_slots[i].tag
          });
        } else {
          slotsTPL.push({
            id: custom_slots[i].id,
            sizes: configs[page].sizes,
            target: custom_slots[i].target,
            type: configs[page].type,
            prebid: configs[page].prebid,
            tag: custom_slots[i].tag
          });
        }
      }
    } else {
      switch (page) {
        case 'minamin':
          slotsTPL.push({
            id: custom_slots[0].id,
            sizes: configs[page].sizes,
            target: custom_slots[0].target,
            type: configs[page].type,
            prebid: configs[page].prebid,
            tag: custom_slots[0].tag
          });
          break;

        default:
          slotsTPL.push({
            id: custom_slots[0].id,
            sizes: configs[page].sizes,
            target: configs[page].target,
            type: configs[page].type,
            prebid: configs[page].prebid,
            tag: custom_slots[0].tag
          });
          break;
      }
    }

    if (_this.DEBUG) Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* _log */ "c"])('[ModuleADS][parseDinamicsSlots][slotsTPL]', slotsTPL);
    return slotsTPL;
  };
  /** Get the config JSON data via HttpRequest and then setup module */


  var setup = function setup(src) {
    getXMLHttpRequest(src, {
      method: 'GET',
      mimeType: 'application/json'
    }, function (response) {
      var data = JSON.parse(response);
      if (!data.adserver) return console.log('[ModuleADS] Warning: Invalid parameter "adserver".  ModuleADS off ...');
      module_all_page_slots_ids = data.pages;
      /** If custom_slots are set, ignore page_slots_ids and updates only the slots that are passed via module params */

      module_page_slots_ids = module_custom_slots || module_all_page_slots_ids[_this.PAGE];
      module_slots_map = data.slots_map;
      module_slots_map_all = data.slots_map;
      module_ads_site = data.site;
      module_page_slots_map = parsePageTPL();
      module_label_ads = data.label;
      module_targets_test = Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* getTargetsURL */ "h"])('module-ads-target') ? Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* getTargetsURL */ "h"])('module-ads-target') : '';
      module_custom_css = data.style_custom || '';
      module_debug_css = data.style_debug || '';
      module_lazyload = data.lazyload || false;
      module_page_polices = data.polices || '';
      module_refresh_ads_enable = data.refresh_ads.enable;
      module_refresh_ads_time = data.refresh_ads.time || 60;
      module_custom_config = data.custom_config || '';
      module_page_passback = data.passback || '';
      module_custom_formats = data.custom_formats || ''; // module_pages = data.pages || '';

      if (Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* getCookie */ "f"])('module-ads-target') !== '') {
        module_targets_test = Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* getCookie */ "f"])('module-ads-target');
      }

      adserver_account_id = data.adunit;
      adserver_name = data.adserver;
      adserver_static_host = data.static_host || '';
      prebid_enable = data.prebid.enable;
      prebid_version = data.prebid ? data.prebid.version : false;
      prebid_timeout = data.prebid.timeout ? data.prebid.timeout : 2000;
      /** Listen to some module control events ... */

      startModuleEvents();
      /** Load Adserver scripts and setup module ... */

      loadScripts("".concat(adserver_static_host, "module-ads.").concat(adserver_name, ".min.js"), function () {
        if (_this.DEBUG) Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* _log */ "c"])('[ModuleADS] AdServer script loaded ...');
        moduleAdserver = ModuleAdServer || {};
        moduleAdserver.setup({
          debug: _this.DEBUG,
          device: _this.DEVICE,
          site: module_ads_site,
          account_id: adserver_account_id,
          section: module_page_section,
          slots_page_map: module_page_slots_map,
          slots_page_map_all: module_slots_map_all,
          slots_page_type: module_page_slots_ids,
          custom_formats: module_custom_formats,
          polices: module_page_polices,
          passback: module_page_passback,
          label: module_label_ads,
          tags: module_tags,
          user: module_user,
          target: module_targets_test,
          custom_css: module_custom_css,
          debug_css: module_debug_css,
          lazyload: module_lazyload,
          refresh_ads_enable: module_refresh_ads_enable,
          refresh_ads_time: module_refresh_ads_time,
          custom_config: module_custom_config,
          page_type: _this.PAGE,
          try_render_ads: false,
          prebid_enable: prebid_enable
        });
      });
      /** Load Prebid scripts and setup module. Prebid Js exposes the pbjs variable on window ... */

      if (prebid_enable) {
        loadScripts("".concat(adserver_static_host, "module-ads.prebid.min.js"), function () {
          if (_this.DEBUG) Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* _log */ "c"])('[ModuleADS] Prebid script loaded ...');
          modulePrebid = ModulePrebid || {};
          modulePrebid.setup({
            debug: _this.DEBUG,
            device: _this.DEVICE,
            version: prebid_version,
            custom_params: module_custom_params,
            page_slots_ids: module_page_slots_ids,
            slots_map: module_slots_map[_this.DEVICE],
            slots_page_map: module_page_slots_map,
            target: module_targets_test,
            tags: module_tags,
            timeout: prebid_timeout,
            static_host: adserver_static_host
          });
        });
      }
      /** Call the Prebid bidders auction passing some callback functions */


      if (prebid_enable) {
        _this.prebidAuction(_this.adserverDisableForPrebid, _this.adserverDisplayAds);
      } else {
        /** Display Defined Ads */
        _this.adserverDisplayAds();
      }

      return _this;
    });
  };
  /** Receive callback and execute it when all vendors are loaded and the module is ready. */


  var executeNext = function executeNext(callback) {
    if (_this.module_ready) {
      callback();
    } else {
      Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* addEventListener */ "e"])(document, 'module-ready', function () {
        callback();
      });
    }
  };
  /** Parse Adserver Template */


  this.adserverParseTPL = function () {
    executeNext(function () {
      moduleAdserver.adserverParseTPL();
    });
  };
  /** Disable Adserver initial load */


  this.adserverDisableForPrebid = function () {
    executeNext(function () {
      moduleAdserver.adserverDisableForPrebid();
    });
  };
  /** Display Defined Ads */


  this.adserverDisplayAds = function () {
    executeNext(function () {
      moduleAdserver.adserverDisplayAds();
    });
  };
  /** Update module setup ... */


  this.adserverUpdate = function (data) {
    executeNext(function () {
      moduleAdserver.adserverUpdate(data);
    });
  };
  /** Create dinamic ads ... */


  this.adserverCreateDinamicSlots = function (data) {
    executeNext(function () {
      moduleAdserver.adserverCreateDinamicSlots(data);
    });
  };
  /** Cleaning up AdServer ... */


  this.adserverClear = function (slots) {
    executeNext(function () {
      moduleAdserver.adserverClear(slots);
    });
  };
  /** Call the Prebid bidders auction */


  this.prebidAuction = function (adserverDisableForPrebid, adserverDisplayAds) {
    executeNext(function () {
      modulePrebid.prebidAuction(adserverDisableForPrebid, adserverDisplayAds);
    });
  };
  /** Update module setup ... */


  this.prebidUpdate = function (data) {
    executeNext(function () {
      modulePrebid.prebidUpdate(data);
    });
  };
  /** Cleaning up Prebid ... */


  this.prebidClear = function (slots) {
    executeNext(function () {
      modulePrebid.prebidClear(slots);
    });
  };
  /** Cleaning up Prebid and Adserver slots ... */


  this.clear = function (slots) {
    if (_this.DEBUG) Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* _log */ "c"])('[ModuleADS] Clearing Ad Slots ...');
    if (prebid_enable) _this.prebidClear(slots);
    module_custom_slots = null;

    _this.adserverClear(slots);
  };
  /** Create dinamic ads */


  this.create = function (data) {
    if (_this.createDebouce) {
      clearTimeout(_this.createDebouce);
    }

    _this.createDebouce = setTimeout(function () {
      if (!_this.adserver_ads_rendered) {
        if (_this.DEBUG) Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* _log */ "c"])('[ModuleADS] Trying to run the create method... Waiting for the init method to finish running ...');
        return _this.create(data);
      }

      if (!data) return console.log('[ModuleADS] Warning: Initial parameters not sent. ModuleADS off ...');
      if (!data.page) return console.log('[ModuleADS] Warning: Page parameter not sent. ModuleADS off ...');
      if (!data.section) return console.log('[ModuleADS] Warning: Section parameter not sent. ModuleADS off ...');
      _this.DEBUG = data.debug || Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* _debug */ "a"])();
      _this.DEVICE = Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* _device */ "b"])();
      _this.PAGE = data.page;
      if (_this.DEBUG) Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* _log */ "c"])('[ModuleADS] Create Ad Page: ', _this.PAGE);
      if (_this.DEBUG) Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* _log */ "c"])("[DEBUG: ".concat(_this.DEBUG, "] Creating module in DEBUG mode ..."));
      if (_this.DEBUG) Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* _log */ "c"])('[ModuleADS] Creating Ad Slots: ', data.custom_slots ? data.custom_slots : 'ALL');
      /** Cleaning up Prebid and Adserver slots ... */

      _this.clear(data.custom_slots);

      module_custom_slots = data.custom_slots || null;
      /** Creating section param ... */

      module_page_section = data.section || null;
      if (_this.DEBUG) Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* _log */ "c"])('Section', /(i?)(\W|^)(capa|interna|detalhe)(\W|$)/.test(module_page_section));
      var test_section = /(i?)(\W|^)(capa|interna|detalhe)(\W|$)/.test(module_page_section); // eslint-disable-line

      if (test_section === false) {
        module_ads_test_section = "".concat(module_page_section, "/capa");
      } else {
        module_ads_test_section = module_page_section;
      }
      /** If custom_slots are set, ignore page_slots_ids and updates only the slots that are passed via module params */


      module_page_slots_ids = module_custom_slots || module_all_page_slots_ids[_this.PAGE];
      if (_this.DEBUG) Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* _log */ "c"])('[ModuleADS] Data configs: ', data);
      if (_this.DEBUG) Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* _log */ "c"])('[ModuleADS] Data configs: ', module_custom_config);
      module_page_slots_map = parseDinamicsSlots(data.page, data.custom_slots, module_custom_config);
      /** Cleaning up Prebid and Adserver slots ... */
      // this.clear(module_page_slots_map);

      if (data.custom_params) {
        module_tags = data.custom_params.tags || module_tags;
        module_user = data.custom_params.user || module_user;
      }
      /** Update google module setup */


      _this.adserverCreateDinamicSlots({
        slots_page_map: module_page_slots_map,
        section: module_ads_test_section,
        tags: module_tags,
        user: module_user,
        page_type: _this.PAGE,
        try_render_ads: true
      });
      /** Display Defined Ads */


      _this.adserverDisplayAds();

      return _this;
    }, module_update_timeout);
  };
  /** Cleaning up AdServer ... */


  this.adserverPassback = function (slots) {
    executeNext(function () {
      moduleAdserver.adserverPassback(slots);
    });
  };
  /** Passback call generic */


  this.passback = function (slot) {
    if (_this.DEBUG) Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* _log */ "c"])("[ModuleADS] Call passback google... ".concat(slot));
    /** passback google module setup */

    _this.adserverPassback({
      slot_passback: slot
    });
  };
  /** Update ads (Normally used on Single Page Applications(SPA) when push state) */


  this.update = function (data) {
    if (_this.updateDebouce) {
      clearTimeout(_this.updateDebouce);
    }

    _this.updateDebouce = setTimeout(function () {
      if (!_this.adserver_ads_rendered) {
        if (_this.DEBUG) Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* _log */ "c"])('[ModuleADS] Trying to run the update method... Waiting for the init method to finish running ...');
        return _this.update(data);
      }

      if (!data) return console.log('[ModuleADS] Warning: Initial parameters not sent. ModuleADS off ...');
      if (!data.page) return console.log('[ModuleADS] Warning: Page parameter not sent. ModuleADS off ...');
      if (!data.section) return console.log('[ModuleADS] Warning: Section parameter not sent. ModuleADS off ...');
      _this.DEBUG = data.debug || Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* _debug */ "a"])();
      _this.DEVICE = Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* _device */ "b"])();
      _this.PAGE = data.page;
      if (_this.DEBUG) Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* _log */ "c"])("[DEBUG: ".concat(_this.DEBUG, "] Updating module in DEBUG mode ..."));
      if (_this.DEBUG) Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* _log */ "c"])('[ModuleADS] Updating Ad Slots: ', data.custom_slots ? data.custom_slots : 'ALL');
      if (_this.DEBUG) Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* _log */ "c"])('[ModuleADS] Updating Ad Page: ', _this.PAGE);
      /** Cleaning up Prebid and Adserver slots ... */

      _this.clear(data.custom_slots);

      module_custom_slots = data.custom_slots || null;
      /** Updating section param ... */

      module_page_section = data.section || null;
      /** If custom_slots are set, ignore page_slots_ids and updates only the slots that are passed via module params */

      module_page_slots_ids = module_custom_slots || module_all_page_slots_ids[_this.PAGE]; // if (this.PAGE !== 'minamin') {

      module_page_slots_map = parsePageTPL();

      if (data.custom_params) {
        module_tags = data.custom_params.tags || '';
        module_user = data.custom_params.user || module_user;
      }

      if (_this.DEBUG) Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* _log */ "c"])('Section', /(i?)(\W|^)(capa|interna|detalhe)(\W|$)/.test(module_page_section));
      var test_section = /(i?)(\W|^)(capa|interna|detalhe)(\W|$)/.test(module_page_section); // eslint-disable-line

      if (test_section === false) {
        module_ads_test_section = "".concat(module_page_section, "/capa");
      } else {
        module_ads_test_section = module_page_section;
      }
      /** Update google module setup */


      _this.adserverUpdate({
        slots_page_map: module_page_slots_map,
        slots_page_type: module_all_page_slots_ids[_this.PAGE],
        section: module_ads_test_section,
        custom_formats: module_custom_formats,
        tags: module_tags,
        user: module_user,
        page_type: _this.PAGE,
        try_render_ads: true
      });
      /** Call the Prebid bidders auction passing some callback functions */


      if (prebid_enable) {
        /** Update prebid module setup */
        _this.prebidUpdate({
          slots_page_map: module_page_slots_map,
          custom_params: module_custom_params,
          tags: module_tags
        });

        _this.prebidAuction(_this.adserverDisableForPrebid, _this.adserverDisplayAds);
      } else {
        /** Display Defined Ads */
        _this.adserverDisplayAds();
      }

      return _this;
    }, module_update_timeout);
  };
  /** Starts ModuleADS with the properties sent */


  this.init = function (data) {
    if (!data) return console.log('[ModuleADS] Warning: Initial parameters not sent. ModuleADS off ...');
    if (!data.configs) return console.log('[ModuleADS] Warning: Configs parameter not sent. ModuleADS off ...');
    if (!data.page) return console.log('[ModuleADS] Warning: Page parameter not sent. ModuleADS off ...');
    if (!data.section) return console.log('[ModuleADS] Warning: Section parameter not sent. ModuleADS off ...');
    _this.DEBUG = data.debug || Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* _debug */ "a"])();
    _this.DEVICE = Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* _device */ "b"])();
    _this.PAGE = data.page;
    if (_this.DEBUG) Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* _log */ "c"])("[DEBUG: ".concat(_this.DEBUG, "] Starting module in DEBUG mode ..."));
    if (_this.DEBUG) Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* _log */ "c"])('Section', /(i?)(\W|^)(capa|interna|detalhe)(\W|$)/.test(data.section));
    var test_section = /(i?)(\W|^)(capa|interna|detalhe)(\W|$)/.test(data.section); // eslint-disable-line

    if (test_section === false) {
      module_ads_test_section = "".concat(data.section, "/capa");
    } else {
      module_ads_test_section = data.section;
    }

    module_configs_json = data.configs;
    module_custom_params = data.custom_params;
    module_custom_slots = data.custom_slots || null;
    module_page_section = module_ads_test_section;

    if (data.custom_params) {
      module_tags = data.custom_params.tags || '';
      module_user = data.custom_params.user || '';
    }

    if (window.location.href.indexOf('module-ads-target') !== -1) {
      var targetTest = Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* getTargetsURL */ "h"])('module-ads-target');
      if (_this.DEBUG) Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* _log */ "c"])("[DEBUG: ".concat(_this.DEBUG, "] [TargetURL] Module ads setTargeting test ads"));
      if (_this.DEBUG) Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_0__[/* _log */ "c"])("[DEBUG: ".concat(_this.DEBUG, "] [TargetURL] ").concat(targetTest));
    }
    /** Load ConfigJSON and setup module */


    setup(module_configs_json);
    return _this;
  };
};
/** threat ModuleADS as a singleton */


var getInstance = function getInstance() {
  var instance = {};

  if (typeof window !== 'undefined') {
    if (window.ModuleADS) {
      instance = window.ModuleADS;
    } else {
      instance = new ModuleADS();
    }

    window.ModuleADS = instance;
    return instance;
  }

  return null;
};

var moduleADS = getInstance(); // eslint-disable-line

/***/ })
/******/ ]);
//# sourceMappingURL=module-ads.js.map