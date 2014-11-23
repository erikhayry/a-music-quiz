var MusicPlayer=React.createClass({displayName:"MusicPlayer",getInitialState:function(){return{isPlaying:!1,isLoaded:!1,time:30}},stopAction:function(a){log("Musicplayer: stopAction");var b=this;a.pause(),b.interval&&window.clearInterval(b.interval),b.props.onRoundOver(b.props.answer,b.time),b.setState({isPlaying:!1,isLoaded:!1})},startPlayer:function(a){log("Musicplayer: startPlayer");var b=this,c=this.refs.points.getDOMNode();c.innerHTML=b.time=parseInt(a.duration-a.currentTime)||"30",a.play(),a.volume=0,b.interval=window.setInterval(function(){c.innerHTML=b.time=parseInt(a.duration-a.currentTime)||"30"},1e3),this.setState({isPlaying:!0})},onLoaded:function(){this.setState({isLoaded:!0}),this.props.onReady()},loadRound:function(a){log("Musicplayer: loadRound");var b=this,c=function(){Settings.audioSupport||(Settings.audioSupport=2),b.state.isLoaded||b.onLoaded(this)};3!==Settings.audioSupport?a.buffered.length>0?(log("Musicplayer: audioElement buffered"),c()):(log("Musicplayer: wait for loadedmetadata"),a.addEventListener("loadedmetadata",function(){log("Musicplayer: loadedmetadata"),c(),this.removeEventListener("loadedmetadata",arguments.callee,!1)},!1)):(log("Musicplayer: Settings.audioSupport = 3"),b.onLoaded(this)),a.addEventListener("timeupdate",function(){Settings.mute||(a.currentTime<1?a.volume=parseInt(10*a.currentTime)/10:a.duration-a.currentTime<1&&(a.volume=parseInt(10*(a.duration-a.currentTime))/10))},!1),a.addEventListener("ended",function(){b.state.isPlaying&&b.stopAction(this),this.removeEventListener("ended",arguments.callee,!1)},!1)},playerAction:function(){var a=this,b="";a.refs.audio&&(b=a.refs.audio.getDOMNode(),a.props.answer&&a.state.isPlaying?a.stopAction(b):!a.props.answer&&!a.state.isPlaying&&a.state.isLoaded&&a.props.isLoaded&&a.props.hasStarted?a.startPlayer(b):a.props.isLoaded||a.loadRound(b))},componentDidUpdate:function(){var a=this;Settings.audioSupport?a.playerAction():Helpers.getAudioSupport().then(function(b){Settings.audioSupport=b,a.playerAction()})},render:function(){var a="";return this.props.current&&this.props.current.track&&(log("Musicplayer: render new track: "),log(this.props.current.track),a=React.DOM.audio({src:this.props.current.track.url,ref:"audio",type:"audio/mpeg"})),React.DOM.div({className:"m-music-player"},React.DOM.p({ref:"points"},this.time),a)}});