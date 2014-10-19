/**
 * @jsx React.DOM
 */

'use strict';

var PlaylistView = React.createClass({displayName: 'PlaylistView',
	handleClick: function(event){
		//Start game
		var _game = new Game(event.target.dataset.user, event.target.dataset.playlist)
		React.renderComponent(GameView( {game:_game}), document.getElementById('app'));	   
		event.preventDefault(); 		
	},	

	render: function() {
		var _this = this;
		console.log(this.props)
		return (
		  React.DOM.ul( {className:"m-playlist"}, 
		    this.props.playlists.map(function(playlist) {
		      return React.DOM.li(null, 
		      			React.DOM.a( {href:'/' + playlist.id, 'data-user':_this.props.userId, 'data-playlist':playlist.id,  onClick:_this.handleClick}, playlist.name)
		      		);
		    })      
		  )
		);
	}
});
