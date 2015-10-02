angular
  .module('journeyperson')
  .controller("NewController", function ($scope, Journeyperson, supersonic) {
    $scope.journeyperson = {};

    $scope.submitForm = function () {
      $scope.showSpinner = true;
      newjourneyperson = new Journeyperson($scope.journeyperson);
      newjourneyperson.save().then( function () {
        supersonic.ui.modal.hide();
      });
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });