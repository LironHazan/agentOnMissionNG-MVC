'use strict';

angular.module('agentMission')
    .factory('missionsAction', function (_, $q) {

        function findIsolatedCountry (input){
        return function (dispatch) {
                   var mapCountryToAgent = {}; // {agent : [countryA, countryB]}
                   var mapIsoAgentToCountry = {}; // { country: [iso-agentA, iso-agentB]}

                    input.forEach(function (item) {
                        // map the agents to the countries they were at
                        if (!mapCountryToAgent[item.agent]) {
                            mapCountryToAgent[item.agent] = [];
                        }
                        mapCountryToAgent[item.agent].push(item.country);
                    });

                 //  keep only isolated agents - agents who has just one country
                    for (var agent in mapCountryToAgent) {
                        if(mapCountryToAgent[agent].length > 1){
                            delete mapCountryToAgent[agent]; // remove agents which aren't isolated
                        }
                        else {
                            var country = mapCountryToAgent[agent][0];
                            if (!mapIsoAgentToCountry[country]) { // start fill in the country : agents[] map
                                mapIsoAgentToCountry[country] = [];
                            }
                            mapIsoAgentToCountry[country].push(agent);
                        }
                    }
                 //  get the country who has the most isolated agents
                    var isoCountry = _.max(Object.keys(mapIsoAgentToCountry), function (prop) {
                        return mapIsoAgentToCountry[prop].length;
                    });

                  dispatch({
                     type: types.INIT_ISO_COUNTRY,
                        payload: {
                        isoCountry: isoCountry
                         }
                   });
                   //return isoCountry;
                };
        }

        return {
             findIsolatedCountry
           }
    });