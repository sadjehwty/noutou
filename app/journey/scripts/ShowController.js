angular
  .module('journey')
  .controller("ShowController", function ($scope, Journey, supersonic) {
    $scope.journey = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;

    var _refreshViewData = function () {
      Journey.find($scope.dataId).then( function (journey) {
        $scope.$apply( function () {
          $scope.journey = journey;
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
      $scope.journey.delete().then( function () {
        supersonic.ui.layers.pop();
      });
    }
  });