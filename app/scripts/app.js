window.onload = function(){
	function _login(){
		ajax('api/login', '').then(function(data){
			var _loginUrl = data['redirect_url'];
			if(document.getElementById('app')) {
				React.renderComponent(LoginLink( {url:_loginUrl}), document.getElementById('app'));
			}
		})		
	}

	function _startGame(accessToken){
		spotifyService.getUser(tokens.accessToken).then(function(userData){
			spotifyService.getPlaylists(userData.id).then(function(playlists){
				//Show playlists
				React.renderComponent(PlaylistView( {
					userId:userData.id,
					playlists: playlists,
				}), document.getElementById('app'));
				
			}).fail(function(failed){
				console.log(failed)
			})

		}, function(error){
			console.log(error)
			_login();
		});	
	}

	var tokens = spotifyService.getTokens(window.location.search);

	if(tokens.accessToken && tokens.refreshToken){	
		_startGame(tokens.accessToken);	
	}
	else{
		_login();
	}
}