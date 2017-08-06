//家庭成员
myApp.controller("lowFamilyMemberCtro", ["$scope", "$rootScope", "$state", "$http", "$stateParams", "postForm",
	function($scope, $rootScope, $state, $http, $stateParams, postForm) {
		var lowFamilyMember = {} || lowFamilyMember;

		lowFamilyMember.urlParam = $stateParams;
		lowFamilyMember.sendParam = {};
		$scope.userId = lowFamilyMember.urlParam.id || "";
		$scope.dataType = lowFamilyMember.urlParam.type || "";

		lowFamilyMember.list = [];

		//判断是否编辑
		if(lowFamilyMember.urlParam.id) {
			try {
				if(fupin.getCacheData(lowFamilyMember.urlParam.id, lowFamilyMember.urlParam.type)) {
					//把data合并到表单对象中
					var infoList = fupin.getCacheData(lowFamilyMember.urlParam.id, lowFamilyMember.urlParam.type).familyInfo_model;
					lowFamilyMember.list = fupin.mapArray(infoList, config.sysValue.YHZGX, "yhzgx", "value");
					lowFamilyMember.oldObj = infoList;

				} else {
					if(lowFamilyMember.urlParam.type == "net") {
						postForm.saveFrm(config.path.lowFamilyById, {
							id: lowFamilyMember.urlParam.id
						}).success(function(data) {
							var localData = fupin.lineToLocalData(data, lowFamilyInfoModel);

							//请求家庭成员
							postForm.saveFrm(config.path.getLowFamilyList, {
								fid: lowFamilyMember.urlParam.id
							}).success(function(args) {
								var datas = args;
								$.each(datas, function(index, item) {
									if(item.filegrpid)
										angular.extend(item, {
											pkhjc_fj_id: item.filegrpid
										});
								});
								var jtcy = fupin.mapArray(datas, config.sysValue.YHZGX, "yhzgx", "value");
								localData.familyInfo_model = jtcy;
								lowFamilyMember.list = jtcy;
								lowFamilyMember.oldObj = datas;
								fupin.localCache(JSON.stringify(localData));
								//请求帮扶责任人
								postForm.saveFrm(config.path.getassistPersonList, {
									fid: lowFamilyMember.urlParam.id
								}).success(function(datas) {
									localData.assistPerson_model = datas;
									fupin.localCache(JSON.stringify(localData));
								});
							});

							fupin.localCache(JSON.stringify(localData));

						})
					}
					if(lowFamilyMember.urlParam.type == "local") {
						dt.request({
							rqstName: "low_family", //'low_family', 'low_village', 'nature_village', 'relief_project'
							type: "selectById", //select,delete,put,selectById,
							param: {
								index_id: lowFamilyMember.urlParam.id
							},
							success: function(data) {
								var infoList = data.familyInfo_model;
								lowFamilyMember.list = infoList;
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
				console.error(e)
				console.error("获取本地数据错误")
			}
		}
		//保存表单为本地数据库
		lowFamilyMember.saveForm = function() {
			//保存对象之前判断是否是编辑
			var saveData, formData = lowFamilyMember.list;
			if(lowFamilyMember.urlParam.id) {
				saveData = JSON.parse(window.localStorage.getItem("low_family"));

				$.each(formData, function(index, item) {
					if(typeof(item.yhzgx) == "object") {
						item.yhzgx = item.yhzgx.value;
					}
				});
				angular.extend(saveData, {
					familyInfo_model: formData
				});
			} else {
				saveData = JSON.parse(window.localStorage.getItem("low_family"));
				//保存接口
				var newId = fupin.randomChat();
				var data = {
					newId: newId,
					familyInfo_model: formData,
				}
			}
			fupin.saveLocalData(saveData);
		}

		$scope.$on("$destroy", function() {
			var data = JSON.parse(window.localStorage.getItem("low_family"));
			angular.extend(data.baseInfo_model, low_family_baseInfo.formInfo);
			fupin.localCache(JSON.stringify(data));
		})

		$scope.lowFamilyMember = lowFamilyMember;
	}
]);

myApp.controller("addFamilyMemberCtro", ["$scope", "$rootScope", "$state", "$http", "$stateParams", "Upload", "$timeout", "postForm",
	function($scope, $rootScope, $state, $http, $stateParams, Upload, $timeout, postForm) {
		var addFamilyMember = {} || addFamilyMember;

		addFamilyMember.urlParam = $stateParams;
		addFamilyMember.sendParam = {};

		$scope.userId = addFamilyMember.urlParam.id || "";
		$scope.dataType = addFamilyMember.urlParam.type || "";
		addFamilyMember.formInfo = {
			pkhjc_fj_id: "",
		};

		addFamilyMember.otherSelect = {
			yhzgxList: config.sysValue.YHZGX,
			mzList: config.sysValue.MZ,
			zzmmList: config.sysValue.ZZMM,
			whcdList: config.sysValue.WHCD,
			zxqkList: config.sysValue.ZXQK,
			jkzkList: config.sysValue.JKZK,
			ldjnList: config.sysValue.LDJL,
			wgqkList: config.sysValue.WGQK,
			pkrklxList: config.sysValue.PKLX,
			rybgList: config.sysValue.RYBG,
			headUrl: "",
		};
		var dataAll = JSON.parse(window.localStorage.getItem("low_family"));
		switch(dataAll.baseInfo_model.bhksx) {
			case "ybpkh":
				//一般
				addFamilyMember.otherSelect.pkrklxList = config.sysValue.PKLX;
				break;
			case "dbpkh":
				//低保
				addFamilyMember.otherSelect.pkrklxList = config.sysValue.DBPKLX;
				break;
			case "wbpkh":
				//五保
				addFamilyMember.otherSelect.pkrklxList = config.sysValue.WBPKLX;
				break;
			default:
				addFamilyMember.otherSelect.pkrklxList = config.sysValue.PKLX;
				break;
		}

		//如果是编辑的话就赋值给formInfo
		if(addFamilyMember.urlParam.memberId) {
			//判断是否修改数据
			if(dataAll.familyInfo_model.length > 0) {
				$.each(dataAll.familyInfo_model, function(idnex, item) {
					if(item.id == addFamilyMember.urlParam.memberId) {
						if(typeof(addFamilyMember.formInfo.yhzgx) == "object") {
							addFamilyMember.formInfo.yhzgx = addFamilyMember.formInfo.yhzgx.value;
						}
						addFamilyMember.formInfo = item;
						addFamilyMember.otherSelect.headUrl = config.path.getUploadHead + "?id=" + addFamilyMember.formInfo.pkhjc_fj_id
					}
				});
			}
		}

		addFamilyMember.saveForm = function() {
			if(addFamilyMember.urlParam.memberId) {
				//判断是否修改数据
				if(dataAll.familyInfo_model.length > 0) {
					$.each(dataAll.familyInfo_model, function(index, item) {
						if(item.id == addFamilyMember.urlParam.memberId) {
							angular.extend(item, addFamilyMember.formInfo)
						}
					});
				}
			} else {
				dataAll.familyInfo_model.push(angular.extend(addFamilyMember.formInfo, {
					id: fupin.randomChat()
				}));
			}
			fupin.localCache(JSON.stringify(dataAll));
			$state.go("lowFamily", {
				showForm: "familyMember",
				id: addFamilyMember.urlParam.id,
				type: addFamilyMember.urlParam.type
			});
		}

		addFamilyMember.uploadPic = function() {
			var file = $scope.testFile;
			file.upload = Upload.upload({
				url: config.path.uploadHead,
				data: {
					file: file,
					ywid: addFamilyMember.urlParam.memberId
				}
			});
			file.upload.then(function(response) {
				try {
					addFamilyMember.formInfo.pkhjc_fj_id = response.data.results.id;
					addFamilyMember.otherSelect.headUrl = config.path.getUploadHead + "?id=" + response.data.results.id;
					//					console.log(addFamilyMember.otherSelect.headUrl);
					//					addFamilyMember.getHead(response.data.results.id);
				} catch(e) {
					//TODO handle the exception
				}
				$scope.testFile = "";
				$timeout(function() {
					file.result = response.data;
				});
			}, function(response) {
				if(response.status > 0)
					$scope.errorMsg = response.status + ': ' + response.data;
			}, function(evt) {
				// Math.min is to fix IE which reports 200% sometimes
				file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			});
		}
		addFamilyMember.delForm = function() {
			var ary = [];
			$.each(dataAll.familyInfo_model, function(index, item) {
				if(item.id != addFamilyMember.urlParam.memberId) {
					ary.push(item);
				}
			});
			dataAll.familyInfo_model = ary;
			addFamilyMember.formInfo = {};
			addFamilyMember.otherSelect.headUrl = "",
				addFamilyMember.urlParam.memberId = "";
			fupin.localCache(JSON.stringify(dataAll));
		}
		$scope.addFamilyMember = addFamilyMember;
	}
]);