/** @jsx React.DOM */

var RoundOption = React.createClass({displayName: 'RoundOption',

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
        return (React.DOM.button(
        			{disabled:this.props.answered,
        			value:this.props.option.id,
        			onClick:this.handleClick}
        		, this.props.option.name));
    }
});