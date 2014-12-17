/**
 * @jsx React.DOM
 */

'use strict';

var AppView = React.createClass({displayName: 'AppView',
    getInitialState: function() {
        return {
            player: '',
            playListOwner: '',
            playlistId: '',
            history: '',
            replay: false,
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
            replay: false,
            playListOwner: playListOwner,
            playlistId: playlistId
        })
    },

    handleReplay: function() {
        log('AppView: handleReplay');

        this.setState({
            replay: true,
            history: ''
        })
    },

    handleBackToPlaylists: function() {
        log('AppView: handleBackToPlaylists');

        this.setState({
            playListOwner: '',
            playlistId: '',
            history: ''
        })
    },    

    handleGameOver: function(history){
        log('AppView: handleGameOver');
        log(history);
        this.setState({
            history: history
        })
    },

    render: function() {
        log('AppView: render');
        var _view = React.DOM.p(null,  " Loading... " ),
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
        if(this.state.history){
            history.pushState({ login: this.state.player }, 'GameOverView', '?owner=' + this.state.playListOwner + '&id=' + this.state.playlistId);
            _view = GameOverView( 
                        {history:this.state.history, 
                        onReplay:this.handleReplay,
                        onBackToPlaylists:this.handleBackToPlaylists,
                        onShare:this.handleShare}
                    );
        }

        else if (this.state.playListOwner && this.state.playlistId) {
            history.pushState({ login: this.state.player }, 'GameView', '?owner=' + this.state.playListOwner + '&id=' + this.state.playlistId);
            _view = GameView(
                        {playlistId:this.state.playlistId,
                        playlistOwner:this.state.playListOwner,
                        replay:this.state.replay,
                        
                        onPlay:this.handlePlay,
                        onGameOver:this.handleGameOver}
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
            React.DOM.div(null, 
                _popup,
                _view
            )
        )
    }

})