angular
  .module('cost')
  .controller("NewController", function ($scope, Cost, supersonic) {
    $scope.cost = {};

    $scope.submitForm = function () {
      $scope.showSpinner = true;
      newcost = new Cost($scope.cost);
      newcost.save().then( function () {
        supersonic.ui.modal.hide();
      });
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });