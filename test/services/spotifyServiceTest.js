"use strict";
describe("Spotify Service", function(){
    //stubs, spies and mocks
    var _sandbox,
        _trackApiCallData = {
                                "href": "https://api.spotify.com/v1/users/wizzler/playlists/6Df19VKaShrdWrAnHinwVO/tracks",
                                "items": [ {
                                "added_at": "2013-08-21T15:10:32Z",
                                "added_by": {
                                  "external_urls": {
                                    "spotify": "http://open.spotify.com/user/wizzler"
                                  },
                                  "href": "https://api.spotify.com/v1/users/wizzler",
                                  "id": "wizzler",
                                  "type": "user",
                                  "uri": "spotify:user:wizzler"
                                },
                                "track": {
                                  "album": {
                                    "album_type": "compilation",
                                    "external_urls": {
                                      "spotify": "https://open.spotify.com/album/1tlMz7hGkgAvwfSkBjjKaX"
                                    },
                                    "href": "https://api.spotify.com/v1/albums/1tlMz7hGkgAvwfSkBjjKaX",
                                    "id": "1tlMz7hGkgAvwfSkBjjKaX",
                                    "images": [ {
                                      "height": 640,
                                      "url": "https://d3rt1990lpmkn.cloudfront.net/original/d3a61153502e003eeb7f3fe24a14c4da21d59c27",
                                      "width": 640
                                    }, {
                                      "height": 300,
                                      "url": "https://d3rt1990lpmkn.cloudfront.net/original/fbc5f6bbaf63ed3aad3b2f9fd7a039ce41575d37",
                                      "width": 300
                                    }, {
                                      "height": 64,
                                      "url": "https://d3rt1990lpmkn.cloudfront.net/original/37f6f93843792d7cda0c705c0d8c407f588a98cb",
                                      "width": 64
                                    } ],
                                    "name": "Archive #2 (1976-1992)",
                                    "type": "album",
                                    "uri": "spotify:album:1tlMz7hGkgAvwfSkBjjKaX"
                                  },
                                  "artists": [ {
                                    "external_urls": {
                                      "spotify": "https://open.spotify.com/artist/3CkvROUTQ6nRi9yQOcsB50"
                                    },
                                    "href": "https://api.spotify.com/v1/artists/3CkvROUTQ6nRi9yQOcsB50",
                                    "id": "3CkvROUTQ6nRi9yQOcsB50",
                                    "name": "Genesis",
                                    "type": "artist",
                                    "uri": "spotify:artist:3CkvROUTQ6nRi9yQOcsB50"
                                  } ],
                                  "available_markets": [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "IE", "IS", "IT", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SI", "SK", "SV", "TR", "TW", "UY" ],
                                  "disc_number": 1,
                                  "duration_ms": 234066,
                                  "explicit": false,
                                  "external_ids": {
                                    "isrc": "GBAAA0000806"
                                  },
                                  "external_urls": {
                                    "spotify": "https://open.spotify.com/track/0ktyIiKtDZS71pIykdHZ08"
                                  },
                                  "href": "https://api.spotify.com/v1/tracks/0ktyIiKtDZS71pIykdHZ08",
                                  "id": "0ktyIiKtDZS71pIykdHZ08",
                                  "name": "Naminanu - 2000 Digital Remaster",
                                  "popularity": 0,
                                  "preview_url": "http://d318706lgtcm8e.cloudfront.net/mp3-preview/f8982594262e8cdc158a7b0caede12723f84016a",
                                  "track_number": 8,
                                  "type": "track",
                                  "uri": "spotify:track:0ktyIiKtDZS71pIykdHZ08"
                                }
                                }, {
                                "added_at": "2013-08-21T15:11:13Z",
                                "added_by": {
                                  "external_urls": {
                                    "spotify": "http://open.spotify.com/user/wizzler"
                                  },
                                  "href": "https://api.spotify.com/v1/users/wizzler",
                                  "id": "wizzler",
                                  "type": "user",
                                  "uri": "spotify:user:wizzler"
                                }
                                } ],
                                "limit": 100,
                                "next": null,
                                "offset": 0,
                                "previous": null,
                                "total": 3
                            },
        _userPlaylistsApiCallData = {
                                  "href": "https://api.spotify.com/v1/users/wizzler/playlists",
                                  "items": [ {
                                    "collaborative": false,
                                    "external_urls": {
                                      "spotify": "http://open.spotify.com/user/wizzler/playlists/53Y8wT46QIMz5H4WQ8O22c"
                                    },
                                    "href": "https://api.spotify.com/v1/users/wizzler/playlists/53Y8wT46QIMz5H4WQ8O22c",
                                    "id": "53Y8wT46QIMz5H4WQ8O22c",
                                    "images" : [ ],
                                    "name": "Wizzlers Big Playlist",
                                    "owner": {
                                      "external_urls": {
                                        "spotify": "http://open.spotify.com/user/wizzler"
                                      },
                                      "href": "https://api.spotify.com/v1/users/wizzler",
                                      "id": "wizzler",
                                      "type": "user",
                                      "uri": "spotify:user:wizzler"
                                    },
                                    "public": true,
                                    "tracks": {
                                      "href": "https://api.spotify.com/v1/users/wizzler/playlists/53Y8wT46QIMz5H4WQ8O22c/tracks",
                                      "total": 30
                                    },
                                    "type": "playlist",
                                    "uri": "spotify:user:wizzler:playlist:53Y8wT46QIMz5H4WQ8O22c"
                                  }, {
                                    "collaborative": false,
                                    "external_urls": {
                                      "spotify": "http://open.spotify.com/user/wizzlersmate/playlists/1AVZz0mBuGbCEoNRQdYQju"
                                    },
                                    "href": "https://api.spotify.com/v1/users/wizzlersmate/playlists/1AVZz0mBuGbCEoNRQdYQju",
                                    "id": "1AVZz0mBuGbCEoNRQdYQju",
                                    "images" : [ ],
                                    "name": "Another Playlist",
                                    "owner": {
                                      "external_urls": {
                                        "spotify": "http://open.spotify.com/user/wizzlersmate"
                                      },
                                      "href": "https://api.spotify.com/v1/users/wizzlersmate",
                                      "id": "wizzlersmate",
                                      "type": "user",
                                      "uri": "spotify:user:wizzlersmate"
                                    },
                                    "public": true,
                                    "tracks": {
                                      "href": "https://api.spotify.com/v1/users/wizzlersmate/playlists/1AVZz0mBuGbCEoNRQdYQju/tracks",
                                      "total": 58
                                    },
                                    "type": "playlist",
                                    "uri": "spotify:user:wizzlersmate:playlist:1AVZz0mBuGbCEoNRQdYQju"
                                  } ],
                                  "limit": 9,
                                  "next": null,
                                  "offset": 0,
                                  "previous": null,
                                  "total": 9
                                },
        _playlistApiCallData = {
                                   "collaborative": false,
                                   "description": "This isn't public, right?",
                                   "external_urls": {
                                     "spotify": "http://open.spotify.com/user/thelinmichael/playlist/3ktAYNcRHpazJ9qecm3ptn"
                                   },
                                   "followers": {
                                     "href": null,
                                     "total": 3
                                   },
                                   "href": "https://api.spotify.com/v1/users/thelinmichael/playlists/3ktAYNcRHpazJ9qecm3ptn",
                                   "id": "3ktAYNcRHpazJ9qecm3ptn",
                                   "images": [ {
                                     "url": "https://dv72vokf4bztv.cloudfront.net/images/default/bffaa5ac203ab414867a275fdf2de2cbef204121?Expires=1408024780&Signature=hCRe9n7l4XZUP~ML9cIJzuH349SwLAG62IXo6RSEOlMlV984-yn8p-LNtOKFwSZnZygXhVkBPhyfqtzEESzH45oEeglUxtfbQnzjpKbMiU2fHnEYBhaS6C1cACpG5mFcv6LIIgpfUhu9NGHHgQ8phiQIslOUaTgxoXu93NkGhxc_&Key-Pair-Id=APKAJKQBZQ7SIKOPPMUQ"
                                   } ],
                                   "name": "The Shame List",
                                   "owner": {
                                     "external_urls": {
                                       "spotify": "http://open.spotify.com/user/thelinmichael"
                                     },
                                     "href": "https://api.spotify.com/v1/users/thelinmichael",
                                     "id": "thelinmichael",
                                     "type": "user",
                                     "uri": "spotify:user:thelinmichael"
                                   },
                                   "public": true,
                                   "snapshot_id": "Ig3gBsw3F2DWaL1COo9Qu5PPiR+mGC1GO8Mg3q3qp7SdW2GFon6Zz7+ocJ30wn3X",
                                   "tracks": {
                                   "href": "https://api.spotify.com/v1/users/thelinmichael/playlists/3ktAYNcRHpazJ9qecm3ptn/tracks",
                                   "items": [ {
                                     "added_at": "2014-03-19T11:11:50Z",
                                     "added_by": {
                                       "external_urls": {
                                         "spotify": "http://open.spotify.com/user/thelinmichael"
                                       },
                                       "href": "https://api.spotify.com/v1/users/thelinmichael",
                                       "id": "thelinmichael",
                                       "type": "user",
                                       "uri": "spotify:user:thelinmichael"
                                     },
                                     "track": {
                                       "album": {
                                         "album_type": "single",
                                         "available_markets": [ "AR", "BO", "BR", "CA", "CL", "CO", "CR", "DO", "EC", "GB", "GT", "HN", "NI", "PA", "PE", "PH", "PY", "SV", "UY" ],
                                         "external_urls": {
                                           "spotify": "https://open.spotify.com/album/4nOrpg3k8viJ5AtL0vOsg4"
                                         },
                                         "href": "https://api.spotify.com/v1/albums/4nOrpg3k8viJ5AtL0vOsg4",
                                         "id": "4nOrpg3k8viJ5AtL0vOsg4",
                                         "images": [ {
                                           "height": 640,
                                           "url": "https://i.scdn.co/image/e35c85e710f98d2d462b33ef72039a41bd0a25e9",
                                           "width": 640
                                         }, {
                                           "height": 300,
                                           "url": "https://i.scdn.co/image/7e07707c2ce0ceabd02ba9a541c77af6c6754461",
                                           "width": 300
                                         }, {
                                           "height": 64,
                                           "url": "https://i.scdn.co/image/3e8c3a7209283e01bec9ff872116b91430faebf5",
                                           "width": 64
                                         } ],
                                         "name": "Story of My Life",
                                         "type": "album",
                                         "uri": "spotify:album:4nOrpg3k8viJ5AtL0vOsg4"
                                       },
                                       "artists": [ {
                                         "external_urls": {
                                           "spotify": "https://open.spotify.com/artist/4AK6F7OLvEQ5QYCBNiQWHq"
                                         },
                                         "href": "https://api.spotify.com/v1/artists/4AK6F7OLvEQ5QYCBNiQWHq",
                                         "id": "4AK6F7OLvEQ5QYCBNiQWHq",
                                         "name": "One Direction",
                                         "type": "artist",
                                         "uri": "spotify:artist:4AK6F7OLvEQ5QYCBNiQWHq"
                                       } ],
                                       "available_markets": [ "AR", "BO", "BR", "CA", "CL", "CO", "CR", "DO", "EC", "GB", "GT", "HN", "NI", "PA", "PE", "PH", "PY", "SV", "UY" ],
                                       "disc_number": 1,
                                       "duration_ms": 244560,
                                       "explicit": false,
                                       "external_ids": {
                                         "isrc": "GBHMU1300210"
                                       },
                                       "external_urls": {
                                         "spotify": "https://open.spotify.com/track/5Wd2bfQ7wc6GgSa32OmQU3"
                                       },
                                       "href": "https://api.spotify.com/v1/tracks/5Wd2bfQ7wc6GgSa32OmQU3",
                                       "id": "5Wd2bfQ7wc6GgSa32OmQU3",
                                       "name": "Story of My Life",
                                       "popularity": 58,
                                       "preview_url": "https://p.scdn.co/mp3-preview/eb0d74437a5584bd35e66836b3f27952ce6a5a15",
                                       "track_number": 1,
                                       "type": "track",
                                       "uri": "spotify:track:5Wd2bfQ7wc6GgSa32OmQU3"                                     
                                        }
                                    }],
                                     "limit": 100,
                                     "next": null,
                                     "offset": 0,
                                     "previous": null,
                                     "total": 7
                                   },
                                   "type": "playlist",
                                   "uri": "spotify:user:thelinmichael:playlist:3ktAYNcRHpazJ9qecm3ptn"
                                };
    
    beforeEach(function(){
        _sandbox = sinon.sandbox.create();
        

        _sandbox.stub(window, "microAjax", function(url){
            var returnData, deferredType = 'resolve';

            switch(url){
                case '/v1/users/111/playlists':
                    returnData = _userPlaylistsApiCallData;
                break;
                case '/v1/users/111/playlists/222':
                    returnData = _playlistApiCallData;
                break;
                case '/v1/users/111/playlists/222/tracks':
                    returnData = _trackApiCallData;
                break; 
                default: 
                    returnData = 'error';
                    deferredType = 'reject';
            }

            return {
                then: function(callback){
                    if(returnData !== 'error') callback(returnData)
                    return this;
                },
                fail: function(callback){
                    if(returnData == 'error') callback(returnData)
                    return this;
                }
            };
        }); 
    })

    afterEach(function(){
        _sandbox.restore();
    })


    it("getTracks() should return data", function() {        
        spotifyService.getTracks('11ss1', '222').then(function(data){
            console.log(data)
            expect(data).toEqual(jasmine.any(Object));
        }).fail(function(error){
            expect(error).toEqual('error');
        })
    });

    it("getPlaylists() should return data", function() {
        expect(spotifyService.getPlaylists()).toEqual(jasmine.any(Array));
    });    
})
