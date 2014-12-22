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

        var _playlistUrl = spotifyService.getUrl(this.state.input);

        if(_playlistUrl){
            this.props.onPlay(_playlistUrl.owner, _playlistUrl.id);
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
            React.DOM.div( {className:"m-playlist-input"}, 
                React.DOM.input( {ref:"input",  type:"text", placeholder:"Use a HTTP Link or Spotify URI"} ),
                React.DOM.button( {onClick:this.handlePlay, disabled:_disabled}, "Play")
            )
       )     
    }
});