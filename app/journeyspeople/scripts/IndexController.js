angular
  .module('journeyspeople')
  .controller("IndexController", function ($scope, Journeyspeople, supersonic) {
    $scope.journeyspeoples = null;
    $scope.showSpinner = true;

    Journeyspeople.all().whenChanged( function (journeyspeoples) {
        $scope.$apply( function () {
          $scope.journeyspeoples = journeyspeoples;
          $scope.showSpinner = false;
        });
    });
  });