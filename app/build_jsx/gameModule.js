/**
 * @jsx React.DOM
 */

'use strict';

	var game = {
		round : {
			points: 30000
		},
		points: 48000
	}


var GameView = React.createClass({displayName: 'GameView',
	getInitialState: function() {
    	return {
    		answered: false
    	};
  	},	

    handleAnswer: function(answer) {
    	console.log('handle answer')
        this.setState({
    		answered: true
    	});
    },

	render: function() {
		console.log('render')
		console.log(this.props)
		var _game = this.props.game;
		var _options = this.props.options.options;

		console.log(_options)
		
		return (
		  React.DOM.div(null, 
		  	React.DOM.div(null, 
		   		GamePoints( {points:_game.points})
		  	),
		  	React.DOM.div(null, 
		  		//RoundPoints( {points:_game.round.points, stop:this.state.answered}),
		    	RoundOptions( {options:_options, answered:this.state.answered, onAnswer:this.handleAnswer})
		    )
		  )
	)}
});