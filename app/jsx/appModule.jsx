/**
 * @jsx React.DOM
 */

'use strict';

var AppView = React.createClass({

	login: function(){
		ajax('api/login', '').then(function(data){
			var _loginUrl = data['redirect_url'];
			if(document.getElementById('app')) {
				React.renderComponent(<LoginLink url={_loginUrl}/>, document.getElementById('app'));
			}
		})		
	},

	startGame: function(accessToken){
		var _this = this;
		spotifyService.getUser(accessToken).then(function(userData){
			spotifyService.getPlaylists(userData.id).then(function(playlists){
				//Show playlists
				React.renderComponent(<PlaylistView userId={userData.id} playlists={playlists}/>, document.getElementById('app'));
			
			}).fail(function(failed){
				//Failed
			})

		}, function(error){
			_this.login();
		});	
	},

	render: function(){
		var tokens = spotifyService.getTokens(window.location.search);

		if(tokens.accessToken && tokens.refreshToken){	
			this.startGame(tokens.accessToken);	
		}
		else{
			this.login();
		}

		return (<div>Loading</div>)		
	}
})