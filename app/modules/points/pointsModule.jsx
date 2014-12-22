/**
 * @jsx React.DOM
 */

'use strict';

var Points = React.createClass({
    getInitialState: function() {
        return {
            added: ''
        };
    },

	componentWillReceiveProps: function(nextProps){
		var _added = nextProps.points - this.props.points;

		if(_added > 0){
			this.setState({
				added: _added
			})
		}

	},

    render: function(){
        log('Points: render')
        return (
            <div className="m-points" data-added={this.state.added}>
                {this.props.points} pts
            </div>
       )     
    }
});