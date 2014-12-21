/**
 * @jsx React.DOM
 */

'use strict';

var PlaylistInput = React.createClass({
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
            <div className="m-playlist-inout">
                <input ref="input"  type="text" placeholder="Use HTTP Link or Spotify URI" />
                <button onClick={this.handlePlay} disabled={_disabled}>Play</button>
            </div>
       )     
    }
});