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
			//controller: "lowFamilyListCtro",
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
			url: '/low_family_info?id&type?showForm',
			controller: "lowFamilyInfoCtro",
			templateUrl: 'dist/template/lowFamily/lowFamilyInfo.html',
		})
		.state('addFamilyMember', {
			//添加家庭成员
			url: '/add_family_member?id&type&memberId',
			controller: "addFamilyMemberCtro",
			templateUrl: 'dist/template/lowFamily/addFamilyMember.html'
		})
		.state('addAssistPerson', {
			//添加帮扶责任人assistPerson
			url: '/add_assist_person?id&type&personId',
			controller: "addAsistPersonCtro",
			templateUrl: 'dist/template/lowFamily/addAssistPerson.html'
		})

		//贫困户查询页面
		.state('querylowFamilyCondition', {
			url: '/query_low_family_condition',
			controller: "querylowFamilyConditionCtro",
			templateUrl: 'dist/template/lowFamily/searchLowFamily/queryHousehold.html'
		})
		//自然村首页
		.state('naturalVillage', {
			url: '/natural_village?id&type',
			controller: "naturalVillage",
			templateUrl: 'dist/template/natural/naturalVillage.html'
		})
		//自然村草稿
		.state('naturalDraft', {
			url: '/natural_draft?id',
			controller: "naturalDraft",
			templateUrl: 'dist/template/natural/naturalDraft.html'
		})

		.state('naturalDraftEdit', {
			url: '/naturalDraftEdit?id',
			controller: "naturalDraftEdit",
			templateUrl: 'dist/template/natural/naturalDraftEdit.html'
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
		.state('projectAdd', {

			url: '/projectAdd?id&type',
			controller: "projectAdd",
			templateUrl: 'dist/template/project/projectAdd.html'
		})
		//扶贫项目草稿
		.state('projectDraft', {
			url: '/projectDraft?id&type',
			controller: "projectDraft",
			templateUrl: 'dist/template/project/projectDraft.html'
		})
		//扶贫项目草稿编辑
		.state('projectDraftEdit', {
			url: '/projectDraftEdit?draftId',
			controller: "projectDraftEdit",
			templateUrl: 'dist/template/project/projectDraftEdit.html'
		})
		//扶贫项目编辑
		.state('projectEdit', {
			url: '/projectEdit?detailId&type',
			controller: "projectEdit",
			templateUrl: 'dist/template/project/projectEdit.html'
		})
		//扶贫项目 新增 涉及贫困村
		.state('projectAddsjpkc', {
			url: '/projectAddsjpkc?id&type',
			controller: "projectAddsjpkc",
			templateUrl: 'dist/template/project/projectAddsjpkc.html'
		})
		//扶贫项目 编辑 涉及贫困村
		.state('projectEditsjpkc', {
			url: '/projectEditsjpkc?idx',
			controller: "projectEditsjpkc",
			templateUrl: 'dist/template/project/projectEditsjpkc.html'
		})

		//扶贫项目 新增 涉及贫困户
		.state('projectAddsjpkh', {
			url: '/projectAddsjpkh?id&type',
			controller: "projectAddsjpkh",
			templateUrl: 'dist/template/project/projectAddsjpkh.html'
		})

		//扶贫项目 编辑 涉及贫困户
		.state('projecEditsjpkh', {
			url: '/projecEditsjpkh?idx',
			controller: "projecEditsjpkh",
			templateUrl: 'dist/template/project/projecEditsjpkh.html'
		})

		//扶贫数据 自然村 查询
		.state('queryNatural', {
			url: '/query_Natural',
			controller: "queryNatural",
			templateUrl: 'dist/template/natural/queryNatural.html'
		})

		//扶贫数据 自然村 查询列表
		.state('queryNaturalResult', {
			url: '/queryNatural_Result?nd',
			controller: "queryNaturalResult",
			templateUrl: 'dist/template/natural/queryNaturalResult.html'
		})

		//扶贫数据 自然村 查询列表详情
		.state('queryNaturalDetails', {
			url: '/queryNatural_Details?detailId',
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
			url: '/queryProjectResult?nd',
			controller: "queryProjectResult",
			templateUrl: 'dist/template/project/queryProjectResult.html'
		})

		//扶贫数据 扶贫项目 查询列表详情queryprojectDetails.html
		.state('queryprojectDetails', {
			url: '/queryprojectDetails?detailId',
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
			url: '/villageCollection?type',
			controller: "villageCollection",
			templateUrl: 'dist/template/village/villageCollection.html'
		})
		.state('editVillageCollection', {
			url: '/editVillageCollection?editId&type',
			controller: "editVillageCollection",
			templateUrl: 'dist/template/village/editVillageCollection.html'
		})
		.state('draftVillageCollection', {
			url: '/draftVillageCollection?draftId&type',
			controller: "draftVillageCollection",
			templateUrl: 'dist/template/village/draftVillageCollection.html'
		})
		.state('addTaskForce', {
			url: '/addTaskForce',
			controller: "addTaskForce",
			templateUrl: 'dist/template/village/addTaskForce.html'
		})
		.state('editTaskForce', {
			url: '/editTaskForce?id',
			controller: "editTaskForce",
			templateUrl: 'dist/template/village/editTaskForce.html'
		})
		.state('editAddTaskForce', {
			url: '/editAddTaskForce?id&fid',
			controller: "editAddTaskForce",
			templateUrl: 'dist/template/village/editAddTaskForce.html'
		})
		.state('editEditTaskForce', {
			url: '/editEditTaskForce?id&fid',
			controller: "editEditTaskForce",
			templateUrl: 'dist/template/village/editEditTaskForce.html'
		})
		.state('draftAddTaskForce', {
			url: '/draftAddTaskForce?id&fid',
			controller: "draftAddTaskForce",
			templateUrl: 'dist/template/village/draftAddTaskForce.html'
		})
		.state('draftEditTaskForce', {
			url: '/draftEditTaskForce?id&fid',
			controller: "draftEditTaskForce",
			templateUrl: 'dist/template/village/draftEditTaskForce.html'
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
			url: '/queryHouseholdList?hzxm&hzsfz&nd&qyxz&qyxzc&sjzt&tpqk',
			controller: "queryHouseholdList",
			templateUrl: 'dist/template/village/queryHouseholdList.html'
		})
		.state('householdDetail', {
			url: '/queryHouseholdDetail?id',
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
			url: '/queryVillageList?nd&qyxz&qyxzc',
			controller: "queryVillageList",
			templateUrl: 'dist/template/village/queryVillageList.html'
		})
		.state('queryVillageDetail', {
			url: '/queryVillageDetail?detailId',
			controller: "queryVillageDetail",
			templateUrl: 'dist/template/village/queryVillageDetail.html'
		})
		.state('queryTaskForceDetail', {
			url: '/queryTaskForceDetail?id&idx',
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