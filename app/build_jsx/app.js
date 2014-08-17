/**
 * @jsx React.DOM
 */

'use strict';

var MusicApp = React.createClass({displayName: 'MusicApp',
  render: function() {
    return (
      React.DOM.div( {className:"m-app"}, 
        GameView(null )
      )
    );
  }
});

if(document.getElementById('app')) React.renderComponent(MusicApp(null ), document.getElementById('app')); // jshint ignore:line