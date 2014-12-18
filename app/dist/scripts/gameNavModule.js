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
        var _buttonEl = '',
            _disabled = '',
            _buttonTxt = '',
            _navCopy = '';

        if(this.props.previousQuestion){
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

        if(!this.props.isMusicLoaded){
            _disabled = 'disabled';
        }
        
        if(!this.props.isGameOver){
            _buttonEl = React.DOM.button( {className:"m-game-nav-button", disabled:_disabled, onClick:this.props.onMusicPlay}, _buttonTxt); 
        }

        return (
            React.DOM.div( {className:"m-game-nav"}, 
                React.DOM.p(null, _navCopy),
                _buttonEl
            )
       )     
    }
});