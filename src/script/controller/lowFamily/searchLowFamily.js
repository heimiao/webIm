//查询贫困户
myApp.controller("querylowFamilyConditionCtro", ["$scope", "$rootScope", "$state", "$http", "$stateParams", "postForm",
	function($scope, $rootScope, $state, $http, $stateParams, postForm) {
		var querylowFamilyCondition = {} || querylowFamilyCondition;
		querylowFamilyCondition.urlParam = $stateParams;
		querylowFamilyCondition.sendParam = {};

		var all = {
			name: "全部",
			value: "",
			id: ""
		};
		config.sysValue.year.splice(0, 0, all);
		config.sysValue.dataStatus.splice(0, 0, all);
		config.sysValue.tpqk.splice(0, 0, all);
		querylowFamilyCondition.otherSelect = {
			yearList: config.sysValue.year,
			dataStatusList: config.sysValue.dataStatus,
			tpqkList: config.sysValue.tpqk,
		};

		querylowFamilyCondition.townList = {};
		querylowFamilyCondition.town_VillagesList = {};

		console.log(querylowFamilyCondition.otherSelect.dataStatusList);

		//获取城镇
		querylowFamilyCondition.getTownVillages = function(args, name) {
			postForm.saveFrm(config.path.townShip, {
				lx: args
			}).success(function(data) {
				querylowFamilyCondition.townList = data;
			})
		}

		querylowFamilyCondition.getTownVillages();
		//根据乡镇获取对应村庄
		querylowFamilyCondition.getVillagesByTown = function(id) {
			querylowFamilyCondition.sendParam.qyxzc = "";
			postForm.saveFrm(config.path.townShip, {
				lx: "02",
				fid: id
			}).success(function(data) {
				querylowFamilyCondition.town_VillagesList = data;
			})
		}

		querylowFamilyCondition.search = function() {

			// $state.go("",querylowFamilyCondition.sendParam );
		}
		//根据角色遍历响应的菜单
		$scope.querylowFamilyCondition = querylowFamilyCondition;
	}
]);