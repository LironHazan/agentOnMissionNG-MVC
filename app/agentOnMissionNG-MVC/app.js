'use strict';
/*global rootReducer */
/*global ReduxThunk */

angular
    .module('agentMission', [
        'ngRoute',
        'ngRedux',
        'nvd3'
    ])
    .config(function ($routeProvider, $ngReduxProvider) {
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
        //create ng-redux store with root reducer from ./Reducers
        $ngReduxProvider.createStoreWith(rootReducer, [ReduxThunk.default]);
    }).constant('_',
    window._ // had to load underscore globally
);

