/** @jsx React.DOM */

var GameState = React.createClass({
    render: function() {
        return (<ul className="m-state">
        			<li>Points: {this.props.points}</li>
        			<li>Round: {this.props.round} / {this.props.gameLength}</li>
        		</ul>);
    }
});