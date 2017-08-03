myApp.controller("draftAddTaskForce", ["$scope", "$state", "$http", "$stateParams",
	function($scope, $state, $http, $stateParams) {
		var draftAddTaskForce = {} || draftAddTaskForce;
		draftAddTaskForce.urlParam = $stateParams;
		draftAddTaskForce.sendParam = {};
		draftAddTaskForce.zzmm = "01"; //政治面貌 默认值
		draftAddTaskForce.dwlsgx = "01"; //单位隶属关系 默认值
		draftAddTaskForce.sfdz = "是"; //默认值
		draftAddTaskForce.sfdysj = "是"; //默认值
		draftAddTaskForce.fid = $stateParams.fid; //
		draftAddTaskForce.alert = false; //弹窗显示
		draftAddTaskForce.addTask=function(){
			var taskForce= window.localStorage.getItem("taskForceList")?JSON.parse(window.localStorage.getItem("taskForceList")):[];
				if(draftAddTaskForce.fid){
					taskForce.push({
						'fid': draftAddTaskForce.fid,
						'bfdwzcgzdyxm':draftAddTaskForce.bfdwzcgzdyxm,
						'zzmm':draftAddTaskForce.zzmm,
						'zjhm':draftAddTaskForce.zjhm,
						'bfdwmc':draftAddTaskForce.bfdwmc,
						'dwlsgx':draftAddTaskForce.dwlsgx,
						'lxdh':draftAddTaskForce.lxdh,
						'zcsjb':$("#star_time").val(),
						'zcsje':$("#end_time").val(),
						'sfdz':draftAddTaskForce.sfdz,
						'sfdysj':draftAddTaskForce.sfdysj,	
					})
				}else{
					taskForce.push({
						'bfdwzcgzdyxm':draftAddTaskForce.bfdwzcgzdyxm,
						'zzmm':draftAddTaskForce.zzmm,
						'zjhm':draftAddTaskForce.zjhm,
						'bfdwmc':draftAddTaskForce.bfdwmc,
						'dwlsgx':draftAddTaskForce.dwlsgx,
						'lxdh':draftAddTaskForce.lxdh,
						'zcsjb':$("#star_time").val(),
						'zcsje':$("#end_time").val(),
						'sfdz':draftAddTaskForce.sfdz,
						'sfdysj':draftAddTaskForce.sfdysj,	
					})
				}
				
			window.localStorage.setItem('taskForceList', JSON.stringify(taskForce))
			window.history.back();
		}
		// 弹窗
		draftAddTaskForce.back=function(){
			draftAddTaskForce.alert = true;
		}
		draftAddTaskForce.confirm=function(){
			draftAddTaskForce.addTask();
			draftAddTaskForce.alert = false;
		}
		draftAddTaskForce.cancel = function(){
			window.history.back();
			draftAddTaskForce.alert = false;
		}
		// draftAddTaskForce.back=function(){
		// 	fupin.confirm("是否保存为草稿", function() {
				
		// 		alert(1)
		// 	}, function() {
		// 		alert(4)
		// 		window.history.back() 
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
		$scope.draftAddTaskForce = draftAddTaskForce;
	}
]);