/**
 * @jsx React.DOM
 */

'use strict';

var GameOver = React.createClass({displayName: 'GameOver',
    render: function(){
        return (
            React.DOM.div(null, 
                " Game Over "
            )
       )     
    }
});

var Points = React.createClass({displayName: 'Points',
    render: function(){
        return (
            React.DOM.div(null, 
                " Points: ", this.props.points
            )
       )     
    }
});

var MusicPlayer = React.createClass({displayName: 'MusicPlayer',
    render: function(){
        var _timer = '',
            _audio = '';
                        
        if(this.props.musicLoaded && this.props.musicPlaying){
            _timer = 30;
        }
        
        else if(!this.props.musicLoaded){
            _audio = React.DOM.audio( {src:this.props.url} )
            setTimeout(function(){
                this.props.onMusicLoaded();
            }.bind(this), 500);           
        }
        
        return (
            React.DOM.div(null, 
                React.DOM.h1(null, _timer),
                _audio
            )
       )     
    }
});

var Options = React.createClass({displayName: 'Options',
    handleAnswer: function(event){
        this.props.onAnswer(event.target.dataset.answer)
    },

    render: function(){
        var _options = [],
            _activeClassName = '',
            _disabled = (this.props.answer) ? 'disabled' : '';
        
        this.props.options.forEach(function(option){
            _activeClassName = (option.id == this.props.answer) ? 'is-active' : '';
            _options.push(React.DOM.button( 
                                {disabled:_disabled, 
                                className:_activeClassName,
                                onClick:this.handleAnswer,
                                'data-answer':option.id,
                                key:option.id}
                           , option.name)
                           );        
        }.bind(this));
        
        return (
            React.DOM.div(null, 
               _options
            )
       )     
    }
});


var GameNav = React.createClass({displayName: 'GameNav',
    render: function(){
        var _buttonTxt = '',
            _navCopy = '';

        if(this.props.previousQuestion){
            console.log(this.props)
            if(this.props.previousAnswer == this.props.previousQuestion){
                _navCopy = 'Right!';
            }
            
            else{
                _navCopy = 'Wrong!';
            }
            
            _buttonTxt = 'Next';
        }
        
        else{
            _buttonTxt = 'Start';

        }
    
        return (
            React.DOM.div(null, 
                React.DOM.p(null, _navCopy),
               React.DOM.button( {onClick:this.props.onMusicPlay}, _buttonTxt)
            )
       )     
    }
});

var Progress = React.createClass({displayName: 'Progress',
    render: function(){
        var _dots = [],
            _activeClassName = '';
        
        for(var i = 1; i < this.props.gameLength + 1; i++){
            _activeClassName = (i == this.props.current) ? 'is-active' : '';
            _dots.push(React.DOM.li( {className:_activeClassName, key:i}, i));
        }
    
        return (
            React.DOM.div(null, 
               React.DOM.ul( {className:"pagination"}, 
                   _dots
               )
            )
       )     
    }
});

