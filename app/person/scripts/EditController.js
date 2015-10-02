angular
  .module('person')
  .controller("EditController", function ($scope, Person, supersonic) {
    $scope.person = null;
    $scope.showSpinner = true;

    // Fetch an object based on id from the database
    Person.find(steroids.view.params.id).then( function (person) {
      $scope.$apply(function() {
        $scope.person = person;
        $scope.showSpinner = false;
      });
    });

    $scope.submitForm = function() {
      $scope.showSpinner = true;
      $scope.person.save().then( function () {
        supersonic.ui.modal.hide();
      });
    }

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });
