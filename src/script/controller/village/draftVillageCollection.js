myApp.controller("draftVillageCollection", ["$scope", "$state", "$http", "$stateParams","postForm",
	function($scope, $state, $http, $stateParams, postForm) {
		var draftVillageCollection = {} || draftVillageCollection;
		draftVillageCollection.urlParam = $stateParams;
		draftVillageCollection.sendParam = {};
		draftVillageCollection.situationList = {}; //存基本情况的表单数据
		draftVillageCollection.developmentList = {}; //存发展现状的的表单数据
		draftVillageCollection.townShip = []; //全部乡镇列表
		draftVillageCollection.villageListAll = []; //获取全部行政村
		draftVillageCollection.taskForceList = []; //获取本地的驻村工作队列表
		draftVillageCollection.draftId = $stateParams.draftId;
		draftVillageCollection.editId = null; //存之前编辑的id

		draftVillageCollection.alert = false; //弹窗显示
		window.localStorage.setItem("draftVillageCollectionDraftId", $stateParams.draftId);
		//根据id获取详细信息
		draftVillageCollection.getLocalDetails=function(){
			dt.request({
				rqstName: "low_village", //'low_family', 'low_village', 'nature_village', 'relief_project'
				type: "selectById", //select,delete,put,selectById,
				param: {
					index_id: draftVillageCollection.draftId
				},
				success: function(args) {
					if(args.data.id){
						draftVillageCollection.editId = args.data.id;
						window.localStorage.setItem("draftVillageCollectionEditId", args.data.id);
					}
					draftVillageCollection.situationList = {
						'qyxz': args.data.qyxz,
						'qyxzc': args.data.qyxzc,
						'cfzr': args.data.cfzr,
						'zwjb': args.data.zwjb,
						'cbgdh': args.data.cbgdh,
						'pkcsx': args.data.pkcsx,
						'fzfxsx': args.data.fzfxsx,
						'dxdmsx': args.data.dxdmsx,
						'zgdyrs': args.data.zgdyrs,
						'dxscgrs': args.data.dxscgrs,
						'zrcs': args.data.zrcs,
						'zhs': args.data.zhs,
						'pkhs': args.data.pkhs,
						'dbhs': args.data.dbhs,
						'wbhs': args.data.wbhs,
						'ybpkhs': args.data.ybpkhs,
						'zrks': args.data.zrks,
						'pkrks': args.data.pkrks,
						'dbrks': args.data.dbrks,
						'whrks': args.data.whrks,
						'ssmzrks': args.data.ssmzrks,
						'fnrks': args.data.fnrks,
						'cjrks': args.data.cjrks,
						'ybpkrks': args.data.ybpkrks,
						'hjrks': args.data.hjrks,
						'h9a': args.data.h9a,
						'ldlrs': args.data.ldlrs,
						'wcwgrs': args.data.wcwgrs,
						'gdmj': args.data.gdmj,
						'yxgkmj': args.data.yxgkmj,
						'ldmj': args.data.ldmj,
						'tghlmj': args.data.tghlmj,
						'lgmj': args.data.lgmj,
						'mcdmj': args.data.mcdmj,
						'smmj': args.data.smmj,
						'czrks': args.data.czrks
					}
					draftVillageCollection.developmentList = {
						'nmnrjcsr': args.data.nmnrjcsr,
						'cjjtjjsr': args.data.cjjtjjsr,
						'ncgfhzzzgs': args.data.ncgfhzzzgs,
						'cjxxnchzylrs': args.data.cjxxnchzylrs,
						'cjcxjmjbylbxrs': args.data.cjcxjmjbylbxrs,
						'cjczzgjbylbxrs': args.data.cjczzgjbylbxrs,
						'xzcdxzsftlq': args.data.xzcdxzsftlq,
						'cnzydlsfyh': args.data.cnzydlsfyh,
						'cnzydlc': args.data.cnzydlc,
						'cnzydlk': args.data.cnzydlk,
						'cnzydllds': args.data.cnzydllds,
						'xzcsftkybc': args.data.xzcsftkybc,
						'wsxysaqh': args.data.wsxysaqh,
						'ysknhs': args.data.ysknhs,
						'wtshyddzrcs': args.data.wtshyddzrcs,
						'wtscyddzrcs': args.data.wtscyddzrcs,
						'wtshydhs': args.data.wtshydhs,
						'ydscyhzrcs': args.data.ydscyhzrcs,
						'wfhs': args.data.wfhs,
						'hnzyhzsgs': args.data.hnzyhzsgs,
						'cjnmzyhzspkhs': args.data.cjnmzyhzspkhs,
						'kzxclydhs': args.data.kzxclydhs,
						'xclycyrys': args.data.xclycyrys,
						'jynjldhs': args.data.jynjldhs,
						'jynjlhsnjsr': args.data.jynjlhsnjsr,
						'xzcwssgs': args.data.xzcwssgs,
						'xzcwssjzmj': args.data.xzcwssjzmj,
						'sfzdszlsyffs': args.data.sfzdszlsyffs,
						'ylsbsfqq': args.data.ylsbsfqq,
						'xzczyys': args.data.xzczyys,
						'xzcggwscsgs': args.data.xzcggwscsgs,
						'xzcscshljjcdfdgs': args.data.xzcscshljjcdfdgs,
						'xzcwhsgs': args.data.xzcwhsgs,
						'ywbyxt': args.data.ywbyxt,
						'ywwtgc': args.data.ywwtgc,
						'wtgcmj': args.data.wtgcmj,
						'ywtyqc': args.data.ywtyqc,
						'sfyncsw': args.data.sfyncsw,
						'sfydgnhds': args.data.sfydgnhds,
						'sfywhxckpcl': args.data.sfywhxckpcl,
						'whxckpclcd': args.data.whxckpclcd,
						'tkdhs': args.data.tkdhs,
						'sysjswdhs': args.data.sysjswdhs,
						'tkddcxxgs': args.data.tkddcxxgs,
						'yddzrcztkddcs': args.data.yddzrcztkddcs,
						'xzcxxy': args.data.xzcxxy
					}
					window.localStorage.setItem("taskForceList", JSON.stringify(args.data.zcgzdqk))
					draftVillageCollection.taskForceList = JSON.parse(window.localStorage.getItem("taskForceList"));
					draftVillageCollection.getVillageList(args.data.qyxz); //获取乡镇对应的行政村
					$scope.$apply();
				},
				error: function(args) {

				}
			});
		}
		//获取所有乡镇
		$http.post(config.path.townShip,null).success(function(res){
			draftVillageCollection.townShip = res;
			if(window.localStorage.getItem("situationList") != '' && window.localStorage.getItem("situationList") != null && window.localStorage.getItem("situationList") != undefined && window.localStorage.getItem("situationList") != 'null' && window.localStorage.getItem("developmentList") != '' && window.localStorage.getItem("developmentList") != null && window.localStorage.getItem("developmentList") != undefined && window.localStorage.getItem("developmentList") != 'null'){
				draftVillageCollection.situationList = JSON.parse(window.localStorage.getItem("situationList"));
				draftVillageCollection.developmentList = JSON.parse(window.localStorage.getItem("developmentList"));
				// 获取本地添加驻村工作情况列表数据  
				draftVillageCollection.taskForceList = JSON.parse(window.localStorage.getItem("taskForceList"));
				draftVillageCollection.editId = window.localStorage.getItem("draftVillageCollectionEditId");
				draftVillageCollection.getVillageList(draftVillageCollection.situationList.qyxz); //获取乡镇对应的行政村
			}else{
				draftVillageCollection.getLocalDetails();
			}
			
		})
		if(window.localStorage.getItem("situationList") != '' && window.localStorage.getItem("situationList") != null && window.localStorage.getItem("situationList") != undefined && window.localStorage.getItem("situationList") != 'null' && window.localStorage.getItem("developmentList") != '' && window.localStorage.getItem("developmentList") != null && window.localStorage.getItem("developmentList") != undefined && window.localStorage.getItem("developmentList") != 'null'){
			$('.tab3').addClass('bg').siblings().removeClass('bg');
			$("#"+$('.tab3').attr('data-type')).show().siblings().hide();
			draftVillageCollection.situationList = JSON.parse(window.localStorage.getItem("situationList"));
			draftVillageCollection.developmentList = JSON.parse(window.localStorage.getItem("developmentList"));
		}
		$("#tab div").click(function(){
			$(this).addClass('bg').siblings().removeClass('bg');
			$("#"+$(this).attr('data-type')).show().siblings().hide();
			if($(this).attr('data-type') == "taskForse"){
				draftVillageCollection.situationList = {
					'qyxz': draftVillageCollection.situationList.qyxz,
					'qyxzc': draftVillageCollection.situationList.qyxzc,
					'cfzr': draftVillageCollection.situationList.cfzr,
					'zwjb': draftVillageCollection.situationList.zwjb,
					'cbgdh': draftVillageCollection.situationList.cbgdh,
					'pkcsx': draftVillageCollection.situationList.pkcsx,
					'fzfxsx': draftVillageCollection.situationList.fzfxsx,
					'dxdmsx': draftVillageCollection.situationList.dxdmsx,
					'zgdyrs': draftVillageCollection.situationList.zgdyrs,
					'dxscgrs': draftVillageCollection.situationList.dxscgrs,
					'zrcs': draftVillageCollection.situationList.zrcs,
					'zhs': draftVillageCollection.situationList.zhs,
					'pkhs': draftVillageCollection.situationList.pkhs,
					'dbhs': draftVillageCollection.situationList.dbhs,
					'wbhs': draftVillageCollection.situationList.wbhs,
					'ybpkhs': draftVillageCollection.situationList.ybpkhs,
					'zrks': draftVillageCollection.situationList.zrks,
					'pkrks': draftVillageCollection.situationList.pkrks,
					'dbrks': draftVillageCollection.situationList.dbrks,
					'whrks': draftVillageCollection.situationList.whrks,
					'ssmzrks': draftVillageCollection.situationList.ssmzrks,
					'fnrks': draftVillageCollection.situationList.fnrks,
					'cjrks': draftVillageCollection.situationList.cjrks,
					'ybpkrks': draftVillageCollection.situationList.ybpkrks,
					'hjrks': draftVillageCollection.situationList.hjrks,
					'h9a': draftVillageCollection.situationList.h9a,
					'ldlrs': draftVillageCollection.situationList.ldlrs,
					'wcwgrs': draftVillageCollection.situationList.wcwgrs,
					'gdmj': draftVillageCollection.situationList.gdmj,
					'yxgkmj': draftVillageCollection.situationList.yxgkmj,
					'ldmj': draftVillageCollection.situationList.ldmj,
					'tghlmj': draftVillageCollection.situationList.tghlmj,
					'lgmj': draftVillageCollection.situationList.lgmj,
					'mcdmj': draftVillageCollection.situationList.mcdmj,
					'smmj': draftVillageCollection.situationList.smmj,
					'czrks': draftVillageCollection.situationList.czrks
				}
				draftVillageCollection.developmentList = {
					'nmnrjcsr': draftVillageCollection.developmentList.nmnrjcsr,
					'cjjtjjsr': draftVillageCollection.developmentList.cjjtjjsr,
					'ncgfhzzzgs': draftVillageCollection.developmentList.ncgfhzzzgs,
					'cjxxnchzylrs': draftVillageCollection.developmentList.cjxxnchzylrs,
					'cjcxjmjbylbxrs': draftVillageCollection.developmentList.cjcxjmjbylbxrs,
					'cjczzgjbylbxrs': draftVillageCollection.developmentList.cjczzgjbylbxrs,
					'xzcdxzsftlq': draftVillageCollection.developmentList.xzcdxzsftlq,
					'cnzydlsfyh': draftVillageCollection.developmentList.cnzydlsfyh,
					'cnzydlc': draftVillageCollection.developmentList.cnzydlc,
					'cnzydlk': draftVillageCollection.developmentList.cnzydlk,
					'cnzydllds': draftVillageCollection.developmentList.cnzydllds,
					'xzcsftkybc': draftVillageCollection.developmentList.xzcsftkybc,
					'wsxysaqh': draftVillageCollection.developmentList.wsxysaqh,
					'ysknhs': draftVillageCollection.developmentList.ysknhs,
					'wtshyddzrcs': draftVillageCollection.developmentList.wtshyddzrcs,
					'wtscyddzrcs': draftVillageCollection.developmentList.wtscyddzrcs,
					'wtshydhs': draftVillageCollection.developmentList.wtshydhs,
					'ydscyhzrcs': draftVillageCollection.developmentList.ydscyhzrcs,
					'wfhs': draftVillageCollection.developmentList.wfhs,
					'hnzyhzsgs': draftVillageCollection.developmentList.hnzyhzsgs,
					'cjnmzyhzspkhs': draftVillageCollection.developmentList.cjnmzyhzspkhs,
					'kzxclydhs': draftVillageCollection.developmentList.kzxclydhs,
					'xclycyrys': draftVillageCollection.developmentList.xclycyrys,
					'jynjldhs': draftVillageCollection.developmentList.jynjldhs,
					'jynjlhsnjsr': draftVillageCollection.developmentList.jynjlhsnjsr,
					'xzcwssgs': draftVillageCollection.developmentList.xzcwssgs,
					'xzcwssjzmj': draftVillageCollection.developmentList.xzcwssjzmj,
					'sfzdszlsyffs': draftVillageCollection.developmentList.sfzdszlsyffs,
					'ylsbsfqq': draftVillageCollection.developmentList.ylsbsfqq,
					'xzczyys': draftVillageCollection.developmentList.xzczyys,
					'xzcggwscsgs': draftVillageCollection.developmentList.xzcggwscsgs,
					'xzcscshljjcdfdgs': draftVillageCollection.developmentList.xzcscshljjcdfdgs,
					'xzcwhsgs': draftVillageCollection.developmentList.xzcwhsgs,
					'ywbyxt': draftVillageCollection.developmentList.ywbyxt,
					'ywwtgc': draftVillageCollection.developmentList.ywwtgc,
					'wtgcmj': draftVillageCollection.developmentList.wtgcmj,
					'ywtyqc': draftVillageCollection.developmentList.ywtyqc,
					'sfyncsw': draftVillageCollection.developmentList.sfyncsw,
					'sfydgnhds': draftVillageCollection.developmentList.sfydgnhds,
					'sfywhxckpcl': draftVillageCollection.developmentList.sfywhxckpcl,
					'whxckpclcd': draftVillageCollection.developmentList.whxckpclcd,
					'tkdhs': draftVillageCollection.developmentList.tkdhs,
					'sysjswdhs': draftVillageCollection.developmentList.sysjswdhs,
					'tkddcxxgs': draftVillageCollection.developmentList.tkddcxxgs,
					'yddzrcztkddcs': draftVillageCollection.developmentList.yddzrcztkddcs,
					'xzcxxy': draftVillageCollection.developmentList.xzcxxy
				}
				window.localStorage.setItem("situationList", JSON.stringify(draftVillageCollection.situationList))
				window.localStorage.setItem("developmentList", JSON.stringify(draftVillageCollection.developmentList))
			}
		})
		// 获取所有乡镇
		// $http.post(config.path.townShip,null).success(function(res){
		// 	draftVillageCollection.situationList.qyxz = res[0].id;
		// 	draftVillageCollection.townShip = res;
		// 	draftVillageCollection.getVillageList(res[0].id); //获取乡镇对应的行政村 
		// })
		// 乡镇变化行政村跟随变化
		draftVillageCollection.changeTown=function(){
			draftVillageCollection.getVillageList(draftVillageCollection.situationList.qyxz, 1); //获取乡镇对应的行政村
		}
		// 获取所有行政村
		draftVillageCollection.getVillageList= function(id, num){
			$http.post(config.path.villageAll+"&fid="+id,null).success(function(res){
				if(num == 1){
					draftVillageCollection.situationList.qyxzc = res[0].id;
				}
				draftVillageCollection.villageListAll = res;
			})
		}
		draftVillageCollection.uploadSave=function(){
			if(!draftVillageCollection.situationList.cfzr){
				alert("请完善信息")
				return;
			}
			draftVillageCollection.getAllData();
			if(draftVillageCollection.editId){
				postForm.saveFrm(config.path.updateVillage,{"data": JSON.stringify(draftVillageCollection.localData)}).success(function(res){
					//根据id删除
					dt.request({
						rqstName: "low_family", //'low_family', 'low_village', 'nature_village', 'relief_project'
						type: "delete", //select,delete,put,selectById,
						param: {
							'index_id': window.localStorage.getItem("draftVillageCollectionDraftId")
						},
						success: function(args) {
							window.history.back();
						},
						'error': function(args) {

						}
					});
				}).error(function(){
					//保存，或者修改，如果有index_id则为修改没有则为添加
					draftVillageCollection.queryName();
					dt.request({
						rqstName: "low_village", //'low_family', 'low_village', 'nature_village', 'relief_project'
						type: "put", //select,delete,put,selectById,
						data: {
							'data':draftVillageCollection.localData,
							'qyxzName': draftVillageCollection.qyxzName,
							'qyxzcName': draftVillageCollection.qyxzcName
						},
						success: function(args) {
							fupin.alert("已保存到草稿")
							window.history.back();
						},
						error: function(args) {

						}
					});
				 })
			}else{
				postForm.saveFrm(config.path.addVillage,{"data": JSON.stringify(draftVillageCollection.localData)}).success(function(res){
					//根据id删除
					dt.request({
						rqstName: "low_family", //'low_family', 'low_village', 'nature_village', 'relief_project'
						type: "delete", //select,delete,put,selectById,
						param: {
							'index_id': window.localStorage.getItem("draftVillageCollectionDraftId")
						},
						success: function(args) {
							alert(window.localStorage.getItem("draftVillageCollectionDraftId"))
							window.history.back();
						},
						'error': function(args) {

						}
					});
				}).error(function(){
					//保存，或者修改，如果有index_id则为修改没有则为添加
					draftVillageCollection.queryName();
					dt.request({
						rqstName: "low_village", //'low_family', 'low_village', 'nature_village', 'relief_project'
						type: "put", //select,delete,put,selectById,
						data: {
							'data':draftVillageCollection.localData,
							'qyxzName': draftVillageCollection.qyxzName,
							'qyxzcName': draftVillageCollection.qyxzcName
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
		}
		draftVillageCollection.queryName=function(){
			for(var i=0;i<draftVillageCollection.townShip.length;i++){
				if(draftVillageCollection.situationList.qyxz == draftVillageCollection.townShip[i].id){
					draftVillageCollection.qyxzName = draftVillageCollection.townShip[i].name;
				}
			}
			for(var i=0;i<draftVillageCollection.villageListAll.length;i++){
				if(draftVillageCollection.situationList.qyxzc == draftVillageCollection.villageListAll[i].id){
					draftVillageCollection.qyxzcName = draftVillageCollection.villageListAll[i].name;
				}
			}
		}
		draftVillageCollection.getAllData=function(){
			//上传所有的数据
			draftVillageCollection.localData={
					'id': draftVillageCollection.editId,
				  	'qyxz': draftVillageCollection.situationList.qyxz,
					'qyxzc': draftVillageCollection.situationList.qyxzc,
					'cfzr': draftVillageCollection.situationList.cfzr,
					'zwjb': draftVillageCollection.situationList.zwjb,
					'cbgdh': draftVillageCollection.situationList.cbgdh,
					'pkcsx': draftVillageCollection.situationList.pkcsx,
					'fzfxsx': draftVillageCollection.situationList.fzfxsx,
					'dxdmsx': draftVillageCollection.situationList.dxdmsx,
					'zgdyrs': draftVillageCollection.situationList.zgdyrs,
					'dxscgrs': draftVillageCollection.situationList.dxscgrs,
					'zrcs': draftVillageCollection.situationList.zrcs,
					'zhs': draftVillageCollection.situationList.zhs,
					'pkhs': draftVillageCollection.situationList.pkhs,
					'dbhs': draftVillageCollection.situationList.dbhs,
					'wbhs': draftVillageCollection.situationList.wbhs,
					'ybpkhs': draftVillageCollection.situationList.ybpkhs,
					'zrks': draftVillageCollection.situationList.zrks,
					'pkrks': draftVillageCollection.situationList.pkrks,
					'dbrks': draftVillageCollection.situationList.dbrks,
					'whrks': draftVillageCollection.situationList.whrks,
					'ssmzrks': draftVillageCollection.situationList.ssmzrks,
					'fnrks': draftVillageCollection.situationList.fnrks,
					'cjrks': draftVillageCollection.situationList.cjrks,
					'ybpkrks': draftVillageCollection.situationList.ybpkrks,
					'hjrks': draftVillageCollection.situationList.hjrks,
					'h9a': draftVillageCollection.situationList.h9a,
					'ldlrs': draftVillageCollection.situationList.ldlrs,
					'wcwgrs': draftVillageCollection.situationList.wcwgrs,
					'gdmj': draftVillageCollection.situationList.gdmj,
					'yxgkmj': draftVillageCollection.situationList.yxgkmj,
					'ldmj': draftVillageCollection.situationList.ldmj,
					'tghlmj': draftVillageCollection.situationList.tghlmj,
					'lgmj': draftVillageCollection.situationList.lgmj,
					'mcdmj': draftVillageCollection.situationList.mcdmj,
					'smmj': draftVillageCollection.situationList.smmj,
					'czrks': draftVillageCollection.situationList.czrks,
					'nmnrjcsr': draftVillageCollection.developmentList.nmnrjcsr,
					'cjjtjjsr': draftVillageCollection.developmentList.cjjtjjsr,
					'ncgfhzzzgs': draftVillageCollection.developmentList.ncgfhzzzgs,
					'cjxxnchzylrs': draftVillageCollection.developmentList.cjxxnchzylrs,
					'cjcxjmjbylbxrs': draftVillageCollection.developmentList.cjcxjmjbylbxrs,
					'cjczzgjbylbxrs': draftVillageCollection.developmentList.cjczzgjbylbxrs,
					'xzcdxzsftlq': draftVillageCollection.developmentList.xzcdxzsftlq,
					'cnzydlsfyh': draftVillageCollection.developmentList.cnzydlsfyh,
					'cnzydlc': draftVillageCollection.developmentList.cnzydlc,
					'cnzydlk': draftVillageCollection.developmentList.cnzydlk,
					'cnzydllds': draftVillageCollection.developmentList.cnzydllds,
					'xzcsftkybc': draftVillageCollection.developmentList.xzcsftkybc,
					'wsxysaqh': draftVillageCollection.developmentList.wsxysaqh,
					'ysknhs': draftVillageCollection.developmentList.ysknhs,
					'wtshyddzrcs': draftVillageCollection.developmentList.wtshyddzrcs,
					'wtscyddzrcs': draftVillageCollection.developmentList.wtscyddzrcs,
					'wtshydhs': draftVillageCollection.developmentList.wtshydhs,
					'ydscyhzrcs': draftVillageCollection.developmentList.ydscyhzrcs,
					'wfhs': draftVillageCollection.developmentList.wfhs,
					'hnzyhzsgs': draftVillageCollection.developmentList.hnzyhzsgs,
					'cjnmzyhzspkhs': draftVillageCollection.developmentList.cjnmzyhzspkhs,
					'kzxclydhs': draftVillageCollection.developmentList.kzxclydhs,
					'xclycyrys': draftVillageCollection.developmentList.xclycyrys,
					'jynjldhs': draftVillageCollection.developmentList.jynjldhs,
					'jynjlhsnjsr': draftVillageCollection.developmentList.jynjlhsnjsr,
					'xzcwssgs': draftVillageCollection.developmentList.xzcwssgs,
					'xzcwssjzmj': draftVillageCollection.developmentList.xzcwssjzmj,
					'sfzdszlsyffs': draftVillageCollection.developmentList.sfzdszlsyffs,
					'ylsbsfqq': draftVillageCollection.developmentList.ylsbsfqq,
					'xzczyys': draftVillageCollection.developmentList.xzczyys,
					'xzcggwscsgs': draftVillageCollection.developmentList.xzcggwscsgs,
					'xzcscshljjcdfdgs': draftVillageCollection.developmentList.xzcscshljjcdfdgs,
					'xzcwhsgs': draftVillageCollection.developmentList.xzcwhsgs,
					'ywbyxt': draftVillageCollection.developmentList.ywbyxt,
					'ywwtgc': draftVillageCollection.developmentList.ywwtgc,
					'wtgcmj': draftVillageCollection.developmentList.wtgcmj,
					'ywtyqc': draftVillageCollection.developmentList.ywtyqc,
					'sfyncsw': draftVillageCollection.developmentList.sfyncsw,
					'sfydgnhds': draftVillageCollection.developmentList.sfydgnhds,
					'sfywhxckpcl': draftVillageCollection.developmentList.sfywhxckpcl,
					'whxckpclcd': draftVillageCollection.developmentList.whxckpclcd,
					'tkdhs': draftVillageCollection.developmentList.tkdhs,
					'sysjswdhs': draftVillageCollection.developmentList.sysjswdhs,
					'tkddcxxgs': draftVillageCollection.developmentList.tkddcxxgs,
					'yddzrcztkddcs': draftVillageCollection.developmentList.yddzrcztkddcs,
					'xzcxxy': draftVillageCollection.developmentList.xzcxxy,
				    "zcgzdqk": JSON.parse(window.localStorage.getItem("taskForceList")), 
				}
		}

		// 弹窗
		draftVillageCollection.back=function(){
			draftVillageCollection.getAllData();
			draftVillageCollection.alert = true;
		}
		draftVillageCollection.confirm=function(){
			draftVillageCollection.queryName();
			dt.request({
				rqstName: "low_village", //'low_family', 'low_village', 'nature_village', 'relief_project'
				type: "put", //select,delete,put,selectById,
				data: {
					'data':draftVillageCollection.localData,
					'qyxzName': draftVillageCollection.qyxzName,
					'qyxzcName': draftVillageCollection.qyxzcName
				},
				success: function(args) {
					fupin.alert("已保存到草稿")
					window.history.back();
				},
				error: function(args) {

				}
			});
			draftVillageCollection.alert = false;
		}
		draftVillageCollection.cancel = function(){
			window.history.back();
			draftVillageCollection.alert = false;
		}
		/*lowFamilyInfo.menu=false;
		lowFamilyInfo.changeMenu=function(args){
			lowFamilyInfo.menu=args;
			console.log(lowFamilyInfo.menu);
		}*/

		//调用列表
		//		$state.go('lowFamily.baseInfo'); //默认显示第一个tab
		//根据角色遍历响应的菜单
		$scope.draftVillageCollection = draftVillageCollection;
	}
]);