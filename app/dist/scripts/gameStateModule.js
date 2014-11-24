/** @jsx React.DOM */

var GameState = React.createClass({displayName: 'GameState',
    render: function() {
        return (React.DOM.ul( {className:"m-state"}, 
        			React.DOM.li(null, "Points: ", this.props.points),
        			React.DOM.li(null, "Round: ", this.props.round, " / ", this.props.gameLength)
        		));
    }
});