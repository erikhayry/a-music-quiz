/**
 * @jsx React.DOM
 */

"use strict";


describe("Music Player Test",function(){
    var _ReactTestUtils, _MusicPlayerProps, _MusicPlayer,  _points, _sandbox;

    beforeEach(function() {
        _sandbox = sinon.sandbox.create();
        _ReactTestUtils = React.addons.ReactTestUtils;	
        _points = undefined,            
        _MusicPlayerProps = {
            current: {
                track: {
                    name: 'Radiohead',
                    url: 'http://url.to.mp3'                    
                }
            },
            answer: null,
            onRoundOver: function(points){
                _points = points;
            }
        };        
    });

    it("Should init a MusicPlayer", function () {
        _MusicPlayer = _ReactTestUtils.renderIntoDocument(MusicPlayer(_MusicPlayerProps, ""));
        _MusicPlayer.setState();
        
        expect(_MusicPlayer).toBeDefined();
    });

    it("Should clear interval if question is answer", function () {
        var _intervalSpy = _sandbox.spy(window, "clearInterval");

        _MusicPlayer = _ReactTestUtils.renderIntoDocument(MusicPlayer(_MusicPlayerProps, ""));
        
        _MusicPlayer.props.answer = null;
        _MusicPlayer.props.hasStarted = true;    

        _MusicPlayer.setState({
            isPlaying: false,
            isLoaded: true
        });
        var _intervalId = _MusicPlayer.interval;
        
        //expect(_intervalId).toBeDefined();

        _MusicPlayer.props.answer = true;
        _MusicPlayer.setState();
        
/*        expect(_intervalSpy.calledOnce).toEqual(true);
        expect(_intervalSpy.args[0][0]).toEqual(_intervalId);*/


    });  

    it("Should call onAudioStop when music stops", function () {
        _MusicPlayer = _ReactTestUtils.renderIntoDocument(MusicPlayer(_MusicPlayerProps, ""));
        _MusicPlayer.setState();    
        _MusicPlayer.props.answer = true;
        _MusicPlayer.setState();
    }); 

    it("Should set audio url", function () {
        _MusicPlayer = _ReactTestUtils.renderIntoDocument(MusicPlayer(_MusicPlayerProps, "")); 
        expect(_MusicPlayer.refs.audio.getDOMNode().src).toEqual('http://url.to.mp3/');
    }); 

});
