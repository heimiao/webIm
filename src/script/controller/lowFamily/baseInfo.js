myApp.controller("low_family_baseCtro", ["$scope", "$rootScope", "$state", "$http", "$stateParams", "postForm",
	function($scope, $rootScope, $state, $http, $stateParams, postForm) {
		$scope.userId = "";
		$scope.dataType = "";
		var low_family_baseInfo = {} || low_family_baseInfo;
		low_family_baseInfo.newId = "123456";
		low_family_baseInfo.oldObj = {};
		low_family_baseInfo.urlParam = $stateParams;
		low_family_baseInfo.sendParam = {};
		low_family_baseInfo.formInfo = {};

		$scope.userId = low_family_baseInfo.urlParam.id || "";
		$scope.dataType = low_family_baseInfo.urlParam.type || "";

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
			low_family_baseInfo.otherSelect.villagesList = [];
			low_family_baseInfo.otherSelect.naturalVillageList = [];
			if(low_family_baseInfo.formInfo.qyzrc)
				low_family_baseInfo.formInfo.qyzrc = "";
			if(low_family_baseInfo.formInfo.qyxzc)
				low_family_baseInfo.formInfo.qyxzc = "";
			postForm.saveFrm(config.path.getAddress, {
				lx: "01"
			}).success(function(data) {
				low_family_baseInfo.otherSelect.townList = data;
				low_family_baseInfo.formInfo = low_family_baseInfo.formInfo;
			})
		}
		if(low_family_baseInfo.otherSelect.townList)
			low_family_baseInfo.getTownVillages();
		//根据乡镇获取对应村庄
		low_family_baseInfo.getVillagesByTown = function(id) {
			low_family_baseInfo.otherSelect.naturalVillageList = [];
			low_family_baseInfo.formInfo.qyzrc = "";
			postForm.saveFrm(config.path.getAddress, {
				lx: "02",
				fid: low_family_baseInfo.formInfo.qyxz || id,
			}).success(function(data) {
				low_family_baseInfo.otherSelect.villagesList = data;
				low_family_baseInfo.formInfo.qyxzc = low_family_baseInfo.formInfo.qyxzc;
			})
		}
		low_family_baseInfo.getNaturalVillagesByTown = function(id) {
			postForm.saveFrm(config.path.getAddress, {
				lx: "03",
				fid: low_family_baseInfo.formInfo.qyxzc || id,
			}).success(function(data) {
				low_family_baseInfo.otherSelect.naturalVillageList = data;
				low_family_baseInfo.formInfo.qyzrc = low_family_baseInfo.formInfo.qyzrc;
			})
		}

		//初始化所有级联地址
		low_family_baseInfo.getAddress = function(townId, villagesId) {
			if(low_family_baseInfo.otherSelect.townList)
				low_family_baseInfo.getTownVillages();
			low_family_baseInfo.getVillagesByTown(townId);
			low_family_baseInfo.getNaturalVillagesByTown(villagesId);
		}

		//判断本地是否有数据
		low_family_baseInfo.verdictStorage = function(id) {
			var data;
			try {
				if(JSON.parse(localStorage.getItem("low_family"))) {
					var localUserId = low_family_baseInfo.urlParam.type == "net" ?
						JSON.parse(localStorage.getItem("low_family")).baseInfo_model.id :
						JSON.parse(localStorage.getItem("low_family")).index_id;
					data = (localUserId == id) ?
						JSON.parse(localStorage.getItem("low_family")) : "";
				}
			} catch(e) {
				console.error("判断本地是否有数据，json转化错误")
			}
			return data;
		}

		//判断是否编辑
		if(low_family_baseInfo.urlParam.id) {
			$scope.userId = low_family_baseInfo.urlParam.id || "";
			try {
				if(low_family_baseInfo.verdictStorage(low_family_baseInfo.urlParam.id)) {
					//把data合并到表单对象中
					var infoObj = low_family_baseInfo.verdictStorage(low_family_baseInfo.urlParam.id).baseInfo_model;
					low_family_baseInfo.getAddress(infoObj.qyxz, infoObj.qyxzc);
					low_family_baseInfo.formInfo = infoObj
					low_family_baseInfo.oldObj = infoObj;
				} else {
					if(low_family_baseInfo.urlParam.type == "net") {
						postForm.saveFrm(config.path.lowFamilyById, {
							id: low_family_baseInfo.urlParam.id
						}).success(function(data) {
							var localData = fupin.lineToLocalData(data, lowFamilyInfoModel);
							fupin.localCache(JSON.stringify(localData));
							var infoObj = localData.baseInfo_model;
							low_family_baseInfo.getAddress(infoObj.qyxz, infoObj.qyxzc);
							low_family_baseInfo.formInfo = infoObj
							low_family_baseInfo.oldObj = infoObj;
						})
					}
					if(low_family_baseInfo.urlParam.type == "local") {
						dt.request({
							rqstName: "low_family", //'low_family', 'low_village', 'nature_village', 'relief_project'
							type: "selectById", //select,delete,put,selectById,
							param: {
								index_id: low_family_baseInfo.urlParam.id
							},
							success: function(data) {
								var infoObj = data.baseInfo_model;
								low_family_baseInfo.getAddress(infoObj.qyxz, infoObj.qyxzc);
								low_family_baseInfo.formInfo = infoObj;
								fupin.localCache(JSON.stringify(data));
							},
							'error': function(data) {
								fupin.alert("请求本地用户详细报错");
							}
						});
					}
				}
			} catch(e) {
				console.error("判断是否需要请求线上数据报错")
			}
		}

		//保存表单为本地数据库
		low_family_baseInfo.saveForm = function() {
			//保存对象之前判断是否是编辑
			if(low_family_baseInfo.urlParam.id) {
				var data = JSON.parse(window.localStorage.getItem("low_family"));
				angular.extend(data.baseInfo_model, low_family_baseInfo.formInfo);
				dt.request({
					rqstName: "low_family", //'low_family', 'low_village', 'nature_village', 'relief_project'
					type: "put", //select,delete,put,selectById,
					data: data,
					success: function(data) {
						if(data.type = "success") {
							//清空缓存
							fupin.localCache(JSON.stringify(data));
							$state.go("lowFamilyDraft");
							//window.history.go(-1);
						}
					},
					'error': function(data) {}
				});
			} else {
				low_family_baseInfo.newLocalData();
			}
		}

		low_family_baseInfo.newLocalData = function() {
			//保存接口
			var newId = fupin.randomChat();
			var data = {
				newId: newId,
				baseInfo_model: low_family_baseInfo.formInfo,
			}
			dt.request({
				rqstName: "low_family", //'low_family', 'low_village', 'nature_village', 'relief_project'
				type: "put", //select,delete,put,selectById,
				data: data,
				success: function(data) {
					console.log(data);
				},
				'error': function(data) {}
			});
		}

		low_family_baseInfo.saveCache = function() {
			var data = JSON.parse(window.localStorage.getItem("low_family"));
			angular.extend(data.baseInfo_model, low_family_baseInfo.formInfo);
			fupin.localCache(JSON.stringify(data));
		}

		/*//当路由跳转的时候判断是否保存为草稿
		$scope.$watch('$viewContentLoading', function(event, viewConfig) {
			alert('模板加载完成前');
		});
		//$viewContentLoaded- 当视图加载完成，DOM渲染完成之后触发，视图所在的$scope发出该事件。  
		$scope.$watch('$viewContentLoaded', function(event) {
			alert('模板加载完成后');
		});*/

		$scope.goback = function() {
			//调用本地数据库保存
			//保存表单
			if(!fupin.isValid(low_family_baseInfo.formInfo) || JSON.stringify(low_family_baseInfo.oldObj) != JSON.stringify(low_family_baseInfo.formInfo)) {
				fupin.confirm("确定保存为草稿吗？", function() {
					low_family_baseInfo.saveForm();
				}, function() {
					window.history.go(-1);
				})
			} else {
				window.history.go(-1);
			}
		}
		$rootScope.$on('$stateChangeStart',
			function(event, toState, toParams, fromState, fromParams) {
				low_family_baseInfo.saveCache();
			})
		//根据角色遍历响应的菜单
		$scope.low_family_baseInfo = low_family_baseInfo;
	}
]);