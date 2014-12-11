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

	login: function(){
		console.log('login')

		spotifyService.login().then(function(data){
			this.setState({
				loginUrl: data['redirect_url']
			})
		}.bind(this))
	},

	componentDidMount: function(){
		var _tokens = spotifyService.getTokens(window.location.search);
		if(_tokens.accessToken && _tokens.refreshToken){	
			this.props.onAuth(_tokens.accessToken);
		}
	},

    render: function(){
        console.log('render Login')

		var _tokens = spotifyService.getTokens(window.location.search),
			_view = <p>Loading...</p>;

		if(this.state.loginUrl){
			_view = <div className="m-login">
				    	<h1>a music quiz</h1>	
				      	<a href={this.state.loginUrl}>login with Spotify</a>
				      	<p>made by Erik Portin</p>
				    </div> 	
		}
		else if(!_tokens.accessToken && !_tokens.refreshToken){	
				sessionStorage.setItem("amq-queries", window.location.search);			
				this.login();				
			}		

        return (

            <div>
            	{_view}
            </div>
       )     
    }

});