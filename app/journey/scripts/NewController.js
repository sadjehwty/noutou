angular
  .module('journey')
  .controller("NewController", function ($scope, Journey, supersonic) {
    $scope.journey = {};

    $scope.submitForm = function () {
      $scope.showSpinner = true;
      newjourney = new Journey($scope.journey);
      newjourney.save().then( function () {
        supersonic.ui.modal.hide();
      });
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });