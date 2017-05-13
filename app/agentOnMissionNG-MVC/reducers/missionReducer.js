'use strict';
/*global types */

const missionsState = {
    missions: [],
    isoCountry: ''
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
        default:
            return angular.extend({}, state, {});
    }
}
