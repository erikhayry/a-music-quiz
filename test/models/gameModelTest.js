"use strict";
describe("Game Model", function(){
    var _clock, _game, _spotifyServiceGetTracks, _sandbox,
        _spotifyTracks = [
                    {
                        'artist': {
                            'name': 'Radiohead',
                            'id': 1
                        },
                        'track': {
                            'name': 'Creep',
                            'url': 'http:url.to.track1.mp3'
                        }
                    },
                    {
                        'artist': {
                            'name': 'The Knife',
                            'id': 2
                        },
                        'track': {
                            'name': 'Silent Shout',
                            'url': 'http:url.to.track2.mp3'
                        }
                    },
                    {
                        'artist': {
                            'name': 'Radiohead',
                            'id': 1
                        },
                        'track': {
                            'name': 'Knives Out',
                            'url': 'http:url.to.track3.mp3'
                        }
                    },
                    {
                        'artist': {
                            'name': 'M.I.A',
                            'id': 3
                        },
                        'track': {
                            'name': 'Paper Planes',
                            'url': 'http:url.to.track4.mp3'
                        }
                    },
                    {
                        'artist': {
                            'name': 'Beck',
                            'id': 4
                        },
                        'track': {
                            'name': 'Air',
                            'url': 'http:url.to.track5.mp3'
                        }
                    },
                    {
                        'artist': {
                            'name': 'Bob Hund',
                            'id': 5
                        },
                        'track': {
                            'name': 'Fantastiskt',
                            'url': 'http:url.to.track6.mp3'
                        }
                    },
                    {
                        'artist': {
                            'name': 'Fever Ray',
                            'id': 6
                        },
                        'track': {
                            'name': 'Kepp the Streets Empty',
                            'url': 'http:url.to.track7.mp3'
                        }
                    }   
        ];

    beforeEach(function() {    
        _sandbox = sinon.sandbox.create();
        //stubs, spies and mocks
        _clock = sinon.useFakeTimers();
        _sandbox.stub(spotifyService, "getTracks", function(){
            var _deferred = Q.defer();
            _deferred.resolve(_spotifyTracks);
            return _deferred.promise;
        });    


    });

    afterEach(function () {
        _sandbox.restore();
        _clock.restore();
    });

    it("Should be defined and have inital properties set", function() {
        _game = new Game('erikportin', '123');

        expect(_game).toBeDefined();  
        expect(_game.id).toEqual('123');
        expect(_game.player).toEqual('erikportin');
        expect(_game.points).toEqual(0);
        expect(_game.currentOptionsIndex).toEqual(-1);
    });

    it("Should be able to add to points", function(){
        _game = new Game('erikportin', '123');    
        _clock.tick(); 
        _game.points += 3000;
        expect(_game.points).toEqual(3000);
    })
});

/*describe("Game.getNextTrack()", function(){
    var _game, _options, _sandbox;

    beforeEach(function() {    
        _sandbox = sinon.sandbox.create();
        //stubs, spies and mocks
       
        _game = new Game('erikportin', '123');
        _options = _game.getNextTrack()
    });

    afterEach(function () {
        _sandbox.restore();
    });

    it("should return next game options property values", function(){
        expect(_game.currentOptionsIndex).toEqual(0);
        expect(_options.track.url).toEqual('http:url.to.track2.mp3');
        expect(_options.track.name).toEqual('Silent Shout');
        expect(_options.artist.id).toContain('Silent Shout');  
        expect(_options.artist.name).toContain('Silent Shout');    
    });

    it("should return unique game option values", function(){        
        var _unqiueOptions = [];
        
        _options.options.forEach(function(option){
            if(_unqiueOptions.indexOf(option) === -1){
                _unqiueOptions.push(option)
            }
        })

        expect(_unqiueOptions.length).toEqual(4);
    });

    it("should return following game options property values", function(){
        var _options2 = _game.getNextTrack();      
        expect(_game.currentOptionsIndex).toEqual(1);
        expect(_options2.track.url).toEqual('http:url.to.track2.mp3');
        expect(_options2.track.name).toEqual('Silent Shout');
        expect(_options2.artist.id).toContain('Silent Shout');  
        expect(_options2.artist.name).toContain('Silent Shout');  
    });

    it("should return undefined and reset current options index if no more options", function(){
        var _optionsLast = _game.getNextTrack();   
        
        _optionsLast = _game.getNextTrack();
        _optionsLast = _game.getNextTrack();
        _optionsLast = _game.getNextTrack();
        _optionsLast = _game.getNextTrack();

        expect(_game.currentOptionsIndex).toEqual(-1);
        expect(_optionsLast).toBeUndefined();   
    });    

})*/
