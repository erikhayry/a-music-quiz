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

    login: function(){
    	console.log('login')
    	spotifyService.login().then(function(data){
			this.setState({
				loginUrl: data['redirect_url']
			})
		}.bind(this))
    },

	tryLogin: function(){
		console.log('tryLogin')
		var _tokens = spotifyService.getTokens(window.location.search);

		if(_tokens.accessToken){
			spotifyService.getUser(_tokens.accessToken).then(function(userData){
				console.log('success')
				this.props.onAuth(userData.id);
			}.bind(this), function(){
				console.log('fail')
				this.login();
			}.bind(this))
		}
		else{
			this.login();
		}
	},

	componentDidMount: function(){
/*		var _tokens = spotifyService.getTokens(window.location.search);
		if(_tokens.accessToken && _tokens.refreshToken){	
			this.props.onAuth(_tokens.accessToken);
		}*/
	},

    render: function(){
        console.log('render Login')

		var _view = React.DOM.p(null, "Loading...");

		if(this.state.loginUrl){
			_view = React.DOM.div( {className:"m-login"}, 
				    	React.DOM.h1(null, "a music quiz"),	
				      	React.DOM.a( {href:this.state.loginUrl}, "login with Spotify"),
				      	React.DOM.p(null, "made by Erik Portin")
				    ) 	
		}
		else {	
				sessionStorage.setItem("amq-queries", window.location.search);			
				this.tryLogin();				
			}		

        return (

            React.DOM.div(null, 
            	_view
            )
       )     
    }

});