"use strict";
describe("Helper Service", function() {

	describe("shuffle()", function() {
        it("should shuffle an array", function() {
            var _shuffledArray = Helpers.shuffle([
            		'1', '2', '3', '4'
            	])

            expect(_shuffledArray.length).toBe(4);

        });
    });
});