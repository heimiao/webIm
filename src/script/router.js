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
			//			controller: "lowFamilyListCtro",
			templateUrl: 'dist/template/home.html'
		})
		//贫困户列表
		.state('lowFamilyList', {
			url: '/low_family_list',
			controller: "lowFamilyListCtro",
			templateUrl: 'dist/template/lowFamily/lowFamilyList.html'
		})
		//贫困户草稿列表
		.state('lowFamilyDraft', {
			url: '/low_family_draft',
			controller: "lowFamilyDraftCtro",
			templateUrl: 'dist/template/lowFamily/povertyDraft.html'
		})
		.state('lowFamily', {
			url: '/low_family',
			controller: "lowFamilyInfoCtro",
			abstract: true,
			templateUrl: 'dist/template/lowFamily/lowFamilyInfo.html'
		})
		//贫困户基本信息
		.state('lowFamily.baseInfo', {
			url: '/low_family_base?id&type',
			//controller: "lowFamilyInfoCtro",
			views: {
				'': {
					templateUrl: 'dist/template/lowFamily/lowFamilyInfo/container.html'
				},
				'form@lowFamily.baseInfo': {
					templateUrl: 'dist/template/lowFamily/lowFamilyInfo/baseInfo.html'
				},
				'menu@lowFamily.baseInfo': {
					templateUrl: 'dist/template/lowFamily/lowFamilyInfo/menu.html'
				}
			}
		})
		//贫困户家庭成员
		.state('lowFamily.familyMember', {
			url: '/low_family_family_member?id&type',
			//			controller: "order_list",
			//			templateUrl: 'dist/template/lowFamily/lowFamilyInfo/familyInfo.html'
			views: {
				'': {
					templateUrl: 'dist/template/lowFamily/lowFamilyInfo/container.html'
				},
				'form@lowFamily.familyMember': {
					templateUrl: 'dist/template/lowFamily/lowFamilyInfo/familyInfo.html'
				},
				'menu@lowFamily.familyMember': {
					templateUrl: 'dist/template/lowFamily/lowFamilyInfo/menu.html'
				}
			}
		})
		.state('addFamilyMember', {
			url: '/add_family_member?id&type',
			//			controller: "order_list",
			templateUrl: 'dist/template/lowFamily/addFamilyMember.html'
		})
		//致贫原因
		.state('lowFamily.causes', {
			url: '/low_family_Causes?id&type',
			//			controller: "order_list",
			//			templateUrl: 'dist/template/lowFamily/lowFamilyInfo/povertyCauses.html',
			views: {
				'': {
					templateUrl: 'dist/template/lowFamily/lowFamilyInfo/container.html'
				},
				'form@lowFamily.causes': {
					templateUrl: 'dist/template/lowFamily/lowFamilyInfo/povertyCauses.html'
				},
				'menu@lowFamily.causes': {
					templateUrl: 'dist/template/lowFamily/lowFamilyInfo/menu.html'
				}
			}
		})
		//收入
		.state('lowFamily.income', {
			url: '/low_family_income?id&type',
			//			controller: "order_list",
			//			templateUrl: 'dist/template/lowFamily/lowFamilyInfo/income.html',
			views: {
				'': {
					templateUrl: 'dist/template/lowFamily/lowFamilyInfo/container.html'
				},
				'form@lowFamily.income': {
					templateUrl: 'dist/template/lowFamily/lowFamilyInfo/income.html'
				},
				'menu@lowFamily.income': {
					templateUrl: 'dist/template/lowFamily/lowFamilyInfo/menu.html'
				}
			}
		})
		//生活条件
		.state('lowFamily.lifeCondition', {
			url: '/low_family_life_condition?id&type',
			//			controller: "order_list",
			//			templateUrl: 'dist/template/lowFamily/lowFamilyInfo/lifeCondition.html'
			views: {
				'': {
					templateUrl: 'dist/template/lowFamily/lowFamilyInfo/container.html'
				},
				'form@lowFamily.lifeCondition': {
					templateUrl: 'dist/template/lowFamily/lowFamilyInfo/lifeCondition.html'
				},
				'menu@lowFamily.lifeCondition': {
					templateUrl: 'dist/template/lowFamily/lowFamilyInfo/menu.html'
				}
			}
		})
		//易地搬迁需求
		.state('lowFamily.plantRelocation', {
			url: '/low_family_plant_relocation?id&type',
			//			controller: "order_list",
			//			templateUrl: 'dist/template/lowFamily/lowFamilyInfo/plantRelocation.html'
			views: {
				'': {
					templateUrl: 'dist/template/lowFamily/lowFamilyInfo/container.html'
				},
				'form@lowFamily.plantRelocation': {
					templateUrl: 'dist/template/lowFamily/lowFamilyInfo/plantRelocation.html'
				},
				'menu@lowFamily.plantRelocation': {
					templateUrl: 'dist/template/lowFamily/lowFamilyInfo/menu.html'
				}
			}
		})
		//帮扶责任人
		.state('lowFamily.responsibilityPerson', {
			url: '/low_family_responsibility_person?id&type',
			//			controller: "order_list",
			//			templateUrl: 'dist/template/lowFamily/lowFamilyInfo/responsibilityPerson.html'
			views: {
				'': {
					templateUrl: 'dist/template/lowFamily/lowFamilyInfo/container.html'
				},
				'form@lowFamily.responsibilityPerson': {
					templateUrl: 'dist/template/lowFamily/lowFamilyInfo/responsibilityPerson.html'
				},
				'menu@lowFamily.responsibilityPerson': {
					templateUrl: 'dist/template/lowFamily/lowFamilyInfo/menu.html'
				}
			}
		})
		.state('addDutyPerson', {
			url: '/add_family_member?id&type',
			//			controller: "order_list",
			templateUrl: 'dist/template/lowFamily/addDutyPerson.html'
		})
		//帮扶成效
		.state('lowFamily.povertyAlleviationResult', {
			url: '/low_family_poverty_alleviation_result?id&type',
			//			controller: "order_list",
			//			templateUrl: 'dist/template/lowFamily/lowFamilyInfo/povertyAlleviationResult.html'
			views: {
				'': {
					templateUrl: 'dist/template/lowFamily/lowFamilyInfo/container.html'
				},
				'form@lowFamily.povertyAlleviationResult': {
					templateUrl: 'dist/template/lowFamily/lowFamilyInfo/povertyAlleviationResult.html'
				},
				'menu@lowFamily.povertyAlleviationResult': {
					templateUrl: 'dist/template/lowFamily/lowFamilyInfo/menu.html'
				}
			}
		})
		//自然村首页
		.state('naturalVillage', {
			url: '/natural_village?id&type',
			controller: "naturalVillage",
			templateUrl: 'dist/template/natural/naturalVillage.html'
		})
		//自然村草稿
		.state('naturalDraft', {
			url: '/natural_draft?id&type',
			controller: "naturalDraft",
			templateUrl: 'dist/template/natural/naturalDraft.html'
		})
		//自然村新增
		.state('naturalAdd', {
			url: '/natural_Add?id&type',
			controller: "naturalAdd",
			templateUrl: 'dist/template/natural/naturalAdd.html'
		})
		//自然村编辑
		.state('naturalEdite', {
			url: '/natural_Edite?id&type',
			controller: "naturalEdite",
			templateUrl: 'dist/template/natural/naturalEdite.html'
		})

		//扶贫项目首页
		.state('project', {
			url: '/project?id&type',
			controller: "project",
			templateUrl: 'dist/template/project/project.html'
		})

		//扶贫项目新增
		.state('projectAdd', {
			url: '/project_Add?id&type',
			controller: "projectAdd",
			templateUrl: 'dist/template/project/projectAdd.html'
		})

		//扶贫项目草稿
		.state('projectDraft', {
			url: '/project_Draft?id&type',
			controller: "projectDraft",
			templateUrl: 'dist/template/project/projectDraft.html'
		})

		//扶贫项目编辑
		.state('projectEdit', {
			url: '/project_Edit?id&type',
			controller: "projectEdit",
			templateUrl: 'dist/template/project/projectEdit.html'
		})
		//扶贫项目 新增 涉及贫困村
		.state('projectAddsjpkc', {
			url: '/project_Addsjpkc?id&type',
			controller: "projectAddsjpkc",
			templateUrl: 'dist/template/project/projectAddsjpkc.html'
		})

		//扶贫项目 新增 涉及贫困户
		.state('projectAddsjpkh', {
			url: '/project_Addsjpkh?id&type',
			controller: "projectAddsjpkh",
			templateUrl: 'dist/template/project/projectAddsjpkh.html'
		})

		//扶贫项目 编辑 涉及贫困户
		.state('projecEditsjpkh', {
			url: '/project_Editsjpkh?id&type',
			controller: "projecEditsjpkh",
			templateUrl: 'dist/template/project/projecEditsjpkh.html'
		})

		//扶贫项目 编辑 涉及贫困村
		.state('projectEditsjpkc', {
			url: '/project_Editsjpkc?id&type',
			controller: "projectEditsjpkc",
			templateUrl: 'dist/template/project/projectEditsjpkc.html'
		})

		//扶贫数据 自然村 查询
		.state('queryNatural', {
			url: '/query_Natural?id&type',
			controller: "queryNatural",
			templateUrl: 'dist/template/natural/queryNatural.html'
		})

		//扶贫数据 自然村 查询列表
		.state('queryNaturalResult', {
			url: '/queryNatural_Result?id&type',
			controller: "queryNaturalResult",
			templateUrl: 'dist/template/natural/queryNaturalResult.html'
		})

		//扶贫数据 自然村 查询列表详情
		.state('queryNaturalDetails', {
			url: '/queryNatural_Details?id&type',
			controller: "queryNaturalDetails",
			templateUrl: 'dist/template/natural/queryNaturalDetails.html'
		})

		//扶贫数据 扶贫项目 查询
		.state('queryProject', {
			url: '/query_Project?id&type',
			controller: "queryProject",
			templateUrl: 'dist/template/project/queryProject.html'
		})

		//扶贫数据 扶贫项目 查询列表
		.state('queryProjectResult', {
			url: '/queryProject_Result?id&type',
			controller: "queryProjectResult",
			templateUrl: 'dist/template/project/queryProjectResult.html'
		})

		//扶贫数据 扶贫项目 查询列表详情queryprojectDetails.html
		.state('queryprojectDetails', {
			url: '/queryproject_Details?id&type',
			controller: "queryprojectDetails",
			templateUrl: 'dist/template/project/queryprojectDetails.html'
		})
		//贫困村 
		.state('poorVillage', {
			url: '/poorVillage',
			controller: "poorVillage",
			templateUrl: 'dist/template/village/poorVillage.html'
		})
		.state('villageDraft', {
			url: '/villageDraft',
			controller: "villageDraft",
			templateUrl: 'dist/template/village/villageDraft.html'
		})
		.state('villageCollection', {
			url: '/villageCollection',
			controller: "villageCollection",
			templateUrl: 'dist/template/village/villageCollection.html'
		})
		.state('addTaskForce', {
			url: '/addTaskForce',
			controller: "addTaskForce",
			templateUrl: 'dist/template/village/addTaskForce.html'
		})
		.state('editTaskForce', {
			url: '/editTaskForce',
			controller: "editTaskForce",
			templateUrl: 'dist/template/village/editTaskForce.html'
		})
		// 工作日志
		.state('workLog', {
			url: '/workLog',
			controller: "workLog",
			templateUrl: 'dist/template/village/workLog.html'
		})
		.state('workLogDetail', {
			url: '/workLogDetail',
			controller: "workLogDetail",
			templateUrl: 'dist/template/village/workLogDetail.html'
		})
		// 通知
		.state('notice', {
			url: '/notice',
			controller: "notice",
			templateUrl: 'dist/template/village/notice.html'
		})
		.state('noticeDetail', {
			url: '/noticeDetail',
			controller: "noticeDetail",
			templateUrl: 'dist/template/village/noticeDetail.html'
		})
		// 扶贫数据 查询 贫困户
		.state('queryHousehold', {
			url: '/queryHousehold',
			controller: "queryHousehold",
			templateUrl: 'dist/template/village/queryHousehold.html'
		})
		.state('queryHouseholdList', {
			url: '/queryHouseholdList',
			controller: "queryHouseholdList",
			templateUrl: 'dist/template/village/queryHouseholdList.html'
		})
		.state('householdDetail', {
			url: '/queryHouseholdDetail',
			controller: "householdDetail",
			templateUrl: 'dist/template/village/queryHouseholdDetail.html'
		})
		.state('queryFamily', {
			url: '/queryFamily',
			controller: "queryFamily",
			templateUrl: 'dist/template/village/queryFamily.html'
		})
		.state('queryHelp', {
			url: '/queryHelp',
			controller: "queryHelp",
			templateUrl: 'dist/template/village/queryHelp.html'
		})
		// 扶贫数据 查询 贫困村
		.state('queryVillage', {
			url: '/queryVillage',
			controller: "queryVillage",
			templateUrl: 'dist/template/village/queryVillage.html'
		})
		.state('queryVillageList', {
			url: '/queryVillageList',
			controller: "queryVillageList",
			templateUrl: 'dist/template/village/queryVillageList.html'
		})
		.state('queryHouseholdDetail', {
			url: '/queryHouseholdDetail',
			controller: "queryHouseholdDetail",
			templateUrl: 'dist/template/village/queryHouseholdDetail.html'
		})
		.state('queryTaskForceDetail', {
			url: '/queryTaskForceDetail',
			controller: "queryTaskForceDetail",
			templateUrl: 'dist/template/village/queryTaskForceDetail.html'
		})
		// 登录
		.state('login', {
			url: '/login',
			controller: "login",
			templateUrl: 'dist/template/village/login.html'
		})

});