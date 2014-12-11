/**
 * @jsx React.DOM
 */

'use strict';

var GameNav = React.createClass({
    render: function(){
        var _buttonTxt = '',
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
    
        return (
            <div>
                <p>{_navCopy}</p>
               <button onClick={this.props.onMusicPlay}>{_buttonTxt}</button>
            </div>
       )     
    }
});