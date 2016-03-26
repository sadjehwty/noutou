angular
  .module('journeyspeople')
  .controller("NewController", function ($scope, Journeyspeople, supersonic) {
    $scope.journeyspeople = {};

    $scope.submitForm = function () {
      $scope.showSpinner = true;
      newjourneyspeople = new Journeyspeople($scope.journeyspeople);
      newjourneyspeople.save().then( function () {
        supersonic.ui.modal.hide();
      });
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });