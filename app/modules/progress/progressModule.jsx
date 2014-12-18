/**
 * @jsx React.DOM
 */

'use strict';

var Progress = React.createClass({
    render: function(){
        var _dots = [],
            _className = 'm-progress-item ',
            _activeClassName = '';
        
        for(var i = 1; i < this.props.gameLength + 1; i++){
            _activeClassName = (i == this.props.current) ? 'is-active' : '';
            _dots.push(<li className={_className + _activeClassName} key={i}>{i}</li>);
        }
    
        return (
             <ul className="m-progress">
                 {_dots}
             </ul>
       )     
    }
});