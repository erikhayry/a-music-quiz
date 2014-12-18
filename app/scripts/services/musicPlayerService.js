var MusicPlayerService = function(element){
	this.element = element;
	this.isLoaded = false;
	this.isPlaying = false;
	this.time = 30;
	this.interval = '';
};

MusicPlayerService.prototype.load = function(){
	log('MusicPlayerService: loading')

	var _deferred = Q.defer(),
		
		_onMetadataLoaded = function(){
            if(!Settings.audioSupport){
                Settings.audioSupport = 2;                    
            }
            this.isLoaded = true;
            log('MusicPlayerService: audioSupport ' + Settings.audioSupport);
            _deferred.resolve(Settings.audioSupport);             
        }.bind(this);

    if(!this.isLoaded){
        if(Settings.audioSupport !== 3){
            if(Settings.audioSupport === 1){
                log('MusicPlayerService: audioElement buffered')
                _onMetadataLoaded(); 
            }

            else{
                if(this.element.buffered.length > 0){
                    log('MusicPlayerService: buffered')
                    _onMetadataLoaded();
                }
                else{
                    log('MusicPlayerService: wait for loadedmetadata')
                    this.element.addEventListener('loadedmetadata', function(){
                        log('MusicPlayerService: loadedmetadata')
                        _onMetadataLoaded();                         
                        this.removeEventListener('loadedmetadata', arguments.callee, false);
                    }, false);                                            
                }
            }          
        }
        
        else{
            log('MusicPlayerService: Settings.audioSupport = 3')
            this.onLoaded(this);            
       }
    }

	return _deferred.promise;
};

MusicPlayerService.prototype.play = function(){
	var _deferred = Q.defer();

	if(!this.isPlaying){
        log('MusicPlayerService: startPlayer')

        this.element.play();
        this.element.volume = 0;
        
        if(this.element.duration >= Settings.roundLength){
            this.element.currentTime = this.element.duration - Settings.roundLength;      
        }

        this.isPlaying = true;
        
        this.element.addEventListener('timeupdate', function(){
            if(!Settings.mute){
                if(this.element.currentTime < 1){
                    this.element.volume = parseInt(this.element.currentTime*10)/10
                }
                else if((this.element.duration - this.element.currentTime) < 1){
                    this.element.volume = parseInt((this.element.duration - this.element.currentTime) * 10)/10
                }                
            }
        }.bind(this), false);

        this.element.addEventListener('ended', function(){
        	log('MusicPlayerService: ended')
             _deferred.resolve(0);
            if(this.interval){
                window.clearInterval(this.interval);    
            }               
            this.element.removeEventListener('ended', arguments.callee, false);
        }.bind(this), false);  
        
        this.interval = window.setInterval(function(){
        	log('MusicPlayerService: interval')
	        this.time = parseInt(this.element.duration - this.element.currentTime) || '';    

	        _deferred.notify(this.time);        	
        }.bind(this), 1000) 
	}

	return _deferred.promise;
};

MusicPlayerService.prototype.stop = function(){
	var _deferred = Q.defer();

	if(this.isPlaying){
        log('MusicPlayerService: stopPlayer')
        this.element.pause();
        if(this.interval){
            window.clearInterval(this.interval);    
        }   
        _deferred.resolve(this.time);
    }

    return _deferred.promise;
};
