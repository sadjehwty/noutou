angular
  .module('cost')
  .controller("EditController", function ($scope, Cost, supersonic) {
    $scope.cost = null;
    $scope.showSpinner = true;

    // Fetch an object based on id from the database
    Cost.find(steroids.view.params.id).then( function (cost) {
      $scope.$apply(function() {
        $scope.cost = cost;
        $scope.showSpinner = false;
      });
    });

    $scope.submitForm = function() {
      $scope.showSpinner = true;
      $scope.cost.save().then( function () {
        supersonic.ui.modal.hide();
      });
    }

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });
