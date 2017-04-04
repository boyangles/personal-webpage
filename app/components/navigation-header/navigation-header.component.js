/**
 * Created by Austin on 8/12/2016.
 */
'use strict';

angular.module('personalwebpage').component('navigationHeader',
    {
        templateUrl: 'app/components/navigation-header/navigation-header.template.html',
        controller: ['$scope', '$injector',
            function($scope, $injector) {
                const navigationService = $injector.get('navigationService');

                $scope.sections = navigationService.getAvailableSections();
                $scope.homepageSection = $scope.sections.filter((obj) => {
                    return obj.homepage;
                });
            }
        ]
    }
);