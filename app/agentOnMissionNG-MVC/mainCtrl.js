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

      $scope.data = generateData();

      function generateData() {
          var letters = 'ABC'.split(''); //['A', 'B', 'C'];
          var years = ['2013', '2014', '2015'];

          var eventProps = {shape:'square', color: 'orange'};
          var valuationProps = {shape:'circle', color: 'green'};

          var valuationEvents = [
            {id: 1,
             date: '2013',
             event: {title: 'something', body: 'super!'},
             valuation: {price: 99, securityType: 4}
            },
            {id: 2,
             date: '2014',
             event: {title: 'something',body: 'super!'},
             valuation: {price: 120,securityType: 4}
            },
            {id: 1,
            date: '2015',
            event: { title: 'something',body: 'super!'},
            valuation: {price: 45, securityType: 4}
             },
            {id: 1,
              date: '2016',
              event: {title: 'something',body: 'super!'},
              valuation: {price: 67, securityType: 4}
             }
          ];

          var valuationGraphData = valuationEvents.map(function(event){
          var _event = {id: event.id, x: event.date, y: event.valuation.price, valuation: event.valuation, shape: valuationProps.shape};
          return _event;
          });

          var eventsGraphData = valuationEvents.map(function(event){
                var _event = {id: event.id, x: event.date, y: '0', event: event.event, shape: eventProps.shape  };
            return _event;
          });

          var data = [{ key: 'Events', values: [], color: 'orange'},
          { key: 'Price per share', values: [], color: 'green'}]; //{ key: 'Events', values: [], color: 'orange'};
            data[0].values = eventsGraphData;
            data[0].values.shift({id: 0, x: 0, y: '0', event: 0, shape: ''  });
            data[1].values = valuationGraphData;
          return data;
        }

});
