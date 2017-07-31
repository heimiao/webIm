myApp.controller("poorVillage", ["$scope", "$state", "$http", "$stateParams",
	function($scope, $state, $http, $stateParams) {
		var poorVillage = {} || poorVillage;
		poorVillage.urlParam = $stateParams;
		poorVillage.sendParam = {};
		$http.post("http://123.58.240.75:8081/tpa/zcjg/queryForZc?lx=01",null).then(function(res){
			console.log(1)
			console.log(res)

		})

		/*poorVillage.menu=false;
		poorVillage.changeMenu=function(args){
			poorVillage.menu=args;
			console.log(poorVillage.menu);
		}*/

		//调用列表
		//		$state.go('lowFamily.baseInfo'); //默认显示第一个tab
		//根据角色遍历响应的菜单
		$scope.poorVillage = poorVillage;
	}
]);