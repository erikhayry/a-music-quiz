/**
 * @jsx React.DOM
 */

'use strict';

var GameNav = React.createClass({
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
            _buttonEl = <button className='m-game-nav-button' disabled={_disabled} onClick={this.props.onMusicPlay}>{_buttonTxt}</button>; 
        }

        return (
            <div className='m-game-nav'>
                <p className='m-game-nav-result'>{_navCopy}</p>
                {_buttonEl}
            </div>
       )     
    }
});