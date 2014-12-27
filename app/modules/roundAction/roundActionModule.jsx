/**
 * @jsx React.DOM
 */

'use strict';

var RoundAction = React.createClass({
    handleAnswer: function(answer) {
        log('RoundAction: handleAnswer')
        log(answer)
        this.props.onAnswer(answer);
    },    

    render: function() {
        log('RoundAction: render')
        
        var _roundAction = <Loading module="RoundAction"/>,
            _currentRoundIndex = this.props.game.round.current.index-1;

        if(this.props.musicPlaying || this.props.answer){            
            _currentRoundIndex = this.props.game.round.current.index;
            _roundAction = <Options 
                                answer={this.props.answer}
                                options={this.props.game.round.options}
                                
                                onAnswer={this.handleAnswer}
                            />
        } 
        else if ((!this.props.musicPlaying && !this.props.answer) || this.props.game.isGameOver) {
            var _previous = _currentRoundIndex - 1,
                _previousRightAnswer = (this.props.game.history[_previous]) ? this.props.game.history[_previous].rightAnswer : undefined;

                _roundAction = <GameNav
                                    previousRightAnswer={_previousRightAnswer}
                                    isGameOver={this.props.game.isGameOver}
                                    isMusicLoaded={this.props.musicLoaded}
                                    
                                    onGameOver={this.props.onGameOver}
                                    onMusicPlay={this.props.onMusicPlay}
                                />  
        }

        return ( 
                <div className="m-round-action">
                    {_roundAction}
                </div>
                );
    }
});