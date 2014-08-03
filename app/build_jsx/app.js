/**
 * @jsx React.DOM
 */

'use strict';

var MusicApp = React.createClass({displayName: 'MusicApp',
  render: function() {
    return (
      React.DOM.div( {className:"main"}, 
        " Hello World testing "
      )
    );
  }
});

if(document.getElementById('app')) React.renderComponent(MusicApp(null ), document.getElementById('app')); // jshint ignore:line