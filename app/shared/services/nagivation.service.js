/**
 * Created by Austin on 8/11/2016.
 */
angular.module('personalwebpage')
    .factory('navigationService', [() => {
        const sections = [
            {
                id: 'personalSectionState',
                name: 'Austin Liu',
                componentURL: 'app/components/detail-components/personal-section/personal-section.component.js',
                htmlURL: 'app/components/detail-components/personal-section/personal-section.template.html',
                homepage: true
            },
            {
                id: 'projectsSectionState',
                name: 'Portfolio',
                componentURL: 'app/components/detail-components/projects-section/projects-section.component.html',
                htmlURL: 'app/components/detail-components/projects-section/projects-section.template.html',
                homepage: false
            },
            {
                id: 'interestsSectionState',
                name: 'Interests',
                componentURL: 'app/components/detail-components/interests-section/interests-section.component.html',
                htmlURL: 'app/components/detail-components/interests-section/interests-section.template.html',
                homepage: false
            },
            {
                id: 'professionalSectionState',
                name: 'Professional Documents',
                componentURL: 'app/components/detail-components/professional-section/professional-section.component.html',
                htmlURL: 'app/components/detail-components/professional-section/professional-section.template.html',
                homepage: false
            },
            {
                id: 'contactSectionState',
                name: 'Contact Me',
                componentURL: 'app/components/detail-components/contact-section/contact-section.component.html',
                htmlURL: 'app/components/detail-components/contact-section/contact-section.template.html',
                homepage: false
            }
        ];

        const getAvailableSections = () => {
            return sections;
        };

        const service = {
            getAvailableSections
        };

        return service;
    }]);