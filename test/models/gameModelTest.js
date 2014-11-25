"use strict";

/*
    New game
*/

describe("Game Model", function() {
    var _game;

    it("Should be defined and have inital properties set", function() {
        _game = new Game('erikportin', '123', {
            gameLength: 10
        });

        expect(_game).toBeDefined();

        expect(_game.playlistId).toEqual('123');
        expect(_game.playerId).toEqual('erikportin');

        expect(_game._points).toEqual(0);
        expect(_game._gameLength).toEqual(10);
        expect(_game._currentOptionsIndex).toEqual(-1);
        expect(_game._currentRound).toEqual([]);
        expect(_game._allTracks).toEqual({});
        expect(_game._isValidPlaylist).toEqual(true);
    });
});

/*
    Round
*/

describe("Game.next()", function() {
    var _game, _next, _sandbox, _clock, _options,
        _spotifyServiceStub = Stub_spotifyService;

    beforeEach(function() {
        _sandbox = sinon.sandbox.create();
        _clock = sinon.useFakeTimers();

        //stubs, spies and mocks
        _sandbox.stub(spotifyService, "getTracks", function() {
            var _deferred = Q.defer();
            _deferred.resolve(_spotifyServiceStub);
            return _deferred.promise;
        });

        jasmine.addMatchers({

            toBeIdInObjectArray: function() {
                return {
                    compare: function(actual, expected) {
                        return {
                            pass: expected.some(function(obj) {
                                return obj.id === actual;
                            })
                        }
                    }
                };
            },

            toBeUnique: function() {
                return {
                    compare: function(actual, expected) {
                        var n = 0;
                        expected.forEach(function(string) {
                            if (string === actual) {
                                n++;
                            }
                        })

                        return {
                            pass: n === 1
                        };
                    }
                };
            }

        });

    });

    afterEach(function() {
        _sandbox.restore();
        _clock.restore();
    });

    /*
        First round
    */

    it("should return next game options property values", function() {
        _game = new Game('erikportin', '123', {
            gameLength: 5
        });
        _game.next().then(function(options) {
            _options = options;
        })

        _clock.tick();

        expect(_game._currentOptionsIndex).toEqual(0);
        expect(_options.current.track.url).toEqual('http://d318706lgtcm8e.cloudfront.net/mp3-preview/1');
        expect(_options.current.track.name).toEqual('Track Name 1');
        expect(_options.current.artist.name).toEqual('Artist Name 1');
        expect(_options.current.artist.id).toEqual('1');
        expect(_options.current.index).toEqual(1);

        expect(_options.options.length).toEqual(4);
        expect('1').toBeIdInObjectArray(_options.options);

        expect(_options.index).toEqual(1);
        expect(_options.gameLength).toEqual(5);
    });

    it("should use length of track list if shorter than gameLength setting", function() {
        _game = new Game('erikportin', '123', {
            gameLength: 10
        });
        _game.next().then(function(options) {
            _options = options;
        })

        _clock.tick();

        expect(_options.gameLength).toEqual(6);
    });

    it("should use default to length of track if no gameLength setting", function() {
        _game = new Game('erikportin', '123');
        _game.next().then(function(options) {
            _options = options;
        })

        _clock.tick();

        expect(_options.gameLength).toEqual(6);
    });

    it("should return unique game option values", function() {
        _game.next().then(function(options) {
            _options = options;
        })
        _clock.tick();

        expect(_options.options[0].id).toBeDefined();
        expect(_options.options[0].name).toBeDefined();

        expect(_options.options[0]).toBeUnique(_options.options);
        expect(_options.options[1]).toBeUnique(_options.options);
        expect(_options.options[2]).toBeUnique(_options.options);
        expect(_options.options[3]).toBeUnique(_options.options);
    });

    it("should return following game options property values", function() {
        _game = new Game('erikportin', '123');

        _game.next().then(function(options) {

        })
        _game.next().then(function(options) {
            _options = options;
        })
        _clock.tick();

        expect(_game._currentOptionsIndex).toEqual(1);
        expect(_options.current.track.url).toEqual('http://d328706lgtcm8e.cloudfront.net/mp3-preview/2');
        expect(_options.current.track.name).toEqual('Track Name 2');
        expect(_options.current.artist.name).toEqual('Artist Name 2');
        expect(_options.current.artist.id).toEqual('2');
        expect(_options.current.index).toEqual(2);

        expect(_options.index).toEqual(2);
    });

    it("should return undefined if no more options", function() {
        _game = new Game('erikportin', '123');
        _game.next().then(function(options) {
            _options = options
        })
        _clock.tick();
        expect(_options).toBeDefined();

        _game.next().then(function(options) {
            _options = options
        })
        _clock.tick();
        expect(_options).toBeDefined();
        _game.next().then(function(options) {
            _options = options
        })
        _clock.tick();
        expect(_options).toBeDefined();
        _game.next().then(function(options) {
            _options = options
        })
        _clock.tick();
        expect(_options).toBeDefined();
        _game.next().then(function(options) {
            _options = options
        })
        _clock.tick();
        expect(_options).toBeDefined();
        _game.next().then(function(options) {
            _options = options
        })
        _clock.tick();
        expect(_options).toBeDefined();
        _game.next().then(function(options) {
            _options = options
        })
        _clock.tick();
        expect(_options).toBeUndefined();

    });

    it("should return undefined if exceeded gameLength", function() {
        _game = new Game('erikportin', '123', {
            gameLength: 3
        });

        //1
        _game.next().then(function(options) {
            _options = options
        })
        _clock.tick();
        expect(_options).toBeDefined();

        //2
        _game.next().then(function(options) {
            _options = options
        })
        _clock.tick();
        expect(_options).toBeDefined();

        //3
        _game.next().then(function(options) {
            _options = options
        })
        _clock.tick();
        expect(_options).toBeDefined();

        //4
        _game.next().then(function(options) {
            _options = options
        })
        _clock.tick();
        expect(_options).toBeUndefined();
    });
})



