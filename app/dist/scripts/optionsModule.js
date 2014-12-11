/**
 * @jsx React.DOM
 */

'use strict';

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