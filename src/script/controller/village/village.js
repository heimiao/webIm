myApp.controller("poorVillage", ["$scope", "$state", "$http", "$stateParams",
	function($scope, $state, $http, $stateParams) {
		var poorVillage = {} || poorVillage;
		poorVillage.urlParam = $stateParams;
		poorVillage.sendParam = {};

		poorVillage.uploadSource = function() {
			console.log(12123123);

			poorVillage.test=[{id:1,name:'test'}]
				 

			//根据贫困户id
		}


		console.log(poorVillage.urlParam);

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