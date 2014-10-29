/** @jsx React.DOM */

var MusicPlayer = React.createClass({
    
    getInitialState: function() {
        return {
            isPlaying: false,
            isLoaded: false
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
            isPlaying: false,
            isLoaded: false
        })      
    },

    startPlayer: function(audioElement){
        var _pointsElement = this.refs.points.getDOMNode(),
            _points = parseInt(audioElement.duration - audioElement.currentTime);
        
        _pointsElement.innerHTML = _points || '30';
        
        audioElement.play();
        audioElement.volume = 0;
        
        this.interval = window.setInterval(function(){
            var _points = parseInt(audioElement.duration - audioElement.currentTime);
            _pointsElement.innerHTML = _points || '30';
        }, 1000) 


        this.setState({
            isPlaying: true
        })
    },

    onLoaded: function(){
        this.setState({
            isLoaded: true
        }) 

        this.props.onReady()
    },

    loadRound: function(audioElement){ 
        var _this = this; 

        audioElement.addEventListener('loadedmetadata', function(){
            if(!_this.state.isLoaded){
                _this.onLoaded(this);
            }
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


    },

    componentDidUpdate: function() {
        var _this = this,
            _audioElement = '';
        

        if(_this.refs.audio){
            _audioElement = _this.refs.audio.getDOMNode();
            
            if(_this.props.answer && _this.state.isPlaying){            
                _this.stopAction(_audioElement);            
            }

            else if(!_this.props.answer && !_this.state.isPlaying && _this.state.isLoaded && _this.props.hasStarted){
                _this.startPlayer(_audioElement);
            }

            else{
                _this.loadRound(_audioElement);
            }            
        }

    }, 

    render: function() {
        var _audioEl = '';
        
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