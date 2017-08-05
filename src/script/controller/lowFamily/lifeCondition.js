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
			khyhList: config.sysValue.khyh, //开户银行
		};

		//获取城镇
		lifeCondition.getTownVillages = function() {
			lifeCondition.otherSelect.villagesList = [];
			lifeCondition.otherSelect.naturalVillageList = [];
			if(lifeCondition.formInfo.qyzrc)
				lifeCondition.formInfo.qyzrc = "";
			if(lifeCondition.formInfo.qyxzc)
				lifeCondition.formInfo.qyxzc = "";
			postForm.saveFrm(config.path.getAddress, {
				lx: "01"
			}).success(function(data) {
				lifeCondition.otherSelect.townList = data;
				lifeCondition.formInfo = lifeCondition.formInfo;
			})
		}
		if(lifeCondition.otherSelect.townList)
			lifeCondition.getTownVillages();
		//根据乡镇获取对应村庄
		lifeCondition.getVillagesByTown = function(id) {
			lifeCondition.otherSelect.naturalVillageList = [];
			lifeCondition.formInfo.qyzrc = "";
			postForm.saveFrm(config.path.getAddress, {
				lx: "02",
				fid: lifeCondition.formInfo.qyxz || id,
			}).success(function(data) {
				lifeCondition.otherSelect.villagesList = data;
				lifeCondition.formInfo.qyxzc = lifeCondition.formInfo.qyxzc;
			})
		}
		lifeCondition.getNaturalVillagesByTown = function(id) {
			postForm.saveFrm(config.path.getAddress, {
				lx: "03",
				fid: lifeCondition.formInfo.qyxzc || id,
			}).success(function(data) {
				lifeCondition.otherSelect.naturalVillageList = data;
				lifeCondition.formInfo.qyzrc = lifeCondition.formInfo.qyzrc;
			})
		}

		//初始化所有级联地址
		lifeCondition.getAddress = function(townId, villagesId) {
			if(lifeCondition.otherSelect.townList)
				lifeCondition.getTownVillages();
			lifeCondition.getVillagesByTown(townId);
			lifeCondition.getNaturalVillagesByTown(villagesId);
		}

		//判断本地是否有数据
		lifeCondition.verdictStorage = function(id) {
			var data;
			try {
				if(JSON.parse(localStorage.getItem("low_family"))) {
					var localUserId = lifeCondition.urlParam.type == "net" ?
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
		if(lifeCondition.urlParam.id) {
			$scope.userId = lifeCondition.urlParam.id || "";
			try {
				if(lifeCondition.verdictStorage(lifeCondition.urlParam.id)) {
					//把data合并到表单对象中
					var infoObj = lifeCondition.verdictStorage(lifeCondition.urlParam.id).lifeCondition_model;
					lifeCondition.getAddress(infoObj.qyxz, infoObj.qyxzc);
					lifeCondition.formInfo = infoObj
					lifeCondition.oldObj = infoObj;
				} else {
					if(lifeCondition.urlParam.type == "net") {
						postForm.saveFrm(config.path.lowFamilyById, {
							id: lifeCondition.urlParam.id
						}).success(function(data) {
							var localData = fupin.lineToLocalData(data, lowFamilyInfoModel);
							fupin.localCache(JSON.stringify(localData));
							var infoObj = localData.lifeCondition_model;
							lifeCondition.getAddress(infoObj.qyxz, infoObj.qyxzc);
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
								lifeCondition.getAddress(infoObj.qyxz, infoObj.qyxzc);
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
			//保存对象之前判断是否是编辑
			if(lifeCondition.urlParam.id) {
				var data = JSON.parse(window.localStorage.getItem("low_family"));
				angular.extend(data.lifeCondition_model, lifeCondition.formInfo);
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
				lifeCondition.newLocalData();
			}
		}

		lifeCondition.newLocalData = function() {
			//保存接口
			var newId = fupin.randomChat();
			var data = {
				newId: newId,
				lifeCondition_model: lifeCondition.formInfo,
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

		lifeCondition.saveCache = function() {
			var data = JSON.parse(window.localStorage.getItem("low_family"));
			angular.extend(data.lifeCondition_model, lifeCondition.formInfo);
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
			if(!fupin.isValid(lifeCondition.formInfo) || JSON.stringify(lifeCondition.oldObj) != JSON.stringify(lifeCondition.formInfo)) {
				fupin.confirm("确定保存为草稿吗？", function() {
					lifeCondition.saveForm();
				}, function() {
					window.history.go(-1);
				})
			} else {
				window.history.go(-1);
			}
		}

		$rootScope.$on('$stateChangeStart',
			function(event, toState, toParams, fromState, fromParams) {
				lifeCondition.saveCache();
			})
		$scope.lifeCondition = lifeCondition;
	}
]);