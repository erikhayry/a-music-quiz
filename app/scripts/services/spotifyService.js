"use strict";

var spotifyService = (function(id){
	var _spotifyData = [];

	function _getTracks(playListId){
		return [];
	}

	function _getPlaylists(userId){
		return [];
	}

	return {
		getTracks : _getTracks,
		getPlaylists : _getPlaylists
	}
})();