"use strict";
var Game = function(playerId, playlistId, settings){
	var _settings = settings || {};
	
	this.playlistId = playlistId;
	this.playerId = playerId;
	
	this._gameLength = _settings.gameLength;
	this._points = 0,	
	this._currentOptionsIndex = -1;
	this._currentRound = [];
	this._allTracks = {};
}

function _containsId(arr, id){
	for (var i = 0; i < arr.length; i++) {
		if(arr[i].id === id){
			return true;
		}
	};

	return false;
}

function _getAllTracks(game){
	var _deferred = Q.defer();

	if(Object.keys(game._allTracks).length !== 0){
		_deferred.resolve(game._allTracks);
	}
	
	else{
		spotifyService.getTracks(game.playerId, game.playlistId).then(function(tracks){
			game._allTracks = tracks;
			_deferred.resolve(game._allTracks);	
		});		
	}
	
	return _deferred.promise;
}

Game.prototype.next = function(){
	var _this = this,
		_deferred = Q.defer();

	_getAllTracks(_this).then(function(allTracks){
		var _gameLength = allTracks.length;
		if(_this._gameLength && _this._gameLength <= allTracks.length){
			_gameLength = _this._gameLength

		}

		if(_this._currentOptionsIndex + 1 >= _gameLength){
			_deferred.resolve(undefined);
		}
		else{
			_this._currentOptionsIndex++;	

			var _currentRound = {
				current: allTracks[_this._currentOptionsIndex],
				options: [{
						'id': allTracks[_this._currentOptionsIndex].artist.id,
						'name': allTracks[_this._currentOptionsIndex].artist.name
					}]
			}

			_currentRound.current.index = _this._currentOptionsIndex + 1;

			while(_currentRound.options.length < 4){
				var _randomIndex = Math.floor(Math.random() * allTracks.length);
				if(!_containsId(_currentRound.options, allTracks[_randomIndex].artist.id)){
					_currentRound.options.push({
						'id': allTracks[_randomIndex].artist.id,
						'name': allTracks[_randomIndex].artist.name
					});
				}
			}

			//shuffle options
			Helpers.shuffle(_currentRound.options)

			_this._currentRound = _currentRound;
			_this._currentRound.index = _this._currentOptionsIndex + 1;
			_this._currentRound.gameLength = _gameLength;

			_deferred.resolve(_currentRound);
		}
	})


    
    return _deferred.promise;	
}

Game.prototype.answer = function(answer, points){
	var _this = this,
		_deferred = Q.defer(),
		_ret = {
				isAnswerCorrect: false,
				points: _this._points
			};

	_getAllTracks(_this).then(function(allTracks){

		if(allTracks[_this._currentOptionsIndex].artist.id === answer){
			_ret = {
				isAnswerCorrect: true,
				points: _this._points += points
			}
		}

		_ret.rightAnswer = allTracks[_this._currentOptionsIndex].artist.id
		
		_deferred.resolve(_ret);
	});			

	return _deferred.promise;
}

Game.prototype.reset = function(){
	this._gameLength;
	this._points = 0,	
	this._currentOptionsIndex = -1;
	this._currentRound = [];
	this._allTracks = {};

	return this;
}