myApp.controller("lowFamilyInfoCtro", ["$scope", "$state", "$http", "$stateParams",
	function($scope, $state, $http, $stateParams) {
		var lowFamilyInfo = {} || lowFamilyInfo;
		lowFamilyInfo.urlParam = $stateParams;
		lowFamilyInfo.sendParam = {};

		/*//获取当前用户信息  
		lowFamilyInfo.redList = function(args) {
			lowFamilyInfo.page.page = args ? args : 1;
			var param = angular.extend(lowFamilyInfo.sendParam, lowFamilyInfo.page);
			$http.get(Config.rqUrl.lowFamilyInfo, {
				params: param,
			}).success(function(data) {
				if(data.status) {
					var oprationObj = data.data.data;
					lowFamilyInfo.listNum = data.data.count;

					//映射认证状态
					$.each(oprationObj, function(n, m) {
						angular.extend(m, {
							headUrlAll: imgThumbnailUrl + m.headUrl
						})
						angular.extend(m, {
							userStatusObj: $.stateMap(Config.stateMap.userStatus, m.userStatus)
						})
					});

					lowFamilyInfo.list = oprationObj;
					getPage.getPage(Math.ceil(data.data.count / lowFamilyInfo.page.size), lowFamilyInfo.page.page, "doctor_page", function(num, type) {
						lowFamilyInfo.redList(num);
					});
				} else {
					$.alertError("获取经纪人信息错误," + data.err)
				}
			})
		}*/

		//调用列表

		//根据角色遍历响应的菜单
		$scope.lowFamilyInfo = lowFamilyInfo;
	}
]);