myApp.controller("login", ["$scope", "$rootScope", "$state", "$http", "$stateParams", "TipService",
	function($scope, $rootScope, $state, $http, $stateParams, TipService) {
		var login = login || {};
		login.userInfo = login.userInfo || {};
		login.submitForm = function() {
			$http.post(Config.path.loginUrl, login.userInfo).then(function(data) {
				//把登陆之后获取的信息放到前台
				if(data.status == "1") {
					$cookieStore.put("cookie", {
						"token": data.data.userAuthorization.value,
						"userId": data.data.userId
					}, {
						"expires": -1 //new Date(new Date().getTime() + 5000)
					});
					window.location.href = "#/home";
				} else {
					//info,success,warning danger
					TipService.setMessage('登录失败', 'danger');
				}
			});
		}
		$scope.login = login;
	}
]);