/**
 * @jsx React.DOM
 */

'use strict';

var GameOverView = React.createClass({displayName: 'GameOverView',

    render: function() {
        log('GameOverView: render');

        var _list = {},
        	_view = '';
        	
		this.props.history.forEach(function(round, i) {
			_list['round-' + i] =  
					React.DOM.li( {className:"m-history-item"}, 
						round.data.artist.name, " - ", round.data.track.name
					);		    		
		}.bind(this));

        _view = React.DOM.ul( {className:"m-history"},  
        			_list
        		)   

        return (
		            React.DOM.div(null, 
		            React.DOM.button( {onClick:this.props.onReplay}, "Play again"),
		            React.DOM.button( {onClick:this.props.onBackToPlaylists}, "Choose another"),
		            React.DOM.button( {onClick:this.props.onShare}, "Share"),
		            	_view
		            )
		    	)
}

});