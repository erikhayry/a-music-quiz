// usage: log('inside coolFunc',this,arguments);
// http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function() {
    var _this = this;

    log.history = log.history || []; // store logs to an array for reference
    log.history.push(arguments);

    log.div = function() {
        if (Settings.debug) {
            _this.log('------------------------------------')
        }
    }

    log.groupCollapsed = function(title) {
        if (Settings.debug) {
            console.groupCollapsed(title);
        }
    }

    log.groupEnd = function() {
        if (Settings.debug) {
            console.groupEnd();
        }
    }

    if (Settings.debug) {
        if (this.console) {
            console.log(Array.prototype.slice.call(arguments));
        }
    }
};