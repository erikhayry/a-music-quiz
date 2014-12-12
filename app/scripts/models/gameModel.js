"use strict";
var Game = function(playerId, playlistId, settings) {
    var _settings = settings || {};

    this.playlistId = playlistId;
    this.playerId = playerId;
    this.history = [];
    this.round = [];

    this._gameLength = _settings.gameLength;
    this._points = 0,
    this._currentOptionsIndex = -1;
    this._allTracks = {},
    this._isValidPlaylist = true;
}

function _containsId(arr, id) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
            return true;
        }
    };

    return false;
}

function _getAllTracks(game) {
    var _deferred = Q.defer();

    if (Object.keys(game._allTracks).length !== 0) {
        _deferred.resolve(game._allTracks);
    } else {
        spotifyService.getTracks(game.playerId, game.playlistId).then(function(tracks){
        	//TODO better error handling
        	if(tracks){
	            game._allTracks = tracks;
	            _deferred.resolve(game._allTracks);        		
        	}
        	else{
        		_deferred.reject(new Error('unable to get playlist'))
        	}
        }, function(){
            console.log('error getTracks')
        });
    }

    return _deferred.promise;
}

function _isValidPlaylist(allTracks){
	var _artists = {},
		_count = 0;

	allTracks.forEach(function(track){
		if(!_artists[track.artist.id]){
			_artists[track.artist.id] = track.artist.id
			_count++
		}
	});


	return _count > 3;
}

function _setCurrentRound(game, allTracks, gameLength){
    log('Game Model: _setCurrentRound')
    log(game, allTracks, gameLength)
    game._currentOptionsIndex++;

    //set current track for round
    var _currentRound = {
        current: allTracks[game._currentOptionsIndex],
        options: [{
            'id': allTracks[game._currentOptionsIndex].artist.id,
            'name': allTracks[game._currentOptionsIndex].artist.name
        }]
    }

    _currentRound.current.index = game._currentOptionsIndex + 1;

    //add three more random tracks from different artists
    while (_currentRound.options.length < 4) {
        var _randomIndex = Math.floor(Math.random() * allTracks.length);
        if (!_containsId(_currentRound.options, allTracks[_randomIndex].artist.id)) {
            _currentRound.options.push({
                'id': allTracks[_randomIndex].artist.id,
                'name': allTracks[_randomIndex].artist.name
            });
        }
    }

    //shuffle options
    _currentRound.options =  Helpers.shuffle(_currentRound.options)

    game.round = _currentRound;
    game.round.index = game._currentOptionsIndex + 1;
    game.round.gameLength = gameLength; 
}

/**
 * get the next round. Also used to start the game
 * @return {external: Promise}
 */
Game.prototype.next = function() {
    var _this = this,
        _deferred = Q.defer();

    _getAllTracks(_this).then(function(allTracks) {
        //check if playlist got enough tracks
        if(!_this._isValidPlaylist && !_isValidPlaylist(allTracks)){
            _this._isValidPlaylist = false;
        	_deferred.reject(new Error('not valid playlist'))
        }
        else{
			var _gameLength = allTracks.length;

		    //set game length
		    if (_this._gameLength && _this._gameLength <= allTracks.length) {
		        _gameLength = _this._gameLength
		    }

		    //game over
		    if (_this._currentOptionsIndex + 1 >= _gameLength) {
		        _deferred.resolve(undefined);
		    } 

		    //get next song
		    else {
                _setCurrentRound(_this, allTracks, _gameLength);
		        _deferred.resolve(_this);
		    }
        }

    }, function(error){
    	_deferred.reject(error);
    });

    return _deferred.promise;
}

/**
 * answer round
 * @param  {String} answer: artist id)
 * @param  {Number} points: scored if answer is correct)
 * @return {external: Promise}
 */
Game.prototype.answer = function(answer, points) {
    log('Game Model: answer')
    log(answer)
    var _this = this,
        _deferred = Q.defer(),
        _history = {},
        _ret = {
            isAnswerCorrect: false,
            points: _this._points
        };

    //TODO error handling and check potential race condition
    _getAllTracks(_this).then(function(allTracks) {
        if (allTracks[_this._currentOptionsIndex].artist.id === answer) {
            _this._points += parseInt(points);

            _history = {
                rightAnswer: true,
                points: points,
            };
            
            _ret = {
                isAnswerCorrect: true,
                points: _this._points
            }
        }

        else{
            _history = {
                rightAnswer: false,
                points: 0,
            };
        }

        //Add to history
        _history.data = allTracks[_this._currentOptionsIndex];
        _history.answer = answer;
        
        _this.history.push(_history);

        _ret.rightAnswer = allTracks[_this._currentOptionsIndex].artist.id

        _deferred.resolve(_this);
    });

    return _deferred.promise;
}

/**
 * retrun game history
 * @return {Array} history Array
 */
Game.prototype.getHistory = function() {
    log('Game Model: getHistory')
    log(this.history)
    return this.history;
};

/**
 * reset game to initial state
 * @return {Game}
 */
Game.prototype.reset = function() {
    this._gameLength;
    this._points = 0,
    this._currentOptionsIndex = -1;
    this.round = [];
    this._allTracks = {};

    return this;
}