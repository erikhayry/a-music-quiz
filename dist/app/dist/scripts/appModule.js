"use strict";var AppView=React.createClass({displayName:"AppView",getInitialState:function(){return{player:"",playListOwner:"",playlistId:"",error:""}},handleAuth:function(a){log("AppView: handleAuth"),this.setState({player:a})},handleUnAuth:function(){log("AppView: handleUnAuth"),this.setState({playListOwner:"",playlistId:"",player:""})},handleShare:function(a){log("AppView: handleShare"),this.setState({share:a})},handleResetShare:function(){log("AppView: handleResetShare"),this.setState({share:""})},handleError:function(a){log("AppView: handleError"+a),this.setState({error:a})},handleResetError:function(){log("AppView: handleResetError"),this.setState({error:""})},handlePlay:function(a,b){log("AppView: handlePlay"),this.setState({playListOwner:a,playlistId:b})},handleBackToPlaylists:function(){log("AppView: handleBackToPlaylists"),sessionStorage.removeItem("amq-game"),history.pushState({handleBackToPlaylists:this.state.player},"AppView","?user="+this.state.player),this.setState({playListOwner:"",playlistId:"",error:""})},handleChangeUser:function(){log("AppView: handleChangeUser"),sessionStorage.removeItem("amq-user"),history.pushState({handleChangeUser:""},"AppView",""),this.setState({playListOwner:"",playlistId:"",player:""})},render:function(){log("AppView: render");var a=Loading({module:"AppView"}),b="",c="";return Mode.set(),this.state.share&&(b=Share({share:this.state.share,onResetShare:this.handleResetShare})),this.state.error&&(c=Error({error:this.state.error,onResetError:this.handleResetError,onBackToPlaylists:this.handleBackToPlaylists})),this.state.playListOwner&&this.state.playlistId?(history.pushState({login:this.state.player},"GameView","?owner="+this.state.playListOwner+"&id="+this.state.playlistId),a=GameView({playlistId:this.state.playlistId,playlistOwner:this.state.playListOwner,onPlay:this.handlePlay,onShare:this.handleShare,onError:this.handleError,onBackToPlaylists:this.handleBackToPlaylists})):this.state.player?(history.pushState({login:this.state.player},"PlaylistsView","?user="+this.state.player),a=PlaylistsView({player:this.state.player,onPlay:this.handlePlay,onUnAuth:this.handleUnAuth,onShare:this.handleShare,onError:this.handleError,onChangeUser:this.handleChangeUser})):a=LoginView({onAuth:this.handleAuth,onPlay:this.handlePlay}),React.DOM.div({className:"l-app-inner"},b,c,a)}});