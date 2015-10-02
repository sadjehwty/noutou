angular
  .module('pay')
  .controller("ShowController", function ($scope, Pay, supersonic) {
    $scope.pay = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;

    var _refreshViewData = function () {
      Pay.find($scope.dataId).then( function (pay) {
        $scope.$apply( function () {
          $scope.pay = pay;
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
      $scope.pay.delete().then( function () {
        supersonic.ui.layers.pop();
      });
    }
  });