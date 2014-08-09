/** @jsx React.DOM */

var GamePoints = React.createClass({displayName: 'GamePoints',
    render: function() {
        return (React.DOM.div(null, this.props.points));
    }
});