/**
 * @jsx React.DOM
 */

"use strict";


describe("Round Option Test",function(){
    var _ReactTestUtils, _RoundOptionProps, _RoundOption,  _answer;

    beforeEach(function() {
        _ReactTestUtils = React.addons.ReactTestUtils;	
        _answer = undefined,            
        _RoundOptionProps = {
            'option': {
                'id': '123',
                'name': 'Radiohead'
            },
            'answer': false,
            'onUserAnswer': function(answer){
                _answer = answer;
            }
        };        
    });

    it("Should init a RoundOption", function () {
        _RoundOption = _ReactTestUtils.renderIntoDocument(RoundOption(_RoundOptionProps, ""));
        expect(_RoundOption).toBeDefined();
        expect(_RoundOption.getDOMNode().innerHTML).toEqual('Radiohead');
    });

    it("should call onUserAnswer if button is enabled", function () {
        _RoundOption = _ReactTestUtils.renderIntoDocument(RoundOption(_RoundOptionProps, ""));
        _ReactTestUtils.Simulate.click(_RoundOption.getDOMNode());
        expect(_answer).toEqual('123')
    });

    it("should not call onUserAnswer if button is disabled", function () {
        _RoundOptionProps.answer = true;
        _RoundOption = _ReactTestUtils.renderIntoDocument(RoundOption(_RoundOptionProps, "")); 
        _ReactTestUtils.Simulate.click(_RoundOption.getDOMNode());
        expect(_answer).toBeUndefined();
    });

});
