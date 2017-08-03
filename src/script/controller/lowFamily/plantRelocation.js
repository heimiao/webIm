myApp.controller("plantRelocationCtro", ["$scope", "$rootScope", "$state", "$http", "$stateParams", "postForm",
	function($scope, $rootScope, $state, $http, $stateParams, postForm) {
		$scope.userId = "";
		$scope.dataType = "";
		var plantRelocation = {} || plantRelocation;
		plantRelocation.urlParam = $stateParams;
		plantRelocation.sendParam = {};
		plantRelocation.formInfo = {};

		plantRelocation.otherSelect = {
			bqfsList: config.sysValue.bqfs, //搬迁方式
			azfsList: config.sysValue.azfs, //脱贫情况
			azdList: config.sysValue.azd, //开户银行
		};

		console.log(plantRelocation.otherSelect.bqfsList);
		//获取城镇
		plantRelocation.getTownVillages = function() {
			postForm.saveFrm(config.path.townShip, {
				lx: "01"
			}).success(function(data) {
				plantRelocation.otherSelect.townList = data;
			})
		}
		//		plantRelocation.getTownVillages();
		//根据乡镇获取对应村庄
		plantRelocation.getVillagesByTown = function() {
			plantRelocation.otherSelect.villagesList = [];
			plantRelocation.otherSelect.naturalVillageList = [];
			plantRelocation.formInfo.qyzrc = "";
			plantRelocation.formInfo.qyxzc = "";
			postForm.saveFrm(config.path.townShip, {
				lx: "02",
				fid: plantRelocation.formInfo.qyxz || "",
			}).success(function(data) {
				plantRelocation.otherSelect.villagesList = data;
			})
		}
		plantRelocation.getNaturalVillagesByTown = function() {
			plantRelocation.otherSelect.naturalVillageList = [];
			plantRelocation.formInfo.qyzrc = "";
			postForm.saveFrm(config.path.townShip, {
				lx: "03",
				fid: plantRelocation.formInfo.qyxzc || ""
			}).success(function(data) {
				plantRelocation.otherSelect.naturalVillageList = data;
			})
		}

		if(plantRelocation.urlParam.id) {
			//+"?id="+plantRelocation.urlParam.id
			postForm.saveFrm(config.path.lowFamilyById, {
				id: plantRelocation.urlParam.id
			}).success(function(data) {
				console.log(data);
			})
		}

		plantRelocation.testss = function() {
			console.log(plantRelocation.formInfo);
		}

		/*$scope.goback = function() {
			//调用本地数据库保存
			if(confirm("确定保存为草稿吗？")) {
				//如果表单没变化则不提示保存草稿
				dt.request({
					rqstName: "low_family", //'low_family', 'low_village', 'nature_village', 'relief_project'
					type: "put", //select,delete,put,selectById,
					data: {
						baseInfo: plantRelocation.formInfo
					},
					success: function(args) {
						console.log(args);
					},
					'error': function(args) {}
				});
			}
		}*/

		$rootScope.$on('$routeChangeSuccess', function() {})

		/*$scope.$watch('$viewContentLoading', function(event, viewConfig) {
			//			alert('模板加载完成前');
		});*/

		//根据角色遍历响应的菜单
		$scope.plantRelocation = plantRelocation;
	}
]);