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
								//请求家庭成员
								postForm.saveFrm(config.path.getLowFamilyList, {
									fid: lowFamilyCauses.urlParam.id
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
										fid: lowFamilyCauses.urlParam.id
									}).success(function(datas) {
										localData.assistPerson_model = datas;
										fupin.localCache(JSON.stringify(localData));
									});
								});
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

		$scope.$on("$destroy", function() {
			var data = JSON.parse(window.localStorage.getItem("low_family"));
			angular.extend(data.povertyCauses_model, lowFamilyCauses.formInfo);
			fupin.localCache(JSON.stringify(data));
		})

		$scope.lowFamilyCauses = lowFamilyCauses;
	}
]);