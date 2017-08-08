/*//家庭成员
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
					lowFamilyMember.list = fupin.mapArrays(infoList, config.sysValue.YHZGX, "yhzgx", "value");

					console.log(lowFamilyMember.list);
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
								localData.familyInfo_model = datas;
								var jtcy = fupin.mapArrays(datas, config.sysValue.YHZGX, "yhzgx", "value");
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
								var infoLists = data.familyInfo_model;
								var jtcy = fupin.mapArrays(infoLists, config.sysValue.YHZGX, "yhzgx", "value");
								lowFamilyMember.list = jtcy;
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
		} else {
			//把data合并到表单对象中
			var data = JSON.parse(window.localStorage.getItem("low_family"));
			var infoList = data.familyInfo_model;
			lowFamilyMember.list = fupin.mapArrays(infoList, config.sysValue.YHZGX, "yhzgx", "value");
			// fupin.mapArray(infoList, config.sysValue.YHZGX, "yhzgx", "value");
			lowFamilyMember.oldObj = infoList;
		}

		lowFamilyMember.saveCache = function() {
			var data = JSON.parse(window.localStorage.getItem("low_family"));
			$.each(data, function(index, item) {
				if(typeof(item.yhzgx) == "object") {
					item.yhzgx = item.yhzgx.value;
				}
			});

			angular.extend(data.familyInfo_model, lowFamilyMember.list);
			fupin.localCache(JSON.stringify(data));
		}

		$scope.$on("$destroy", function() {
			lowFamilyMember.saveCache();
		})

		$scope.lowFamilyMember = lowFamilyMember;
	}
]);*/

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

		addFamilyMember.goback = function() {
			fupin.confirms("确定保存吗？", function() {
				addFamilyMember.saveForm();
			}, function() {
				window.history.go(-1);
			})
		}

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
						if(typeof(item.yhzgx) == "object") {
							item.yhzgx = item.yhzgx.value;
						}
						addFamilyMember.formInfo = item;
						addFamilyMember.otherSelect.headUrl = config.path.getUploadHead + "?id=" + addFamilyMember.formInfo.pkhjc_fj_id
					}
				});
			}
		}

		addFamilyMember.saveForm = function() {
			if(addFamilyMember.urlParam.memberId) {
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
						window.history.go(-1);
			/*	$state.go("lowFamily", {
					showForm: "familyMember",
					id: addFamilyMember.urlParam.id,
					type: addFamilyMember.urlParam.type
				});*/
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