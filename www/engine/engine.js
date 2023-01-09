
app.run(function($ionicPlatform,Config,$cordovaClipboard,$cordovaSocialSharing,Crypto,$cordovaDeeplinks,$localStorage,$timeout,$location,$rootScope,$ionicHistory,$state,$ionicPopup,account,$ionicLoading,$sce,$ionicModal,$cordovaToast){
  $rootScope.media=Config.media;
  $rootScope.token=Config.token;
  $rootScope.countries=countries;
  $rootScope.addressed=true;
  $rootScope.money={};
  $rootScope.ngn_sell=1;
  $rootScope.ngn_buy=1;
  $rootScope.btc={};
  $rootScope.eth={};
  $rootScope.usdt={};
  $rootScope.coin={};
  $rootScope.contacts=[];
  $rootScope.direct={
    user:{},
    user_id:null,
    amount:0,
    o_id:null
  }

  $rootScope.settings={
    dark_mode:false
  };

  if($localStorage.dark_mode){
    $rootScope.settings.dark_mode=$localStorage.dark_mode;
  }else{
    $localStorage.dark_mode=false;
  }


  $ionicModal.fromTemplateUrl('pop/fund.html', {
    scope: $rootScope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $rootScope.fund_box = modal;
  });
  
  $ionicModal.fromTemplateUrl('pop/coin_transaction.html', {
    scope: $rootScope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $rootScope.coin_transaction_box = modal;
  });

  $ionicModal.fromTemplateUrl('pop/naira_transaction.html', {
    scope: $rootScope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $rootScope.naira_transaction_box = modal;
  });

  $ionicModal.fromTemplateUrl('pop/order.html', {
    scope: $rootScope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $rootScope.order_box = modal;
  });


  $ionicModal.fromTemplateUrl('pop/search.html', {
    scope: $rootScope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $rootScope.search_box = modal;
  });

  $ionicModal.fromTemplateUrl('pop/search_pay.html', {
    scope: $rootScope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $rootScope.search_pay = modal;
  });

  $ionicModal.fromTemplateUrl('pop/search_pay2.html', {
    scope: $rootScope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $rootScope.search_pay2 = modal;
  });


  $ionicModal.fromTemplateUrl('pop/select_user.html', {
    scope: $rootScope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $rootScope.select_user = modal;
  });



  $ionicModal.fromTemplateUrl('pop/choose_username.html', {
    scope: $rootScope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $rootScope.username_box = modal;
  });


  $ionicModal.fromTemplateUrl('pop/terms.html', {
    scope: $rootScope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $rootScope.terms_box = modal;
  });


  $ionicModal.fromTemplateUrl('pop/trade.html', {
    scope: $rootScope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $rootScope.trade_box = modal;
  });


  $ionicModal.fromTemplateUrl('pop/pay.html', {
    scope: $rootScope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $rootScope.pay_box = modal;
  });



  $ionicModal.fromTemplateUrl('pop/affiliate_terms.html', {
    scope: $rootScope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $rootScope.affiliate_terms_box = modal;
  });



  $ionicModal.fromTemplateUrl('pop/faqs.html', {
    scope: $rootScope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $rootScope.faqs_box = modal;
  });

  $ionicModal.fromTemplateUrl('pop/send_coin.html', {
    scope: $rootScope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $rootScope.usd_amount=0;
    $rootScope.coin_amount=0;
    $rootScope.naira_amount=0;
    $rootScope.send_coin_box = modal;
  });

  
  $rootScope.send_to=function(trader){
    $rootScope.trader=trader;
    if($rootScope.user.o_id!=trader.o_id){
    $rootScope.pay_box.show();
    }else{
      $state.go("edit_profile");
    }
  };
  $rootScope.user_choice=function(trader){
    $rootScope.direct.user=trader;
    $rootScope.direct.to=trader.o_id;
    $rootScope.select_user.hide();
  };

  $rootScope.int=function(x){
    return parseFloat(x);
 };
 

 $rootScope.username_auth=function(){
  if(!$rootScope.user.user_name){
    $rootScope.username_box.show();
  }
 }




 function sameDay(d1, d2) {
  return  d1.getFullYear() === d2.getFullYear() &&
          d1.getMonth() === d2.getMonth() &&
          d1.getDate() === d2.getDate();
}

 
$rootScope.TodaySales=function(sale){
  var today=new Date();
  var d2=new Date(sale.date_created);
  if(sameDay(d2, today)){
      return sale;
  }
}




$rootScope.change_mode=function(){
  $localStorage.dark_mode=!$localStorage.dark_mode;
  $rootScope.settings.dark_mode=$localStorage.dark_mode;
console.log("dark_mode:");
console.log($rootScope.settings.dark_mode);
$rootScope.change_bar();
}


$rootScope.change_bar=function(){
  if(window.statusbar){
  if(!$rootScope.settings.dark_mode){
    if($rootScope.text_color=='light'){
      StatusBar.styleLightContent();
    }else {
      StatusBar.styleDefault();
    }
  }else{
    StatusBar.styleLightContent();
  }
}else{
  StatusBar.styleDefault();
}
}



$rootScope.HourSales=function(from,to){
var total=0;
if($rootScope.trades){
for(var i=0;i < $rootScope.trades.length;i++){
  var d1 = new Date($rootScope.trades[i].date_created);
  var d2 = new Date();
    if(sameDay(d1, d2)){
      let hours = d1.getHours();
      let minutes = d1.getMinutes() / 100;
      let time = hours + minutes;
        if (from <= time && time <= to) {
          var total=total+1;
        }
    }
}
}
return total;
}



$rootScope.coin_usd=function(amount,symbol){
  var value=0;
  if(symbol=="BTC"){
      value=amount * $rootScope.btc.selling.usd;
  }else
  if(symbol=="ETH"){
      value=amount * $rootScope.eth.selling.usd;
  }else
  if(symbol=="USDT"){
      value=amount * $rootScope.usdt.selling.usd;
  }
   return value;
}



 $rootScope.pay=function(user){
    $rootScope.addressed=false;
    $rootScope.money.user_name=user.user_name;
    $state.go("send_money");
 }



 $rootScope.pay_coin=function(user,coin){
  $rootScope.addressed=false;
  $rootScope.to=user.user_name;
  $rootScope.coin=coin;
  $rootScope.send_coin_box.show();
}


$rootScope.internal_transfer=function(){
  $state.go("transfer");
  $rootScope.select_user.show();
}



 $rootScope.view_profile=function(profile){
  $rootScope.username_box.hide();
  $rootScope.search_box.hide();
  $rootScope.coin_transaction_box.hide();
  $rootScope.naira_transaction_box.hide();
  $rootScope.order_box.hide();
  if($rootScope.user.o_id==profile.o_id){
     $state.go("edit_profile");
  }else{
    $rootScope.profile=profile;
     $state.go("obic_profile",{id:profile.o_id});
  }
 }

 $rootScope.view_card=function(card){
  $rootScope.username_box.hide();
  $rootScope.search_box.hide();
  $rootScope.coin_transaction_box.hide();
  $rootScope.naira_transaction_box.hide();
   $rootScope.card=card;
   $state.go("gift");
 }




  $rootScope.search=function(key){
    account.search(key).success(function(Data){
        if(Data.status==true){
            $rootScope.profile_results=Data.users;   
            $rootScope.cards_results=Data.cards;   
            $rootScope.search_results=$rootScope.cards_results.length + $rootScope.profile_results.length;   
        }
    });
}


  $rootScope.total_balance=function(){  
    var total=0;
    var total_btc=0;
    var total_eth=0;
    var total_usdt=0;
    var total_naira=0;
    if($rootScope.user){
      if($rootScope.user.naira_wallet){
        total_naira=$rootScope.user.naira_wallet.balance;
      }
      if($rootScope.user.bitcoin_wallet){
        if($rootScope.btc.selling){
        total_btc=$rootScope.user.bitcoin_wallet.balance * ($rootScope.btc.selling.usd * $rootScope.btc.sell_rates);
      }
    }
    if($rootScope.user.ethereum_wallet){
      if($rootScope.eth.selling){
        total_eth=$rootScope.user.ethereum_wallet.balance * ($rootScope.eth.selling.usd * $rootScope.eth.sell_rates);
      }
    } 
    if($rootScope.user.usdt_wallet){
      if($rootScope.usdt.selling){
        total_usdt=$rootScope.user.usdt_wallet.balance * ($rootScope.usdt.selling.usd * $rootScope.usdt.sell_rates);
      }
    }
    }
      total=(total_naira + total_btc + total_eth + total_usdt) || 0;
      return total;
  };





  $rootScope.total_usd=function(){  
        var n= $rootScope.total_balance();
        var usd=n/$rootScope.btc.sell_rates;
      return usd;
  };



  $rootScope.ng_usd=function(ng){  
    var usd=ng/$rootScope.btc.sell_rates;
    return usd; 
    };




    $rootScope.refresh_orders=function(){
      if($rootScope.user){
      var id=$rootScope.user.o_id;
      account.sales(id).success(function(Data){
        $rootScope.hide();
          if(Data.status==true){
            $rootScope.trades=Data.data; 
          }
      }).error(function(){
        $rootScope.hide();
      });
    }
    };

    $rootScope.refresh_orders();

    $rootScope.refresh_contacts=function(){
      if($rootScope.user){
      var id=$rootScope.user.o_id;
      account.contacts(id).success(function(Data){
        $rootScope.hide();
          if(Data.status==true){
            $rootScope.contacts=Data.data; 
          }
      }).error(function(){
        $rootScope.hide();
      });
    }
    };  
    
    
    
    $rootScope.refresh_connections=function(){
      if($rootScope.user){
      var id=$rootScope.user.o_id;
      account.connections(id).success(function(Data){
        $rootScope.hide();
          if(Data.status==true){
            $rootScope.connections=Data.data; 
          }
      }).error(function(){
        $rootScope.hide();
      });
    }
    };
    
    $rootScope.refresh_connections();
    $rootScope.refresh_contacts();
  

$rootScope.add_contact=function(contact){
  $rootScope.show();
      var data={
        o_id:$rootScope.user.o_id,
        contact:contact.o_id
      }
      $rootScope.contacts.push(contact);
    account.add_contact(data).success(function(Data){
    $rootScope.hide();
    $rootScope.refresh_contacts();
     }).error(function(){
      $rootScope.hide();
      $ionicPopup.alert({
        template: "network error."
      });
     });    
}






$rootScope.remove_contact=function(contact){
  $ionicPopup.show({
  template: 'Are you sure you want to remove this contact?',
  title: 'Remove Contact',
  scope: $rootScope,
  buttons: [
  { text: 'Cancel' },
  {
    text: '<b>Remove</b>',
    type: 'button-assertive',
    onTap: function(e) {    
      $rootScope.contacts.splice($rootScope.contacts.indexOf(contact),1); 
      var data={
        o_id:$rootScope.user.o_id,
        contact:contact.o_id
      }
      account.delete_contact(data).success(function(Data){
          $rootScope.hide();
          if(Data.status==true){
            $rootScope.refresh_contacts();
          }
         }).error(function(){
          $rootScope.hide();
          $ionicPopup.alert({
            template: "network error."
          });
         }); 
    }
  }
  ]
  });
  };




  
  
  $rootScope.view_wallet=function(wallet) {
    $rootScope.coin=wallet;
    if(!wallet){
       $ionicPopup.alert({template:"Please select a valid wallet"});
     }else{
    if($rootScope.coin.coin=="BTC"){
      $rootScope.coin=$rootScope.user.bitcoin_wallet;
      $rootScope.coin.fee=$rootScope.btc.fee;
      $rootScope.coin.buying=$rootScope.btc.buying;
      $rootScope.coin.selling=$rootScope.btc.selling;
      $rootScope.coin.buy_rates=$rootScope.btc.buy_rates;
      $rootScope.coin.sell_rates=$rootScope.btc.sell_rates;
    }else
    if($rootScope.coin.coin=="ETH"){
      $rootScope.coin=$rootScope.user.ethereum_wallet;
      $rootScope.coin.fee=$rootScope.eth.fee;
      $rootScope.coin.buying=$rootScope.eth.buying;
      $rootScope.coin.selling=$rootScope.eth.selling;
      $rootScope.coin.buy_rates=$rootScope.eth.buy_rates;
      $rootScope.coin.sell_rates=$rootScope.eth.sell_rates;
    }else
    if($rootScope.coin.coin=="USDT"){
      $rootScope.coin=$rootScope.user.usdt_wallet;
      $rootScope.coin.fee=$rootScope.usdt.fee;
      $rootScope.coin.buying=$rootScope.usdt.buying;
      $rootScope.coin.selling=$rootScope.usdt.selling;
      $rootScope.coin.buy_rates=$rootScope.usdt.buy_rates;
      $rootScope.coin.sell_rates=$rootScope.usdt.sell_rates;
    }
    console.log("wallet:");
    console.log($rootScope.user);
      $state.go("crypto_wallet");
     }
     }
 

     $ionicModal.fromTemplateUrl('pop/connect_wallet.html', {
      scope: $rootScope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $rootScope.connect_wallet_box = modal;
    });
    





    $ionicModal.fromTemplateUrl('pop/auth.html', {
      scope: $rootScope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $rootScope.auth_box = modal;
    });

    $ionicModal.fromTemplateUrl('pop/pin.html', {
      scope: $rootScope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $rootScope.pin_box = modal;
    });
  
  $rootScope.request_password=function(){
    return new Promise(function (resolve, reject) {
      $rootScope.auth_box.show();
      $rootScope.validate=resolve;
    });
    }





$rootScope.demand_pin=function(){
  return new Promise(function (resolve, reject) {
  if($rootScope.user.pin){
    $rootScope.pin_box.show();
    $rootScope.validate=resolve;
  }else{ 
     $ionicPopup.alert({
        template: "Please set a pin before you can complete this transaction, go to security settings to set a pin"
      });
  }
  })
}

  $rootScope.auth=function(password){
      if(!password){
          $ionicPopup.alert({
        template: "Please provide your password."
      });
      }else{
    $rootScope.show();
      var data={
      o_id:$rootScope.user.o_id,
      password:password
      }
    account.auth(data).success(function(Data){
      $rootScope.hide();
      if(Data.status==true){
        $rootScope.auth_box.hide();
        $rootScope.validate(true);
      }else{
      $ionicPopup.alert({template:Data.message});
      }
    }).error(function(){
      $rootScope.hide();
      $ionicPopup.alert({template:"OOPS! , CHECK YOUR INTERNET CONNECTION AND TRY AGAIN."});
    });
  }
}
  

$rootScope.request_pin=function(){
  $rootScope.validated=false;
  return new Promise(function (resolve, reject) {
  if($rootScope.user.protected){
    $rootScope.pin_box.show();
    $rootScope.validate=resolve;
  }else{
    $ionicPopup.alert({template:"To complete this transaction, please set your transaction pin in security settings"});
  }
  })
}

$rootScope.auth_pin=function(pin){
    if(!pin){
      $rootScope.hide();
      $ionicPopup.alert({
        template: "Please provide your pin."
      });
    }else{
      if($rootScope.user.pin==pin){
        $rootScope.pin_box.hide();
        $rootScope.validate(true);
        }else{
        $ionicPopup.alert({template:"Pin incorrect"});
        }
    }
}
 





  
$rootScope.show = function() {
  $ionicLoading.show({
    templateUrl: 'asset/loading.html'
  });
};
 
 
 $rootScope.hide = function(){
  $rootScope.$broadcast('scroll.refreshComplete');
   $ionicLoading.hide();
 };
 



 $rootScope.copy=function(text){
  $cordovaClipboard.copy(text);
cordova.plugins.clipboard.copy(text, alert('COPIED'));
}



$rootScope.read_notes=function(){
  if($rootScope.user){
    account.read_notes($rootScope.user.o_id);
        }
    };









    $ionicModal.fromTemplateUrl('pop/note.html', {
      scope: $rootScope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $rootScope.note_box = modal;
    });
    
    
    $rootScope.open_note=function(note){
      $rootScope.note=note;
      $rootScope.note_box.show();
    };
    





    $rootScope.view_transaction=function(transaction){
      $rootScope.transaction=transaction;
      $rootScope.naira_transaction_box.show();
      }
  




    $rootScope.view_order=function(transaction){
      $rootScope.transaction=transaction;
      $rootScope.order_box.show();
      }
  



    $ionicModal.fromTemplateUrl('pop/send_funds.html', {
      scope: $rootScope,
      animation: 'slide-in-up'
    }).then(function(modal) {
    $rootScope.usd_amount=0;
    $rootScope.coin_amount=0;
    $rootScope.naira_amount=0;
      $rootScope.funds_box = modal;
    });



    $ionicModal.fromTemplateUrl('pop/affiliate_buy.html', {
      scope: $rootScope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $rootScope.abuy_box = modal;
    });
  
  
    $ionicModal.fromTemplateUrl('pop/affiliate_sell.html', {
      scope: $rootScope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $rootScope.asell_box = modal;
    });
  
  
  
  $rootScope.buy_affiliate=function(coin){
    console.log("buying from affiliate:");
    console.log(coin);
    $rootScope.coin=coin;
  $rootScope.usd_amount=0;
  $rootScope.coin_amount=0;
  $rootScope.naira_amount=0;
  var trader=$rootScope.trader;
    if($rootScope.user.o_id!=trader.o_id){
    if(coin.coin=="BTC"){
      $rootScope.trader.coin=$rootScope.trader.bitcoin_wallet;
    }else 
    if(coin.coin=="ETH"){
      $rootScope.trader.coin=$rootScope.trader.ethereum_wallet;
    }else
    if(coin.coin=="USDT"){
      $rootScope.trader.coin=$rootScope.trader.usdt_wallet;
    }
    $rootScope.abuy_box.show();
  }
  }
  



  $rootScope.connect_wallet=function(coin){
    $rootScope.show();  
    coin.o_id=$rootScope.user.o_id;
    Crypto.connect(coin).success(function(Data){
      $rootScope.hide();  
      $ionicPopup.alert({template:Data.message});
         if(Data.status==true){ 
            $rootScope.connect_wallet_box.hide();
        }
      }).error(function(){
        $rootScope.hide();  
        $ionicPopup.alert({template:"Network Error please try again later"});
      });  
}

  
  $rootScope.sell_affiliate=function(coin){
    console.log("selling from affiliate:");
    console.log(coin);
    $rootScope.coin=coin;
  $rootScope.usd_amount=0;
  $rootScope.coin_amount=0;
  $rootScope.naira_amount=0;
  var trader=$rootScope.trader;
    if(trader){
      if($rootScope.user.o_id!=trader.o_id){
    $rootScope.trader=trader;
    if(coin.coin=="BTC"){
      $rootScope.trader.coin=$rootScope.trader.bitcoin_wallet;
    }else 
    if(coin.coin=="ETH"){
      $rootScope.trader.coin=$rootScope.trader.ethereum_wallet;
    }else
    if(coin.coin=="USDT"){
      $rootScope.trader.coin=$rootScope.trader.usdt_wallet;
    }
    $rootScope.asell_box.show();
  }
}
  }
  



  $rootScope.send_funds=function(coin){
    $rootScope.usd_amount=0;
    $rootScope.coin_amount=0;
    $rootScope.naira_amount=0;
    $rootScope.search_pay.hide();
    $rootScope.search_pay2.hide();
    $rootScope.pay_box.hide();
    var trader=$rootScope.trader;
    $timeout(function(){
    if($rootScope.user.o_id!=trader.o_id){
    if(coin){
          if(coin.coin=="BTC" || coin.coin=="BTC"){
            $rootScope.coin=coin;
            $rootScope.coin.coin="BTC";
            $rootScope.trader.coin=trader.bitcoin_wallet;
          }else 
          if(coin.coin=="ETH" || coin.coin=="ETH"){
            $rootScope.coin=coin;
            $rootScope.coin.coin="ETH";
            $rootScope.trader.coin=trader.ethereum_wallet;
          }else
          if(coin.coin=="USDT" || coin.coin=="USDT"){
            $rootScope.coin=coin;
            $rootScope.coin.coin="USDT";
            $rootScope.trader.coin=trader.usdt_wallet;
          }
        }else{
          $rootScope.coin=null;
          $rootScope.trader.coin=null;
        }
        $rootScope.funds_box.show();
        }
      },500);
  };
  

  $rootScope.show_coin_input=function(){
    $rootScope.show_coin=true;
    $rootScope.show_usd=false;
}

$rootScope.show_naira_input=function(){
  $rootScope.show_coin=false;
    $rootScope.show_usd=false;
}

$rootScope.show_usd_input=function(){
  $rootScope.show_usd=true;
  $rootScope.show_coin=false;
}

$rootScope.show_coin_input();




  


  $rootScope.selling_converter=function(currency,amt){
    if(currency=="usd"){
      $rootScope.usd_amount=amt;
     $rootScope.naira_amount=amt*$rootScope.coin.buy_rates;
     $rootScope.coin_amount=amt/$rootScope.coin.buying.usd;
    }else 
    if(currency=="ngn"){
      $rootScope.naira_amount=amt;
      $rootScope.usd_amount=amt/$rootScope.coin.buy_rates;
      $rootScope.coin_amount=$rootScope.usd_amount/$rootScope.coin.buying.usd;
    }else{
      $rootScope.coin_amount=amt;
      $rootScope.usd_amount=amt*$rootScope.coin.buying.usd;
      $rootScope.naira_amount=$rootScope.usd_amount*$rootScope.coin.buy_rates;
    }
  }
  




  $rootScope.selling_converter2=function(currency,amt){
    var rate=$rootScope.coin.buy_rates;
    if($rootScope.trader.coin){
      rate=$rootScope.trader.coin.affiliate.buy_rate;
    }
      if(currency=="usd"){
        $rootScope.usd_amount=amt;
        $rootScope.coin_amount=amt/$rootScope.coin.buying.usd;
       $rootScope.naira_amount=amt*rate;
      }else 
      if(currency=="ngn"){
        $rootScope.naira_amount=amt;
        $rootScope.usd_amount=(amt/rate);
        $rootScope.coin_amount=$rootScope.usd_amount/$rootScope.coin.buying.usd;
      }else{
        $rootScope.coin_amount=amt;
        $rootScope.usd_amount=amt*$rootScope.coin.buying.usd;
        $rootScope.naira_amount=$rootScope.usd_amount*rate;
      }
  }
  


    



  $rootScope.buying_converter=function(currency,amt){
    var rate=$rootScope.btc.sell_rates;
    if($rootScope.coin){
      var rate=$rootScope.coin.sell_rates;
    }
       if(currency=="usd"){
        $rootScope.usd_amount=amt;
        $rootScope.coin_amount=amt/$rootScope.coin.selling.usd;
        $rootScope.naira_amount=amt*rate;
      }else 
      if(currency=="ngn"){
        $rootScope.naira_amount=amt;
        $rootScope.usd_amount=(amt/rate);
        $rootScope.coin_amount=$rootScope.usd_amount/$rootScope.coin.selling.usd;
      }else{
        $rootScope.coin_amount=amt;
        $rootScope.usd_amount=amt * $rootScope.coin.selling.usd;
        $rootScope.naira_amount=$rootScope.usd_amount * rate;
      }
  }
  




  $rootScope.buying_converter2=function(currency,amt){
    var rate=$rootScope.coin.sell_rates;
    if($rootScope.trader.coin){
      rate=$rootScope.trader.coin.affiliate.sell_rate;
    }
      if(currency=="usd"){
        $rootScope.usd_amount=amt;
        $rootScope.coin_amount=amt/$rootScope.coin.selling.usd;
        $rootScope.naira_amount=amt*rate;
      }else 
      if(currency=="ngn"){
        $rootScope.naira_amount=amt;
        $rootScope.usd_amount=(amt/rate);
        $rootScope.coin_amount=$rootScope.usd_amount/$rootScope.coin.selling.usd;
      }else{
        $rootScope.coin_amount=amt;
        $rootScope.usd_amount=amt * $rootScope.coin.selling.usd;
        $rootScope.naira_amount=$rootScope.usd_amount * rate;
      }
  }
  




$rootScope.fetch_rates=function(){
  Crypto.rates("BTC").success(function(Data){
    $rootScope.btc=Data.rates;
  });
  Crypto.rates("ETH").success(function(Data){
    $rootScope.eth=Data.rates;
  });
  Crypto.rates("USDT").success(function(Data){
    $rootScope.usdt=Data.rates;
  });
};



$rootScope.fetch_rates();









$rootScope.verification_status=function(){
  var verification_level=0;
    if($rootScope.user.bank_verified){
      verification_level=verification_level+1;
    }
    if($rootScope.user.email_verified){
      verification_level=verification_level+1;
    }
    if($rootScope.user.phone_verified){
      verification_level=verification_level+1;
    }
    return verification_level;
}



if($localStorage.user){
  $rootScope.user=$localStorage.user; 
}
  
  
$rootScope.refresh_profile=function(){
  $rootScope.fetch_rates();
  if($rootScope.user){
  var id=$rootScope.user.o_id;
  $rootScope.refresh_orders();
  $rootScope.refresh_contacts();
  account.info(id).success(function(Data){
    $rootScope.hide();
      if(Data.status==true){
        $rootScope.user=Data.data; 
        $localStorage.user=Data.data; 
        $rootScope.verification_level=$rootScope.verification_status();
      }else{

      }
  }).error(function(){
    $rootScope.hide();
  });
}
};





  
$rootScope.get_notifications=function(){
  $rootScope.refresh_profile();
  if($rootScope.user){
account.notifications($rootScope.user.o_id).success(function(Note){
  console.log("Note:");
  console.log(Note);
  if(Note.status==true){
    $rootScope.notifications=Note.data;
    $rootScope.read_notes();
  }
});
}
}


$rootScope.contacted=function(user){
  var value=false;
  if($rootScope.contacts && user){
    var m=$rootScope.contacts.findIndex(function(sub){
      if(sub.o_id==user.o_id){
        return sub;
      }
    });
    if(m >= 0){
      value=true;
      }
  }
return value;
};



  
  

  $rootScope.trustlink=function (link) {
    return $sce.trustAsResourceUrl(link);
  };


$rootScope.range=function(min,max,step){
  max=Math.round(max);
  step = step || 1;
  var input =[];
  for(var i = min; i <= max; i +=step){
      input.push(i);
  }
  return input;
};


 $rootScope.toastr = function(message) {
   var duration='long';
   var location='bottom';
   if($cordovaToast){
    $cordovaToast.show(message, duration, location).then(function(success) {
      console.log("The toast was shown");
  }, function (error) {
      console.log("The toast was not shown due to " + error);
  });
   }
};

 
  $rootScope.refresh_profile();



  
account.banks().success(function(Data){
  if(Data.status==true){
      $rootScope.banks=Data.data;
  }
});




$rootScope.verify_bank=function(bank){
  $rootScope.checking=true;
  $rootScope.verified_name=null;
  account.verify_bank(bank).success(function(Data){
      $rootScope.checking=false;      
      if(Data.status==true){
          $rootScope.verified_name=Data.data.data.data.accountname;
          $rootScope.user.bank_account.name=$rootScope.verified_name;
      }
  }).error(function(){
    $rootScope.checking=false;      
  });
}




$rootScope.verify_uname=function(name){
  $rootScope.checking=true;
  $rootScope.verified_name=null;
  account.find_username(name).success(function(Data){
      $rootScope.checking=false;      
      if(Data.status==true){
          $rootScope.verified_name=Data.data.full_name;
      }
  }).error(function(){
    $rootScope.checking=false;      
  });
}



$rootScope.get_notifications();



$rootScope.profile_update=function(profile){
  $rootScope.account_update(profile);
  window.history.back();
}


 $rootScope.account_update=function(profile){
        $rootScope.show();
  if($localStorage.pushtoken){
    profile.pushtoken=$localStorage.pushtoken;
  }
   account.update(profile).success(function(Data){
       if(Data.status==true){
         $timeout(function(){
          $rootScope.refresh_profile();
         },1000);
       }else{
        $rootScope.hide();
        $rootScope.toastr(Data.message);
       }
   }).error(function(){
        $rootScope.hide();
   });
};



        



$rootScope.date_distance=function(x,y){
  var today=x;
  var set_day=new Date(y);
  var diff=Math.abs(today.getTime() - set_day.getTime());
  var days=Math.ceil(diff / (1000 * 3600 * 24));
  if(days > 0){
    return true;
  }else{
    return false;
  }
};




$rootScope.timediff = function(start){
  var u=start;
  return moment(u).fromNow();
};





$rootScope.gains=function(coin){
  if(coin){
    if(coin.selling){
  var new_usd=coin.selling.usd || 0;
  var old_usd=coin.selling.last_usd || 0;
    var d=new_usd - old_usd;
    var gain=((d/old_usd)*100);
    return gain;
    }
  }
}







$rootScope.market_gain=function(){
  var btc=$rootScope.gains($rootScope.btc) || 0;
  var eth=$rootScope.gains($rootScope.eth) || 0;
  var usdt=$rootScope.gains($rootScope.usdt) || 0;
  var total=(btc+eth+usdt)/3;
  return total;
}





$rootScope.share_code = function (code) {
  var m="ObicTrade:Trade digital assets and cryptocurrency";
  var s="Use my promo code get free #500 and your registration , Join our digital community and start trading digital assets";
  var l="https://obictrade.com/promo/"+code;
  $cordovaSocialSharing.share(m,s,null,l);
};





 
 var date=new Date();
$rootScope.today=date;


 
 
 
   $ionicPlatform.registerBackButtonAction(function() {
     if ($location.path() === "/splash" || $location.path() === "splash" ) {
       navigator.app.exitApp();
     }
     else {
       $ionicHistory.goBack();
     }
   }, 100);
 


 
 $ionicPlatform.ready(function() {

  cordova.plugins.AppReview.requestReview().catch(function() {
    return cordova.plugins.AppReview.openStoreScreen();
});

      
  $cordovaDeeplinks.route({
    '/promo/:code': {
      target: 'refferal'
    },
    '/profile/:id': {
      target: 'obic_profile'
    }
  }).subscribe(function(match) {
    console.log('Match deep route:', match);
      $timeout(function() {  
          $state.go(match.$route.target, {id: match.$args.id});
      }, 2000);
  }, function(nomatch) {
    console.log('Deep Match none:', nomatch);
  });


  console.log("application is ready sir!");

  if (window.updatePlugin) {
        window.updatePlugin.update({
          flexibleUpdateStalenessDays: 0,
          immediateUpdateStalenessDays: 5
        });
  }


   if (window.FirebasePlugin) {
      console.log("FCMPlugin initiated!");
      window.FirebasePlugin.grantPermission();
      window.FirebasePlugin.getToken(function(token) {
        console.log("...............jolieX signed fcm generated token:");
        console.log(token);
        $rootScope.pushtoken=token;
        $localStorage.pushtoken=token;
          if($localStorage.user){
            $localStorage.user.pushtoken=token;
            $rootScope.user.pushtoken=token;
          }else{
            console.log("FCMPlugin not functioning.....");
          }
      window.FirebasePlugin.setBadgeNumber(0);
      window.FirebasePlugin.grantPermission();
      });

      window.FirebasePlugin.onTokenRefresh(function(token) {
          console.log("...............jolieX signed fcm generated token:");
          console.log(token);
          $rootScope.pushtoken=token;
          $localStorage.pushtoken=token;
        if($localStorage.user){
              $localStorage.user.pushtoken=token;
              $rootScope.user.pushtoken=token;
              console.log("fcmplugin stored with user............");
          }else{
            console.log("FCMPlugin not functioning.....");
          }
        window.FirebasePlugin.setBadgeNumber(0);
      });

window.FirebasePlugin.onMessageReceived(function(data) {
      window.FirebasePlugin.getBadgeNumber(function(n) {
        var badgeNumber=0;
        if(n){
        badgeNumber=n+1;
        }else{
        badgeNumber=1;
        }
        window.FirebasePlugin.setBadgeNumber(badgeNumber);
      });
     if (data.wasTapped || data.tap) {
        $rootScope.get_notifications();
        $state.go("front.notifications");
    }
});
     }
 
 
if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {

  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
  cordova.plugins.Keyboard.disableScroll(true);

}

if (window.StatusBar) {
  var bar=window.StatusBar || StatusBar;
  bar.styleDefault();
  bar.overlaysWebView(true);
  bar.styleLightContent();
}


if (window.Splashscreen) {
  window.Splashscreen.hide();
}

});
});
 