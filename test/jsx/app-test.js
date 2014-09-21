/**
 * @jsx React.DOM
 */

"use strict";

var ReactTestUtils, container;

describe("App Test",function(){
    beforeEach(function() {
        ReactTestUtils = React.addons.ReactTestUtils;
	    
	    container = document.createElement('div');
	    container.id = 'app';
	    document.body.appendChild(container);    
    });


/*    it("Should init the app", function () {
        ReactTestUtils.renderIntoDocument(MusicApp(null, container));
        expect(MusicApp).toBeDefined();
    });*/
});
