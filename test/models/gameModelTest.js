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
        expect(_game.playlistOwner).toEqual('erikportin');

        expect(_game.points).toEqual(0);
        expect(_game.gameLength).toEqual(10);
        expect(_game.round).toEqual([]);
        expect(_game.isGameOver).toEqual(false);
        expect(_game.history).toEqual([]);


        expect(_game._currentOptionsIndex).toEqual(-1);
        expect(_game._allTracks).toEqual({});
        expect(_game._isValidPlaylist).toEqual(true);
    });
});

/*
    Round
*/

describe("Game.next()", function() {
    var _game, _next, _sandbox, _clock,
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

        _game.next().then(function(game) {
            _game = game;
        })

        _clock.tick();

        expect(_game._currentOptionsIndex).toEqual(0);
        expect(_game._isValidPlaylist).toEqual(true);
        expect(_game.isGameOver).toEqual(false);

        expect(_game.round.current.track.url).toEqual('http://d318706lgtcm8e.cloudfront.net/mp3-preview/1');
        expect(_game.round.current.track.name).toEqual('Track Name 1');
        expect(_game.round.current.artist.name).toEqual('Artist Name 1');
        expect(_game.round.current.artist.id).toEqual('1');
        expect(_game.round.current.index).toEqual(1);

        expect(_game.round.options.length).toEqual(4);
        expect('1').toBeIdInObjectArray(_game.round.options);

        expect(_game.round.index).toEqual(1);
        expect(_game.gameLength).toEqual(5);
    });

    it("should use length of track list if shorter than gameLength setting", function() {
        _game = new Game('erikportin', '123', {
            gameLength: 10
        });
        _game.next().then(function(game) {
            _game = game;
        })

        _clock.tick();

        expect(_game.gameLength).toEqual(6);
    });

    it("should throw error if playlist isn/'t valid", function() {
        var _error;
        //stubs, spies and mocks
        _sandbox.restore();

        _sandbox.stub(spotifyService, "getTracks", function() {
            var _deferred = Q.defer();
            _deferred.resolve(Stub_spotifyService_unvalid_pl);
            return _deferred.promise;
        });

        _game = new Game('erikportin', '123', {
            gameLength: 10
        });
        _game.next().then(function(game) {
            _game = game;
        }, function(error) {
            _error = error;
        })

        _clock.tick();

        expect(_error).toBeDefined();
    });

    it("should use default to length of track if no gameLength setting", function() {
        _game = new Game('erikportin', '123');
        _game.next().then(function(game) {
            _game = game;
        })

        _clock.tick();

        expect(_game.gameLength).toEqual(6);
    });

    it("should return unique game option values", function() {
        _game.next().then(function(game) {
            _game = game;
        })
        _clock.tick();

        expect(_game.round.options[0].id).toBeDefined();
        expect(_game.round.options[0].name).toBeDefined();

        expect(_game.round.options[0]).toBeUnique(_game.round.options);
        expect(_game.round.options[1]).toBeUnique(_game.round.options);
        expect(_game.round.options[2]).toBeUnique(_game.round.options);
        expect(_game.round.options[3]).toBeUnique(_game.round.options);
    });

    it("should return following game options property values", function() {
        _game = new Game('erikportin', '123');

        _game.next().then(function(game) {

        })
        _game.next().then(function(game) {
            _game = game;
        })
        _clock.tick();

        expect(_game._currentOptionsIndex).toEqual(1);
        expect(_game.round.current.track.url).toEqual('http://d328706lgtcm8e.cloudfront.net/mp3-preview/2');
        expect(_game.round.current.track.name).toEqual('Track Name 2');
        expect(_game.round.current.artist.name).toEqual('Artist Name 2');
        expect(_game.round.current.artist.id).toEqual('2');
        expect(_game.round.current.index).toEqual(2);

        expect(_game.round.index).toEqual(2);
    });

    it("should return history and set game over boolean if game over", function() {
        _game = new Game('erikportin', '123');

        _game.next().then(function(game) {
            _game = game
        })
        _clock.tick();


        expect(_game).toBeDefined();

        _game.next().then(function(game) {
            _game = game
        })
        _clock.tick();


        expect(_game).toBeDefined();
        _game.next().then(function(game) {
            _game = game
        })
        _clock.tick();


        expect(_game).toBeDefined();
        _game.next().then(function(game) {
            _game = game
        })
        _clock.tick();


        expect(_game).toBeDefined();
        _game.next().then(function(game) {
            _game = game
        })
        _clock.tick();


        expect(_game).toBeDefined();
        _game.next().then(function(game) {
            _game = game
        })
        _clock.tick();


        expect(_game).toBeDefined();
        _game.next().then(function(game) {
            _game = game
        })
        _clock.tick();



        expect(_game.isGameOver).toBe(true);

    });
})



describe("Game.answer()", function() {
    var _game, _next, _sandbox, _clock, _game, _answer,
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

        _game.next().then(function(game) {
            _game = game;
        })
        _clock.tick();

        _game.answer('1', 20).then(function(answer) {
            _game = game;
        })
        _clock.tick();

        _game.next().then(function(game) {
            _game = game;
        })
        _clock.tick();

        _game.answer('2', 30).then(function(answer) {
            _game = game;
        })
        _clock.tick();


        _game.next().then(function(game) {
            _game = game;
        })
        _clock.tick();

        _game.answer('2', 30).then(function(answer) {
            _game = game;
        })
        _clock.tick();

        expect(_game.points).toEqual(50);

        expect(_game.history[0].rightAnswer).toEqual(true);
        expect(_game.history[0].points).toEqual(20);
        expect(_game.history[0].data.artist.id).toEqual('1');
        expect(_game.history[0].answer).toEqual('1');

        expect(_game.history[2].rightAnswer).toEqual(false);
        expect(_game.history[2].points).toEqual(0);
        expect(_game.history[2].data.artist.id).toEqual('3');
        expect(_game.history[2].answer).toEqual('2');

    });
});


/*
    Restart game
*/
describe("Game.reset()", function() {
        var _game, _next, _sandbox, _clock, _answer,
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

        _game.next().then(function(game) {
            _game = game;
        })
        _clock.tick();

        _game.answer('1', 20).then(function(answer) {
            _answer = answer;
        })

        _clock.tick();

        _game.reset();

        expect(_game).toBeDefined();

        expect(_game.playlistId).toEqual('123');
        expect(_game.playlistOwner).toEqual('erikportin');

        expect(_game.points).toEqual(0);
        expect(_game.gameLength).toEqual(6);
        expect(_game.round).toEqual([]);
        expect(_game.isGameOver).toEqual(false);
        expect(_game.history).toEqual([]);


        expect(_game._currentOptionsIndex).toEqual(-1);
        expect(_game._allTracks).toEqual({});
        expect(_game._isValidPlaylist).toEqual(true);
    });

});