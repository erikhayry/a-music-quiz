/** @jsx React.DOM */

var RoundOption = React.createClass({
    
    getInitialState: function() {
        return {
            isSelected: false
        };
    },

	handleClick: function(){
        var _this = this;
        
        _this.props.onAnswer(
            _this.getDOMNode().value
        );

        _this.setState({
            isSelected: true
        })    		
	},

    render: function() { 
        var _className = '';
        
        if(this.props.option.id === this.props.rightAnswer){
            _className = 'is-true';
        }

        if(this.state.isSelected){
            _className += ' is-active';
        }

        return (<button
        			disabled={this.props.answered}
        			value={this.props.option.id}
                    className={_className}
        			onClick={this.handleClick}
        		>{this.props.option.name}</button>);
    }
});