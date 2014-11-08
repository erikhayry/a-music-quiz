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
			isAnswerCorrect: null,
			error: null,

			roundLoaded: false,
			roundStarted: false
    	};
  	},

	componentDidMount: function() {
		this.setupNewRound();
	},

	error: function(type){
		switch(type){
			case 1:
				this.setState({
					error: 1,
				})
				break;
			default:
				this.setState({
					error: 1,
				})				
			break;
		}
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

		}, function(error){
			_this.error(1)
		});	
	},

	startNewRound: function(round){
		this.setState({
			options: round.options,
			current: round.current,
			round: round.index,
			gameLength: round.gameLength,
			answer: null,
			rightAnswer: null,
			roundLoaded: false,
			roundStarted: false
		})
	},

	startRound: function(){
		this.setState({
			isAnswerCorrect: null,
			roundStarted: true
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
			roundLoaded: false,
			roundStarted: false
		})
	},

	onReady: function(){
		this.setState({
			roundLoaded: true
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

		this.setupNewRound();
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
			_gameBottom, 
			_gameBottomLower = '';


		if(this.state.error === 1){
			_gameBottom = 	React.DOM.div( {class:"m-error"}, 
								React.DOM.p(null, "Something is wrong with this playlist"),
								React.DOM.button( {onClick:_this.goToPlaylist}, "Choose another playlist")
							)	
		}	
		else{
			if(!this.state.gameOver){

				
				if(!this.state.roundStarted && this.state.roundLoaded){
					var _buttonTxt = 'Start';

					if(this.state.isAnswerCorrect){
						_buttonTxt = 'Right!';
					}
					
					else if(this.state.isAnswerCorrect === false){
						_buttonTxt = 'Wrong!';
					}

					_gameBottomLower = React.DOM.button( {onClick:_this.startRound}, _buttonTxt)
				}
				else if(this.state.roundLoaded && this.state.roundStarted){
					_gameBottomLower = 	React.DOM.div(null, 
											RoundOptions( 
												{options:this.state.options, 
												answer:this.state.answer, 
												rightAnswer:this.state.rightAnswer, 
												onUserAnswer:this.onUserAnswer}
											),
											React.DOM.button( {onClick:_this.goToPlaylist}, "Back")
										)	

				}


				_gameBottom = 	React.DOM.div( {className:"m-app-bottom"}, 
					    			MusicPlayer( 
					    				{current:this.state.current, 
					    				answer:this.state.answer, 
					    				hasStarted:this.state.roundStarted,
					    				isLoaded:this.state.roundLoaded,
					    				onRoundOver:this.getAnswer,
					    				onReady:this.onReady}				    			
					    			),
					    			_gameBottomLower
					    		)
			}
			
			else{
				_gameBottom = 	React.DOM.ul( {className:"m-app-bottom"}, 
									React.DOM.li(null, React.DOM.button( {onClick:_this.restart}, "Play again")),
									React.DOM.li(null, React.DOM.button( {onClick:_this.goToPlaylist}, "Choose another playlist"))
								)
			}			
		}

		return (
			  React.DOM.div( {className:"m-app"}, 
			   	React.DOM.div( {className:"m-app-top"}, 
			   		GameState( {points:this.state.points, round:this.state.round, gameLength:this.state.gameLength})
			   	),
			  	_gameBottom
			  )
			)
	}    
});