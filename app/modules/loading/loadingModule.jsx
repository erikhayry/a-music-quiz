/**
 * @jsx React.DOM
 */

'use strict';

var Loading = React.createClass({
    render: function(){
    	log('Loading: ' + this.props.module)
        return (
            <div className="m-loading">
				<div className="m-loading-loader">
					<div className="m-loading-loader-bar"></div>
					<div className="m-loading-loader-bar"></div>
					<div className="m-loading-loader-bar"></div>
				</div>
            </div>
       )     
    }
});