/**
 * @jsx React.DOM
 */

'use strict';

var Points = React.createClass({
    render: function(){
        return (
            <div className="m-points">
                {this.props.points} pts
            </div>
       )     
    }
});