/**
 * @jsx React.DOM
 */

'use strict';

	var game = {
		round : {
			options : [
				{name: 'Radiohead', id: 'radiohead'},
				{name: 'Kent', id: 'kent'},
				{name: 'Bjork', id: 'bjork'},
				{name: 'Bob Hund', id: 'bobhund'}
			],
			answer: 'radiohead',
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
		return (
		  React.DOM.div(null, 
		  	React.DOM.div(null, 
		   		GamePoints( {points:game.points})
		  	),
		  	React.DOM.div(null, 
		  		RoundPoints( {points:game.round.points, stop:this.state.answered}),
		    	RoundOptions( {options:game.round.options, answered:this.state.answered, onAnswer:this.handleAnswer})
		    )
		  )
	)}
});