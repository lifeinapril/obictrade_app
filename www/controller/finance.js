app.controller('finance', function($scope,$ionicModal,$stateParams,Upload,Giftcards,$rootScope,wallet,account,$state,$timeout,$localStorage,$ionicPopup,MP) {
  
  $scope.hidden_balance=true;
  $rootScope.card_type=null;
  $rootScope.transaction={};
  $scope.money={};
 

  if($localStorage.user){
    $rootScope.user=$localStorage.user;
      $scope.cards=$localStorage.user.cards;
      if($rootScope.user.cards){
        if($rootScope.user.cards.length > 0){
          $rootScope.transaction.token=$rootScope.user.cards[0].token;
              }
        }
  }else{
      console.log("no profile");
  }


  $scope.hide_balance=function(){
    $rootScope.user.hidden_balance=true;
    $rootScope.account_update($rootScope.user);
  }

  $scope.show_balance=function(){
    $rootScope.user.hidden_balance=false;
    $rootScope.account_update($rootScope.user);
  }



  $rootScope.fetch_spotlight=function(){
  MP.spotlight().success(function(Data){
    $rootScope.hide();
  if(Data.status==true){
    $rootScope.spotlight=Data.data;
    }
    });
  }


    $rootScope.topten_btc=function(){
    var coin=$rootScope.btc.symbol;
    MP.topten(coin).success(function(Data){
      $rootScope.hide();
    if(Data.status==true){
      $rootScope.btc_rates=Data.data;
      }
      });
    }
      

    $scope.view_transaction=function(transaction){
      $rootScope.transaction=transaction;
      $rootScope.naira_transaction_box.show();
      }
  


    $rootScope.topten_eth=function(){
      var coin=$rootScope.eth.symbol;
      MP.topten(coin).success(function(Data){
        $rootScope.hide();
      if(Data.status==true){
        $rootScope.eth_rates=Data.data;
        }
        });
      }
        





      $rootScope.topten_usdt=function(){
        var coin=$rootScope.usdt.symbol;
        MP.topten(coin).success(function(Data){
          $rootScope.hide();
        if(Data.status==true){
          $rootScope.usdt_rates=Data.data;
          }
          });
        }
        


    $rootScope.refresh_market=function(){
      $rootScope.fetch_rates();
      $rootScope.fetch_spotlight();
      $rootScope.topten_btc();
      $rootScope.topten_eth();
      $rootScope.topten_usdt();
      }
          


      $rootScope.refresh_market();





      $scope.view_coin_transaction=function(transaction){
        $rootScope.transaction=transaction;
        $rootScope.coin_transaction_box.show();
        }



        
    
    $rootScope.trade_with=function(trader){
      $rootScope.trader=trader;
  if($rootScope.user.o_id!=trader.o_id){
      $rootScope.trade_box.show();
  }
    };
    
   


    $rootScope.affiliate_buy=function(amt){
      $rootScope.request_pin().then(function(auth){
      if(auth){
        if($rootScope.coin.address){
                $rootScope.show();  
                var data={
                    o_id:$rootScope.user.o_id,
                    amount:amt,
                    pool_id:$rootScope.trader.pool_id,
                    rates:$rootScope.trader.coin.affiliate.buy_rate,
                    usd:$rootScope.coin.buying.usd,
                    coin:$rootScope.coin.coin,
                    symbol:$rootScope.coin.coin,
                    name:$rootScope.coin.name,
                    symbol:$rootScope.coin.symbol
                };
                MP.affiliate_buy(data).success(function(Data){
                    $rootScope.hide();  
                      if(Data.status==true){
                        $rootScope.abuy_box.hide();      
                        $rootScope.trade_box.hide();      
                        $rootScope.view_order(Data.data);
                        $rootScope.refresh_profile();
                      }else{
                        $ionicPopup.alert({template:Data.message});
                      }
                    }).error(function(){
                      $rootScope.hide();  
                      $ionicPopup.alert({template:"Network Error please try again later"});
                    }); 
                  }else{
                    $ionicPopup.alert({template:"Your wallet is not connected, please provide a wallet address to trade."});
                    $rootScope.connect_wallet_box.show();
                  } 
            }
});

    }





    $rootScope.affiliate_sell=function(amt){
      $rootScope.request_pin().then(function(auth){
      if(auth){
      $rootScope.show();  
      var data={
          o_id:$rootScope.user.o_id,
          amount:amt,
          pool_id:$rootScope.trader.pool_id,
          rates:$rootScope.trader.coin.affiliate.sell_rate,
          usd:$rootScope.coin.selling.usd,
          coin:$rootScope.coin.coin,
          name:$rootScope.coin.name,
          symbol:$rootScope.coin.symbol
      };
     MP.affiliate_sell(data).success(function(Data){
          $rootScope.hide();  
             if(Data.status==true){
              $rootScope.abuy_box.hide();    
              $rootScope.trade_box.hide();       
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






$rootScope.fetch_pro=function(id){
  account.info(id).success(function(Data){
    $rootScope.hide();
  if(Data.status==true){
    $rootScope.profile=Data.data;
    account.sales($rootScope.profile.o_id).success(function(Data2){
        if(Data2.status==true){
          $rootScope.profile.trades=Data2.data; 
        }
    });
    }else{
    $ionicPopup.alert({template:Data.message});
    }
    }).error(function () {
      $rootScope.hide();
      $ionicPopup.alert({template:"error in connection, check your internet connection"});
    });
}






if($stateParams.id){
  $rootScope.fetch_pro($stateParams.id);
}



    
    $rootScope.change_card_currency=function(currency){
      $rootScope.currency=currency;
      $rootScope.selected_asset.currency=currency.name;
      $rootScope.selected_asset.rates=currency.sell;
      $rootScope.selected_asset.symbol=currency.symbol;
  }






  $ionicModal.fromTemplateUrl('pop/sell_giftcard.html', {
    scope: $rootScope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $rootScope.sell_giftcard_box = modal;
  });



  $ionicModal.fromTemplateUrl('pop/buy_giftcard.html', {
    scope: $rootScope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $rootScope.buy_giftcard_box = modal;
  });


$rootScope.change_card_type=function(type){
  $rootScope.selected_asset.card_type=type;
  $rootScope.selected_asset.rates=$rootScope.currency.sell;
  if(type=="Debit Card Reciept"){
      $rootScope.selected_asset.rates=$rootScope.selected_asset.rates-($rootScope.selected_asset.rates*0.15);
  }if(type=="E-Code"){
      $rootScope.selected_asset.rates=$rootScope.selected_asset.rates-($rootScope.selected_asset.rates*0.15);
  }if(type=="Large Card"){
      $rootScope.selected_asset.rates=$rootScope.selected_asset.rates-($rootScope.selected_asset.rates*0.20);
  }
 }



    $rootScope.total_card=function(cards){
      var total=0;
      if(cards){
          for(var i=0;i < cards.length;i++){
             if(cards[i].total){
              var sub=cards[i].total;
              total=total + sub;
             }
          }
      }
      return total;
  }

    $rootScope.add_card=function(amount,quantity,custom){
      var card={
          amount:amount,
          quantity:quantity,
          total:0,
          custom:custom,
          sub_total:function(){
              var rates=$rootScope.selected_asset.rates;
              if($rootScope.selected_asset.currency=="USD"){
                  var amt=this.amount;
                  if(amt > 50){
                      rates=rates - (rates * 0.05);
                  }
              }
              var total=(this.amount * rates) * this.quantity;
              this.total=total;
              return total;
          }
      };
      $rootScope.selected_asset.cards.push(card);
      };


      $rootScope.remove_card=function(card){
          var index=$rootScope.selected_asset.cards.indexOf(card);
          $rootScope.selected_asset.cards.splice(index,1);
          };
      
    $rootScope.check_rates=function(asset){
      $rootScope.selected_asset=asset;
      $rootScope.selected_asset.cards=[];
      if(!$rootScope.selected_asset.card_types || $rootScope.selected_asset.card_types.length < 1){
          $rootScope.selected_asset.card_types=[
              "Physical Card","Large Card","E-Code","Cash Reciept","Debit Card Reciept"
          ];
      }
      $rootScope.selected_asset.card_type=$rootScope.selected_asset.card_types[0];
      $rootScope.add_card(50,0,true);
      $rootScope.add_card(100,0,true);
      $rootScope.add_card(200,0,true);
          if(!$rootScope.selected_asset.currencies  || $rootScope.selected_asset.currencies.length < 1){
          $rootScope.selected_asset.currencies=[
              {
                  "name":"USD",
                  "symbol":"$",
                  "sell":$rootScope.selected_asset.rates || 0,
                  "buy":$rootScope.selected_asset.rates || 0
              }
          ]
      }; 
      var currency = $rootScope.selected_asset.currencies[0];    
      $rootScope.selected_asset.currency=currency.name;
         $rootScope.selected_asset.rates=currency.sell;
         $rootScope.selected_asset.symbol=currency.symbol;
      $rootScope.currency=$rootScope.selected_asset.currencies[0];
 
    }


    
$rootScope.estimate_value=function(card){
    var value=0;
    var sub_total=card.amount * card.quantity;
    var total=$rootScope.selected_asset.rates * sub_total;
    if(card.amount > 50){
        value=total - (0.15 * total);
    }else{
        value=total;
    }
    this.card.total=value;
    return value;
}







  $rootScope.fetch_peer=function(){
    $rootScope.show();
    if($rootScope.user.bank_account.account_number){
    wallet.p2p().success(function(Data){
    $rootScope.hide();
    if(Data.status==true){
      $rootScope.peer=Data.data;
      if($rootScope.peer){
        $rootScope.peer.reference=$rootScope.user.o_id;
        $state.go("p2p");
      }
      }else{
        $ionicPopup.alert({template:Data.message});
      }
      }).error(function () {
        $rootScope.hide();
        $ionicPopup.alert({template:"error in connection, check your internet connection"});
      });
    }else{
      $rootScope.hide();
      $ionicPopup.alert({template:"Please add your bank details for verification first"});
      $state.go("add_bank");
    }
}








$rootScope.fund_peer=function(peer){
  $rootScope.show();
  peer.o_id=$rootScope.user.o_id;
  wallet.fund_peer(peer).success(function(Data){
    $rootScope.hide();
    $ionicPopup.alert({template:Data.message});
  if(Data.status==true){
    $rootScope.refresh_profile();
    $state.go("front.payment");
    }else{
    $ionicPopup.alert({template:Data.message});
    }
    }).error(function () {
      $rootScope.hide();
      $ionicPopup.alert({template:"error in connection, check your internet connection"});
    });
}





  $rootScope.clear=function(){
   $rootScope.new_card={
      cardno:"",
      cvv:"",
      expiryyear:"",
      expirymonth:"",
      pin:""
    };
  };






  $scope.clear();








  $ionicModal.fromTemplateUrl('pop/add_card.html', {
    scope: $rootScope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $rootScope.newcard_box = modal;
  });










  $ionicModal.fromTemplateUrl('pop/avs.html', {
    scope: $rootScope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $rootScope.avs_box = modal;
  });







  $ionicModal.fromTemplateUrl('pop/pin.html', {
    scope: $rootScope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $rootScope.pin_box = modal;
  });









  $ionicModal.fromTemplateUrl('pop/otp.html', {
    scope: $rootScope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $rootScope.otp_box = modal;
  });
  









  $ionicModal.fromTemplateUrl('pop/web.html', {
    scope: $rootScope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $rootScope.web_box = modal;
  });
  






  $ionicModal.fromTemplateUrl('pop/cashout.html', {
    scope: $rootScope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $rootScope.cashout_box = modal;
  });
  




  $ionicModal.fromTemplateUrl('pop/withdraw.html', {
    scope: $rootScope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $rootScope.withdraw_box = modal;
  });
  



  $rootScope.max_naira=function(){
    $rootScope.transaction.amount=$rootScope.user.naira_wallet.balance-100;
  }
  




  $ionicModal.fromTemplateUrl('pop/fund.html', {
    scope: $rootScope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $rootScope.fund_box = modal;
  });
  




  $rootScope.fund_wallet=function(transaction) {
    $rootScope.show();
    transaction.o_id=$rootScope.user.o_id;
    wallet.fund(transaction).success(function(Data){
      $rootScope.hide();
      if(Data.status==true){
        $rootScope.fund_box.hide();
        $rootScope.refresh_profile();
        $ionicPopup.alert({template:Data.message});
        }
        $ionicPopup.alert({template:Data.message});
        }).error(function (data) {
          $rootScope.hide();
          $ionicPopup.alert({template:"error in connection, check your internet connection"});
        });
  };







  
  $rootScope.withdraw=function(transaction) {
    $rootScope.request_pin().then(function(auth){
    if(auth){
    if(transaction.amount < 5000){
       $ionicPopup.alert({template:"Please enter an amount that is above 5000"});
     }else{
       $rootScope.show();
       transaction.o_id=$rootScope.user.o_id;
     wallet.burnout(transaction).success(function(Data){
       $rootScope.hide();
       $ionicPopup.alert({template:Data.message});
       if(Data.status==true){
        $rootScope.withdraw_box.hide();
         $rootScope.refresh_profile();
         window.history.back();
       }
         }).error(function () {
           $rootScope.hide();
           $ionicPopup.alert({template:"error in connection, check your internet connection"});
         });
       }
      }
    });
   };
 
 
 
 




  
  $rootScope.cashout=function(transaction) {
    $rootScope.request_pin().then(function(auth){
    if(auth){
   if(transaction.amount < 2){
      $ionicPopup.alert({template:"Please enter an amount that is above 100"});
    }else{
      $rootScope.show();
      transaction.o_id=$rootScope.user.o_id;
    wallet.cashout(transaction).success(function(Data){
      $rootScope.hide();
      $ionicPopup.alert({template:Data.message});
      if(Data.status==true){
        $rootScope.refresh_profile();
        $state.go("front.wallet");
        $rootScope.withdraw_box.hide();
      }
        }).error(function () {
          $rootScope.hide();
          $ionicPopup.alert({template:"error in connection, check your internet connection"});
        });
      }
    }
  });
  };





  $rootScope.send_money=function(transaction) {
    if(transaction.amount < 2){
       $ionicPopup.alert({template:"Please enter an amount that is above 2"});
     }else{
       $rootScope.show();
       transaction.o_id=$rootScope.user.o_id;
       transaction.account_name=$rootScope.verified_name;
       transaction.addressed=$rootScope.addressed;
     wallet.send_money(transaction).success(function(Data){
       $rootScope.hide();
       $ionicPopup.alert({template:Data.message});
       if(Data.status==true){
        $ionicPopup.alert({template:Data.message});
        $rootScope.refresh_profile();
        $state.go("front.payment");
       }
         }).error(function () {
           $rootScope.hide();
           $ionicPopup.alert({template:"error in connection, check your internet connection"});
         });
       }
   };
 
 
 
 
 










  $rootScope.add_creditcard=function(card){
    $rootScope.show();
    card.cvv=card.cvv.toString();
    card.expiryyear=card.expiryyear.toString();
    card.expirymonth=card.expirymonth.toString();
    console.log("your card:");
    console.log(card);
    var data={
      card:card,
      user:$rootScope.user
    };
    account.addcard(data).success(function(response){
        console.log(response);
        $rootScope.hide();
        if(response.status==true){
          $rootScope.newcard_box.hide();
          var result=response.data.data;
              if(result.suggested_auth){
                      if(result.suggested_auth == "NOAUTH_INTERNATIONAL") {
                        $rootScope.avs_box.show();
                      } else if (result.suggested_auth =="PIN") {
                        $rootScope.pin_box.show();   
                      }else if (result.suggested_auth == "GTB_OTP") {  
                      $rootScope.flwref=result.flwRef || result.flwRef;   
                      $rootScope.otp_box.show();          
                      }
              }else if(result.chargeResponseCode=="02"){
                $rootScope.pin_box.hide();   
                $rootScope.avs_box.hide(); 
                  $rootScope.flwref=result.flwRef;  
                  if(result.authurl != 'N/A' && result.authModelUsed == "VBVSECURECODE") {
                    $rootScope.pay_url=result.authurl;
                    console.log("\n\nopening url:\n\n");
                    console.log($rootScope.pay_url);
                    $rootScope.web_box.show();          
                  }else{
                    $rootScope.otp_box.show();
                  } 
          }else{
          $ionicPopup.alert({
            template: response.message
          });
          $rootScope.clear();
          $rootScope.refresh_profile();
          $rootScope.toastr(response.data.data.message);
        }
      }else{
        $ionicPopup.alert({
          template: response.message
        });
      }
        }).error(function(error){
        $rootScope.hide();
        console.log(error);
    });
};






$rootScope.select_card=function(card){
  $rootScope.selected_asset=null;
  $timeout(function(){
  $rootScope.selected_asset=card;
  $rootScope.check_rates(card);
  $rootScope.sell_giftcard_box.show();
},1000);
}





$rootScope.sell_giftcard=function(card){
  $rootScope.selected_asset=null;
  $timeout(function(){
  $rootScope.selected_asset=card;
  $rootScope.check_rates(card);
  $rootScope.sell_giftcard_box.show();
},1000);
}



$rootScope.buy_giftcard=function(card){
  $rootScope.selected_asset=null;
  $timeout(function(){
  $rootScope.selected_asset=card;
  $rootScope.buy_giftcard_box.show();
},1000);
}



$rootScope.card_identity=function(number){
  x=parseInt(number[0]+number[1]);
  console.log(x);
  if(x==56 || x==55 || x==54 || x==53 || x==52 || x==51){
    $rootScope.card_type="mastercard";
    console.log($rootScope.card_type);
  }else if(x==47 || x==42 || x==41){
    $rootScope.card_type="visa";
    console.log($rootScope.card_type);
  }else if(x==50){
    $rootScope.card_type="verve";
    console.log($rootScope.card_type);
  }else{
    $rootScope.card_type=null;
  }
};






$rootScope.quantity_minus=function(){
  this.card.quantity--;
};
$rootScope.quantity_plus=function(){
  this.card.quantity++;
};

$rootScope.select_photos=function(f){
$rootScope.files=f;
};

$rootScope.dropfilter="";

$rootScope.filter_status=function(s){
console.log(s);
if(s){
$rootScope.dropfilter=s;
}else{
$rootScope.dropfilter="";
}
}



 
$rootScope.sell_asset=function(asset){
  asset.o_id=$rootScope.user.o_id;
  var formData = new FormData();
  $rootScope.show();
  formData.append('files',$rootScope.files);
          Upload.upload({
            url: Config.API+"users/giftcard/sell",
            headers: {'Content-Type' : 'multipart/form-data'},
            data: asset
          }).then(function(resp) {
              var Data=resp.data;
                  if(Data.status==true){
                          var dc={
                                  transaction_id:Data.data,
                                  cards:[]
                              };                           
                          if(asset.cards){
                          for(var i=0;i < asset.cards.length;i++){
                              if(asset.cards[i].quantity > 0){    
                                      var gc={
                                          amount:asset.cards[i].amount,
                                          quantity:asset.cards[i].quantity,
                                          total:asset.cards[i].total
                                      }
                                      dc.cards.push(gc);
                              }
                              }
                          }
                          console.log("updating trx:");
                          console.log(dc);
                      Giftcards.update_sales(dc).success(function(Data){
                        $rootScope.hide();
                        $rootScope.sell_giftcard_box.hide();
                        $ionicPopup.alert({
                          template:Data.message
                        });
                        $rootScope.refresh_profile();
                      });
                  }else{ 
                    $rootScope.hide();
                    $ionicPopup.alert({
                    template:response.data.message
                  });
                  $rootScope.error=Data.message;
                  }
        });
};








$rootScope.otp_validator=function(otp){ 
    $rootScope.show();
    var otp_data={
        m_id:$rootScope.user.m_id,
        transaction_reference: $rootScope.flwref, 
        otp: otp
    };
    account.otp_validator(otp_data).success(function(response){
      $rootScope.hide();
      $scope.otp_box.hide();
      if(response.status==true){
        $rootScope.refresh_profile();
        $scope.clear();
        $ionicPopup.alert({
          template: response.message
        });
      }else{ 
        $ionicPopup.alert({
        template:response.data.data.message
      });
      }
    }).error(function(error){
      $rootScope.hide();
      $ionicPopup.alert({
        template: "error in connection"
      });
      console.log(error);
  });
};








$scope.findcardpos=function(card){
for (var i=0; i < $rootScope.user.cards.length; i++) {
if ($rootScope.user.cards[i].number === card.number) {
return i;
}
}
};










$scope.deletecard=function(card){
$ionicPopup.show({
template: 'Are you sure you want to remove this card?',
title: 'Delete Card',
scope: $rootScope,
buttons: [
{ text: 'Cancel' },
{
  text: '<b>Delete</b>',
  type: 'button-assertive',
  onTap: function(e) {    
    $rootScope.show();        
    $rootScope.user.cards.splice($scope.findcardpos(card),1);
    $rootScope.account_update($rootScope.user);
    $timeout(function(){
       $rootScope.refresh_profile();
    });
    $rootScope.hide();    
  }
}
]
});
};


Giftcards.all().success(function(Data){
     if(Data.status==true){
       $rootScope.assets=Data.data;
    }else{
      $ionicPopup.alert({template:Data.message});
    }
  }).error(function(){
    $ionicPopup.alert({template:"Network Error please try again later"});
  });  
















  $rootScope.chart ={
    type: 'bubble',
  labels: ["", "", "", "", "", ""],
  series: ["Today's Sales"],
  data: [
    [
    $rootScope.HourSales("6:00","10:00"),
    $rootScope.HourSales("10:00","14:00"),
    $rootScope.HourSales("14:00","18:00"),
    $rootScope.HourSales("18:00","22:00"),
    $rootScope.HourSales("22:00","24:00"),
    $rootScope.HourSales("24:00","00:00")
  ]
  // [65, 59, 80, 81, 56, 55, 40]
  ],
  options :{
    showTooltips:false,
    scales: {
      y: {
          stacked: true
      }
    }
  }
}









$rootScope.confirm_order=function(transaction) {
  $rootScope.demand_pin().then(function(auth){
  if(auth){
     $rootScope.show();
     transaction.o_id=$rootScope.user.o_id;
     MP.confirm_order(transaction).success(function(Data){
     $rootScope.hide();
     $ionicPopup.alert({template:Data.message});
     if(Data.status==true){
      $ionicPopup.alert({template:Data.message});
      $rootScope.refresh_orders();
      $rootScope.refresh_profile();
      $rootScope.order_box.hide();
     }
       }).error(function () {
         $rootScope.hide();
         $ionicPopup.alert({template:"error in connection, check your internet connection"});
       });
      }
    });
 };






 $rootScope.approve_order=function(transaction) {
  $rootScope.demand_pin().then(function(auth){
  if(auth){
  $rootScope.show();
  transaction.o_id=$rootScope.user.o_id;
  MP.approve_order(transaction).success(function(Data){
  $rootScope.hide();
  $ionicPopup.alert({template:Data.message});
  if(Data.status==true){
   $ionicPopup.alert({template:Data.message});
   $rootScope.refresh_orders();
   $rootScope.refresh_profile();
   $rootScope.order_box.hide();
  }
    }).error(function () {
      $rootScope.hide();
      $ionicPopup.alert({template:"error in connection, check your internet connection"});
    });
  }
});
};








$rootScope.report_order=function(transaction) {
  $rootScope.show();
  transaction.o_id=$rootScope.user.o_id;
  MP.report_order(transaction).success(function(Data){
  $rootScope.hide();
  $ionicPopup.alert({template:Data.message});
  if(Data.status==true){
   $ionicPopup.alert({template:Data.message});
   $rootScope.refresh_orders();
   $rootScope.refresh_profile();
   $rootScope.order_box.hide();
  }
    }).error(function () {
      $rootScope.hide();
      $ionicPopup.alert({template:"error in connection, check your internet connection"});
    });
};






$rootScope.cancel_order=function(transaction) {
  $rootScope.show();
  if(transaction.confirmed){
    $rootScope.hide();
    $ionicPopup.alert({template:"You can't cancel order at this time, try reporting this order"});
  }else{
  MP.cancel_order(transaction).success(function(Data){
    $rootScope.refresh_orders();
    $rootScope.refresh_profile();
  $rootScope.hide();
  $ionicPopup.alert({template:Data.message});
  if(Data.status==true){
   $rootScope.order_box.hide();
  }
    }).error(function () {
      $rootScope.hide();
      $ionicPopup.alert({template:"error in connection, check your internet connection"});
    });
  }
};













});

