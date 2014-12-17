/**
 * @jsx React.DOM
 */

'use strict';

var PlaylistsView = React.createClass({
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
        var _view = <p>Loading playlist</p>;

        if(this.state.playlists){
        	var _list = {};
			this.state.playlists.forEach(function(playlist) {
							if(playlist.total >= Settings.minPlaylistSize){
								_list['playlist' + playlist.id] =  
										<li className='m-playlists-item'>
											<a 
												href={'?owner=' + playlist.owner + '&id=' + playlist.id} 
												data-user={playlist.owner} 
												data-playlist={playlist.id} 
												onClick={this.handlePlay}
											>
												{playlist.name}
											</a>
                                            <button 
                                                data-user={playlist.owner} 
                                                data-playlist={playlist.id}                                            
                                                onClick={this.handleShare}
                                            >
                                                Share
                                            </button>
										</li>;		    		
							}
						}.bind(this));

	        _view = <ul className='m-playlists'> 
	        			{_list}
	        		</ul>     	
        }
        else{
        	this.getPlaylists(this.props.player);
        }

        return ( <div>
        			{_view}
            	</div>
        );
	}
});