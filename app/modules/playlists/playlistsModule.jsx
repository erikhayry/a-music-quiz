/**
 * @jsx React.DOM
 */

'use strict';

var PlaylistView = React.createClass({
	handleClick: function(event){
		//Start game
		var _game = new Game(event.target.dataset.user, event.target.dataset.playlist, {gameLength: Settings.gameLength});
		React.renderComponent(<GameView game={_game}/>, document.getElementById('app'));	   
		event.preventDefault(); 		
	},	

	render: function() {
		var _this = this,
			_playlists = [];

		for(var playlist in this.props.playlists){
			_playlists.push(this.props.playlists[playlist])
		}		

		return (
		  <ul className='m-playlists'>
		    {_playlists.map(function(playlist) {
		    	if(playlist.total >= Settings.minPlaylistSize){
					return <li className='m-playlists-item' key={playlist.id}>
								<a href={'/' + playlist.owner + '/' + playlist.id} data-user={playlist.owner} data-playlist={playlist.id}  onClick={_this.handleClick}>{playlist.name}</a>
							</li>;		    		
		    	}

		    })}      
		  </ul>
		);
	}
});
