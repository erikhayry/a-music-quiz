/**
 * @jsx React.DOM
 */

'use strict';

var GameOverView = React.createClass({displayName: 'GameOverView',
    handleShare: function(event) {
        event.preventDefault();
        log('GameOverView: handleShare');        
        var _user = event.target.dataset.user;
        var _playlistId = event.target.dataset.playlist;
        
        this.props.onShare(_user, _playlistId)
    },

    render: function() {
        log('GameOverView: render');

        var _list = {},
        	_view = '',
        	_rights = 0,
        	_total = 0,
        	_points = ' points',
        	_listenLink = '',
        	_itemClassName = '';
        	
		this.props.game.history.forEach(function(round, i) {
			_rights += round.rightAnswer;
			_total += parseInt(round.points);
			_itemClassName = 'm-game-over-history-item is-answer-' + round.rightAnswer;
			_listenLink = 'http://open.spotify.com/track/' + round.data.track.id;

			_list['round-' + i] =  
					React.DOM.li( {className:_itemClassName}, 
						round.data.artist.name, " - ", round.data.track.name,
						React.DOM.a( {href:_listenLink, target:"_blank", className:"m-game-over-history-item-listen"}, 
							" Listen "
						)
					);		    		
		}.bind(this));

		if(_total === 1){
			_points = ' point';
		}

        _view = React.DOM.ul( {className:"m-game-over-history"},  
        			_list
        		)   

        return (
		            React.DOM.div( {className:"m-game-over l-view"}, 
		            	React.DOM.h1(null, "Game Over"),
		            	React.DOM.p(null, "You answered ", _rights, " of ", this.props.game.history.length, " questions right and scored ", _total, _points),

		            	React.DOM.ul( {className:"m-game-over-nav"}, 
			            	React.DOM.li( {className:"m-game-over-nav-item"}, 
			            		React.DOM.button( {className:"m-game-over-btn", onClick:this.props.onReplay}, "Play again")
			            	),
			            	React.DOM.li( {className:"m-game-over-nav-item"}, 
			            		React.DOM.button( {className:"m-game-over-btn", onClick:this.props.onBackToPlaylists}, "Choose another")
			            	),
			            	React.DOM.li( {className:"m-game-over-nav-item"}, 
			            		React.DOM.button( 
			            			{className:"m-game-over-btn",
                                  	'data-user':this.props.game.playerId, 
                                  	'data-playlist':this.props.game.playlistId,  			            			
			            			onClick:this.handleShare}
			            		, "Share "
			            		)
			            	)
			            ),
			            	
		            	React.DOM.h2(null, "Answers"),
		            	_view
		            )
		    	)
}

});