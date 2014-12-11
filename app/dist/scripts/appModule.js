/**
 * @jsx React.DOM
 */

'use strict';

var AppView = React.createClass({displayName: 'AppView',

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
            accessToken: ''
        };
    },

    handleAuth: function(accessToken){
        this.setState({
            accessToken: accessToken
        })
    },

    handleUnAuth: function(){
        this.setState({
            accessToken: ''
        })
    },   
    
    handlePlay: function(user, playlistId){
        this.setState({
            user: user,
            playlistId: playlistId
        })           
    },

    render: function(){
        console.log('render App')
        var _view = React.DOM.p(null, "Loading...");

		//Set app mode
		Mode.set();        
        
        if(this.state.user && this.state.playlistId){
            _view = GameView( 
                        {playlistId:this.state.playlistId, 
                        user:this.state.user} 
                    );            
        }
        else if(this.state.accessToken){
            _view = PlaylistsView(
                        {onPlay:this.handlePlay,
                        accessToken:this.state.accessToken, 
                        onUnAuth:this.handleUnAuth}
                    );
        }
        else{
            _view = LoginView( {onAuth:this.handleAuth} );    
        }
        
        return (
            React.DOM.div(null, 
                _view
            )
       )     
    }

})