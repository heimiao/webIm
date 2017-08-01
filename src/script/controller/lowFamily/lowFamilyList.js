//经纪人列表
myApp.controller("lowFamilyListCtro", ["$scope", "$state", "$filter", "$http", "$stateParams", function($scope, $state, $filter, $http, $stateParams) {
	var lowFamilyList = {} || lowFamilyList;
	//获取参数
	lowFamilyList.urlParam = $stateParams;
	lowFamilyList.sendParam = {
		nd: 2017
	};
	lowFamilyList.page = {
		limit: 15,
		start: 0,
	};

	lowFamilyList.otherSelect = {

	};
	lowFamilyList.list = {};

	lowFamilyList.townList = {};
	lowFamilyList.villagesList = {};

	//获取总列表  
	var sumSendParam = angular.extend({}, lowFamilyList.page, lowFamilyList.sendParam)

	lowFamilyList.getLowFamilyList = function() {
		//获取当前用户信息  
		$http.post(config.path.lowFamilyList, sumSendParam).success(function(data) {
			var pretreatmentAry = data.results;
			lowFamilyList.list = pretreatmentAry;
			fupin.mapArray(lowFamilyList.list, config.sysValue.PKLX, "bhksx", "value", true);

			//调用镇
			if(lowFamilyList.townList)
				lowFamilyList.getTownVillages(01, "qyxz");
			//调用村
			if(lowFamilyList.villagesList)
				lowFamilyList.getTownVillages(02, "qyxzc");
		})
	}

	//获取城镇
	lowFamilyList.getTownVillages = function(args, name) {
		$http.post(config.path.townShip, {
			lx: args
		}).success(function(data) {
			dataList = data;
			if(args == 1)
				lowFamilyList.townList = data;
			else
				lowFamilyList.villagesList = data;
			/*var localData = {};
			localData[args == 1 ? "townList" : "villagesList"] = dataList;
			dt.request({
				rqstName: "other", //'low_family', 'low_village', 'nature_village', 'relief_project'
				type: "put", //select,delete,put,selectById,
				data: localData,
				success: function(args) {
					console.log(args);
				}
			});*/
			lowFamilyList.list = fupin.mapArray(lowFamilyList.list, dataList, name, "id");
		})
	}

	//根据乡镇获取对应村庄
	lowFamilyList.getVillagesByTown = function() {

	}
	
	//调用列表
	lowFamilyList.getLowFamilyList();
	//根据角色遍历响应的菜单
	$scope.lowFamilyList = lowFamilyList;

}]);