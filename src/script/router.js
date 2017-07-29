var myApp = angular.module("myApp", ['ui.router', 'ngCookies', 'ngFileUpload']);

//配置路由
myApp.config(function($httpProvider, $stateProvider, $urlRouterProvider) {
	//添加拦截器
	//	$httpProvider.interceptors.push("myInterceptor"); 
	//设置默认的加载模块
	$urlRouterProvider.otherwise('/low_family_list');
	$stateProvider
		//贫困户列表
		.state('lowFamilyList', {
			url: '/low_family_list',
			controller: "lowFamilyListCtro",
			templateUrl: '../template/lowFamily/lowFamilyList.html'
		})
		//贫困户草稿列表
		.state('lowFamilyDraft', {
			url: '/low_family_draft',
			controller: "lowFamilyDraftCtro",
			templateUrl: '../template/lowFamily/povertyDraft.html'
		})
		.state('lowFamily', {
			url: '/low_family',
			controller: "lowFamilyInfoCtro",
			abstract: true,
			/*controller: function($state) {
				$state.go('lowFamily.baseInfo'); //默认显示第一个tab
			},*/
			templateUrl: '../template/lowFamily/lowFamilyInfo.html'
		})
		//贫困户基本信息
		.state('lowFamily.baseInfo', {
			url: '/low_family_base?id&type',
			//			controller: "lowFamilyInfoCtro",
			templateUrl: '../template/lowFamily/lowFamilyInfo/baseInfo.html'
		})
		//贫困户家庭成员
		.state('lowFamily.familyMember', {
			url: '/low_family_family_member?id&type',
			//			controller: "order_list",
			templateUrl: '../template/lowFamily/lowFamilyInfo/familyInfo.html'
		})
		//致贫原因
		.state('lowFamily.causes', {
			url: '/low_family_Causes?id&type',
			//			controller: "order_list",
			templateUrl: '../template/lowFamily/lowFamilyInfo/povertyCauses.html'
		})
		//收入
		.state('lowFamily.income', {
			url: '/low_family_income?id&type',
			//			controller: "order_list",
			templateUrl: '../template/lowFamily/lowFamilyInfo/income.html'
		})
		//生活条件
		.state('lowFamily.lifeCondition', {
			url: '/low_family_life_condition?id&type',
			//			controller: "order_list",
			templateUrl: '../template/lowFamily/lowFamilyInfo/lifeCondition.html'
		})
		//易地搬迁需求
		.state('lowFamily.plantRelocation', {
			url: '/low_family_plant_relocation?id&type',
			//			controller: "order_list",
			templateUrl: '../template/lowFamily/lowFamilyInfo/plantRelocation.html'
		})
		//帮扶责任人
		.state('lowFamily.responsibilityPerson', {
			url: '/low_family_responsibility_person?id&type',
			//			controller: "order_list",
			templateUrl: '../template/lowFamily/lowFamilyInfo/responsibilityPerson.html'
		})
		//帮扶成效
		.state('lowFamily.povertyAlleviationResult', {
			url: '/low_family_poverty_alleviation_result?id&type',
			//			controller: "order_list",
			templateUrl: '../template/lowFamily/lowFamilyInfo/povertyAlleviationResult.html'
		})
});