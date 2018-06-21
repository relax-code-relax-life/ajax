浏览器端加载远程数据的ajax实现, 支持jsonp；支持FormData，支持application/json, 支持自定义post body体；支持web worker环境。

## 注意
- 代码依赖Promise对象，请确保当前环境已支持Promise。
- web worker环境下，不支持jsonp。

## 下载
* npm: `npm install --save wwl-ajax`
* 直接下载: \<script src="https://gitee.com/w-wl/dist_ajax/raw/master/index.js"></script\>

## 使用
* es2015: `import ajax from 'wwl-ajax'`
* commonJs:  `var ajax=require('wwl-ajax')`;
* amd: `define([],"./js/wwl-ajax.js")`
* window.ajax: `<script src="https://gitee.com/w-wl/dist_ajax/raw/master/index.js"></script>`
* self.ajax: `importScripts('./ajax.js');`

## 目录

- [get请求](#示例1-GET请求)

- [jsonp请求](#示例2-jsonp请求)

- [post请求(默认)](#示例3-post请求-\(默认,urlencoded类型\))

- [post请求(formData)](#示例4-post请求-\(multipart/form-data类型\))

- [post请求(json)](#示例3-post请求-\(默认,urlencoded类型\))

- [post请求(自定义body体)](#示例6-直接发送数据)

- [参数详情](#配置参数)

- [返回值详情](#返回值)

## 示例1 GET请求
```javascript
import ajax from 'wwl-ajax';

//实际请求url: http://127.0.0.1/?name=wwl%26,   
//如果设置 {encodeExclude:true}或{encodeExclude:['name']}; 则为http://127.0.0.1/?name=wwl&
var promise = ajax({
    url: 'http://127.0.0.1',
    data: {name: "wwl&"}
});

typeof promise.abort === 'function';    //true

promise.then(function (res) {
    console.log(res); //{ data:'data from server', status:200, statusText:'OK' , xhr: XMLHttpRequest }
}, function (res) {
    console.log(res); //{ data:'', status:404, statusText:'Not Found' , xhr: XMLHttpRequest }
});

```

## 示例2 jsonp请求
```javascript

//实际请求url: http://127.0.0.1?name=wwl&callback=__jsonp__1
var promise = ajax({
        url: 'http://127.0.0.1',
        method: 'JSONP',
        data: {name: "wwl"},
        cbParam: 'callback',     //可忽略，默认为callback
        cbName: '__jsonp__1',    //可忽略，默认为__jsonp__${count}
    });

typeof promise.abort === 'function';    //true

promise.then(function (res) {
    console.log(res); //{ data:'data from server', status:200, statusText:'ok'  }
}, function (res) {
    console.log(res); //{ data:'', status:400, statusText:'timeout'}
});

```

## 示例3 post请求 (默认,urlencoded类型)
```javascript
//实际请求url: http://127.0.0.1/?id=1
//http body为: name=wwl&sex=male
    ajax({
        url: 'http://127.0.0.1',
        method: 'POST',
        params: {id: '1'},
        data: {name: 'wwl',sex:'male'}
    });
```

## 示例4 post请求 (multipart/form-data类型)
```javascript
    var data=new FormData();
    data.append('file',document.querySelector('[input=file]').files[0]);
    data.append('name','wwl');
    ajax({
        url: 'http://127.0.0.1',
        method: 'POST',
        data: data
    });
```
或
```javascript
 ajax({
        url: 'http://127.0.0.1',
        method: 'POST',
        data: {
            name: 'wwl',
            file: document.querySelector('[input=file]').files[0]
        },
        contentType:'formdata'
    });
```

## 示例5 post请求(application/json类型)
```javascript
//http body为:  {"name":"wwl"}
    ajax({
        url: 'http://127.0.0.1',
        method: 'POST',
        data: {name: 'wwl'},
        contentType:'json'
    });
```

## 示例6 直接发送数据
```javascript
    ajax({
        url: 'http://127.0.0.1',
        method: 'POST',
        data: '123'
    });

    ajax({
        url: 'http://127.0.0.1',
        method: 'POST',
        data: document.querySelector('[input=file]').files[0]
    });
```


## 配置参数
{url,method,data,params,headers,timeout,withCredentials,responseType,transformRequest,transformResponse,encodeExclude,contentType,cbParam,cbName,charset}

### url  
    <string>     require
    请求的url

### method
    <string>    
    默认为GET，支持JSONP。不区分大小写。

### data
    <any>      
    请求数据。
    支持FormData,File,Blob,String,Object。
    如果method为GET或JSONP，该参数效于params。
    
### params
    <any>
    如果是对象，转换为&key=value的形式添加到url，
    如果是字符串，转换为&params的形式添加到url。 

### headers
    <Object>
    默认为{},设置请求头。

### timeout
    <number>
    设置超时时间。jsonp默认30秒超时，其他情况下默认无超时时间。

### withCredentials
    <boolean>
    设置withCredentials 

### contentType
    <string>
    有效值为: "urlencoded","formdata","json"，默认为"urlencoded"。
    当method为post时，且data参数为普通对象时，
    则默认使用application/x-www-form-urlencoded的形式；
    如果设置为"formdata", 则使用multipart/form-data的形式；
    如果设置为"json", 则使用application/json的形式。
      
### responseType
    <string>
    默认为"json"。
    设置响应类型。常见的值有： "arraybuffer", "blob", "document", "json", "text"。
      
### transformRequest
    <function>
    转换请求数据data。
    回调签名: callback(data,config)
    data: 当前请求对象。
    config: 传入ajax()方法的配置对象。
    
### transformResponse
    <function>
    转换返回结果。
    回调签名: callback(data)
    data: 请求的返回结果。

### encodeExclude
    <boolean|Array>
    默认情况情况下，会通过encodeURIComponent，对params参数进行转义。
    如果data不是FromData、File、Blob、Buffer类型，也会对data进行转义。
    如果设置encodeExclude为true，则取消转义。
    如果设置encodeExclude为数组，则可对特定的键取消转义。

### cbParam
    <string>
    针对jsonp的参数，回调的参数名，默认为callback。

### cbName
    <string>
    针对jsonp的参数，回调的函数名，默认为 __jsonp__${cnt}。
    即默认情况下，第一个jsonp的请求参数为: ?callback=__jsonp__1
    
### charset
    <string>
    针对jsonp的参数，设置jsonp的字符编码。
    默认为utf-8.
    
   
## 返回值
返回带有abort()方法的Promise对象。

### promise.abort
取消当前请求。
如果在请求完成后调用abort方法，则无任何效果。
如果在请求完成前调用，则不会触发promise的回调。

## promise的回调参数
{data,status,statusText,xhr}

### data
    请求的返回值。
    
### status
    <number>
    请求的返回状态码。
    
### statusText
    <string>
    请求的返回状态的字符串。
    
### xhr
    <XMLHttpRequest>
    内部的XMLHttpRequest对象，如果jsonp，则该值为undefined。
    
## 注意
如果传入的参数值为null或undefined，则会按照缺省处理。

```javascript

import ajax from 'wwl-ajax';

var url = 'http://127.0.0.1';

ajax({url:url,method:undefined});
//等效于 ajax({ url:url });

```
