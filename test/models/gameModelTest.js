"use strict";
describe("Game Model", function(){
    var _game;

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
        _game.points += 3000;
        expect(_game.points).toEqual(3000);
    })
});

describe("Game.getNextTrack()", function(){
    var _game, _getNextTrack, _sandbox, _clock, _options, 
        _spotifyServiceStub = [
            {artist: {name: 'Artist Name 1', id:"1"}, track: {name: 'Track Name 1', url: 'http://d318706lgtcm8e.cloudfront.net/mp3-preview/1'}},
            {artist: {name: 'Artist Name 2', id:"2"}, track: {name: 'Track Name 2', url: 'http://d328706lgtcm8e.cloudfront.net/mp3-preview/2'}},
            {artist: {name: 'Artist Name 3', id:"3"}, track: {name: 'Track Name 3', url: 'http://d338706lgtcm8e.cloudfront.net/mp3-preview/3'}},
            {artist: {name: 'Artist Name 4', id:"4"}, track: {name: 'Track Name 4', url: 'http://d348706lgtcm8e.cloudfront.net/mp3-preview/4'}},
            {artist: {name: 'Artist Name 5', id:"5"}, track: {name: 'Track Name 5', url: 'http://d358706lgtcm8e.cloudfront.net/mp3-preview/5'}},
            {artist: {name: 'Artist Name 6', id:"6"}, track: {name: 'Track Name 6', url: 'http://d368706lgtcm8e.cloudfront.net/mp3-preview/6'}}
        ]

    beforeEach(function() {    
        _sandbox = sinon.sandbox.create();
        
        _clock = sinon.useFakeTimers(); 

        //stubs, spies and mocks
        _sandbox.stub(spotifyService, "getTracks", function(){
            var _deferred = Q.defer();
            _deferred.resolve(_spotifyServiceStub);
            return _deferred.promise;
        });

        _game = new Game('erikportin', '123');
        _getNextTrack = _game.getNextTrack()

        jasmine.addMatchers({
            
            toBeIdInObjectArray: function(){
                return {
                    compare: function (actual, expected) {
                        return {
                            pass: expected.some(function(obj){
                                return obj.id === actual;
                            })
                        }
                    }
                };                
            },     

            toBeUnique: function () {
                return {
                    compare: function (actual, expected) {
                        var n = 0;
                        expected.forEach(function(string){
                            if(string === actual){
                                n++;
                            }
                        })

                        return {
                            pass: n === 1
                        };
                    }
                };
            }

        });

    });

    afterEach(function () {
        _sandbox.restore();
        _clock.restore();
    });


    it("should return next game options property values", function(){
        _getNextTrack.then(function(options){
            _options = options;
        })
        _clock.tick();
    
        expect(_game.currentOptionsIndex).toEqual(0);
        expect(_options.current.track.url).toEqual('http://d318706lgtcm8e.cloudfront.net/mp3-preview/1');
        expect(_options.current.track.name).toEqual('Track Name 1');
        expect(_options.current.artist.name).toEqual('Artist Name 1');
        expect(_options.current.artist.id).toEqual('1');

        expect(_options.options.length).toEqual(4);
        expect('1').toBeIdInObjectArray(_options.options);
    });

    it("should return unique game option values", function(){     
        _getNextTrack.then(function(options){
            _options = options;
        })
        _clock.tick();      

        expect(_options.options[0].id).toBeDefined();
        expect(_options.options[0].name).toBeDefined();

        expect(_options.options[0]).toBeUnique(_options.options);
        expect(_options.options[1]).toBeUnique(_options.options);
        expect(_options.options[2]).toBeUnique(_options.options);
        expect(_options.options[3]).toBeUnique(_options.options);
    });

    it("should return following game options property values", function(){
        _getNextTrack.then(function(options){

        })
        _game.getNextTrack().then(function(options){
            _options = options;
        })
        _clock.tick();
        
        expect(_game.currentOptionsIndex).toEqual(1);
        expect(_options.current.track.url).toEqual('http://d328706lgtcm8e.cloudfront.net/mp3-preview/2');
        expect(_options.current.track.name).toEqual('Track Name 2');
        expect(_options.current.artist.name).toEqual('Artist Name 2');
        expect(_options.current.artist.id).toEqual('2');
    });

    it("should return undefined and reset current options index if no more options", function(){
        _getNextTrack.then(function(options){
        })
        _game.getNextTrack().then(function(options){
        })
        _game.getNextTrack().then(function(options){
        })
        _game.getNextTrack().then(function(options){
        })
        _game.getNextTrack().then(function(options){
        })
        _game.getNextTrack().then(function(options){
        })       
        _game.getNextTrack().then(function(options){
            _options = options       
        })            
        _clock.tick();
        expect(_game.currentOptionsIndex).toEqual(-1);
        expect(_options).toBeUndefined();   
    });   
})
