myApp.controller("incomeCtro", ["$scope", "$rootScope", "$state", "$http", "$stateParams", "postForm",
	function($scope, $rootScope, $state, $http, $stateParams, postForm) {
		$scope.userId ="";
		var low_family_baseInfo = {} || low_family_baseInfo;
		low_family_baseInfo.urlParam = $stateParams;
		low_family_baseInfo.sendParam = {};
		var all = {
			name: "",
			value: "",
			id: ""
		};
		config.sysValue.bhksx.splice(0, 0, all);
		config.sysValue.tpqk.splice(0, 0, all);
		config.sysValue.khyh.splice(0, 0, all);
		low_family_baseInfo.otherSelect = {
			townList: [],
			villagesList: [],
			naturalVillageList: [],
			bhksxList: config.sysValue.bhksx, //贫困户属性
			tpqkList: config.sysValue.tpqk, //脱贫情况
			khyhList: config.sysValue.khyh, //开户银行
		};
		//获取城镇
		low_family_baseInfo.getTownVillages = function() {
			postForm.saveFrm(config.path.townShip, {
				lx: "01"
			}).success(function(data) {
				low_family_baseInfo.otherSelect.townList = data;
			})
		}
		low_family_baseInfo.getTownVillages();
		//根据乡镇获取对应村庄
		low_family_baseInfo.getVillagesByTown = function() {
			low_family_baseInfo.otherSelect.villagesList = [];
			low_family_baseInfo.otherSelect.naturalVillageList = [];
			low_family_baseInfo.formInfo.qyzrc = "";
			low_family_baseInfo.formInfo.qyxzc = "";
			postForm.saveFrm(config.path.townShip, {
				lx: "02",
				fid: low_family_baseInfo.formInfo.qyxz || "",
			}).success(function(data) {
				low_family_baseInfo.otherSelect.villagesList = data;
			})
		}
		low_family_baseInfo.getNaturalVillagesByTown = function() {
			low_family_baseInfo.otherSelect.naturalVillageList = [];
			low_family_baseInfo.formInfo.qyzrc = "";
			postForm.saveFrm(config.path.townShip, {
				lx: "03",
				fid: low_family_baseInfo.formInfo.qyxzc || ""
			}).success(function(data) {
				low_family_baseInfo.otherSelect.naturalVillageList = data;
			})
		}

		low_family_baseInfo.formInfo = {};
		if(low_family_baseInfo.urlParam.id) {
			//+"?id="+low_family_baseInfo.urlParam.id
			postForm.saveFrm(config.path.lowFamilyById, {
				id: low_family_baseInfo.urlParam.id
			}).success(function(data) {
				console.log(data);
			})
		}

		/*$scope.goback = function() {
			//调用本地数据库保存
			if(confirm("确定保存为草稿吗？")) {
				//如果表单没变化则不提示保存草稿
				dt.request({
					rqstName: "low_family", //'low_family', 'low_village', 'nature_village', 'relief_project'
					type: "put", //select,delete,put,selectById,
					data: {
						baseInfo: low_family_baseInfo.formInfo
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
		$scope.low_family_baseInfo = low_family_baseInfo;
	}
]);