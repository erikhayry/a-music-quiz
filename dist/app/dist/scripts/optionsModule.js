"use strict";var Options=React.createClass({displayName:"Options",handleAnswer:function(a){this.props.onAnswer(a.target.dataset.answer)},render:function(){var a=[],b="m-options-btn ",c="",d=this.props.answer?"disabled":"";return this.props.options.forEach(function(e){c=e.id==this.props.answer?"is-active":"",a.push(React.DOM.button({disabled:d,className:b+c,onClick:this.handleAnswer,"data-answer":e.id,key:e.id},e.name))}.bind(this)),React.DOM.div({className:"m-options"},a)}});