angular
  .module('journeyspeople')
  .controller("EditController", function ($scope, Journeyspeople, supersonic) {
    $scope.journeyspeople = null;
    $scope.showSpinner = true;

    // Fetch an object based on id from the database
    Journeyspeople.find(steroids.view.params.id).then( function (journeyspeople) {
      $scope.$apply(function() {
        $scope.journeyspeople = journeyspeople;
        $scope.showSpinner = false;
      });
    });

    $scope.submitForm = function() {
      $scope.showSpinner = true;
      $scope.journeyspeople.save().then( function () {
        supersonic.ui.modal.hide();
      });
    }

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });
