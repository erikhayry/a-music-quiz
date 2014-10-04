"use strict";
describe("Spotify Service", function(){
    //stubs, spies and mocks
    var _clock,
        _sandbox,
        _ajaxStub,
        _trackApiCallData = Stub_tracks,
        _userPlaylistsApiCallData = Stub_userPlaylists,
        _playlistApiCallData = Stub_playlistApiCallData;
    
    beforeEach(function(){
      _clock = sinon.useFakeTimers();
      _sandbox = sinon.sandbox.create();        
      _ajaxStub = _sandbox.stub(window, "ajax", function(url, config){
          var _deferred = Q.defer();
          var _returnData, _deferredType = 'resolve';

          switch(url){
              case 'https://api.spotify.com/v1/users/erikportin/playlists':
                  _returnData = _userPlaylistsApiCallData;
              break;
              case 'https://api.spotify.com/v1/users/erikportin/playlists/222':
                  _returnData = _playlistApiCallData;
              break;
              case 'https://api.spotify.com/v1/users/erikportin/playlists/222/tracks':
                  _returnData = _trackApiCallData;
              break;               
              default: 
                  _returnData = 'error';
                  _deferredType = 'reject';
          }
          _deferred[_deferredType](_returnData)
          return _deferred.promise;
      }); 
    })

    afterEach(function(){
        _sandbox.restore();
        _clock.restore();
    })

    describe("getTracks()", function(){

      it("should return track data", function() {  
        var _tracks;      
        spotifyService.getTracks('erikportin', '222').then(function(tracks){
          _tracks = tracks;
        })

        _clock.tick();
        expect(_tracks.length).toBe(5);

        expect(_tracks[0].artist.name).toEqual('Artist Name 1');
        expect(_tracks[0].artist.id).toEqual('1');
        expect(_tracks[0].track.name).toEqual('Track Name 1');
        expect(_tracks[0].track.url).toEqual('http://d318706lgtcm8e.cloudfront.net/mp3-preview/1');

        expect(_tracks[4].artist.name).toEqual('Artist Name 5');
        expect(_tracks[4].artist.id).toEqual('5');
        expect(_tracks[4].track.name).toEqual('Track Name 5');
        expect(_tracks[4].track.url).toEqual('http://d318706lgtcm8e.cloudfront.net/mp3-preview/5');

      });

      it("should use stored playlist data if exists", function() {  
        var _tracks;      
        spotifyService.getTracks('erikportin', '222').then(function(tracks){
          _tracks = tracks;
        })
        _clock.tick();
        expect(_ajaxStub.called).toBe(false);
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

        expect(_playlists.length).toBe(2)
        expect(_playlists[0].name).toEqual('Wizzlers Big Playlist');
        expect(_playlists[0].id).toEqual('53Y8wT46QIMz5H4WQ8O22c');
        expect(_playlists[0].tracks).toEqual(30);
        expect(_playlists[0].owner).toEqual('wizzler');
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
