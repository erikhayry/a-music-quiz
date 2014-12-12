/**
 * @jsx React.DOM
 */

'use strict';

/*var PlaylistView = React.createClass({
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
});*/

var PlaylistsView = React.createClass({displayName: 'PlaylistsView',
    getInitialState: function() {
        return {
            playlists: ''
        };
    },

    handlePlay: function(event) {
    	event.preventDefault();
        log('Playlist: handlePlay');    	
        var _user = event.target.dataset.user;
        var _playlistId = event.target.dataset.playlist;
        this.props.onPlay(_user, _playlistId)
    },

    getPlaylists: function(userId) {
        log('Playlist: getPlaylists ' + userId);
        spotifyService.getPlaylists(userId).then(function(playlists) {
        	log('Playlist: got playlists');
        	log(playlists)
            this.setState({
                playlists: playlists.arr
            })
        }.bind(this), function(error) {
        	log('Playlist: failed to get playlist');
            this.props.onUnAuth();
        }.bind(this))
    },

    render: function() {
        log('Playlist: render');
        var _view = React.DOM.p(null, "Loading playlist");

        if(this.state.playlists){
        	var _list = {};
			this.state.playlists.forEach(function(playlist) {
							if(playlist.total >= Settings.minPlaylistSize){
								_list['playlist' + playlist.id] =  
										React.DOM.li( {className:"m-playlists-item", key:playlist.id}, 
											React.DOM.a( 
												{href:'/' + playlist.owner + ' / ' + playlist.id, 
												'data-user':playlist.owner, 
												'data-playlist':playlist.id, 
												onClick:this.handlePlay}
											, 
												playlist.name
											)
										);		    		
							}
						}.bind(this));

	        _view = React.DOM.ul( {className:"m-playlists"},  
	        			_list
	        		)     	
        }
        else{
        	this.getPlaylists(this.props.userId);
        }

        return ( React.DOM.div(null, 
        			_view
            	)
        );
	}
});