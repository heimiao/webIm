myApp.controller("projectDraft", ["$scope", "$state", "$http", "$stateParams",
	function($scope, $state, $http, $stateParams) {
		var projectDraft = {} || projectDraft;
		projectDraft.urlParam = $stateParams;
		projectDraft.sendParam = {};
		projectDraft.list = []; //数据列表
		// 清除数据
		window.localStorage.removeItem("projectSituationList");
		window.localStorage.removeItem("projectGetpkclist");
		window.localStorage.removeItem("projectGetpkhlist");
		window.localStorage.removeItem("projectType");
		window.localStorage.removeItem("projectGetpkclistName");
		window.localStorage.removeItem("projectGetpkhlistName");
		window.localStorage.removeItem("projectSituationListId");
		window.localStorage.removeItem("projectDraftEditDraftId");
		dt.request({
			rqstName: "relief_project", //'low_family', 'low_village', 'nature_village', 'relief_project'
			type: "select", //select,delete,put,selectById,
			success: function(args) {
				projectDraft.list = args;
				$scope.$apply();
			},
			error: function(args) {

			}
		});


		/*lowFamilyInfo.menu=false;
		lowFamilyInfo.changeMenu=function(args){
			lowFamilyInfo.menu=args;
			console.log(lowFamilyInfo.menu);  
		}*/

		//调用列表
		//		$state.go('lowFamily.baseInfo'); //默认显示第一个tab
		//根据角色遍历响应的菜单
		$scope.projectDraft = projectDraft;
	}
]);