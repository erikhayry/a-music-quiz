/** @jsx React.DOM */

var GamePoints = React.createClass({
    render: function() {
        return (<ul>
        			<li>Points: {this.props.points}</li>
        			<li>Round: {this.props.round} / {Settings.gameLength}</li>
        		</ul>);
    }
});