/**
 * @jsx React.DOM
 */

'use strict';

var GameView = React.createClass({
    getInitialState: function() {
        return {
            game: ''
        };
    },

    handleGameOver: function(){
    	log('GameView: handleGameOver')
    	this.props.onGameOver(this.state.game.history);
    },

    next: function(game){
    	log('GameView: next')
		game.next().then(function(game){
    		log('GameView: got next round');
    		log(game)

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
    		log('GameView: answered');
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

        //reset game by calling onPlay from parent
        if(this.props.replay){
            this.props.onPlay(this.props.playlistOwner, this.props.playlistId)
        }

        //if not resetting and no game, start new game
        else if(!this.state.game){
            this.getGame(this.props.playlistOwner, this.props.playlistId)               
        }
	},

    componentDidUpdate: function(){
        log('GameView: componentDidUpdate')

        //restarts game after being reset in componentDidMount
        if(!this.props.replay && !this.state.game){
            this.getGame(this.props.playlistOwner, this.props.playlistId)               
        }        
    },

    render: function(){
        log('GameView: render')
        var _view = <p>Loading game...</p>;
        
        //only render round if not in the middle of setting up a game or resetting
		if(this.state.game){
            _view = <Round 
                        game={this.state.game}
                        onNextRound={this.handleNextRound}
                        onGameOver={this.handleGameOver}
                     />;
        }
        
        return (
            <div>
                {_view}
            </div>
       )     
    }
});