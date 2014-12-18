/**
 * @jsx React.DOM
 */

'use strict';

var Loading = React.createClass({displayName: 'Loading',
    render: function(){
    	log('Loading: ' + this.props.module)
        return (
            React.DOM.div( {className:"m-loading"}, 
				React.DOM.div( {className:"m-loading-loader"}, 
					React.DOM.div( {className:"m-loading-loader-bar"}),
					React.DOM.div( {className:"m-loading-loader-bar"}),
					React.DOM.div( {className:"m-loading-loader-bar"})
				)
            )
       )     
    }
});