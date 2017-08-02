myApp.controller("querylowFamilyConditionCtro", ["$scope", "$rootScope", "$state", "$http", "$stateParams", "postForm",
	function($scope, $rootScope, $state, $http, $stateParams, postForm) {
		var query_low_family_condition = {} || query_low_family_condition;
		query_low_family_condition.urlParam = $stateParams;
		query_low_family_condition.sendParam = {};

		var all = {
			name: "全部",
			value: "",
			id: ""
		};
		config.sysValue.year.splice(0, 0, all);
		config.sysValue.dataStatus.splice(0, 0, all);
		config.sysValue.tpqk.splice(0, 0, all);

		query_low_family_condition.otherSelect = {
			yearObj: config.sysValue.year,
			dataStatusObj: config.sysValue.dataStatus,
			tpqkObj: config.sysValue.tpqk,
		};

		query_low_family_condition.townList = {};
		query_low_family_condition.town_VillagesList = {};

		//获取城镇
		query_low_family_condition.getTownVillages = function(args, name) {
			postForm.saveFrm(config.path.townShip, {
				lx: args
			}).success(function(data) {
				query_low_family_condition.townList = data;
			})
		}
		query_low_family_condition.getTownVillages();
		//根据乡镇获取对应村庄
		query_low_family_condition.getVillagesByTown = function(id) {
			query_low_family_condition.sendParam.qyxzc = "";
			postForm.saveFrm(config.path.townShip, {
				lx: "02",
				fid: id
			}).success(function(data) {
				query_low_family_condition.town_VillagesList = data;
			})
		}

		query_low_family_condition.search = function() {

			// $state.go("",query_low_family_condition.sendParam );
		}
		//根据角色遍历响应的菜单
		$scope.query_low_family_condition = query_low_family_condition;
	}
]);