"use strict";

var spotifyService = (function(id){
	var _spotifyData = [];

	function _getPlaylists(userId){
		return [];
	}

	return {
		getTracks : function(userId, playListId){
		    return microAjax('/v1/users/' + userId + '/playlists/' + playListId + '/tracks', function (res) {
		    	var deferred = Q.defer();
		      	deferred.resolve(res);
		      	return deferred.promise;
		    });
		},
		getPlaylists : _getPlaylists
	}
})();