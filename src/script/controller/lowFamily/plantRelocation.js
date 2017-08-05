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

		//判断本地是否有数据
		plantRelocation.verdictStorage = function(id) {
			var data;
			try {
				if(JSON.parse(localStorage.getItem("low_family"))) {
					var localUserId = plantRelocation.urlParam.type == "net" ?
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
		if(plantRelocation.urlParam.id) {
			$scope.userId = plantRelocation.urlParam.id || "";
			try {
				if(plantRelocation.verdictStorage(plantRelocation.urlParam.id)) {
					//把data合并到表单对象中
					var infoObj = plantRelocation.verdictStorage(plantRelocation.urlParam.id).plantRelocation_model;
					plantRelocation.formInfo = infoObj
					plantRelocation.oldObj = infoObj;
				} else {
					if(plantRelocation.urlParam.type == "net") {
						postForm.saveFrm(config.path.lowFamilyById, {
							id: plantRelocation.urlParam.id
						}).success(function(data) {
							var localData = fupin.lineToLocalData(data, lowFamilyInfoModel);
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
			} catch(e) {
				console.error("判断是否需要请求线上数据报错")
			}
		}

		//保存表单为本地数据库
		plantRelocation.saveForm = function() {
			//保存对象之前判断是否是编辑
			if(plantRelocation.urlParam.id) {
				var data = JSON.parse(window.localStorage.getItem("low_family"));
				angular.extend(data.plantRelocation_model, plantRelocation.formInfo);
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
				plantRelocation.newLocalData();
			}
		}

		plantRelocation.newLocalData = function() {
			//保存接口
			var newId = fupin.randomChat();
			var data = {
				newId: newId,
				plantRelocation_model: plantRelocation.formInfo,
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