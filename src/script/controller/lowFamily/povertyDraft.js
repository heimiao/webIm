//草稿箱控制器 
myApp.controller("lowFamilyDraftCtro", ["$scope", "$state", "$http", "$stateParams", "postForm",
	function($scope, $state, $http, $stateParams, postForm) {
		var lowFamilyDraft = {} || lowFamilyDraft;
		//获取参数
		lowFamilyDraft.urlParam = $stateParams;
		lowFamilyDraft.sendParam = {};

		lowFamilyDraft.list = [];

		lowFamilyDraft.townList = {};
		//映射列表专用村
		lowFamilyDraft.villagesList = {};

		lowFamilyDraft.bhksxList = config.sysValue.bhksx;

		window.localStorage.setItem("cont_index", "");

		//清楚缓存
		fupin.clearCacheByName();

		//获取城镇并且实现映射
		lowFamilyDraft.getTownVillages = function(args, name) {
			postForm.saveFrm(config.path.townShip, {
				lx: args
			}).success(function(data) {
				dataList = data;
				if(args == "01") {
					lowFamilyDraft.townList = data;
				}
				if(args == "02") {
					lowFamilyDraft.villagesList = data;
				}
				lowFamilyDraft.list.map(function(item, index, array) {
					return fupin.mapArray(item, dataList, name, "id");
				})
			})
		}

		lowFamilyDraft.getlocalData = function() {
			//获取当前用户信息  
			dt.request({
				rqstName: "low_family", //'low_family', 'low_village', 'nature_village', 'relief_project'
				type: "select", //select,delete,put,selectById,
				success: function(args) {
					var datas = args;
					datas.map(function(item, index, array) {
						$.each(item.familyInfo_model, function(i, j) {
							if(j["yhzgx"] == "01") {
								item.baseInfo_model.hzxm = j.xm;
							}
						});
						return fupin.mapArray(item, lowFamilyDraft.bhksxList, "bhksx", "value");;
					})

					//调用镇
					if(JSON.stringify(lowFamilyDraft.townList) == "{}") {
						lowFamilyDraft.getTownVillages("01", "qyxz");
					} else {
						datas.map(function(item, index, array) {
							return fupin.mapArray(item, lowFamilyDraft.townList, "qyxz", "id");
						})
					}
					//调用村
					if(JSON.stringify(lowFamilyDraft.villagesList) == "{}") {
						lowFamilyDraft.getTownVillages("02", "qyxzc");
					} else {
						datas.map(function(item, index, array) {
							return fupin.mapArray(item, lowFamilyDraft.townList, "qyxzc", "id");
						})
					}
					lowFamilyDraft.list = datas;
				},
				'error': function(args) {}
			});
		}

		lowFamilyDraft.getlocalData();
		//根据角色遍历响应的菜单
		$scope.lowFamilyDraft = lowFamilyDraft;
	}
]);