/**
 * Created by Austin on 8/12/2016.
 */
'use strict';

angular.module('personalwebpage').component('contactSection',
    {
        templateUrl: 'app/components/detail-components/contact-section/contact-section.template.html',
        controller: ['$scope',
            function($scope) {
                $scope.fname = '';
                $scope.lname = '';
                $scope.email = '';
                $scope.phone = '';

                $scope.sendEmail = function() {
                    const inputFName = ($scope.fname === '') ? '____' : $scope.fname;
                    const inputLName = ($scope.lname === '') ? '____' : $scope.lname;
                    const inputEmail = ($scope.email === '') ? 'unknown' : $scope.email;
                    const inputPhone = ($scope.phone === '') ? '(###) ###-####' : $scope.phone;

                    window.open(`mailto:austin.by.liu@gmail.com?subject=${inputFName} ${inputLName}: ${inputPhone} || Website Feedback from email: ${inputEmail}`, '_self');

                    $scope.fname = '';
                    $scope.lname = '';
                    $scope.email = '';
                    $scope.phone = '';
                };
            }
        ]
    }
);