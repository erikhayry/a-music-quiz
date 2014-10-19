/**
 * @jsx React.DOM
 */

'use strict';

var LoginLink = React.createClass({
  render: function() {
    return (
      <a href={this.props.url}>Login</a>
    );
  }
});