/** @jsx React.DOM */

var MusicPlayer = React.createClass({
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
        _this.props.onAudioStop(_this.currentPoints);      
    },

    startRound: function(audioElement){ 
        //console.log('startRound')       
        var _this = this,
            _pointsElement = _this.refs.points.getDOMNode();

        audioElement.addEventListener('loadedmetadata', function(){
           audioElement.play();
           audioElement.volume = 0;
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
            <div>  
                <p ref="points"></p>
                <p>Artist: {this.props.current.name}</p>
                <p>Url: {this.props.current.url}</p>
                <audio src={this.props.current.url} ref="audio" type="audio/mpeg"  />
            </div>
        );
    }
});