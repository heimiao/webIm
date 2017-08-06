myApp.controller("lowFamilyInfoCtro", ["$scope", "$state", "$http", "$stateParams", "postForm",
	function($scope, $state, $http, $stateParams, postForm) {
		var lowFamilyInfo = {} || lowFamilyInfo;

		var low_family_baseInfo = {} || low_family_baseInfo;

		lowFamilyInfo.urlParam = $stateParams;
		//改变内容
		$scope.userId = lowFamilyInfo.urlParam.id || "";
		$scope.dataType = lowFamilyInfo.urlParam.type || "";

		lowFamilyInfo.changeCont = {};

		if(window.localStorage.getItem("cont_index") == 1) {
			lowFamilyInfo.changeCont.familyMember = true;
		} else if(window.localStorage.getItem("cont_index") == 2) {
			lowFamilyInfo.changeCont.assistPerson = true;
		} else {
			lowFamilyInfo.changeCont.baseInfo = true;
		}

		lowFamilyInfo.changeMenu = function() {
			lowFamilyInfo.menu = lowFamilyInfo.menu ? false : true;
			//根据菜单调用不同的formInfo
		}

		lowFamilyInfo.showForm = function(args) {
			if(args == "familyMember") {
				window.localStorage.setItem("cont_index", 1);
			} else if(args == "assistPerson") {
				window.localStorage.setItem("cont_index", 2);
			} else {
				window.localStorage.setItem("cont_index", "");
			}
			lowFamilyInfo.changeCont = {};
			lowFamilyInfo.changeCont[args] = true;
			lowFamilyInfo.changeMenu();
		}
		lowFamilyInfo.validate = function(data) {
			var bool = true;
			console.log(data);
			if(!data.baseInfo_model.qyxz) {
				fupin.alert("城镇不能为空");
				bool = false;
			} else if(!data.baseInfo_model.qyxzc) {
				fupin.alert("村不能为空");
				bool = false;
			} else if(data.baseInfo_model.familyInfo_model) {
				fupin.alert("户主不能为空");
				bool = false;
			} else if(!data.baseInfo_model.bhksx) {
				fupin.alert("贫困户类型不能为空");
				bool = false;
			}
			return bool;
		}
		lowFamilyInfo.goback = function(data) {
			var localDatas, old_localData;
			if(window.localStorage.getItem("low_family")) {
				localDatas = JSON.parse(window.localStorage.getItem("low_family"));
			}
			fupin.confirm("确定保存为草稿吗？", function() {
				if(lowFamilyInfo.validate(localDatas)) {
					var plantRelocation = localDatas.plantRelocation_model;
					for(var item in plantRelocation) {
						if(item != "azd" && item != "azfs" && item != "bqfs" && item != "sfbqh") {
							if(plantRelocation[item]) {
								plantRelocation[item] = "Y"
							} else {
								plantRelocation[item] = "N"
							}
						}
					}
					var povertyCauses = localDatas.povertyCauses_model;
					for(var item in povertyCauses) {
						if(item != "zyzpyy") {
							if(povertyCauses[item]) {
								povertyCauses[item] = "Y"
							} else {
								povertyCauses[item] = "N"
							}
						}
					}
					fupin.saveLocalData(localDatas);
				}
			}, function() {
				window.history.go(-1);
			})

		}
		//执行上传
		lowFamilyInfo.uploadSource = function() {

			var localData = JSON.parse(window.localStorage.getItem("low_family"));

			uploadData = {}, pkhzbObj = {}, ydb = "N";

			//人均收入
			pkhzbObj.rjcsr = fupin.addRjcsr(localData.familyInfo_model, localData.income_model);
			pkhzbObj.rjcsrdf = pkhzbObj.rjcsr > 3026 ? 30 : 0;

			//生产生活用电 
			pkhzbObj.scshyd = (localData.lifeCondition_model.sftscyd == "是" && localData.lifeCondition_model.sftshyd == "是") ? "有" : "无";
			pkhzbObj.scshyddf = pkhzbObj.scshyd == "有" ? 10 : 0;

			//安全住房
			pkhzbObj.ywzf = localData.lifeCondition_model.ywzf == "有" ? "有" : "无";
			pkhzbObj.ywzfdf = localData.lifeCondition_model.ywzf == "有" ? 15 : 0;
			if(localData.familyInfo_model.length > 0) {
				//因贫辍学
				pkhzbObj.ypcx =
					localData.familyInfo_model.some(function(item, index, array) {
						return(item["sfypcx"] == "是" || !item["sfypcx"]);
					}) ? "有" : "无";

				pkhzbObj.ypcxdf = pkhzbObj.ypcx == "无" ? 0 : 15;

				//合作医疗
				pkhzbObj.hzyl = localData.familyInfo_model.some(function(item, index, array) {
					return(item["sfcjxxnchzyl"] == "否" || !item["sfcjxxnchzyl"]);
				}) ? "未参加" : "参加";
				pkhzbObj.hzyldf = pkhzbObj.hzyl == "参加" ? 15 : 0;

				//医疗保险
				pkhzbObj.ylbx = localData.familyInfo_model.some(function(item, index, array) {
					return((item.sfcjcxjmjbylbx == "否" && item.nl >= 16 && item.zxsqk == "01" && item.nl <= 60) ||
						(!item.sfcjcxjmjbylbx && item.nl >= 16 && item.zxsqk == "01" && item.nl <= 60) ||
						(!item.sfcjcxjmjbylbx && item.nl >= 16 && !item.zxsqk && item.nl <= 60) ||
						(item.sfcjcxjmjbylbx == "否" && item.nl >= 16 && !item.zxsqk && item.nl <= 60))
				}) ? "未参加" : "参加";
				pkhzbObj.ylbxdf = pkhzbObj.ylbx == "参加" ? 10 : 0;
			}
			/*else {
				//因贫辍学
				pkhzbObj.ypcx = "";
				pkhzbObj.ypcxdf = 0;
				//合作医疗
				pkhzbObj.hzyl = "";
				pkhzbObj.hzyldf = 0;
				//医疗保险
				pkhzbObj.ylbx = "";
				pkhzbObj.ylbxdf = 0;
			}*/

			//总得分
			//			console.log(pkhzbObj.rjcsrdf, pkhzbObj.scshyddf, pkhzbObj.ywzfdf, pkhzbObj.ypcxdf, pkhzbObj.hzyldf, pkhzbObj.ylbxdf);

			pkhzbObj.zdf = pkhzbObj.rjcsrdf + pkhzbObj.scshyddf + pkhzbObj.ywzfdf + pkhzbObj.ypcxdf + pkhzbObj.hzyldf + pkhzbObj.ylbxdf;

			if(pkhzbObj.zdf >= 80 && localData.lifeCondition_model.ywzf == "有" && pkhzbObj.ypcxdf == 15 && pkhzbObj.hzyldf == 15) {
				if((localData.baseInfo_model.tpqk == "01" || localData.baseInfo_model.tpqk == "02" || localData.baseInfo_model.tpqk == "04")) {
					ydb = "N";
				} else {
					ydb = "Y";
				}
			} else {
				ydb = "N";
			}

			var plantRelocation = localData.plantRelocation_model;
			for(var item in plantRelocation) {
				if(item != "azd" && item != "azfs" && item != "bqfs" && item != "sfbqh") {
					if(plantRelocation[item]) {
						plantRelocation[item] = "Y"
					} else {
						plantRelocation[item] = "N"
					}
				}
			}
			var povertyCauses = localData.povertyCauses_model;
			for(var item in povertyCauses) {
				if(item != "zyzpyy") {
					if(povertyCauses[item]) {
						povertyCauses[item] = "Y"
					} else {
						povertyCauses[item] = "N"
					}
				}
			}

			angular.extend(uploadData, localData.baseInfo_model, localData.assistEffect_model, localData.income_model, localData.lifeCondition_model, povertyCauses, plantRelocation, {
				pkhjc: localData.familyInfo_model
			}, {
				bfdx: localData.assistPerson_model
			}, {
				pkhzb: [pkhzbObj],
			}, {
				ydb: ydb
			})

			var _url = config.path.createLowFamily;
			//移除所有空属性

			if(localData.baseInfo_model.id) {
				if(uploadData.pkhjc.length > 0) {
					$.each(uploadData.pkhjc, function(index, item) {
						delete item.filegrpid;
						delete item.pkhjc_fj_id;
					});
				}
				_url = config.path.updateLowFamily;
			} else {
				_url = config.path.createLowFamily;
			}

			//console.log(uploadData);
			postForm.saveFrm(_url + "?data=" + angular.toJson(uploadData), {}).success(function(datas) {
				if(datas.success) {
					fupin.alert("提交成功");
					//通过index_id判断是否要删除本地
					var data = JSON.parse(window.localStorage.getItem("low_family"));
					if(data.index_id) {
						dt.request({
							rqstName: "low_family", //'low_family', 'low_village', 'nature_village', 'relief_project'
							type: "delete", //select,delete,put,selectById,
							param: {
								index_id: data.index_id
							},
							success: function(args) {
								window.history.go(-1);
							},
							'error': function(args) {

							}
						});
					} else {
						window.history.go(-1);
					}
				} else {
					fupin.alert(datas.message);
				}
			})
		}
		//调用列表
		//		$state.go('lowFamily.baseInfo'); //默认显示第一个tab

		//缓存
		lowFamilyInfo.saveCache = function() {
			var data = JSON.parse(window.localStorage.getItem("low_family"));
			angular.extend(data.baseInfo_model, low_family_baseInfo.formInfo);
			fupin.localCache(JSON.stringify(data));
		}

		$scope.lowFamilyInfo = lowFamilyInfo;
	}
]);