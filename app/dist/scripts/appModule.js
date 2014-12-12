/**
 * @jsx React.DOM
 */

'use strict';

var AppView = React.createClass({displayName: 'AppView',
    getInitialState: function() {
        return {
            user: '',
            playlistId: '',
            userId: '',
            history: ''
        };
    },

    handleAuth: function(userId){
        log('AppView: handleAuth');
        this.setState({
            userId: userId
        })
    },

    handleUnAuth: function() {
        log('AppView: handleUnAuth');
        this.setState({
            user: '',
            playlistId: '',
            userId: ''
        })
    },

    handlePlay: function(user, playlistId) {
        log('AppView: handlePlay');
        this.setState({
            user: user,
            playlistId: playlistId
        })
    },

    handleGameOver: function(history){
        this.setState({
            history: history
        })
    },

    render: function() {
        log('AppView: render');
        var _view = React.DOM.p(null,  " Loading... " );

		//Set app mode
        Mode.set();

        if(this.state.history){
            _view = GameOverView( {history:this.state.history} );
        }

        else if (this.state.user && this.state.playlistId) {
            _view = GameView(
                        {playlistId:  this.state.playlistId,
                        user:  this.state.user,
                        onGameOver:this.handleGameOver}
                    );            
        }
        else if(this.state.userId){
            _view = PlaylistsView(
                        {onPlay:this.handlePlay,
                        userId:this.state.userId, 
                        onUnAuth:this.handleUnAuth}
                    ) ;
        } else {
            _view = LoginView( {onAuth:this.handleAuth} );    
        }
        
        return (
            React.DOM.div(null, 
                _view
            )
        )
    }

})