/**
 * @jsx React.DOM
 */

'use strict';

var RoundAction = React.createClass({
    handleAnswer: function(answer) {
        log('GameAction: handleAnswer')
        this.props.onAnswer(answer);
    },    

    handleGameOver: function(){
        this.props.onGameOver();
    }, 

    handleMusicPlay: function(){
        this.props.onMusicPlay();
    },

    render: function() {
        log('GameAction: render')
        
        var _roundAction = <p>Loading game actions...</p>,
            _currentRoundIndex = this.props.game.round.current.index-1;

        if(this.props.musicPlaying){            
            _currentRoundIndex = this.props.game.round.current.index;
            _roundAction = <Options 
                                answer={this.props.answer}
                                options={this.props.game.round.options}
                                onAnswer={this.handleAnswer}
                            />
        } 
        else if (this.props.musicLoaded || this.props.game.isGameOver) {

            var _previous = _currentRoundIndex - 1,
                _previousAnswer = (this.props.game.history[_previous]) ? this.props.game.history[_previous].answer : undefined,
                _previousQuestion = (this.props.game.history[_previous]) ? this.props.game.history[_previous].data.artist.id : undefined

                _roundAction = <GameNav
                                    previousAnswer={_previousAnswer}
                                    previousQuestion={_previousQuestion}
                                    isGameOver={this.props.game.isGameOver}
                                    onGameOver={this.handleGameOver}
                                    onMusicPlay={this.handleMusicPlay}
                                />  
        }

        return ( 
                <div className="container">
                    {_roundAction}
                </div>
                );
    }
});