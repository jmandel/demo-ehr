angular.module('healthTiles').factory('tileService', function($rootScope, $timeout) {

  function relative(url){
    return (window.location.protocol + "//" + window.location.host + window.location.pathname)
      .match(/(.*\/)[^\/]*/)[1] + url;
  }

  var oauthResult = window.location.hash.match(/#\/(.*)/);
  oauthResult = oauthResult ? oauthResult[1] : "";
  oauthResult = oauthResult.split(/&/);

  var newTileAuth = {};
  for (var i = 0; i < oauthResult.length; i++){
    var kv = oauthResult[i].split(/=/);
    if (kv[0].length > 0) {
      newTileAuth[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1]);
    }
  }

  if (newTileAuth.state){
    console.log("nta", newTileAuth);
    var t = JSON.parse(localStorage[newTileAuth.state]);
    t.access_token = newTileAuth.access_token;
    add(t);
    console.log("Added", t);
    delete localStorage[newTileAuth.state];
    window.location.hash="";
  }

  function get(){
    var tiles = JSON.parse(localStorage['tiles'] || "[]");
    return tiles;
  };

  function add(tile){
    var tiles = get().filter(function(t){
      return t.urls.tile !== tile.urls.tile && t.label !== tile.label
    });
    tiles.push(t);
    localStorage['tiles'] = JSON.stringify(tiles);
    $rootScope.$emit('got-tiles', tiles);
  };

  function remove(tile){
    var tiles = get().filter(function(t){
      return t.urls.tile !== tile.urls.tile && t.label !== tile.label
    });
    localStorage['tiles'] = JSON.stringify(tiles);
    $rootScope.$emit('got-tiles', tiles);
  };


  $timeout(function(){
    $rootScope.$emit('got-tiles', get());
  }, 0);

  return {
    remove: remove,
    authorize: function(tile){

      var state = Math.floor(Math.random()*100000000).toString();
      localStorage[state] = JSON.stringify(tile);
      window.location = tile.urls.authorize + 
        "?redirect_uri="+relative("index.html") + "&"+
        "state="+state+"&"+
        "response_type=token";

    }
  }

});

