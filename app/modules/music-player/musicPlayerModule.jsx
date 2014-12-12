/**
 * @jsx React.DOM
 */

'use strict';

var MusicPlayer = React.createClass({
    getInitialState: function() {
        return {
            musicPlayer: ''
        };
    },

    stop: function() {
        log('Musicplayer: stopping')
        this.state.musicPlayer.stop().then(function(time) {
            log('Musicplayer: stopped ' + time)
            this.props.onStop(time);
        }.bind(this))
    },

    load: function() {
        log('Musicplayer: loading')
        this.state.musicPlayer.load().then(function() {
            log('Musicplayer: loaded')
            this.props.onMusicLoaded();
        }.bind(this))
    },

    play: function() {
        log('Musicplayer: play')
        var _pointsEl = this.refs.points.getDOMNode();
        this.state.musicPlayer.play().then(function() {
            log('Musicplayer: paused')
        }, function() {
            console.error('Musicplayer: play()');
        }, function(time) {
            _pointsEl.innerHTML = time;
        });
    },

    componentDidMount: function() {
        log('Musicplayer: componentDidMount')

        if (!this.state.musicPlayer && !this.props.musicLoaded && !this.props.musicPlaying) {
            this.setState({
                musicPlayer: new MusicPlayerService(this.refs.audio.getDOMNode())
            })
        }
    },

    componentDidUpdate: function() {
        log('Musicplayer: componentDidUpdate')

        //start new round
        if (!this.state.musicPlayer && !this.props.musicLoaded && !this.props.musicPlaying) {
            this.setState({
                musicPlayer: new MusicPlayerService(this.refs.audio.getDOMNode())
            })
        }

        //stop current round
        else if (this.state.musicPlayer && !this.props.musicLoaded && this.props.musicPlaying) {
            this.stop();
        }

        //load current round
        else if (this.state.musicPlayer && !this.props.musicLoaded && !this.props.musicPlaying) {
            this.load();
        }

        //play current round
        else if (this.state.musicPlayer && this.props.musicLoaded && this.props.musicPlaying) {
            this.play();
        }
    },

    componentWillReceiveProps: function(nextProps) {
        log('Musicplayer: componentWillReceiveProps')

        //only reset musicplayer if there is a new url
        if ((this.props && nextProps) && (this.props.url !== nextProps.url)) {
            log('Musicplayer: reset musicPlayer')
            this.setState({
                musicPlayer: ''
            });
        }
    },

    render: function() {
        log('Musicplayer: render')
        var _audioEl = '';

        if (!this.state.musicPlayer && !this.props.musicLoaded && !this.props.musicPlaying) {
            log('Musicplayer: render new player: ' + this.props.url)

            var _audioEl = <audio 
                                src = {this.props.url}
                                ref = "audio"
                                type = "audio/mpeg"
                                preload = "auto" 
                            />
        }

        return ( 
                <div className="container">
                    <p ref="points"></p>
                    {_audioEl}
                </div>
                )
    }
});