angular
  .module('pay')
  .controller("IndexController", function ($scope, Pay, supersonic) {
    $scope.pays = null;
    $scope.showSpinner = true;

    Pay.all().whenChanged( function (pays) {
        $scope.$apply( function () {
          $scope.pays = pays;
          $scope.showSpinner = false;
        });
    });
  });