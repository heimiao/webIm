myApp.controller("low_family_List", ["$scope", "$state", "$filter", "$http", "$stateParams", function($scope, $state, $filter, $http, $stateParams) {
	var low_family_List = {} || low_family_List;
	//获取参数
	low_family_List.urlParam = $stateParams;
	low_family_List.sendParam = {};
	low_family_List.page = {
		page: 1,
		size: 10
	};
	
	low_family_List.list = {};

	//获取当前用户信息  
	low_family_List.redList = function(args) {
		low_family_List.page.page = args ? args : 1;
		var param = angular.extend(low_family_List.sendParam, low_family_List.page);
		$http.get(Config.rqUrl.low_family_List, {
			params: param,
		}).success(function(data) {
			if(data.status) {
				var oprationObj = data.data.data;
				low_family_List.listNum = data.data.count;
					
				//映射认证状态
				$.each(oprationObj, function(n, m) {
					angular.extend(m, {
						headUrlAll: imgThumbnailUrl + m.headUrl
					})
					angular.extend(m, {
						userStatusObj: $.stateMap(Config.stateMap.userStatus, m.userStatus)
					})
				});

				low_family_List.list = oprationObj;
				getPage.getPage(Math.ceil(data.data.count / low_family_List.page.size), low_family_List.page.page, "doctor_page", function(num, type) {
					low_family_List.redList(num);
				});
			} else {
				$.alertError("获取经纪人信息错误," + data.err)
			}
		})
	}

	//调用列表
	low_family_List.redList();
	//根据角色遍历响应的菜单
	$scope.low_family_List = low_family_List;
}]);