myApp.controller("poorVillage", ["$scope", "$state", "$http", "$stateParams",
	function($scope, $state, $http, $stateParams) {
		var poorVillage = {} || poorVillage;
		poorVillage.urlParam = $stateParams;
		poorVillage.sendParam = {};
		// var data={
		// 	"lx": 01
		// }
		console.log("123333"+JSON.stringify(config));
		$http.post(config.path.townShip,null).success(function(res){
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