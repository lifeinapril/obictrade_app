app.config(function($stateProvider, $urlRouterProvider,$httpProvider,Config,$ionicConfigProvider,$httpProvider,ChartJsProvider) {
    $ionicConfigProvider.views.forwardCache(true);
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.headers.common.obickey = Config.token;
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
  ChartJsProvider.setOptions({
    chartColors: ['#FFA500', '#FFA500'],
    responsive: false
  });
  
  ChartJsProvider.setOptions('line', {
    showLines: true
  });
  
  
      $ionicConfigProvider.tabs.position('bottom');
      $ionicConfigProvider.navBar.alignTitle('center');
  
  
      $stateProvider
  
  
  
      .state('splash', {
        url: '/splash',
        templateUrl: 'templates/splash.html',
        controller:"splash"
      })
  
  
      
  
  
      .state('congrats', {
        url: '/congrats',
        templateUrl: 'templates/congrats.html',
        controller:"Auth"
      })
  
  
      .state('start', {
        url: '/start',
        templateUrl: 'templates/start.html',
        controller:"Auth"
      })
  
      
      .state('send_money', {
        url: '/send_money',
        templateUrl: 'templates/send_money.html',
        controller:"finance"
      })
  
  
      .state('auth2', {
        url: '/auth2',
        templateUrl: 'templates/auth2.html',
        controller:"Auth"
      })
  
  
      .state('auth', {
        url: '/auth',
        templateUrl: 'templates/auth.html',
        controller:"Auth"
      })
  
      .state('account', {
        url: '/account',
        templateUrl: 'templates/account.html',
        controller:"Auth"
      })
  
  
  

      .state('legal', {
        url: '/legal',
        templateUrl: 'templates/legal.html',
        controller:"profile"
      })
  
  

      .state('verification', {
        url: '/verification',
        templateUrl: 'templates/verification.html',
        controller:"profile"
      })


      .state('gift', {
        url: '/gift',
        templateUrl: 'templates/gift.html',
        controller:"finance"
      })

      .state('verify_username', {
        url: '/verify_username',
        templateUrl: 'templates/verify_username.html',
        controller:"profile"
      })

      .state('verify_email', {
        url: '/verify_email',
        templateUrl: 'templates/verify_email.html',
        controller:"profile"
      })


      .state('verify_phone', {
        url: '/verify_phone',
        templateUrl: 'templates/verify_phone.html',
        controller:"profile"
      })
  
  
  
      .state('code', {
        url: '/code',
        templateUrl: 'templates/code.html',
        controller:"Auth"
      })
  
  
      .state('code2', {
        url: '/code2',
        templateUrl: 'templates/code2.html',
        controller:"profile"
      })
  
  
      .state('register', {
        url: '/register',
        templateUrl: 'templates/register.html',
        controller:"Auth"
      })
  
  
  
      .state('password', {
        url: '/password',
        templateUrl: 'templates/password.html',
        controller:"Auth"
      })
  
  
      .state('welcome', {
        url: '/welcome',
        templateUrl: 'templates/welcome.html',
        controller:"profile"
      })
  
      .state('contacts', {
        url: '/contacts',
        templateUrl: 'templates/contacts.html',
        controller:"profile"
      })
      .state('connections', {
        url: '/connections',
        templateUrl: 'templates/connections.html',
        controller:"profile"
      })
  
      .state('add_contact', {
        url: '/add_contact',
        templateUrl: 'templates/add_contact.html',
        controller:"profile"
      })


      .state('add_bank', {
        url: '/add_bank',
        templateUrl: 'templates/add_bank.html',
        controller:"finance"
      })


      .state('giftcards', {
        url: '/giftcards',
        templateUrl: 'templates/giftcards.html',
        controller:"finance"
      })


  
        .state('reset', {
          url: '/reset',
          templateUrl: 'templates/reset.html',
          controller:'Auth'
        })
       
       

        .state('cards', {
          url: '/cards',
          templateUrl: 'templates/cards.html',
          controller:'finance'
        })
  
  
        .state('thankyou', {
          url: '/thankyou',
          templateUrl: 'templates/thankyou.html'
        })
  
        .state('resetdone', {
          url: '/resetdone',
          templateUrl: 'templates/resetdone.html'
        })
  

        .state('security', {
          url: '/security',
          templateUrl: 'templates/security.html',
          controller:"profile"
        })
    

    
        .state('obic_profile', {
          url: '/obic_profile/:id',
          templateUrl: 'templates/obic_profile.html',
          controller:"finance"
        })
    

    

       
    
        
    
    
        .state('edit_profile', {
          url: '/profile/edit',
          templateUrl: 'templates/edit_profile.html',
          controller:'profile'
        })
  
      .state('settings', {
        url: '/settings',
        templateUrl: 'templates/settings.html',
        controller:'profile'
      })
  
  
        .state('changepassword', {
          url: '/cpassword',
          templateUrl: 'templates/cpassword.html',
          controller:"profile"
        })
  
  
        .state('wallet', {
          url: '/wallet',
          templateUrl: 'templates/wallet.html',
          controller:"finance"
        })
  
  
        .state('transaction_history', {
          url: '/transaction_history',
          templateUrl: 'templates/transaction_history.html',
          controller:"finance"
        })

        
        .state('sales_history', {
          url: '/sales_history',
          templateUrl: 'templates/sales_history.html',
          controller:"finance"
        })
  
       

        .state('crypto_wallet', {
          url: '/crypto_wallet',
              templateUrl: 'templates/crypto_wallet.html',
              controller:"Crypto"
        })

        .state('coin_history', {
          url: '/coin_history',
              templateUrl: 'templates/coin_history.html',
              controller:"Crypto"
        })

        .state('start_buy', {
          url: '/start_buy',
              templateUrl: 'templates/start_buy.html',
              controller:"Crypto"
        })
        .state('start_sell', {
          url: '/start_sell',
              templateUrl: 'templates/start_sell.html',
              controller:"Crypto"
        })


        .state('method', {
          url: '/method',
              templateUrl: 'templates/method.html',
              controller:"finance"
        })

        .state('p2p', {
          url: '/p2p',
              templateUrl: 'templates/p2p.html',
              controller:"finance"
        })

  


        .state('register_affiliate', {
          url: '/register_affiliate',
              templateUrl: 'templates/register_affiliate.html',
              controller:"profile"
        })



        .state('front', {
          url: '/front',
          abstract:true,
          templateUrl: 'templates/front.html'
        })

        
  

  
        .state('front.notification', {
          url: '/notification',
          cache: true,
          views: {
            'front-notification': {
              templateUrl: 'templates/notification.html',
              controller:"profile"
            }
          }
        })
  
  
        .state('affiliate', {
          url: '/affiliate',
              templateUrl: 'templates/affiliate.html',
              controller:"profile"
        })
  

                
  
        .state('front.seller', {
          url: '/seller',
          cache:true,
          views: {
            'front-cards': {
              templateUrl: 'templates/seller.html',
              controller:"finance"
            }
          }
        })
  
        .state('front.marketplace', {
          url: '/marketplace',
          cache:true,
          views: {
            'front-cards': {
              templateUrl: 'templates/marketplace.html',
              controller:"finance"
            }
          }
        })
        .state('front.dashboard', {
          url: '/dashboard',
          cache:false,
          views: {
            'front-cards': {
              templateUrl: 'templates/dashboard.html',
              controller:"finance"
            }
          }
        })
  
        .state('front.cards', {
          url: '/cards',
          cache:true,
          views: {
            'front-cards': {
              templateUrl: 'templates/giftcards.html',
              controller:"finance"
            }
          }
        })
  
  
        .state('front.payment', {
          url: '/payment',
          cache:true,
          views: {
            'front-wallet': {
              templateUrl: 'templates/payment.html',
              controller:"finance"
            }
          }
        })
  
  
  
        .state('front.wallet', {
          url: '/wallet',
          cache:true,
          views: {
            'front-wallet': {
              templateUrl: 'templates/wallet.html',
              controller:"finance"
            }
          }
        })
  
        .state('front.profile', {
          url: '/profile',
          cache:true,
          views: {
            'front-profile': {
              templateUrl: 'templates/profile.html',
              controller:"profile"
            }
          }
        })
  
        .state('front.earnings', {
          url: '/earnings',
          cache:true,
          views: {
            'front-profile': {
              templateUrl: 'templates/earnings.html',
              controller:"finance"
            }
          }
        })
  



        .state('edit_photo', {
          url: '/edit_photo',
              templateUrl: 'templates/edit_photo.html',
              controller:"profile"
        })
        
  
      $urlRouterProvider.otherwise('/splash');
  
    });