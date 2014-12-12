/**
 * @jsx React.DOM
 */

'use strict';

/*var GameView = React.createClass({

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
		log.div()
		log('gameModule: next')
		if(!round){
			this.gameOver();
		}
		else{
			this.startNewRound(round);				
		}
	},

	setupNewRound: function(delay){
		log('gameModule: setupNewRound')
		var _this = this,
			_game = this.props.game,
			_delay = delay || 0;
			
		_game.next().then(function(round){
			log('gameModule: setupNewRound: got data')
			log(round )
			setTimeout(function(){
				_this.next(round);
			}, _delay)

		}, function(error){
			_this.error(1)
		});	
	},

	startNewRound: function(round){
		log('gameModule: startNewRound')
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
		React.renderComponent(<GameView game={this.props.game.reset()}/>, document.getElementById('app'));
    	this.replaceState(this.getInitialState())
    	this.componentDidMount();
    },

    goToPlaylist: function(){
    	React.renderComponent(<AppView />, document.getElementById('app'));
    },

	render: function() {

		var _this = this,
			_gameBottom, 
			_gameBottomLower = '';


		if(this.state.error === 1){
			_gameBottom = 	<div class="m-error">
								<p>Something is wrong with this playlist</p>
								<button onClick={_this.goToPlaylist}>Choose another playlist</button>
							</div>	
		}	
		else{
			if(!this.state.gameOver){

				
				if(!this.state.roundStarted && this.state.roundLoaded){
					var _messageTxt = '',
						_buttonTxt = 'Start a new game';

					if(this.state.isAnswerCorrect){
						_messageTxt = 'Right!';
						_buttonTxt = 'Next';
					}
					
					else if(this.state.isAnswerCorrect === false){
						_messageTxt = 'Wrong!';
						_buttonTxt = 'Next';
					}

					_gameBottomLower = 	<div className="m-game-message">
											<p>{_messageTxt}</p>
											<button onClick={_this.startRound}>{_buttonTxt}</button>
										</div>		
				}
				else if(this.state.roundLoaded && this.state.roundStarted){
					_gameBottomLower = 	<div>
											<RoundOptions 
												options={this.state.options} 
												answer={this.state.answer} 
												rightAnswer={this.state.rightAnswer} 
												onUserAnswer={this.onUserAnswer}
											/>
											<button onClick={_this.goToPlaylist}>Back</button>
										</div>	

				}


				_gameBottom = 	<div className="m-app-bottom">
					    			<MusicPlayer 
					    				current={this.state.current} 
					    				answer={this.state.answer} 
					    				hasStarted={this.state.roundStarted}
					    				isLoaded={this.state.roundLoaded}
					    				onRoundOver={this.getAnswer}
					    				onReady={this.onReady}				    			
					    			/>
					    			{_gameBottomLower}
					    		</div>
			}
			
			else{
				_gameBottom = 	<ul className="m-app-bottom">
									<li><button onClick={_this.restart}>Play again</button></li>
									<li><button onClick={_this.goToPlaylist}>Choose another playlist</button></li>
								</ul>
			}			
		}

		return (
			  <div className="m-app">
			   	<div className="m-app-top">
			   		<GameState points={this.state.points} round={this.state.round} gameLength={this.state.gameLength}/>
			   	</div>
			  	{_gameBottom}
			  </div>
			)
	} */ 


var GameView = React.createClass({displayName: 'GameView',
    getInitialState: function() {
        return {
            game: ''
        };
    },

    onGameOver: function(){

    },

    next: function(game){
    	log('GameView: next')
		game.next().then(function(game){
		    
		    this.setState({
	    		game: game
	    	}); 

	    }.bind(this), function(error){
			console.error('GameView: next()')
		}) 
    },
    
    handleNextRound: function(answer, points){ 
		log('GameView: handleNextRound')
		log(answer)
		log(points)

		this.state.game.answer(answer, points).then(function(game){
    		log('GameView: got next round');
    		log(game)

		    this.next(game);

		}.bind(this), function(error){
			console.error('GameView: failed to next round');
		})
    },

    getGame: function(user, playlistId){
    	log('GameView: getGame');
    	
    	new Game(user, playlistId, {gameLength: Settings.gameLength}).next().then(function(game){
    		log('GameView: got new game');
    		log(game)
		    
		    this.setState({
	    		game: game
	    	})

		}.bind(this), function(error){
			console.error('GameView: failed to get game');
		});   		
    },
    
	componentDidMount: function(){
		log('GameView: componentDidMount')
        if(!this.state.game){
            this.getGame(this.props.user, this.props.playlistId)               
        }
	},

    render: function(){
        log('GameView: render')
        var _view = React.DOM.p(null, "Loading game...");
        
        //if current == -1
/*        if(this.state.game.gameLength && this.state.game.gameLength < this.state.game.current){
            _view = <p>Game Over</p>;
        }*/

        if(this.state.game){
            _view = Round( 
                        {game:this.state.game,
                        onNextRound:this.handleNextRound,
                        onGameOver:this.handleGameOver}
                     );
        }
        
        return (
            React.DOM.div(null, 
                _view
            )
       )     
    }
});