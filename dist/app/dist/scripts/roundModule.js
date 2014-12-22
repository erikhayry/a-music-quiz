"use strict";var Round=React.createClass({displayName:"Round",getInitialState:function(){return{answer:"",musicLoaded:!1,musicPlaying:!1}},handleGameOver:function(){log("Round: handleGameOver"),this.props.onGameOver()},handleMusicLoaded:function(){log("Round: handleMusicLoaded"),this.setState({musicLoaded:!0})},handleMusicPlay:function(){log("Round: handleMusicPlay"),this.setState({answer:"",musicPlaying:!0})},handleAnswer:function(a){log("Round: handleAnswer"),this.setState({answer:a,musicPlaying:!1})},handleEndRound:function(a){log("Round: handleEndRound",a),Delay.f(function(){var b=this.state.answer;this.setState({answer:"",musicLoaded:!1,musicPlaying:!1}),this.props.onNextRound(b,a)}.bind(this,a))},handleBackToPlaylists:function(){log("Round: handleBackToPlaylists"),this.props.onBackToPlaylists()},render:function(){return log("Round: render"),log(this.state),React.DOM.div({className:"m-round"},React.DOM.ul({className:"m-round-nav"},React.DOM.li({className:"m-round-nav-item"},React.DOM.button({className:"m-round-cancel-btn",onClick:this.handleBackToPlaylists},"x")),React.DOM.li({className:"m-round-nav-item m-round-points"},Points({points:this.props.game.points}))),MusicPlayer({url:this.props.game.round.current.track.url,musicPlaying:this.state.musicPlaying,musicLoaded:this.state.musicLoaded,onMusicLoaded:this.handleMusicLoaded,onStop:this.handleEndRound}),RoundAction({game:this.props.game,musicPlaying:this.state.musicPlaying,musicLoaded:this.state.musicLoaded,answer:this.state.answer,isGameOver:this.props.game.isGameOver,onMusicPlay:this.handleMusicPlay,onAnswer:this.handleAnswer,onGameOver:this.handleGameOver}),Progress({gameLength:this.props.game.gameLength,current:this.props.game.round.current.index}))}});