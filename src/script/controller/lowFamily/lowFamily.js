myApp.controller("lowFamilyInfoCtro", ["$scope", "$state", "$http", "$stateParams", "postForm",
	function($scope, $state, $http, $stateParams, postForm) {
		var lowFamilyInfo = {} || lowFamilyInfo;
		lowFamilyInfo.urlParam = $stateParams;

		lowFamilyInfo.sendParam = {};
		lowFamilyInfo.uploadSource = function() {
			var data = JSON.parse(window.localStorage.getItem("low_family"));
			uploadData = {}, pkhzbObj = {}, ydb = "N";

			//人均收入
			pkhzbObj.rjcsr = fupin.addRjcsr(data.familyInfo_model, data.income_model);
			pkhzbObj.rjcsrdf = pkhzbObj.rjcsr > 3026 ? 30 : 0;

			//生产生活用电 
			pkhzbObj.scshyd = (data.lifeCondition_model.sftscyd == "是" && data.lifeCondition_model.sftshyd == "是") ? "有" : "无";
			pkhzbObj.scshyddf = pkhzbObj.scshyd == "有" ? 10 : 0;

			//安全住房
			pkhzbObj.ywzf = data.lifeCondition_model.ywzf == "有" ? "有" : "无";
			pkhzbObj.ywzfdf = data.lifeCondition_model.ywzf == "有" ? 15 : 0;
			if(data.familyInfo_model.length > 0) {
				//因贫辍学
				pkhzbObj.ypcx =
					data.familyInfo_model.some(function(item, index, array) {
						return(item["sfypcx"] == "是" || !item["sfypcx"]);
					}) ? "有" : "无";

				pkhzbObj.ypcxdf = pkhzbObj.ypcx == "无" ? 0 : 15;

				//合作医疗
				pkhzbObj.hzyl = data.familyInfo_model.some(function(item, index, array) {
					return(item["sfcjxxnchzyl"] == "否" || !item["sfcjxxnchzyl"]);
				}) ? "未参加" : "参加";
				pkhzbObj.hzyldf = pkhzbObj.hzyl == "参加" ? 15 : 0;

				//医疗保险
				pkhzbObj.ylbx = data.familyInfo_model.some(function(item, index, array) {
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

			if(pkhzbObj.zdf >= 80 && data.lifeCondition_model.ywzf == "有" && pkhzbObj.ypcxdf == 15 && pkhzbObj.hzyldf == 15) {
				if((data.baseInfo_model.tpqk == "01" || data.baseInfo_model.tpqk == "02" || data.baseInfo_model.tpqk == "04")) {
					ydb = "N";
				} else {
					ydb = "Y";
				}
			} else {
				ydb = "N";
			}
			angular.extend(uploadData, data.baseInfo_model, data.assistEffect_model, data.income_model, data.lifeCondition_model, data.povertyCauses_model, data.plantRelocation_model, {
				pkhjc: data.familyInfo_model
			}, {
				bfdx: data.assistPerson_model
			}, {
				pkhzb: [pkhzbObj],
			}, {
				ydb: ydb
			})

			var _url = config.path.createLowFamily;
			if(data.baseInfo_model.id) {
				_url = config.path.updateLowFamily;
			} else {
				_url = config.path.createLowFamily;
			}
			
			//console.log(uploadData);
			postForm.saveFrm(_url + "?data=" + angular.toJson(uploadData), {}).success(function(datas) {
				console.log(datas);
			})
			
			fupin.localCache(angular.toJson(data));
		}
		//调用列表
		//		$state.go('lowFamily.baseInfo'); //默认显示第一个tab
		//根据角色遍历响应的菜单
		$scope.lowFamilyInfo = lowFamilyInfo;
	}
]);