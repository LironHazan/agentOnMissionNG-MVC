'use strict';

angular.module('agentMission')
  .controller('mainCtrl', function ($scope, missions, mainService, Consts, $ngRedux, missionsAction) {

      // show agents sorted by stamp
      $scope.agents = mainService.addTimeStampByDate(missions);
      $scope.missionsTree = mainService.buildTree(missions);
      console.log($scope.missionsTree)

    var mapStateToScope = function(state) {
       return {
          isoCountry: state.missionsReducer.isoCountry
       };
    }

    var unsubscribe = $ngRedux.connect(mapStateToScope, {})($scope);

    $scope.$on('$destroy', function() {
        unsubscribe();
    });

    $ngRedux.dispatch(missionsAction.findIsolatedCountry(missions));

      var homeBase = Consts.HOME_BASE; // the static homebase address

      mainService.getCoordinates(homeBase)
          .then(function(baseLocation){
              mainService.fetchInputsDistance(baseLocation, missions)
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

  });
