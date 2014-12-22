/**
 * @jsx React.DOM
 */

'use strict';

var AppView = React.createClass({
    getInitialState: function() {
        return {
            player: '',
            playListOwner: '',
            playlistId: '',
            error: ''
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

    handleShare: function(share) {
        log('AppView: handleShare');
        this.setState({
            share: share
        })
    }, 

    handleResetShare: function() {
        log('AppView: handleResetShare');
        this.setState({
            share: ''
        })
    }, 

    handleError: function(error) {
        log('AppView: handleError' + error);
        this.setState({
            error: error
        })
    }, 

    handleResetError: function() {
        log('AppView: handleResetError');
        this.setState({
            error: ''
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
        
        //TODO needed so login module dosen/'t start a new game
        sessionStorage.removeItem('amq-game');
        history.pushState({ handleBackToPlaylists: this.state.player }, 'AppView', '?user=' + this.state.player);
        
        this.setState({
            playListOwner: '',
            playlistId: '',
            error: ''
        })
    }, 

    handleChangeUser: function(){
        log('AppView: handleChangeUser');
        sessionStorage.removeItem('amq-user');
        history.pushState({ handleChangeUser: '' }, 'AppView', '');

        this.setState({
            playListOwner: '',
            playlistId: '',
            player: ''
        })        
    },


    render: function() {
        log('AppView: render');
        var _view = '',
            _popup = '',
            _error = '';


		//Set app mode
        Mode.set();

        //Popup
        if(this.state.share){               
            _popup = <Share
                        share={this.state.share}
                        onResetShare={this.handleResetShare}
                    />;
        }

        //Error
        if(this.state.error){               
            _error = <Error
                        error={this.state.error}

                        onResetError={this.handleResetError}
                        onBackToPlaylists={this.handleBackToPlaylists}
                    />;
        }        

        //View
        if (this.state.playListOwner && this.state.playlistId) {

            history.pushState({ login: this.state.player }, 'GameView', '?owner=' + this.state.playListOwner + '&id=' + this.state.playlistId);
            _view = <GameView
                        playlistId={this.state.playlistId}
                        playlistOwner={this.state.playListOwner}
                        
                        onPlay={this.handlePlay}
                        onShare={this.handleShare}
                        onError={this.handleError}
                        onBackToPlaylists={this.handleBackToPlaylists}
                    />;            
        }
        else if(this.state.player){
            history.pushState({ login: this.state.player }, 'PlaylistsView', '?user=' + this.state.player);
            _view = <PlaylistsView                       
                        player={this.state.player} 
                        
                        onPlay={this.handlePlay}
                        onUnAuth={this.handleUnAuth}
                        onShare={this.handleShare}
                        onError={this.handleError}
                        onChangeUser={this.handleChangeUser}
                    /> ;
        } else {
            _view = <LoginView 
                        onAuth={this.handleAuth} 
                        onPlay={this.handlePlay}
                    />;    
        }
        
        return (
            <div className="l-app-inner">
                {_popup}
                {_error}
                {_view}
            </div >
        )
    }

})