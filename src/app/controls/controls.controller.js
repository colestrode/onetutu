angular.module('onetutu.controls')
  .controller('ControlsController', function($scope) {
    $scope.play = function() {
      console.log('Playing!!1');
    };

    $scope.pause = function() {
      console.log('Y U NO PLAY');
    };

    $scope.stop = function() {
      console.log('Can\'t stop, Don\'t stop');
    };

  });
