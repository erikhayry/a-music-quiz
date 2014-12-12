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
        var _tokens = spotifyService.getTokens(window.location.search);

        sessionStorage.setItem("amq-queries", window.location.search);			

        if (_tokens.accessToken) {
            spotifyService.getUser(_tokens.accessToken).then(function(userData) {
                log('Login: got user');
                log(userData);
                this.props.onAuth(userData.id);
            }.bind(this), function() {
                log('Login: failed to get user');
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