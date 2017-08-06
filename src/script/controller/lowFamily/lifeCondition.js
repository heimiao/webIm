myApp.controller("lifeConditionCtro", ["$scope", "$rootScope", "$state", "$http", "$stateParams", "postForm",
	function($scope, $rootScope, $state, $http, $stateParams, postForm) {
		var lifeCondition = lifeCondition || {};
		lifeCondition.oldObj = {};
		lifeCondition.urlParam = $stateParams;
		lifeCondition.sendParam = {};
		lifeCondition.formInfo = {};

		$scope.userId = lifeCondition.urlParam.id || "";
		$scope.dataType = lifeCondition.urlParam.type || "";
		lifeCondition.otherSelect = {
			rhllxList: config.sysValue.rhllx, //入户类型
			zyrllxList: config.sysValue.zyrllx, //主要燃料类型
		};
		//判断是否编辑
		if(lifeCondition.urlParam.id) {
			try {
				if(fupin.getCacheData(lifeCondition.urlParam.id, lifeCondition.urlParam.type)) {
					//把data合并到表单对象中
					var infoObj = fupin.getCacheData(lifeCondition.urlParam.id, lifeCondition.urlParam.type).lifeCondition_model;
					lifeCondition.formInfo = infoObj
					lifeCondition.oldObj = infoObj;
				} else {
					if(lifeCondition.urlParam.type == "net") {
						postForm.saveFrm(config.path.lowFamilyById, {
							id: lifeCondition.urlParam.id
						}).success(function(data) {
							var localData = fupin.lineToLocalData(data, lowFamilyInfoModel);
							//请求家庭成员
							postForm.saveFrm(config.path.getLowFamilyList, {
								fid: lifeCondition.urlParam.id
							}).success(function(args) {
								var datas = args;
								$.each(datas, function(index, item) {
									if(item.filegrpid)
										angular.extend(item, {
											pkhjc_fj_id: item.filegrpid
										});
								});
								/*	var jtcy = fupin.mapArray(datas, config.sysValue.YHZGX, "yhzgx", "value");
									localData.familyInfo_model = jtcy;*/
								localData.familyInfo_model = datas;
								fupin.localCache(JSON.stringify(localData));
								//请求帮扶责任人
								postForm.saveFrm(config.path.getassistPersonList, {
									fid: lifeCondition.urlParam.id
								}).success(function(datas) {
									localData.assistPerson_model = datas;
									fupin.localCache(JSON.stringify(localData));
								});
							});
							fupin.localCache(JSON.stringify(localData));
							var infoObj = localData.lifeCondition_model;
							lifeCondition.formInfo = infoObj
							lifeCondition.oldObj = infoObj;
						})
					}
					if(lifeCondition.urlParam.type == "local") {
						dt.request({
							rqstName: "low_family", //'low_family', 'low_village', 'nature_village', 'relief_project'
							type: "selectById", //select,delete,put,selectById,
							param: {
								index_id: lifeCondition.urlParam.id
							},
							success: function(data) {
								var infoObj = data.lifeCondition_model;
								lifeCondition.formInfo = infoObj;
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
		lifeCondition.saveForm = function() {
			var saveData;
			if(lifeCondition.urlParam.id) {
				saveData = JSON.parse(window.localStorage.getItem("low_family"));
				angular.extend(data.lifeCondition_model, lifeCondition.formInfo);
			} else {
				var newId = fupin.randomChat();
				saveData = {
					newId: newId,
					lifeCondition_model: lifeCondition.formInfo,
				}
			}
			fupin.saveLocalData(saveData);
		}

		
		lifeCondition.saveCache = function() {
			var data = JSON.parse(window.localStorage.getItem("low_family"));
			angular.extend(data.lifeCondition_model, lifeCondition.formInfo);
			fupin.localCache(JSON.stringify(data));
		}
		$scope.$watchCollection("lifeCondition.formInfo", function() {
			lifeCondition.saveCache();
		});	
		$scope.$on("$destroy", function() {
			lifeCondition.saveCache();
		})

		$scope.lifeCondition = lifeCondition;
	}
]);