/**
 * @jsx React.DOM
 */

'use strict';

var Round = React.createClass({

    getInitialState: function() {
        return {
            answer: '',
            musicLoaded: false,
            musicPlaying: false
        };
    },

    handleGameOver: function(){
        log('Round: handleGameOver')
        this.props.onGameOver();
    },

    handleMusicLoaded: function() {
        log('Round: handleMusicLoaded')
        this.setState({
            musicLoaded: true
        })
    },

    handleMusicPlay: function() {
        log('Round: handleMusicPlay')
        this.setState({
            answer: '',
            musicPlaying: true
        })
    },

    handleAnswer: function(answer) {
        log('Round: handleAnswer')

        this.setState({
            answer: answer,
            musicPlaying: false,
        })
    },

    handleEndRound: function(time) {
        log('Round: handleEndRound', time);

        Delay.f(function(){
            var _answer = this.state.answer;
            this.setState({
                answer: '',
                musicLoaded: false,
                musicPlaying: false
            })

            this.props.onNextRound(_answer, time);            
        }.bind(this, time))

    },

    render: function() {
        log('Round: render')
        log(this.state)
        
        return ( <div>
                    <div className="container">
                        <ul className="nav nav-tabs nav-justified">
                            <li><button>x</button></li>
                            <li><Points points={this.props.game.points} /></li>
                        </ul >
                    </div>
                    
                    <MusicPlayer 
                        url={this.props.game.round.current.track.url}
                        musicPlaying={this.state.musicPlaying}
                        musicLoaded={this.state.musicLoaded}
                        
                        onMusicLoaded={this.handleMusicLoaded}
                        onStop={this.handleEndRound}
                    />

                    <RoundAction
                        game={this.props.game}
                        musicPlaying={this.state.musicPlaying}
                        musicLoaded={this.state.musicLoaded}
                        answer={this.state.answer}
                        isGameOver={this.props.game.isGameOver}
                        
                        onMusicPlay={this.handleMusicPlay}
                        onAnswer={this.handleAnswer}
                        onGameOver={this.handleGameOver}
                    />
                    
                    <Progress
                        gameLength={this.props.game.gameLength}
                        current={this.props.game.round.current.index}
                    />
                </div>
        );
    }
});