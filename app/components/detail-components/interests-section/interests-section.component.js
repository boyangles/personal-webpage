/**
 * Created by Austin on 8/12/2016.
 */
'use strict';

angular.module('personalwebpage').component('interestsSection',
    {
        templateUrl: 'app/components/detail-components/interests-section/interests-section.template.html',
        controller: ['$scope',
            function($scope) {

                $scope.userInput = '';

                $scope.textEntered = function () {
                    if ($scope.userInput === '/space') {
                        $scope.q1 = true;
                        $scope.q2 = false;
                        $scope.q3 = false;
                    } else if ($scope.userInput === '/bigdata') {
                        $scope.q1 = false;
                        $scope.q2 = true;
                        $scope.q3 = false;
                    } else if ($scope.userInput === '/outdoors') {
                        $scope.q1 = false;
                        $scope.q2 = false;
                        $scope.q3 = true;
                    }

                    $scope.userInput = '';
                };
            }
        ]
    }
);