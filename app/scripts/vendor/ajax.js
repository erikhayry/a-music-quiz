/*
Copyright (c) 2008 Stefan Lange-Hegermann

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var $ = (function() {
    var _storage = {};

    function _ajax(url, config, callbackFunction) {
        var _deferred = Q.defer(),  
            _config = config || {};
            _config.refresh = _config.refresh || false; 

        this.bindFunction = function(caller, object) {
            log('Ajax: bindFunction')
            return function() {
                return caller.apply(object, [object]);
            };
        };

        this.stateChange = function(object) {
            log('Ajax: stateChange')
            log(this.request)

            if (this.request.status == 401 || this.request.status == 404) {
                _deferred.reject(new Error(this.request.responseURL + ' : ' + this.request.statusText));
            } else if (this.request.readyState == 4 && this.request.status == 200 && this.request.responseText) {
                var _data = JSON.parse(this.request.responseText);

                if(!_config.refresh){
                    log('Ajax: storing')
                    _storage[this.url] = _data;
                    log(_storage)
                }
                _deferred.resolve(_data);
            }
        };

        this.getRequest = function() {
            if (window.ActiveXObject)
                return new ActiveXObject('Microsoft.XMLHTTP');
            else if (window.XMLHttpRequest)
                return new XMLHttpRequest();
            return false;
        };

        this.url = url;

        if(!_config.refresh && _storage[this.url]){
            log('Ajax: from storage')
            _deferred.resolve(_storage[this.url]);
        }

        else{
            log('Ajax: refresh')
            this.postBody = (arguments[2] || "");
            this.request = this.getRequest();

            if (this.request) {
                var req = this.request;
                req.onreadystatechange = this.bindFunction(this.stateChange, this);
                req.open("GET", url, true);
                for (var header in _config.headers) {
                    req.setRequestHeader(header, _config.headers[header]);
                }

                req.send(this.postBody)

            }            
        }




        return _deferred.promise;
    }

    return {
    	ajax : function(url, config, callbackFunction){
            return new _ajax(url, config, callbackFunction);
        }
    }
})();