/**
 * @jsx React.DOM
 */

'use strict';

var Error = React.createClass({displayName: 'Error',

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
            React.DOM.div( {className:"m-error"}, 
                React.DOM.div( {className:"m-error-inner"}, 
                    React.DOM.p(null, _text),

                    React.DOM.button( {className:"m-error-close-btn", onClick:this.handleError}, "Ok")
                )
            )
       )     
    }
});