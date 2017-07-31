myApp.controller("login", ["$scope", "$state", "$http", "$stateParams","postForm",
	function($scope, $state, $http, $stateParams,postForm) {
		var login = {} || login;
		login.urlParam = $stateParams;
		login.sendParam = {};

		login.uploadSource = function() {
			console.log(12123123);

			//根据贫困户id
		}
		$scope.logIn=function (){
			if(!$scope.userName){
				alert("用户名不能为空")
				return;
			}
			if(!$scope.password){
				alert("密码不能为空")
				return;
			}
			var data={
				"loginname": $scope.userName,
				"password": $scope.password
			}
			postForm.saveFrm(config.path.login,data).success(function(res){
				if(res.success){
					window.localStorage.setItem("token", res.message)
					$state.go("home");
				}
			})
		}
		

		// $state.go("home");
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