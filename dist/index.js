/*! https://gitee.com/w-wl */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.ajax=t():e.ajax=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";function r(e){function t(e,t,n){window[c]=v.onload=v.onerror=null,l&&clearTimeout(l);try{b.removeChild(v)}catch(e){}p||(200===e?h.resolve:h.reject)({status:e,statusText:t,data:n})}var n=e||{},r=n.url,o=void 0===r?"":r,u=n.params,a=void 0===u?{}:u,i=n.cbParam,c=n.cbName,s=n.timeout,f=n.charset,d=void 0===f?"utf-8":f,p=!1;!s&&(s=3e4),!i&&(i="callback"),!c&&(c="__jsonp__"+w++),a[i]=c,o=m(o,a,e.encodeExclude);var l,b=document.body||document.head,v=document.createElement("script"),h=y();return l=setTimeout(function(){l=void 0,t(400,"timeout")},s),window[c]=function(e){t(200,"ok",e)},v.onload=function(){},v.onerror=function(){t(404,"error")},v.charset=d,v.src=o,b.appendChild(v),h.abort=function(){p=!0},h}function o(e){var t=y(),n=new XMLHttpRequest,r=e.url,o=e.method,u=e.params,a=e.data,i=e.responseType;return n.open(o,m(r,u,e.encodeExclude),!0),n.timeout=e.timeout||0,n.onreadystatechange=function(){if(n&&4===n.readyState){var e=n.responseType&&"text"!==n.responseType?n.response:n.responseText;if("json"===i&&!p(e))try{e=JSON.parse(e)}catch(e){}var r=n.status,o={data:e,status:1223===r?204:n.status,statusText:1223===r?"No Content":n.statusText,xhr:n};r>=200&&r<300?t.resolve(o):t.reject(o),n=null}},n.ontimeout=function(){t.reject(T("timeout",n)),n=null},n.setRequestHeader&&f(e.headers,function(e,t){null!==e&&void 0!==e&&n.setRequestHeader(t,e)}),n.withCredentials=e.withCredentials,n.responseType=i||"",n.send(a||null),t.abort=function(){n&&n.abort()},t}var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a=Function.prototype.call,i=a.bind(Object.prototype.toString),c=/(\?([^#]*))?(#.*)?\s*$/,s=function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return n.filter(function(e){return void 0!=e}).forEach(function(t,n){Object.keys(t).filter(function(e){return null!=t[e]}).forEach(function(n){return e[n]=t[n]})}),e},f=function(e,t){Object.keys(e).forEach(function(n){return t(e[n],n)})},d=Array.isArray||function(e){return"[object Array]"===i(e)},p=function(e){return e&&"object"===(void 0===e?"undefined":u(e))},l=function(e,t){if(null==e||"object"!==(void 0===e?"undefined":u(e)))return e||"";var n,r=[],o=encodeURIComponent,a={},i=!1;d(t)?t.forEach(function(e){a[e]=!0}):i=t;for(var c in e)n=e[c],null==n?n="":"object"===(void 0===n?"undefined":u(n))&&(n=JSON.stringify(n)),n=i||a[c]?n:o(n),r.push(o(c)+"="+n);return r.join("&")},m=function(e,t,n){return t=l(t,n),e.replace(c,"?$2&"+t+"$3").replace("?&","?")},y=function(){var e={};return e.promise=new Promise(function(t,n){e.resolve=t,e.reject=n}),e},b=function(e){return"undefined"!=typeof FormData&&e instanceof FormData},v=function(e){return"[object ArrayBuffer]"===i(e)},h=function(e){return"[object File]"===i(e)},j=function(e){return"[object Blob]"===i(e)},x=function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},T=function(e,t){return{message:e,status:t.status,statusText:t.statusText,data:t.responseText,xhr:t}},w=0,A={method:"GET",headers:{Accept:"application/json, text/plain, */*"},transformRequest:function(e,t){return e},transformResponse:function(e,t){return e},encodeExclude:!1,responseType:"json"},E={"Content-Type":"application/x-www-form-urlencoded;charset=utf-8"},S={POST:E,PUT:E,PATCH:E},C=function(e){e=s({},A,e);var t=e.method.toUpperCase(),n=e.data,a=e.params||{},i=e.transformRequest,c=e.transformResponse;n=i(n,e);var f="JSONP"===t;("GET"===t||f)&&(s(a,n),n=null),void 0==n||b(n)||v(n)||x(n)||j(n)||h(n)||"object"===(void 0===n?"undefined":u(n))&&(n=l(n,e.encodeExclude));var d=s({},S[t],e.headers);b(n)&&delete d["Content-Type"],e.method=t,e.params=a,e.data=n,e.headers=d;var p=f?r(e):o(e),m=p.promise.then(function(t){return t.data=c(t.data,e),t},function(t){return t.data=c(t.data,e),Promise.reject(t)});return m.abort=p.abort,m};e.exports=C}])});