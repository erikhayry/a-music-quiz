"use strict";

var spotifyService = (function(id) {
    var _spotifyTrackData = {},
        _spotifyPlaylistData = {},
        _apiUrl = 'https://api.spotify.com/v1',
        _config = {};


    /**
     * Get all playlists from spotify api
     * @param  {String} userId
     * @param  {Object} settings
     * @return {[type]}
     */
    function _getPlaylists(userId, settings) {
        log('SpotifyService: _getPlaylists')

        var _settings = settings || {},
            _deferred = _settings.deferred || Q.defer(),
            _playLists = _settings.playlist || {},
            _url = _settings.url || _apiUrl + '/users/' + userId + '/playlists?limit=50&offest=0';

        //get from local storage if exists
        if (_spotifyPlaylistData[userId]) {
            _deferred.resolve(_spotifyPlaylistData[userId]);
        } 

        //get from api
        else {
            $.ajax(_url, _config).then(function(res) {
                res.items.forEach(function(playlist) {
                    _playLists[playlist.id] = {
                        'name': playlist.name,
                        'id': playlist.id,
                        'total': playlist.tracks.total,
                        'owner': playlist.owner.id
                    }
                });

                //keep requesting playlists if more exists
                if (res.next) {
                    _getPlaylists(userId, {
                        playlist: _playLists,
                        url: res.next,
                        deferred: _deferred
                    })
                } else {
                	//got all playlists. store playlists and resolve promise
                    _spotifyPlaylistData[userId] = _playLists;
                    _deferred.resolve(_spotifyPlaylistData[userId]);
                }
            }, function(error) {
                _deferred.reject(new Error('Unable to get playlists'));
            });
        }

        return _deferred.promise;
    }

	/**
	 * get playlist info from spotify api
	 * @param  {String} userId
	 * @param  {String} playListId
	 * @return {external: Promise}
	 */
    function _getPlaylistInfo(userId, playListId) {
        log('SpotifyService: _getPlaylistInfo')
        var _deferred = Q.defer();

        //resolve with existing data if exists
        if (_spotifyPlaylistData[userId] && _spotifyPlaylistData[userId][playListId]) {
            _deferred.resolve(_spotifyPlaylistData[userId][playListId]);
        } 

        //get from local storage if exists
        else {
            _getPlaylists(userId).then(function(playlists) {

                //TODO playlists sometimes missing
                if (playlists[playListId]) {
                    _deferred.resolve(playlists[playListId])
                
                } else {
                    _deferred.reject(new Error('Failed loading playlist info'));
                }
            }, function(error) {
            	_deferred.reject(new Error('Failed loading playlist info'));
            })
        }

        return _deferred.promise;
    }

    /**
     * get slice of tracks of playlist from spotify
     * @param  {String} userId
     * @param  {String} playListId
     * @param  {Number} total number of tracks in playlist
     * @return {external: Promise}
     */
    function _getTracks(userId, playListId, total) {
        log('SpotifyService: _getTracks')
        var _deferred = Q.defer(),
            _limit = 100, //max number of tracks spotify allow for a request
            _total = total || 0, //total number of tracks in playlist

            //set random offset 
            _offset = (_limit >= _total) ? 0 : Math.floor(Math.random() * (_total - _limit)),

            _url = _apiUrl + '/users/' + userId + '/playlists/' + playListId + '/tracks?limit=' + _limit + '&offset=' + _offset,
            
            /**
             * shuffle tracks and resolve
             * @param  {Array} tracks
             */
            _resolve = function(tracks) {
                _deferred.resolve(Helpers.shuffle(tracks));
            },

            /**
             * normalise data from spotify
             * @param  {Array} spotify api track data
             */
            _normaliseTrackData = function(items){
                var _tracks = [];
                items.forEach(function(trackData) {
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
            };

        //get stored data if available
        if (_spotifyTrackData[_url]) {
            _resolve(_spotifyTrackData[_url]);
        } 

        //get from local storage if exists
        else {
            $.ajax(_url, _config).then(function(res) {
            	_normaliseTrackData(res.items)
            }, function(error) {
            	_deferred.reject(error);
            });
        }

        return _deferred.promise;
    }

    function _getUser(accessToken) {
        log('SpotifyService: _getUser')
        _config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        };
        return $.ajax(_apiUrl + '/me', _config);
    }

    /**
     * Obtains parameters from the hash of the URL
     * @return Object
     */
    function _getSearchParams(searchParams) {
        log('SpotifyService: _getSearchParams')
        var _search = (searchParams.indexOf('?') === 0) ? searchParams.slice(1).split('&') : searchParams.split('&'),
            _searchObj = {};

        _search.forEach(function(param) {
            var paramArr = param.split('=');
            _searchObj[paramArr[0]] = paramArr[1];
        })

        return {
            access_token: _searchObj.access_token,
            refresh_token: _searchObj.refresh_token
        };
    }

    /**
     * Get spotify tokens from url
     * @param  {String} searchParams
     * @return {Object}	access and refresh token
     */
    function _getTokens(searchParams) {
        var _params = _getSearchParams(searchParams);
        return {
            accessToken: _params.access_token,
            refreshToken: _params.refresh_token
        };
    }

    return {
        getTracks: function(userId, playListId) {
            return  _getPlaylistInfo(userId, playListId).then(function(info) {
                return _getTracks(userId, playListId, info.total);
            });
        },

        /**
         * get all playlists for user from spotify
         * @type {external:Promise}
         */
        getPlaylists: _getPlaylists,

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