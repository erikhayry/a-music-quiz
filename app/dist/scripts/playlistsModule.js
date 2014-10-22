/**
 * @jsx React.DOM
 */

'use strict';

var PlaylistView = React.createClass({displayName: 'PlaylistView',
	handleClick: function(event){
		//Start game
		var _game = new Game(event.target.dataset.user, event.target.dataset.playlist, {gameLength: Settings.gameLength})
		React.renderComponent(GameView( {game:_game}), document.getElementById('app'));	   
		event.preventDefault(); 		
	},	

	render: function() {
		var _this = this,
			_playlists = [];

		for(var playlist in this.props.playlists){
			_playlists.push(this.props.playlists[playlist])
		}		

		return (
		  React.DOM.ul( {className:"m-playlists"}, 
		    _playlists.map(function(playlist) {
		    	if(playlist.tracks >= Settings.minPlaylistSize){
					return React.DOM.li( {className:"m-playlists-item"}, 
								React.DOM.a( {href:'/' + playlist.id, 'data-user':_this.props.userId, 'data-playlist':playlist.id,  onClick:_this.handleClick}, playlist.name)
							);		    		
		    	}

		    })      
		  )
		);
	}
});