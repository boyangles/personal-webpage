/**
 * Created by Austin on 8/12/2016.
 */
'use strict';

const app = angular.module('personalwebpage').component('detailRouter',
    {
        templateUrl: 'app/components/detail-components/detail-router.template.html',
        controller: [
            function() {
            }
        ]
    }
);

app.config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/me');
    
    $stateProvider
        .state('personalSectionState', {
            url: '/me',
            template: '<personal-section></personal-section>'
        })
        .state('projectsSectionState', {
            url: '/projects',
            template: '<projects-section></projects-section>'
        })
        .state('interestsSectionState', {
            url: '/interests',
            template: '<interests-section></interests-section>'
        })
        .state('professionalSectionState', {
            url: '/resume',
            template: '<professional-section></professional-section>'
        })
        .state('contactSectionState', {
            url: '/contact',
            template: '<contact-section></contact-section>'
        });
});