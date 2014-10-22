/** @jsx React.DOM */

var RoundOption = React.createClass({displayName: 'RoundOption',
    
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

        
        if(this.props.isAnswerCorrect){
            _className += ' is-correct-answer';
        }
        
        //null if not set yet
        else if(this.props.isAnswerCorrect === false){
            _className += ' is-wrong-answer';
        }            
        
        return (React.DOM.button(
        			{disabled:this.props.answer,
        			value:this.props.option.id,
                    className:_className,
        			onClick:this.handleClick}
        		, this.props.option.name));
    }
});