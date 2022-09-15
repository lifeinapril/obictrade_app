const error_connection="Check your internet connection";
const connection_error=error_connection;


function thousands_separators(num)
  {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }


    app.factory('MP',function($http,Config){
      return  { 
      spotlight: function(){
        return $http.get(Config.API+ "users/market/spotlight");
       },
       topten: function(coin){
         return $http.get(Config.API+"market/topten/"+ coin);
       },
       buy: function(coin){
         return $http.post(Config.API+"market/buy",coin);
       },
       sell: function(coin){
         return $http.post(Config.API+"market/sell",coin);
       },
       affiliate_buy: function(coin){
         return $http.post(Config.API+"market/affiliate/buy",coin);
       },
       affiliate_sell: function(coin){
         return $http.post(Config.API+"market/affiliate/sell",coin);
       },
       confirm_order: function(coin){
         return $http.post(Config.API+"market/orders/confirm",coin);
       },
      approve_order: function(coin){
         return $http.post(Config.API+"market/orders/approve",coin);
       },
       cancel_order: function(coin){
         return $http.post(Config.API+"market/orders/cancel",coin);
       },
       report_order: function(coin){
         return $http.post(Config.API+"market/orders/report",coin);
       }
      }          
      });



    app.factory('Giftcards',function($http,Config){
      return  { 
        all: function(){
          return $http.get(Config.API+ "users/giftcard/all");
        },
        info: function(id){
          return $http.get(Config.API+"users/giftcard/"+ id);
        },
        sell: function(asset){
          return $http.post(Config.API+"users/giftcard/sell",asset);
        },
        update_sales: function(data){
        return $http.post(Config.API + "users/update_transaction",data);
        }
      }          
      });


  
app.factory('account',function($http,Config){
  return  {
    login: function(v){
      return  $http.post(Config.API + 'users/login', v);
    }, 
    banks: function(v){
      return $http.get(Config.API + "users/all_banks");
    },
    register: function(v){
      return  $http.post(Config.API + 'users/register', v);
    },
    auth: function(v){
      return  $http.post(Config.API + 'users/auth', v);
    },
    update: function(v){
      return  $http.post(Config.API + 'users/update_profile', v);
    },
    email_validation: function(v){
      return  $http.post(Config.API + 'users/email_auth', v);
    },
    phone_validation: function(v){
      return  $http.post(Config.API + 'users/phone_auth', v);
    },
    join_affiliate: function(p){
      return $http.post(Config.API + "users/join_affiliate",p);
    },
    info: function(p){
      return $http.get(Config.API + "users/info/"+p);
    },
    notifications: function(p){
      return $http.get(Config.API + "users/notifications/"+p);
    },
    read_notes: function(p){
      return $http.get(Config.API + "users/read_notes/"+p);
    },
    check_username:function(data){
      return  $http.post(Config.API + 'users/check_username', data);
    },
    add_address:function(data){
      return  $http.post(Config.API + 'users/add_address', data);
    },
    data: function(p){
      return $http.get(Config.API + "users/user_data/"+p);
    },
    financial_history:function(id){
      return  $http.get(Config.API + 'users/financial_history/'+id);
    },
    reset: function(data){
      return $http.get(Config.API + "users/user_reset/"+data);
    },
    tutorials: function(){
      return $http.get(Config.API + "users/tutorials");
    },
    finance: function(data){
      return $http.get(Config.API + "users/finance/"+data);
    },
    change_password: function(data){
      return $http.post(Config.API + "users/change_password",data);
    },
    addcard: function(data){
      return $http.post(Config.API +  "users/addcard",data);
    },
    addbank: function(data){
      return $http.post(Config.API +  "users/addbank",data);
    },
    verify_bank: function(data){
      return $http.post(Config.API +  "users/verify_bank",data);
    },
    otp_validator:function(data){
      return $http.post(Config.API +  "users/otp_validator",data);
    },
    find_username:function(data){
      return $http.get(Config.API +  "users/find_username/"+data);
    },
    resend_code:function(data){
      return $http.get(Config.API +  "users/resend_code/"+data);
    },
    delete_contact:function(data){
      return $http.post(Config.API +  "users/remove_contact",data);
    },
    add_contact:function(data){
      return $http.post(Config.API +  "users/add_contact",data);
    },
    contacts:function(data){
      return $http.get(Config.API +  "users/contacts/"+data);
    },
    connections:function(data){
      return $http.get(Config.API +  "users/connections/"+data);
    },
    sales:function(data){
      return $http.get(Config.API +  "users/transactions/"+data);
    },
    search:function(data){
      return $http.get(Config.API +  "users/search/"+data);
    },
    change_phone:function(data){
      return $http.post(Config.API +  "users/update_phone",data);
    },
    change_email:function(data){
      return $http.post(Config.API +  "users/update_email",data);
    }
  };
})




.factory('wallet',function($http,Config){
  return  {
    cashout: function(data){
      return $http.post(Config.API + "users/cashout",data);
    },
    burnout: function(data){
      return $http.post(Config.API + "users/burnout",data);
    },
    fund: function(data){
      return $http.post(Config.API + "users/fund_wallet",data);
    },
    fund_peer: function(data){
      return $http.post(Config.API + "users/fund_peer",data);
    },
    send_money: function(data){
      return $http.post(Config.API + "users/transfer",data);
    },
    direct_send: function(data){
      return $http.post(Config.API + "users/direct_send",data);
    },
    p2p:function(){
      return $http.get(Config.API + "users/peer");
    }
  };
})









.factory('Crypto',function($http,Config){
  return  {
    connect: function(){
      return $http.get(Config.API + "users/coin/connect");
    },
    rates: function(coin){
      return $http.get(Config.API + "rates/"+coin);
    },
    start_selling: function(data){
      return $http.post(Config.API + "users/coin/sell",data);
    },
    stop_selling: function(data){
      return $http.post(Config.API + "users/coin/stop_selling",data);
    },
    start_buying: function(data){
      return $http.post(Config.API + "users/coin/buy",data);
    },
    stop_buying: function(data){
      return $http.post(Config.API + "users/coin/stop_buying",data);
    }
  };
});





























