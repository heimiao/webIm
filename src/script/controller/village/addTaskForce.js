myApp.controller("addTaskForce", ["$scope", "$state", "$http", "$stateParams",
	function($scope, $state, $http, $stateParams) {
		var addTaskForce = {} || addTaskForce;
		addTaskForce.urlParam = $stateParams;
		addTaskForce.sendParam = {};
		addTaskForce.zzmm = "01"; //政治面貌 默认值
		addTaskForce.dwlsgx = "01"; //单位隶属关系 默认值
		addTaskForce.sfdz = "是"; //默认值
		addTaskForce.sfdysj = "是"; //默认值
		addTaskForce.addTask=function(){
			var taskForce= window.localStorage.getItem("taskForceList")?JSON.parse(window.localStorage.getItem("taskForceList")):[];
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
			$state.go("villageCollection",{type: 1});
		}
		addTaskForce.back=function(){
			fupin.confirm("是否保存为草稿", function() {
				addTaskForce.addTask();
			}, function() {
				window.history.back() 
			});
		}
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