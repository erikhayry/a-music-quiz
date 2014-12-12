/**
 * @jsx React.DOM
 */

'use strict';

var RoundAction = React.createClass({displayName: 'RoundAction',
    handleAnswer: function(answer) {
        log('GameAction: handleAnswer')
        this.props.onAnswer(answer);
    },    

    handleGameOver: function(){
        this.props.onGameOver();
    }, 

    render: function() {
        log('GameAction: render')
        
        var _gameActions = React.DOM.p(null, "Loading game actions..."),
            _currentRoundIndex = this.props.game.round.current.index-1;

        if(this.props.musicPlaying){            
            _currentRoundIndex = this.props.game.round.current.index;
            _gameActions = Options( 
                                {answer:this.props.answer,
                                options:this.props.game.round.options,
                                onAnswer:this.handleAnswer}
                            )
        } 
        else if (this.props.musicLoaded || this.props.game.isGameOver) {

            var _previous = _currentRoundIndex - 1,
                _previousAnswer = (this.props.game.history[_previous]) ? this.props.game.history[_previous].answer : undefined,
                _previousQuestion = (this.props.game.history[_previous]) ? this.props.game.history[_previous].data.artist.id : undefined

                _gameActions = GameNav(
                                    {previousAnswer:_previousAnswer,
                                    previousQuestion:_previousQuestion,
                                    isGameOver:this.props.game.isGameOver,
                                    onGameOver:this.handleGameOver}
                                )  
        }

        return ( 
                React.DOM.div( {className:"container"}, 
                    _gameActions
                )
                );
    }
});