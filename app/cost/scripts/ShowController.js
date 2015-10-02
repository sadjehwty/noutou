angular
  .module('cost')
  .controller("ShowController", function ($scope, Cost, supersonic) {
    $scope.cost = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;

    var _refreshViewData = function () {
      Cost.find($scope.dataId).then( function (cost) {
        $scope.$apply( function () {
          $scope.cost = cost;
          $scope.showSpinner = false;
        });
      });
    }

    supersonic.ui.views.current.whenVisible( function () {
      if ( $scope.dataId ) {
        _refreshViewData();
      }
    });

    supersonic.ui.views.current.params.onValue( function (values) {
      $scope.dataId = values.id;
      _refreshViewData();
    });

    $scope.remove = function (id) {
      $scope.showSpinner = true;
      $scope.cost.delete().then( function () {
        supersonic.ui.layers.pop();
      });
    }
  });