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
                    
        this.props.onShare({
            url: window.location.origin + '?owner=' + event.target.dataset.owner + '&id=' + event.target.dataset.playlistid,
            text: 'Play ' + event.target.dataset.playlistname + ' on aMusicQuiz.com' 
        })
    },

    handlePlay: function(event) {
    	event.preventDefault();
        log('Playlist: handlePlay');    	
        this.props.onPlay(event.target.dataset.owner, event.target.dataset.playlistid)
    },

    getAllPlaylists: function(userId) {
        log('Playlist: getAllPlaylists ' + userId);
        spotifyService.getAllPlaylists(userId).then(function(playlists) {
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
                                                'data-owner':playlist.owner, 
                                                'data-playlistid':playlist.id,   
                                                onClick:this.handlePlay}
                                            , 
                                                playlist.name
                                            ),                                            

                                            React.DOM.button(
                                                {className:"m-playlists-share-btn", 
                                                'data-owner':playlist.owner, 
                                                'data-playlistid':playlist.id,                                            
                                                'data-playlistname':playlist.name,                                            
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
        	this.getAllPlaylists(this.props.player);
        }

        return ( React.DOM.div( {ref:"view", className:"m-playlists l-view"}, 
                    React.DOM.h1(null, "Play"),

                    PlaylistInput( 
                        {onPlay:this.props.onPlay,
                        onUnvalidPlaylistUrl:this.props.onError}
                    ),
                    React.DOM.p(null, "Or choose one of your playlists"),

                    _view,
                    React.DOM.button( {className:"m-playlists-change-btn", onClick:this.props.onChangeUser}, "Change user")
            	)
        );
	}
});