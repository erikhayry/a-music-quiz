/** @jsx React.DOM */

var RoundOption = React.createClass({
	handleClick: function(){
        this.props.onAnswer(
            this.getDOMNode().value
        );		
	},

    render: function() { 
        return (<button
        			disabled={this.props.answered}
        			value={this.props.option.id}
        			onClick={this.handleClick}
        		>{this.props.option.name}</button>);
    }
});