describe("Game.answer()", function() {
    var _game, _next, _sandbox, _clock, _options, _answer,
        _spotifyServiceStub = Stub_spotifyService;

    beforeEach(function() {
        _sandbox = sinon.sandbox.create();
        _clock = sinon.useFakeTimers();

        //stubs, spies and mocks
        _sandbox.stub(spotifyService, "getTracks", function() {
            var _deferred = Q.defer();
            _deferred.resolve(_spotifyServiceStub);
            return _deferred.promise;
        });

    });

    afterEach(function() {
        _sandbox.restore();
        _clock.restore();
    });

    /*
        Answer
    */

    it("should add points if answer is correct and retrun answer object", function() {
        _game = new Game('erikportin', '123');

        _game.next().then(function(options) {
            _options = options;
        })
        _clock.tick();

        _game.answer('1', 20).then(function(answer) {
            _answer = answer;
        })
        _clock.tick();

        _game.next().then(function(options) {
            _options = options;
        })
        _clock.tick();

        _game.answer('2', 30).then(function(answer) {
            _answer = answer;
        })
        _clock.tick();


        var _history = _game.getHistory();

        console.log(_history)

        expect(_answer.isAnswerCorrect).toEqual(true);
        expect(_answer.points).toEqual(50);
        expect(_answer.rightAnswer).toEqual('2');

    });

    it("should not add points if answer is wrong but retrun answer object", function() {
        _game = new Game('erikportin', '123');
        _game.next().then(function(options) {
            _options = options;
        })
        _clock.tick();

        _game.answer('2', 20).then(function(answer) {
            _answer = answer;
        })

        _clock.tick();

        expect(_answer.isAnswerCorrect).toEqual(false);
        expect(_answer.points).toEqual(0);
        expect(_answer.rightAnswer).toEqual('1');
    });


});


describe('Game getHistory()', function() {
    var _game, _next, _sandbox, _clock, _options, _answer, _history,
        _spotifyServiceStub = Stub_spotifyService;

    beforeEach(function() {
        _sandbox = sinon.sandbox.create();
        _clock = sinon.useFakeTimers();
        //stubs, spies and mocks
        _sandbox.stub(spotifyService, "getTracks", function() {
            var _deferred = Q.defer();
            _deferred.resolve(_spotifyServiceStub);
            return _deferred.promise;
        });

    });

    afterEach(function() {
        _sandbox.restore();
        _clock.restore();
    });

    it('should add track to history', function() {
        _game = new Game('erikportin', '123');

        _game.next().then(function(options) {
            _options = options;
        })
        _clock.tick();

        _game.answer('Wrong answer', 20).then(function(answer) {
            _answer = answer;
        })
        _clock.tick();

        _game.next().then(function(options) {
            _options = options;
        })
        _clock.tick();

        _game.answer('2', 30).then(function(answer) {
            _answer = answer;
        })
        _clock.tick();

        _history = _game.getHistory();

        expect(_history.length).toEqual(2);
        
        expect(_history[0].rightAnswer).toEqual(false);
        expect(_history[0].points).toEqual(0);
        
        expect(_history[0].data.track.url).toEqual('http://d318706lgtcm8e.cloudfront.net/mp3-preview/1');
        expect(_history[0].data.track.name).toEqual('Track Name 1');
        expect(_history[0].data.artist.name).toEqual('Artist Name 1');
        expect(_history[0].data.artist.id).toEqual('1');

        expect(_history[1].rightAnswer).toEqual(true);
        expect(_history[1].points).toEqual(30);

        expect(_history[1].data.track.url).toEqual('http://d328706lgtcm8e.cloudfront.net/mp3-preview/2');
        expect(_history[1].data.track.name).toEqual('Track Name 2');
        expect(_history[1].data.artist.name).toEqual('Artist Name 2');
        expect(_history[1].data.artist.id).toEqual('2');        

    });

});

/*
    Restart game
*/
describe("Game.reset()", function() {
    var _game, _next, _sandbox, _clock, _options, _answer,
        _spotifyServiceStub = Stub_spotifyService;

    beforeEach(function() {
        _sandbox = sinon.sandbox.create();
        _clock = sinon.useFakeTimers();

        //stubs, spies and mocks
        _sandbox.stub(spotifyService, "getTracks", function() {
            var _deferred = Q.defer();
            _deferred.resolve(_spotifyServiceStub);
            return _deferred.promise;
        });

    });

    afterEach(function() {
        _sandbox.restore();
        _clock.restore();
    });

    it("Should reset the game", function() {
        _game = new Game('erikportin', '123');

        _game.next().then(function(options) {
            _options = options;
        })
        _clock.tick();

        _game.answer('1', 20).then(function(answer) {
            _answer = answer;
        })

        _clock.tick();

        _game.reset();

        expect(_game).toBeDefined();

        expect(_game.playlistId).toEqual('123');
        expect(_game.playerId).toEqual('erikportin');

        expect(_game._points).toEqual(0);
        expect(_game._gameLength).toBeUndefined();
        expect(_game._currentOptionsIndex).toEqual(-1);
        expect(_game._currentRound).toEqual([]);
        expect(_game._allTracks).toEqual({});
    });

});