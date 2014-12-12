/**
 * @jsx React.DOM
 */

'use strict';

var GameNav = React.createClass({displayName: 'GameNav',
    render: function(){
        var _buttonEl = '',
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

        
        if(!this.props.isGameOver){
            _buttonEl = React.DOM.button( {onClick:this.props.onMusicPlay}, _buttonTxt); 
        }

        else{
            setTimeout(function(){
                this.props.onGameOver();
            }.bind(this), 2000)            
        }
    
        return (
            React.DOM.div(null, 
                React.DOM.p(null, _navCopy),
                _buttonEl
            )
       )     
    }
});