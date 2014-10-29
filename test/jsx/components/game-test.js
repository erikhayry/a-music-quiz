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

        _sandbox.stub(_game, "next", function(){
            var _deferred = Q.defer();            
            _deferred.resolve(_gameGetNextTrackStub);        
            return _deferred.promise;
        });

        _sandbox.stub(_game, "answer", function(answer, points){
            var _deferred = Q.defer();            
            _deferred.resolve({
                rightAnswer: '1',
                isAnswerCorrect: true,
                points: 20
            });        

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

   it("Should init a new game a start first round", function () { 
        _GameView = _ReactTestUtils.renderIntoDocument(GameView(_GameViewProps, ""));
        _GameView.setState();  

        _clock.tick();   
        expect(_GameView).toBeDefined();
        
        //State
        var _state = _GameView.state;

        expect(_state.options.length).toBe(4);
        expect(_state.current.artist.id).toBe('1');
        expect(_state.points).toBe(0);
        expect(_state.round).toBe(1);
        expect(_state.gameLength).toBe(10);
        expect(_state.rightAnswer).toBe(null);
        expect(_state.answer).toBe(null);
        expect(_state.gameOver).toBe(false);
        expect(_state.isAnswerCorrect).toBe(null);
    });

   it("Should set answer onUserAnswer", function () { 
        _GameView = _ReactTestUtils.renderIntoDocument(GameView(_GameViewProps, ""));
        _GameView.setState();          
        
        _clock.tick();   

        _GameView.onUserAnswer('1');

        //State
        var _state = _GameView.state;

        expect(_state.options.length).toBe(4);
        expect(_state.current.artist.id).toBe('1');
        expect(_state.points).toBe(0);
        expect(_state.round).toBe(1);
        expect(_state.gameLength).toBe(10);
        expect(_state.rightAnswer).toBe(null);
        expect(_state.answer).toBe('1');
        expect(_state.gameOver).toBe(false);
        expect(_state.isAnswerCorrect).toBe(null);
    });  

   it("Should set got answer state getAnswer", function () {   
        _GameView = _ReactTestUtils.renderIntoDocument(GameView(_GameViewProps, ""));
        _GameView.setState();

        _sandbox.stub(_GameView, 'setupNewRound');

        _clock.tick();   
        _GameView.onUserAnswer('1'); 
        _GameView.getAnswer('1', 20);

        _clock.tick();   
        _clock.tick();   
        _clock.tick(Settings.userDelay+1);   

        //State
        var _state = _GameView.state;

        expect(_state.options.length).toBe(4);
        expect(_state.current.artist.id).toBe('1');
        expect(_state.round).toBe(1);
        expect(_state.gameLength).toBe(10);
        
        expect(_state.answer).toBe('1');
        expect(_state.gameOver).toBe(false);

        expect(_state.rightAnswer).toBe('1');
        expect(_state.points).toBe(20);        
        expect(_state.isAnswerCorrect).toBe(true);
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
