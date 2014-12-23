/**
 * @jsx React.DOM
 */

'use strict';

var Error = React.createClass({

    handleError: function(){
        log('Error: handleError')
        
        if(this.props.error.reset){
            this.props.onBackToPlaylists()
        }
        else{
            this.props.onResetError();
        }
    },

    render: function(){
        log('Error: render')
        var _text = this.props.error.text || 'Error';

        return (
            <div className='m-error'>
                <div className='m-error-inner'>
                    <p>{_text}</p>

                    <button className='m-error-close-btn' onClick={this.handleError}>Ok</button>
                </div>
            </div>
       )     
    }
});