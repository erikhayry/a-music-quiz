/**
 * @jsx React.DOM
 */

"use strict";


describe("Round Option Test",function(){
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

    it("Should clear interval if quetion is answered", function () {
        var _intervalSpy = _sandbox.spy(window, "clearInterval");
        _MusicPlayer = _ReactTestUtils.renderIntoDocument(MusicPlayer(_MusicPlayerProps, ""));
        _MusicPlayer.setState();
        var _intervalId = _MusicPlayer.interval;
        
        expect(_intervalId).toBeDefined();

        _MusicPlayer.props.answered = true;
        _MusicPlayer.setState();
        
        expect(_intervalSpy.args[0][0]).toEqual(_intervalId);
    });    

/*    it("should call onAnswer if button is enabled", function () {
        _MusicPlayer = _ReactTestUtils.renderIntoDocument(MusicPlayer(_MusicPlayerProps, ""));
        _ReactTestUtils.Simulate.click(_MusicPlayer.getDOMNode());
        expect(_answer).toEqual('123')
    });

    it("should not call onAnswer if button is disabled", function () {
        _MusicPlayerProps.answered = true;
        _MusicPlayer = _ReactTestUtils.renderIntoDocument(MusicPlayer(_MusicPlayerProps, "")); 
        _ReactTestUtils.Simulate.click(_MusicPlayer.getDOMNode());
        expect(_answer).toBeUndefined();
    });*/

});
