/**
 * @jsx React.DOM
 */

"use strict";


describe("Round Option Test",function(){
    var _ReactTestUtils, _RoundOptionsProps, _RoundOptions,  _answer;

    beforeEach(function() {
        _ReactTestUtils = React.addons.ReactTestUtils;	
        _answer = undefined,            
        _RoundOptionsProps = {
            options: [
                {name: 'a', id: '1'},
                {name: 'b', id: '2'},
                {name: 'c', id: '3'},
                {name: 'd', id: '4'}
            ],
            answered: false,
            onAnswer: function(answer){
                _answer = answer;
            }
        };        
    });

    it("Should init RoundOptions", function () {
        _RoundOptions = _ReactTestUtils.renderIntoDocument(RoundOptions(_RoundOptionsProps, ""));
        expect(_RoundOptions).toBeDefined();
        var _buttons = _RoundOptions.getDOMNode().querySelectorAll('button');
        expect(_buttons.length).toBe(4);
    });
});
