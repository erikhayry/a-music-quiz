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
        var _view = <Loading module="Playlist" />;

        if(this.state.playlists){
        	var _list = {};
			this.state.playlists.forEach(function(playlist) {
							if(playlist.total >= Settings.minPlaylistSize){
								_list['playlist' + playlist.id] =  
										<li className='m-playlists-list-item'>                                            
                                            <button
                                                className="m-playlists-play-btn"
                                                data-user={playlist.owner} 
                                                data-playlist={playlist.id} 
                                                onClick={this.handlePlay}
                                            >
                                                {playlist.name}
                                            </button>                                            

                                            <button
                                                className="m-playlists-share-btn" 
                                                data-user={playlist.owner} 
                                                data-playlist={playlist.id}                                            
                                                onClick={this.handleShare}
                                            >
                                                Share
                                            </button>
										</li>;		    		
							}
						}.bind(this));

	        _view = <ul className='m-playlists-list'> 
	        			{_list}
	        		</ul>     	
        }
        else{
        	this.getPlaylists(this.props.player);
        }

        return ( <div className="m-playlist l-view">
                    <h1>Choose a playlist to play</h1>
        			{_view}
            	</div>
        );
	}
});