/**
 * @jsx React.DOM
 */

'use strict';

var Share = React.createClass({displayName: 'Share',
    render: function(){
    	var _shareUrl = window.location.origin + '?owner=' + this.props.share.playListOwner + '&id=' + this.props.share.playlistId;

        return (
            React.DOM.div(null, 
                React.DOM.p(null, "Url: ", _shareUrl),
                React.DOM.button( {onClick:this.props.onResetShare}, "Close")
            )
       )     
    }
});