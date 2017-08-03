myApp.controller("editAddTaskForce", ["$scope", "$state", "$http", "$stateParams",
	function($scope, $state, $http, $stateParams) {
		var editAddTaskForce = {} || editAddTaskForce;
		editAddTaskForce.urlParam = $stateParams;
		editAddTaskForce.sendParam = {};
		editAddTaskForce.zzmm = "01"; //政治面貌 默认值
		editAddTaskForce.dwlsgx = "01"; //单位隶属关系 默认值
		editAddTaskForce.sfdz = "是"; //默认值 
		editAddTaskForce.sfdysj = "是"; //默认值
		editAddTaskForce.alert = false; //弹窗显示
		editAddTaskForce.addTask=function(){
			var taskForce= window.localStorage.getItem("taskForceList")?JSON.parse(window.localStorage.getItem("taskForceList")):[];
				taskForce.push({
					'fid': $stateParams.fid,
					'bfdwzcgzdyxm':editAddTaskForce.bfdwzcgzdyxm,
					'zzmm':editAddTaskForce.zzmm,
					'zjhm':editAddTaskForce.zjhm,
					'bfdwmc':editAddTaskForce.bfdwmc,
					'dwlsgx':editAddTaskForce.dwlsgx,
					'lxdh':editAddTaskForce.lxdh,
					'zcsjb':$("#star_time").val(),
					'zcsje':$("#end_time").val(),
					'sfdz':editAddTaskForce.sfdz,
					'sfdysj':editAddTaskForce.sfdysj,	
				})
			window.localStorage.setItem('taskForceList', JSON.stringify(taskForce))
			window.history.back();
		}
		// 弹窗
		editAddTaskForce.back=function(){
			editAddTaskForce.alert = true;
		}
		editAddTaskForce.confirm=function(){
			editAddTaskForce.addTask();
			editAddTaskForce.alert = false;
		}
		editAddTaskForce.cancel = function(){
			editAddTaskForce.alert = false;
			window.history.back();
		}
		// editAddTaskForce.back=function(){
		// 	fupin.confirm("是否保存为草稿", function() {
		// 		editAddTaskForce.addTask();
		// 	}, function() {
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
		$scope.editAddTaskForce = editAddTaskForce;
	}
]);