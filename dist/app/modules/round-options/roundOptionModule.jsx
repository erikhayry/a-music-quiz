/** @jsx React.DOM */

var RoundOption = React.createClass({
    
	handleClick: function(){
        var _this = this;
        
        _this.props.onUserAnswer(
            _this.getDOMNode().value
        );        
	},

    render: function() { 
        var _className = '';

        if(this.props.answer == this.props.option.id){
            _className += 'is-selected';
        }
    
        return (<button
        			disabled={this.props.answer}
        			value={this.props.option.id}
                    className={_className}
        			onClick={this.handleClick}
        		>{this.props.option.name}</button>);
    }
});