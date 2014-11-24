/** @jsx React.DOM */

var MusicPlayer = React.createClass({displayName: 'MusicPlayer',
    
    getInitialState: function() {
        return {
            isPlaying: false,
            isLoaded: false,
            time: 30
        };
    },

    stopAction: function(audioElement){
        log('Musicplayer: stopAction')
        var _this = this;

        audioElement.pause();
        
        if(_this.interval){
            window.clearInterval(_this.interval);    
        }   

        _this.props.onRoundOver(_this.props.answer, _this.time);

        _this.setState({
            isPlaying: false,
            isLoaded: false
        })      
    },

    startPlayer: function(audioElement){
        log('Musicplayer: startPlayer')
        var _this = this,
            _pointsElement = this.refs.points.getDOMNode();
        
        _pointsElement.innerHTML = _this.time = parseInt(audioElement.duration - audioElement.currentTime) || '30';
        
        audioElement.play();
        audioElement.volume = 0;
        
        _this.interval = window.setInterval(function(){
            _pointsElement.innerHTML = _this.time = parseInt(audioElement.duration - audioElement.currentTime) || '30';
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
        log('Musicplayer: loadRound')
        var _this = this,
            _onMetadataLoaded = function(){
                if(!Settings.audioSupport){
                    Settings.audioSupport = 2;                    
                }
                
                if(!_this.state.isLoaded){
                    _this.onLoaded(this);
                }                  
            }; 
        if(!_this.state.isLoaded){
            if(Settings.audioSupport !== 3){

                if(Settings.audioSupport === 1){
                    log('Musicplayer: audioElement buffered')
                    _onMetadataLoaded(); 
                }
                else{
                    if(audioElement.buffered.length > 0){
                        log('Musicplayer: buffered')
                        _onMetadataLoaded();
                    }
                    else{
                        log('Musicplayer: wait for loadedmetadata')
                        audioElement.addEventListener('loadedmetadata', function(){
                            log('Musicplayer: loadedmetadata')
                            _onMetadataLoaded();                         
                            this.removeEventListener('loadedmetadata', arguments.callee, false);
                        }, false);                                            
                    }
                }          
            }
            
            else{
                log('Musicplayer: Settings.audioSupport = 3')
                _this.onLoaded(this);            
           }
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
        log('playerAction')
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
        var _this = this;
        if(Settings.audioSupport){
            _this.playerAction();
        }
        else{
            Helpers.getAudioSupport().then(function(supportType){
                Settings.audioSupport = supportType;
                _this.playerAction();
            }); 
        }

    }, 

    render: function() {
        var _audioEl = '';

        if(this.props.current && this.props.current.track){
            log('Musicplayer: render new track: ')
            log(this.props.current.track)
            _audioEl = React.DOM.audio( {src:this.props.current.track.url, ref:"audio", type:"audio/mpeg", preload:"auto"} )
        }
        
        return (
            React.DOM.div( {className:"m-music-player"},   
                React.DOM.p( {ref:"points"}, this.time),
                _audioEl
            )
        );
    }
});