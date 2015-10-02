angular
  .module('journeyperson')
  .controller("ShowController", function ($scope, Journeyperson, supersonic) {
    $scope.journeyperson = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;

    var _refreshViewData = function () {
      Journeyperson.find($scope.dataId).then( function (journeyperson) {
        $scope.$apply( function () {
          $scope.journeyperson = journeyperson;
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
      $scope.journeyperson.delete().then( function () {
        supersonic.ui.layers.pop();
      });
    }
  });