'use strict';

angular.module('agentMission')
  .controller('mainCtrl', function ($scope, missions, mainService, Consts) {

      // show agents sorted by stamp
      $scope.agents = mainService.addTimeStampByDate(Consts.MISSIONS_INPUT);

      $scope.isoCountry = mainService.findIsolatedCountry(Consts.MISSIONS_INPUT);

      var homeBase = missions; // the static homebase address

      mainService.getCoordinates(homeBase)
          .then(function(baseLocation){
              mainService.fetchInputsDistance(baseLocation, Consts.MISSIONS_INPUT)
                  .then(function (values) {
                      var distancesCompareHomebase = [].concat(values);
                      console.log(distancesCompareHomebase); // the array was not sort
                      var closestIndex = distancesCompareHomebase.indexOf(_.min(distancesCompareHomebase));
                      var farthestIndex = distancesCompareHomebase.indexOf(_.max(distancesCompareHomebase));
                      $scope.closestLocation = $scope.agents[closestIndex].stamp;
                      $scope.farthestLocation = $scope.agents[farthestIndex].stamp;
                      console.log('closestLocation: ' + $scope.closestLocation.address, 'farthestLocation: ' + $scope.farthestLocation.address);
                  }).catch(function (err) {
                  console.log(err);
              });
          }).catch(function (err) {
          console.log(err);
      });

      // autocomplete address addition....
      function matchAdress(input) {
          var reg = new RegExp(input.split('').join('\\w*').replace(/\W/, ""), 'i');
          return $scope.agents.filter(function(country) {
              if (country.address.match(reg)) {
                  return country.address;
              }
          });
      }

      $scope.changeInput = function(){
          var input = $scope.input;
          var autoCompleteResult = matchAdress(input);
          $scope.result = autoCompleteResult;
      };


      var agents = Consts.MISSIONS_INPUT.map(function(item) {
          return item.agent;
      });

      var total = agents.reduce(function(prev, curr) {

          return prev + curr;
      });

  });