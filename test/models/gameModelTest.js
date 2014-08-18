"use strict";
describe("Game Model", function(){
    var _game, _spotifyServiceGetTracks;

    //stubs, spies and mocks
    _spotifyServiceGetTracks = sinon.stub(spotifyService, "getTracks").returns([
        {trackUrl: 'http:url.to.track1.mp3', trackName: 'Creep'},   
        {trackUrl: 'http:url.to.track2.mp3', trackName: 'Silent Shout'},    
        {trackUrl: 'http:url.to.track3.mp3', trackName: 'Paper Planes'},    
        {trackUrl: 'http:url.to.track4.mp3', trackName: 'Air'}, 
        {trackUrl: 'http:url.to.track5.mp3', trackName: '2012'}
    ]);


    beforeEach(function() {
        _game = new Game('123'); 
    });

    it("Should be defined and have inital properties set", function() {
        expect(_game).toBeDefined();  
        expect(_game.id).toEqual('123');
        expect(_game.points).toEqual(0);
        expect(_game.currentOptionsIndex).toEqual(-1);
        expect(_game.options).toEqual(jasmine.any(Array));
    });

    it("Should be able to add to points", function(){
        _game.points += 3000;
        expect(_game.points).toEqual(3000);
    })
});

describe("Game.getNextOptions()", function(){
    var _game, _options;

    beforeEach(function() {
        _game = new Game('123');
        _options = _game.getNextOptions();
    });

    it("should return next game options property values", function(){        
        expect(_game.currentOptionsIndex).toEqual(0);
        expect(_options.trackUrl).toEqual('http:url.to.track1.mp3');
        expect(_options.trackName).toEqual('Creep');
        expect(_options.options.length).toEqual(4);
        expect(_options.options).toContain('Creep');    
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
        var _options2 = _game.getNextOptions();      
        expect(_game.currentOptionsIndex).toEqual(1);
        expect(_options2.trackUrl).toEqual('http:url.to.track2.mp3');
        expect(_options2.trackName).toEqual('Silent Shout');
        expect(_options2.options).toContain('Silent Shout');    
    });

    it("should return undefined and reset current options index if no more options", function(){
        var _optionsLast = _game.getNextOptions();   
        
        _optionsLast = _game.getNextOptions();
        _optionsLast = _game.getNextOptions();
        _optionsLast = _game.getNextOptions();
        _optionsLast = _game.getNextOptions();

        expect(_game.currentOptionsIndex).toEqual(-1);
        expect(_optionsLast).toBeUndefined();   
    });    

})
