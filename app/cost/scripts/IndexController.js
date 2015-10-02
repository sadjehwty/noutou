angular
  .module('cost')
  .controller("IndexController", function ($scope, Cost, supersonic) {
    $scope.costs = null;
    $scope.showSpinner = true;

    Cost.all().whenChanged( function (costs) {
        $scope.$apply( function () {
          $scope.costs = costs;
          $scope.showSpinner = false;
        });
    });
  });