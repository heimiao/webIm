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

		//判断本地是否有数据
		income.verdictStorage = function(id) {
			var data;
			try {
				if(JSON.parse(localStorage.getItem("low_family"))) {
					var localUserId = income.urlParam.type == "net" ?
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
		if(income.urlParam.id) {
			try {
				if(income.verdictStorage(income.urlParam.id)) {
					//把data合并到表单对象中
					var infoObj = income.verdictStorage(income.urlParam.id).income_model;
					income.formInfo = infoObj
					income.oldObj = infoObj;
					console.log("本地缓存获取数据");
				} else {
					console.log("数据库获取数据");
					if(income.urlParam.type == "net") {
						postForm.saveFrm(config.path.lowFamilyById, {
							id: income.urlParam.id
						}).success(function(data) {
							var localData = fupin.lineToLocalData(data, lowFamilyInfoModel);
							fupin.localCache(JSON.stringify(localData));
							var infoObj = localData.income_model;
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
								var infoObj = data.income_model;
								income.formInfo = infoObj;
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
		income.saveForm = function() {
			//保存对象之前判断是否是编辑
			if(income.urlParam.id) {
				var data = JSON.parse(window.localStorage.getItem("low_family"));
				angular.extend(data.income_model, income.formInfo);
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
				income.newLocalData();
			}
		}

		income.newLocalData = function() {
			//保存接口
			var newId = fupin.randomChat();
			var data = {
				newId: newId,
				income_model: income.formInfo,
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

		income.saveCache = function() {
			var data = JSON.parse(window.localStorage.getItem("low_family"));
			angular.extend(data.income_model, income.formInfo);
			fupin.localCache(JSON.stringify(data));
		}
		$scope.goback = function() {
			//调用本地数据库保存
			//保存表单
			if(!fupin.isValid(income.formInfo) || JSON.stringify(income.oldObj) != JSON.stringify(income.formInfo)) {
				fupin.confirm("确定保存为草稿吗？", function() {
					income.saveForm();
				}, function() {
					window.history.go(-1);
				})
			} else {
				window.history.go(-1);
			}
		}
		$rootScope.$on('$stateChangeStart',
			function(event, toState, toParams, fromState, fromParams) {
				income.saveCache();
			})

		$scope.income = income;
		//根据角色遍历响应的菜单
	}
]);