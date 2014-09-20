/** @jsx React.DOM */

var RoundOptions = React.createClass({displayName: 'RoundOptions',
    render: function() {

        var _options = [],
        	_answered = this.props.answered,
        	_onAnswer = this.props.onAnswer;

        this.props.options.forEach(function(option) {
            _options.push(RoundOption( {option:option, answered:_answered, onAnswer:_onAnswer}));
        });

        return (
            React.DOM.div(null, 
                _options
            )
        );
    }
});