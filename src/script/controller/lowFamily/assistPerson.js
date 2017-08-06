myApp.controller("assistPersonCtro", ["$scope", "$rootScope", "$state", "$http", "$stateParams", "postForm",
	function($scope, $rootScope, $state, $http, $stateParams, postForm) {
		var assistPerson = {} || assistPerson;
		assistPerson.urlParam = $stateParams;
		assistPerson.sendParam = {};
		$scope.userId = assistPerson.urlParam.id || "";
		$scope.dataType = assistPerson.urlParam.type || "";

		assistPerson.list = [];

		//判断是否编辑
		if(assistPerson.urlParam.id) {
			try {
				if(fupin.getCacheData(assistPerson.urlParam.id, assistPerson.urlParam.type)) {
					//把data合并到表单对象中
					var infoList = fupin.getCacheData(assistPerson.urlParam.id, assistPerson.urlParam.type).assistPerson_model;
					assistPerson.list = fupin.mapArray(infoList, config.sysValue.YHZGX, "yhzgx", "value");
					assistPerson.oldObj = infoList;
				} else {
					if(assistPerson.urlParam.type == "net") {
						postForm.saveFrm(config.path.lowFamilyById, {
							id: assistPerson.urlParam.id
						}).success(function(data) {
							var localData = fupin.lineToLocalData(data, lowFamilyInfoModel);
							//请求家庭成员
							postForm.saveFrm(config.path.getLowFamilyList, {
								fid: assistPerson.urlParam.id
							}).success(function(args) {
								var datas = args;
								$.each(datas, function(index, item) {
									if(item.filegrpid)
										angular.extend(item, {
											pkhjc_fj_id: item.filegrpid
										});
								});
								/*var jtcy = fupin.mapArray(datas, config.sysValue.YHZGX, "yhzgx", "value");
								localData.familyInfo_model = jtcy;*/
								localData.familyInfo_model = datas;
								fupin.localCache(JSON.stringify(localData));
								//请求帮扶责任人
								postForm.saveFrm(config.path.getassistPersonList, {
									fid: assistPerson.urlParam.id
								}).success(function(datas) {
									localData.assistPerson_model = datas;
									assistPerson.list = datas
									assistPerson.oldObj = datas;
									fupin.localCache(JSON.stringify(localData));
								});
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
								var infoList = data.assistPerson_model;
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
				console.error(e);
				console.error("获取数据来源错误")
			}
		}
		//保存表单为本地数据库
		assistPerson.saveForm = function() {
			//保存对象之前判断是否是编辑
			var saveData;
			if(assistPerson.urlParam.id) {
				saveData = JSON.parse(window.localStorage.getItem("low_family"));
				angular.extend(saveData, {
					assistPerson_model: assistPerson.list
				});
			} else {
				var datas = JSON.parse(window.localStorage.getItem("low_family"));
				//保存接口
				var newId = fupin.randomChat();
				var saveData = {
					newId: newId,
					assistPerson_model: datas.assistPerson_model,
				}
			}
			fupin.saveLocalData(saveData);
		}

		$scope.$on("$destroy", function() {
			var data = JSON.parse(window.localStorage.getItem("low_family"));
			angular.extend(data.assistPerson, assistPerson.list);
			fupin.localCache(JSON.stringify(data));
		})

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
			if(dataAll.assistPerson_model.length > 0) {
				$.each(dataAll.assistPerson_model, function(idnex, item) {
					if(item.id == addAsistPerson.urlParam.personId) {
						addAsistPerson.formInfo = item;
					}
				});
			}
		}
		addAsistPerson.saveForm = function() {
			if(addAsistPerson.urlParam.personId) {
				//判断是否修改数据
				if(dataAll.assistPerson_model.length > 0) {
					$.each(dataAll.assistPerson_model, function(index, item) {
						if(item.id == addAsistPerson.urlParam.personId) {
							angular.extend(item, addAsistPerson.formInfo)
						}
					});
				}
			} else {
				dataAll.assistPerson_model.push(angular.extend(addAsistPerson.formInfo, {
					id: fupin.randomChat()
				}));
			}
			fupin.localCache(JSON.stringify(dataAll));

			$state.go("lowFamily", {
				showForm: "assistPerson",
				id: addAsistPerson.urlParam.id,
				type: addAsistPerson.urlParam.type
			});
		}
		addAsistPerson.delForm = function() {
			var ary = [];
			$.each(dataAll.assistPerson_model, function(index, item) {
				if(item.id != addAsistPerson.urlParam.personId) {
					ary.push(item);
				}
			});
			dataAll.assistPerson_model = ary;
			addAsistPerson.formInfo = {};
			addAsistPerson.otherSelect.headUrl = "",
				addAsistPerson.urlParam.personId = "";
			fupin.localCache(JSON.stringify(dataAll));
		}
		$scope.addAsistPerson = addAsistPerson;
	}
]);