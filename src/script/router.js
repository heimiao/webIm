var myApp = angular.module("myApp", ['ui.router', 'ngCookies', 'ngFileUpload']);
//配置路由
myApp.config(function($httpProvider, $stateProvider, $urlRouterProvider) {
	//添加拦截器
	$httpProvider.interceptors.push("myInterceptor");
	//设置默认的加载模块
	$urlRouterProvider.otherwise('/login');
	$stateProvider
		//贫困户列表
		.state('home', {
			url: '/home',
			controller: "home",
			templateUrl: 'dist/template/home.html'
		})
		// 登录
		.state('login', {
			url: '/login',
			controller: "login",
			templateUrl: 'dist/template/login.html'
		})
});