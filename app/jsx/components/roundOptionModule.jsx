/** @jsx React.DOM */

var RoundOption = React.createClass({

	getInitialState: function() {
    	return {
    		selectedOptionId: ''
    	};
  	},

	handleClick: function(){
		
		this.setState({
			selectedOptionId: this.getDOMNode().value
		});

        this.props.onAnswer(
            this.getDOMNode().value
        );		
	},

    render: function() {    	
    	var _className = (this.props.option.id === this.state.selectedOptionId) ? 'is-selected' : this.props.option.name;

        return (<button
        			disabled={this.props.answered}
        			className={_className} 
        			value={this.props.option.id}
        			onClick={this.handleClick}
        		>{_className}</button>);
    }
});