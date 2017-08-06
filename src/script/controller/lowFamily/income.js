myApp.controller("incomeCtro", ["$scope", "$rootScope", "$state", "$http", "$stateParams", "postForm",
	function($scope, $rootScope, $state, $http, $stateParams, postForm) {
		var income = income || {};
		income.oldObj = {};
		income.urlParam = $stateParams;
		income.sendParam = {};
		income.formInfo = {};

		$scope.userId = income.urlParam.id || "";
		$scope.dataType = income.urlParam.type || "";

		income.otherSelect = {
			bhksxList: config.sysValue.bhksx, //贫困户属性
			tpqkList: config.sysValue.tpqk, //脱贫情况
			khyhList: config.sysValue.khyh, //开户银行
		};

		$scope.$watchCollection("income.formInfo", function() {
			income.countObj();
			var data = JSON.parse(window.localStorage.getItem("low_family"));
			angular.extend(data.income_model, income.formInfo);
			fupin.localCache(JSON.stringify(data));
		});

		//整体对象
		income.sumData = {};

		//判断是否编辑
		if(income.urlParam.id) {
			try {
				if(fupin.getCacheData(income.urlParam.id, income.urlParam.type)) {
					//把data合并到表单对象中
					try {
						income.sumData = fupin.getCacheData(income.urlParam.id, income.urlParam.type);
						var infoObj = income.sumData.income_model;
						income.formInfo = infoObj
						income.oldObj = infoObj;
					} catch(e) {
						console.error(e);
					}
				} else {
					try {
						if(income.urlParam.type == "net") {
							postForm.saveFrm(config.path.lowFamilyById, {
								id: income.urlParam.id
							}).success(function(data) {
								income.sumData = fupin.lineToLocalData(data, lowFamilyInfoModel);
								//请求家庭成员
								postForm.saveFrm(config.path.getLowFamilyList, {
									fid: income.urlParam.id
								}).success(function(args) {
									var datas = args;
									$.each(datas, function(index, item) {
										if(item.filegrpid)
											angular.extend(item, {
												pkhjc_fj_id: item.filegrpid
											});
									});
									/*var jtcy = fupin.mapArray(datas, config.sysValue.YHZGX, "yhzgx", "value");
									income.sumData.familyInfo_model = jtcy;*/
									localData.familyInfo_model = datas;
									fupin.localCache(JSON.stringify(income.sumData));
									//请求帮扶责任人
									postForm.saveFrm(config.path.getassistPersonList, {
										fid: income.urlParam.id
									}).success(function(datas) {
										income.sumData.assistPerson_model = datas;
										fupin.localCache(JSON.stringify(income.sumData));
									});
								});
								fupin.localCache(JSON.stringify(income.sumData));
								var infoObj = income.sumData.income_model;
								income.formInfo = infoObj
								income.oldObj = infoObj;
							})
						}
						if(income.urlParam.type == "local") {
							dt.request({
								rqstName: "low_family", //'low_family', 'low_village', 'nature_village', 'relief_project'
								type: "selectById", //select,delete,put,selectById,
								param: {
									index_id: income.urlParam.id
								},
								success: function(data) {
									income.sumData = data;
									fupin.localCache(JSON.stringify(income.sumData));
									var infoObj = income.sumData.income_model;
									income.formInfo = infoObj;
									income.oldObj = infoObj;
								},
								'error': function(data) {
									fupin.alert("请求本地用户详细报错");
								}
							});
						}
					} catch(e) {
						console.log("请求数据库报错");
					}
				}
				//人均收入
				income.formInfo.rjcsr = fupin.addRjcsr(income.sumData.familyInfo_model, income.formInfo);
				//生产经营性支出
				income.formInfo.scjyxzc = fupin.addScjyxzc(income.formInfo);
				//-转移性收入
				income.formInfo.zyxsr = fupin.addZyxsr(income.formInfo);

			} catch(e) {
				console.error(e)
				console.error("判断是否需要请求线上数据报错")
			}
		} else {
			if(window.localStorage.getItem("low_family")) {
				var data = JSON.parse(window.localStorage.getItem("low_family"));
				income.formInfo = data.income_model;
			} else {
				fupin.localCache(JSON.stringify(lowFamilyInfoModel));
				fupin.oldLocalCache(JSON.stringify(lowFamilyInfoModel));
			}
		}

		income.countObj = function() {
			//人均收入
			income.formInfo.rjcsr = fupin.addRjcsr(income.sumData.familyInfo_model, income.formInfo);
			//生产经营性支出
			income.formInfo.scjyxzc = fupin.addScjyxzc(income.formInfo);
			//-转移性收入
			income.formInfo.zyxsr = fupin.addZyxsr(income.formInfo);
		}

		//保存表单为本地数据库
		income.saveForm = function() {
			//保存对象之前判断是否是编辑
			var saveData;
			if(income.urlParam.id) {
				var saveData = JSON.parse(window.localStorage.getItem("low_family"));
				angular.extend(saveData.income_model, income.formInfo);
			} else {
				//保存接口
				var newId = fupin.randomChat();
				var data = {
					newId: newId,
					income_model: income.formInfo,
				}
			}
			fupin.saveLocalData(saveData);
		}

		$scope.$on("$destroy", function() {
			var data = JSON.parse(window.localStorage.getItem("low_family"));
			angular.extend(data.income_model, income.formInfo);
			fupin.localCache(JSON.stringify(data));
		})

		$scope.income = income;
		//根据角色遍历响应的菜单
	}
]);