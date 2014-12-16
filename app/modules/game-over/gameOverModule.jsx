/**
 * @jsx React.DOM
 */

'use strict';

var GameOverView = React.createClass({

    render: function() {
        log('GameOverView: render');

        var _list = {},
        	_view = '';
        	
		this.props.history.forEach(function(round, i) {
			_list['round-' + i] =  
					<li className='m-history-item'>
						{round.data.artist.name} - {round.data.track.name}
					</li>;		    		
		}.bind(this));

        _view = <ul className='m-history'> 
        			{_list}
        		</ul>   

        return (
		            <div>
		            <button onClick={this.props.onReplay}>Play again</button>
		            	{_view}
		            </div >
		    	)
}

});