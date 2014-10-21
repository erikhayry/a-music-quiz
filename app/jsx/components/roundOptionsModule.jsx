/** @jsx React.DOM */

var RoundOptions = React.createClass({
    render: function() {
        console.log('render Roundoptions')
        var _options = [],
            _answered = this.props.answered,
        	_rightAnswer = this.props.rightAnswer,
        	_onAnswer = this.props.onAnswer;

        this.props.options.forEach(function(option) {
            _options.push(<RoundOption option={option} answered={_answered} rightAnswer={_rightAnswer} onAnswer={_onAnswer}/>);
        });

        return (
            <div>
                {_options}
            </div>
        );
    }
});