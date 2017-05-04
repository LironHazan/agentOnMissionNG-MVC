/**
 * Created by liron on 04/05/2017.
 */
angular.module('agentMission').factory("missionsProvider", function($q, Consts){
    return {
        get: function(){
            return $q.when(Consts.MISSIONS_INPUT);
        }
    };
});