app.controller('Crypto', function($cordovaSocialSharing,$ionicModal,MP,$scope,Crypto,$ionicPopup,$rootScope) {
  
  $rootScope.usd_amount=0;
  $rootScope.coin_amount=0;
  $rootScope.naira_amount=0;


  $ionicModal.fromTemplateUrl('pop/buy.html', {
    scope: $rootScope,
    animation: 'slide-in-up'
  }).then(function(modal) {
  $rootScope.usd_amount=0;
  $rootScope.coin_amount=0;
  $rootScope.naira_amount=0;
    $rootScope.buy_box = modal;
  });





  $ionicModal.fromTemplateUrl('pop/sell.html', {
    scope: $rootScope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $rootScope.usd_amount=0;
    $rootScope.coin_amount=0;
    $rootScope.naira_amount=0;
    $rootScope.sell_box = modal;
  });





  $ionicModal.fromTemplateUrl('pop/recieve_coin.html', {
    scope: $rootScope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $rootScope.recieve_coin_box = modal;
  });


  $scope.view_transaction=function(transaction){
    $rootScope.transaction=transaction;
    $rootScope.coin_transaction_box.show();
    }





$rootScope.scan_code=function(){
  cordova.plugins.barcodeScanner.scan(
    function (result) {
       if(result){
         $rootScope.to=result.text;
       };
    },
    function (error) {
        alert("Scanning failed: " + error);
    }
 );
  }






  $rootScope.share_address = function () {
    var m="this is my "+$rootScope.coin.name+" crytpocurrency address: "+$rootScope.coin.address+". download obic app and start trading today";
    var l="http://obictrade.com/apps";
    $cordovaSocialSharing.share(m,null,null,l);
  };



  
    


  
  




  
$rootScope.sell_coin=function(amt){
  $rootScope.request_pin().then(function(auth){
  if(auth){
  $rootScope.show();  
  var data={
      o_id:$rootScope.user.o_id,
      amount:amt,
      rates:$rootScope.coin.sell_rates,
      usd:$rootScope.coin.selling.usd,
      coin:$rootScope.coin.coin,
      name:$rootScope.coin.name,
      symbol:$rootScope.coin.symbol
  };
  console.log(data);
  MP.sell(data).success(function(Data){
      $rootScope.hide();  
         if(Data.status==true){
          $rootScope.sell_box.hide();      
          $rootScope.view_order(Data.data);
          $rootScope.refresh_profile();
        }else{
          $ionicPopup.alert({template:Data.message});
        }
      }).error(function(){
        $rootScope.hide();  
        $ionicPopup.alert({template:"Network Error please try again later"});
      });     
  }
});
}
      


$rootScope.connect_wallet=function(coin){
      $rootScope.show();  
      coin.o_id=$rootScope.user.o_id;
      Crypto.connect(coin).success(function(Data){
        $rootScope.hide();  
        $ionicPopup.alert({template:Data.message});
           if(Data.status==true){ 
              $rootScope.refresh_profile();
              $rootScope.connect_wallet_box.hide();
          }
        }).error(function(){
          $rootScope.hide();  
          $ionicPopup.alert({template:"Network Error please try again later"});
        });  
}



$rootScope.buy_coin=function(amt){
  $rootScope.request_pin().then(function(auth){
  if(auth){
  $rootScope.show();
  var data={
      o_id:$rootScope.user.o_id,
      amount:amt,
      rates:$rootScope.coin.sell_rates,
      usd:$rootScope.coin.selling.usd,
      coin:$rootScope.coin.coin,
      name:$rootScope.coin.name,
      symbol:$rootScope.coin.symbol
  };
  MP.buy(data).success(function(Data){
      $rootScope.hide();  
         if(Data.status==true){
          $rootScope.buy_box.hide();      
          $rootScope.view_order(Data.data);
          $rootScope.refresh_profile();
        }else{
          $ionicPopup.alert({template:Data.message});
        }
      }).error(function(){
        $rootScope.hide();  
        $ionicPopup.alert({template:"Network Error please try again later"});
      });   
    }
});
}
      


 







$rootScope.start_selling=function(coin){
  $rootScope.coin.affiliate.allow_buy=true;
      $rootScope.show();
      coin.o_id=$rootScope.user.o_id;
      Crypto.start_selling(coin).success(function(Data){
        $rootScope.hide();  
        $ionicPopup.alert({template:Data.message});
           if(Data.status==true){ 
              $rootScope.refresh_profile();
              window.history.back();
          }
        }).error(function(){
          $rootScope.hide();  
          $ionicPopup.alert({template:"Network Error please try again later"});
        }); 
}
      



$rootScope.stop_selling=function(coin){
  $rootScope.coin.affiliate.allow_buy=false;
  coin.affiliate.allow_buy=false;
      $rootScope.show();  
      coin.o_id=$rootScope.user.o_id;
      Crypto.stop_selling(coin).success(function(Data){
        $rootScope.hide();  
        $ionicPopup.alert({template:Data.message});
           if(Data.status==true){ 
              $rootScope.refresh_profile();
          }
        }).error(function(){
          $rootScope.hide();  
          $ionicPopup.alert({template:"Network Error please try again later"});
        });  
}
      












$rootScope.start_buying=function(coin){
      $rootScope.coin.affiliate.allow_sell=true;
      $rootScope.show();  
      coin.o_id=$rootScope.user.o_id;
      Crypto.start_buying(coin).success(function(Data){
        $rootScope.hide();  
        $ionicPopup.alert({template:Data.message});
           if(Data.status==true){ 
              $rootScope.refresh_profile();
              window.history.back();
          }
        }).error(function(){
          $rootScope.hide();  
          $ionicPopup.alert({template:"Network Error please try again later"});
        });  
}
      



$rootScope.stop_buying=function(coin){
  $rootScope.coin.affiliate.allow_sell=false;
  coin.affiliate.allow_sell=false;
  $rootScope.show();  
      coin.o_id=$rootScope.user.o_id;
      Crypto.stop_buying(coin).success(function(Data){
        $rootScope.hide();  
        $ionicPopup.alert({template:Data.message});
           if(Data.status==true){ 
              $rootScope.refresh_profile();
          }
        }).error(function(){
          $rootScope.hide();  
          $ionicPopup.alert({template:"Network Error please try again later"});
        });  
}
      








$rootScope.start_buy=function(coin){
  $rootScope.show();  
  $timeout(function(){
    $rootScope.stop_buying(coin);
      $rootScope.hide();  
      $state.go("start_buy");
  },1000);
  }

  


  $rootScope.start_sell=function(coin){
    $rootScope.show();  
    $timeout(function(){
      $rootScope.stop_selling(coin);
      if(coin.balance > 0){
        $rootScope.hide();  
        $state.go("start_sell");
      }else{
        $ionicPopup.alert({template:"You don't have sufficient balance to start selling. Please top up to continue"});
      }
    },1000);
    }
  



$rootScope.max_coin=function(){
  $rootScope.selling_converter('',$rootScope.coin.balance);
}

$rootScope.max_coin2=function(){
  var bal=$rootScope.coin.balance;
  $rootScope.selling_converter('',bal-$rootScope.coin.fee);
}


$rootScope.max_coin3=function(){
  $rootScope.selling_converter('ngn',$rootScope.user.naira_wallet.balance);
}






});