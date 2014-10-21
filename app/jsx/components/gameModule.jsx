/**
 * @jsx React.DOM
 */

'use strict';

var GameView = React.createClass({
	getPoints: function(points){
		return (this.state.answer) ? this.state.points + points : this.state.points;
	},

	getInitialState: function() {
    	return {
    		answered: false,
    		tracks: [],
    		current: {
    			name: '',
    			url: ''
    		},
    		points: 0,
    		gameOver: false,
    		rightAnswer: ''
    	};
  	},

	componentDidMount: function() {

		var _this = this,
			_game = this.props.game;
			
		_game.getNextTrack().then(function(tracks){
			_this.setNextTrack(tracks, 0)
		});
	}, 	 		
	
	setNextTrack: function(tracks, points){
		console.log('setNextTrack')
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
    	console.log('handleAnswer')
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
    },

	render: function() {
		var _this = this,
			_game = _this.props.game,
			_gameBottom;


		if(!this.state.gameOver){
			_gameBottom = 	<div>
								<MusicPlayer current={this.state.current} answered={this.state.answered} onAudioStop={this.onAudioStop}/>		  	
				    			<RoundOptions options={this.state.tracks} answered={this.state.answered} rightAnswer={this.state.rightAnswer} onAnswer={this.handleAnswer}/>
				    		</div>
		}
		
		else{
			_gameBottom = 	<ul>
								<li><button onClick={_this.restart}>Play again</button></li>
								<li><button onClick={_this.goToPlaylist}>Choose another playlist</button></li>
							</ul>
		}
		
		return (
			  <div>
			  	<div>
			   		<GamePoints points={this.state.points} round={this.state.round}/>
			  	</div>
			  	{_gameBottom}
			  </div>
			)
	}    
});