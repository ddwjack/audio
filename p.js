/**
 * NodeJS 模块，用于转发请求，效果同 p.php
 * liuchao
 */

const http = require('http');
const util = require('util');
const url = require('url');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

/**
 * 配置对象
 * @type {{nodeIndex: string, port: number, basedir: String, remote: {host: string, path: string}}}
 */
const config = {
    nodeIndex: '/p.js',
    port: 8765,
    basedir: __dirname,
    remote: {
        host: 'http://a.91zibo.com',
//   	host: 'a.91zibo.com',
        path: '/api'
    }
};

http.createServer(function (request, response) {
	
    var urlObj = url.parse(request.url, true);
	
    if (config.nodeIndex === urlObj.pathname) proxyRequest(urlObj, request, response);
    else handleStaticFile(urlObj, response);
}).listen(config.port);

console.log('Server running at http://127.0.0.1:' + config.port + '/');

/**
 * 处理静态文件
 * @param urlObj
 * @param response
 */
function handleStaticFile(urlObj, response) {
    var pathname = urlObj.pathname;

    var mime = {
        "html": "text/html",
        "js": "application/javascript",
        "css": "text/css",
        "png": "image/png",
        "jpg": "image/jpeg",
        "gif": "image/gif"
    };

    // 文件名
    var filename = pathname;
    if ('/' === filename) filename = '/index.html';
    filename = config.basedir + filename;
//	//console.log(filename);
    // 文件扩展名
    var ext = path.extname(filename).slice(1);
	
//  //console.log(filename);

    fs.readFile(filename, function (error, data) {
        if (error) {
            //console.log(error);
            response.writeHead(404);
            response.end();
        } else {
            response.writeHead(200, {'Content-Type': mime[ext]});
            response.write(data, 'binary');
            response.end();
        }
    });
}

/**
 * 转发请求
 * @param urlObj
 * @param request
 * @param response
 */
function proxyRequest(urlObj, request, response) {
    if ('GET' === request.method) proxyGetRequest(urlObj, response);
    else if ('POST' === request.method) proxyPostRequest(urlObj, request, response);
}

/**
 * 转发 GET 请求
 * @param urlObj
 * @param response
 */
function proxyGetRequest(urlObj, response) {
    var query = urlObj.query;
    if (query.m) {
        var phpmod = query.m.replace(/\./g, '/');
        delete query.m;

        var head = {
            'Content-Type': 'application/json',
            'x-out': config.remote.host + config.remote.path + '/' + phpmod + '?' + querystring.stringify(query)
        };

        post(phpmod, query, function (data, header) {
            // 请求头中的 Content-Type，默认是 application/json
            if (header['content-type']) head['Content-Type'] = header['content-type'];
            response.writeHead(200, head);
            if (header['content-type'].indexOf('image') !== -1) response.end(data, 'binary'); // 返回二进制数据
            else response.end(data);
        }, function () {
            response.writeHead(200, head);
            response.end('{"code":"-0001","code_str":"请求失败"}');
        });
    }
}

/**
 * 转发 POST 请求
 * @param urlObj
 * @param request
 * @param response
 */
function proxyPostRequest(urlObj, request, response) {
    request.setEncoding('utf8');
    var requestData = '';

    request.on('data', function (chunk) {requestData += chunk;});

    request.on('end', function () {
        requestData = querystring.parse(requestData);

        var query = urlObj.query;
        var phpmod = query.m.replace(/\./g, '/');

        var head = {
            'Content-Type': 'application/json',
            'x-out': config.remote.host + config.remote.path + '/' + phpmod + '?' + querystring.stringify(requestData)
        };

        post(phpmod, requestData, function (data, header) {
            // 请求头中的 Content-Type，默认是 application/json
            if (header['content-type']) head['Content-Type'] = header['content-type'];
            response.writeHead(200, head);
            if (header['content-type'].indexOf('image') !== -1) response.end(data, 'binary'); // 返回二进制数据
            else response.end(data);
        }, function () {
            response.writeHead(200, head);
            response.end('{"code":"-0001","code_str":"请求失败"}');
        });
    });
}

/**
 * post 数据
 * @param phpmod
 * @param data
 * @param callback1
 * @param callback2
 */
function post(phpmod, data, callback1, callback2) {
    data = querystring.stringify(data);
	//console.log(data);
    var options = {
        hostname: config.remote.host,
        port: 80,
        path: config.remote.path + '/' + phpmod,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    var req = http.request(options, function (response) {

        if (response.headers['content-type'].indexOf('image') === -1) response.setEncoding('utf8');
        else if (response.headers['content-type'].indexOf('image') !== -1)  response.setEncoding('binary');

        var responseData = '';

        response.on('data', function (chunk) {responseData += chunk;});

        response.on('end', function () {callback1(responseData, response.headers);});

        response.on('error', function (e) {callback2(e);});
    });

    // 写入数据到请求主体
    req.write(data);
    req.end();
}