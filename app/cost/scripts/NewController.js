angular
  .module('cost')
  .controller("NewController", function ($scope, Cost, supersonic) {
    $scope.cost = {};
    $scope.showSpinner = true;
    
    supersonic.ui.views.current.params.onValue( function (values) {
      $scope.cost = {id_journey: values.id};
      $scope.showSpinner = false;
    });
    
    $scope.submitForm = function () {
      $scope.showSpinner = true;
      newcost = new Cost($scope.cost);
      newcost.save().then( function () {
        supersonic.ui.modal.hide();
        _refreshViewData();
      });
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });