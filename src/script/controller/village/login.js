myApp.controller("login", ["$scope", "$state", "$http", "$stateParams","postForm",
	function($scope, $state, $http, $stateParams,postForm) {
		var login = {} || login;
		login.urlParam = $stateParams;
		login.sendParam = {};
		login.countyList = []; //县城以及对应的url
		$http.post(config.path.getbaseUrl,null).success(function(res){
			if(res.success){
				login.url = res.results[0].url;
				base.baseUrl = res.results[0].url;
				login.countyList = res.results;
			}
		})
		login.change=function(){
			alert(login.url)
			base.baseUrl = login.url;

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