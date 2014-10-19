/**
 * @jsx React.DOM
 */

'use strict';

var PlaylistView = React.createClass({
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
		  <ul className='m-playlist'>
		    {this.props.playlists.map(function(playlist) {
		      return <li>
		      			<a href={'/' + playlist.id} data-user={_this.props.userId} data-playlist={playlist.id}  onClick={_this.handleClick}>{playlist.name}</a>
		      		</li>;
		    })}      
		  </ul>
		);
	}
});
