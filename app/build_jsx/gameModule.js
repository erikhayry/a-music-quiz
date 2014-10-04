/**
 * @jsx React.DOM
 */

'use strict';

var GameView = React.createClass({displayName: 'GameView',
	
	setNextTrack: function(tracks){
		this.setState({
			tracks: tracks.options,
			current: {
				name: tracks.current.artist.name,
				url: tracks.current.track.url
			},
			answered: false
		});
	},

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
    	var _game = this.props.game,
    		_rightAnswer = _game.nextTrack.current.artist.id;	

        this.setState({
    		answered: true
    	});

        if(answer === _rightAnswer){
        	this.setState({
				answer: true
			});		
        }
      	
    },

    onAudioStop: function(points){
		var _this = this,
    		_game = this.props.game;  	
    	
		_game.getNextTrack().then(function(tracks){	
			_this.setNextTrack(tracks)
		});
    },

	componentDidMount: function() {
		console.log('GameView componentDidMount')

		var _this = this,
			_game = this.props.game;
			
		_game.getNextTrack().then(function(tracks){
			console.log(tracks)
			_this.setNextTrack(tracks)
		});
	},    

	render: function() {
		var _game = this.props.game;
		return (
		  React.DOM.div(null, 
		  	React.DOM.div(null, 
		   		GamePoints( {points:this.state.points})
		  	),
		  	React.DOM.div(null, 
				MusicPlayer( {current:this.state.current, answered:this.state.answered, onAudioStop:this.onAudioStop}),		  	
		    	RoundOptions( {options:this.state.tracks, answered:this.state.answered, onAnswer:this.handleAnswer})
		    )
		  )
	)}
});