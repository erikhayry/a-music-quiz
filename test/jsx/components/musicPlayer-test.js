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
                name: 'Radiohead',
                url: 'http://url.to.mp3'
            },
            answered: false,
            onAudioStop: function(points){
                _points = points;
            }
        };        
    });

    it("Should init a MusicPlayer", function () {
        _MusicPlayer = _ReactTestUtils.renderIntoDocument(MusicPlayer(_MusicPlayerProps, ""));
        _MusicPlayer.setState({answered: false});
        
        expect(_MusicPlayer).toBeDefined();
        expect(_MusicPlayer.interval).toBeDefined();
    });

    it("Should clear interval if question is answered", function () {
        var _intervalSpy = _sandbox.spy(window, "clearInterval");
        _MusicPlayer = _ReactTestUtils.renderIntoDocument(MusicPlayer(_MusicPlayerProps, ""));
        _MusicPlayer.setState();
        var _intervalId = _MusicPlayer.interval;
        
        expect(_intervalId).toBeDefined();

        _MusicPlayer.props.answered = true;
        _MusicPlayer.setState();
        
        expect(_intervalSpy.calledTwice).toEqual(true);
        expect(_intervalSpy.args[0][0]).toEqual(_intervalId);
        expect(_intervalSpy.args[1][0]).toEqual(_intervalId);
    });  

    it("Should call onAudioStop when music stops", function () {
        _MusicPlayer = _ReactTestUtils.renderIntoDocument(MusicPlayer(_MusicPlayerProps, ""));
        _MusicPlayer.setState();    
        _MusicPlayer.props.answered = true;
        _MusicPlayer.setState();
        
        expect(_points).toEqual(30);
    }); 

    it("Should set audio url", function () {
        _MusicPlayer = _ReactTestUtils.renderIntoDocument(MusicPlayer(_MusicPlayerProps, "")); 
        expect(_MusicPlayer.refs.audio.getDOMNode().src).toEqual('http://url.to.mp3/');
    }); 

});
