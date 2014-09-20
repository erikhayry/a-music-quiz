/**
 * @jsx React.DOM
 */

'use strict';

var GameView = React.createClass({
	getInitialState: function() {
    	return {
    		answered: false,
    		tracks: [],
    		current: {
    			name: '',
    			url: ''
    		},
    		points: 0
    	};
  	},	

    handleAnswer: function(answer) {
    	var _this = this,
    		_game = this.props.game,
    		_rightAnswer = _game.nextTrack.current.artist.id;	

        _this.setState({
    		answered: true
    	});

        if(answer === _rightAnswer){
        	_this.setState({
				points: _game.points++
			});		
        }

		_game.getNextTrack().then(function(tracks){
			_this.setState({
				answered: false,
				tracks: tracks.options,
				current: {
					name: tracks.current.artist.name,
					url: tracks.current.track.url
				}
			});
		});	        
    },

	componentDidMount: function() {
		console.log('GameView componentDidMount')

		var _this = this,
			_game = this.props.game;
			
		_game.getNextTrack().then(function(tracks){
			console.log(tracks)
			_this.setState({
				tracks: tracks.options,
				current: {
					name: tracks.current.artist.name,
					url: tracks.current.track.url
				}
			});
		});
	},    

	render: function() {
		var _game = this.props.game;

		//<RoundPoints points={game.round.points} stop={this.state.answered}/>		
		return (
		  <div>
		  	<div>
		   		<GamePoints points={this.state.points}/>
		  	</div>
		  	<div>
				<MusicPlayerModule current={this.state.current} answered={this.state.answered}/>		  	
		    	<RoundOptions options={this.state.tracks} answered={this.state.answered} onAnswer={this.handleAnswer}/>
		    </div>
		  </div>
	)}
});