/**
 * @jsx React.DOM
 */

'use strict';

var GameView = React.createClass({displayName: 'GameView',

	getInitialState: function() {
    	return {
			options: [],
			current: {},
			points: 0,
			round: 1,
			gameLength: null,
			rightAnswer: null,
			answer: null,
			gameOver: false,
			isAnswerCorrect: null
    	};
  	},

	componentDidMount: function() {
		this.setupNewRound();	
	},

	next: function(round){
		if(!round){
			this.gameOver();
		}
		else{
			this.startNewRound(round);				
		}
	},

	setupNewRound: function(delay){
		var _this = this,
			_game = this.props.game,
			_delay = delay || 0;
			
		_game.next().then(function(round){
			setTimeout(function(){
				_this.next(round);
			}, _delay)
		});	
	},

	startNewRound: function(round){
		this.setState({
			options: round.options,
			current: round.current,
			round: round.index,
			gameLength: round.gameLength,
			answer: null,
			isAnswerCorrect: null,
			rightAnswer: null
		})
	},

	gameOver: function(){
		this.setState({
			options: [],
			current: {},
			isAnswerCorrect: null,
			rightAnswer: null,
			answer: null,
			gameOver: true,
		})
	},

	onUserAnswer: function(answer){
		this.setState({
			answer: answer
		})
	},	

	getAnswer: function(answer, points){
		var _this = this,
			_game = _this.props.game;

		_game.answer(answer, points).then(function(answerData){
			setTimeout(function(){
				_this.answered(answerData)
			}, Settings.userDelay)
		})
	},

	answered: function(answerData){
		this.setState({
			rightAnswer: answerData.rightAnswer,
			points: answerData.points,
			isAnswerCorrect: answerData.isAnswerCorrect
		})

		this.setupNewRound(Settings.userDelay);
	},

    restart: function(){
		React.renderComponent(GameView( {game:this.props.game.reset()}), document.getElementById('app'));
    	this.replaceState(this.getInitialState())
    	this.componentDidMount();
    },

    goToPlaylist: function(){
    	React.renderComponent(AppView(null ), document.getElementById('app'));
    },

	render: function() {
		var _this = this,
			_gameBottom;

		if(!this.state.gameOver){
			_gameBottom = 	React.DOM.div(null, 
				    			MusicPlayer( 
				    				{current:this.state.current, 
				    				answer:this.state.answer, 
				    				onRoundOver:this.getAnswer}
				    			),
								RoundOptions( 
									{options:this.state.options, 
									answer:this.state.answer, 
									rightAnswer:this.state.rightAnswer, 
									isAnswerCorrect:this.state.isAnswerCorrect,
									onUserAnswer:this.onUserAnswer}
								)
				    		)
		}
		
		else{
			_gameBottom = 	React.DOM.ul(null, 
								React.DOM.li(null, React.DOM.button( {onClick:_this.restart}, "Play again")),
								React.DOM.li(null, React.DOM.button( {onClick:_this.goToPlaylist}, "Choose another playlist"))
							)
		}
		
		return (
			  React.DOM.div(null, 
			  	React.DOM.div(null, 
			   		GamePoints( {points:this.state.points, round:this.state.round, gameLength:this.state.gameLength})
			  	),
			  	_gameBottom
			  )
			)
	}    
});