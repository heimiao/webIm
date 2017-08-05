//帮扶成效
myApp.controller("assistEffectCtro", ["$scope", "$rootScope", "$state", "$http", "$stateParams", "postForm",
	function($scope, $rootScope, $state, $http, $stateParams, postForm) {
		var assistEffect = {} || assistEffect;
		assistEffect.oldObj = {};
		assistEffect.urlParam = $stateParams;
		assistEffect.sendParam = {};
		assistEffect.formInfo = {};

		assistEffect.otherSelect = {
			bqfsList: config.sysValue.bqfs, //搬迁方式
			azfsList: config.sysValue.azfs, //脱贫情况
			azdList: config.sysValue.azd, //开户银行
		};

		$scope.userId = assistEffect.urlParam.id || "";
		$scope.dataType = assistEffect.urlParam.type || "";

		//判断是否编辑
		if(assistEffect.urlParam.id) {
			try {
				if(fupin.getCacheData(assistEffect.urlParam.id, assistEffect.urlParam.type)) {
					//把data合并到表单对象中
					var infoObj = assistEffect.verdictStorage(assistEffect.urlParam.id).assistEffect_model;
					assistEffect.formInfo = infoObj
					assistEffect.oldObj = infoObj;
				} else {
					if(assistEffect.urlParam.type == "net") {
						postForm.saveFrm(config.path.lowFamilyById, {
							id: assistEffect.urlParam.id
						}).success(function(data) {
							var localData = fupin.lineToLocalData(data, lowFamilyInfoModel);
							fupin.localCache(JSON.stringify(localData));
							var infoObj = localData.assistEffect_model;
							assistEffect.formInfo = infoObj
							assistEffect.oldObj = infoObj;
						})
					}
					if(assistEffect.urlParam.type == "local") {
						dt.request({
							rqstName: "low_family", //'low_family', 'low_village', 'nature_village', 'relief_project'
							type: "selectById", //select,delete,put,selectById,
							param: {
								index_id: assistEffect.urlParam.id
							},
							success: function(data) {
								var infoObj = data.assistEffect_model;
								assistEffect.formInfo = infoObj;
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
		assistEffect.saveForm = function() {
			//保存对象之前判断是否是编辑
			var saveData;
			if(assistEffect.urlParam.id) {
				saveData = JSON.parse(window.localStorage.getItem("low_family"));
				angular.extend(saveData.assistEffect_model, assistEffect.formInfo);
			} else {
				var newId = fupin.randomChat();
				saveData = {
					newId: newId,
					assistEffect_model: assistEffect.formInfo,
				}
			}
			fupin.saveLocalData(saveData);
		}

		assistEffect.saveCache = function() {
			var data = JSON.parse(window.localStorage.getItem("low_family"));
			angular.extend(data.assistEffect_model, assistEffect.formInfo);
			fupin.localCache(JSON.stringify(data));
		}
		$scope.goback = function() {
			//调用本地数据库保存
			//保存表单
			if(!fupin.isValid(assistEffect.formInfo) || JSON.stringify(assistEffect.oldObj) != JSON.stringify(assistEffect.formInfo)) {
				fupin.confirm("确定保存为草稿吗？", function() {
					assistEffect.saveForm();
				}, function() {
					window.history.go(-1);
				})
			} else {
				window.history.go(-1);
			}
		}

		$rootScope.$on('$stateChangeStart',
			function(event, toState, toParams, fromState, fromParams) {
				assistEffect.saveCache();
			})
		$scope.assistEffect = assistEffect;
	}
]);