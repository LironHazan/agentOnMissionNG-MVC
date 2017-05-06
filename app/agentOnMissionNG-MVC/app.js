'use strict';

angular
    .module('agentMission', [
        'ngRoute'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'agentOnMissionNG-MVC/main.html',
                controller: 'mainCtrl',
                resolve: {
                    missions: function (missionsProvider) {
                        return missionsProvider.get();
                    }
                }
            });
    }).constant('_',
    window._ // had to load underscore globally
);