var Round = React.createClass({displayName: 'Round',
    
    getInitialState: function() {
        return {
            answer: '',
            musicLoaded: false,
            musicPlaying: false
        };
    },
    
    handleMusicLoaded: function(){
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
        var _gameActions = React.DOM.p(null, "Loading..."),
            _currentRoundIndex = this.props.game.current-1;
        
        if(this.state.musicPlaying){
            _currentRoundIndex = this.props.game.current;
            _gameActions = Options( 
                            {answer:this.state.answer,
                            options:this.props.game.options,
                            onAnswer:this.handleAnswer}
                        )
        }
        
        else if(this.state.musicLoaded){
            var _previous = _currentRoundIndex-1;

            var _previousAnswer = (this.props.game.history[_previous]) ? this.props.game.history[_previous].answer : undefined,
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
                            {url:this.props.game.url,
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

var Game = React.createClass({displayName: 'Game',
    getInitialState: function() {
        return {
            game: ''
        };
    },

    onGameOver: function(){

    },
    
    handleNextRound: function(points){        
        this.setState({
            game: {
                points: this.state.game.points + points,
                gameLength: 4,
                current: this.state.game.current + 1,
                options: [
                    {name: "Option 1", id:"1"},
                    {name: "Option 2", id:"2"},
                    {name: "Option 3", id:"3"},
                    {name: "Option 4", id:"4"}
                ],    
                question: {
                    id: 2,
                    url: "http://url.com"
                },
                history: [
                    {
                        name: 'Song 1',
                        url: 'url1.com',
                        id: "1",
                        answer: "2"
                    },
                    {
                        name: 'Song 2',
                        url: 'url2.com',
                        points: 29,
                        id: "2",
                        answer: "2"
                    },
                    {
                        name: 'Song 1',
                        url: 'url1.com',
                        id: "1",
                        answer: "1"
                    },
                    {
                        name: 'Song 2',
                        url: 'url2.com',
                        points: 29,
                        id: "2",
                        answer: "2"
                    }    
                ]                
            }            
        });
    },
    
    render: function(){
        console.log('render Game')
        console.log(this.state)
        var _view = React.DOM.p(null, "Loading...");
        
        //if current == -1
        if(this.state.game.gameLength && this.state.game.gameLength < this.state.game.current){
            _view = React.DOM.p(null, "Game Over");
        }

        else if(this.state.game){
            _view = Round( 
                        {game:this.state.game,
                        onNextRound:this.handleNextRound,
                        onGameOver:this.handleGameOver}
                     );
        }
        else{
            setTimeout(function(){
                this.setState({
                    game: {
                        points: 0,
                        gameLength: 4,
                        current: 1,
                        options: [
                            {name: "Option 1", id:"1"},
                            {name: "Option 2", id:"2"},
                            {name: "Option 3", id:"3"},
                            {name: "Option 4", id:"4"}
                        ],    
                        question: {
                            id: 1,
                            url: "http://url.com"
                        },
                        history: []
                    }
                })          
            }.bind(this), 500);        
        }
        
        return (
            React.DOM.div(null, 
                _view
            )
       )     
    }
});

var Playlists = React.createClass({displayName: 'Playlists',
    handlePlay: function(event){
        var _user = event.target.dataset.user;
        var _playlistId = event.target.dataset.playlist;
        this.props.onPlay(_user, _playlistId)
    },
    share: function(event){
        var _user = event.target.dataset.user;
        var _playlistId = event.target.dataset.playlist;
        console.log('share', _user, _playlistId)
    },    
    render: function () {
        console.log('render Playlists')
            var listItems = this.props.playlists.map(function (playlist, i) {
                return React.DOM.li( {key:playlist.id}, 
                        playlist.name, " | " ,
                        React.DOM.button( {'data-user':playlist.user, 'data-playlist':playlist.id, onClick:this.handlePlay} , "Play"), " | ",
                        React.DOM.button( {'data-user':playlist.user, 'data-playlist':playlist.id, onClick:this.share}, "Share")
                       );
            }.bind(this));

        return ( React.DOM.div(null , 
                    React.DOM.ul(null, 
                        listItems
                    )    
            )
        );
    }
});

/*var Login = React.createClass({
    handleLogin: function(){
        setTimeout(function(){
            this.props.onAuth(
                [
                    {name: 'Playlist A', id: "1", user:"erikportin"},
                    {name: 'Playlist B', id: "2", user:"erikportin"},
                    {name: 'Playlist C', id: "3", user:"erikportin"},
                    {name: 'Playlist D', id: "4", user:"erikportin"},
                    {name: 'Playlist E', id: "5", user:"erikportin"}
                ]            
            );
        }.bind(this), 500)    
    },
    render: function(){
        console.log('render Login')
        return (
            <div>
                <h1>A Music Quiz</h1>
                <button onClick={this.handleLogin}>Login</button>
                <p>Made by Erik Portin</p>
            </div>
       )     
    }
});*/

var App = React.createClass({displayName: 'App',
    getInitialState: function() {
        return {
            playlists: '',
            user: '',
            id: ''
        };
    },

    handleAuth: function(playlists){
        this.setState({
            playlists: playlists
        })
    },
    
    handlePlay: function(user, id){
        setTimeout(function(){
            this.setState({
                user: user,
                id: id
            })          
        }.bind(this), 500)  
    },

    render: function(){
        console.log('render App')
        var _view = React.DOM.p(null, "Loading...");
        
        if(this.state.user && this.state.id){
            _view = Game( 
                        {id:this.state.id, 
                        user:this.state.user} 
                    );            
        }
        else if(this.state.playlists){
            _view = Playlists( 
                        {onPlay:this.handlePlay, 
                        playlists:this.state.playlists}
                    );
        }
        else{
            _view = Login( {onAuth:this.handleAuth});    
        }
        
        return (
            React.DOM.div(null, 
                _view
            )
       )     
    }
});