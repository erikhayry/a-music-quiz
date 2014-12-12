/**
 * @jsx React.DOM
 */

'use strict';

var LoginView = React.createClass({
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

        var _view = <p>Loading...</p>;

		if(this.state.loginUrl){
			_view = <div className="m-login">
				    	<h1>a music quiz</h1 >
           				<a href={this.state.loginUrl}> login with Spotify </a>
				      	<p>made by Erik Portin</p >
           			</div> 	
		}
		else {	
				sessionStorage.setItem("amq-queries", window.location.search);			
				this.tryLogin();				
			}		

        return (
		            <div>
		            	{_view}
		            </div >
		    	)
}

});