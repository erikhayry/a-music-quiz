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
        var _view = Loading( {module:"Playlist"} );

        if(this.state.playlists){
        	var _list = {};
			this.state.playlists.forEach(function(playlist) {
							if(playlist.total >= Settings.minPlaylistSize){
								_list['playlist' + playlist.id] =  
										React.DOM.li( {className:"m-playlists-list-item"},                                             
                                            React.DOM.button(
                                                {className:"m-playlists-play-btn",
                                                'data-user':playlist.owner, 
                                                'data-playlist':playlist.id, 
                                                onClick:this.handlePlay}
                                            , 
                                                playlist.name
                                            ),                                            

                                            React.DOM.button(
                                                {className:"m-playlists-share-btn", 
                                                'data-user':playlist.owner, 
                                                'data-playlist':playlist.id,                                            
                                                onClick:this.handleShare}
                                            , 
                                                " Share "
                                            )
										);		    		
							}
						}.bind(this));

	        _view = React.DOM.ul( {className:"m-playlists-list"},  
	        			_list
	        		)     	
        }
        else{
        	this.getPlaylists(this.props.player);
        }

        return ( React.DOM.div( {className:"m-playlist l-view"}, 
                    React.DOM.h1(null, "Choose a playlist to play"),
        			_view
            	)
        );
	}
});