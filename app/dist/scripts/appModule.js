/**
 * @jsx React.DOM
 */

'use strict';

var AppView = React.createClass({displayName: 'AppView',
    getInitialState: function() {
        return {
            player: '',
            playListOwner: '',
            playlistId: ''
        };
    },

    handleAuth: function(player){
        log('AppView: handleAuth');
        this.setState({
            player: player
        })
    },

    handleUnAuth: function() {
        log('AppView: handleUnAuth');
        this.setState({
            playListOwner: '',
            playlistId: '',
            player: ''
        })
    },

    handleShare: function(playListOwner, playlistId) {
        log('AppView: handleShare');
        this.setState({
            share: {
                playListOwner: playListOwner,
                playlistId: playlistId
            }
        })
    }, 

    handleResetShare: function() {
        log('AppView: handleResetShare');
        this.setState({
            share: ''
        })
    },   

    handlePlay: function(playListOwner, playlistId) {
        log('AppView: handlePlay');
        this.setState({
            playListOwner: playListOwner,
            playlistId: playlistId
        })
    },

    handleBackToPlaylists: function() {
        log('AppView: handleBackToPlaylists');

        this.setState({
            playListOwner: '',
            playlistId: ''
        })
    }, 

    render: function() {
        log('AppView: render');
        var _view = Loading( {module:"AppView"}),
            _popup = '';

		//Set app mode
        Mode.set();

        //Popup
        if(this.state.share){
            _popup = Share(
                        {share:this.state.share,
                        onResetShare:this.handleResetShare}
                    );
        }

        //View
        if (this.state.playListOwner && this.state.playlistId) {
            history.pushState({ login: this.state.player }, 'GameView', '?owner=' + this.state.playListOwner + '&id=' + this.state.playlistId);
            _view = GameView(
                        {playlistId:this.state.playlistId,
                        playlistOwner:this.state.playListOwner,
                        
                        onPlay:this.handlePlay,
                        onShare:this.handleShare,
                        onBackToPlaylists:this.handleBackToPlaylists}
                    );            
        }
        else if(this.state.player){
            history.pushState({ login: this.state.player }, 'PlaylistsView', '?user=' + this.state.player);
            _view = PlaylistsView(
                        {player:this.state.player, 
                        
                        onPlay:this.handlePlay,
                        onUnAuth:this.handleUnAuth,
                        onShare:this.handleShare}
                    ) ;
        } else {
            _view = LoginView( 
                        {onAuth:this.handleAuth, 
                        onPlay:this.handlePlay}
                    );    
        }
        
        return (
            React.DOM.div( {className:"l-app-inner"}, 
                _popup,
                _view
            )
        )
    }

})