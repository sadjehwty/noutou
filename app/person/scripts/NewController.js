angular
  .module('person')
  .controller("NewController", function ($scope, Person, supersonic) {
    $scope.person = {};

    $scope.submitForm = function () {
      $scope.showSpinner = true;
      newperson = new Person($scope.person);
      newperson.save().then( function () {
        supersonic.ui.modal.hide();
      });
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });