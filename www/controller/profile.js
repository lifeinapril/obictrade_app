app.controller('profile', function($cordovaSocialSharing,Config,$scope,Upload,$timeout,$ionicModal,Upload,$state,account,$localStorage,$ionicPopup,$rootScope) {
  $rootScope.$watch(function(){
    return $rootScope.user;
  }, function (n,o){
  console.log("profile updated.");
  },true);

  $rootScope.has=true;
$rootScope.contacts=[];



  $scope.photo_up=function(f) {
    $rootScope.show();
    $rootScope.file=f;
    $timeout(function(){
        $rootScope.hide();
    },3000);
  };
  
  
  
  
  $rootScope.update_photo=function(){
    if($rootScope.user){
    if($rootScope.file){
        var uploadUrl = Config.API + "users/upload_photo";
        var post={
          o_id:$rootScope.user.o_id
        };
        post.file=$rootScope.file;
        $rootScope.show();
        Upload.upload({
          url: uploadUrl,
          data: post
        }).then(function(resp) {
          var msg=resp.data.message;
          $rootScope.hide();
          $ionicPopup.alert({template:msg});
          if(resp.data.status==true){
              $rootScope.refresh_profile();
              $rootScope.refresh_profile();
              $rootScope.file=null;
              window.history.back();
          }
        });
    }else{
      window.history.back();
    }
  }
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

  

  






  $ionicModal.fromTemplateUrl('pop/email_changed.html', {
    scope: $rootScope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $rootScope.email_changed_box = modal;
  });



  $ionicModal.fromTemplateUrl('pop/phone_changed.html', {
    scope: $rootScope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $rootScope.phone_changed_box = modal;
  });



  $rootScope.$watch(function(){
    $rootScope.user
  }, function (n,o){
  },true);




$scope.media=Config.media;




$rootScope.use_current_location=function(){
  $rootScope.show(); 
  $rootScope.gps(); 
};






    $rootScope.edit_address=function(address){
      if(address){
        $rootScope.address_index=$rootScope.user.addresses.indexOf(address);
        $rootScope.address=address;
        $state.go("edit_address");
      }
    }


    

    $rootScope.set_pin=function(pin){
      $rootScope.user.pin=pin;
      $rootScope.account_update($rootScope.user);
      $rootScope.refresh_profile();
      window.history.back();
    }
  


    $scope.open_link=function(link){
      window.open(link, '_system', 'location=yes');
    };
    



$scope.placeChanged2 = function() {
  $scope.place=this.getPlace();
  var location=$scope.place.geometry.location;
  $rootScope.user.latitude=location.lat();
  $rootScope.user.longitude=location.lng();
    $rootScope.user.address=$scope.place.formatted_address;
};


$scope.logout=function(){
$ionicPopup.show({
  template: 'Are you sure you want to logout?',
  title: 'Sign out of account',
  scope: $rootScope,
  buttons: [
    {
    text: 'Cancel' ,
    type:"button-light"
    },
    {
    text: '<b>Logout</b>',
    type: 'button-assertive',
    onTap: function(e) {    
      $localStorage.user=null;
      $rootScope.user=null;
      $rootScope.t_user=null;
      $rootScope.det=null;
      $scope.user=null;    
      $localStorage.phone=null;
      $localStorage.email=null;
      $state.go("auth"); 
    }
  }
  ]
  });
};




$scope.search_contact=function(id){
  $scope.loading=true;
account.search_contact(id).success(function(Data){
  $scope.loading=false;
    if(Data.status==true){
      $scope.contacts=Data.data;
    }else{
      $scope.contacts=[];
    }
       }).error(function(){
  $scope.loading=false;
       });    
}


$rootScope.select_document=function(f){
  $rootScope.files=f;
  };
  



$scope.join_affiliate=function(user){
  $rootScope.show();
  var formData = new FormData();
  formData.append('files',$rootScope.files);
          Upload.upload({
            url: Config.API+"users/join_affiliate",
            headers: {'Content-Type' : 'multipart/form-data'},
            data: user
          }).then(function(resp) {
            var Data=resp.data;
            $rootScope.hide();
            $ionicPopup.alert({
                  template:Data.message
                });
                      if(Data.status==true){
                        $rootScope.user.on_approval=true;
                        $rootScope.refresh_profile();
                        window.history.back();
                    }
        }).catch(function(){
          $rootScope.hide();
         $ionicPopup.alert({
           template: "network error."
         });
        });    
 }
 





    $rootScope.select_contact=function(contact){
      $rootScope.selected_contact=null;
      if(contact){
        $rootScope.selected_contact=contact;
      }
    }
  
    


$scope.share_link = function (user) {
  var n=user.first_name + user.last_name;
  var m="";
  var l=Config.API+n;
  $cordovaSocialSharing.share(m,null,null,l);
};


$rootScope.share_referral = function (id) {
  var m="this is my refferal ID : "+id+". download obic app and start trading today";
  var l="http://obictrade.com/apps";
  $cordovaSocialSharing.share(m,null,null,l);
};





$scope.change_password=function(data){
  $rootScope.show();
  data.o_id=$rootScope.user.o_id;
  account.change_password(data).success(function(Data){
    $rootScope.hide();
    $ionicPopup.alert({
      template: Data.message
    });
    if(Data.status==true){
      window.history.back();
    }
       }).error(function(){
        $rootScope.hide();
        $ionicPopup.alert({
          template: "network error."
        });
       });    
};







  $rootScope.support=function(){
    var intercom=window.Intercom || window.intercom;
    if(intercom){
      intercom.displayMessenger();
      if($localStorage.user){
    intercom.registerIdentifiedUser({userId:$localStorage.user.o_id});
    intercom.updateUser({ email: $localStorage.user.email, name: $localStorage.user.first_name || $localStorage.user.full_name });
    }
  }
  }



  $rootScope.verify_email=function(user){
    $rootScope.show();
    $rootScope.verv_phone=null;
    $rootScope.verv_email=user.email;
    account.change_email(user).success(function(Data){
      $rootScope.hide();
      $ionicPopup.alert({
        template: Data.message
      });
      if(Data.status==true){
        $rootScope.secret_code=Data.code;
        $state.go("code2");
      }
         }).error(function(){
          $rootScope.hide();
          $ionicPopup.alert({
            template: "network error."
          });
         }); 
}



$rootScope.verify_username=function(user){
  $rootScope.show();
  account.check_username(user).success(function(Data){
    $rootScope.hide();
    $ionicPopup.alert({
      template: Data.message
    });
    if(Data.status==true){
      $rootScope.refresh_profile();
      window.history.back();
    }
       }).error(function(){
        $rootScope.hide();
        $ionicPopup.alert({
          template: "network error."
        });
       }); 
}



$rootScope.verify_phone=function(user){
  $rootScope.show(); 
  if(user.phone.charAt(0)=='0')
  {
  user.phone =user.phone.substring(1);
  } 
  $rootScope.verv_phone=user.phone;
  $rootScope.verv_email=null;
  account.change_phone(user).success(function(Data){
    $rootScope.hide();
    $ionicPopup.alert({
      template: Data.message
    });
    if(Data.status==true){
      $rootScope.secret_code=Data.code;
      $state.go("code2");
    }
       }).error(function(){
        $rootScope.hide();
        $ionicPopup.alert({
          template: "network error."
        });
       }); 
}




  
  $scope.verify_code=function(code) {
    $rootScope.show();
      $timeout(function(){
    if(code==$rootScope.secret_code){
        $rootScope.hide();
    if($rootScope.verv_phone){
      $rootScope.user.phone_verified=true;
      $rootScope.account_update($rootScope.user);
      $rootScope.phone_changed_box.show();
    }else
    if($rootScope.verv_email){
      $rootScope.user.email_verified=true;
      $rootScope.account_update($rootScope.user);
      $rootScope.email_changed_box.show();
    }
    $rootScope.verv_phone=null;
    $rootScope.verv_email=null;
    $timeout(function(){
    $rootScope.refresh_profile();
    },1000);
    $state.go("front.home");
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
    if($rootScope.verv_phone){
      $rootScope.verify_phone($scope.user);
    }else
    if($rootScope.verv_email){
      $rootScope.verify_email($scope.user);
    }
  }





});
  
  
  
  