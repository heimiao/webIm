//经纪人列表
myApp.controller("lowFamilyListCtro", ["$scope", "$rootScope", "$state", "$filter", "$http", "$stateParams", "postForm", function($scope, $rootScope, $state, $filter, $http, $stateParams, postForm) {
	var lowFamilyList = {} || lowFamilyList;
	//获取参数
	lowFamilyList.urlParam = $stateParams;
	lowFamilyList.sendParam = {
		//		nd: new Date().getFullYear()
	};
	lowFamilyList.page = {
		limit: 15,
		pageSize: 10,
		nowPage: 1,
		start: 0,
	};
	var all = {
		name: "全部",
		value: ""
	}
	lowFamilyList.otherSelect = {
		yearObj: config.sysValue.year,
		dataStatusObj: config.sysValue.dataStatus,
		tpqkObj: config.sysValue.tpqk,
	};

	lowFamilyList.list = [];
	window.localStorage.setItem("cont_index", "");

	$scope.$watch('$viewContentLoaded', function(event) {
		fupin.localCache(JSON.stringify(lowFamilyInfoNull));
		fupin.oldLocalCache(JSON.stringify(lowFamilyInfoNull));
	});

	lowFamilyList.townList = {};
	lowFamilyList.town_VillagesList = {};

	//映射列表专用村
	lowFamilyList.villagesList = {};

	function isCardNo(card) {
		// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X 
		var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		if(reg.test(card) === false) {
			return false;
		} else {
			return true;
		}
	}
	//获取总列表  
	lowFamilyList.getLowFamilyList = function(me, start) {
		lowFamilyList.page.start = start == 1 ? start - 1 : lowFamilyList.page.start;
		//lowFamilyList.sendParam.search//判断该字段类型
		if(lowFamilyList.sendParam.search) {
			if(isCardNo(lowFamilyList.sendParam.search)) {
				lowFamilyList.sendParam.hzsfz = lowFamilyList.sendParam.search;
				lowFamilyList.sendParam.hzxm = "";
			} else {
				lowFamilyList.sendParam.hzxm = lowFamilyList.sendParam.search;
				lowFamilyList.sendParam.hzsfz = "";
			}
		}
		var sumSendParam = angular.extend({}, lowFamilyList.page, lowFamilyList.sendParam)
		//获取当前用户信息   
		postForm.saveFrm(config.path.lowFamilyList, sumSendParam).success(function(data) {
			var pretreatmentAry = data.results;
			pretreatmentAry = fupin.mapArray(pretreatmentAry, config.sysValue.bhksx, "bhksx", "value");
			//调用镇
			if(JSON.stringify(lowFamilyList.townList) == "{}") {
				lowFamilyList.getTownVillages("01", "qyxz");
			} else {
				pretreatmentAry = fupin.mapArray(pretreatmentAry, lowFamilyList.townList, "qyxz", "id");
				//console.log(pretreatmentAry);
			}
			//调用村
			if(JSON.stringify(lowFamilyList.villagesList) == "{}") {
				lowFamilyList.getTownVillages("02", "qyxzc");
			} else {
				pretreatmentAry = fupin.mapArray(pretreatmentAry, lowFamilyList.villagesList, "qyxzc", "id");
			}
			lowFamilyList.list = lowFamilyList.list.concat(pretreatmentAry);

			if(me)
				me.resetload();
		})

		lowFamilyList.page.start += lowFamilyList.page.pageSize * lowFamilyList.page.nowPage;
		if(start == 1)
			lowFamilyList.list = [];
	}

	//获取城镇
	lowFamilyList.getTownVillages = function(args, name) {
		postForm.saveFrm(config.path.townShip, {
			lx: args
		}).success(function(data) {
			dataList = data;
			if(args == "01") {
				lowFamilyList.townList = data;
				lowFamilyList.townList.concat(all);
			}
			if(args == "02") {
				lowFamilyList.villagesList = data;
			}
			lowFamilyList.list = fupin.mapArray(lowFamilyList.list, dataList, name, "id");

		})
	}
	lowFamilyList.datas = function() {
		lowFamilyList.getLowFamilyList("", 1);
	}
	//根据乡镇获取对应村庄
	// lowFamilyList.getVillagesByTown = function(id) {
	// 	lowFamilyList.sendParam.qyxzc = "";
	// 	postForm.saveFrm(config.path.townShip, {
	// 		lx: "02",
	// 		fid: id
	// 	}).success(function(data) {
	// 		lowFamilyList.town_VillagesList = data;
	// 		lowFamilyList.town_VillagesList.splice(0, 0, all)
	// 	})
	// }

	lowFamilyList.getVillagesId = function(id) {
		//console.log(lowFamilyList.sendParam);
	}

	//选择乡镇
	lowFamilyList.getVillagesByTown = function(name, id) {
		lowFamilyList.sendParam.qyxz = id;
		$("#township .name").html(name)
		$(".townshipList").slideUp(200)
		$("#township").removeClass("township2")
		$("#township .name").removeClass("col-ea3c4c")
		$("#village .name").html('全部行政村')
		lowFamilyList.sendParam.qyxzc = null;
		postForm.saveFrm(config.path.townShip, {
			lx: "02",
			fid: id
		}).success(function(data) {
			lowFamilyList.town_VillagesList = data;
			lowFamilyList.town_VillagesList.splice(0, 0, all)
		})
		lowFamilyList.getLowFamilyList("", 1);
	}
	//选择村
	lowFamilyList.getVillagesId = function(name, id) {
		lowFamilyList.sendParam.qyxzc = id;
		$("#village .name").html(name)
		$(".villageList").slideUp(200)
		$("#village").removeClass("township2")
		$("#village .name").removeClass("col-ea3c4c")
		lowFamilyList.getLowFamilyList("", 1);
	}

	//调用列表
	lowFamilyList.getLowFamilyList("", 1);
	//根据角色遍历响应的菜单
	$scope.lowFamilyList = lowFamilyList;

}]);