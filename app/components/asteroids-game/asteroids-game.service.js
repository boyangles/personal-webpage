/**
 * Created by Austin on 8/11/2016.
 */
angular.module('personalwebpage')
    .factory('asteroidsGameService', [($rootScope) => {
        let _myGame;

        const asteroidsGame = (inputWidth, inputHeight, gameStateName, gameState) => {
            const isGetter = inputWidth === undefined || inputHeight === undefined || gameStateName === undefined || gameState === undefined;

            if (isGetter) {
                return _myGame;
            } else {
                if (_myGame != null) {
                    _myGame.destroy();
                }

                _myGame = new Phaser.Game(inputWidth, inputHeight, Phaser.AUTO, 'gameCanvas');
                _myGame.state.add(gameStateName, gameState);
                _myGame.state.start(gameStateName);
                return _myGame;
            }
        };

        const togglePause = () => {
            _myGame.paused = !(_myGame.paused);
        };

        const service = {
            asteroidsGame,
            togglePause
        };

        return service;
    }]);