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
            history: ''
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

    handlePlay: function(playListOwner, playlistId) {
        log('AppView: handlePlay');
        this.setState({
            playListOwner: playListOwner,
            playlistId: playlistId
        })
    },

    handleReplay: function() {
        log('AppView: handleReplay');

        this.handlePlay(this.state.playListOwner, this.sate.playlistId);
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
        var _view = <p> Loading... </p>;

		//Set app mode
        Mode.set();

        if(this.state.history){
            _view = <GameOverView 
                        history={this.state.history} 
                        onReplay={this.handleReplay}
                    />;
        }

        else if (this.state.playListOwner && this.state.playlistId) {
            _view = <GameView
                        playlistId = {this.state.playlistId}
                        playlistOwner = {this.state.playListOwner}
                        
                        onGameOver={this.handleGameOver}
                    />;            
        }
        else if(this.state.player){
            _view = <PlaylistsView
                        player={this.state.player} 
                        
                        onPlay={this.handlePlay}
                        onUnAuth={this.handleUnAuth}
                    /> ;
        } else {
            _view = <LoginView onAuth={this.handleAuth} />;    
        }
        
        return (
            <div>
                {_view}
            </div >
        )
    }

})