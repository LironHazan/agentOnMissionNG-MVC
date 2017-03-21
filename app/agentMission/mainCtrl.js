'use strict';

angular.module('agentMission')
  .controller('mainCtrl', function ($scope, Consts, mainService, $timeout) {

      // show agents sorted by stamp
      $scope.agents = mainService.addTimeStampByDate(Consts.MISSIONS_INPUT);
      // work on a copy of the agents
      var missionsInputCopy = Object.assign([], Consts.MISSIONS_INPUT);
      // get the most "isolated" country
      $scope.isoCountry = mainService.findIsolatedCountry(missionsInputCopy);

      var homeBase = Consts.HOME_BASE; // the static homebase address

      var distancesCompareHomebase = [];

      // I'm not a fan of this hack (won't pass code review..), trying to workaround google's OVER_QUERY_LIMIT
      var _firstFiveInputs = missionsInputCopy.splice(0,5);
      var _lastFiveInputs = missionsInputCopy;

      function init() {
          mainService.fetchInputsDistance(homeBase, _firstFiveInputs)
              .then(function (values) {
                  distancesCompareHomebase = distancesCompareHomebase.concat(values);
              }).catch(function (err) {
              console.log(err);
          });

          // I really dont like it ...!
          // meanwhile the UI will show a loader..
          $timeout(function () {
              mainService.fetchInputsDistance(homeBase, _lastFiveInputs)
                  .then(function (values) {
                      distancesCompareHomebase = distancesCompareHomebase.concat(values);
                      console.log(distancesCompareHomebase); // the array was not sort
                      var closestIndex = distancesCompareHomebase.indexOf(_.min(distancesCompareHomebase));
                      var farthestIndex = distancesCompareHomebase.indexOf(_.max(distancesCompareHomebase));
                      $scope.closestLocation = $scope.agents[closestIndex].stamp;
                      $scope.farthestLocation = $scope.agents[farthestIndex].stamp;
                      console.log('closestLocation: ' + $scope.closestLocation.address, 'farthestLocation: ' + $scope.farthestLocation.address);
                  }).catch(function (err) {
                  console.log(err);
              });
          }, 10000);
      }
      init();

  });
