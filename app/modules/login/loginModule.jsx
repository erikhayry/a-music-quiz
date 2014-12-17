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

        var _view = <p>Loading...</p>;

		if(this.state.loginUrl){
			_view = <div className='m-login'>
				    	<h1>a music quiz</h1 >
           				<a href={this.state.loginUrl}> login with Spotify </a>
				      	<p>made by Erik Portin</p >
           			</div> 	
		}
		else {	
				this.tryLogin();				
			}		

        return (
		            <div>
		            	{_view}
		            </div >
		    	)
}

});