"use strict";

var spotifyService = (function(id){
	var _spotifyTrackData = {},
		_spotifyPlaylistData = {},
		_apiUrl = 'https://api.spotify.com/v1',
		_config = {};

	function _getPlaylists(userId, settings){

		var	_settings = settings || {},
			_deferred = _settings.deferred || Q.defer(),
			_playLists = _settings.playlist || {},
			_url = _settings.url || _apiUrl + '/users/' + userId + '/playlists?limit=50&offest=0';

		if(_spotifyPlaylistData[userId]){
			_deferred.resolve(_spotifyPlaylistData[userId]);
		}			

		else{
			ajax(_url, _config).then(function(res) {
			    res.items.forEach(function(playlist){
			    		_playLists[playlist.id] = {
			    			'name': playlist.name,
			    			'id': playlist.id,
			    			'tracks': playlist.tracks.total,
			    			'owner': playlist.owner.id
			    		}
			    });

			    if(res.next){
			    	_getPlaylists(userId, {
			    		playlist: _playLists, 
			    		url: res.next, 
			    		deferred: _deferred
			    	})
			    }
			    else{
			    	_spotifyPlaylistData[userId] = _playLists;
			    	_deferred.resolve(_spotifyPlaylistData[userId]);		    	
			    }
			});						
		}

		return _deferred.promise;
	}

	function _getPlaylistInfo(userId, playListId){
		var _deferred = Q.defer();

		if(_spotifyPlaylistData[userId] && _spotifyPlaylistData[userId][playListId]){
			_deferred.resolve(_spotifyPlaylistData[userId][playListId]);
		}
		else{
			return _getPlaylists(userId).then(function(playlists){
				return playlists[playListId]
			})
		}

		return _deferred.promise;
	}

	function _getTracks(userId, playListId, total){
		var _deferred = Q.defer(),
			_limit = 100,
			_total = total || 0,
			_offset = (_limit >= _total) ? 0 : Math.floor(Math.random() * (_total - _limit)),			
			_url = _apiUrl + '/users/' + userId + '/playlists/' + playListId + '/tracks?limit=' + _limit +'&offset=' + _offset,
			_resolve = function(data){
				_deferred.resolve(Helpers.shuffle(data));
			};

			if(_spotifyTrackData[_url]){
				_resolve(_spotifyTrackData[_url]);
			}

			else{
			    ajax(_url, _config).then(function(res) {
			    	var _tracks = [];
			    	res.items.forEach(function(trackData){
			    		_tracks.push({
			    			'artist': {
			    				'name': trackData.track.artists[0].name,
			    				'id': trackData.track.artists[0].id
			    			},
			    			'track': {
			    				'name': trackData.track.name,
			    				'url': trackData.track.preview_url
			    			}
			    		})
			    	})	    		    		      	

			    	_spotifyTrackData[_url] = _tracks;
			      	_resolve(_spotifyTrackData[_url]);     		      	
			    });			
			}				
			
	    return _deferred.promise;
	}

    function _getUser(accessToken){
        _config = {
          headers:  {
            'Authorization': 'Bearer ' + accessToken              
          }
        };    
        return ajax(_apiUrl + '/me', _config);
  	}
    
    /**
     * Obtains parameters from the hash of the URL
     * @return Object
     */
    function _getSearchParams(searchParams) { 
      	var _search = (searchParams.indexOf('?') === 0) ? searchParams.slice(1).split('&') : searchParams.split('&'),
      		_searchObj = {};

		_search.forEach(function(param){
			var paramArr = param.split('=');
			_searchObj[paramArr[0]] = paramArr[1];
		})

      return {
          access_token : _searchObj.access_token,
          refresh_token : _searchObj.refresh_token 
      };
    }

    function _getTokens(searchParams){
		var _params = _getSearchParams(searchParams);
		return {
		  accessToken : _params.access_token,
		  refreshToken : _params.refresh_token
		};
	}

	return {
		getTracks : function(userId, playListId){
			return _getPlaylistInfo(userId, playListId).then(function(info){
				return _getTracks(userId, playListId, info.tracks);
			})
		},
		getPlaylists : _getPlaylists,
		
		/**
		* get Spotify acces tokens
		* @return {Object} Tokens
		*/
		getTokens: _getTokens,

		/**
		* Get user data from Spotify
		* @param  {String} accessToken Spotify access token
		* @return {external:Promise}   User promise
		*/		
		getUser: _getUser
	}
})();