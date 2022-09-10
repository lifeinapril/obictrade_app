
app.filter('unique', function() {
   return function(collection, keyname) {
     var output = [],
       keys = [];
 
     angular.forEach(collection, function(item) {
       var key = item[keyname];
       if(keys.indexOf(key) === -1) {
         keys.push(key);
         output.push(item);
       }
     });
     return output;
   };
 });



 app.filter('order_method', function($rootScope) {
  return function (arr) {
    var l = 0;
    var r=[];
    if(arr){
       l = arr.length;
    }
    for(i=0; i<l;i++) {
      var o=arr[i];
      if($rootScope.cart.delivery && o.delivery){
        r.push(o);
      }
      else if($rootScope.cart.pickup && o.pickup){
        r.push(o);
      }
    }
    return r;
  };
})


 app.filter('unique_o', function() {
  return function (arr, field) {
    var o = {}, i, r = [];
    if(arr){
      var l = arr.length;
    }
    for(i=0; i<l;i+=1) {
      if(arr[i]['data']){
        o[arr[i]['data'][field]] = arr[i];
      }
    }
    for(i in o) {
      r.push(o[i]);
    }
    return r;
  };
})

app.filter('filterworks', function() {
  return function(collection, service) {
    var output = [];
    angular.forEach(collection, function(item) {
      for(var i=0; i < item.services.length;i++){
        if(item.services[i].name==service.name && item.services[i].type==service.type || item.services[i].price==service.price) {
          output.push(item);
       }
      }
    });
    return output;
  };
});
 
app.filter('unique_numbers', function() {
  return function(projects) {
    var newprojects =[];
    projects.forEach(function(project){
      if(newprojects.indexOf(project) === -1) {
        newprojects.push(project);
      }
    });
    return newprojects;
  };
});
 
 app.filter('uniquechild', function() {
   return function(collection, keyname,child) {
     var output = [],
       keys = [];
 
     angular.forEach(collection, function(item) {
       if(item[keyname][child]){
         var key = item[keyname][child];
         if(keys.indexOf(key) === -1) {
           keys.push(key);
           output.push(item);
         }
       }
     });
 
     return output;
   };
 });
 
 app.filter('capitalize', function() {
   return function(input) {
     return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
   }
 });
 
 
 
 
 app.filter('removeSpaces', [function() {
   return function(string) {
       if (!angular.isString(string)) {
           return string;
       }
       return string.replace(/[\s]/g, '').toLowerCase().trim().replace(/[^a-zA-Z ]/g, "");
   };
 }]);
 
 




 
 
app.filter('currency', function($rootScope){
  return function(input){
      if(isNaN(input)){
        return input;
      } else {
        var symbol = ' ₦ ';
        var country=null;
        if($rootScope.user){
          var country=$rootScope.user.country;
        }
        if(country){
          if(country.note){
          var symbol = country.note || ' ₦ ';
          }
          if(country.rates){
            input=input/country.rates;
          }
        }
          input=Math.round(input * 100) / 100;
          return symbol + thousands_separators(input);
        }
      };
});




 
 
 
 app.filter('uniqueb', function() {
   return function(collection, keyname,key2) {
     var output = [],
       keys = [];
 
     angular.forEach(collection, function(item) {
       var key = item[keyname][key2];
       if(keys.indexOf(key) === -1) {
         keys.push(key);
         output.push(item);
       }
     });
 
     return output;
   };
 });
 