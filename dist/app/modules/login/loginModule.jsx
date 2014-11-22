/**
 * @jsx React.DOM
 */

'use strict';

var LoginLink = React.createClass({
  render: function() {
    return (
    <div className="m-login">
    	<h1>a music quiz</h1>	
      	<a href={this.props.url}>login with Spotify</a>
      	<p>made by Erik Portin</p>
    </div>  	
    );
  }
});