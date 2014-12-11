var Mode = (function(){
	return {
		set: function(){
			var queries = Helpers.getQueries(sessionStorage.getItem("amq-queries"));
			
			if(queries.debug){
				log('Debug mode: On');
				Settings.debug = queries.debug;
			}

			if(queries.mute){
				log('Mute mode: On');
				Settings.mute = queries.mute;
			}			
		}
	}
})();