(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ajax"] = factory();
	else
		root["ajax"] = factory();
})(this, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


var call = Function.prototype.call;
var toString = call.bind(Object.prototype.toString);
var reg_resolveUrl = /(\?([^#]*))?(#.*)?\s*$/;

var assign = function assign(tar) {
  for (var _len = arguments.length, extend = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    extend[_key - 1] = arguments[_key];
  }

  extend.filter(function (obj) {
    return obj != undefined;
  }).forEach(function (obj, index) {
    Object.keys(obj).filter(function (key) {
      return obj[key] != null;
    }).forEach(function (key) {
      return tar[key] = obj[key];
    });
  });
  return tar;
};

var each = function each(obj, fn) {
  Object.keys(obj).forEach(function (key) {
    return fn(obj[key], key);
  });
};

var isArray = Array.isArray || function (arr) {
  return toString(arr) === '[object Array]';
};

var isString = function isString(str) {
  return typeof str === 'string';
};

var isObject = function isObject(obj) {
  return obj && typeof obj === 'object';
};

var trim = function trim(str) {
  if (str.trim) return str.trim();else return str.replace(/^\s+|\s+$/g, '');
};

var util_param = function util_param(params, encodeEx) {
  if (params == null || typeof params !== 'object') return params || '';
  var result = [],
      val,
      enc = encodeURIComponent;
  var excludeMap = {},
      excludeAll = false;

  if (isArray(encodeEx)) {
    encodeEx.forEach(function (key) {
      excludeMap[key] = true;
    });
  } else {
    excludeAll = encodeEx;
  }

  for (var key in params) {
    val = params[key];
    if (val == null) val = '';else if (typeof val === 'object') val = JSON.stringify(val);
    val = excludeAll || excludeMap[key] ? val : enc(val);
    result.push(enc(key) + '=' + val);
  }

  return result.join('&');
},
    util_resolveUrl = function util_resolveUrl(url, param, encodeEx) {
  param = util_param(param, encodeEx);
  return url.replace(reg_resolveUrl, '?$2&' + param + '$3').replace('?&', '?');
},
    util_defer = function util_defer() {
  var defer = {};
  defer.promise = new Promise(function (resolve, reject) {
    defer.resolve = resolve;
    defer.reject = reject;
  });
  return defer;
},
    util_isFormData = function util_isFormData(val) {
  return typeof FormData !== 'undefined' && val instanceof FormData;
},
    util_isArrayBuffer = function util_isArrayBuffer(val) {
  return toString(val) === '[object ArrayBuffer]';
},
    util_isFile = function util_isFile(val) {
  return toString(val) === '[object File]';
},
    util_isBlob = function util_isBlob(val) {
  return toString(val) === '[object Blob]';
},
    util_isArrayBufferView = function util_isArrayBufferView(val) {
  var result;

  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && val.buffer instanceof ArrayBuffer;
  }

  return result;
},
    util_ajaxError = function util_ajaxError(msg, xhr) {
  return {
    message: msg,
    status: xhr.status,
    statusText: xhr.statusText,
    data: xhr.responseText,
    xhr: xhr
  };
};

var _jsonpCnt = 0;

function jsonp(opt) {
  var _ref = opt || {},
      _ref$url = _ref.url,
      url = _ref$url === void 0 ? '' : _ref$url,
      _ref$params = _ref.params,
      params = _ref$params === void 0 ? {} : _ref$params,
      cbParam = _ref.cbParam,
      cbName = _ref.cbName,
      timeout = _ref.timeout,
      _ref$charset = _ref.charset,
      charset = _ref$charset === void 0 ? 'utf-8' : _ref$charset,
      responseType = _ref.responseType;

  var isAbort = false;
  !timeout && (timeout = 30000);
  !cbParam && (cbParam = 'callback');
  !cbName && (cbName = "__jsonp__" + _jsonpCnt++);
  params[cbParam] = cbName;
  url = util_resolveUrl(url, params, opt.encodeExclude);
  var parent = document.body || document.head;
  var script = document.createElement('script');
  var defer = util_defer();
  var timeoutId;
  timeoutId = setTimeout(function () {
    timeoutId = undefined;
    cleanup(400, 'timeout');
  }, timeout);

  function cleanup(status, statusText, data) {
    window[cbName] = script.onload = script.onerror = null;
    if (timeoutId) clearTimeout(timeoutId);

    try {
      parent.removeChild(script);
    } catch (e) {}

    if (isAbort) return;
    (status === 200 ? defer.resolve : defer.reject)({
      status: status,
      statusText: statusText,
      data: data
    });
  }

  window[cbName] = function (data) {
    cleanup(200, 'ok', data);
  };

  script.onload = function () {};

  script.onerror = function () {
    cleanup(404, 'error');
  };

  script.charset = charset;
  script.src = url;
  parent.appendChild(script);

  defer.abort = function () {
    isAbort = true;
  };

  return defer;
}

function ajax(config) {
  var defer = util_defer();
  var xhr = new XMLHttpRequest();
  var url = config.url,
      method = config.method,
      params = config.params,
      requestData = config.data,
      responseType = config.responseType;
  xhr.open(method, util_resolveUrl(url, params, config.encodeExclude), true);
  xhr.timeout = config.timeout || 0;

  xhr.onreadystatechange = function () {
    if (!xhr || xhr.readyState !== 4) return;
    var responseData = !xhr.responseType || xhr.responseType === 'text' ? xhr.responseText : xhr.response;

    if (responseType === 'json' && !isObject(responseData)) {
      try {
        responseData = JSON.parse(responseData);
      } catch (e) {}
    }

    var status = xhr.status;
    var response = {
      data: responseData,
      status: status === 1223 ? 204 : xhr.status,
      statusText: status === 1223 ? 'No Content' : xhr.statusText,
      xhr: xhr
    };
    status >= 200 && status < 300 ? defer.resolve(response) : defer.reject(response);
    xhr = null;
  };

  xhr.ontimeout = function () {
    defer.reject(util_ajaxError('timeout', xhr));
    xhr = null;
  };

  if (xhr.setRequestHeader) {
    each(config.headers, function (val, key) {
      val !== null && val !== undefined && xhr.setRequestHeader(key, val);
    });
  }

  xhr.withCredentials = config.withCredentials;
  xhr.responseType = responseType || '';
  xhr.send(requestData || null);

  defer.abort = function () {
    xhr && xhr.abort();
  };

  return defer;
}

var defaults = {
  method: 'GET',
  headers: {
    'Accept': 'application/json, text/plain, */*'
  },
  transformRequest: function transformRequest(requestData, config) {
    return requestData;
  },
  transformResponse: function transformResponse(res, config) {
    return res;
  },
  encodeExclude: false,
  responseType: 'json'
};
var header_post_urlencode = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
};
var header_post_json = {
  'Content-Type': 'application/json;charset=utf-8'
};
var header_special = {};
var contentTypeEnum = {
  urlencoded: 'urlencoded',
  formData: 'formdata',
  json: 'json'
};

var fetch = function fetch(_config) {
  if (typeof _config.url !== 'string' || trim(_config.url) === '') {
    throw new Error('wwl-ajax : invalid url .');
  }

  var config = assign({}, defaults, _config);
  var method = config.method.toUpperCase();
  var transformRequest = config.transformRequest,
      transformResponse = config.transformResponse;
  var requestData = transformRequest(config.data, config) || {};
  var params = config.params || {};
  var isJsonp = method === 'JSONP';

  if (method === 'GET' || isJsonp) {
    assign(params, requestData);
    requestData = null;
  }

  var headerSpecial = assign({}, header_special[method]);
  var contentType = config.contentType;

  if (util_isFormData(requestData)) {
    contentType = contentTypeEnum.formData;
  } else if (typeof requestData !== 'object' || util_isArrayBuffer(requestData) || util_isArrayBufferView(requestData) || util_isBlob(requestData) || util_isFile(requestData)) {} else if (contentType === contentTypeEnum.formData) {
    var formdata = new FormData();
    each(requestData, function (val, key) {
      if (val == null) return;
      formdata.append(key, val);
    });
    requestData = formdata;
  } else if (contentType === contentTypeEnum.json) {
    requestData = JSON.stringify(requestData);
    assign(headerSpecial, header_post_json);
  } else if (!contentType || contentType === contentTypeEnum.urlencoded) {
    requestData = util_param(requestData, config.encodeExclude);
    contentType = contentTypeEnum.urlencoded;
    assign(headerSpecial, header_post_urlencode);
  }

  var headers = assign(headerSpecial, config.headers);
  config.method = method;
  config.params = params;
  config.data = requestData;
  config.headers = headers;
  var defer = isJsonp ? jsonp(config) : ajax(config);
  var promise = defer.promise.then(function (res) {
    res.data = transformResponse(res.data, config);
    return res;
  }, function (res) {
    res.data = transformResponse(res.data, config);
    return Promise.reject(res);
  });
  promise.abort = defer.abort;
  return promise;
};

/* harmony default export */ __webpack_exports__["default"] = (fetch);

/***/ })
/******/ ])["default"];
});