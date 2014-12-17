/**
 * @jsx React.DOM
 */

'use strict';

var Share = React.createClass({
    render: function(){
    	var _shareUrl = window.location.origin + '?owner=' + this.props.share.playListOwner + '&id=' + this.props.share.playlistId;

        return (
            <div>
                <p>Url: {_shareUrl}</p>
                <button onClick={this.props.onResetShare}>Close</button>
            </div>
       )     
    }
});