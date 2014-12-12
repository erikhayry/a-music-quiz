/**
 * @jsx React.DOM
 */

'use strict';

var AppView = React.createClass({

    /*	login: function(){
		$.ajax('api/login', '').then(function(data){
			var _loginUrl = data['redirect_url'];
			if(document.getElementById('app')) {
				React.renderComponent(<LoginLink url={_loginUrl}/>, document.getElementById('app'));
			}
		}, function(error){
			console.error('Failed to login')
		})		
	},

	startGame: function(accessToken){
		var _this = this;

		spotifyService.getUser(accessToken).then(function(userData){
			spotifyService.getPlaylists(userData.id).then(function(playlists){
				//TODO move to service 
				var queries = Helpers.getQueries(sessionStorage.getItem("amq-queries"));
				
				if(queries.debug){
					Settings.debug = queries.debug;
				}

				if(queries.mute){
					Settings.mute = queries.mute;
				}

				//Show playlists
				React.renderComponent(<PlaylistView playlists={playlists}/>, document.getElementById('app'));
			
			}).fail(function(failed){
				//Failed
			})

		}, function(error){
			_this.login();
		});	
	},

	render: function(){
		var tokens = spotifyService.getTokens(window.location.search);

		if(tokens.accessToken && tokens.refreshToken){	
			log('AppView: start game')
			this.startGame(tokens.accessToken);	
		}
		else{
			sessionStorage.setItem("amq-queries", window.location.search);			
			this.login();
		}

		return (<div className="m-app-loading">loading</div>)		
	}*/

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
        var _view = <p> Loading... </p>;

		//Set app mode
        Mode.set();

        if(this.state.history){
            _view = <GameOverView history={this.state.history} />;
        }

        else if (this.state.user && this.state.playlistId) {
            _view = <GameView
                        playlistId = {this.state.playlistId}
                        user = {this.state.user}
                        onGameOver={this.handleGameOver}
                    />;            
        }
        else if(this.state.userId){
            _view = <PlaylistsView
                        onPlay={this.handlePlay}
                        userId={this.state.userId} 
                        onUnAuth={this.handleUnAuth}
                    /> ;
        } else {
            _view = <LoginView onAuth={this.handleAuth}/>;    
        }
        
        return (
            <div>
                {_view}
            </div >
        )
    }

})