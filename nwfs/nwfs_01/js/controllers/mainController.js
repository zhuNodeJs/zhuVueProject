angular.module('workflow')
  .controller('workflowListCtrl', ['$scope', function($scope) {
  		
  		
      //顶部返回
      $scope.goBack = function () {
      	if (!isAndroid) {
                    window.location.href = "js-call://IOS/NavCallBack";
                } else {
                    window.androidApi.backCalls();
                }
      }
  }]);
