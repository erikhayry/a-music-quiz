/**
 * @jsx React.DOM
 */

'use strict';

var Share = React.createClass({displayName: 'Share',
	componentDidMount: function(){
		log('Share: componentDidMount')
        window.twttr=(function(d,s,id){var t,js,fjs=d.getElementsByTagName(s)[0];if(d.getElementById(id)){return}js=d.createElement(s);js.id=id;js.src='https://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);return window.twttr||(t={_e:[],ready:function(f){t._e.push(f)}})}(document,'script','twitter-wjs'));
	},

    render: function(){
    	log('Share: render')
    	var _text = this.props.share.text || 'Play a Music Quiz';

        return (
            React.DOM.div( {className:"m-share l-view"}, 
                React.DOM.div( {className:"m-share-inner"}, 
                    React.DOM.h1(null, "Share"),
                    
                    React.DOM.div( {className:"m-share-tweet"}, 
                        React.DOM.a(  {className:"twitter-share-button",
                            'data-url':this.props.share.url,
                            'data-text':_text,
                            'data-hashtags':"aMusicQuiz",
                            'data-size':"large",
                            'data-count':"none",
                            href:"https://twitter.com/share"}, 
                        " Tweet "
                        )
                    ),
                    React.DOM.p(null, "or copy this url"),
                    React.DOM.p(null, React.DOM.a( {href:this.props.share.url, target:"_blank", className:"m-share-link"}, this.props.share.url)),

                    React.DOM.button( {className:"m-share-close-btn", onClick:this.props.onResetShare}, "Close")
                )
            )
       )     
    }
});