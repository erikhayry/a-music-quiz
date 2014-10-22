/** @jsx React.DOM */

var GameState = React.createClass({displayName: 'GameState',
    render: function() {
        return (React.DOM.ul( {className:"m-state"}, 
        			React.DOM.li(null, this.props.points),
        			React.DOM.li(null, this.props.round, " / ", this.props.gameLength)
        		));
    }
});