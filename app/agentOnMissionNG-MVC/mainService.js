'use strict';

angular.module('agentMission')
    .service('mainService', function (_, $q) {
        var _this = this; // had to use _this when inside a promise
            // 2 map + reduce
        _this.findIsolatedCountry = function(input){
            var mapCountryToAgent = {}; // {agent : [countryA, countryB]}
            var mapIsoAgentToCountry = {}; // { country: [iso-agentA, iso-agentB]}

            input.forEach(function (item) {
                // map the agents to the countries they were at
                if (!mapCountryToAgent[item.agent]) {
                    mapCountryToAgent[item.agent] = [];
                }
                mapCountryToAgent[item.agent].push(item.country);
            });
            // keep only isolated agents - agents who has just one country
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
            // get the country who has the most isolated agents
            var isoCountry = _.max(Object.keys(mapIsoAgentToCountry), function (prop) {
                return mapIsoAgentToCountry[prop].length;
            });
            return isoCountry;
        };

        // async call to google api for getting coordinates of an address
        _this.getCoordinates = function (address) {
            return $q(function (resolve, reject) {
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({'address': address}, function (results, status) {
                    if (status == 'OK') {
                        console.log(results[0].geometry.location);
                        resolve(results[0].geometry.location);
                    }// having OVER_QUERY_LIMIT .. google don't recommend to do batches from the client :/
                    else {
                        reject('Geocode was not successful for the following reason: ' + status);
                    }
                });
            });

        };

        // async call for getting distance between 2 places,
        // should do: _this.getCoordinates(baseLocation) once! cause I have the base location

        _this.getDistanceFromBase = function (baseLocation, destLocation) {
            return _this.getCoordinates(destLocation)
                .then(function (location) {
                    return google.maps.geometry.spherical.computeDistanceBetween(location, baseLocation);
                });
        };

        _this.fetchInputsDistance = function (baseLocation, missionInputs){
            var promises = [];
            missionInputs.forEach(function(agent){
                promises.push(_this.getDistanceFromBase(baseLocation, agent.address))
            });
            return $q.all(promises);
        };

        // adding the timestamp to each agent is better for filtering and for comparison
        _this.addTimeStampByDate = function (inputs){
            inputs.forEach(function(item){
                item.stamp = new Date(item.date).getTime()
            });
            return inputs;
        };
    });