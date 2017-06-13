/**
 * Created by wangweilin on 2017/5/5.
 */

"use strict";

var call = Function.prototype.call;
var toString = call.bind(Object.prototype.toString);
var reg_resolveUrl = /(\?([^#]*))?(#.*)?\s*$/;
var assign = Object.assign || function (tar, ...extend) {
        extend.forEach((val, key) => tar[key] = val);
        return tar;
    };
var each = function (obj, fn) {
    Object.keys(obj).forEach(key => fn(obj[key], key));
};
var isArray = Array.isArray || function (arr) {
        return toString(arr) === '[object Array]'
    };
var
    util_param = function (params, encodeEx) {
        if (params == null || typeof params !== 'object') return params || '';
        var result = [], val, enc = encodeURIComponent;

        //格式化excludeMap: {key1:bool,key2:bool}
        var excludeMap = {}, excludeAll = false;
        if (isArray(encodeEx)) {
            encodeEx.forEach(function (key) {
                excludeMap[key] = true;
            })
        }
        else {
            excludeAll = encodeEx;
        }


        for (var key in params) {
            val = params[key];
            if (val == null) val = '';
            else if (typeof val === 'object') val = JSON.stringify(val);

            val = (excludeAll || excludeMap[key]) ? val : enc(val);

            result.push(enc(key) + '=' + val);
        }

        return result.join('&');
    },
    util_resolveUrl = function (url, param, encodeEx) {
        param = util.param(param, encodeEx);
        return url.replace(reg_resolveUrl, '?$2&' + param + '$3').replace('?&', '?')
    },
    util_defer = function () {
        var defer = {};
        defer.promise = new Promise(function (resolve, reject) {
            defer.resolve = resolve;
            defer.reject = reject;
        });
        return defer;
    },
    util_isFormData = function (val) {
        return typeof FormData !== 'undefined' && val instanceof FormData;
    },
    util_isArrayBuffer = function (val) {
        return toString(val) === '[object ArrayBuffer]';
    },
    util_isFile = function (val) {
        return toString(val) === '[object File]';
    },
    util_isBlob = function (val) {
        return toString(val) === '[object Blob]';
    },
    util_isArrayBufferView = function (val) {
        var result;
        if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
            result = ArrayBuffer.isView(val);
        } else {
            result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
        }
        return result;
    },
    util_ajaxError = function (msg, xhr) {
        return {
            message: msg,
            status: xhr.status,
            statusText: xhr.statusText,
            data: xhr.responseText,
            xhr
        }
    };


//data ,opt 可省略
/*
 * opt: {
 *     url:
 *     params
 *     cbParam url中的参数名, 默认callback
 *     cbName  回调的函数名 , 默认`__jsonp__${cnt}`
 *     timeout 超时时间 ,  默认 30000
 *     charset 默认utf-8
 *     encodeExclude: false
 *      }
 * */
var _jsonpCnt = 0;
function jsonp(opt) {
    var {
        url = '',
        params = {},
        cbParam = 'callback',
        cbName = `__jsonp__${_jsonpCnt++}`,
        timeout,
        charset = 'utf-8'
    } = opt || {};

    timeout = timeout || 30000; //排除空和0

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
        }
        catch (e) {
        }


        (status === 200 ? defer.resolve : defer.reject)({
            status, statusText, data
        });
    }


    window[cbName] = function (data) {
        cleanup(200, 'ok', data);
    };

    script.onload = function () {

    };
    script.onerror = function () {
        cleanup(404, 'error');
    };

    script.charset = charset;
    script.src = url;
    parent.appendChild(script);

    return defer.promise;
}


/*
 * opt: {
 *   url
 *   method
 *   params
 *   data
 *   headers
 *   timeout
 *   withCredentials
 *   responseType
 *   encodeExclude:false
 * }
 * */
function ajax(config) {
    var defer = util_defer();
    var xhr = new XMLHttpRequest();
    var {url, method, params, data: requestData} = config;

    xhr.open(method, util_resolveUrl(url, params, config.encodeExclude), true);

    xhr.timeout = config.timeout || 0; //默认为0，代表无超时时间。
    xhr.onreadystatechange = function () {
        if (!xhr || xhr.readyState !== 4) return;

        var responseData = !xhr.responseType || xhr.responseType === 'text' ? xhr.responseText : xhr.response;

        var status = xhr.status;

        var response = {
            data: responseData,
            // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
            status: status === 1223 ? 204 : xhr.status,
            statusText: status === 1223 ? 'No Content' : xhr.statusText,
            xhr: xhr
        };


        status >= 200 && status < 300 ? defer.resolve(response) : defer.reject(response);

        xhr = null;
    };

    //不监听onerror 会先触发onreadystatechange，再触发onerror
    // xhr.onerror = function () {
    //   var result = util.ajaxError('Network error', xhr);
    //   xhr = null;
    //   defer.reject(result);
    // };

    xhr.ontimeout = function () {
        defer.reject(util_ajaxError('timeout', xhr));
        xhr = null;
    };

    if (xhr.setRequestHeader) {
        each(config.headers, (val, key) => {
            val != undefined && xhr.setRequestHeader(key, val)
        });
    }

    xhr.withCredentials = config.withCredentials;
    xhr.responseType = config.responseType || '';

    xhr.send(requestData || null);

    return defer.promise;
}


/*
 * config:
 *  url
 *  method  //支持jsonp,默认get
 *  data
 *  params
 *  headers
 *  timeout
 *  withCredentials
 *  responseType
 *  transformRequest    //会对transformRequest返回值执行encodeURIComponent，可通过encodeExclude过滤
 *  transformResponse
 *  encodeExclude:false //指定不对param和data进行加密  true|false  [key1,key2]
 *
 *  cbParam 回调的参数名，默认为callback
 *  cbName  回调的函数名, 默认`__jsonp__${cnt}`
 *
 * */
/*
 * res:
 *   data
 *   status
 *   statusText,
 *   xhr
 * */

var defaults = {
    method: 'GET',
    headers: {
        'Accept': 'application/json, text/plain, */*'
    },
    transformRequest: (requestData, config) => requestData,
    transformResponse: (res, config) => res,
    encodeExclude: false
};


var header_form_content_type = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
};
var specialHeader = {
    POST: header_form_content_type,
    PUT: header_form_content_type,
    PATCH: header_form_content_type
};


module.exports = function (config) {

    config = assign({}, defaults, config);


    var method = config.method.toUpperCase();

    var requestData = config.data;
    var params = config.params || {};

    var transformRequest = config.transformRequest,
        transformResponse = config.transformResponse;

    requestData = transformRequest(requestData, config);

    var isJsonp = method === 'JSONP';
    if (method === 'GET' || isJsonp) {
        assign(params, requestData);
        requestData = null;
    }

    if (requestData == undefined ||
        util_isFormData(requestData) ||
        util_isArrayBuffer(requestData) ||
        util_isArrayBufferView(requestData) ||
        util_isBlob(requestData) ||
        util_isFile(requestData)) {
        //不处理
    }
    else if (typeof requestData === 'object') {
        requestData = util_param(requestData, config.encodeExclude);
    }

    var headers = assign({}, specialHeader[method], config.headers);
    if (util_isFormData(requestData)) {
        delete headers['Content-Type'];
    }

    config.method = method;
    config.params = params;
    config.data = requestData;
    config.headers = headers;

    return ( isJsonp ? jsonp(config) : ajax(config) ).then(function (res) {
        res.data = transformResponse(res.data, config);
        return res;
    }, function (res) {
        res.data = transformResponse(res.data, config);
        return Promise.reject(res);
    });

};