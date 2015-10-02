angular
  .module('journey')
  .controller("EditController", function ($scope, Journey, supersonic) {
    $scope.journey = null;
    $scope.showSpinner = true;

    // Fetch an object based on id from the database
    Journey.find(steroids.view.params.id).then( function (journey) {
      $scope.$apply(function() {
        $scope.journey = journey;
        $scope.showSpinner = false;
      });
    });

    $scope.submitForm = function() {
      $scope.showSpinner = true;
      $scope.journey.save().then( function () {
        supersonic.ui.modal.hide();
      });
    }

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });
