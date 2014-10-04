/**
 * @jsx React.DOM
 */

"use strict";

describe("Game Test",function(){
    var _ReactTestUtils, _GameViewProps, _GameView,  _points, _sandbox, _clock,
        _spotifyServiceStub = Stub_spotifyService,
        _gameGetNextTrackStub = Stub_getNextTrack;

    beforeEach(function() {
        _clock = sinon.useFakeTimers();
        _sandbox = sinon.sandbox.create();
        _ReactTestUtils = React.addons.ReactTestUtils;	
        _points = undefined, 

        //stubs, spies and mocks
        _sandbox.stub(spotifyService, "getTracks", function(){
            var _deferred = Q.defer();
            _deferred.resolve(_spotifyServiceStub);
            return _deferred.promise;
        });

        var _game = new Game('erikportin', '123');

        _sandbox.stub(_game, "getNextTrack", function(){
            var _deferred = Q.defer();            
            _deferred.resolve(_gameGetNextTrackStub);        
            return _deferred.promise;
        });

        _GameViewProps = {
            game: _game
        };        
    });

    afterEach(function(){
        _sandbox.restore();
        _clock.restore();
    })

   it("Should init a MusicPlayer and set initial state", function () {        
        _GameView = _ReactTestUtils.renderIntoDocument(GameView(_GameViewProps, ""));
        _GameView.setState();  

        _clock.tick();   
        console.log(_GameView.state)
        expect(_GameView).toBeDefined();

        //State
        var _state = _GameView.state;
        expect(_state.answered).toBe(false);
        expect(_state.tracks).toEqual(jasmine.any(Object));
        expect(_state.tracks.length).toBe(4);
        expect(_state.current.name).toEqual('Artist Name 1');
        expect(_state.current.url).toEqual('http://d318706lgtcm8e.cloudfront.net/mp3-preview/1');
        expect(_state.points).toEqual(0);
    });

/*     it("Should clear interval if question is answered", function () {
        var _intervalSpy = _sandbox.spy(window, "clearInterval");
        _GameView = _ReactTestUtils.renderIntoDocument(Game(_GameViewProps, ""));
        _GameView.setState();
        var _intervalId = _GameView.interval;
        
        expect(_intervalId).toBeDefined();

        _GameView.props.answered = true;
        _GameView.setState();
        
        expect(_intervalSpy.calledTwice).toEqual(true);
        expect(_intervalSpy.args[0][0]).toEqual(_intervalId);
        expect(_intervalSpy.args[1][0]).toEqual(_intervalId);
    });  

    it("Should call onAudioStop when music stops", function () {
        _GameView = _ReactTestUtils.renderIntoDocument(Game(_GameViewProps, ""));
        _GameView.setState();    
        _GameView.props.answered = true;
        _GameView.setState();
        
        expect(_points).toEqual(30);
    }); 

    it("Should set audio url", function () {
        _GameView = _ReactTestUtils.renderIntoDocument(Game(_GameViewProps, "")); 
        expect(_GameView.refs.audio.getDOMNode().src).toEqual('http://url.to.mp3/');
    }); */

});
