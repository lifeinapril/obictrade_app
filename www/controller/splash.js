app.controller('splash', function($rootScope,$timeout,$state){
    $timeout(function(){
        if($rootScope.user){
            $state.go("password");
        }else{
            $state.go("start");
        }
    },9000);
});