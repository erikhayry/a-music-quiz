/**
 * @jsx React.DOM
 */

'use strict';

var RoundAction = React.createClass({displayName: 'RoundAction',
    handleAnswer: function(answer) {
        log('RoundAction: handleAnswer')
        this.props.onAnswer(answer);
    },    

    handleGameOver: function(){
        log('RoundAction: handleGameOver')
        this.props.onGameOver();
    }, 

    handleMusicPlay: function(){
        log('RoundAction: handleMusicPlay')
        this.props.onMusicPlay();
    },

    render: function() {
        log('RoundAction: render')
        
        var _roundAction = Loading( {module:"RoundAction"}),
            _currentRoundIndex = this.props.game.round.current.index-1;

        if(this.props.musicPlaying || this.props.answer){            
            _currentRoundIndex = this.props.game.round.current.index;
            _roundAction = Options( 
                                {answer:this.props.answer,
                                options:this.props.game.round.options,
                                
                                onAnswer:this.handleAnswer}
                            )
        } 
        else if ((!this.props.musicPlaying && !this.props.answer) || this.props.game.isGameOver) {

            var _previous = _currentRoundIndex - 1,
                _previousAnswer = (this.props.game.history[_previous]) ? this.props.game.history[_previous].answer : undefined,
                _previousQuestion = (this.props.game.history[_previous]) ? this.props.game.history[_previous].data.artist.id : undefined

                _roundAction = GameNav(
                                    {previousAnswer:_previousAnswer,
                                    previousQuestion:_previousQuestion,
                                    isGameOver:this.props.game.isGameOver,
                                    isMusicLoaded:this.props.musicLoaded,
                                    
                                    onGameOver:this.handleGameOver,
                                    onMusicPlay:this.handleMusicPlay}
                                )  
        }

        return ( 
                React.DOM.div( {className:"m-round-action"}, 
                    _roundAction
                )
                );
    }
});