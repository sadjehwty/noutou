angular
  .module('person')
  .controller("IndexController", function ($scope, Person, supersonic) {
    $scope.persons = null;
    $scope.showSpinner = true;

    Person.all().whenChanged( function (persons) {
        $scope.$apply( function () {
          $scope.persons = persons;
          $scope.showSpinner = false;
        });
    });
  });