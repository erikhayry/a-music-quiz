/**
 * @jsx React.DOM
 */

'use strict';

var MusicApp = React.createClass({
  render: function() {
    return (
      <div className='m-app'>
        <Game />
      </div>
    );
  }
});

if(document.getElementById('app')) React.renderComponent(<MusicApp />, document.getElementById('app')); // jshint ignore:line