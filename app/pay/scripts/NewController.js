angular
  .module('pay')
  .controller("NewController", function ($scope, Pay, supersonic) {
    $scope.pay = {};

    $scope.submitForm = function () {
      $scope.showSpinner = true;
      newpay = new Pay($scope.pay);
      newpay.save().then( function () {
        supersonic.ui.modal.hide();
      });
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });