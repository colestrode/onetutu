angular.module('onetutu.library')
  .controller('LibraryController', function($scope) {
    $scope.progress = 0;

    $scope.playlists = [
      {name: 'Amaya Sleepies'},
      {name: 'Dancies'},
      {name: 'Work Out'}
    ];
  });
