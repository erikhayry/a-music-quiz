/**
 * @jsx React.DOM
 */

'use strict';

var MusicApp = React.createClass({displayName: 'MusicApp',
  render: function() {
    return (
      React.DOM.div({className: "main"}, 
        "Hello World"
      )
    );
  }
});

React.renderComponent(MusicApp(null), document.getElementById('app')); // jshint ignore:line