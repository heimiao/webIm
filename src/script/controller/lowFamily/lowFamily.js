myApp.controller("lowFamilyInfoCtro", ["$scope", "$state", "$http", "$stateParams", "postForm",
	function($scope, $state, $http, $stateParams, postForm) {
		var lowFamilyInfo = {} || lowFamilyInfo;

		var low_family_baseInfo = {} || low_family_baseInfo;

		lowFamilyInfo.urlParam = $stateParams;
		//改变内容
		$scope.userId = lowFamilyInfo.urlParam.id || "";
		$scope.dataType = lowFamilyInfo.urlParam.type || "";

		lowFamilyInfo.changeCont = {
			//默认显示第一个基本信息表单
			baseInfo: true
		};
		if(lowFamilyInfo.urlParam.showForm) {
			lowFamilyInfo.changeCont[lowFamilyInfo.urlParam.showForm] = true;
			lowFamilyInfo.changeCont["baseInfo"] = false;
		}

		lowFamilyInfo.changeMenu = function() {
			lowFamilyInfo.menu = lowFamilyInfo.menu ? false : true;
			//根据菜单调用不同的formInfo

		}
		lowFamilyInfo.showForm = function(args) {
			lowFamilyInfo.changeCont = {};
			lowFamilyInfo.changeCont[args] = true;
			lowFamilyInfo.changeMenu();
		}

		lowFamilyInfo.goback = function() {
			var localData = JSON.parse(window.localStorage.getItem("low_family"));
			fupin.confirm("确定保存为草稿吗？", function() {
				console.log(localData);
				fupin.saveLocalData(localData);
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
			angular.extend(uploadData, localData.baseInfo_model, localData.assistEffect_model, localData.income_model, localData.lifeCondition_model, localData.povertyCauses_model, localData.plantRelocation_model, {
				pkhjc: localData.familyInfo_model
			}, {
				bfdx: localData.assistPerson_model
			}, {
				pkhzb: [pkhzbObj],
			}, {
				ydb: ydb
			})

			var _url = config.path.createLowFamily;
			if(localData.baseInfo_model.id) {
				_url = config.path.updateLowFamily;
			} else {
				_url = config.path.createLowFamily;
			}

			//console.log(uploadData);
			postForm.saveFrm(_url + "?data=" + angular.toJson(uploadData), {}).success(function(datas) {

			})
			fupin.localCache(angular.toJson(localData));
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