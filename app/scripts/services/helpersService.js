var Helpers = (function(){
	
	function _shuffle(array) {
	  var _currentIndex = array.length, _temporaryValue, _randomIndex;

	  // While there remain elements to shuffle...
	  while (0 !== _currentIndex ) {

	    // Pick a remaining element...
	    _randomIndex = Math.floor(Math.random() * _currentIndex);
	    _currentIndex -= 1;

	    // And swap it with the current element.
	    _temporaryValue = array[_currentIndex];
	    array[_currentIndex] = array[_randomIndex];
	    array[_randomIndex] = _temporaryValue;
	  }


	  return array;
	},

	function _getAudioSupport(){
		var _deferred = Q.defer(),
			_audioEl = document.createElement("audio"),
			_type = 1,
			_resolve = function(type){
				_deferred.resolve(type)
				_audioEl.parentNode.removeChild(_audioEl);
			}; 

		_audioEl.src = "https://p.scdn.co/mp3-preview/48bcbfa9e2a8468c662957c56bfa71baed32daf9";
		_audioEl.type = "audio/mpeg";
		_audioEl.preload = "auto";
		_audioEl.volume = 0; 

		_audioEl.addEventListener('loadedmetadata', function () {
			_type++;
		}, false);

		_audioEl.addEventListener('timeupdate', function () {
			_type++;
		}, false);

		document.body.appendChild(_audioEl);

		window.setTimeout(function(){
			if(_type === "3"){
				_resolve(_type)
			}
			else{
				_audioEl.play();
				window.setTimeout(function(){
					_resolve(_type)
				}, 3000);
			}
		}, 3000)

		return _deferred.promise; 
	}

	return {
		shuffle: _shuffle,
		getAudioSupport: _getAudioSupport
	}
})();