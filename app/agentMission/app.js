'use strict';

angular
    .module('agentMission', [
        'ngRoute'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'agentMission/main.html',
                controller: 'mainCtrl' // no routes needed thus didn't use ui-router
            });
    }).constant('_',
    window._ // had to load underscore globally
);

