/** @jsx React.DOM */

var GamePoints = React.createClass({displayName: 'GamePoints',
    render: function() {
        return (React.DOM.ul( {className:"m-points"}, 
        			React.DOM.li(null, "Points: ", this.props.points),
        			React.DOM.li(null, "Round: ", this.props.round, " / ", this.props.gameLength)
        		));
    }
});