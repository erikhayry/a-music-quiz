/**
 * @jsx React.DOM
 */

'use strict';

var PlaylistsView = React.createClass({displayName: 'PlaylistsView',
    getInitialState: function() {
        return {
            playlists: ''
        };
    },

    handleShare: function(event) {
        event.preventDefault();
        log('Playlist: handleShare');        
        var _user = event.target.dataset.user;
        var _playlistId = event.target.dataset.playlist;
        
        this.props.onShare(_user, _playlistId)
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
										React.DOM.li( {className:"m-playlists-item"}, 
											React.DOM.a( 
												{href:'?owner=' + playlist.owner + '&id=' + playlist.id, 
												'data-user':playlist.owner, 
												'data-playlist':playlist.id, 
												onClick:this.handlePlay}
											, 
												playlist.name
											),
                                            React.DOM.button( 
                                                {'data-user':playlist.owner, 
                                                'data-playlist':playlist.id,                                            
                                                onClick:this.handleShare}
                                            , 
                                                " Share "
                                            )
										);		    		
							}
						}.bind(this));

	        _view = React.DOM.ul( {className:"m-playlists"},  
	        			_list
	        		)     	
        }
        else{
        	this.getPlaylists(this.props.player);
        }

        return ( React.DOM.div(null, 
        			_view
            	)
        );
	}
});