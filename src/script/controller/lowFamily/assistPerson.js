myApp.controller("assistPersonCtro", ["$scope", "$rootScope", "$state", "$http", "$stateParams", "postForm",
	function($scope, $rootScope, $state, $http, $stateParams, postForm) {
		var assistPerson = {} || assistPerson;
		assistPerson.urlParam = $stateParams;
		assistPerson.sendParam = {};
		$scope.userId = assistPerson.urlParam.id || "";
		$scope.dataType = assistPerson.urlParam.type || "";

		assistPerson.list = [];

		//判断本地是否有数据
		assistPerson.verdictStorage = function(id) {
			var data;
			try {
				if(JSON.parse(localStorage.getItem("low_family"))) {
					var localUser = JSON.parse(localStorage.getItem("low_family"));
					var ids = assistPerson.urlParam.type == "net" ? localUser.baseInfo_model.id : localUser.index_id;
					data = (ids == id && localUser.familyInfo_model.length > 0) ?
						JSON.parse(localStorage.getItem("low_family")) : "";
				}
			} catch(e) {
				console.error("判断本地是否有数据，json转化错误")
			}
			return data;
		}

		//判断是否编辑
		if(assistPerson.urlParam.id) {
			try {
				if(assistPerson.verdictStorage(assistPerson.urlParam.id)) {
					//把data合并到表单对象中
					var infoList = assistPerson.verdictStorage(assistPerson.urlParam.id).familyInfo_model;
					assistPerson.list = fupin.mapArray(infoList, config.sysValue.YHZGX, "yhzgx", "value");
					assistPerson.oldObj = infoList;

					console.log(assistPerson.list);
					console.log("数据来源本地缓存");
				} else {
					console.log("数据来源数据库");
					if(assistPerson.urlParam.type == "net") {
						postForm.saveFrm(config.path.lowFamilyById, {
							id: assistPerson.urlParam.id
						}).success(function(data) {
							//线上转化到本地
							var localData = fupin.lineToLocalData(data, lowFamilyInfoModel);
							postForm.saveFrm(config.path.getLowFamilyList, {
								fid: assistPerson.urlParam.id
							}).success(function(datas) {
								assistPerson.list = fupin.mapArray(datas, config.sysValue.YHZGX, "yhzgx", "value");;
								assistPerson.oldObj = datas;
								localData.familyInfo_model = datas;
								fupin.localCache(JSON.stringify(localData));
							});
						})
					}
					if(assistPerson.urlParam.type == "local") {
						dt.request({
							rqstName: "low_family", //'low_family', 'low_village', 'nature_village', 'relief_project'
							type: "selectById", //select,delete,put,selectById,
							param: {
								index_id: assistPerson.urlParam.id
							},
							success: function(data) {
								var infoList = data.familyInfo_model;
								assistPerson.list = infoList;
								fupin.localCache(JSON.stringify(data));
								$scope.$apply();
							},
							'error': function(data) {
								fupin.alert("请求本地用户详细报错");
							}
						});
					}
				}
			} catch(e) {
				console.error("获取本地数据错误")
			}
		}
		//保存表单为本地数据库
		assistPerson.saveForm = function() {
			//保存对象之前判断是否是编辑
			if(assistPerson.urlParam.id) {
				var data = JSON.parse(window.localStorage.getItem("low_family"));
				angular.extend(data, {
					familyInfo_model: assistPerson.list
				});
				dt.request({
					rqstName: "low_family", //'low_family', 'low_village', 'nature_village', 'relief_project'
					type: "put", //select,delete,put,selectById,
					data: data,
					success: function(data) {
						if(data.type = "success") {
							//清空缓存
							fupin.localCache(JSON.stringify(""));
							$state.go("lowFamilyDraft");
						}
					},
					'error': function(data) {}
				});

			} else {
				assistPerson.newLocalData();
			}
		}
		assistPerson.newLocalData = function() {
			var datas = JSON.parse(window.localStorage.getItem("low_family"));
			//保存接口
			var newId = fupin.randomChat();
			var data = {
				newId: newId,
				familyInfo_model: datas.familyInfo_model,
			}
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
		}

		$scope.goback = function() {
			//调用本地数据库保存
			//保存表单
			if(!fupin.isValid(assistPerson.list) || JSON.stringify(assistPerson.oldObj) != JSON.stringify(assistPerson.list)) {
				fupin.confirm("确定保存为草稿吗？", function() {
					assistPerson.saveForm();
				}, function() {
					window.history.go(-1);
				})
			} else {
				window.history.go(-1);
			}
		}
		$scope.assistPerson = assistPerson;
	}
]);

myApp.controller("addAsistPersonCtro", ["$scope", "$rootScope", "$state", "$http", "$stateParams", "Upload", "$timeout", "postForm",
	function($scope, $rootScope, $state, $http, $stateParams, Upload, $timeout, postForm) {
		var addAsistPerson = {} || addAsistPerson;

		addAsistPerson.urlParam = $stateParams;
		addAsistPerson.sendParam = {};

		$scope.userId = addAsistPerson.urlParam.id || "";
		$scope.dataType = addAsistPerson.urlParam.type || "";
		addAsistPerson.formInfo = {};

		addAsistPerson.otherSelect = {
			zzmmList: config.sysValue.ZZMM,
			lsgxList: config.sysValue.LSGX,
		};

		var dataAll = JSON.parse(window.localStorage.getItem("low_family"));

		//如果是编辑的话就赋值给formInfo
		if(addAsistPerson.urlParam.personId) {
			//判断是否修改数据
			if(dataAll.familyInfo_model.length > 0) {
				$.each(dataAll.familyInfo_model, function(idnex, item) {
					if(item.id == addAsistPerson.urlParam.personId) {
						addAsistPerson.formInfo = item;
					}
				});
			}
		}
		addAsistPerson.saveForm = function() {
			if(addAsistPerson.urlParam.personId) {
				//判断是否修改数据
				if(dataAll.familyInfo_model.length > 0) {
					$.each(dataAll.familyInfo_model, function(index, item) {
						if(item.id == addAsistPerson.urlParam.personId) {
							angular.extend(item, addAsistPerson.formInfo)
						}
					});
				}
			} else {
				dataAll.familyInfo_model.push(addAsistPerson.formInfo);
			}
			fupin.localCache(JSON.stringify(dataAll));
			$state.go("lowFamily.assistPerson", {
				id: addAsistPerson.urlParam.id,
				type: addAsistPerson.urlParam.type
			});
		}
		$scope.addAsistPerson = addAsistPerson;
	}
]);