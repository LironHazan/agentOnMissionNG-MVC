'use strict';

angular.module('agentMission')
    .service('mainService', function (_, $q) {
        var _this = this; // had to use _this when inside a promise

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

        // async call for getting distance between 2 places
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
            return inputs.map((item) => {
                item.stamp = new Date(item.date).getTime();
                return item;
            });
        };
    });