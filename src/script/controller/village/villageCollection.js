myApp.controller("villageCollection", ["$scope", "$state", "$http", "$stateParams","postForm",
	function($scope, $state, $http, $stateParams, postForm) {
		var villageCollection = {} || villageCollection;
		villageCollection.urlParam = $stateParams;
		villageCollection.sendParam = {};
		villageCollection.situationList = {}; //存基本情况的表单数据
		villageCollection.developmentList = {}; //存发展现状的的表单数据
		villageCollection.townShip = []; //全部乡镇列表
		villageCollection.villageListAll = []; //获取全部行政村
		villageCollection.situationList.nd = "2017"; //年度
		villageCollection.situationList.pkcsx = "01"; //贫困村属性默认选中
		villageCollection.situationList.fzfxsx = "zx"; //发展方向属性 默认选中
		villageCollection.situationList.dxdmsx = "sq"; //地形地貌属性 默认选中
		villageCollection.taskForceList = []; //获取本地的驻村工作队列表
		villageCollection.developmentList.xzcdxzsftlq = "是"; // 是否通沥青路 默认值
		villageCollection.developmentList.cnzydlsfyh = "是"; // 道路是否硬化
		villageCollection.developmentList.xzcsftkybc = "是"; //是否通班车 
		villageCollection.developmentList.sfzdszlsyffs = "是"; //是否诊断室 医疗室
		villageCollection.developmentList.ylsbsfqq = "是"; // 医疗设备是否齐全
		villageCollection.developmentList.ywbyxt = "有"; //有无表演戏台
		villageCollection.developmentList.ywwtgc = "有"; //有无文体广场
		villageCollection.developmentList.ywtyqc = "有"; //有无体育器材
		villageCollection.developmentList.sfyncsw = "有"; //是否有农村书屋
		villageCollection.developmentList.sfydgnhds = "有"; //是否有多功能活动室
		villageCollection.developmentList.sfywhxckpcl = "有"; //是否有文化科普廊
		villageCollection.alert = false; //弹窗显示 
		if(window.localStorage.getItem("situationList") != '' && window.localStorage.getItem("situationList") != null && window.localStorage.getItem("situationList") != undefined && window.localStorage.getItem("situationList") != 'null' && window.localStorage.getItem("developmentList") != '' && window.localStorage.getItem("developmentList") != null && window.localStorage.getItem("developmentList") != undefined && window.localStorage.getItem("developmentList") != 'null'){
			$('.tab3').addClass('bg').siblings().removeClass('bg');
			$("#"+$('.tab3').attr('data-type')).show().siblings().hide();
			villageCollection.situationList = JSON.parse(window.localStorage.getItem("situationList"));
			villageCollection.developmentList = JSON.parse(window.localStorage.getItem("developmentList"));
			// 获取本地添加驻村工作情况列表数据  
			villageCollection.taskForceList = JSON.parse(window.localStorage.getItem("taskForceList"));
			// 判断显示暂无数据
			console.log(villageCollection.taskForceList)
			if(villageCollection.taskForceList){
				if(villageCollection.taskForceList.length == 0){
					villageCollection.noData = true;
				}else{
					villageCollection.noData = false;
				}
			}else{
				villageCollection.noData = true;
			}
		}
		// 获取所有乡镇
		$http.post(config.path.townShip,null).success(function(res){
			villageCollection.townShip = res;
			if(window.localStorage.getItem("situationList") != '' && window.localStorage.getItem("situationList") != null && window.localStorage.getItem("situationList") != undefined && window.localStorage.getItem("situationList") != 'null' && window.localStorage.getItem("developmentList") != '' && window.localStorage.getItem("developmentList") != null && window.localStorage.getItem("developmentList") != undefined && window.localStorage.getItem("developmentList") != 'null'){
				villageCollection.getVillageList(villageCollection.situationList.qyxz); //获取乡镇对应的行政村
			}else{
				villageCollection.situationList.qyxz = res[0].id;
				villageCollection.getVillageList(res[0].id, 1); //获取乡镇对应的行政村
				// 判断显示暂无数据
				if(villageCollection.taskForceList.length == 0){
					villageCollection.noData = true;
				}else{
					villageCollection.noData = false;
				}
			}
		})
		// 乡镇变化行政村跟随变化
		villageCollection.changeTown=function(){
			villageCollection.getVillageList(villageCollection.situationList.qyxz, 1); //获取乡镇对应的行政村
		}
		// 获取所有行政村
		villageCollection.getVillageList= function(id, num){
			$http.post(config.path.villageAll+"&fid="+id,null).success(function(res){
				if(num == 1){
					villageCollection.situationList.qyxzc = res[0].id;
				}
				villageCollection.villageListAll = res;
			})
		}
		$("#tab div").click(function(){
			$(this).addClass('bg').siblings().removeClass('bg');
			$("#"+$(this).attr('data-type')).show().siblings().hide();
			if($(this).attr('data-type') == "taskForse"){
				villageCollection.situationList = {
					'nd': villageCollection.situationList.nd,
					'qyxz': villageCollection.situationList.qyxz,
					'qyxzc': villageCollection.situationList.qyxzc,
					'cfzr': villageCollection.situationList.cfzr,
					'zwjb': villageCollection.situationList.zwjb,
					'cbgdh': villageCollection.situationList.cbgdh,
					'pkcsx': villageCollection.situationList.pkcsx,
					'fzfxsx': villageCollection.situationList.fzfxsx,
					'dxdmsx': villageCollection.situationList.dxdmsx,
					'zgdyrs': villageCollection.situationList.zgdyrs,
					'dxscgrs': villageCollection.situationList.dxscgrs,
					'zrcs': villageCollection.situationList.zrcs,
					'zhs': villageCollection.situationList.zhs,
					'pkhs': villageCollection.situationList.pkhs,
					'dbhs': villageCollection.situationList.dbhs,
					'wbhs': villageCollection.situationList.wbhs,
					'ybpkhs': villageCollection.situationList.ybpkhs,
					'zrks': villageCollection.situationList.zrks,
					'pkrks': villageCollection.situationList.pkrks,
					'dbrks': villageCollection.situationList.dbrks,
					'whrks': villageCollection.situationList.whrks,
					'ssmzrks': villageCollection.situationList.ssmzrks,
					'fnrks': villageCollection.situationList.fnrks,
					'cjrks': villageCollection.situationList.cjrks,
					'ybpkrks': villageCollection.situationList.ybpkrks,
					'hjrks': villageCollection.situationList.hjrks,
					'h9a': villageCollection.situationList.h9a,
					'ldlrs': villageCollection.situationList.ldlrs,
					'wcwgrs': villageCollection.situationList.wcwgrs,
					'gdmj': villageCollection.situationList.gdmj,
					'yxgkmj': villageCollection.situationList.yxgkmj,
					'ldmj': villageCollection.situationList.ldmj,
					'tghlmj': villageCollection.situationList.tghlmj,
					'lgmj': villageCollection.situationList.lgmj,
					'mcdmj': villageCollection.situationList.mcdmj,
					'smmj': villageCollection.situationList.smmj,
					'czrks': villageCollection.situationList.czrks
				}
				villageCollection.developmentList = {
					'nmnrjcsr': villageCollection.developmentList.nmnrjcsr,
					'cjjtjjsr': villageCollection.developmentList.cjjtjjsr,
					'ncgfhzzzgs': villageCollection.developmentList.ncgfhzzzgs,
					'cjxxnchzylrs': villageCollection.developmentList.cjxxnchzylrs,
					'cjcxjmjbylbxrs': villageCollection.developmentList.cjcxjmjbylbxrs,
					'cjczzgjbylbxrs': villageCollection.developmentList.cjczzgjbylbxrs,
					'xzcdxzsftlq': villageCollection.developmentList.xzcdxzsftlq,
					'cnzydlsfyh': villageCollection.developmentList.cnzydlsfyh,
					'cnzydlc': villageCollection.developmentList.cnzydlc,
					'cnzydlk': villageCollection.developmentList.cnzydlk,
					'cnzydllds': villageCollection.developmentList.cnzydllds,
					'xzcsftkybc': villageCollection.developmentList.xzcsftkybc,
					'wsxysaqh': villageCollection.developmentList.wsxysaqh,
					'ysknhs': villageCollection.developmentList.ysknhs,
					'wtshyddzrcs': villageCollection.developmentList.wtshyddzrcs,
					'wtscyddzrcs': villageCollection.developmentList.wtscyddzrcs,
					'wtshydhs': villageCollection.developmentList.wtshydhs,
					'ydscyhzrcs': villageCollection.developmentList.ydscyhzrcs,
					'wfhs': villageCollection.developmentList.wfhs,
					'hnzyhzsgs': villageCollection.developmentList.hnzyhzsgs,
					'cjnmzyhzspkhs': villageCollection.developmentList.cjnmzyhzspkhs,
					'kzxclydhs': villageCollection.developmentList.kzxclydhs,
					'xclycyrys': villageCollection.developmentList.xclycyrys,
					'jynjldhs': villageCollection.developmentList.jynjldhs,
					'jynjlhsnjsr': villageCollection.developmentList.jynjlhsnjsr,
					'xzcwssgs': villageCollection.developmentList.xzcwssgs,
					'xzcwssjzmj': villageCollection.developmentList.xzcwssjzmj,
					'sfzdszlsyffs': villageCollection.developmentList.sfzdszlsyffs,
					'ylsbsfqq': villageCollection.developmentList.ylsbsfqq,
					'xzczyys': villageCollection.developmentList.xzczyys,
					'xzcggwscsgs': villageCollection.developmentList.xzcggwscsgs,
					'xzcscshljjcdfdgs': villageCollection.developmentList.xzcscshljjcdfdgs,
					'xzcwhsgs': villageCollection.developmentList.xzcwhsgs,
					'ywbyxt': villageCollection.developmentList.ywbyxt,
					'ywwtgc': villageCollection.developmentList.ywwtgc,
					'wtgcmj': villageCollection.developmentList.wtgcmj,
					'ywtyqc': villageCollection.developmentList.ywtyqc,
					'sfyncsw': villageCollection.developmentList.sfyncsw,
					'sfydgnhds': villageCollection.developmentList.sfydgnhds,
					'sfywhxckpcl': villageCollection.developmentList.sfywhxckpcl,
					'whxckpclcd': villageCollection.developmentList.whxckpclcd,
					'tkdhs': villageCollection.developmentList.tkdhs,
					'sysjswdhs': villageCollection.developmentList.sysjswdhs,
					'tkddcxxgs': villageCollection.developmentList.tkddcxxgs,
					'yddzrcztkddcs': villageCollection.developmentList.yddzrcztkddcs,
					'xzcxxy': villageCollection.developmentList.xzcxxy
				}
				window.localStorage.setItem("situationList", JSON.stringify(villageCollection.situationList))
				window.localStorage.setItem("developmentList", JSON.stringify(villageCollection.developmentList))
			}
		})
		villageCollection.uploadSave=function(){
			if(!villageCollection.situationList.cfzr){
				fupin.alert("请完善基本信息中的信息")
				return;
			}
			if(!villageCollection.situationList.cbgdh){
				fupin.alert("请完善基本信息中的信息")
				return;
			}
			if(!villageCollection.developmentList.nmnrjcsr){
				fupin.alert("请完善发展现状中的信息")
				return;
			}
			if(villageCollection.taskForceList){
				if(villageCollection.taskForceList.length == 0){
					fupin.alert("请完善驻村工作队的信息")
					return;
				}else{
					for(var i=0;i<villageCollection.taskForceList.length;i++){
						if(!villageCollection.taskForceList[i].bfdwzcgzdyxm){
							fupin.alert("请完善驻村工作队的信息")
							return;
						}
					}
				}
			}else{
				fupin.alert("请完善驻村工作队的信息")
				return;
			}
			villageCollection.getAllData();
			postForm.saveFrm(config.path.addVillage,{"data": JSON.stringify(villageCollection.localData)}).success(function(res){
				window.history.back();
			}).error(function(){
				//保存，或者修改，如果有index_id则为修改没有则为添加
				villageCollection.queryName();
				dt.request({
					rqstName: "low_village", //'low_family', 'low_village', 'nature_village', 'relief_project'
					type: "put", //select,delete,put,selectById,
					data: {
						'data':villageCollection.localData,
						'qyxzName': villageCollection.qyxzName,
						'qyxzcName': villageCollection.qyxzcName
					},
					success: function(args) {
						fupin.alert("已保存到草稿")
						window.history.back();
					},
					error: function(args) {

					}
				});
			 })
		}
		villageCollection.queryName=function(){
			for(var i=0;i<villageCollection.townShip.length;i++){
				if(villageCollection.situationList.qyxz == villageCollection.townShip[i].id){
					villageCollection.qyxzName = villageCollection.townShip[i].name;
				}
			}
			for(var i=0;i<villageCollection.villageListAll.length;i++){
				if(villageCollection.situationList.qyxzc == villageCollection.villageListAll[i].id){
					villageCollection.qyxzcName = villageCollection.villageListAll[i].name;
				}
			}
		}
		villageCollection.getAllData=function(){
			//上传所有的数据
			villageCollection.localData={
					'nd': villageCollection.situationList.nd,
				  	'qyxz': villageCollection.situationList.qyxz,
					'qyxzc': villageCollection.situationList.qyxzc,
					'cfzr': villageCollection.situationList.cfzr,
					'zwjb': villageCollection.situationList.zwjb,
					'cbgdh': villageCollection.situationList.cbgdh,
					'pkcsx': villageCollection.situationList.pkcsx,
					'fzfxsx': villageCollection.situationList.fzfxsx,
					'dxdmsx': villageCollection.situationList.dxdmsx,
					'zgdyrs': villageCollection.situationList.zgdyrs,
					'dxscgrs': villageCollection.situationList.dxscgrs,
					'zrcs': villageCollection.situationList.zrcs,
					'zhs': villageCollection.situationList.zhs,
					'pkhs': villageCollection.situationList.pkhs,
					'dbhs': villageCollection.situationList.dbhs,
					'wbhs': villageCollection.situationList.wbhs,
					'ybpkhs': villageCollection.situationList.ybpkhs,
					'zrks': villageCollection.situationList.zrks,
					'pkrks': villageCollection.situationList.pkrks,
					'dbrks': villageCollection.situationList.dbrks,
					'whrks': villageCollection.situationList.whrks,
					'ssmzrks': villageCollection.situationList.ssmzrks,
					'fnrks': villageCollection.situationList.fnrks,
					'cjrks': villageCollection.situationList.cjrks,
					'ybpkrks': villageCollection.situationList.ybpkrks,
					'hjrks': villageCollection.situationList.hjrks,
					'h9a': villageCollection.situationList.h9a,
					'ldlrs': villageCollection.situationList.ldlrs,
					'wcwgrs': villageCollection.situationList.wcwgrs,
					'gdmj': villageCollection.situationList.gdmj,
					'yxgkmj': villageCollection.situationList.yxgkmj,
					'ldmj': villageCollection.situationList.ldmj,
					'tghlmj': villageCollection.situationList.tghlmj,
					'lgmj': villageCollection.situationList.lgmj,
					'mcdmj': villageCollection.situationList.mcdmj,
					'smmj': villageCollection.situationList.smmj,
					'czrks': villageCollection.situationList.czrks,
					'nmnrjcsr': villageCollection.developmentList.nmnrjcsr,
					'cjjtjjsr': villageCollection.developmentList.cjjtjjsr,
					'ncgfhzzzgs': villageCollection.developmentList.ncgfhzzzgs,
					'cjxxnchzylrs': villageCollection.developmentList.cjxxnchzylrs,
					'cjcxjmjbylbxrs': villageCollection.developmentList.cjcxjmjbylbxrs,
					'cjczzgjbylbxrs': villageCollection.developmentList.cjczzgjbylbxrs,
					'xzcdxzsftlq': villageCollection.developmentList.xzcdxzsftlq,
					'cnzydlsfyh': villageCollection.developmentList.cnzydlsfyh,
					'cnzydlc': villageCollection.developmentList.cnzydlc,
					'cnzydlk': villageCollection.developmentList.cnzydlk,
					'cnzydllds': villageCollection.developmentList.cnzydllds,
					'xzcsftkybc': villageCollection.developmentList.xzcsftkybc,
					'wsxysaqh': villageCollection.developmentList.wsxysaqh,
					'ysknhs': villageCollection.developmentList.ysknhs,
					'wtshyddzrcs': villageCollection.developmentList.wtshyddzrcs,
					'wtscyddzrcs': villageCollection.developmentList.wtscyddzrcs,
					'wtshydhs': villageCollection.developmentList.wtshydhs,
					'ydscyhzrcs': villageCollection.developmentList.ydscyhzrcs,
					'wfhs': villageCollection.developmentList.wfhs,
					'hnzyhzsgs': villageCollection.developmentList.hnzyhzsgs,
					'cjnmzyhzspkhs': villageCollection.developmentList.cjnmzyhzspkhs,
					'kzxclydhs': villageCollection.developmentList.kzxclydhs,
					'xclycyrys': villageCollection.developmentList.xclycyrys,
					'jynjldhs': villageCollection.developmentList.jynjldhs,
					'jynjlhsnjsr': villageCollection.developmentList.jynjlhsnjsr,
					'xzcwssgs': villageCollection.developmentList.xzcwssgs,
					'xzcwssjzmj': villageCollection.developmentList.xzcwssjzmj,
					'sfzdszlsyffs': villageCollection.developmentList.sfzdszlsyffs,
					'ylsbsfqq': villageCollection.developmentList.ylsbsfqq,
					'xzczyys': villageCollection.developmentList.xzczyys,
					'xzcggwscsgs': villageCollection.developmentList.xzcggwscsgs,
					'xzcscshljjcdfdgs': villageCollection.developmentList.xzcscshljjcdfdgs,
					'xzcwhsgs': villageCollection.developmentList.xzcwhsgs,
					'ywbyxt': villageCollection.developmentList.ywbyxt,
					'ywwtgc': villageCollection.developmentList.ywwtgc,
					'wtgcmj': villageCollection.developmentList.wtgcmj,
					'ywtyqc': villageCollection.developmentList.ywtyqc,
					'sfyncsw': villageCollection.developmentList.sfyncsw,
					'sfydgnhds': villageCollection.developmentList.sfydgnhds,
					'sfywhxckpcl': villageCollection.developmentList.sfywhxckpcl,
					'whxckpclcd': villageCollection.developmentList.whxckpclcd,
					'tkdhs': villageCollection.developmentList.tkdhs,
					'sysjswdhs': villageCollection.developmentList.sysjswdhs,
					'tkddcxxgs': villageCollection.developmentList.tkddcxxgs,
					'yddzrcztkddcs': villageCollection.developmentList.yddzrcztkddcs,
					'xzcxxy': villageCollection.developmentList.xzcxxy,
				    "zcgzdqk": JSON.parse(window.localStorage.getItem("taskForceList")), 
				}
		}

		// 弹窗
		villageCollection.back=function(){
			villageCollection.getAllData();
			villageCollection.alert = true;
		}
		villageCollection.confirm=function(){
			villageCollection.queryName();
			dt.request({
				rqstName: "low_village", //'low_family', 'low_village', 'nature_village', 'relief_project'
				type: "put", //select,delete,put,selectById,
				data: {
					'data':villageCollection.localData,
					'qyxzName': villageCollection.qyxzName,
					'qyxzcName': villageCollection.qyxzcName
				},
				success: function(args) {
					fupin.alert("已保存到草稿")
					window.history.back();
				},
				error: function(args) {

				}
			});
			villageCollection.alert = false;
		}
		villageCollection.cancel = function(){
			window.history.back();
			villageCollection.alert = false;
		}

		// villageCollection.back=function(){
		// 	villageCollection.getAllData();
		// 	fupin.confirm("是否保存为草稿", function() {
		// 		villageCollection.queryName();
		// 		dt.request({
		// 			rqstName: "low_village", //'low_family', 'low_village', 'nature_village', 'relief_project'
		// 			type: "put", //select,delete,put,selectById,
		// 			data: {
		// 				'data':villageCollection.localData,
		// 				'qyxzName': villageCollection.qyxzName,
		// 				'qyxzcName': villageCollection.qyxzcName
		// 			},
		// 			success: function(args) {
		// 				fupin.alert("已保存到草稿")
		// 				$state.go("poorVillage");
		// 			},
		// 			error: function(args) {

		// 			}
		// 		});
		// 	}, function() {
		// 	 	$state.go("poorVillage");
		// 	});
		// }
		
		/*lowFamilyInfo.menu=false;
		lowFamilyInfo.changeMenu=function(args){
			lowFamilyInfo.menu=args;
			console.log(lowFamilyInfo.menu);
		}*/

		//调用列表
		//		$state.go('lowFamily.baseInfo'); //默认显示第一个tab
		//根据角色遍历响应的菜单
		$scope.villageCollection = villageCollection;
	}
]);