/**
 * Created by liron on 17/05/17.
 */

//component which will get data for the dynamic graph
'use strict';

function nvd3ChartController ($scope) {

$scope.options = {
    chart: {
      type: 'scatterChart',
      height: 350,
//      tooltip: {
//            contentGenerator: function (key, x, y, e, graph) {
//              return key.value;
//            }
//          },
    //  useInteractiveGuideline: false,
      tooltipContent: function(key) {
        return 'yellow';
      },

      //yDomain: [0,100],
      pointRange: [150, 150], // size of points

      dispatch: {
      },

      xAxis: {
        axisLabel: 'Events',
        axisLabelDistance: 5,
        tickFormat: function(d) {
          return d3.format('.0d')(d); //d3.time.format('%Y-%m-%d')(new Date(d));
        }
      },

      yAxis: {
        axisLabel: 'Price per share',
        tickFormat: function(d) {
          return d3.format('.0d')(d);
        },
      },

      callback: function(chart){
       // $scope.showLabel();
      },
    }
  };


  $scope.clear= function(){
    d3.selectAll(".label").remove()
  }

//  $scope.showLabel= function(){
//  //  $scope.clear();
//    var index = -1;
//    var letters = 'ABCDEFG'.split(''); //['A', 'B', 'C'];
//    d3.selectAll(".nv-groups path")[0].forEach(function(d){
//          index ++;
//          var tf = d3.select(d).attr("transform")
//          var t = d3.transform(tf).translate;
//          t[0] = t[0] -5;//moving the translate x by 5 pixel.
//          //console.log(d3.select(d).data()[0])//data associated with teh point
//          d3.select(d.parentNode)
//            .append("text")
//            //.attr("class", "event-text")
//            .html(letters[index])
//            .attr("transform", "translate("+t[0]+","+t[1]+")")
//            .attr('dy', 5)
//           // .attr('dx', 5)
//            .style("font-size", "14px")
//            .style("color", "white");
//
//    });
//
//  }

}

angular.module('agentMission').component('nvdchart', {
    bindings: {
        data: '<' // one way binding
    },
    controllerAs: '$ctrl',

    template: `
    <div class="nvd-line-chart">
        <nvd3 options="options" data="$ctrl.data" class="with-3d-shadow with-transitions"></nvd3>
    </div>
 `,
    controller : nvd3ChartController,
});