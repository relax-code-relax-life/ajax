# ajax
浏览器端加载远程数据的ajax实现，支持jsonp。

## 依赖
代码依赖Promise对象，请确保在加载ajax前已支持Promise。

## 下载
* npm install --save wwl-ajax
* \<script src="https://gitee.com/w-wl/dist_ajax/raw/master/index.js"></script\>

## 使用
* amd， eg: define([],"./js/wwl-ajax.js");
* commonJs, eg: import ajax from 'wwl-ajax' 或 var ajax=require('wwl-ajax');
* 当页面不支持amd和commonJs时，会暴露出window.ajax函数。

## 示例
```javascript

import ajax from 'wwl-ajax';

var config={    //配置参数
    url: "http://127.0.0.1",
    method:"post",
    data:{ name:"w w l" },
    params:{ id:5 }
};

//实际请求url: http://127.0.0.1?id=5
//实际post数据: name=w%20w%20l  //如果设置 encodeExclude=['name'];则为 name=w w l;
var promise=ajax(config);
promise.then(function(res){
        console.log(res); //{ data:'data from server', status:200, statusText:'OK' , xhr: XMLHttpRequest }
    },function(res){
        console.log(res); //{ data:'', status:404, statusText:'Not Found' , xhr: XMLHttpRequest }
    });

typeof promise.abort === 'function';    //true

```

## 配置参数
{url,method,data,params,headers,timeout,withCredentials,transformRequest,transformResponse,encodeExclude,cbParam,cbName,charset}

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
    如果为GET或JSONP，等效于params。
    
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
    默认为utf-8.
    设置jsonp的字符编码。
   
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
