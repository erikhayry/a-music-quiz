var MusicPlayerService = function(element){
	this.element = element;
	this.isLoaded = false;
	this.isPlaying = false;
	this.time = 30;
	this.interval = '';
};

MusicPlayerService.prototype.load = function(){
	log('Musicplayer: isLoaded')

	var _deferred = Q.defer(),
		
		_onMetadataLoaded = function(){
            if(!Settings.audioSupport){
                Settings.audioSupport = 2;                    
            }
            this.isLoaded = true;
            _deferred.resolve(Settings.audioSupport);             
        }.bind(this);

    if(!this.isLoaded){
        if(Settings.audioSupport !== 3){
            if(Settings.audioSupport === 1){
                log('Musicplayer: audioElement buffered')
                _onMetadataLoaded(); 
            }

            else{
                if(this.element.buffered.length > 0){
                    log('Musicplayer: buffered')
                    _onMetadataLoaded();
                }
                else{
                    log('Musicplayer: wait for loadedmetadata')
                    this.element.addEventListener('loadedmetadata', function(){
                        log('Musicplayer: loadedmetadata')
                        _onMetadataLoaded();                         
                        this.removeEventListener('loadedmetadata', arguments.callee, false);
                    }, false);                                            
                }
            }          
        }
        
        else{
            log('Musicplayer: Settings.audioSupport = 3')
            this.onLoaded(this);            
       }
    }

	return _deferred.promise;
};

MusicPlayerService.prototype.play = function(){
	log('Musicplayer: isLoaded')
	var _deferred = Q.defer();

	if(!this.isPlaying){
        log('Musicplayer: startPlayer')

        this.element.play();
        this.element.volume = 0;
        
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
/*            if(this.isPlaying){
                _deferred.resolve();
            }*/
            _deferred.resolve();
            this.element.removeEventListener('ended', arguments.callee, false);
        }.bind(this), false);  
        
        this.interval = window.setInterval(function(){
	        this.time = parseInt(this.element.duration - this.element.currentTime) || 30;       
	        _deferred.notify(this.time);        	
        }.bind(this), 1000) 
	}

	return _deferred.promise;
};