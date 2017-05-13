'use strict';

angular.module('agentMission')
  .controller('mainCtrl', function ($scope, missions, mainService, Consts, $ngRedux, missionsAction) {
      // show agents sorted by stamp
    $scope.agents = mainService.addTimeStampByDate(missions);
    var homeBase = Consts.HOME_BASE; // the static homebase address

    var mapStateToScope = function(state) {
       return {
          isoCountry: state.missionsReducer.isoCountry,
          tree: state.missionsReducer.tree,
          closestLocation: state.missionsReducer.closestLocation,
          farthestLocation: state.missionsReducer.farthestLocation
       };
    }

    function init(){
        $ngRedux.dispatch(missionsAction.findIsolatedCountry(missions));
        $ngRedux.dispatch(missionsAction.buildTree(missions));
        $ngRedux.dispatch(missionsAction.getCoordinatesDistance(homeBase, $scope.agents));
    }
    init();

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

    var unsubscribe = $ngRedux.connect(mapStateToScope, {})($scope);

    $scope.$on('$destroy', function() {
        unsubscribe();
    });

  });
