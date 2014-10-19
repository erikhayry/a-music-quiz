/** @jsx React.DOM */

var MusicPlayer = React.createClass({displayName: 'MusicPlayer',
    getInitialState: function() {
        return {
            answered: false
        };
    },

    stopAction: function(audioElement){
        var _this = this;

        audioElement.pause();
        
        if(_this.interval){
            window.clearInterval(_this.interval);    
        }    
        _this.props.onAudioStop(parseInt(audioElement.duration - audioElement.currentTime));      
    },

    startRound: function(audioElement){ 
        var _this = this,
            _pointsElement = _this.refs.points.getDOMNode();

        audioElement.addEventListener('loadedmetadata', function(){
           audioElement.play();
           this.removeEventListener('loadedmetadata', arguments.callee, false);
        }, false);  
    
        audioElement.addEventListener('ended', function(){
           _this.stopAction(this);
           this.removeEventListener('ended', arguments.callee, false);
        }, false);           

        _this.interval = window.setInterval(function(){
            _pointsElement.innerHTML = _this.currentPoints = parseInt(audioElement.duration - audioElement.currentTime)
        }, 1000) 

    },

    componentDidUpdate: function() {
        var _this = this,
            _audioElement = this.refs.audio.getDOMNode();
        
        if(this.props.answered){
            _this.stopAction(_audioElement);            
        }
        else{
            this.startRound(_audioElement);
        }

    }, 

    render: function() {
        
        if(this.interval){
            window.clearInterval(this.interval);
        }

        this.currentPoints = 30; 
        return (
            React.DOM.div(null,   
                React.DOM.p( {ref:"points"}),
                React.DOM.audio( {src:this.props.current.url, ref:"audio", type:"audio/mpeg"}  )
            )
        );
    }
});