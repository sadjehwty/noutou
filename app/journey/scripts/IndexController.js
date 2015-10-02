angular
  .module('journey')
  .controller("IndexController", function ($scope, Journey, supersonic) {
    $scope.journeys = null;
    $scope.showSpinner = true;

    Journey.all().whenChanged( function (journeys) {
        $scope.$apply( function () {
          $scope.journeys = journeys;
          $scope.showSpinner = false;
        });
    });
  });