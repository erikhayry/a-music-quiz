/**
 * @jsx React.DOM
 */

'use strict';
var loginUrl = '';

var MusicApp = React.createClass({
  render: function() {
    return (
      <div className='m-app'>
      </div>
    );
  }
});

var LoginLink = React.createClass({
  render: function() {
    return (
      <a href={loginUrl}>Login</a>
    );
  }
});

document.body.onload = function(){
	function login(){
		ajax('api/login', '').then(function(data){
			loginUrl = data['redirect_url'];
			if(document.getElementById('app')) {
				React.renderComponent(<LoginLink />, document.getElementById('app'));
			}
		})		
	}

	var tokens = spotifyService.getTokens(window.location.search);

	if(tokens.accessToken && tokens.refreshToken){	

		spotifyService.getUser(tokens.accessToken).then(function(userData){
			spotifyService.getPlaylists(userData.id).then(function(playlists){

				//Start game
				var _game = new Game(userData.id, playlists[2].id)
				React.renderComponent(<GameView game={_game}/>, document.getElementById('app'));

			}).fail(function(failed){
				console.log(failed)
			})

		}, function(error){
			console.log(error)
			login();
		})		
	}
	else{
		login();
	}
}