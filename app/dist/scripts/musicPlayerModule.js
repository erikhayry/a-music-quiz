/** @jsx React.DOM */

var MusicPlayer = React.createClass({displayName: 'MusicPlayer',
    
    getInitialState: function() {
        return {
            isPlaying: false,
            isLoaded: false
        };
    },

    stopAction: function(audioElement){
        console.log('stopAction')
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
        console.log('startPlayer')
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
        console.log('onLoaded')
        this.setState({
            isLoaded: true
        }) 

        this.props.onReady()
    },

    loadRound: function(audioElement){ 
        console.log('loadRound')
        var _this = this; 
        
        if(Settings.audioSupport !== 3){
            console.log('if')
            //console.log(audioElement.buffered)

            audioElement.addEventListener('loadedmetadata', function(){
                console.log('loadedmetadata')
                if(!Settings.audioSupport){
                    Settings.audioSupport = 2;                    
                }
                
                if(!_this.state.isLoaded){
                    _this.onLoaded(this);
                }

                this.removeEventListener('loadedmetadata', arguments.callee, false);
            }, false);             
        }
        
        else{
            console.log('else')
            _this.onLoaded(this);            
       }

        audioElement.addEventListener('timeupdate', function(){
            if(!Settings.mute){
                if(audioElement.currentTime < 1){
                    audioElement.volume = parseInt(audioElement.currentTime*10)/10
                }
                else if((audioElement.duration - audioElement.currentTime) < 1){
                    audioElement.volume = parseInt((audioElement.duration - audioElement.currentTime) * 10)/10
                }                
            }
        }, false);          
    
        audioElement.addEventListener('ended', function(){
            if(_this.state.isPlaying){
                _this.stopAction(this);
            }
            this.removeEventListener('ended', arguments.callee, false);
        }, false);           
    },

    playerAction: function(){
        console.log('playerAction')
        var _this = this,
            _audioElement = '';

        if(_this.refs.audio){
            _audioElement = _this.refs.audio.getDOMNode();
            
            if(_this.props.answer && _this.state.isPlaying){            
                _this.stopAction(_audioElement);            
            }

            else if(!_this.props.answer && !_this.state.isPlaying && _this.state.isLoaded && _this.props.isLoaded && _this.props.hasStarted){
                _this.startPlayer(_audioElement);
            }

            else if(!_this.props.isLoaded){
                _this.loadRound(_audioElement);
            }            
        }
    },

    componentDidUpdate: function() {
        console.log('-----------------------')
        var _this = this;
        if(Settings.audioSupport){
            console.log('know the support')
            _this.playerAction();
        }
        else{
            Helpers.getAudioSupport().then(function(supportType){
                console.log('checkking suport')
                Settings.audioSupport = supportType;
                _this.playerAction();
            }); 
        }

    }, 

    render: function() {
        var _audioEl = '';
        
        if(this.props.current && this.props.current.track){
            _audioEl = React.DOM.audio( {src:this.props.current.track.url, ref:"audio", type:"audio/mpeg"}  )
        }
        
        return (
            React.DOM.div( {className:"m-music-player"},   
                React.DOM.p( {ref:"points"}, "30"),
                _audioEl
            )
        );
    }
});