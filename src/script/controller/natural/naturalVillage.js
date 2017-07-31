myApp.controller("naturalVillage", ["$scope", "$state", "$http", "$stateParams",
	function($scope, $state, $http, $stateParams) {
		var naturalVillage = {} || naturalVillage;
		naturalVillage.urlParam = $stateParams;
		naturalVillage.sendParam = {};
			alert();
	/*	naturalVillage.uploadSource = function() {
			console.log(12123123);
			//根据贫困户id
		}*/
		
		
		
		console.log(config.path.naturalVillage);
		
		$http.post(config.path.naturalVillage,{}).success(function(data){
			console.log(data)
		})
		console.log(naturalVillage.urlParam);

		/*naturalVillage.menu=false;
		naturalVillage.changeMenu=function(args){
			naturalVillage.menu=args;
			console.log(naturalVillage.menu);
		}*/

		//调用列表
		//		$state.go('lowFamily.baseInfo'); //默认显示第一个tab
		//根据角色遍历响应的菜单
		$scope.naturalVillage = naturalVillage;
	}
]);