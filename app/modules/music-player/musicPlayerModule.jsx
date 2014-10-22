/** @jsx React.DOM */

var MusicPlayer = React.createClass({
    
    getInitialState: function() {
        return {
            isPlaying: false
        };
    },

    stopAction: function(audioElement){
        var _this = this;

        audioElement.pause();
        
        if(_this.interval){
            window.clearInterval(_this.interval);    
        }   

        _this.props.onRoundOver(this.props.answer, parseInt(audioElement.duration - audioElement.currentTime));

        _this.setState({
            isPlaying: false
        })      
    },

    startRound: function(audioElement){ 
        var _this = this,
            _pointsElement = _this.refs.points.getDOMNode();

        var _points = parseInt(audioElement.duration - audioElement.currentTime);
        _pointsElement.innerHTML = _points || '30';   

        audioElement.addEventListener('loadedmetadata', function(){
            audioElement.play();
            audioElement.volume = 0;
            
            _this.setState({
                isPlaying: true
            })

            this.removeEventListener('loadedmetadata', arguments.callee, false);
        }, false); 

        audioElement.addEventListener('timeupdate', function(){
            if(audioElement.currentTime < 1){
                audioElement.volume = parseInt(audioElement.currentTime*10)/10
            }
            else if((audioElement.duration - audioElement.currentTime) < 1){
                audioElement.volume = parseInt((audioElement.duration - audioElement.currentTime) * 10)/10
            }     

        }, false);          
    
        audioElement.addEventListener('ended', function(){
            if(_this.state.isPlaying){
                _this.stopAction(this);
            }
            this.removeEventListener('ended', arguments.callee, false);
        }, false);           

        _this.interval = window.setInterval(function(){
            var _points = parseInt(audioElement.duration - audioElement.currentTime);
            _pointsElement.innerHTML = _points || '30';
        }, 1000) 
    },

    componentDidUpdate: function() {
        var _this = this,
            _audioElement = '';
        
        if(_this.refs.audio){
            _audioElement = _this.refs.audio.getDOMNode();
            if(_this.props.answer && _this.state.isPlaying){            
                _this.stopAction(_audioElement);            
            }
            else{
                _this.startRound(_audioElement);
            }            
        }

    }, 

    render: function() {
        var _audioEl = '';
        
        if(this.interval){
            window.clearInterval(this.interval);
        }

        if(this.props.current && this.props.current.track){
            _audioEl = <audio src={this.props.current.track.url} ref="audio" type="audio/mpeg"  />
        }
        
        return (
            <div className="m-music-player">  
                <p ref="points">30</p>
                {_audioEl}
            </div>
        );
    }
});