myApp.controller("villageDraft", ["$scope", "$state", "$http", "$stateParams",
	function($scope, $state, $http, $stateParams) {
		var villageDraft = {} || villageDraft;
		villageDraft.urlParam = $stateParams;
		villageDraft.sendParam = {};
		villageDraft.list = []; //数据列表
		//清除本地缓存
		window.localStorage.removeItem("situationList");
		window.localStorage.removeItem("developmentList");
		window.localStorage.removeItem('taskForceList');
		window.localStorage.removeItem('draftVillageCollectionEditId');
		window.localStorage.removeItem("draftVillageCollectionDraftId");
		dt.request({
			rqstName: "low_village", //'low_family', 'low_village', 'nature_village', 'relief_project'
			type: "select", //select,delete,put,selectById,
			success: function(args) {
				villageDraft.list = args;
				$scope.$apply();
			},
			error: function(args) {

			}
		});
		/*villageDraft.menu=false;
		villageDraft.changeMenu=function(args){
			villageDraft.menu=args;
			console.log(villageDraft.menu);
		}*/

		//调用列表
		//		$state.go('lowFamily.baseInfo'); //默认显示第一个tab
		//根据角色遍历响应的菜单
		$scope.villageDraft = villageDraft;
	}
]);