/**
 * @jsx React.DOM
 */

'use strict';

var Points = React.createClass({
    render: function(){
        return (
            <div>
                Points: {this.props.points}
            </div>
       )     
    }
});