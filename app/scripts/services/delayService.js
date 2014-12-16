var Delay = (function() {
    function _q(func) {
        var _deferred = Q.defer();
        var _timer = setTimeout(function() {
            log('Delay: Timeout -q done');
            _timerDone = true;
            if (_data) {
                _deferred.resolve(_data)
            }
        }, Settings.userDelay);
        var _timerDone = false;
        var _data = '';
        var _args = Array.prototype.slice.call(arguments).splice(1);

        func.apply(this, _args).then(function(data) {
            if (_timerDone) {
                _deferred.resolve(data)
            } else {
                _data = data;
            }
        });

        return _deferred.promise;
    }

    function _f(func) {
        var _args = Array.prototype.slice.call(arguments).splice(1);
        var _timer = setTimeout(function() {
            log('Delay: Timeout -f done');
            func.apply(this, _args);
        }, Settings.userDelay);

    }

    return {
        q: _q,
        f: _f
    }

})();