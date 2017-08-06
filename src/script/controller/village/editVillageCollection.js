myApp.controller("editVillageCollection", ["$scope", "$state", "$http", "$stateParams","postForm",
	function($scope, $state, $http, $stateParams, postForm) {
		var editVillageCollection = {} || editVillageCollection;
		editVillageCollection.urlParam = $stateParams;
		editVillageCollection.sendParam = {};
		editVillageCollection.situationList = {}; //存基本情况的表单数据
		editVillageCollection.developmentList = {}; //存发展现状的的表单数据
		editVillageCollection.townShip = []; //全部乡镇列表
		editVillageCollection.villageListAll = []; //获取全部行政村
		editVillageCollection.taskForceList = []; //获取本地的驻村工作队列表
		editVillageCollection.alert = false; //弹窗显示
		window.localStorage.setItem("editVillageCollectionEditId", $stateParams.editId);
		editVillageCollection.editId = window.localStorage.getItem("editVillageCollectionEditId");
		if(window.localStorage.getItem("situationList") != '' && window.localStorage.getItem("situationList") != null && window.localStorage.getItem("situationList") != undefined && window.localStorage.getItem("situationList") != 'null' && window.localStorage.getItem("developmentList") != '' && window.localStorage.getItem("developmentList") != null && window.localStorage.getItem("developmentList") != undefined && window.localStorage.getItem("developmentList") != 'null'){
			$('.tab3').addClass('bg').siblings().removeClass('bg');
			$("#"+$('.tab3').attr('data-type')).show().siblings().hide();
			editVillageCollection.situationList = JSON.parse(window.localStorage.getItem("situationList"));
			editVillageCollection.developmentList = JSON.parse(window.localStorage.getItem("developmentList"));
			// 获取本地添加驻村工作情况列表数据  
			editVillageCollection.taskForceList = JSON.parse(window.localStorage.getItem("taskForceList"));
			if(editVillageCollection.taskForceList){
				if(editVillageCollection.taskForceList.length == 0){
					editVillageCollection.noData = true;
				}else{
					editVillageCollection.noData = false;
				}
			}else{
				editVillageCollection.noData = true;
			}
		}
		//获取所有乡镇
		$http.post(config.path.townShip,null).success(function(res){
			editVillageCollection.townShip = res;
			if(window.localStorage.getItem("situationList") != '' && window.localStorage.getItem("situationList") != null && window.localStorage.getItem("situationList") != undefined && window.localStorage.getItem("situationList") != 'null' && window.localStorage.getItem("developmentList") != '' && window.localStorage.getItem("developmentList") != null && window.localStorage.getItem("developmentList") != undefined && window.localStorage.getItem("developmentList") != 'null'){
				editVillageCollection.getVillageList(editVillageCollection.situationList.qyxz); //获取乡镇对应的行政村
			}else{
				editVillageCollection.getDetail();
			}
			
		})
		// 乡镇变化行政村跟随变化
		editVillageCollection.changeTown=function(){
			editVillageCollection.getVillageList(editVillageCollection.situationList.qyxz,1); //获取乡镇对应的行政村
		}
		// 获取所有行政村
		editVillageCollection.getVillageList= function(id,num){
			$http.post(config.path.villageAll+"&fid="+id,null).success(function(res){
				if(num == 1){
					editVillageCollection.situationList.qyxzc = res[0].id;
				}
				editVillageCollection.villageListAll = res;
			})
		}
		editVillageCollection.getDetail=function(){
			$http.post(config.path.getTaskForce+editVillageCollection.editId,null).success(function(res){
				if(res){
					window.localStorage.setItem("taskForceList", JSON.stringify(res))
					editVillageCollection.taskForceList = JSON.parse(window.localStorage.getItem("taskForceList"));
					if(editVillageCollection.taskForceList.length == 0){
						editVillageCollection.noData = true;
					}else{
						editVillageCollection.noData = false;
					}
				}else{
					editVillageCollection.noData = true;
				}
			})
			$http.post(config.path.editVillageCollection+editVillageCollection.editId,null).success(function(res){
				editVillageCollection.getVillageList(res.qyxz); //获取乡镇对应的行政村
				editVillageCollection.situationList = {
					'nd': res.nd,
					'qyxz': res.qyxz,
					'qyxzc': res.qyxzc,
					'cfzr': res.cfzr,
					'zwjb': res.zwjb,
					'cbgdh': res.cbgdh,
					'pkcsx': res.pkcsx,
					'fzfxsx': res.fzfxsx,
					'dxdmsx': res.dxdmsx,
					'zgdyrs': res.zgdyrs,
					'dxscgrs': res.dxscgrs,
					'zrcs': res.zrcs,
					'zhs': res.zhs,
					'pkhs': res.pkhs,
					'dbhs': res.dbhs,
					'wbhs': res.wbhs,
					'ybpkhs': res.ybpkhs,
					'zrks': res.zrks,
					'pkrks': res.pkrks,
					'dbrks': res.dbrks,
					'whrks': res.whrks,
					'ssmzrks': res.ssmzrks,
					'fnrks': res.fnrks,
					'cjrks': res.cjrks,
					'ybpkrks': res.ybpkrks,
					'hjrks': res.hjrks,
					'h9a': res.h9a,
					'ldlrs': res.ldlrs,
					'wcwgrs': res.wcwgrs,
					'gdmj': res.gdmj,
					'yxgkmj': res.yxgkmj,
					'ldmj': res.ldmj,
					'tghlmj': res.tghlmj,
					'lgmj': res.lgmj,
					'mcdmj': res.mcdmj,
					'smmj': res.smmj,
					'czrks': res.czrks
				}
				editVillageCollection.developmentList = {
					'nmnrjcsr': res.nmnrjcsr,
					'cjjtjjsr': res.cjjtjjsr,
					'ncgfhzzzgs': res.ncgfhzzzgs,
					'cjxxnchzylrs': res.cjxxnchzylrs,
					'cjcxjmjbylbxrs': res.cjcxjmjbylbxrs,
					'cjczzgjbylbxrs': res.cjczzgjbylbxrs,
					'xzcdxzsftlq': res.xzcdxzsftlq,
					'cnzydlsfyh': res.cnzydlsfyh,
					'cnzydlc': res.cnzydlc,
					'cnzydlk': res.cnzydlk,
					'cnzydllds': res.cnzydllds,
					'xzcsftkybc': res.xzcsftkybc,
					'wsxysaqh': res.wsxysaqh,
					'ysknhs': res.ysknhs,
					'wtshyddzrcs': res.wtshyddzrcs,
					'wtscyddzrcs': res.wtscyddzrcs,
					'wtshydhs': res.wtshydhs,
					'ydscyhzrcs': res.ydscyhzrcs,
					'wfhs': res.wfhs,
					'hnzyhzsgs': res.hnzyhzsgs,
					'cjnmzyhzspkhs': res.cjnmzyhzspkhs,
					'kzxclydhs': res.kzxclydhs,
					'xclycyrys': res.xclycyrys,
					'jynjldhs': res.jynjldhs,
					'jynjlhsnjsr': res.jynjlhsnjsr,
					'xzcwssgs': res.xzcwssgs,
					'xzcwssjzmj': res.xzcwssjzmj,
					'sfzdszlsyffs': res.sfzdszlsyffs,
					'ylsbsfqq': res.ylsbsfqq,
					'xzczyys': res.xzczyys,
					'xzcggwscsgs': res.xzcggwscsgs,
					'xzcscshljjcdfdgs': res.xzcscshljjcdfdgs,
					'xzcwhsgs': res.xzcwhsgs,
					'ywbyxt': res.ywbyxt,
					'ywwtgc': res.ywwtgc,
					'wtgcmj': res.wtgcmj,
					'ywtyqc': res.ywtyqc,
					'sfyncsw': res.sfyncsw,
					'sfydgnhds': res.sfydgnhds,
					'sfywhxckpcl': res.sfywhxckpcl,
					'whxckpclcd': res.whxckpclcd,
					'tkdhs': res.tkdhs,
					'sysjswdhs': res.sysjswdhs,
					'tkddcxxgs': res.tkddcxxgs,
					'yddzrcztkddcs': res.yddzrcztkddcs,
					'xzcxxy': res.xzcxxy
				}
			})
		}
		$("#tab div").click(function(){
			$(this).addClass('bg').siblings().removeClass('bg');
			$("#"+$(this).attr('data-type')).show().siblings().hide();
			if($(this).attr('data-type') == "taskForse"){
				editVillageCollection.situationList = {
					'nd': editVillageCollection.situationList.nd,
					'qyxz': editVillageCollection.situationList.qyxz,
					'qyxzc': editVillageCollection.situationList.qyxzc,
					'cfzr': editVillageCollection.situationList.cfzr,
					'zwjb': editVillageCollection.situationList.zwjb,
					'cbgdh': editVillageCollection.situationList.cbgdh,
					'pkcsx': editVillageCollection.situationList.pkcsx,
					'fzfxsx': editVillageCollection.situationList.fzfxsx,
					'dxdmsx': editVillageCollection.situationList.dxdmsx,
					'zgdyrs': editVillageCollection.situationList.zgdyrs,
					'dxscgrs': editVillageCollection.situationList.dxscgrs,
					'zrcs': editVillageCollection.situationList.zrcs,
					'zhs': editVillageCollection.situationList.zhs,
					'pkhs': editVillageCollection.situationList.pkhs,
					'dbhs': editVillageCollection.situationList.dbhs,
					'wbhs': editVillageCollection.situationList.wbhs,
					'ybpkhs': editVillageCollection.situationList.ybpkhs,
					'zrks': editVillageCollection.situationList.zrks,
					'pkrks': editVillageCollection.situationList.pkrks,
					'dbrks': editVillageCollection.situationList.dbrks,
					'whrks': editVillageCollection.situationList.whrks,
					'ssmzrks': editVillageCollection.situationList.ssmzrks,
					'fnrks': editVillageCollection.situationList.fnrks,
					'cjrks': editVillageCollection.situationList.cjrks,
					'ybpkrks': editVillageCollection.situationList.ybpkrks,
					'hjrks': editVillageCollection.situationList.hjrks,
					'h9a': editVillageCollection.situationList.h9a,
					'ldlrs': editVillageCollection.situationList.ldlrs,
					'wcwgrs': editVillageCollection.situationList.wcwgrs,
					'gdmj': editVillageCollection.situationList.gdmj,
					'yxgkmj': editVillageCollection.situationList.yxgkmj,
					'ldmj': editVillageCollection.situationList.ldmj,
					'tghlmj': editVillageCollection.situationList.tghlmj,
					'lgmj': editVillageCollection.situationList.lgmj,
					'mcdmj': editVillageCollection.situationList.mcdmj,
					'smmj': editVillageCollection.situationList.smmj,
					'czrks': editVillageCollection.situationList.czrks
				}
				editVillageCollection.developmentList = {
					'nmnrjcsr': editVillageCollection.developmentList.nmnrjcsr,
					'cjjtjjsr': editVillageCollection.developmentList.cjjtjjsr,
					'ncgfhzzzgs': editVillageCollection.developmentList.ncgfhzzzgs,
					'cjxxnchzylrs': editVillageCollection.developmentList.cjxxnchzylrs,
					'cjcxjmjbylbxrs': editVillageCollection.developmentList.cjcxjmjbylbxrs,
					'cjczzgjbylbxrs': editVillageCollection.developmentList.cjczzgjbylbxrs,
					'xzcdxzsftlq': editVillageCollection.developmentList.xzcdxzsftlq,
					'cnzydlsfyh': editVillageCollection.developmentList.cnzydlsfyh,
					'cnzydlc': editVillageCollection.developmentList.cnzydlc,
					'cnzydlk': editVillageCollection.developmentList.cnzydlk,
					'cnzydllds': editVillageCollection.developmentList.cnzydllds,
					'xzcsftkybc': editVillageCollection.developmentList.xzcsftkybc,
					'wsxysaqh': editVillageCollection.developmentList.wsxysaqh,
					'ysknhs': editVillageCollection.developmentList.ysknhs,
					'wtshyddzrcs': editVillageCollection.developmentList.wtshyddzrcs,
					'wtscyddzrcs': editVillageCollection.developmentList.wtscyddzrcs,
					'wtshydhs': editVillageCollection.developmentList.wtshydhs,
					'ydscyhzrcs': editVillageCollection.developmentList.ydscyhzrcs,
					'wfhs': editVillageCollection.developmentList.wfhs,
					'hnzyhzsgs': editVillageCollection.developmentList.hnzyhzsgs,
					'cjnmzyhzspkhs': editVillageCollection.developmentList.cjnmzyhzspkhs,
					'kzxclydhs': editVillageCollection.developmentList.kzxclydhs,
					'xclycyrys': editVillageCollection.developmentList.xclycyrys,
					'jynjldhs': editVillageCollection.developmentList.jynjldhs,
					'jynjlhsnjsr': editVillageCollection.developmentList.jynjlhsnjsr,
					'xzcwssgs': editVillageCollection.developmentList.xzcwssgs,
					'xzcwssjzmj': editVillageCollection.developmentList.xzcwssjzmj,
					'sfzdszlsyffs': editVillageCollection.developmentList.sfzdszlsyffs,
					'ylsbsfqq': editVillageCollection.developmentList.ylsbsfqq,
					'xzczyys': editVillageCollection.developmentList.xzczyys,
					'xzcggwscsgs': editVillageCollection.developmentList.xzcggwscsgs,
					'xzcscshljjcdfdgs': editVillageCollection.developmentList.xzcscshljjcdfdgs,
					'xzcwhsgs': editVillageCollection.developmentList.xzcwhsgs,
					'ywbyxt': editVillageCollection.developmentList.ywbyxt,
					'ywwtgc': editVillageCollection.developmentList.ywwtgc,
					'wtgcmj': editVillageCollection.developmentList.wtgcmj,
					'ywtyqc': editVillageCollection.developmentList.ywtyqc,
					'sfyncsw': editVillageCollection.developmentList.sfyncsw,
					'sfydgnhds': editVillageCollection.developmentList.sfydgnhds,
					'sfywhxckpcl': editVillageCollection.developmentList.sfywhxckpcl,
					'whxckpclcd': editVillageCollection.developmentList.whxckpclcd,
					'tkdhs': editVillageCollection.developmentList.tkdhs,
					'sysjswdhs': editVillageCollection.developmentList.sysjswdhs,
					'tkddcxxgs': editVillageCollection.developmentList.tkddcxxgs,
					'yddzrcztkddcs': editVillageCollection.developmentList.yddzrcztkddcs,
					'xzcxxy': editVillageCollection.developmentList.xzcxxy
				}
				window.localStorage.setItem("situationList", JSON.stringify(editVillageCollection.situationList))
				window.localStorage.setItem("developmentList", JSON.stringify(editVillageCollection.developmentList))
			}
		})

		editVillageCollection.uploadSave=function(){
			if(!editVillageCollection.situationList.cfzr){
				fupin.alert("请完善'基本信息'后再提交数据")
				return;
			}
			// if(!editVillageCollection.situationList.cbgdh){
			// 	fupin.alert("请完善基本信息中的信息")
			// 	return;
			// }
			if(editVillageCollection.developmentList.nmnrjcsr == null){
				fupin.alert("请完善发展现状中的信息")
				return;
			}
			if(editVillageCollection.taskForceList){
				if(editVillageCollection.taskForceList.length == 0){
					fupin.alert("请完善驻村工作队的信息")
					return;
				}else{
					for(var i=0;i<editVillageCollection.taskForceList.length;i++){
						if(!editVillageCollection.taskForceList[i].bfdwzcgzdyxm){
							fupin.alert("请完善驻村工作队的信息")
							return;
						}
					}
				}
			}else{
				fupin.alert("请完善驻村工作队的信息")
				return;
			}
			editVillageCollection.getAllData();
			postForm.saveFrm(config.path.updateVillage,{"data": JSON.stringify(editVillageCollection.localData)}).success(function(res){
				window.history.back();
			}).error(function(){
				//保存，或者修改，如果有index_id则为修改没有则为添加
				editVillageCollection.queryName();
				dt.request({
					rqstName: "low_village", //'low_family', 'low_village', 'nature_village', 'relief_project'
					type: "put", //select,delete,put,selectById,
					data: {
						'data':editVillageCollection.localData,
						'qyxzName': editVillageCollection.qyxzName,
						'qyxzcName': editVillageCollection.qyxzcName
					},
					success: function(args) {
						window.history.back();
					},
					error: function(args) {

					}
				});
			 })
		}
		editVillageCollection.getAllData=function(){
			//上传所有的数据
			editVillageCollection.localData={
					'id': editVillageCollection.editId,
					'nd': editVillageCollection.situationList.nd,
				  	'qyxz': editVillageCollection.situationList.qyxz,
					'qyxzc': editVillageCollection.situationList.qyxzc,
					'cfzr': editVillageCollection.situationList.cfzr,
					'zwjb': editVillageCollection.situationList.zwjb,
					'cbgdh': editVillageCollection.situationList.cbgdh,
					'pkcsx': editVillageCollection.situationList.pkcsx,
					'fzfxsx': editVillageCollection.situationList.fzfxsx,
					'dxdmsx': editVillageCollection.situationList.dxdmsx,
					'zgdyrs': editVillageCollection.situationList.zgdyrs,
					'dxscgrs': editVillageCollection.situationList.dxscgrs,
					'zrcs': editVillageCollection.situationList.zrcs,
					'zhs': editVillageCollection.situationList.zhs,
					'pkhs': editVillageCollection.situationList.pkhs,
					'dbhs': editVillageCollection.situationList.dbhs,
					'wbhs': editVillageCollection.situationList.wbhs,
					'ybpkhs': editVillageCollection.situationList.ybpkhs,
					'zrks': editVillageCollection.situationList.zrks,
					'pkrks': editVillageCollection.situationList.pkrks,
					'dbrks': editVillageCollection.situationList.dbrks,
					'whrks': editVillageCollection.situationList.whrks,
					'ssmzrks': editVillageCollection.situationList.ssmzrks,
					'fnrks': editVillageCollection.situationList.fnrks,
					'cjrks': editVillageCollection.situationList.cjrks,
					'ybpkrks': editVillageCollection.situationList.ybpkrks,
					'hjrks': editVillageCollection.situationList.hjrks,
					'h9a': editVillageCollection.situationList.h9a,
					'ldlrs': editVillageCollection.situationList.ldlrs,
					'wcwgrs': editVillageCollection.situationList.wcwgrs,
					'gdmj': editVillageCollection.situationList.gdmj,
					'yxgkmj': editVillageCollection.situationList.yxgkmj,
					'ldmj': editVillageCollection.situationList.ldmj,
					'tghlmj': editVillageCollection.situationList.tghlmj,
					'lgmj': editVillageCollection.situationList.lgmj,
					'mcdmj': editVillageCollection.situationList.mcdmj,
					'smmj': editVillageCollection.situationList.smmj,
					'czrks': editVillageCollection.situationList.czrks,
					'nmnrjcsr': editVillageCollection.developmentList.nmnrjcsr,
					'cjjtjjsr': editVillageCollection.developmentList.cjjtjjsr,
					'ncgfhzzzgs': editVillageCollection.developmentList.ncgfhzzzgs,
					'cjxxnchzylrs': editVillageCollection.developmentList.cjxxnchzylrs,
					'cjcxjmjbylbxrs': editVillageCollection.developmentList.cjcxjmjbylbxrs,
					'cjczzgjbylbxrs': editVillageCollection.developmentList.cjczzgjbylbxrs,
					'xzcdxzsftlq': editVillageCollection.developmentList.xzcdxzsftlq,
					'cnzydlsfyh': editVillageCollection.developmentList.cnzydlsfyh,
					'cnzydlc': editVillageCollection.developmentList.cnzydlc,
					'cnzydlk': editVillageCollection.developmentList.cnzydlk,
					'cnzydllds': editVillageCollection.developmentList.cnzydllds,
					'xzcsftkybc': editVillageCollection.developmentList.xzcsftkybc,
					'wsxysaqh': editVillageCollection.developmentList.wsxysaqh,
					'ysknhs': editVillageCollection.developmentList.ysknhs,
					'wtshyddzrcs': editVillageCollection.developmentList.wtshyddzrcs,
					'wtscyddzrcs': editVillageCollection.developmentList.wtscyddzrcs,
					'wtshydhs': editVillageCollection.developmentList.wtshydhs,
					'ydscyhzrcs': editVillageCollection.developmentList.ydscyhzrcs,
					'wfhs': editVillageCollection.developmentList.wfhs,
					'hnzyhzsgs': editVillageCollection.developmentList.hnzyhzsgs,
					'cjnmzyhzspkhs': editVillageCollection.developmentList.cjnmzyhzspkhs,
					'kzxclydhs': editVillageCollection.developmentList.kzxclydhs,
					'xclycyrys': editVillageCollection.developmentList.xclycyrys,
					'jynjldhs': editVillageCollection.developmentList.jynjldhs,
					'jynjlhsnjsr': editVillageCollection.developmentList.jynjlhsnjsr,
					'xzcwssgs': editVillageCollection.developmentList.xzcwssgs,
					'xzcwssjzmj': editVillageCollection.developmentList.xzcwssjzmj,
					'sfzdszlsyffs': editVillageCollection.developmentList.sfzdszlsyffs,
					'ylsbsfqq': editVillageCollection.developmentList.ylsbsfqq,
					'xzczyys': editVillageCollection.developmentList.xzczyys,
					'xzcggwscsgs': editVillageCollection.developmentList.xzcggwscsgs,
					'xzcscshljjcdfdgs': editVillageCollection.developmentList.xzcscshljjcdfdgs,
					'xzcwhsgs': editVillageCollection.developmentList.xzcwhsgs,
					'ywbyxt': editVillageCollection.developmentList.ywbyxt,
					'ywwtgc': editVillageCollection.developmentList.ywwtgc,
					'wtgcmj': editVillageCollection.developmentList.wtgcmj,
					'ywtyqc': editVillageCollection.developmentList.ywtyqc,
					'sfyncsw': editVillageCollection.developmentList.sfyncsw,
					'sfydgnhds': editVillageCollection.developmentList.sfydgnhds,
					'sfywhxckpcl': editVillageCollection.developmentList.sfywhxckpcl,
					'whxckpclcd': editVillageCollection.developmentList.whxckpclcd,
					'tkdhs': editVillageCollection.developmentList.tkdhs,
					'sysjswdhs': editVillageCollection.developmentList.sysjswdhs,
					'tkddcxxgs': editVillageCollection.developmentList.tkddcxxgs,
					'yddzrcztkddcs': editVillageCollection.developmentList.yddzrcztkddcs,
					'xzcxxy': editVillageCollection.developmentList.xzcxxy,
				    "zcgzdqk": JSON.parse(window.localStorage.getItem("taskForceList")), 
				}
		}
		editVillageCollection.queryName=function(){
			for(var i=0;i<editVillageCollection.townShip.length;i++){
				if(editVillageCollection.situationList.qyxz == editVillageCollection.townShip[i].id){
					editVillageCollection.qyxzName = editVillageCollection.townShip[i].name;
				}
			}
			for(var i=0;i<editVillageCollection.villageListAll.length;i++){
				if(editVillageCollection.situationList.qyxzc == editVillageCollection.villageListAll[i].id){
					editVillageCollection.qyxzcName = editVillageCollection.villageListAll[i].name;
				}
			}
		}

		// 弹窗
		editVillageCollection.back=function(){
			editVillageCollection.getAllData();
			editVillageCollection.alert = true;
		}
		editVillageCollection.confirm=function(){
			editVillageCollection.queryName();
			dt.request({
				rqstName: "low_village", //'low_family', 'low_village', 'nature_village', 'relief_project'
				type: "put", //select,delete,put,selectById,
				data: {
					'data':editVillageCollection.localData,
					'qyxzName': editVillageCollection.qyxzName,
					'qyxzcName': editVillageCollection.qyxzcName
				},
				success: function(args) {
					$state.go('villageDraft');
				},
				error: function(args) {

				}
			});
			editVillageCollection.alert = false;
		}
		editVillageCollection.cancel = function(){
			editVillageCollection.alert = false;
			window.history.back();
		}
		// editVillageCollection.back=function(){
			
		// 	fupin.confirm("是否保存为草稿", function() {
				
		// 		dt.request({
		// 			rqstName: "low_village", //'low_family', 'low_village', 'nature_village', 'relief_project'
		// 			type: "put", //select,delete,put,selectById,
		// 			data: {
		// 				'data':editVillageCollection.localData,
		// 				'qyxzName': editVillageCollection.qyxzName,
		// 				'qyxzcName': editVillageCollection.qyxzcName
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
		$scope.editVillageCollection = editVillageCollection;
	}
]);