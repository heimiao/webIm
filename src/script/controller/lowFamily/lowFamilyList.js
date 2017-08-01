//经纪人列表
myApp.controller("lowFamilyListCtro", ["$scope", "$state", "$filter", "$http", "$stateParams", "postForm", function($scope, $state, $filter, $http, $stateParams, postForm) {
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
		yearObj: config.sysValue.year,
		dataStatusObj: config.sysValue.dataStatus,
		tpqkObj: config.sysValue.tpqk,
	};


	lowFamilyList.list = {};

	lowFamilyList.townList = {};
	lowFamilyList.town_VillagesList = {};

	//映射列表专用村
	lowFamilyList.villagesList = {};

	//获取总列表  
	var sumSendParam = angular.extend({}, lowFamilyList.page, lowFamilyList.sendParam)

	lowFamilyList.getLowFamilyList = function() {
		//获取当前用户信息  
		postForm.saveFrm(config.path.lowFamilyList, sumSendParam).success(function(data) {
			var pretreatmentAry = data.results;
			lowFamilyList.list = fupin.mapArray(pretreatmentAry, config.sysValue.bhksx, "bhksx", "value");
			//调用镇
			if(JSON.stringify(lowFamilyList.townList) == "{}")
				lowFamilyList.getTownVillages("01", "qyxz");
			//调用村
			if(JSON.stringify(lowFamilyList.villagesList) == "{}")
				lowFamilyList.getTownVillages("02", "qyxzc");
		})
	}

	//获取城镇
	lowFamilyList.getTownVillages = function(args, name) {
		postForm.saveFrm(config.path.townShip, {
			lx: args
		}).success(function(data) {
			dataList = data;
			if(args == "01") {
				lowFamilyList.townList = data;
			}
			if(args == "02") {
				lowFamilyList.villagesList = data;
			}
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
	lowFamilyList.getVillagesByTown = function(id) {
		postForm.saveFrm(config.path.townShip, {
			lx: "02",
			fid: id
		}).success(function(data) {
			lowFamilyList.town_VillagesList = data;
		})
	}
	lowFamilyList.getVillagesId = function(id) {
		console.log(lowFamilyList.sendParam);
	}

	//调用列表
	lowFamilyList.getLowFamilyList();
	//根据角色遍历响应的菜单
	$scope.lowFamilyList = lowFamilyList;

}]);