/**
 * @jsx React.DOM
 */

'use strict';

var GameOver = React.createClass({
    render: function(){
        return (
            <div>
                Game Over
            </div>
       )     
    }
});

var Points = React.createClass({
    render: function(){
        return (
            <div>
                Points: {this.props.points}
            </div>
       )     
    }
});

var MusicPlayer = React.createClass({
    render: function(){
        var _timer = '',
            _audio = '';
                        
        if(this.props.musicLoaded && this.props.musicPlaying){
            _timer = 30;
        }
        
        else if(!this.props.musicLoaded){
            _audio = <audio src={this.props.url} />
            setTimeout(function(){
                this.props.onMusicLoaded();
            }.bind(this), 500);           
        }
        
        return (
            <div>
                <h1>{_timer}</h1>
                {_audio}
            </div>
       )     
    }
});

var Options = React.createClass({
    handleAnswer: function(event){
        this.props.onAnswer(event.target.dataset.answer)
    },

    render: function(){
        var _options = [],
            _activeClassName = '',
            _disabled = (this.props.answer) ? 'disabled' : '';
        
        this.props.options.forEach(function(option){
            _activeClassName = (option.id == this.props.answer) ? 'is-active' : '';
            _options.push(<button 
                                disabled={_disabled} 
                                className={_activeClassName}
                                onClick={this.handleAnswer}
                                data-answer={option.id}
                                key={option.id}
                           >{option.name}</button>
                           );        
        }.bind(this));
        
        return (
            <div>
               {_options}
            </div>
       )     
    }
});


var GameNav = React.createClass({
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
            <div>
                <p>{_navCopy}</p>
               <button onClick={this.props.onMusicPlay}>{_buttonTxt}</button>
            </div>
       )     
    }
});

var Progress = React.createClass({
    render: function(){
        var _dots = [],
            _activeClassName = '';
        
        for(var i = 1; i < this.props.gameLength + 1; i++){
            _activeClassName = (i == this.props.current) ? 'is-active' : '';
            _dots.push(<li className={_activeClassName} key={i}>{i}</li>);
        }
    
        return (
            <div>
               <ul className="pagination">
                   {_dots}
               </ul>
            </div>
       )     
    }
});

var Round = React.createClass({
    
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
        var _gameActions = <p>Loading...</p>,
            _currentRoundIndex = this.props.game.current-1;
        
        if(this.state.musicPlaying){
            _currentRoundIndex = this.props.game.current;
            _gameActions = <Options 
                            answer={this.state.answer}
                            options={this.props.game.options}
                            onAnswer={this.handleAnswer}
                        />
        }
        
        else if(this.state.musicLoaded){
            var _previous = _currentRoundIndex-1;

            var _previousAnswer = (this.props.game.history[_previous]) ? this.props.game.history[_previous].answer : undefined,
                _previousQuestion = (this.props.game.history[_previous]) ? this.props.game.history[_previous].id : undefined
                  
            _gameActions = <GameNav 
                            previousAnswer={_previousAnswer}
                            previousQuestion={_previousQuestion}
                            onMusicPlay={this.handleMusicPlaying}
                        />                  
        }
    
        return ( < div >
                    <div className="container">
                        <ul className="nav nav-tabs nav-justified">
                            <li><button>x</button></li>
                            <li><Points points={this.props.game.points}/></li>
                        </ul>    
                    </div>
                    
                    <div className="container">
                        <MusicPlayer 
                            url={this.props.game.url}
                            musicPlaying={this.state.musicPlaying}
                            musicLoaded={this.state.musicLoaded}
                            onMusicLoaded={this.handleMusicLoaded}
                        />
                    </div>
                    
                    <div className="container">
                        {_gameActions}
                    </div>
                    
                    <div className="container">
                        <Progress 
                            gameLength={this.props.game.gameLength}  
                            current={_currentRoundIndex}
                        />
                    </div>
            < /div>
        );
    }
});

var Game = React.createClass({
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
        var _view = <p>Loading...</p>;
        
        //if current == -1
        if(this.state.game.gameLength && this.state.game.gameLength < this.state.game.current){
            _view = <p>Game Over</p>;
        }

        else if(this.state.game){
            _view = <Round 
                        game={this.state.game}
                        onNextRound={this.handleNextRound}
                        onGameOver={this.handleGameOver}
                     />;
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
            <div>
                {_view}
            </div>
       )     
    }
});

var Playlists = React.createClass({
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
                return <li key={playlist.id}>
                        {playlist.name} | 
                        <button data-user={playlist.user} data-playlist={playlist.id} onClick={this.handlePlay} >Play</button> |
                        <button data-user={playlist.user} data-playlist={playlist.id} onClick={this.share}>Share</button>
                       </li>;
            }.bind(this));

        return ( < div >
                    <ul>
                        {listItems}
                    </ul>    
            < /div>
        );
    }
});

var Login = React.createClass({
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
});

var App = React.createClass({
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
        var _view = <p>Loading...</p>;
        
        if(this.state.user && this.state.id){
            _view = <Game 
                        id={this.state.id} 
                        user={this.state.user} 
                    />;            
        }
        else if(this.state.playlists){
            _view = <Playlists 
                        onPlay={this.handlePlay} 
                        playlists={this.state.playlists}
                    />;
        }
        else{
            _view = <Login onAuth={this.handleAuth}/>;    
        }
        
        return (
            <div>
                {_view}
            </div>
       )     
    }
});