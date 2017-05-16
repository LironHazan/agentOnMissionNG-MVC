'use strict';
/*global rootReducer */
/*global ReduxThunk */

angular
    .module('agentMission', [
        'ngRoute',
        'ngRedux',
        'chart.js'
    ])
    .config(function ($routeProvider, $ngReduxProvider, ChartJsProvider) {
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

        Chart.defaults.global.colors = [
          {
                 backgroundColor: 'transparent',
                 pointBackgroundColor: 'green',
                 pointHoverBackgroundColor: 'rgba(151,187,205,1)',
                 borderColor: 'rgba(0,0,0,0',
                 pointBorderColor: '#fff',
                 pointHoverBorderColor: 'rgba(151,187,205,1)'
               },
                {
                           backgroundColor: 'transparent',
                           pointBackgroundColor: 'transparent',
                           pointHoverBackgroundColor: 'transparent',
                           borderColor: 'transparent',
                           pointBorderColor: 'transparent',
                           pointHoverBorderColor: 'transparent'
                         }]

    }).constant('_',
    window._ // had to load underscore globally
);

