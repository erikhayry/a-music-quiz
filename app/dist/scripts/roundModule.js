/** @jsx React.DOM */

/*var RoundOption = React.createClass({
    
	handleClick: function(){
        var _this = this;
        
        _this.props.onUserAnswer(
            _this.getDOMNode().value
        );        
	},

    render: function() { 
        var _className = '';

        if(this.props.answer == this.props.option.id){
            _className += 'is-selected';
        }
    
        return (<button
        			disabled={this.props.answer}
        			value={this.props.option.id}
                    className={_className}
        			onClick={this.handleClick}
        		>{this.props.option.name}</button>);
    }
});*/

var Round = React.createClass({displayName: 'Round',
    
    getInitialState: function() {
        return {
            answer: '',
            musicLoaded: false,
            musicPlaying: false
        };
    },
    
    handleMusicLoaded: function(){
        console.log('handleMusicLoaded')
        this.setState({
            musicLoaded: true
        })
    },

    handleMusicPlaying: function(){
        this.setState({
            answer: '',
            musicPlaying: true
        })
    },

    handleAnswer: function(answer){
        this.setState({
            answer: answer
        })    
        
        setTimeout(function(){
            this.setState({
                musicLoaded: false,
                musicPlaying: false
            })         
            this.props.onNextRound(10);            
        }.bind(this), 500);  
    },

    render: function () {
        console.log('render Round')
        console.log(this.state)
        var _gameActions = React.DOM.p(null, "Loading round..."),
            _currentRoundIndex = this.props.game.current-1;
        
        if(this.state.musicPlaying){
            _currentRoundIndex = this.props.game.current;
            _gameActions = Options( 
                            {answer:this.state.answer,
                            options:this.props.game.round.options,
                            onAnswer:this.handleAnswer}
                        )
        }
        
        else if(this.state.musicLoaded){

            var _previous = _currentRoundIndex-1,
                _previousAnswer = (this.props.game.history[_previous]) ? this.props.game.history[_previous].answer : undefined,
                _previousQuestion = (this.props.game.history[_previous]) ? this.props.game.history[_previous].id : undefined            

            _gameActions = GameNav( 
                            {previousAnswer:_previousAnswer,
                            previousQuestion:_previousQuestion,
                            onMusicPlay:this.handleMusicPlaying}
                        )                  
        }
    
        return ( React.DOM.div(null , 
                    React.DOM.div( {className:"container"}, 
                        React.DOM.ul( {className:"nav nav-tabs nav-justified"}, 
                            React.DOM.li(null, React.DOM.button(null, "x")),
                            React.DOM.li(null, Points( {points:this.props.game.points}))
                        )    
                    ),
                    
                    React.DOM.div( {className:"container"}, 
                        MusicPlayer( 
                            {url:this.props.game.round.current.track.url,
                            musicPlaying:this.state.musicPlaying,
                            musicLoaded:this.state.musicLoaded,
                            onMusicLoaded:this.handleMusicLoaded}
                        )
                    ),
                    
                    React.DOM.div( {className:"container"}, 
                        _gameActions
                    ),
                    
                    React.DOM.div( {className:"container"}, 
                        Progress( 
                            {gameLength:this.props.game.gameLength,  
                            current:_currentRoundIndex}
                        )
                    )
            )
        );
    }
});