/**
 * @jsx React.DOM
 */

'use strict';

var Progress = React.createClass({
    render: function(){
        var _dots = [],
            _activeClassName = '';
        
        for(var i = 1; i < this.props.gameLength + 1; i++){
            _activeClassName = (i == this.props.current) ? 'is-active' : '';
            _dots.push(<li className={_activeClassName} key={i}>{i}</li>);
        }
    
        return (
            <div>
               <ul className="pagination">
                   {_dots}
               </ul>
            </div>
       )     
    }
});