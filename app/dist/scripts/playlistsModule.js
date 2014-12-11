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

    handlePlay: function(event){
    	event.preventDefault();
        var _user = event.target.dataset.user;
        var _playlistId = event.target.dataset.playlist;
        this.props.onPlay(_user, _playlistId)
    },
 
    getPlaylists: function(accessToken){
    	console.log('accessToken')
    	spotifyService.getPlaylists(accessToken).then(function(playlists){
    		this.setState({
    			playlists: playlists
    		})
    	}.bind(this))
    },

    render: function () {
        console.log('render Playlists')
        var _view = React.DOM.p(null, "Loading playlist");

        if(this.state.playlists){
			var _list = this.state.playlists.map(function(playlist) {
							if(playlist.total >= Settings.minPlaylistSize){
								return React.DOM.li( {className:"m-playlists-item", key:playlist.id}, 
											React.DOM.a( 
												{href:'/' + playlist.owner + '/' + playlist.id, 
												'data-user':playlist.owner, 
												'data-playlist':playlist.id, 
												onClick:this.handlePlay}
											, 
												playlist.name
											)
										);		    		
							}
						}.bind(this));

	        _view = React.DOM.ul(null,  
	        			_list
	        		)     	
        }
        else{
        	this.getPlaylists(this.props.accessToken);
        }

        return ( React.DOM.div(null, 
        			_view
            	)
        );
    }
});