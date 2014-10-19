/**
 * @jsx React.DOM
 */

'use strict';

var LoginLink = React.createClass({displayName: 'LoginLink',
  render: function() {
    return (
      React.DOM.a( {href:this.props.url}, "Login")
    );
  }
});