"use strict";

var spotifyService = (function(id){
	var _spotifyTrackData = {},
		_apiUrl = 'https://api.spotify.com/v1',
		_config = {};

	function _getPlaylists(userId, pl, url, deferred){
		var _deferred = deferred || Q.defer(),
			_playLists = pl || [],
			_url = url || _apiUrl + '/users/' + userId + '/playlists?limit=50&offest=0';

		ajax(_url, _config).then(function(res) {
		    res.items.forEach(function(playlist){
		    		_playLists.push({
		    			'name': playlist.name,
		    			'id': playlist.id,
		    			'tracks': playlist.tracks.total,
		    			'owner': playlist.owner.id
		    		})
		    });

		    if(res.next){
		    	_getPlaylists(userId, _playLists, res.next, _deferred)
		    }
		    else{
		    	_deferred.resolve(_playLists);		    	
		    }
		});			

		return _deferred.promise;
	}

	function _getTrackData(userId, playListId){
		var _deferred = Q.defer();

		if(_spotifyTrackData[userId+playListId]){
			_deferred.resolve(_spotifyTrackData[userId+playListId]);
		}

		else{
		    ajax(_apiUrl + '/users/' + userId + '/playlists/' + playListId + '/tracks', _config).then(function(res) {
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

		    	_spotifyTrackData[userId+playListId] = _tracks
		      	_deferred.resolve(_spotifyTrackData[userId+playListId]);	      		      	
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
		getTracks : _getTrackData,
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