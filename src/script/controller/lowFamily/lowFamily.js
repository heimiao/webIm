myApp.controller("lowFamilyInfoCtro", ["$scope", "$state", "$http", "$stateParams", "postForm",
	function($scope, $state, $http, $stateParams, postForm) {
		var lowFamilyInfo = {} || lowFamilyInfo;
		var formMap = formMap || {},
			localId = "";

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
			if(!data.baseInfo_model.qyxz) {
				fupin.alert("城镇不能为空");
				bool = false;
			} else if(!data.baseInfo_model.qyxzc) {
				fupin.alert("村不能为空");
				bool = false;
			} else if(!data.familyInfo_model) {
				fupin.alert("家庭成员不能为空");
				bool = false;
			} else if(!data.baseInfo_model.bhksx) {
				fupin.alert("贫困户类型不能为空");
				bool = false;
			}
			return bool;
		}

		lowFamilyInfo.goback = function(localDatas) {
			fupin.confirm("确定保存为草稿吗？", function() {
				if(lowFamilyInfo.validate(localDatas)) {
					var plantRelocation = localDatas.plantRelocation_model;
					for(var item in plantRelocation) {
						if(item != "azd" && item != "azfs" && item != "bqfs" && item != "sfbqh" && typeof(plantRelocation[item]) == "boolean") {
							if(plantRelocation[item] == true) {
								plantRelocation[item] = "Y"
							}
							if(plantRelocation[item] == false) {
								plantRelocation[item] = "N"
							}
						}
					}
					var povertyCauses = localDatas.povertyCauses_model;
					for(var item in povertyCauses) {
						if(item != "zyzpyy" && typeof(povertyCauses[item]) == "boolean") {
							if(povertyCauses[item] == true) {
								povertyCauses[item] = "Y"
							}
							if(povertyCauses[item] == false) {
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
		lowFamilyInfo.uploadSource = function(localData) {
			//			var localData = lowFamilyInfo.getNowFormMap();
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
			//console.log(pkhzbObj.rjcsrdf, pkhzbObj.scshyddf, pkhzbObj.ywzfdf, pkhzbObj.ypcxdf, pkhzbObj.hzyldf, pkhzbObj.ylbxdf);
			pkhzbObj.zdf = pkhzbObj.rjcsrdf + pkhzbObj.scshyddf + pkhzbObj.ywzfdf + pkhzbObj.ypcxdf + pkhzbObj.hzyldf + pkhzbObj.ylbxdf || 0;
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
				if(item != "azd" && item != "azfs" && item != "bqfs" && item != "sfbqh" && typeof(plantRelocation[item]) == "boolean") {
					if(plantRelocation[item] == true) {
						plantRelocation[item] = "Y"
					}
					if(plantRelocation[item] == false) {
						plantRelocation[item] = "N"
					}
				}
			}
			var povertyCauses = localData.povertyCauses_model;
			for(var item in povertyCauses) {
				if(item != "zyzpyy" && typeof(povertyCauses[item]) == "boolean") {
					if(povertyCauses[item] == true) {
						povertyCauses[item] = "Y"
					}
					if(povertyCauses[item] == false) {
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
				//修改
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

			$.each(uploadData.pkhjc, function(index, item) {
				delete item["yhzgxObj"];
			});

			postForm.saveFrm(_url + "?data=" + angular.toJson(uploadData), {}).success(function(datas) {
				if(datas.success) {
					fupin.alert("提交成功");
					//通过index_id判断是否要删除本地
					var data = lowFamilyInfo.getNowFormMap();
					if(lowFamilyInfo.urlParam.id && lowFamilyInfo.urlParam.type == "local") {
						dt.request({
							rqstName: "low_family", //'low_family', 'low_village', 'nature_village', 'relief_project'
							type: "delete", //select,delete,put,selectById,
							param: {
								index_id: lowFamilyInfo.urlParam.id
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

		//调用基本信息
		var low_family_baseInfo = low_family_baseInfo || {};
		low_family_baseInfo.formInfo = {};
		low_family_baseInfo.otherSelect = {
			townList: [],
			villagesList: [],
			naturalVillageList: [],
			yearList: config.sysValue.year,
			bhksxList: config.sysValue.bhksx, //贫困户属性
			tpqkList: config.sysValue.tpqk, //脱贫情况
			khyhList: config.sysValue.khyh, //开户银行
		};

		//获取城镇
		low_family_baseInfo.getTownVillages = function() {
			low_family_baseInfo.otherSelect.villagesList = [];
			low_family_baseInfo.otherSelect.naturalVillageList = [];
			if(low_family_baseInfo.formInfo.qyzrc)
				low_family_baseInfo.formInfo.qyzrc = "";
			if(low_family_baseInfo.formInfo.qyxzc)
				low_family_baseInfo.formInfo.qyxzc = "";
			postForm.saveFrm(config.path.getAddress, {
				lx: "01"
			}).success(function(data) {
				low_family_baseInfo.otherSelect.townList = data;
				low_family_baseInfo.formInfo = low_family_baseInfo.formInfo;
			})
		}

		if(low_family_baseInfo.otherSelect.townList)
			low_family_baseInfo.getTownVillages();
		//根据乡镇获取对应村庄
		low_family_baseInfo.getVillagesByTown = function(id) {
			low_family_baseInfo.otherSelect.naturalVillageList = [];
			low_family_baseInfo.formInfo.qyzrc = "";
			postForm.saveFrm(config.path.getAddress, {
				lx: "02",
				fid: low_family_baseInfo.formInfo.qyxz || id,
			}).success(function(data) {
				low_family_baseInfo.otherSelect.villagesList = data;
				low_family_baseInfo.formInfo.qyxzc = low_family_baseInfo.formInfo.qyxzc;
			})
		}
		low_family_baseInfo.getNaturalVillagesByTown = function(id) {
			postForm.saveFrm(config.path.getAddress, {
				lx: "03",
				fid: low_family_baseInfo.formInfo.qyxzc || id,
			}).success(function(data) {
				low_family_baseInfo.otherSelect.naturalVillageList = data;
				low_family_baseInfo.formInfo.qyzrc = low_family_baseInfo.formInfo.qyzrc;
			})
		}

		$scope.$watch("lowFamilyInfo.formMap.low_family_baseInfo.formInfo.yhzh", function(newValue, oldValue) {
			if(newValue) {
				if(newValue.length >= 6) {
					var nowCarId = newValue.substring(0, 6);
					var cardId_index = bankBin.indexOf(nowCarId);
					if(cardId_index > 0) {
						lowFamilyInfo.formMap.low_family_baseInfo.formInfo.khyh = bankName[cardId_index];
					}
					/*else {
						lowFamilyInfo.formMap.low_family_baseInfo.formInfo.khyh = "该银行不存在";
					}*/
				} else {
					lowFamilyInfo.formMap.low_family_baseInfo.formInfo.khyh = "";
				}
			}
		})

		//初始化所有级联地址
		low_family_baseInfo.getAddress = function(townId, villagesId) {
			if(low_family_baseInfo.otherSelect.townList)
				low_family_baseInfo.getTownVillages();
			low_family_baseInfo.getVillagesByTown(townId);
			low_family_baseInfo.getNaturalVillagesByTown(villagesId);
		}

		//帮扶成效
		var assistEffect = assistEffect || {};
		assistEffect.formInfo = {};
		assistEffect.otherSelect = {
			bqfsList: config.sysValue.bqfs, //搬迁方式
			azfsList: config.sysValue.azfs, //脱贫情况
			azdList: config.sysValue.azd, //开户银行
		};
		//帮扶责任人
		var assistPerson = assistPerson || {};
		assistPerson.list = [];
		//家庭成员
		var lowFamilyMember = lowFamilyMember || {};
		lowFamilyMember.list = [];
		//收入
		var income = income || {};
		income.formInfo = {}
		$scope.$watchCollection("lowFamilyInfo.formMap.income.formInfo", function() {
			income.countObj();
		});
		income.countObj = function() {
			//人均收入
			income.formInfo.rjcsr = fupin.addRjcsr(lowFamilyMember.list, income.formInfo);
			//生产经营性支出
			income.formInfo.scjyxzc = fupin.addScjyxzc(income.formInfo);
			//-转移性收入
			income.formInfo.zyxsr = fupin.addZyxsr(income.formInfo);
		}
		//生活生产条件
		var lifeCondition = lifeCondition || {};
		lifeCondition.formInfo = {};
		lifeCondition.otherSelect = {
			rhllxList: config.sysValue.rhllx, //入户类型
			zyrllxList: config.sysValue.zyrllx, //主要燃料类型
		};
		//易地搬迁
		var plantRelocation = plantRelocation || {};
		plantRelocation.formInfo = {};
		plantRelocation.otherSelect = {
			bqfsList: config.sysValue.bqfs, //搬迁方式
			azfsList: config.sysValue.azfs, //脱贫情况
			azdList: config.sysValue.azd, //开户银行
		};

		//致贫原因
		var lowFamilyCauses = lowFamilyCauses || {};
		lowFamilyCauses.formInfo = {}

		lowFamilyInfo.bindObj = function(data) {
			if(data.index_id)
				localId = data.index_id;
			else
				localId = "";

			//基本信息
			var baseInfo_model = data.baseInfo_model;
			low_family_baseInfo.getAddress(baseInfo_model.qyxz, baseInfo_model.qyxzc);
			low_family_baseInfo.formInfo = baseInfo_model;

			//帮扶成效
			var assistEffect_model = data.assistEffect_model;
			assistEffect.formInfo = assistEffect_model;
			//帮扶责任人
			//			var assistPerson_model = data.assistPerson_model;
			//家庭成员
			//			var familyInfo_model = data.familyInfo_model;

			//收入
			var income_model = data.income_model;
			income.formInfo = income_model;
			income.countObj();
			//生产生活方式
			var lifeCondition_model = data.lifeCondition_model;
			lifeCondition.formInfo = lifeCondition_model
			//易地搬迁
			var plantRelocation_model = data.plantRelocation_model;
			for(var item in plantRelocation_model) {
				if(item != "azd" && item != "azfs" && item != "bqfs" && item != "sfbqh" && typeof(plantRelocation_model[item]) == "string") {
					if(plantRelocation_model[item] == "Y") {
						plantRelocation_model[item] = true;
					} else {
						plantRelocation_model[item] = false;
					}
				}
			}
			plantRelocation.formInfo = plantRelocation_model;
			//致贫原因
			var povertyCauses_model = data.povertyCauses_model;
			for(var item in povertyCauses_model) {
				if(item != "zyzpyy" && typeof(povertyCauses_model[item]) == "string") {
					if(povertyCauses_model[item] == "Y") {
						povertyCauses_model[item] = true;
					} else {
						povertyCauses_model[item] = false;
					}
				}
			}
			lowFamilyCauses.formInfo = povertyCauses_model;

		}

		if(lowFamilyInfo.urlParam.id) {
			try {
				var cacheData = fupin.getCacheData(lowFamilyInfo.urlParam.id, lowFamilyInfo.urlParam.type);
				if(cacheData) {
					lowFamilyInfo.bindObj(cacheData);
					//单独绑定家庭成员和帮扶人
					var datas = cacheData.familyInfo_model;
					lowFamilyMember.list = fupin.mapArrays(datas, config.sysValue.YHZGX, "yhzgx", "value")
					assistPerson.list = cacheData.assistPerson_model;
					console.log("走缓存");
				} else {
					if(lowFamilyInfo.urlParam.type == "net") {
						console.log("走线上数据库");
						//获取基本信息
						postForm.saveFrm(config.path.lowFamilyById, {
							id: lowFamilyInfo.urlParam.id
						}).success(function(data) {
							//转化成本地对象
							var localData = fupin.lineToLocalData(data, new lowFamilyNull());
							//localData.lifeCondition_model.ywzf = localData.lifeCondition_model.ywzf.toString();
							lowFamilyInfo.bindObj(localData);
						})

						//获取家庭成员
						postForm.saveFrm(config.path.getLowFamilyList, {
							fid: lowFamilyInfo.urlParam.id
						}).success(function(args) {
							var datas = args;
							$.each(datas, function(index, item) {
								if(item.filegrpid) {
									angular.extend(item, {
										pkhjc_fj_id: item.filegrpid
									});
								}
							});
							lowFamilyMember.list = fupin.mapArrays(datas, config.sysValue.YHZGX, "yhzgx", "value");
						});
						//请求帮扶责任人
						postForm.saveFrm(config.path.getassistPersonList, {
							fid: lowFamilyInfo.urlParam.id
						}).success(function(datas) {
							assistPerson.list = datas;
						});
					}
					if(lowFamilyInfo.urlParam.type == "local") {
						console.log("走本地数据库");
						dt.request({
							rqstName: "low_family",
							type: "selectById",
							param: {
								index_id: lowFamilyInfo.urlParam.id
							},
							success: function(data) {
								try {
									lowFamilyInfo.bindObj(data);
									//单独绑定家庭成员和帮扶人
									var datas = data.familyInfo_model;
									lowFamilyMember.list = datas;
									assistPerson.list = data.assistPerson_model;
								} catch(e) {
									fupin.alert("获取本地数据库错误");
								}
							}
						});
					}
				}
			} catch(e) {
				console.error(e)
				console.error("判断是否需要请求线上数据报错")
			}
		} else {
			console.log("走新增");
			var cacheDatas = JSON.parse(window.localStorage.getItem("low_family"));
			if(cacheDatas) {
				lowFamilyInfo.bindObj(cacheDatas);
				//单独绑定家庭成员和帮扶人
				assistPerson.list = cacheDatas.assistPerson_model;
				var jiating = cacheDatas.familyInfo_model;
				lowFamilyMember.list = fupin.mapArrays(jiating, config.sysValue.YHZGX, "yhzgx", "value");
				lowFamilyMember.list = jiating;
			}
		}

		lowFamilyInfo.saveFormMap = function(args) {
			//保存表单
			var localDatas;
			localDatas = lowFamilyInfo.getNowFormMap();
			if(args == 1) {
				//保存草稿
				if(lowFamilyInfo.urlParam.id && lowFamilyInfo.urlParam.type == "local") {
					localDatas = angular.extend(new lowFamilyNull(), localDatas, {
						index_id: parseInt(lowFamilyInfo.urlParam.id),
					})
				} else {
					//走新增接口
					localDatas = angular.extend(new lowFamilyNull(), localDatas)
				}
				lowFamilyInfo.goback(localDatas);
			}
			if(args == 2) {
				if(lowFamilyInfo.validate(localDatas)) {
					localDatas = angular.extend(new lowFamilyNull(), localDatas)
					lowFamilyInfo.uploadSource(localDatas);
				}
			}
		}

		/*lowFamilyInfo.newFormMap = function() {
			var newId = fupin.randomChat();
		}*/

		lowFamilyInfo.getNowFormMap = function() {
			var newObj = {
				assistEffect_model: formMap.assistEffect.formInfo,
				baseInfo_model: formMap.low_family_baseInfo.formInfo,
				income_model: formMap.income.formInfo,
				lifeCondition_model: formMap.lifeCondition.formInfo,
				plantRelocation_model: formMap.plantRelocation.formInfo,
				povertyCauses_model: formMap.lowFamilyCauses.formInfo,
				assistPerson_model: formMap.assistPerson.list,
				familyInfo_model: formMap.lowFamilyMember.list,
			}
			return newObj;
		}
		$scope.$on("$destroy", function() {
			//判断是否本地编辑
			if(lowFamilyInfo.urlParam.id && lowFamilyInfo.urlParam.type == "local") {
				fupin.localCache(JSON.stringify(angular.extend(lowFamilyInfo.getNowFormMap(), {
					index_id: lowFamilyInfo.urlParam.id
				})));
			} else {
				fupin.localCache(JSON.stringify(lowFamilyInfo.getNowFormMap()));
			}
		})

		formMap.low_family_baseInfo = low_family_baseInfo;
		formMap.low_family_baseInfo = low_family_baseInfo;
		formMap.assistEffect = assistEffect;
		formMap.assistPerson = assistPerson;
		formMap.lowFamilyMember = lowFamilyMember;
		formMap.lowFamilyCauses = lowFamilyCauses;
		formMap.income = income;
		formMap.lifeCondition = lifeCondition;
		formMap.plantRelocation = plantRelocation;
		lowFamilyInfo.formMap = formMap;
		$scope.lowFamilyInfo = lowFamilyInfo;
	}
]);