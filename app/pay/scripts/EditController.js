angular
  .module('pay')
  .controller("EditController", function ($scope, Pay, supersonic) {
    $scope.pay = null;
    $scope.showSpinner = true;

    // Fetch an object based on id from the database
    Pay.find(steroids.view.params.id).then( function (pay) {
      $scope.$apply(function() {
        $scope.pay = pay;
        $scope.showSpinner = false;
      });
    });

    $scope.submitForm = function() {
      $scope.showSpinner = true;
      $scope.pay.save().then( function () {
        supersonic.ui.modal.hide();
      });
    }

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });
