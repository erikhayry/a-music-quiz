/**
 * @jsx React.DOM
 */

'use strict';

var Share = React.createClass({
	componentDidMount: function(){
		log('Share: componentDidMount')
        window.twttr=(function(d,s,id){var t,js,fjs=d.getElementsByTagName(s)[0];if(d.getElementById(id)){return}js=d.createElement(s);js.id=id;js.src='https://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);return window.twttr||(t={_e:[],ready:function(f){t._e.push(f)}})}(document,'script','twitter-wjs'));
	},

    render: function(){
    	log('Share: render')
    	var _text = this.props.share.text || 'Play a Music Quiz';

        return (
            <div className='m-share l-view'>
                <div className='m-share-inner'>
                    <h1>Share</h1>
                    
                    <div className="m-share-tweet">
                        <a  className='twitter-share-button'
                            data-url={this.props.share.url}
                            data-text={_text}
                            data-hashtags='aMusicQuiz'
                            data-size='large'
                            data-count='none'
                            href='https://twitter.com/share'>
                        Tweet
                        </a>
                    </div>
                    <p>or copy this url</p>
                    <p><a href={this.props.share.url} target='_blank' className="m-share-link">{this.props.share.url}</a></p>

                    <button className='m-share-close-btn' onClick={this.props.onResetShare}>Close</button>
                </div>
            </div>
       )     
    }
});