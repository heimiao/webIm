myApp.controller("addTaskForce", ["$scope", "$state", "$http", "$stateParams",
	function($scope, $state, $http, $stateParams) {
		var addTaskForce = {} || addTaskForce;
		addTaskForce.urlParam = $stateParams;
		addTaskForce.sendParam = {};
		addTaskForce.zzmm = "01"; //政治面貌 默认值
		addTaskForce.dwlsgx = "01"; //单位隶属关系 默认值
		addTaskForce.sfdz = "是"; //默认值
		addTaskForce.sfdysj = "是"; //默认值
		addTaskForce.alert = false; //弹窗显示
		addTaskForce.addTask=function(){
			if(window.localStorage.getItem("taskForceList") != 'null' && window.localStorage.getItem("taskForceList") != '' && window.localStorage.getItem("taskForceList") != undefined && window.localStorage.getItem("taskForceList") != null){
				var taskForce= JSON.parse(window.localStorage.getItem("taskForceList"))
			}else{
				var taskForce= [];
			}
				taskForce.push({
					'bfdwzcgzdyxm':addTaskForce.bfdwzcgzdyxm,
					'zzmm':addTaskForce.zzmm,
					'zjhm':addTaskForce.zjhm,
					'bfdwmc':addTaskForce.bfdwmc,
					'dwlsgx':addTaskForce.dwlsgx,
					'lxdh':addTaskForce.lxdh,
					'zcsjb':$("#star_time").val(),
					'zcsje':$("#end_time").val(),
					'sfdz':addTaskForce.sfdz,
					'sfdysj':addTaskForce.sfdysj,	
				})
			window.localStorage.setItem('taskForceList', JSON.stringify(taskForce))
			window.history.back() 
		}
		// 弹窗
		addTaskForce.back=function(){
			addTaskForce.alert = true;
		}
		addTaskForce.confirm=function(){
			addTaskForce.addTask();
			addTaskForce.alert = false;
		}
		addTaskForce.cancel = function(){
			addTaskForce.alert = false;
			window.history.back();
		}

		// addTaskForce.back=function(){
		// 	fupin.confirm("是否保存为草稿", function() {
		// 		addTaskForce.addTask();
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
		$scope.addTaskForce = addTaskForce;
	}
]);