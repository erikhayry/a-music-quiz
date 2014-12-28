"use strict";

var spotifyService = (function(id) {
    var _apiUrl = 'https://api.spotify.com/v1',
        _config = {};


    /**
     * Get all playlists from spotify api
     * @param  {String} userId
     * @param  {Object} settings
     * @return {[type]}
     */
    function _getAllPlaylists(userId, settings) {
        log('SpotifyService: _getAllPlaylists')

        var _settings = settings || {},
            _deferred = _settings.deferred || Q.defer(),
            _playLists = _settings.playlist || {},
            _url = _settings.url || _apiUrl + '/users/' + userId + '/playlists?limit=50&offest=0';


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
                _getAllPlaylists(userId, {
                    playlist: _playLists,
                    url: res.next,
                    deferred: _deferred
                })
            } else {
                //got all playlists. convert to array, store playlists and resolve promise
                var _playListArr = [];

                for (var playlist in _playLists) {
                    _playListArr.push(_playLists[playlist])
                }

                _deferred.resolve({
                    obj: _playLists,
                    arr: _playListArr
                });
            }
        }, function(error) {
            _deferred.reject(new Error('Unable to get playlists'));
        });

        return _deferred.promise;
    }

    /**
     * get playlist info from spotify api
     * @param  {String} owner
     * @param  {String} playListId
     * @return {external: Promise}
     */
    function _getPlaylistInfo(owner, playListId) {
        log('SpotifyService: _getPlaylistInfo: ' + owner + ' | ' + playListId)
        var _deferred = Q.defer();

        _getAllPlaylists(owner).then(function(playlists) {
            //TODO playlists sometimes missing
            if (playlists.obj[playListId]) {
                _deferred.resolve(playlists.obj[playListId])

            } else {
                _deferred.reject(new Error('Failed loading playlist info'));
            }
        }, function(error) {
            _deferred.reject(new Error('Failed loading playlist info'));
        })

        return _deferred.promise;
    }


    /**
     * normalise data from spotify
     * @param  {Array} spotify api track data
     */
    function _normaliseTrackData(items) {
        log.groupCollapsed('_normaliseTrackData')

        var _tracks = [],
            _getArtistNames = function(artists) {
                var artistNamesArr = [];

                for (var i = 0; i < artists.length; i++) {
                    artistNamesArr.push(artists[i].name);
                };
                return artistNamesArr.join(', ');
            };

        items.forEach(function(trackData) {
            if (trackData.track.preview_url) {
                //TODO get all artist names
                _tracks.push({
                    'artist': {
                        'name': _getArtistNames(trackData.track.artists),
                        'id': trackData.track.artists[0].id
                    },
                    'track': {
                        'name': trackData.track.name,
                        'url': trackData.track.preview_url,
                        'id': trackData.track.id
                    }
                })
            } else {
                //TODO return error if playlist to short
                log('preview_url missing for ' + trackData.track.name)
            }

        })

        log.groupEnd()

        return _tracks;
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
            _calls = 5, //number of different calls to make. only make one if playlist is small

            //set random offset 
            _offset = 0,

            _url = '',
            _urls = [],

            _tracks = []; //playlist data

        //make only one call if playlist is small
        if (_total < _limit) {
            _calls = 1;
        }

        log.groupCollapsed('playlist calls')
        for (var i = 0; i < _calls; i++) {
            _offset = (_limit >= _total) ? 0 : Math.floor(Math.random() * (_total - _limit));
            _url = _apiUrl + '/users/' + userId + '/playlists/' + playListId + '/tracks?limit=' + _limit + '&offset=' + _offset;
            log(_url);
            _urls.push($.ajax(_url, _config))
        };
        log.groupEnd()


        Q.all(_urls)
            .then(function(data) {
                var _total = 0;

                data.forEach(function(playlistData) {
                    _total = playlistData.total;
                    _tracks = _tracks.concat(playlistData.items)
                })

                var _normalisedTracks = _normaliseTrackData(_tracks),
                    _shuffledTracks = Helpers.shuffle(_normalisedTracks);

                _deferred.resolve({
                    tracks: _shuffledTracks,
                    total: _total
                });

            }, function(error) {
                console.error('error')
                _deferred.reject(error);
            })

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

    /**
     * Get playlist owner and id from url string
     * @param  {String} url
     * @return {Object} owner and id if valid url
     */
    function _getUrl(str) {
        var _ret = '';

        if (str.indexOf('spotify:user') > -1) {
            var _arr = str.split(':')
            if (_arr.length === 5) {
                _ret = {
                    owner: _arr[2],
                    id: _arr[4]
                };
            }
        } else if ( str.indexOf('http://open.spotify.com/user/') > -1 || 
                    str.indexOf('https://open.spotify.com/user/') > -1 ||
                    str.indexOf('http://play.spotify.com/user/') > -1 ||
                    str.indexOf('https://play.spotify.com/user/') > -1
                ) {
            var _arr = str.split('/')
            if (_arr.length === 7) {
                _ret = {
                    owner: _arr[4],
                    id: _arr[6]
                };
            }
        }

        return _ret;
    }

    return {
        login: function() {
            return $.ajax('api/login', {
                refresh: true
            })
        },

        getTracks: function(userId, playListId) {
            return _getTracks(userId, playListId).then(function(data) {
                return _getTracks(userId, playListId, data.total);
            }, function() {
                console.error('error - _getPlaylistInfo')
            });
        },

        /**
         * get all playlists for user from spotify
         * @type {external:Promise}
         */
        getAllPlaylists: _getAllPlaylists,

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
        getUser: _getUser,

        /**
         * Get playlist owner and id from url string
         * @param  {String} url
         * @return {Object} owner and id if valid url
         */
        getUrl: _getUrl
    }
})();