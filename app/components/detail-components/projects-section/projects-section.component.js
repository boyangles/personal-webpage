/**
 * Created by Austin on 8/12/2016.
 */
'use strict';

angular.module('personalwebpage').component('projectsSection',
    {
        templateUrl: 'app/components/detail-components/projects-section/projects-section.template.html',
        controller: ['$scope', '$timeout', '$uibModal', '$log',
            function($scope, $timeout, $uibModal, $log) {
                $scope.a1 = false;
                $scope.a2 = false;
                $scope.a3 = true;
                $scope.a4 = false;

                var grcOptions = {
                    colorMode: 'greyscale',
                    compositeOperation: 'lighten',
                    iterationLimit: 0,
                    key: 'high',
                    lineWidth: 1,
                    lineMode: 'smooth',
                    origin: ['40% 33%','65% 33%'],
                    outputSize: 'container',
                    pathFinderCount: 40,
                    speed: 2,
                    turningAngle: Math.PI * 1.5
                };
                var grcImageElement = document.querySelector('.solution-grc-chromata');
                var grcChromata = new Chromata(grcImageElement, grcOptions);
                grcChromata.start();
                var gsImageElement = document.querySelector('.solution-gs-chromata');
                var gsChromata = new Chromata(gsImageElement, grcOptions);
                gsChromata.start();
                var bassImageElement = document.querySelector('.solution-bass-chromata');
                var bassChromata = new Chromata(bassImageElement, grcOptions);
                bassChromata.start();
                var gameImageElement = document.querySelector('.solution-game-chromata');
                var gameChromata = new Chromata(gameImageElement, grcOptions);
                gameChromata.start();

                $scope.showInputForm = function() {
                    $scope.p1a = true;
                };

                $scope.textEntered = function () {
                    if ($scope.userInput === 'ls') {
                        $scope.p1 = false;
                        $scope.p1a = false;
                        $scope.p2 = true;
                    }
                };
            }
        ]
    }
);