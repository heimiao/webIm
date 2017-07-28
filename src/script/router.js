var myApp = angular.module("myApp", ['ui.router', 'ngCookies', 'ngFileUpload']);

//配置路由
myApp.config(function($httpProvider, $stateProvider, $urlRouterProvider) {
	//添加拦截器
	//	$httpProvider.interceptors.push("myInterceptor"); 
	//设置默认的加载模块
	$urlRouterProvider.otherwise('/low_family_list');
	$stateProvider.state('low_family_list', {
		url: '/low_family_list',
		//		controller: "low_family_list",
		templateUrl: '../template/lowFamily/lowFamilyList.html'
	}).state('low_family_info', {
		url: '/low_family_info',
		//controller: "low_family_info",
		templateUrl: '../template/lowFamily/lowFamilyInfo.html'
	})
});