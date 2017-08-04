myApp.controller("queryProject", ["$scope", "$state", "$http", "$stateParams",
	function($scope, $state, $http, $stateParams) {
		var queryProject = {} || queryProject;
		queryProject.urlParam = $stateParams;
		queryProject.sendParam = {};
		queryProject.nd = "2017"; //年度
		$("#attribute div").click(function(){
			$(this).addClass('bg').siblings().removeClass('bg');
		})
		queryProject.queryPro = function(){
			$state.go("queryProjectResult",{"nd": queryProject.nd});
		}
		/*lowFamilyInfo.menu=false;
		lowFamilyInfo.changeMenu=function(args){
			lowFamilyInfo.menu=args;
			console.log(lowFamilyInfo.menu);
		}*/

		//调用列表
		//		$state.go('lowFamily.baseInfo'); //默认显示第一个tab
		//根据角色遍历响应的菜单
		$scope.queryProject = queryProject;
	}
]);