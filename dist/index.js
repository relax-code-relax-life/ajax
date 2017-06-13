/*! author:wwl */
!function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("ajax", [], t) : "object" == typeof exports ? exports.ajax = t() : e.ajax = t()
}(this, function () {
    return function (e) {
        function t(r) {
            if (n[r])return n[r].exports;
            var o = n[r] = {i: r, l: !1, exports: {}};
            return e[r].call(o.exports, o, o.exports, t), o.l = !0, o.exports
        }

        var n = {};
        return t.m = e, t.c = n, t.i = function (e) {
            return e
        }, t.d = function (e, n, r) {
            t.o(e, n) || Object.defineProperty(e, n, {configurable: !1, enumerable: !0, get: r})
        }, t.n = function (e) {
            var n = e && e.__esModule ? function () {
                return e.default
            } : function () {
                return e
            };
            return t.d(n, "a", n), n
        }, t.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, t.p = "", t(t.s = 0)
    }([function (e, t, n) {
        "use strict";
        function r(e) {
            function t(e, t, n) {
                window[f] = x.onload = x.onerror = null, b && clearTimeout(b);
                try {
                    v.removeChild(x)
                } catch (e) {
                }
                (200 === e ? h.resolve : h.reject)({status: e, statusText: t, data: n})
            }

            var n = e || {}, r = n.url, o = void 0 === r ? "" : r, u = n.params, a = void 0 === u ? {} : u,
                i = n.cbParam, c = void 0 === i ? "callback" : i, s = n.cbName,
                f = void 0 === s ? "__jsonp__" + T++ : s, d = n.timeout, p = n.charset, y = void 0 === p ? "utf-8" : p;
            d = d || 3e4, a[c] = f, o = l(o, a, e.encodeExclude);
            var b, v = document.body || document.head, x = document.createElement("script"), h = m();
            return b = setTimeout(function () {
                b = void 0, t(400, "timeout")
            }, d), window[f] = function (e) {
                t(200, "ok", e)
            }, x.onload = function () {
            }, x.onerror = function () {
                t(404, "error")
            }, x.charset = y, x.src = o, v.appendChild(x), h.promise
        }

        function o(e) {
            var t = m(), n = new XMLHttpRequest, r = e.url, o = e.method, u = e.params, a = e.data;
            return n.open(o, l(r, u, e.encodeExclude), !0), n.timeout = e.timeout || 0, n.onreadystatechange = function () {
                if (n && 4 === n.readyState) {
                    var e = n.responseType && "text" !== n.responseType ? n.response : n.responseText, r = n.status,
                        o = {
                            data: e,
                            status: 1223 === r ? 204 : n.status,
                            statusText: 1223 === r ? "No Content" : n.statusText,
                            xhr: n
                        };
                    r >= 200 && r < 300 ? t.resolve(o) : t.reject(o), n = null
                }
            }, n.ontimeout = function () {
                t.reject(j("timeout", n)), n = null
            }, n.setRequestHeader && f(e.headers, function (e, t) {
                void 0 != e && n.setRequestHeader(t, e)
            }), n.withCredentials = e.withCredentials, n.responseType = e.responseType || "", n.send(a || null), t.promise
        }

        var u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }, a = Function.prototype.call, i = a.bind(Object.prototype.toString), c = /(\?([^#]*))?(#.*)?\s*$/,
            s = Object.assign || function (e) {
                    for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0),
                             r = 1; r < t; r++)n[r - 1] = arguments[r];
                    return n.forEach(function (t, n) {
                        return e[n] = t
                    }), e
                }, f = function (e, t) {
                Object.keys(e).forEach(function (n) {
                    return t(e[n], n)
                })
            }, d = Array.isArray || function (e) {
                    return "[object Array]" === i(e)
                }, p = function (e, t) {
                if (null == e || "object" !== (void 0 === e ? "undefined" : u(e)))return e || "";
                var n, r = [], o = encodeURIComponent, a = {}, i = !1;
                d(t) ? t.forEach(function (e) {
                    a[e] = !0
                }) : i = t;
                for (var c in e)n = e[c], null == n ? n = "" : "object" === (void 0 === n ? "undefined" : u(n)) && (n = JSON.stringify(n)), n = i || a[c] ? n : o(n), r.push(o(c) + "=" + n);
                return r.join("&")
            }, l = function (e, t, n) {
                return t = util.param(t, n), e.replace(c, "?$2&" + t + "$3").replace("?&", "?")
            }, m = function () {
                var e = {};
                return e.promise = new Promise(function (t, n) {
                    e.resolve = t, e.reject = n
                }), e
            }, y = function (e) {
                return "undefined" != typeof FormData && e instanceof FormData
            }, b = function (e) {
                return "[object ArrayBuffer]" === i(e)
            }, v = function (e) {
                return "[object File]" === i(e)
            }, x = function (e) {
                return "[object Blob]" === i(e)
            }, h = function (e) {
                return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && e.buffer instanceof ArrayBuffer
            }, j = function (e, t) {
                return {message: e, status: t.status, statusText: t.statusText, data: t.responseText, xhr: t}
            }, T = 0, w = {
                method: "GET",
                headers: {Accept: "application/json, text/plain, */*"},
                transformRequest: function (e, t) {
                    return e
                },
                transformResponse: function (e, t) {
                    return e
                },
                encodeExclude: !1
            }, A = {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}, C = {POST: A, PUT: A, PATCH: A};
        e.exports = function (e) {
            e = s({}, w, e);
            var t = e.method.toUpperCase(), n = e.data, a = e.params || {}, i = e.transformRequest,
                c = e.transformResponse;
            n = i(n, e);
            var f = "JSONP" === t;
            ("GET" === t || f) && (s(a, n), n = null), void 0 == n || y(n) || b(n) || h(n) || x(n) || v(n) || "object" === (void 0 === n ? "undefined" : u(n)) && (n = p(n, e.encodeExclude));
            var d = s({}, C[t], e.headers);
            return y(n) && delete d["Content-Type"], e.method = t, e.params = a, e.data = n, e.headers = d, (f ? r(e) : o(e)).then(function (t) {
                return t.data = c(t.data, e), t
            }, function (t) {
                return t.data = c(t.data, e), Promise.reject(t)
            })
        }
    }])
});