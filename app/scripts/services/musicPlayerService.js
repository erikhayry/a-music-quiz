var MusicPlayerService = function(element){
	this.element = element;
	this.isLoaded = false;
};

MusicPlayerService.prototype.onLoad = function(){
	log('Musicplayer: isLoaded')

	var _deferred = Q.defer(),
		
		_onMetadataLoaded = function(){
            if(!Settings.audioSupport){
                Settings.audioSupport = 2;                    
            }
            _deferred.resolve(Settings.audioSupport);             
        };

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