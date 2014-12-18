/**
 * @jsx React.DOM
 */

'use strict';

var Progress = React.createClass({displayName: 'Progress',
    render: function(){
        var _dots = [],
            _className = 'm-progress-item ',
            _activeClassName = '';
        
        for(var i = 1; i < this.props.gameLength + 1; i++){
            _activeClassName = (i == this.props.current) ? 'is-active' : '';
            _dots.push(React.DOM.li( {className:_className + _activeClassName, key:i}, i));
        }
    
        return (
             React.DOM.ul( {className:"m-progress"}, 
                 _dots
             )
       )     
    }
});