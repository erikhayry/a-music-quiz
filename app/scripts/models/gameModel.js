"use strict";
var Game = function(playerName, playlistId){
	var _this = this;
	_this.id = playlistId;
	_this.player = playerName;
	_this.currentOptionsIndex = -1;
	_this.points = 0;
}

Game.prototype.getAllTracks = function(){
	var _this = this,
		_deferred = Q.defer();
	
	if(_this.options){
		_deferred.resolve(_this.options);
	}
	
	else{
		spotifyService.getTracks(_this.playerName, _this.playlistId).then(function(tracks){
			_this.options = tracks;
			_deferred.resolve(_this.options);	
		});		
	}
	
	return _deferred.promise;
}

Game.prototype.getNextTrack = function(){
	var _this = this,
		_deferred = Q.defer();

	_this.getAllTracks().then(function(tracks){
		var _optionsLength = tracks.length;
		if(_this.currentOptionsIndex + 1 >= _optionsLength){
			_this.currentOptionsIndex = -1;
			_deferred.resolve(undefined);
		}
		else{
			_this.currentOptionsIndex++;	

			var _nextTrack = {
				current: tracks[_this.currentOptionsIndex],
				options: [
					tracks[_this.currentOptionsIndex].artist.name
				]
			}

			while(_nextTrack.options.length < 4){
				var _randomIndex = Math.floor(Math.random() * _optionsLength);
				if(_nextTrack.options.indexOf(tracks[_randomIndex].artist.name) === -1){
					_nextTrack.options.push(tracks[_randomIndex].artist.name);
				}
			}
			_deferred.resolve(_nextTrack);			
		}
	})


    
    return _deferred.promise;	
}