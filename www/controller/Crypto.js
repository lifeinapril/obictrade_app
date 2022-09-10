app.controller('Crypto', function($cordovaSocialSharing,$ionicModal,USDT,BTC,ETH,$scope,$state,$timeout,$ionicPopup,$rootScope) {
  
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
  $rootScope.show();  
  var data={
      o_id:$rootScope.user.o_id,
      amount:amt,
      fee:$rootScope.coin.fee,
      rate:$rootScope.coin.selling.usd * $rootScope.coin.sell_rates
  };
  var Cx=BTC;
  if($rootScope.coin.name="Bitcoin"){
        Cx=BTC;
    } else
    if($rootScope.coin.name="Ethereum"){
      Cx=ETH;
    }else
    if($rootScope.coin.name="USDT"){
      Cx=USDT;
    }
    if(Cx){
      Cx.sell(data).success(function(Data){
      $rootScope.hide();  
         if(Data.status==true){
          $rootScope.sell_box.hide();      
          $scope.view_transaction(Data.data);
          $rootScope.refresh_profile();
        }else{
          $ionicPopup.alert({template:Data.message});
        }
      }).error(function(){
        $rootScope.hide();  
        $ionicPopup.alert({template:"Network Error please try again later"});
      });     
    } 
}
      





$rootScope.buy_coin=function(amt){
  $rootScope.show();  
  var data={
      o_id:$rootScope.user.o_id,
      amount:amt,
      fee:$rootScope.coin.fee,
      rate:$rootScope.coin.buying.usd * $rootScope.coin.buy_rates
  };
  var Cx=BTC;
  if($rootScope.coin.name="Bitcoin"){
        Cx=BTC;
    } else
    if($rootScope.coin.name="Ethereum"){
      Cx=ETH;
    } else
    if($rootScope.coin.name="USDT"){
      Cx=USDT;
    }
    if(Cx){
      Cx.buy(data).success(function(Data){
      $rootScope.hide();  
         if(Data.status==true){
          $rootScope.buy_box.hide();      
          $scope.view_transaction(Data.data);
          $rootScope.refresh_profile();
        }else{
          $ionicPopup.alert({template:Data.message});
        }
      }).error(function(){
        $rootScope.hide();  
        $ionicPopup.alert({template:"Network Error please try again later"});
      });     
    } 
}
      



$rootScope.send_coin=function(amt,address){
  $rootScope.show();  
  var data={
      o_id:$rootScope.user.o_id,
      address:address,
      amount:amt,
      fee:$rootScope.coin.fee || 0.00001,
      rate:$rootScope.coin.selling.usd * $rootScope.coin.sell_rates
    };  
    var Cx=BTC;
  if($rootScope.coin.name="Bitcoin"){
        Cx=BTC;
    }else
    if($rootScope.coin.name="Ethereum"){
      Cx=ETH;
    }else
    if($rootScope.coin.name="USDT"){
      Cx=USDT;
    }
    if(Cx){
      Cx.send(data).success(function(Data){
        $rootScope.hide();  
           if(Data.status==true){
            $rootScope.send_coin_box.hide();   
            $scope.view_transaction(Data.data);
            $rootScope.refresh_profile();
          }else{
            $ionicPopup.alert({template:Data.message});
          }
        }).error(function(){
          $rootScope.hide();  
          $ionicPopup.alert({template:"Network Error please try again later"});
        });  
      }
}
      







$rootScope.start_selling=function(coin){
  $rootScope.coin.affiliate.allow_buy=true;
  $rootScope.show();  
    var Cx=null;
  if(coin.symbol=="BTC"){
        Cx=BTC;
    }else
    if(coin.symbol=="ETH"){
      Cx=ETH;
    }else
    if(coin.symbol=="USDT"){
      Cx=USDT;
    }
    if(Cx){
      console.log("Cx:");
      console.log(Cx);
      coin.o_id=$rootScope.user.o_id;
      Cx.start_selling(coin).success(function(Data){
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
      }else{
        $ionicPopup.alert({template:"could not read action"});
      }
}
      



$rootScope.stop_selling=function(coin){
  $rootScope.coin.affiliate.allow_buy=false;
  coin.affiliate.allow_buy=false;
  $rootScope.show();  
    var Cx=null;
  if(coin.symbol=="BTC"){
        Cx=BTC;
    }else
    if(coin.symbol=="ETH"){
      Cx=ETH;
    }else
    if(coin.symbol=="USDT"){
      Cx=USDT;
    }
    if(Cx){
      coin.o_id=$rootScope.user.o_id;
      Cx.stop_selling(coin).success(function(Data){
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
}
      












$rootScope.start_buying=function(coin){
  $rootScope.coin.affiliate.allow_sell=true;
  $rootScope.show();  
  var Cx=null;
  if(coin.symbol=="BTC"){
        Cx=BTC;
    }else
    if(coin.symbol=="ETH"){
      Cx=ETH;
    }else
    if(coin.symbol=="USDT"){
      Cx=USDT;
    }
    if(Cx){
      coin.o_id=$rootScope.user.o_id;
      Cx.start_buying(coin).success(function(Data){
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
}
      



$rootScope.stop_buying=function(coin){
  $rootScope.coin.affiliate.allow_sell=false;
  coin.affiliate.allow_sell=false;
  $rootScope.show();  
  var Cx=null;
  if(coin.symbol=="BTC"){
        Cx=BTC;
    }else
    if(coin.symbol=="ETH"){
      Cx=ETH;
    }else
    if(coin.symbol=="USDT"){
      Cx=USDT;
    }
    if(Cx){
      coin.o_id=$rootScope.user.o_id;
      Cx.stop_buying(coin).success(function(Data){
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