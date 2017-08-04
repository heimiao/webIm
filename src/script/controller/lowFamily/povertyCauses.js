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

		//判断本地是否有数据
		lowFamilyCauses.verdictStorage = function(id) {
			var data;
			try {
				if(JSON.parse(localStorage.getItem("low_family"))) {
					var localUserId = lowFamilyCauses.urlParam.type == "net" ?
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
		if(lowFamilyCauses.urlParam.id) {
			try {
				if(lowFamilyCauses.verdictStorage(lowFamilyCauses.urlParam.id)) {
					var infoObj = lowFamilyCauses.verdictStorage(lowFamilyCauses.urlParam.id).povertyCauses_model;
					lowFamilyCauses.formInfo = infoObj
					lowFamilyCauses.oldObj = infoObj;
//					console.log(lowFamilyCauses.formInfo);
					
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
			} catch(e) {
				console.error("判断是否需要请求线上数据报错")
			}
		}

		//保存表单为本地数据库
		lowFamilyCauses.saveForm = function() {
			//保存对象之前判断是否是编辑
			if(lowFamilyCauses.urlParam.id) {
				var data = JSON.parse(window.localStorage.getItem("low_family"));
				angular.extend(data.baseInfo_model, lowFamilyCauses.formInfo);
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
				lowFamilyCauses.newLocalData();
			}
		}

		lowFamilyCauses.newLocalData = function() {
			//保存接口
			var newId = fupin.randomChat();
			var data = {
				newId: newId,
				baseInfo_model: lowFamilyCauses.formInfo,
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

		lowFamilyCauses.saveCache = function() {
			var data = JSON.parse(window.localStorage.getItem("low_family"));
			angular.extend(data.baseInfo_model, lowFamilyCauses.formInfo);
			fupin.localCache(JSON.stringify(data));
		}

		$scope.goback = function() {
			//调用本地数据库保存
			//保存表单
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