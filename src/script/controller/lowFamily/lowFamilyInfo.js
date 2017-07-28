/* 
myApp.controller("low_family_info", ["$scope", "$state", "$filter", "$http", "$stateParams", "getPage", "saveData", function($scope, $state, $filter, $http, $stateParams, getPage, saveData) {
	var agentList = {} || agentList;
	//获取参数
	agentList.urlParam = $stateParams;
	agentList.sendParam = {};
	agentList.list = {};
	
	agentList.otherInfo = {
		userStatus: Config.stateMap.userStatus.concat({
			name: "全部"
		})
	};

	//获取当前用户信息  
	agentList.redList = function(args) {
		agentList.page.page = args ? args : 1;
		var param = angular.extend(agentList.sendParam, agentList.page);
		$http.get(Config.rqUrl.agentList, {
			params: param,
		}).success(function(data) {
			if(data.status) {
				var oprationObj = data.data.data;
				agentList.listNum = data.data.count;

				//映射认证状态
				$.each(oprationObj, function(n, m) {
					angular.extend(m, {
						headUrlAll: imgThumbnailUrl + m.headUrl
					})
					angular.extend(m, {
						userStatusObj: $.stateMap(Config.stateMap.userStatus, m.userStatus)
					})
				});

				agentList.list = oprationObj;
				getPage.getPage(Math.ceil(data.data.count / agentList.page.size), agentList.page.page, "doctor_page", function(num, type) {
					agentList.redList(num);
				});
			} else {
				$.alertError("获取经纪人信息错误," + data.err)
			}
		})
	}

	//启用禁用医生状态
	agentList.changeUseState = function(args, id) {
		$.confirm(args == 'able' ? "您确定要启用吗？" : "您确定要禁用吗？", function() {
			saveData.saveData(args == 'able' ? Config.rqUrl.agentAble : Config.rqUrl.agentDisable, {
				agentId: id,
				remark: args == 'able' ? "able" : "disable"
			}).success(function(data) {
				if(data.status) {
					$.alertSuccess("操作成功")
					agentList.redList();
				} else {
					$.alertError("操作失败," + data.err)
				}
			});
		}, function() {
			//取消执行
		})
	}

	//调用列表
	agentList.redList();

	//根据角色遍历响应的菜单
	$scope.agentList = agentList;
}]);

//经纪人下的医生列表
myApp.controller("agentDoctor_list", ["$scope", "$filter", "$http", "findAll", "findByParam", "saveData", "$stateParams", "Upload", "$timeout", "getPage", function($scope, $filter, $http, findAll, findByParam, saveData, $stateParams, Upload, $timeout, getPage) {
	var agentDoctorList = {} || agentDoctorList;
	//获取参数
	agentDoctorList.urlParam = $stateParams;
	agentDoctorList.userInfo = {};
	agentDoctorList.page = {
		page: 1,
		size: Config.system.page.showPage,
	};
	//请求参数
	agentDoctorList.sendParam = {};
	//下拉框
	agentDoctorList.otherInfo = {};
	agentDoctorList.list = {};

	//经纪人详细
	$http.get(Config.rqUrl.getAgentById + "/" + agentDoctorList.urlParam.id, {}).success(function(data) {
		if(data.status) {
			agentDoctorList.agetSum = (data.data.userAccount.agentSum || 0) / 100;
		} else {
			$.alertError("获取经纪人详细错误," + data.err)
		}
	})
	//经纪人下的医生列表
	agentDoctorList.redList = function(args) {
		agentDoctorList.page.page = args ? args : 1;
		var param = angular.extend(agentDoctorList.sendParam, agentDoctorList.page);
		$http.get(Config.rqUrl.agentDoctorList + "/" + agentDoctorList.urlParam.id, {
			params: param,
		}).success(function(data) {
			if(data.status) {
				var oprationObj = data.data.data;
				agentDoctorList.listNum = data.data.count || 0;
				agentDoctorList.list = oprationObj;
				getPage.getPage(Math.ceil(data.data.count / agentDoctorList.page.size), agentDoctorList.page.page, "agentDoctor_page", function(num, type) {
					agentDoctorList.redList(num);
				});
			} else {
				$.alertError("获取经纪人下的医生错误," + data.err)
			}
		})
	}

	agentDoctorList.redList();
	$scope.agentDoctorList = agentDoctorList;
}]);

 */