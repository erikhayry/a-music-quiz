/** @jsx React.DOM */

var MusicPlayer = React.createClass({displayName: 'MusicPlayer',
    getInitialState: function() {
        return {
            answered: false
        };
    },

    bindEvents: function(audioElement){ 
        console.log('bindEvents')       
        var _this = this,
            _interval,
            _currentPoints = 0,
            _pointsElement = _this.refs.points.getDOMNode(),
            _stopAction = function(){
                window.clearInterval(_interval);
                _this.props.onAudioStop(_currentPoints);
            };

        _this.interval = window.setInterval(function(){
            console.log('intervalling')
            _pointsElement.innerHTML = _currentPoints = parseInt(audioElement.duration-audioElement.currentTime)
        }, 1000) 


    },

    componentDidUpdate: function() {
        console.log('MusicPlayerModule componentDidUpdate', this.props.answered)
        var _this = this,
            audioElement = this.refs.audio.getDOMNode();
        
        if(this.props.answered){
            audioElement.pause();
            window.clearInterval(_this.interval);
            _this.props.onAudioStop(10);            
        }
        else{
            this.bindEvents(audioElement)
        }

    }, 

    render: function() {
        console.log('Render') 
        return (
            React.DOM.div(null,   
                React.DOM.p( {ref:"points"}),
                React.DOM.p(null, "Artist: ", this.props.current.name),
                React.DOM.p(null, "Url: ", this.props.current.url),
                React.DOM.audio( {src:this.props.current.url, ref:"audio", type:"audio/mpeg", preload:"auto"} )
            )
        );
    }
});