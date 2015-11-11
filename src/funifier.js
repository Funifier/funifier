'use strict';
var request = require('superagent');
var _ = require('lodash');
var validator = require('validator');
var Q = require('q');


var Funifier = function(args){
    var _$this = this;

    var defaults = {
        url: 'https://service2.funifier.com/2.0.0/'
    };

    if (!(this instanceof Funifier)) {
        return new Funifier(args);
    }

    this.options = _.extend(defaults, args);
    if(!this.options.apiKey){
        throw new Error('apiKey is required!');
    }
    if(this.options.apiKey.length!==24){
        throw new Error('apiKey is invalid!');
    }

    this.request = request;

    this.getApiKey = function(){
        return this.options.apiKey;
    };

    this.getApiSecret = function(){
        return this.options.apiSecret || '';
    };

    this.getAccessToken = function(){
        return this.options.accessToken || '';
    };


    var addHeadersRequest = function(req){
        req.set({'X-Api-Key': _$this.getApiKey()}).set({'X-Access-Token': _$this.getAccessToken()}).set({'X-Api-Secret' : _$this.getApiSecret()});
    };

    var interceptErrorResponse = function(req){
        var callback = req.callback;
        req.callback = function(err, res) {
            if(!err){
                var data = res.body;
                if(data!==undefined && ((data.code!==undefined && data.code!==200) || data.errorCode!==undefined)){
                    err = new Error(data.message || data.errorMessage || data.errorCode || data.code);
                    res.status = data.code || data.errorCode || 500;
                    res.body = null;
                }
            }
            callback.call(req, err, res);
        };
    };



    this.get=function(_url,callback){
        if(validator.isNull(_url)){
            throw new Error('endpoint is required!');
        }
        var url = this.options.url + _url;
        var _promisse = this.request.get(url).use(addHeadersRequest).use(interceptErrorResponse);
        if(typeof callback === 'function'){
            _promisse.end(callback);
        }else{
            return _promisse;
        }
    };

    this.post=function(_url,callback){
        if(validator.isNull(_url)){
            throw new Error('url is required!');
        }
        var url = this.options.url + _url;
        var _promisse = this.request.post(url).use(addHeadersRequest).use(interceptErrorResponse);
        if(typeof callback === 'function'){
            _promisse.end(callback);
        }else{
            return _promisse;
        }
    };

    this.del=function(_url,callback){
        if(validator.isNull(_url)){
            throw new Error('endpoint is required!');
        }
        var url = this.options.url + _url;
        var _promisse = this.request.del(url).use(addHeadersRequest).use(interceptErrorResponse);
        if(typeof callback === 'function'){
            _promisse.end(callback);
        }else{
            return _promisse;
        }
    };

    this.put=function(_url,callback){
        if(validator.isNull(_url)){
            throw new Error('endpoint is required!');
        }
        var url = this.options.url + _url;
        var _promisse = this.request.put(url).use(addHeadersRequest).use(interceptErrorResponse);
        if(typeof callback === 'function'){
            _promisse.end(callback);
        }else{
            return _promisse;
        }
    };

    this.track = function(args,callback){
        var deferred = Q.defer();
        var defaults = {
            trigger_type: 'TRIGGER_HTML'
        };
        var options = _.extend(defaults, args);
        if(!this.options.action){
            throw new Error('action is required!');
        }
        this.post('track').send(options).end(function(err,data){
            if(!err){
                deferred.resolve(data.body);
            }else{
                deferred.reject(err);
            }

            if(typeof callback === 'function'){
                callback(err,data);
            }
        });

        return deferred.promise;
    };

    this.authenticate = function(args,callback){
        var deferred = Q.defer();
        var defaults = {
            auth_mode: 'IMPLICIT'
        };
        var options = _.extend(defaults, args);
        this.get('authenticate').query(options).end(function(err,data){
            if(!err){
                _$this.options.accessToken = data.body.access_token;
                deferred.resolve(_$this);
            }else{
                deferred.reject(err);
            }
            if(typeof callback === 'function'){
                callback(err);
            }
        });
        return deferred.promise;
    };

    this.logout = function(args,callback){
        var deferred = Q.defer();
        var defaults = {
            auth_mode: 'IMPLICIT'
        };
        var options = _.extend(defaults, args);
        this.get('logout').query(options).end(function(err){
            if(!err){
                _$this.options.accessToken = '';
                deferred.resolve(_$this);
            }else{
                deferred.reject(err);
            }
            if(typeof callback === 'function'){
                callback(err);
            }
        });
        return deferred.promise;
    };

    return this;
};

global.Funifier = Funifier;
module.exports = Funifier;