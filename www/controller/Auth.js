app.controller('Auth', function($scope,$state,$http,account,$sessionStorage,$timeout,$ionicPopup,$rootScope,$localStorage) {
  
  $scope.$watch(function(){
    return $rootScope.user;
  }, function (n,o){
  console.log("session changed.");
  },true);
  
  
var ip=null;
$rootScope.det={phone_format:$rootScope.countries[0].format};

  $http.get("https://ipinfo.io/json").then(function (response) 
  {
    ip = response.data.ip;
  });



  var device=0;
  if( /Android/i.test(navigator.userAgent) ) {
    device=2;
} 
if( /iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
    device=1;
}





  
    $scope.login=function (data) {
      $rootScope.show();
      data.pushtoken=$rootScope.token;
     if(!data.password){
        $ionicPopup.alert({
       template: "Please provide your password."
     });
    }else{
        data.ip=ip;
        data.device=device;
        if($localStorage.email){
          data.email=$localStorage.email;
      }else if($rootScope.user){
        data.email=$rootScope.user.email;
      }else if($rootScope.t_user){
        data.email=$rootScope.t_user.email;
      }
      console.log(data);
      account.login(data).success(function(Data){
        $rootScope.hide();
        if(Data.status==true){
          $localStorage.user=Data.data;
          $rootScope.user=Data.data;
          $state.go("front.cards");
        }else{
        $scope.error=Data.message;
        }
      }).error(function(data){
        $rootScope.hide();
        $scope.error="OOPS! , CHECK YOUR INTERNET CONNECTION AND TRY AGAIN.";
      });
    }
     
    };
  
  
  
  
  
    $scope.reset = function (email) {
      $rootScope.show();
      var data=email;
      if (!data.email) {
        $rootScope.hide();
        $ionicPopup.alert({
          template: "Please provide your email address. Empty field detected."
        });
      }else {
        account.reset(data.email).success(function (Data) {
          $rootScope.hide();
          if (Data.status==true) {
            $state.go("resetdone");
          } else {
            $ionicPopup.alert({
              template: Data.message
            });
          }
        });
      }
    };
  
  
  
  
  $scope.auth=function(user) {
    $rootScope.show();
    console.log(user);
    if(user.phone.charAt(0)=='0')
    {
    user.phone=user.phone.substring(1);
    }    
    account.phone_validation(user).success(function(Data){
      $rootScope.hide();
      $rootScope.det.phone=user.phone.trim();
      $rootScope.det.email=user.email;
      $localStorage.email=user.email;
      $localStorage.phone=user.phone;
      if(Data.status==false){
        $rootScope.secret_code=Data.code;
        $timeout(function(){
          $rootScope.secret_code=null;
        },200000);
        $ionicPopup.alert({
          template:Data.message
        });
        $state.go("code");
      }else{ 
        $rootScope.t_user=Data.data;
        $state.go("password");
      }
    }).error(function(){
      $rootScope.hide();
      $scope.error="OOPS! ,CAN'T VALIDATE ACCOUNT, CHECK YOUR NETWORK CHECK YOUR INTERNET CONNECTION AND TRY AGAIN.";
    });
  };









  
  $scope.auth2=function(user) {
    $rootScope.show();
    console.log(user);
    account.email_validation(user).success(function(Data){
      $rootScope.hide();
      if(Data.status==false){
        $ionicPopup.alert({
          template:Data.message
        });
      }else{ 
        $rootScope.det.email=user.email;
          $localStorage.email=user.email;
        $rootScope.t_user=Data.data;
        $state.go("password");
      }
    }).error(function(){
      $rootScope.hide();
      $scope.error="OOPS! ,CAN'T VALIDATE ACCOUNT, CHECK YOUR NETWORK CHECK YOUR INTERNET CONNECTION AND TRY AGAIN.";
    });
  };








  $scope.timer=59;

  $scope.counter=function(){
    $scope.timer=59;
    $scope.timer=$scope.timer - 1;
    if($scope.timer > 1){
      $timeout(function(){
        $scope.counter();
      },2000);
    }
  }

  
  
  $scope.verify_code=function(code) {
    $rootScope.show();
      $timeout(function(){
    if(code==$rootScope.secret_code){
        $rootScope.hide();
        $state.go("register");
      }else{ 
        $rootScope.hide();
        $ionicPopup.alert({
          template:"The code you inputted is invalid, expired or incorrect. Please check and try again or resend another code"
        });
      }
      },2000);
  };





  
  $scope.resend_code=function() {
    $rootScope.show();
    $scope.timer==59;
    $scope.counter();
    $scope.auth($rootScope.det);
  }



  
      $scope.register=function (data) {
        if($localStorage.phone){
          data.phone=$localStorage.phone;
        }
         if($localStorage.email){
          data.email=$localStorage.email;
        }
        if(!data.full_name){
          $ionicPopup.alert({
            template: "Please provide your name."
          });
        }else if(!data.email){
          $ionicPopup.alert({
         template: "Please provide your email."
       });
      }
       else if(!data.phone){
        $ionicPopup.alert({
       template: "Please provide your phone number."
     });
     }else if(!data.password){
      $ionicPopup.alert({
     template: "Please provide a password for this account."
   });
   }else if(data.password!=data.rpassword){
    $ionicPopup.alert({
   template: "Password doesn't match."
 });
 }
else{
  $rootScope.show();
  data.pushtoken=$rootScope.token;
       data.ip=ip;
       data.device=device;
        account.register(data).success(function(Data){
          $rootScope.hide();
          if(Data.status==true){
            $localStorage.user=Data.data;
            $rootScope.user=Data.data;
            $state.go("congrats");
            $localStorage.phone==null;
          }else{
            console.log("failed!!!!!!");
            console.log(Data);
            $ionicPopup.alert({
              template: Data.message
            });
          }
        }).error(function(data){
          console.log(data);
          $rootScope.hide();
          $scope.error="OOPS! , CHECK YOUR INTERNET CONNECTION AND TRY AGAIN.";
        });
      }
  
  
    };

    });
  
  
  
  
  
  