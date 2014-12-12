/**
 * @jsx React.DOM
 */

'use strict';

var GameNav = React.createClass({
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
            _buttonEl = <button onClick={this.props.onMusicPlay}>{_buttonTxt}</button>; 
        }

        else{
            setTimeout(function(){
                this.props.onGameOver();
            }.bind(this), 2000)            
        }
    
        return (
            <div className="container">
                <p>{_navCopy}</p>
                {_buttonEl}
            </div>
       )     
    }
});