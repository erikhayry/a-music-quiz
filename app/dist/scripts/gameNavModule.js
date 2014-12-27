/**
 * @jsx React.DOM
 */

'use strict';

var GameNav = React.createClass({displayName: 'GameNav',
    componentDidUpdate: function() {
        if(this.props.isGameOver){
            log('GameNav: game over');
            Delay.f(this.props.onGameOver);
        }
    },
    
    render: function(){
        log('GameNav: render');
        var _buttonEl = '',
            _disabled = '',
            _buttonTxt = '',
            _navCopy = '';

        if(this.props.previousRightAnswer === false || this.props.previousRightAnswer === true){

            if(this.props.previousRightAnswer){
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

        if(!this.props.isMusicLoaded){
            _disabled = 'disabled';
        }
        
        if(!this.props.isGameOver){
            _buttonEl = React.DOM.button( {className:"m-game-nav-button", disabled:_disabled, onClick:this.props.onMusicPlay}, _buttonTxt); 
        }

        return (
            React.DOM.div( {className:"m-game-nav"}, 
                React.DOM.p( {className:"m-game-nav-result"}, _navCopy),
                _buttonEl
            )
       )     
    }
});