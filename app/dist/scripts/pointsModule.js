/**
 * @jsx React.DOM
 */

'use strict';

var Points = React.createClass({displayName: 'Points',
    render: function(){
        return (
            React.DOM.div( {className:"m-points"}, 
                this.props.points, " pts "
            )
       )     
    }
});