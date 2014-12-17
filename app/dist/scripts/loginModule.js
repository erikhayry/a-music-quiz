/**
 * @jsx React.DOM
 */

'use strict';

var LoginView = React.createClass({displayName: 'LoginView',
    getInitialState: function() {
        return {
            loginUrl: ''
        };
    },

    login: function() {
        log('Login: login');
        spotifyService.login().then(function(data) {
            this.setState({
                loginUrl: data['redirect_url']
            })
        }.bind(this))
    },

    tryLogin: function() {
        log('Login: tryLogin');

        var _queries = Helpers.getQueries(window.location.search),
            _tokens = sessionStorage.getItem('amq-user') || spotifyService.getTokens(window.location.search).accessToken;

        sessionStorage.setItem('amq-queries', window.location.search);

        if(_queries.owner && _queries.id){
            sessionStorage.setItem('amq-game', JSON.stringify({
                owner: _queries.owner,
                id: _queries.id 
            }));            
        }

        if (_tokens) {
            spotifyService.getUser(_tokens).then(function(userData) {
                log('Login: got user');
                log(userData);
                
                sessionStorage.setItem('amq-user', _tokens);
            
                var _gameUrl = JSON.parse(sessionStorage.getItem('amq-game'));

                if(_gameUrl){
                    sessionStorage.removeItem('amq-game')
                    this.props.onPlay(_gameUrl.owner, _gameUrl.id);
                }
                else{
                    this.props.onAuth(userData.id);                    
                }

            }.bind(this), function() {
                log('Login: failed to get user');
                localStorage.removeItem(userData.id);
                this.login();
            }.bind(this))
        } else {
            this.login();
        }
    },

    render: function() {
        log('Login: render');

        var _view = React.DOM.p(null, "Loading...");

		if(this.state.loginUrl){
			_view = React.DOM.div( {className:"m-login"}, 
				    	React.DOM.h1(null, "a music quiz"),
           				React.DOM.a( {href:this.state.loginUrl},  " login with Spotify " ),
				      	React.DOM.p(null, "made by Erik Portin")
           			) 	
		}
		else {	
				this.tryLogin();				
			}		

        return (
		            React.DOM.div(null, 
		            	_view
		            )
		    	)
}

});