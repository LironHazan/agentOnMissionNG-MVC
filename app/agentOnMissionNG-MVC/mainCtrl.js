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

    $scope.data = sinAndCos();
    /*Random Data Generator */
    function sinAndCos() {
          var sin = [],sin2 = [],
              cos = [];

          //Data is represented as an array of {x,y} pairs.
          for (var i = 0; i < 100; i++) {
              sin.push({x: i, y: Math.sin(i/10)});
              sin2.push({x: i, y: i % 10 == 5 ? null : Math.sin(i/10) *0.25 + 0.5});
              cos.push({x: i, y: .5 * Math.cos(i/10+ 2) + Math.random() / 10});
          }

          //Line chart data should be sent as an array of series objects.
          return [
              {
                  values: sin,      //values - represents the array of {x,y} data points
                  key: 'Sine Wave', //key  - the name of the series.
                  color: '#ff7f0e',  //color - optional: choose your own line color.
                  strokeWidth: 2,
                  classed: 'dashed'
              },
/*              {
                  values: cos,
                  key: 'Cosine Wave',
                  color: '#2ca02c'
              },*/
              {
                  values: sin2,
                  key: 'Another sine wave',
                  color: '#7777ff',
                  area: true      //area - set to true if you want this line to turn into a filled area chart.
              }
          ];
      }

  });
