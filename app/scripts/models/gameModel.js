"use strict";
var Game = function(playerName, playlistId){
	this.id = playlistId;
	this.player = playerName;
	this.currentOptionsIndex = -1;
	this.points = 0,
	this.nextTrack = [];
}

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

function _containsId(arr, id){
	for (var i = 0; i < arr.length; i++) {
		if(arr[i].id === id){
			return true;
		}
	};

	return false;
}

Game.prototype.getAllTracks = function(){
	console.log('getAllTracks')
	var _this = this,
		_deferred = Q.defer();
	
	if(_this.allTracks){
		_deferred.resolve(_this.allTracks);
	}
	
	else{
		spotifyService.getTracks(_this.player, _this.id).then(function(tracks){
			_this.allTracks = tracks;
			_deferred.resolve(_this.allTracks);	
		});		
	}
	
	return _deferred.promise;
}

Game.prototype.getNextTrack = function(){
	console.log('getNextTrack')
	var _this = this,
		_deferred = Q.defer();

	_this.getAllTracks().then(function(allTracks){
		var _optionsLength = allTracks.length;
		if(_this.currentOptionsIndex + 1 >= _optionsLength){
			_this.currentOptionsIndex = -1;
			_deferred.resolve(undefined);
		}
		else{
			_this.currentOptionsIndex++;	

			var _nextTrack = {
				current: allTracks[_this.currentOptionsIndex],
				options: [{
						'id' : allTracks[_this.currentOptionsIndex].artist.id,
						'name' : allTracks[_this.currentOptionsIndex].artist.name
					}]
			}

			while(_nextTrack.options.length < 4){
				var _randomIndex = Math.floor(Math.random() * _optionsLength);
				if(!_containsId(_nextTrack.options, allTracks[_randomIndex].artist.id)){
					_nextTrack.options.push({
						'id' : allTracks[_randomIndex].artist.id,
						'name' : allTracks[_randomIndex].artist.name
					});
				}
			}

			//shuffle options
			_shuffle(_nextTrack.options)

			_this.nextTrack = _nextTrack;

			_deferred.resolve(_nextTrack);
		}
	})


    
    return _deferred.promise;	
}