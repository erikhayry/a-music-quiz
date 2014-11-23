var Helpers = (function(){
	
	/**
	 * shuffle an array
	 * @param  {Array} array to be shuffled
	 * @return {Array}
	 */
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
	}

	/**
	 * determinates the audio support of the client
	 *
	 * Types
	 * 1 = supports autoplay
	 * 2 = support loadedmetadata event but not autoplay. User action required to play.
	 * 3 = no support for loadmetadata event nor autoplay. User action required to play.
	 * 
	 * @return {Number}
	 */
	function _getAudioSupport(){
		log('Helpers: _getAudioSupport')
		var _deferred = Q.defer(),
			_audioEl = document.createElement("audio"),
			_type = 3,
			_resolve = function(type){
				_deferred.resolve(type)
				_audioEl.parentNode.removeChild(_audioEl);
			}; 

		_audioEl.src = "https://p.scdn.co/mp3-preview/48bcbfa9e2a8468c662957c56bfa71baed32daf9";
		_audioEl.type = "audio/mpeg";
		_audioEl.preload = "auto";
		_audioEl.volume = 0; 

		_audioEl.addEventListener('loadedmetadata', function () {
			_type = 2;
		}, false);

		_audioEl.addEventListener('timeupdate', function () {
			_type = 1;
		}, false);

		//add audio element to body
		document.body.appendChild(_audioEl);

		window.setTimeout(function(){
			//no events fired in 500ms
			if(_type === 3){
				_resolve(_type)
			}
			else{
				//try to auto play
				_audioEl.play();
				window.setTimeout(function(){
					_resolve(_type)
				}, 200);
			}
		}, 500)

		return _deferred.promise; 
	}

	return {
		shuffle: _shuffle,
		getAudioSupport: _getAudioSupport
	}
})();