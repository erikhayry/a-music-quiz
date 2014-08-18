"use strict";
var Game = function(id){
	this.id = id;
	this.currentOptionsIndex = -1;
	this.options = spotifyService.getTracks();
	this.points = 0;
}

Game.prototype.getNextOptions = function(){
	var _optionsLength = this.options.length;
	
	if(this.currentOptionsIndex + 1 >= _optionsLength){
		this.currentOptionsIndex = -1;
		return undefined;
	}

	this.currentOptionsIndex++;	

	var _nextOptions = {
		trackUrl: this.options[this.currentOptionsIndex].trackUrl,
		trackName: this.options[this.currentOptionsIndex].trackName,
		options: [
			this.options[this.currentOptionsIndex].trackName
		]
	}

	while(_nextOptions.options.length < 4){
		var _randomIndex = Math.floor(Math.random() * _optionsLength);
		if(_nextOptions.options.indexOf(this.options[_randomIndex].trackName) === -1){
			_nextOptions.options.push(this.options[_randomIndex].trackName);
		}
	}

	return _nextOptions;
}