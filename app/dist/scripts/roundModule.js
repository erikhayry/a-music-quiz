/**
 * @jsx React.DOM
 */

'use strict';

var Round = React.createClass({displayName: 'Round',

    getInitialState: function() {
        return {
            answer: '',
            musicLoaded: false,
            musicPlaying: false
        };
    },

    handleGameOver: function(){
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
            musicLoaded: false,
        })
    },

    handleEndRound: function(time) {
        log('Round: handleEndRound', time);
        var _answer = this.state.answer;

        this.setState({
            answer: '',
            musicLoaded: false,
            musicPlaying: false
        })

        this.props.onNextRound(_answer, time);
    },

    render: function() {
        log('Round: render')
        log(this.state)
        
        return ( React.DOM.div(null, 
                    React.DOM.div( {className:"container"}, 
                        React.DOM.ul( {className:"nav nav-tabs nav-justified"}, 
                            React.DOM.li(null, React.DOM.button(null, "x")),
                            React.DOM.li(null, Points( {points:this.props.game.points} ))
                        )
                    ),
                    
                    MusicPlayer( 
                        {url:this.props.game.round.current.track.url,
                        musicPlaying:this.state.musicPlaying,
                        musicLoaded:this.state.musicLoaded,
                        
                        onMusicLoaded:this.handleMusicLoaded,
                        onStop:this.handleEndRound}
                    ),

                    RoundAction(
                        {game:this.props.game,
                        musicPlaying:this.state.musicPlaying,
                        musicLoaded:this.state.musicLoaded,
                        answer:this.props.answer,
                        isGameOver:this.props.game.isGameOver,
                        
                        onMusicPlay:this.handleMusicPlay,
                        onAnswer:this.handleAnswer,
                        onGameOver:this.handleGameOver}
                    ),
                    
                    Progress(
                        {gameLength:this.props.game.gameLength,
                        current:this.props.game.round.current.index-1}
                    )
                )
        );
    }
});