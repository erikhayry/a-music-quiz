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
                    
        this.props.onShare({
            url: window.location.origin + '?owner=' + event.target.dataset.owner + '&id=' + event.target.dataset.playlistid,
            text: 'Play ' + event.target.dataset.playlistname + ' on aMusicQuiz.com' 
        })
    },

    handlePlay: function(event) {
    	event.preventDefault();
        log('Playlist: handlePlay');    	
        var _owner = event.target.dataset.owner;
        var _playlistId = event.target.dataset.playlistid;
        this.props.onPlay(_owner, _playlistId)
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
                                                data-owner={playlist.owner} 
                                                data-playlistid={playlist.id}   
                                                onClick={this.handlePlay}
                                            >
                                                {playlist.name}
                                            </button>                                            

                                            <button
                                                className="m-playlists-share-btn" 
                                                data-owner={playlist.owner} 
                                                data-playlistid={playlist.id}                                            
                                                data-playlistname={playlist.name}                                            
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

        return ( <div ref='view' className="m-playlist l-view">
                    <h1>Choose a playlist to play</h1>
                    {_view}
                    <button onClick={this.props.onChangeUser}>Change user</button>
            	</div>
        );
	}
});