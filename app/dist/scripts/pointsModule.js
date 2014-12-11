/**
 * @jsx React.DOM
 */

'use strict';

var Points = React.createClass({displayName: 'Points',
    render: function(){
        return (
            React.DOM.div(null, 
                " Points: ", this.props.points
            )
       )     
    }
});