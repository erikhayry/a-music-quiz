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
        var _view =  '',
            _loader = '';

        if(this.state.playlists){
        	var _list = {};
			this.state.playlists.forEach(function(playlist) {
				if(playlist.total >= Settings.minPlaylistSize && playlist.id){
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
            _loader = <Loading module="Playlist" />;
        	this.getAllPlaylists(this.props.player);
        }

        return ( 
                <div className="l-view-outer">
                    <div ref='view' className="m-playlists l-view">
                        <h1>Play</h1>

                        <PlaylistInput 
                            onPlay={this.props.onPlay}
                            onUnvalidPlaylistUrl={this.props.onError}
                        />
                        <h2>Or choose one of your playlists</h2>

                        {_view}
                        <button className="m-playlists-change-btn" onClick={this.props.onChangeUser}>Change user</button>
                	</div>
                    {_loader}
                </div>  
        );
	}
});