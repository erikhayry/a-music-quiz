/** @jsx React.DOM */

var RoundOptions = React.createClass({
    render: function() {    
        var _optionsEls = [],
            _options = this.props.options,
            _answer = this.props.answer,
        	_rightAnswer = this.props.rightAnswer,
            _isAnswerCorrect = this.props.isAnswerCorrect,
            _onUserAnswer = this.props.onUserAnswer;

        _options.forEach(function(option) {
            _optionsEls.push(<RoundOption 
                                key={option.id} 
                                option={option} 
                                answer={_answer} 
                                rightAnswer={_rightAnswer} 
                                isAnswerCorrect={_isAnswerCorrect} 
                                onUserAnswer={_onUserAnswer}
                            />);
        });

        return (
            <div>
                {_optionsEls}
            </div>
        );
    }
});