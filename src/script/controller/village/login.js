myApp.controller("login", ["$scope", "$state", "$http", "$stateParams",
	function($scope, $state, $http, $stateParams) {
		var login = {} || login;
		login.urlParam = $stateParams;
		login.sendParam = {};

		login.uploadSource = function() {
			console.log(12123123);

			//根据贫困户id
		}
			
		// $state.go("home");

		console.log(login.urlParam);

		/*login.menu=false;
		login.changeMenu=function(args){
			login.menu=args;
			console.log(login.menu);
		}*/

		//调用列表
		//		$state.go('lowFamily.baseInfo'); //默认显示第一个tab
		//根据角色遍历响应的菜单
		$scope.login = login;
	}
]);