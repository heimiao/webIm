myApp.controller("projectAddxz", ["$scope", "$state", "$http", "$stateParams","postForm",
	function($scope, $state, $http, $stateParams,postForm) {
		var projectAdd = {} || projectAdd;
		projectAdd.urlParam = $stateParams;
		projectAdd.sendParam = {};
		//添加扶贫项目
		projectAdd.tianjia=function(){
			postForm.saveFrm(config.path.projectAdda,projectAdd.sendParam)
			.success(function(res){
				console.log(res);
				alert('123')
			})
		}













		projectAdd.uploadSource = function() {
			console.log(12123123);

			//根据贫困户id
		}

		console.log(projectAdd.urlParam);

		/*lowFamilyInfo.menu=false;
		lowFamilyInfo.changeMenu=function(args){
			lowFamilyInfo.menu=args;
			console.log(lowFamilyInfo.menu);
		}*/

		//调用列表
		//		$state.go('lowFamily.baseInfo'); //默认显示第一个tab
		//根据角色遍历响应的菜单
		$scope.projectAdd = projectAdd;
	}
]);