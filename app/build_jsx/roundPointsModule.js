/** @jsx React.DOM */

var RoundPoints = React.createClass({displayName: 'RoundPoints',
    render: function() {
        return (React.DOM.div(null, this.props.points));
    }
});