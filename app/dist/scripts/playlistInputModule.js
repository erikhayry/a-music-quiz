/**
 * @jsx React.DOM
 */

'use strict';

var PlaylistInput = React.createClass({displayName: 'PlaylistInput',
    getInitialState: function() {
        return {
            input: ''
        };
    },


    handlePlay: function(event){
        log('PlaylistInput: handlePlay')
        event.preventDefault();
        //http://open.spotify.com/user/eportin/playlist/5L5SPmBNR3VMGQVGLJfIDL
        //spotify:user:eportin:playlist:3vz4y2C9dYDFivKP79QorS

        if(this.state.input.indexOf('spotify:user') > -1){
            console.log('1')
            var _arr = this.state.input.split(':')

            if(_arr.length === 5){
                this.props.onPlay(_arr[2], _arr[4]);
            }
            else{
                this.props.onUnvalidPlaylistUrl({
                    text: "Not a valid playlist url"
                });
            }

        }

        else if(this.state.input.indexOf('http://open.spotify.com/user/') > -1){
            console.log('2')
            var _arr = this.state.input.split('/')
            
            if(_arr.length === 7){
                this.props.onPlay(_arr[4], _arr[6]);
            }
            else{
                this.props.onUnvalidPlaylistUrl({
                    text: "Not a valid playlist url"
                });
            }

        }
        else{
            this.props.onUnvalidPlaylistUrl({
                text: "Not a valid playlist url"
            });
        }        

    },

    componentDidMount: function(){
        var _this = this,
            _input = this.refs.input.getDOMNode(),
            
            _handleInput = function(el){
               if(el.value.length > 0){
                    _this.setState({
                        input: el.value
                    })
               }
               else{
                    _this.setState({
                        input: ''
                    })            
               }                
            };

        _input.addEventListener('keyup', function(){
            _handleInput(this);
        });

        _input.addEventListener('paste', function(){
            console.log('paste')
           _handleInput(this);
        });

    },    

    render: function(){
        log('PlaylistInput: render')
        var _disabled = 'disabled';

        if(this.state.input){
            _disabled = '';
        }

        return (
            React.DOM.div( {className:"m-playlist-inout"}, 
                React.DOM.input( {ref:"input",  type:"text", placeholder:"Use HTTP Link or Spotify URI"} ),
                React.DOM.button( {onClick:this.handlePlay, disabled:_disabled}, "Play")
            )
       )     
    }
});