'use strict';

angular.module('agentMission')
    .factory('missionsAction', function (_, $q, mainService) {

        function findIsolatedCountry (input){
            return dispatch => {
                   const mapCountryToAgent = {}; // {agent : [countryA, countryB]}
                   const mapIsoAgentToCountry = {}; // { country: [iso-agentA, iso-agentB]}
                    input.forEach( item => {
                        // map the agents to the countries they were at
                        if (!mapCountryToAgent[item.agent]) {
                            mapCountryToAgent[item.agent] = [];
                        }
                        mapCountryToAgent[item.agent].push(item.country);
                    });
                 //  keep only isolated agents - agents who has just one country
                    for (let agent in mapCountryToAgent) {
                        if(mapCountryToAgent[agent].length > 1){
                            delete mapCountryToAgent[agent]; // remove agents which aren't isolated
                        }
                        else {
                            const country = mapCountryToAgent[agent][0];
                            if (!mapIsoAgentToCountry[country]) { // start fill in the country : agents[] map
                                mapIsoAgentToCountry[country] = [];
                            }
                            mapIsoAgentToCountry[country].push(agent);
                        }
                    }
                 //  get the country who has the most isolated agents
                    var isoCountry = _.max(Object.keys(mapIsoAgentToCountry), prop => {
                        return mapIsoAgentToCountry[prop].length;
                    });

                  dispatch({
                     type: types.INIT_ISO_COUNTRY,
                        payload: {
                        isoCountry: isoCountry
                         }
                   });
                };
        }

        function buildTree (list) {
          return function (dispatch) {
            var tree = list.map(function(item){
                if(item.parent){
                 var parentObj = list.filter( _item => item.parent === _item.agent)[0];
                     parentObj.children = parentObj.children || [];
                     parentObj.children.push(item);
                   }
                  return item;
                }).filter(function(item){
                  return item.parent === null;
                });
                dispatch({
                 type: types.LOAD_TREE,
                 payload: { tree: tree }
                 });
            }
        };

        function getCoordinatesDistance (homeBase, missions) {
            return function (dispatch) {
                mainService.getCoordinates(homeBase)
                 .then(function(baseLocation){
                   mainService.fetchInputsDistance(baseLocation, missions)
                   .then(function (values) {
                    var distancesCompareHomebase = [].concat(values);
                    var closestIndex = distancesCompareHomebase.indexOf(_.min(distancesCompareHomebase));
                    var farthestIndex = distancesCompareHomebase.indexOf(_.max(distancesCompareHomebase));
                    var closestLocation = missions[closestIndex].stamp;
                    var farthestLocation = missions[farthestIndex].stamp;
                    dispatch({
                      type: types.GET_DISTANCE,
                      payload: { closestLocation: closestLocation, farthestLocation: farthestLocation }
                    });
                 }).catch(function (err) {
                    console.log(err);
                 });
              }).catch(function (err) {
                 console.log(err);
                    });
            }
        }

        return {
             findIsolatedCountry,
             buildTree,
             getCoordinatesDistance
           }
    });