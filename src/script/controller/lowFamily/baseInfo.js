/*myApp.controller("low_family_baseCtro", ["$scope", "$rootScope", "$state", "$http", "$stateParams", "postForm",
	function($scope, $rootScope, $state, $http, $stateParams, postForm) {
		var low_family_baseInfo = {} || low_family_baseInfo;
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
			yearList: config.sysValue.year,
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
		//判断是否编辑
		if(low_family_baseInfo.urlParam.id) {
			try {
				var cacheData = fupin.getCacheData(low_family_baseInfo.urlParam.id, low_family_baseInfo.urlParam.type)

				if(cacheData) {
					//把data合并到表单对象中
					var infoObj = cacheData.baseInfo_model;
					low_family_baseInfo.getAddress(infoObj.qyxz, infoObj.qyxzc);
					low_family_baseInfo.formInfo = infoObj
					low_family_baseInfo.oldObj = infoObj;
				} else {
					try {
						if(low_family_baseInfo.urlParam.type == "net") {
							postForm.saveFrm(config.path.lowFamilyById, {
								id: low_family_baseInfo.urlParam.id
							}).success(function(data) {
								var localData = fupin.lineToLocalData(data, lowFamilyInfoModel);
								//请求家庭成员
								postForm.saveFrm(config.path.getLowFamilyList, {
									fid: low_family_baseInfo.urlParam.id
								}).success(function(args) {
									var datas = args;
									$.each(datas, function(index, item) {
										if(item.filegrpid)
											angular.extend(item, {
												pkhjc_fj_id: item.filegrpid
											});
									});

									localData.familyInfo_model = datas;
									fupin.localCache(JSON.stringify(localData));
									fupin.oldLocalCache(JSON.stringify(data));
									//请求帮扶责任人
									postForm.saveFrm(config.path.getassistPersonList, {
										fid: low_family_baseInfo.urlParam.id
									}).success(function(datas) {
										localData.assistPerson_model = datas;
										fupin.localCache(JSON.stringify(localData));
										fupin.oldLocalCache(JSON.stringify(data));
										$scope.$watchCollection("low_family_baseInfo.formInfo", function() {
											low_family_baseInfo.saveCache();
										});
									});
								});

								fupin.localCache(JSON.stringify(localData));
								fupin.oldLocalCache(JSON.stringify(data));
								var infoObj = localData.baseInfo_model;
								low_family_baseInfo.getAddress(infoObj.qyxz, infoObj.qyxzc);
								low_family_baseInfo.formInfo = infoObj
								low_family_baseInfo.oldObj = infoObj;

							})
						}
					} catch(e) {
						$.alert("请查看是否断网")
					}
					try {
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
									fupin.oldLocalCache(JSON.stringify(data));

									$scope.$watchCollection("low_family_baseInfo.formInfo", function() {
										low_family_baseInfo.saveCache();
									});

								},
								'error': function(data) {
									fupin.alert("请求本地用户详细报错");
								}
							});
						}
					} catch(e) {
						$.alert("请查看本地数据库是否存在该数据")
					}
				}
				//转化
				low_family_baseInfo.formInfo.lxdh = parseInt(low_family_baseInfo.formInfo.lxdh);
			} catch(e) {
				console.error("判断是否需要请求线上数据报错")
			}
		} else {
			if(window.localStorage.getItem("low_family")) {
				var data = JSON.parse(window.localStorage.getItem("low_family"));
				low_family_baseInfo.getAddress(data.baseInfo_model.qyxz, data.baseInfo_model.qyxzc);
				low_family_baseInfo.formInfo = data.baseInfo_model;
			} else {
				fupin.localCache(JSON.stringify(lowFamilyInfoModel));
				fupin.oldLocalCache(JSON.stringify(lowFamilyInfoModel));
			}

			$scope.$watchCollection("low_family_baseInfo.formInfo", function() {
				low_family_baseInfo.saveCache();
			});
		}

		//保存表单为本地数据库
		low_family_baseInfo.saveForm = function() {
			//保存对象之前判断是否是编辑
			var saveData, formData = low_family_baseInfo.formInfo;
			if(window.localStorage.getItem("low_family")) {
				saveData = JSON.parse(window.localStorage.getItem("low_family"));
				angular.extend(saveData.baseInfo_model, formData);
			} else {
				//保存接口
				var newId = fupin.randomChat();
				saveData = {
					newId: newId,
					baseInfo_model: low_family_baseInfo.formInfo,
				}
			}
			fupin.saveLocalData(saveData);
		}

		low_family_baseInfo.saveCache = function() {
			var data = JSON.parse(window.localStorage.getItem("low_family"));
			angular.extend(data.baseInfo_model, low_family_baseInfo.formInfo);
			fupin.localCache(JSON.stringify(data));
		}

		$scope.$on("$destroy", function() {
			low_family_baseInfo.saveCache();
		})
		//根据角色遍历响应的菜单
		$scope.low_family_baseInfo = low_family_baseInfo;
	}
]);*/