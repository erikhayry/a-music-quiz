"use strict";

var spotifyService = (function(id){
	var _spotifyTrackData = {};

	function _getPlaylists(userId){
		var _deferred = Q.defer();

		microAjax('/v1/users/' + userId + '/playlists', function (res) {
			var _playLists = []; 
		    res.items.forEach(function(playlist){
		    		_playLists.push({
		    			'name': playlist.name,
		    			'id': playlist.id,
		    			'tracks': playlist.tracks.total,
		    			'owner': playlist.owner.id
		    		})
		    });	    		    		      	
		    _deferred.resolve(_playLists);
		});			

		return _deferred.promise;
	}

	function _getTrackData(userId, playListId){
		var _deferred = Q.defer();

		if(_spotifyTrackData[userId+playListId]){
			_deferred.resolve(_spotifyTrackData[userId+playListId]);
		}

		else{
		    microAjax('/v1/users/' + userId + '/playlists/' + playListId + '/tracks', function (res) {
		    	var _tracks = [];
		    	res.items.forEach(function(trackData){
		    		_tracks.push({
		    			'artist': {
		    				'name': trackData.track.artists[0].name
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

	return {
		getTracks : _getTrackData,
		getPlaylists : _getPlaylists
	}
})();