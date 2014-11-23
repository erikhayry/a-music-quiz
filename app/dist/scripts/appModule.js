/**
 * @jsx React.DOM
 */

'use strict';

var AppView = React.createClass({displayName: 'AppView',

	login: function(){
		$.ajax('api/login', '').then(function(data){
			var _loginUrl = data['redirect_url'];
			if(document.getElementById('app')) {
				React.renderComponent(LoginLink( {url:_loginUrl}), document.getElementById('app'));
			}
		}, function(error){
			console.error('Failed to login')
		})		
	},

	startGame: function(accessToken){
		var _this = this;

		spotifyService.getUser(accessToken).then(function(userData){
			spotifyService.getPlaylists(userData.id).then(function(playlists){
				//Show playlists
				React.renderComponent(PlaylistView( {playlists:playlists}), document.getElementById('app'));
			
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
			log('AppView: start game')
			this.startGame(tokens.accessToken);	
		}
		else{
			this.login();
		}

		return (React.DOM.div( {className:"m-app-loading"}, "loading"))		
	}
})