/**
 * Created by Austin on 8/11/2016.
 */
'use strict';

angular.module('personalwebpage').component('asteroidsGame',
    {
        templateUrl: 'app/components/asteroids-game/asteroids-game.template.html',
        controller: ['$scope', '$window', '$injector', '$rootScope', '$state',
            function($scope, $window, $injector, $rootScope, $state) {
                const asteroidsGameService = $injector.get('asteroidsGameService');
                const boundingElementWidth = document.getElementById('bodyID').clientWidth * (1/3);
                // const boundingElementHeight =640.5;
                const boundingElementHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
                    - document.getElementById('topHeaderID').clientHeight
                    - document.getElementById('bottomFooterID').clientHeight;

                var gameProperties = {
                    screenWidth: boundingElementWidth,
                    screenHeight: boundingElementHeight,

                    delayToStartLevel: 3
                };

                var states = {
                    game: "game"
                };

                var graphicAssets = {
                    ship: {URL: 'assets/img/asteroids-game/ship.png', name: 'ship'},
                    bullet: {URL: 'assets/img/asteroids-game/bullet.png', name: 'bullet'},

                    asteroidLarge: {URL: 'assets/img/asteroids-game/asteroidLarge.png', name: 'asteroidLarge'},
                    asteroidMedium: {URL: 'assets/img/asteroids-game/asteroidMedium.png', name: 'asteroidMedium'},
                    asteroidSmall: {URL: 'assets/img/asteroids-game/asteroidSmall.png', name: 'asteroidSmall'},

                    personalPortal: {URL: 'assets/img/asteroids-game/aboutme.png', name: 'personalPortal'},
                    projectsPortal: {URL: 'assets/img/asteroids-game/portfolio.png', name: 'projectsPortal'},
                    interestsPortal: {URL: 'assets/img/asteroids-game/interests.png', name: 'interestsPortal'},
                    professionalPortal: {URL: 'assets/img/asteroids-game/resume.png', name: 'professionalPortal'},
                    contactPortal: {URL: 'assets/img/asteroids-game/contactme.png', name: 'contactPortal'}
                };

                var soundAssets = {
                    fire: {URL: ['assets/sounds/asteroids-game/fire.m4a', 'assets/sounds/asteroids-game/fire.ogg'], name: 'fire'},
                    destroyed: {
                        URL: ['assets/sounds/asteroids-game/destroyed.m4a', 'assets/sounds/asteroids-game/destroyed.ogg'],
                        name: 'destroyed'
                    }
                };

                var shipProperties = {
                    startX: 30,
                    startY: gameProperties.screenHeight - 30,
                    acceleration: 300,
                    drag: 300,
                    maxVelocity: 300,
                    angularVelocity: 200,
                    timeToReset: 2,
                    blinkDelay: 0.2
                };

                var bulletProperties = {
                    speed: 400,
                    interval: 250,
                    lifeSpan: 2000,
                    maxCount: 30
                };

                var asteroidProperties = {
                    startingAsteroids: 4,
                    maxAsteroids: 20,
                    incrementAsteroids: 2,

                    asteroidLarge: {
                        minVelocity: 20,
                        maxVelocity: 100,
                        minAngularVelocity: 0,
                        maxAngularVelocity: 20,
                        score: 20,
                        nextSize: graphicAssets.asteroidMedium.name,
                        pieces: 2
                    },
                    asteroidMedium: {
                        minVelocity: 20,
                        maxVelocity: 120,
                        minAngularVelocity: 0,
                        maxAngularVelocity: 1,
                        score: 50,
                        nextSize: graphicAssets.asteroidSmall.name,
                        pieces: 2
                    },
                    asteroidSmall: {
                        minVelocity: 20,
                        maxVelocity: 150,
                        minAngularVelocity: 0,
                        maxAngularVelocity: 1,
                        score: 100
                    }
                };

                var portalProperties = {
                    interestsPortal: {
                        stateID: 'interestsSectionState',
                        moveData: {
                            altitude: 62.5,
                            orbit: 129,
                            orbitRate: 0.23,
                            stationTrajectory: null
                        }
                    },
                    projectsPortal: {
                        stateID: 'projectsSectionState',
                        moveData: {
                            altitude: 125,
                            orbit: 350,
                            orbitRate: 0.16,
                            stationTrajectory: null
                        }
                    },
                    personalPortal: {
                        stateID: 'personalSectionState',
                        moveData: {
                            altitude: 0,
                            orbit: 0,
                            orbitRate: 0,
                            stationTrajectory: null
                        }
                    },
                    professionalPortal: {
                        stateID: 'professionalSectionState',
                        moveData: {
                            altitude: 187.5,
                            orbit: 65,
                            orbitRate: 0.09,
                            stationTrajectory: null
                        }
                    },
                    contactPortal: {
                        stateID: 'contactSectionState',
                        moveData: {
                            altitude: 250,
                            orbit: 316,
                            orbitRate: 0.06,
                            stationTrajectory: null
                        }
                    }
                };

                var fontAssets = {
                    counterFontStyle: {font: '20px Arial', fill: '#000000', align: 'center'}
                };

                var gameState = function (game) {
                    this.shipSprite;
                    this.shipIsInvulnerable;

                    this.key_left;
                    this.key_right;
                    this.key_thrust;
                    this.key_backthrust;
                    this.key_fire;

                    this.bulletGroup;
                    this.bulletInterval = 0;

                    this.asteroidGroup;
                    this.asteroidsCount = asteroidProperties.startingAsteroids;

                    this.portalGroup;

                    this.score = 0;
                    this.tf_score;

                    this.sndDestroyed;
                    this.sndFire;
                };

                gameState.prototype = {

                    preload: function () {
                        game.load.image(graphicAssets.personalPortal.name, graphicAssets.personalPortal.URL);
                        game.load.image(graphicAssets.projectsPortal.name, graphicAssets.projectsPortal.URL);
                        game.load.image(graphicAssets.interestsPortal.name, graphicAssets.interestsPortal.URL);
                        game.load.image(graphicAssets.professionalPortal.name, graphicAssets.professionalPortal.URL);
                        game.load.image(graphicAssets.contactPortal.name, graphicAssets.contactPortal.URL);

                        game.load.image(graphicAssets.asteroidLarge.name, graphicAssets.asteroidLarge.URL);
                        game.load.image(graphicAssets.asteroidMedium.name, graphicAssets.asteroidMedium.URL);
                        game.load.image(graphicAssets.asteroidSmall.name, graphicAssets.asteroidSmall.URL);

                        game.load.image(graphicAssets.bullet.name, graphicAssets.bullet.URL);
                        game.load.image(graphicAssets.ship.name, graphicAssets.ship.URL);

                        game.load.audio(soundAssets.destroyed.name, soundAssets.destroyed.URL);
                        game.load.audio(soundAssets.fire.name, soundAssets.fire.URL);
                    },

                    create: function () {
                        this.initGraphics();
                        this.initSounds();
                        this.initPhysics();
                        this.initKeyboard();
                        this.resetAsteroids();
                        this.initPortals();
                    },

                    update: function () {
                        game.stage.backgroundColor = '#FFFFFF';
                        this.checkPlayerInput();

                        this.portalGroup.forEach((portal) => {
                            this.updateOrbiterOrbit(portal);
                            this.updateOrbiterAltitude(portal);
                            this.updateStationTrajectory(portal);
                        });

                        this.checkBoundaries(this.shipSprite);
                        this.bulletGroup.forEachExists(this.checkBoundaries, this);
                        this.asteroidGroup.forEachExists(this.checkBoundaries, this);
                        // this.portalGroup.forEachExists(this.checkBoundaries, this);

                        game.physics.arcade.overlap(this.bulletGroup, this.asteroidGroup, this.asteroidCollision, null, this);
                        game.physics.arcade.overlap(this.asteroidGroup, this.portalGroup, this.portalStandardCollision, null, this);
                        game.physics.arcade.overlap(this.bulletGroup, this.portalGroup, this.portalStandardCollision, null, this);

                        if (!this.shipIsInvulnerable) {
                            game.physics.arcade.overlap(this.shipSprite, this.asteroidGroup, this.asteroidCollision, null, this);
                            game.physics.arcade.overlap(this.shipSprite, this.portalGroup, this.portalShipCollision, null, this);
                        }
                    },

                    initGraphics: function () {
                        this.portalGroup = game.add.group();

                        this.shipSprite = game.add.sprite(shipProperties.startX, shipProperties.startY, graphicAssets.ship.name);
                        this.shipSprite.angle = -90;
                        this.shipSprite.anchor.set(0.5, 0.5);

                        this.bulletGroup = game.add.group();
                        this.asteroidGroup = game.add.group();

                        this.tf_score = game.add.text(gameProperties.screenWidth - 20, 10, "0", fontAssets.counterFontStyle);
                        this.tf_score.align = 'right';
                        this.tf_score.anchor.set(1, 0);
                    },

                    initSounds: function () {
                        this.sndDestroyed = game.add.audio(soundAssets.destroyed.name);
                        this.sndFire = game.add.audio(soundAssets.fire.name);
                    },

                    initPhysics: function () {
                        game.physics.startSystem(Phaser.Physics.ARCADE);

                        game.physics.enable(this.shipSprite, Phaser.Physics.ARCADE);

                        var minDimension = (this.shipSprite.body.width < this.shipSprite.body.height) ? this.shipSprite.body.width : this.shipSprite.body.height;
                        this.shipSprite.body.setSize(minDimension, minDimension);
                        this.shipSprite.body.drag.set(shipProperties.drag);
                        this.shipSprite.body.maxVelocity.set(shipProperties.maxVelocity);

                        this.bulletGroup.enableBody = true;
                        this.bulletGroup.physicsBodyType = Phaser.Physics.ARCADE;
                        this.bulletGroup.createMultiple(bulletProperties.maxCount, graphicAssets.bullet.name);
                        this.bulletGroup.setAll('anchor.x', 0.5);
                        this.bulletGroup.setAll('anchor.y', 0.5);
                        this.bulletGroup.setAll('lifespan', bulletProperties.lifeSpan);

                        this.asteroidGroup.enableBody = true;
                        this.asteroidGroup.physicsBodyType = Phaser.Physics.ARCADE;

                        this.portalGroup.enableBody = true;
                        this.portalGroup.physicsBodyType = Phaser.Physics.ARCADE;
                        this.portalGroup.setAll('anchor.x', 0.5);
                        this.portalGroup.setAll('anchor.y', 0.5);
                    },

                    initKeyboard: function () {
                        this.key_left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
                        this.key_right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
                        this.key_thrust = game.input.keyboard.addKey(Phaser.Keyboard.UP);
                        this.key_backthrust = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
                        this.key_fire = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                    },

                    checkPlayerInput: function () {
                        if (this.key_left.isDown) {
                            this.shipSprite.body.angularVelocity = -shipProperties.angularVelocity;
                        } else if (this.key_right.isDown) {
                            this.shipSprite.body.angularVelocity = shipProperties.angularVelocity;
                        } else {
                            this.shipSprite.body.angularVelocity = 0;
                        }

                        if (this.key_thrust.isDown) {
                            game.physics.arcade.accelerationFromRotation(this.shipSprite.rotation, shipProperties.acceleration, this.shipSprite.body.acceleration);
                        } else if (this.key_backthrust.isDown) {
                            this.shipSprite.body.velocity.set(0);
                        } else {
                            this.shipSprite.body.acceleration.set(0);
                        }

                        if (this.key_fire.isDown) {
                            this.fire();
                        }
                    },

                    checkBoundaries: function (sprite) {
                        if (sprite.x < 0) {
                            sprite.x = game.width;
                        } else if (sprite.x > game.width) {
                            sprite.x = 0;
                        }

                        if (sprite.y < 0) {
                            sprite.y = game.height;
                        } else if (sprite.y > game.height) {
                            sprite.y = 0;
                        }
                    },

                    fire: function () {
                        if (game.time.now > this.bulletInterval) {
                            this.sndFire.play();

                            var bullet = this.bulletGroup.getFirstExists(false);

                            if (bullet) {
                                var length = this.shipSprite.width * 0.5;
                                var x = this.shipSprite.x + (Math.cos(this.shipSprite.rotation) * length);
                                var y = this.shipSprite.y + (Math.sin(this.shipSprite.rotation) * length);

                                bullet.reset(x, y);
                                bullet.lifespan = bulletProperties.lifeSpan;
                                bullet.rotation = this.shipSprite.rotation;

                                game.physics.arcade.velocityFromRotation(this.shipSprite.rotation, bulletProperties.speed, bullet.body.velocity);
                                this.bulletInterval = game.time.now + bulletProperties.interval;
                            }
                        }
                    },

                    createAsteroid: function (x, y, size, pieces) {
                        if (pieces === undefined) {
                            pieces = 1;
                        }

                        for (var i = 0; i < pieces; i++) {
                            var asteroid = this.asteroidGroup.create(x, y, size);
                            asteroid.anchor.set(0.5, 0.5);
                            asteroid.body.angularVelocity = game.rnd.integerInRange(asteroidProperties[size].minAngularVelocity, asteroidProperties[size].maxAngularVelocity);

                            var randomAngle = game.math.degToRad(game.rnd.angle());
                            var randomVelocity = game.rnd.integerInRange(asteroidProperties[size].minVelocity, asteroidProperties[size].maxVelocity);

                            game.physics.arcade.velocityFromRotation(randomAngle, randomVelocity, asteroid.body.velocity);
                        }
                    },

                    resetAsteroids: function () {
                        for (var i = 0; i < this.asteroidsCount; i++) {
                            var side = Math.round(Math.random());
                            var x;
                            var y;

                            if (side) {
                                x = Math.round(Math.random()) * gameProperties.screenWidth;
                                y = Math.random() * gameProperties.screenHeight;
                            } else {
                                x = Math.random() * gameProperties.screenWidth;
                                y = Math.round(Math.random()) * gameProperties.screenWidth;
                            }

                            this.createAsteroid(x, y, graphicAssets.asteroidLarge.name);
                        }
                    },

                    initPortals: function () {
                        for (var property in portalProperties) {
                            if(portalProperties.hasOwnProperty(property)) {
                                var portal = this.portalGroup.create(0, 0, property);
                                portal.anchor.set(0.5, 0.5);
                                portal.moveData = {};

                                portal.moveData.altitude = portalProperties[property].moveData.altitude;
                                portal.moveData.orbit = portalProperties[property].moveData.orbit;
                                portal.moveData.orbitRate = portalProperties[property].moveData.orbitRate;

                                portalProperties[property].stationTrajectory = game.add.graphics(0,0);
                            }
                        }
                    },

                    asteroidCollision: function (target, asteroid) {
                        this.sndDestroyed.play();

                        target.kill();
                        asteroid.kill();

                        if (target.key == graphicAssets.ship.name) {
                            this.destroyShip();
                        }

                        this.splitAsteroid(asteroid);
                        this.updateScore(asteroidProperties[asteroid.key].score);

                        if (!this.asteroidGroup.countLiving()) {
                            game.time.events.add(Phaser.Timer.SECOND * gameProperties.delayToStartLevel, this.nextLevel, this);
                        }
                    },

                    portalStandardCollision: function(standardTarget, portal) {
                        var currentPoint = game.physics.arcade.velocityFromRotation(standardTarget.body.angle + game.math.degToRad(135 + Math.random() * 90), standardTarget.body.speed, standardTarget.body.velocity);
                        standardTarget.x = standardTarget.x + currentPoint.x * 0.1;
                        standardTarget.y = standardTarget.y + currentPoint.y * 0.1;
                    },

                    portalShipCollision: function(ship, portal) {
                        ship.x = 30;
                        ship.y = game.world.height - 30;
                        ship.angle = -90;

                        $state.go(portalProperties[portal.key].stateID);
                        this.asteroidGroup.alpha = 0;
                        this.bulletGroup.alpha = 0;
                        this.shipSprite.alpha = 0;

                        game.add.tween(this.asteroidGroup).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
                        game.add.tween(this.bulletGroup).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
                        game.add.tween(this.shipSprite).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
                    },

                    destroyShip: function () {
                        game.time.events.add(Phaser.Timer.SECOND * shipProperties.timeToReset/10, this.resetShip, this);
                    },

                    resetShip: function () {
                        this.shipIsInvulnerable = true;
                        this.shipSprite.reset(this.shipSprite.x, this.shipSprite.y);
                        // this.shipSprite.reset(shipProperties.startX, shipProperties.startY);
                        // this.shipSprite.angle = -90;

                        game.time.events.add(Phaser.Timer.SECOND * shipProperties.timeToReset, this.shipReady, this);
                        game.time.events.repeat(Phaser.Timer.SECOND * shipProperties.blinkDelay, shipProperties.timeToReset / shipProperties.blinkDelay, this.shipBlink, this);
                    },

                    shipReady: function () {
                        this.shipIsInvulnerable = false;
                        this.shipSprite.visible = true;
                    },

                    shipBlink: function () {
                        this.shipSprite.visible = !this.shipSprite.visible;
                    },

                    splitAsteroid: function (asteroid) {
                        if (asteroidProperties[asteroid.key].nextSize) {
                            this.createAsteroid(asteroid.x, asteroid.y, asteroidProperties[asteroid.key].nextSize, asteroidProperties[asteroid.key].pieces);
                        }
                    },

                    updateScore: function (score) {
                        this.score += score;
                        this.tf_score.text = this.score;
                    },

                    nextLevel: function () {
                        this.asteroidGroup.removeAll(true);

                        if (this.asteroidsCount < asteroidProperties.maxAsteroids) {
                            this.asteroidsCount += asteroidProperties.incrementAsteroids;
                        }

                        this.resetAsteroids();
                    },

                    updateOrbiterOrbit: (orbiter) => {
                        if (orbiter.moveData.orbitRate != 0) {
                            orbiter.moveData.orbit += orbiter.moveData.orbitRate;
                            if (orbiter.moveData.orbit >= 360) {
                                orbiter.moveData.orbit -= 360;
                            }
                        }

                        var orbitRad = Phaser.Math.degToRad(orbiter.moveData.orbit);
                        orbiter.x = game.world.width / 2 + orbiter.moveData.altitude * Math.cos(orbitRad);
                        orbiter.y = game.world.height / 2 + orbiter.moveData.altitude * Math.sin(orbitRad);

                        // orbiter.angle = orbiter.moveData.orbit - 90;
                    },

                    updateOrbiterAltitude: (orbiter) => {
                    },

                    updateStationTrajectory: (portal) => {
                        var traj = portalProperties[portal.key].stationTrajectory;
                        traj.clear();
                        traj.lineStyle(1, 0x55FFAA, 0.5);
                        traj.drawCircle(game.world.width / 2, game.world.height / 2, 2*portal.moveData.altitude);
                    }
                };

                var game = asteroidsGameService.asteroidsGame(gameProperties.screenWidth, gameProperties.screenHeight, states.game, gameState);

                $rootScope.resizeWindow = (inputWidth, inputHeight) => {
                    gameProperties.screenWidth = inputWidth;
                    gameProperties.screenHeight = inputHeight;
                    shipProperties.startX = 30;
                    shipProperties.startY = gameProperties.screenHeight - 30;
                    game = asteroidsGameService.asteroidsGame(inputWidth, inputHeight, states.game, gameState);
                };

                angular.element($window).bind('resize', () => {
                    const newElementWidth = document.getElementById('bodyID').clientWidth * (1/3);
                    const newElementHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
                        - document.getElementById('topHeaderID').clientHeight
                        - document.getElementById('bottomFooterID').clientHeight;
                    $rootScope.resizeWindow(newElementWidth, newElementHeight);
                });

                document.onkeydown = function(event) {
                    if (event.keyCode == 220){       asteroidsGameService.togglePause()   }
                };
            }
        ]
    }
);