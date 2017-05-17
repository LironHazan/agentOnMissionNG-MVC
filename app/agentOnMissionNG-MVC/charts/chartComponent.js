/**
 * Created by liron on 17/05/17.
 */

//component which will get data for the dynamic graph
'use strict';

function nvd3ChartController ($scope) {

    $scope.options = {
        chart: {
            type: 'scatterChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 40,
                left: 55
            },
            x: function(d){ return d.x; },
            //y: function(d){ return d.y; },
            useInteractiveGuideline: true,
            dispatch: {
                stateChange: function(e){ console.log("stateChange"); },
                changeState: function(e){ console.log("changeState"); },
                tooltipShow: function(e){ console.log("tooltipShow"); },
                tooltipHide: function(e){ console.log("tooltipHide"); }
            },
            xAxis: {
                axisLabel: 'Time (ms)'
            },
            yAxis: {
                axisLabel: 'Voltage (v)',
                tickFormat: function(d){
                    return d3.format('.02f')(d);
                },
                axisLabelDistance: -10
            },
            callback: function(chart){
                console.log("!!! lineChart callback !!!");
            }
        },
        title: {
            enable: true,
            text: 'Title for Line Chart'
        },
        subtitle: {
            enable: true,
            text: 'Subtitle for simple line chart..',
            css: {
                'text-align': 'center',
                'margin': '10px 13px 0px 7px'
            }
        },
/*        caption: {
            enable: true,
            html: '<b>Figure 1.</b> Lorem ipsum dolor sit amet, at eam blandit sadipscing, <span style="text-decoration: underline;">vim adhuc sanctus disputando ex</span>, cu usu affert alienum urbanitas. <i>Cum in purto erat, mea ne nominavi persecuti reformidans.</i> Docendi blandit abhorreant ea has, minim tantas alterum pro eu. <span style="color: darkred;">Exerci graeci ad vix, elit tacimates ea duo</span>. Id mel eruditi fuisset. Stet vidit patrioque in pro, eum ex veri verterem abhorreant, id unum oportere intellegam nec<sup>[1, <a href="https://github.com/krispo/angular-nvd3" target="_blank">2</a>, 3]</sup>.',
            css: {
                'text-align': 'justify',
                'margin': '10px 13px 0px 7px'
            }
        }*/
    };

    /*      $scope.options = {
     chart: {
     type: 'scatterChart',
     height: 450,
     color: d3.scale.category10().range(),
     scatter: {
     onlyCircles: false
     },
     showDistX: true,
     showDistY: true,
     //tooltipContent: function(d) {
     //    return d.series && '<h3>' + d.series[0].key + '</h3>';
     //},
     duration: 350,
     xAxis: {
     axisLabel: 'X Axis',
     tickFormat: function(d){
     return d3.format('.02f')(d);
     }
     },
     yAxis: {
     axisLabel: 'Y Axis',
     tickFormat: function(d){
     return d3.format('.02f')(d);
     },
     axisLabelDistance: -5
     },
     zoom: {
     //NOTE: All attributes below are optional
     enabled: true,
     scaleExtent: [1, 10],
     useFixedDomain: false,
     useNiceScale: false,
     horizontalOff: false,
     verticalOff: false,
     unzoomEventType: 'dblclick.zoom'
     }
     }
     };*/

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