/**
 * @jsx React.DOM
 */

'use strict';

var GameView = React.createClass({displayName: 'GameView',

	getInitialState: function() {
		console.log('getInitialState')
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
		console.log('componentDidMount')
		this.setupNewRound();	
	},

	setupNewRound: function(delay){
		console.log('setupNewRound')
		var _this = this,
			_game = this.props.game,
			_delay = delay || 0;
			
		_game.next().then(function(round){
			setTimeout(function(){
				if(!round){
					_this.gameOver();
				}
				else{
					_this.startNewRound(round)
					setTimeout(function(){
						_this.onAnswer(_this.state.current.artist.id, 20);
					}, 3000)					
				}
			}, _delay)

		});	
	},

	startNewRound: function(round){
		console.log('startNewRound')
		this.setState({
			options: round.options,
			current: round.current,
			round: round.index,
			gameLength: round.gameLength
		})
	},

	gameOver: function(){
		console.log('gameOver')
		this.setState({
			options: [],
			current: {},
			isAnswerCorrect: null,
			rightAnswer: null,
			answer: null,
			gameOver: true,
		})
		console.log(this.state)
	},

	onAnswer: function(answer, points){
		console.log('onAnswer')

		this.setState({
			answer: answer
		})

		this.getAnswer(answer, points)
	},	

	getAnswer: function(answer, points){
		console.log('getAnswer')
		var _this = this,
			_game = _this.props.game;

		_game.answer(answer, points).then(function(answerData){
			setTimeout(function(){
				_this.setState({
					rightAnswer: answerData.rightAnswer,
					points: answerData.points,
					isAnswerCorrect: answerData.isAnswerCorrect
				})

				_this.setupNewRound(2000);

			}, 2000)
		})
	},
	
/*	setNextTrack: function(tracks, points){
		var _this = this,
			_points = 0;

		_this.setState({
			tracks: tracks.options,
			current: {
				name: tracks.current.artist.name,
				url: tracks.current.track.url,
			},
			answered: false,
			points: _this.getPoints(points),
			answer: false,
			rightAnswer: '',
			round: tracks.current.index
		});			
		
	},

    handleAnswer: function(answer) {
    	var _game = this.props.game,
    		_rightAnswer = _game.nextTrack.current.artist.id;	

        this.setState({
        	rightAnswer: _rightAnswer,
    		answered: true,
    		answer: answer === _rightAnswer
    	})
    },

    onAudioStop: function(points){
		var _this = this,
    		_game = this.props.game;  
	
    	setTimeout(function(){
			_game.getNextTrack().then(function(tracks){			
				if(tracks && tracks.current.index <= Settings.gameLength){
					_this.setNextTrack(tracks, points)
				}
				
				else{
					_this.setState({
						points: _this.getPoints(points),
						gameOver: true
					})
				}
			});    		
    	}, 1500)
    },

    restart: function(){
		React.renderComponent(<GameView game={this.props.game.reset()}/>, document.getElementById('app'));
    	this.replaceState(this.getInitialState())
    	this.componentDidMount();
    },

    goToPlaylist: function(){
    	React.renderComponent(<AppView />, document.getElementById('app'));
    },*/

	render: function() {
		console.log('Render')
		var _this = this,
			_gameBottom;


		if(!this.state.gameOver){
			_gameBottom = 	React.DOM.div(null, 
" /* ",								MusicPlayer( {current:this.state.current, answered:this.state.answered, onAudioStop:this.onAudioStop}),		  	
" */ ",				    			RoundOptions( {options:this.state.tracks, answered:this.state.answered, rightAnswer:this.state.rightAnswer, onAnswer:this.handleAnswer})
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