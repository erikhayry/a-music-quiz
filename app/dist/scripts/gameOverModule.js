/**
 * @jsx React.DOM
 */

'use strict';

var GameOverView = React.createClass({displayName: 'GameOverView',

    render: function() {
        log('GameOverView: render');

        return (
		            React.DOM.div(null, 
		            	React.DOM.p(null, "Game Over!")
		            )
		    	)
}

});