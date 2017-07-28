var myApp = angular.module("myApp", ['ui.router', 'ngCookies', 'ngFileUpload']);

//配置路由
myApp.config(function($httpProvider, $stateProvider, $urlRouterProvider) {
	//添加拦截器
	//	$httpProvider.interceptors.push("myInterceptor"); 
	//设置默认的加载模块
	$urlRouterProvider.otherwise('/low_family_list');
	$stateProvider.state('lowFamilyList', {
		url: '/low_family_list',
		controller: "lowFamilyListCtro",
		templateUrl: '../template/lowFamily/lowFamilyList.html'
	}).state('lowFamilyInfo', {
		url: '/low_family_info',
		controller: "lowFamilyInfoCtro",
		templateUrl: '../template/lowFamily/lowFamilyInfo.html'
	})
});