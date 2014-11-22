/** @jsx React.DOM */

var GameState = React.createClass({
    render: function() {
        return (<ul className="m-state">
        			<li>{this.props.points}</li>
        			<li>{this.props.round} / {this.props.gameLength}</li>
        		</ul>);
    }
});