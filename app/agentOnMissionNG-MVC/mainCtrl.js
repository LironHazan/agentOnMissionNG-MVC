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


  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

  $scope.colors = ['#FD1F5E','#1EF9A1','#7FFD1F','#68F000'];

  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        },
//        {
//          id: 'y-axis-2',
//          type: 'linear',
//          display: true,
//          position: 'right'
//        }
      ]
    }
  };


//var ctx = document.getElementById("myChart");
//var scatterChart = new Chart.Line(ctx, {
//    type: 'line',
//    data: {
//        datasets: [{
//            label: 'Scatter Dataset',
//            data: [{
//                x: -10,
//                y: 0
//            }, {
//                x: 0,
//                y: 10
//            }, {
//                x: 10,
//                y: 5
//            }],
//            backgroundColor: 'transparent'
//        }]
//    },
//    options: {
//        scales: {
//            xAxes: [{
//                type: 'linear',
//                position: 'bottom'
//            }]
//        }
//    }
//});
  });
