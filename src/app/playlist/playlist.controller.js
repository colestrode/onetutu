/*
 * Displays a single playlist
 */
angular.module('onetutu.playlist')
  .controller('PlayListController', function($scope) {
    $scope.playlist = {
      songs: []
    };
  });
