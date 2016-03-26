angular
  .module('journeyspeople')
  .controller("ShowController", function ($scope, Journeyspeople, supersonic) {
    $scope.journeyspeople = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;

    var _refreshViewData = function () {
      Journeyspeople.find($scope.dataId).then( function (journeyspeople) {
        $scope.$apply( function () {
          $scope.journeyspeople = journeyspeople;
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
      $scope.journeyspeople.delete().then( function () {
        supersonic.ui.layers.pop();
      });
    }
  });