'use strict';
/*global types */

const missionsState = {
    missions: [],
    isoCountry: '',
    tree: [],
    closestLocation: '',
    farthestLocation: ''
};

function missionsReducer(state = missionsState, action = {}) {
    switch (action.type) {
        case types.INIT_MISSIONS:
            return angular.extend({}, state, {
                missions: action.payload.missions,
            });
        case types.INIT_ISO_COUNTRY:
             return angular.extend({}, state, {
             isoCountry: action.payload.isoCountry
             });
        case types.LOAD_TREE:
             return angular.extend({}, state, {
             tree: action.payload.tree
             });
         case types.GET_DISTANCE:
             return angular.extend({}, state, {
              closestLocation: action.payload.closestLocation,
              farthestLocation: action.payload.farthestLocation
             });
        default:
            return angular.extend({}, state, {});
    }
}
