/**
 * @jsx React.DOM
 */

'use strict';

var LoginLink = React.createClass({displayName: 'LoginLink',
  render: function() {
    return (
    React.DOM.div( {className:"m-login"}, 
    	React.DOM.h1(null, "a music quiz"),	
      	React.DOM.a( {href:this.props.url}, "login with Spotify"),
      	React.DOM.p(null, "made by Erik Portin")
    )  	
    );
  }
});