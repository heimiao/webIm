myApp.controller("plantRelocationCtro", ["$scope", "$rootScope", "$state", "$http", "$stateParams", "postForm",
	function($scope, $rootScope, $state, $http, $stateParams, postForm) {
		var plantRelocation = {} || plantRelocation;
		plantRelocation.oldObj = {};
		plantRelocation.urlParam = $stateParams;
		plantRelocation.sendParam = {};
		plantRelocation.formInfo = {};

		plantRelocation.otherSelect = {
			bqfsList: config.sysValue.bqfs, //搬迁方式
			azfsList: config.sysValue.azfs, //脱贫情况
			azdList: config.sysValue.azd, //开户银行
		};

		$scope.userId = plantRelocation.urlParam.id || "";
		$scope.dataType = plantRelocation.urlParam.type || "";

		//判断是否编辑
		if(plantRelocation.urlParam.id) {
			try {
				if(fupin.getCacheData(plantRelocation.urlParam.id, plantRelocation.urlParam.type)) {
					//把data合并到表单对象中
					var infoObj = fupin.getCacheData(plantRelocation.urlParam.id, plantRelocation.urlParam.type).plantRelocation_model;
					plantRelocation.formInfo = infoObj
					plantRelocation.oldObj = infoObj;
				} else {
					if(plantRelocation.urlParam.type == "net") {
						postForm.saveFrm(config.path.lowFamilyById, {
							id: plantRelocation.urlParam.id
						}).success(function(data) {
							var localData = fupin.lineToLocalData(data, lowFamilyInfoModel);
							//请求家庭成员
							postForm.saveFrm(config.path.getLowFamilyList, {
								fid: plantRelocation.urlParam.id
							}).success(function(args) {
								var datas = args;
								$.each(datas, function(index, item) {
									if(item.filegrpid)
										angular.extend(item, {
											pkhjc_fj_id: item.filegrpid
										});
								});
								var jtcy = fupin.mapArray(datas, config.sysValue.YHZGX, "yhzgx", "value");
								localData.familyInfo_model = jtcy;
								fupin.localCache(JSON.stringify(localData));
								//请求帮扶责任人
								postForm.saveFrm(config.path.getassistPersonList, {
									fid: plantRelocation.urlParam.id
								}).success(function(datas) {
									localData.assistPerson_model = datas;
									fupin.localCache(JSON.stringify(localData));
								});
							});
							fupin.localCache(JSON.stringify(localData));
							var infoObj = localData.plantRelocation_model;
							plantRelocation.formInfo = infoObj
							plantRelocation.oldObj = infoObj;
						})
					}
					if(plantRelocation.urlParam.type == "local") {
						dt.request({
							rqstName: "low_family", //'low_family', 'low_village', 'nature_village', 'relief_project'
							type: "selectById", //select,delete,put,selectById,
							param: {
								index_id: plantRelocation.urlParam.id
							},
							success: function(data) {
								var infoObj = data.plantRelocation_model;
								plantRelocation.formInfo = infoObj;
								fupin.localCache(JSON.stringify(data));
							},
							'error': function(data) {
								fupin.alert("请求本地用户详细报错");
							}
						});
					}
				}
				var showData = plantRelocation.formInfo;
				for(var item in showData) {
					if(item != "azd" && item != "azfs" && item != "bqfs" && item != "sfbqh") {
						if(showData[item] == "Y") {
							showData[item] = true;
						} else {
							showData[item] = false;
						}
					}
				}
				plantRelocation.formInfo = showData;
			} catch(e) {
				console.error("判断是否需要请求线上数据报错")
			}
		}

		//保存表单为本地数据库
		plantRelocation.saveForm = function() {
			//保存对象之前判断是否是编辑

			var saveData, formData;
			formData = plantRelocation.formInfo;
			for(var item in formData) {
				if(item != "azd" && item != "azfs" && item != "bqfs" && item != "sfbqh") {
					if(formData[item]) {
						formData[item] = "Y"
					} else {
						formData[item] = "N"
					}
				}
			}
			if(plantRelocation.urlParam.id) {
				var saveData = JSON.parse(window.localStorage.getItem("low_family"));
				angular.extend(saveData.plantRelocation_model, plantRelocation.formInfo);
			} else {
				var newId = fupin.randomChat();
				saveData = {
					newId: newId,
					plantRelocation_model: plantRelocation.formInfo,
				}
			}
			fupin.saveLocalData(saveData);
		}

		plantRelocation.saveCache = function() {
			var data = JSON.parse(window.localStorage.getItem("low_family"));
			angular.extend(data.plantRelocation_model, plantRelocation.formInfo);
			fupin.localCache(JSON.stringify(data));
		}
		$scope.goback = function() {
			//调用本地数据库保存
			//保存表单
			if(!fupin.isValid(plantRelocation.formInfo) || JSON.stringify(plantRelocation.oldObj) != JSON.stringify(plantRelocation.formInfo)) {
				fupin.confirm("确定保存为草稿吗？", function() {
					plantRelocation.saveForm();
				}, function() {
					window.history.go(-1);
				})
			} else {
				window.history.go(-1);
			}
		}
		$rootScope.$on('$stateChangeStart',
			function(event, toState, toParams, fromState, fromParams) {
				plantRelocation.saveCache();
			})
		//根据角色遍历响应的菜单
		$scope.plantRelocation = plantRelocation;
	}
]);