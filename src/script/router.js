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
			//controller: "lowFamilyInfoCtro",
			views: {
				'': {
					templateUrl: '../template/lowFamily/lowFamilyInfo/container.html'
				},
				'form@lowFamily.baseInfo': {
					templateUrl: '../template/lowFamily/lowFamilyInfo/baseInfo.html'
				},
				'menu@lowFamily.baseInfo': {
					templateUrl: '../template/lowFamily/lowFamilyInfo/menu.html'
				}
			}
		})
		//贫困户家庭成员
		.state('lowFamily.familyMember', {
			url: '/low_family_family_member?id&type',
			//			controller: "order_list",
			//			templateUrl: '../template/lowFamily/lowFamilyInfo/familyInfo.html'
			views: {
				'': {
					templateUrl: '../template/lowFamily/lowFamilyInfo/container.html'
				},
				'form@lowFamily.familyMember': {
					templateUrl: '../template/lowFamily/lowFamilyInfo/familyInfo.html'
				},
				'menu@lowFamily.familyMember': {
					templateUrl: '../template/lowFamily/lowFamilyInfo/menu.html'
				}
			}
		})
		.state('addFamilyMember', {
			url: '/add_family_member?id&type',
			//			controller: "order_list",
			templateUrl: '../template/lowFamily/addFamilyMember.html'
		})
		//致贫原因
		.state('lowFamily.causes', {
			url: '/low_family_Causes?id&type',
			//			controller: "order_list",
			//			templateUrl: '../template/lowFamily/lowFamilyInfo/povertyCauses.html',
			views: {
				'': {
					templateUrl: '../template/lowFamily/lowFamilyInfo/container.html'
				},
				'form@lowFamily.causes': {
					templateUrl: '../template/lowFamily/lowFamilyInfo/povertyCauses.html'
				},
				'menu@lowFamily.causes': {
					templateUrl: '../template/lowFamily/lowFamilyInfo/menu.html'
				}
			}
		})
		//收入
		.state('lowFamily.income', {
			url: '/low_family_income?id&type',
			//			controller: "order_list",
			//			templateUrl: '../template/lowFamily/lowFamilyInfo/income.html',
			views: {
				'': {
					templateUrl: '../template/lowFamily/lowFamilyInfo/container.html'
				},
				'form@lowFamily.income': {
					templateUrl: '../template/lowFamily/lowFamilyInfo/income.html'
				},
				'menu@lowFamily.income': {
					templateUrl: '../template/lowFamily/lowFamilyInfo/menu.html'
				}
			}
		})
		//生活条件
		.state('lowFamily.lifeCondition', {
			url: '/low_family_life_condition?id&type',
			//			controller: "order_list",
			//			templateUrl: '../template/lowFamily/lowFamilyInfo/lifeCondition.html'
			views: {
				'': {
					templateUrl: '../template/lowFamily/lowFamilyInfo/container.html'
				},
				'form@lowFamily.lifeCondition': {
					templateUrl: '../template/lowFamily/lowFamilyInfo/lifeCondition.html'
				},
				'menu@lowFamily.lifeCondition': {
					templateUrl: '../template/lowFamily/lowFamilyInfo/menu.html'
				}
			}
		})
		//易地搬迁需求
		.state('lowFamily.plantRelocation', {
			url: '/low_family_plant_relocation?id&type',
			//			controller: "order_list",
			//			templateUrl: '../template/lowFamily/lowFamilyInfo/plantRelocation.html'
			views: {
				'': {
					templateUrl: '../template/lowFamily/lowFamilyInfo/container.html'
				},
				'form@lowFamily.plantRelocation': {
					templateUrl: '../template/lowFamily/lowFamilyInfo/plantRelocation.html'
				},
				'menu@lowFamily.plantRelocation': {
					templateUrl: '../template/lowFamily/lowFamilyInfo/menu.html'
				}
			}
		})
		//帮扶责任人
		.state('lowFamily.responsibilityPerson', {
			url: '/low_family_responsibility_person?id&type',
			//			controller: "order_list",
			//			templateUrl: '../template/lowFamily/lowFamilyInfo/responsibilityPerson.html'
			views: {
				'': {
					templateUrl: '../template/lowFamily/lowFamilyInfo/container.html'
				},
				'form@lowFamily.responsibilityPerson': {
					templateUrl: '../template/lowFamily/lowFamilyInfo/responsibilityPerson.html'
				},
				'menu@lowFamily.responsibilityPerson': {
					templateUrl: '../template/lowFamily/lowFamilyInfo/menu.html'
				}
			}
		})
		.state('addDutyPerson', {
			url: '/add_family_member?id&type',
			//			controller: "order_list",
			templateUrl: '../template/lowFamily/addDutyPerson.html'
		})
		//帮扶成效
		.state('lowFamily.povertyAlleviationResult', {
			url: '/low_family_poverty_alleviation_result?id&type',
			//			controller: "order_list",
			//			templateUrl: '../template/lowFamily/lowFamilyInfo/povertyAlleviationResult.html'
			views: {
				'': {
					templateUrl: '../template/lowFamily/lowFamilyInfo/container.html'
				},
				'form@lowFamily.povertyAlleviationResult': {
					templateUrl: '../template/lowFamily/lowFamilyInfo/povertyAlleviationResult.html'
				},
				'menu@lowFamily.povertyAlleviationResult': {
					templateUrl: '../template/lowFamily/lowFamilyInfo/menu.html'
				}
			}
		})
		//自然村 
		.state('naturalVillage', {
			url: '/natural_village?id&type',
			controller: "naturalVillage",
			templateUrl: '../template/natural/naturalVillage.html'
		})

});