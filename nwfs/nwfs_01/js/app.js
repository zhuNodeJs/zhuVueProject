angular.module('workflow', ['ionic'])
<<<<<<< HEAD
  .config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider',function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    //fix that ion-scroll doesn't work on android.
    $ionicConfigProvider.scrolling.jsScrolling(true);

//  $ionicConfigProvider.platform.android.tabs.style("standard");
//  $ionicConfigProvider.platform.android.tabs.style("backgroundColor", "D4D4D4");
//  $ionicConfigProvider.platform.android.tabs.position("bottom");
    //$ionicConfigProvider.platform.android.views.transition("ios");
    $ionicConfigProvider.platform.android.views.transition("no");

//  $ionicConfigProvider.platform.ios.tabs.style('standard');
//  $ionicConfigProvider.platform.ios.tabs.position('bottom');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');
    
    $stateProvider
    .state('main', {
      url: '/main',
      controller: 'workflowListCtrl',
      templateUrl: './views/templates/main.html'
    })
    
    $urlRouterProvider.otherwise('/main')
  }]);
=======
	.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
		
	})
>>>>>>> 94e09c5a5ea54f93b7910c6e5353596781d1f7a4
