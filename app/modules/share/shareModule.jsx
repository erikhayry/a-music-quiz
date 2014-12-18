/**
 * @jsx React.DOM
 */

'use strict';

var Share = React.createClass({
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
            <div className='m-share l-view'>
                <h1>Share</h1>
                <div ref='twitter'></div>
                <p>or copy this url</p>
                <p>{_shareUrl}</p>

                <button className="m-share-close-btn" onClick={this.props.onResetShare}>Close</button>
            </div>
       )     
    }
});