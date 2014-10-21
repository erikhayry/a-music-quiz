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
	}

	return {
		shuffle: _shuffle
	}
})();