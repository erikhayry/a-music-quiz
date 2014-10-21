"use strict";
describe("Spotify Service", function(){
    //stubs, spies and mocks
    var _clock,
        _sandbox,
        _ajaxStub,
        _trackApiCallData = Stub_tracks,
        _userPlaylistsApiCallData = Stub_userPlaylists,
        _userPlaylistsApiCallDataOffset50 = Stub_userPlaylistsOffset50,
        _playlistApiCallData = Stub_playlistApiCallData,
        _offset = 0;
    
    beforeEach(function(){
      _clock = sinon.useFakeTimers();
      _sandbox = sinon.sandbox.create();        
      _ajaxStub = _sandbox.stub(window, "ajax", function(url, config){
          var _deferred = Q.defer();
          var _returnData, _deferredType = 'resolve';

          if(url.indexOf('https://api.spotify.com/v1/users/erikportin/playlists/53Y8wT46QIMz5H4WQ8O22c/tracks') === 0){
             _returnData = _trackApiCallData;
          }

          else{
            switch(url){
                case 'https://api.spotify.com/v1/users/erikportin/playlists?limit=50&offest=0':
                    _returnData = _userPlaylistsApiCallData;
                break;
                case 'https://api.spotify.com/v1/users/erikportin/playlists?limit=50&offest=50':
                    _returnData = _userPlaylistsApiCallDataOffset50;
                break;              
                case 'https://api.spotify.com/v1/users/erikportin/playlists/53Y8wT46QIMz5H4WQ8O22c':
                    _returnData = _playlistApiCallData;
                break;                           
                default: 
                    _returnData = 'error';
                    _deferredType = 'reject';
            }            
          }
          
          _deferred[_deferredType](_returnData);
          
          return _deferred.promise;
      }); 

      jasmine.addMatchers({            
        toBeCalledWithValidRandomOffset: function () {
            return {
                compare: function (actual, expected) {
                    var _url = actual,
                        _queries = {};
                    
                    _url.split('?')[1].split('&').forEach(function(query){
                      var keyPair = query.split('=');
                      _queries[keyPair[0]] = parseInt(keyPair[1]);
                    })

                    return {
                        pass: expected >= _queries.offset + _queries.limit
                    };
                }
            };
        }
      });
    })

    afterEach(function(){
        _sandbox.restore();
        _clock.restore();
    })

    describe("getTracks()", function(){

      it("should return track data", function() {  
        var _tracks;      
        spotifyService.getTracks('erikportin', '53Y8wT46QIMz5H4WQ8O22c', 200).then(function(tracks){
          _tracks = tracks;
        })

        _clock.tick();
        expect(_tracks.length).toBe(5);

        expect(_tracks[0].artist.name).toBeDefined()
        expect(_tracks[0].artist.id).toBeDefined()
        expect(_tracks[0].track.name).toBeDefined()
        expect(_tracks[0].track.url).toBeDefined()

        expect(_tracks[4].artist.name).toBeDefined()
        expect(_tracks[4].artist.id).toBeDefined()
        expect(_tracks[4].track.name).toBeDefined()
        expect(_tracks[4].track.url).toBeDefined()

        expect(_ajaxStub.args[2][0]).toBeCalledWithValidRandomOffset(200);

      });

      it("should use stored playlist data if exists", function() {  
        var _tracks; 
        
        spotifyService.getTracks('erikportin', '53Y8wT46QIMz5H4WQ8O22c', 99).then(function(tracks){
          _tracks = tracks;
        })
        _clock.tick();

        spotifyService.getTracks('erikportin', '53Y8wT46QIMz5H4WQ8O22c', 99).then(function(tracks){
          _tracks = tracks;
        })
        
        _clock.tick();

        expect(_ajaxStub.calledTwice).toBe(false);
        expect(_tracks.length).toBe(5);
      }); 


    });

    describe("getPlaylists()", function(){
      it("should return playlists", function() {
        var _playlists;
        
        spotifyService.getPlaylists('erikportin').then(function(playlists){
          _playlists = playlists;
        })
        
        _clock.tick();

        expect(_playlists['53Y8wT46QIMz5H4WQ8O22c'].name).toEqual('erikportins Big Playlist');
        expect(_playlists['53Y8wT46QIMz5H4WQ8O22c'].id).toEqual('53Y8wT46QIMz5H4WQ8O22c');
        expect(_playlists['53Y8wT46QIMz5H4WQ8O22c'].tracks).toEqual(30);
        expect(_playlists['53Y8wT46QIMz5H4WQ8O22c'].owner).toEqual('erikportin');
      
      });

      it("should return playlists from storage", function() {
        var _playlists;
        
        spotifyService.getPlaylists('erikportin').then(function(playlists){
          _playlists = playlists;
        })
        
        _clock.tick();

        expect(_playlists['53Y8wT46QIMz5H4WQ8O22c'].name).toEqual('erikportins Big Playlist');
        expect(_playlists['53Y8wT46QIMz5H4WQ8O22c'].id).toEqual('53Y8wT46QIMz5H4WQ8O22c');
        expect(_playlists['53Y8wT46QIMz5H4WQ8O22c'].tracks).toEqual(30);
        expect(_playlists['53Y8wT46QIMz5H4WQ8O22c'].owner).toEqual('erikportin');

        expect(_ajaxStub.called).toBe(false);
      
      });

    });

    describe("getTokens()", function(){
      it("should return tokens from url serach string", function() {
        var _tokens = spotifyService.getTokens('?key1=value1&access_token=access_token_value&key2=value2&refresh_token=refresh_token_value');

        expect(_tokens.refreshToken).toEqual('refresh_token_value');
        expect(_tokens.accessToken).toEqual('access_token_value');

      }); 
    });   

    describe("getUser()", function(){
      it("should return spotify user", function() {
        _sandbox.restore();
        var _ajaxSpy = sinon.spy(window, "ajax")
        spotifyService.getUser('access_token_value');

        _clock.tick();

        expect(_ajaxSpy.args[0][0]).toEqual('https://api.spotify.com/v1/me')
        expect(_ajaxSpy.args[0][1].headers.Authorization).toEqual('Bearer access_token_value')

      }); 
    });

})
