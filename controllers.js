angular.module('healthTiles').controller("MainController", 
  function($scope, $rootScope, $sce, tileService){

    $scope.tileSources = [{
      label: "Glucose Readings",
      urls: {
        authorize: "http://health-tiles.github.io/demo-glucose-provider/authorize.html",
        tile: "http://health-tiles.github.io/demo-glucose-provider/tile.html",
        data: null
      }
    },{
      label: "Exercise Log",
      urls: {
        authorize: "http://health-tiles.github.io/demo-glucose-provider/authorize.html",
        tile: "http://health-tiles.github.io/demo-glucose-provider/tile.html",
        data: null
      }
    },{
      label: "Mood Journal",
      urls: {
        authorize: "http://health-tiles.github.io/demo-glucose-provider/authorize.html",
        tile: "http://health-tiles.github.io/demo-glucose-provider/tile.html",
        data: null
      }
    }];

    $scope.tiles = [];

    $rootScope.$on('got-tiles', function(e, tiles){
      console.log("Got tiles", tiles);
      $scope.tiles = tiles;
      tiles.forEach(function(t){
        t.trustedUrl = $sce.trustAsResourceUrl(t.urls.tile);
      })
    });

    $scope.deleteTile = function(t){
      tileService.remove(t);
    }

    $scope.addFromSource = function(t) {
      console.log("Adding known", t);
      tileService.authorize(t);
    }

  }
);
