/** @jsx React.DOM */

var RoundOptions = React.createClass({displayName: 'RoundOptions',
    render: function() {    
        var _optionsEls = [],
            _options = this.props.options,
            _answer = this.props.answer,
        	_rightAnswer = this.props.rightAnswer,
            _onUserAnswer = this.props.onUserAnswer;

        _options.forEach(function(option) {
            _optionsEls.push(RoundOption( 
                                {key:option.id, 
                                option:option, 
                                answer:_answer, 
                                rightAnswer:_rightAnswer, 
                                onUserAnswer:_onUserAnswer}
                            ));
        });

        return (
            React.DOM.div( {className:"m-round-options"}, 
                _optionsEls
            )
        );
    }
});