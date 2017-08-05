myApp.controller("lowFamilyCausesCtro", ["$scope", "$rootScope", "$state", "$http", "$stateParams", "postForm",
	function($scope, $rootScope, $state, $http, $stateParams, postForm) {
		$scope.userId = "";
		$scope.dataType = "";
		var lowFamilyCauses = lowFamilyCauses || {};
		lowFamilyCauses.newId = "123456";
		lowFamilyCauses.oldObj = {};
		lowFamilyCauses.urlParam = $stateParams;
		lowFamilyCauses.sendParam = {};
		lowFamilyCauses.formInfo = {};

		$scope.userId = lowFamilyCauses.urlParam.id || "";
		$scope.dataType = lowFamilyCauses.urlParam.type || "";

		lowFamilyCauses.otherSelect = {
			zyzpyyList: config.sysValue.zyzpyy, //主要致贫原因
		};
		//判断是否编辑
		if(lowFamilyCauses.urlParam.id) {

			try {
				if(fupin.getCacheData(lowFamilyCauses.urlParam.id, lowFamilyCauses.urlParam.type)) {
					var infoObj = fupin.getCacheData(lowFamilyCauses.urlParam.id, lowFamilyCauses.urlParam.type).povertyCauses_model;
					lowFamilyCauses.formInfo = infoObj
					lowFamilyCauses.oldObj = infoObj;
				} else {
					console.log("从数据库获取数据");
					if(lowFamilyCauses.urlParam.type == "net") {
						try {
							postForm.saveFrm(config.path.lowFamilyById, {
								id: lowFamilyCauses.urlParam.id
							}).success(function(data) {
								var localData = fupin.lineToLocalData(data, lowFamilyInfoModel);
								fupin.localCache(JSON.stringify(localData));
								var infoObj = localData.baseInfo_model;
								lowFamilyCauses.formInfo = infoObj
								lowFamilyCauses.oldObj = infoObj;
							})
						} catch(e) {
							console.error(e);
						}
					}
					if(lowFamilyCauses.urlParam.type == "local") {
						dt.request({
							rqstName: "low_family", //'low_family', 'low_village', 'nature_village', 'relief_project'
							type: "selectById", //select,delete,put,selectById,
							param: {
								index_id: lowFamilyCauses.urlParam.id
							},
							success: function(data) {
								var infoObj = data.baseInfo_model;
								lowFamilyCauses.formInfo = infoObj;
								fupin.localCache(JSON.stringify(data));
							},
							'error': function(data) {
								fupin.alert("请求本地用户详细报错");
							}
						});
					}
				}
				var linshi = lowFamilyCauses.formInfo;
				for(var item in linshi) {
					if(item != "zyzpyy") {
						if(linshi[item] == "Y") {
							linshi[item] = true;
						} else {
							linshi[item] = false;
						}
					}
				}
				lowFamilyCauses.formInfo = linshi;
			} catch(e) {
				console.error("判断是否需要请求线上数据报错")
			}
		}
		//保存表单为本地数据库
		lowFamilyCauses.saveForm = function() {
			//保存对象之前判断是否是编辑
			var saveData, formData;
			formData = lowFamilyCauses.formInfo;
			for(var item in formData) {
				if(item != "zyzpyy") {
					if(formData[item]) {
						formData[item] = "Y"
					} else {
						formData[item] = "N"
					}
				}
			}
			if(lowFamilyCauses.urlParam.id) {
				saveData = JSON.parse(window.localStorage.getItem("low_family"));
				angular.extend(saveData.baseInfo_model, formData);

			} else {
				var newId = fupin.randomChat();
				saveData = {
					newId: newId,
					baseInfo_model: formData,
				}
			}

			fupin.saveLocalData(saveData);
		}

		lowFamilyCauses.saveCache = function() {
			var data = JSON.parse(window.localStorage.getItem("low_family"));
			angular.extend(data.baseInfo_model, lowFamilyCauses.formInfo);
			fupin.localCache(JSON.stringify(data));
		}

		$scope.goback = function() {
			//调用本地数据库保存
			if(!fupin.isValid(lowFamilyCauses.formInfo) || JSON.stringify(lowFamilyCauses.oldObj) != JSON.stringify(lowFamilyCauses.formInfo)) {
				fupin.confirm("确定保存为草稿吗？", function() {
					lowFamilyCauses.saveForm();
				}, function() {
					window.history.go(-1);
				})
			} else {
				window.history.go(-1);
			}
		}

		$rootScope.$on('$stateChangeStart',
			function(event, toState, toParams, fromState, fromParams) {
				lowFamilyCauses.saveCache();
			})

		$scope.lowFamilyCauses = lowFamilyCauses;
	}
]);