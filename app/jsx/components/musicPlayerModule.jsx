/** @jsx React.DOM */

var MusicPlayerModule = React.createClass({
    getInitialState: function() {
        return {
            answered: false
        };
    },

    bindEvents: function(audioElement){        
        var _this = this,
            _interval,
            _currentPoints = 0,
            _pointsElement = _this.refs.points.getDOMNode(),
            _stopAction = function(){
                console.log('_stopAction')
                clearInterval(_interval);
                _this.props.onAudioStop(_currentPoints);
            };
        
/*        audioElement.addEventListener('loadedmetadata', function(){
            console.log('loadedmetadata')
            audioElement.play();
            audioElement.volume=0;
            this.removeEventListener('loadedmetadata', arguments.callee);
        }, false);    

        audioElement.addEventListener('pause', function(){
            console.log('pause')
            _stopAction();
            this.removeEventListener('pause', arguments.callee);
        }, false); 

        audioElement.addEventListener('ended', function(){
            _stopAction();
            this.removeEventListener('ended', arguments.callee);
        }, false);*/

        _this.interval = window.setInterval(function(){
            console.log('inertvalling')
            _pointsElement.innerHTML = _currentPoints = parseInt(audioElement.duration-audioElement.currentTime)
        }, 1000) 


    },
    
    shouldComponentUpdate: function(nextProps, nextState) {
        console.log(nextProps)
        return true;
    },

    componentDidUpdate: function() {
        console.log('MusicPlayerModule componentDidUpdate')
        var _this = this,
            audioElement = this.refs.audio.getDOMNode();
        
        if(this.props.answered){
            audioElement.pause();
            clearInterval(_this.interval);
            _this.props.onAudioStop(10);            
        }
        else{
            this.bindEvents(audioElement)
        }

    }, 

    render: function() {  
        return (
            <div>  
                <p ref="points"></p>
                <p>Artist: {this.props.current.name}</p>
                <p>Url: {this.props.current.url}</p>
                <audio src={this.props.current.url} ref="audio" type="audio/mpeg" preload="auto" />
            </div>
        );
    }
});