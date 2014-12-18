/**
 * @jsx React.DOM
 */

'use strict';

var GameView = React.createClass({displayName: 'GameView',
    getInitialState: function() {
        return {
            game: ''
        };
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


    handleReplay: function() {
        log('GameView: handleReplay');

        this.state.game.reset().next().then(function(game){
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
            this.getGame(this.props.playlistOwner, this.props.playlistId)               
        }
	},

    render: function(){
        log('GameView: render')
        var _view = Loading( {module:"GameView"});
        
		if(this.state.game){
            if(this.state.game.isGameOver){
                _view = GameOverView( 
                            {history:this.state.game.history, 
                            onReplay:this.handleReplay,
                            onBackToPlaylists:this.props.onBackToPlaylists,
                            onShare:this.props.onShare}
                        );
            }
            else{
                _view = Round( 
                            {game:this.state.game,

                            onNextRound:this.handleNextRound,
                            onBackToPlaylists:this.props.onBackToPlaylists}
                         );                
            }
        }
        
        return (
            React.DOM.div( {className:"m-game l-view"}, 
                _view
            )
       )     
    }
});