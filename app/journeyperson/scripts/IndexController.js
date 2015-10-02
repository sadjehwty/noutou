angular
  .module('journeyperson')
  .controller("IndexController", function ($scope, Journeyperson, supersonic) {
    $scope.journeypersons = null;
    $scope.showSpinner = true;

    Journeyperson.all().whenChanged( function (journeypersons) {
        $scope.$apply( function () {
          $scope.journeypersons = journeypersons;
          $scope.showSpinner = false;
        });
    });
  });