var Mode = (function(){
	return {
		set: function(){			
			if(localStorage.getItem('amq-debug')){
				log('Debug mode: On');
				Settings.debug = localStorage.getItem('amq-debug');
			}

			if(localStorage.getItem('amq-mute')){
				log('Mute mode: On');
				Settings.mute = localStorage.getItem('amq-mute');
			}			
		}
	}
})();