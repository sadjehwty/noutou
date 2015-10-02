angular
  .module('person')
  .controller("ShowController", function ($scope, Person, supersonic) {
    $scope.person = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;

    var _refreshViewData = function () {
      Person.find($scope.dataId).then( function (person) {
        $scope.$apply( function () {
          $scope.person = person;
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
      $scope.person.delete().then( function () {
        supersonic.ui.layers.pop();
      });
    }
  });