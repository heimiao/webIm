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
							postForm.saveFrm(config.path.getassistPersonList, {
								fid: assistPerson.urlParam.id
							}).success(function(datas) {
								assistPerson.list = fupin.mapArray(datas, config.sysValue.YHZGX, "yhzgx", "value");
								assistPerson.oldObj = datas;
								localData.assistPerson_model = datas;
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
				console.error("获取本地数据错误")
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

			$state.go("lowFamily.assistPerson", {
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
				dataAll.assistPerson_model = ary;
				addAsistPerson.formInfo = {};
				addAsistPerson.urlParam.personId = "";
				fupin.localCache(JSON.stringify(dataAll));
			});
		}
		$scope.addAsistPerson = addAsistPerson;
	}
]);