/**
 * @jsx React.DOM
 */

'use strict';

var Share = React.createClass({displayName: 'Share',
	componentDidMount: function(){
		log('Share: componentDidMount')
/*		var _shareEl = this.refs.twitter.getDOMNode(),
			_text = this.props.text || 'Play a Music Quiz';

        twttr.widgets.createShareButton(
            this.props.onResetShare,
            _shareEl,
            function(el) {}, {
            	hashtags: 'aMusicQuiz',
            	size: 'large',
                count: 'none',
                text: _text
            }
        );*/

	},

    render: function(){
    	log('Share: render')
    	var _shareUrl = window.location.origin + '?owner=' + this.props.share.playListOwner + '&id=' + this.props.share.playlistId;

        return (
            React.DOM.div( {className:"m-share l-view"}, 
                React.DOM.h1(null, "Share"),
                React.DOM.div( {ref:"twitter"}),
                React.DOM.p(null, "or copy this url"),
                React.DOM.p(null, _shareUrl),

                React.DOM.button( {className:"m-share-close-btn", onClick:this.props.onResetShare}, "Close")
            )
       )     
    }
});