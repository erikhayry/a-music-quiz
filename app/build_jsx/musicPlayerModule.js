/** @jsx React.DOM */

var MusicPlayer = React.createClass({displayName: 'MusicPlayer',
    getInitialState: function() {
        return {
            answered: false
        };
    },

    stopAction: function(audioElement){
        var _this = this;
        //console.log('stopAction')
        audioElement.pause();
        if(_this.interval){
            window.clearInterval(_this.interval);    
        }    
        _this.props.onAudioStop(_this.currentPoints);
    },

    startRound: function(audioElement){ 
        //console.log('startRound')       
        var _this = this,
            _pointsElement = _this.refs.points.getDOMNode()

        audioElement.addEventListener('loadedmetadata', function(){
           //console.log('loadedmetadata')
           audioElement.play();
           audioElement.volume = 0;
        }, false);    

        audioElement.addEventListener('pause', function(){
           //console.log('pause')
           _this.stopAction(this);
           this.removeEventListener('pause', arguments.callee);
        }, false); 

        audioElement.addEventListener('ended', function(){
           _this.stopAction(this);
           this.removeEventListener('ended', arguments.callee);
        }, false);           

        _this.interval = window.setInterval(function(){
            //console.log('intervalling')
            _pointsElement.innerHTML = _this.currentPoints = parseInt(audioElement.duration - audioElement.currentTime)
        }, 1000) 

    },

    componentDidUpdate: function() {
        //console.log('MusicPlayerModule componentDidUpdate', this.props.answered)
        var _this = this,
            _audioElement = this.refs.audio.getDOMNode();
        
        if(this.props.answered){
            //console.log('got answer')
            _this.stopAction(_audioElement);            
        }
        else{
            this.startRound(_audioElement);
        }

    }, 

    render: function() {
        //console.log('Render')
        
        if(this.interval){
            window.clearInterval(this.interval);
        }

        this.currentPoints = 30; 
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