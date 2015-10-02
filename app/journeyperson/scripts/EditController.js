angular
  .module('journeyperson')
  .controller("EditController", function ($scope, Journeyperson, supersonic) {
    $scope.journeyperson = null;
    $scope.showSpinner = true;

    // Fetch an object based on id from the database
    Journeyperson.find(steroids.view.params.id).then( function (journeyperson) {
      $scope.$apply(function() {
        $scope.journeyperson = journeyperson;
        $scope.showSpinner = false;
      });
    });

    $scope.submitForm = function() {
      $scope.showSpinner = true;
      $scope.journeyperson.save().then( function () {
        supersonic.ui.modal.hide();
      });
    }

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });
