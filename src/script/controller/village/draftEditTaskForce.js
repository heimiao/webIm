myApp.controller("draftEditTaskForce", ["$scope", "$state", "$http", "$stateParams",
	function($scope, $state, $http, $stateParams) {
		var draftEditTaskForce = {} || draftEditTaskForce;
		draftEditTaskForce.urlParam = $stateParams;
		draftEditTaskForce.sendParam = {};
		draftEditTaskForce.id = parseInt($stateParams.id);
		draftEditTaskForce.alert = false; //弹窗显示
		draftEditTaskForce.taskForce= JSON.parse(window.localStorage.getItem("taskForceList"));
		for(var i=0;i<draftEditTaskForce.taskForce.length;i++){
			if(i == draftEditTaskForce.id){
				draftEditTaskForce.bfdwzcgzdyxm = draftEditTaskForce.taskForce[i].bfdwzcgzdyxm;
				draftEditTaskForce.zzmm = draftEditTaskForce.taskForce[i].zzmm;
				draftEditTaskForce.zjhm = draftEditTaskForce.taskForce[i].zjhm;
				draftEditTaskForce.bfdwmc = draftEditTaskForce.taskForce[i].bfdwmc;
				draftEditTaskForce.dwlsgx = draftEditTaskForce.taskForce[i].dwlsgx;
				draftEditTaskForce.lxdh = draftEditTaskForce.taskForce[i].lxdh;
				$("#star_time").val(draftEditTaskForce.taskForce[i].zcsjb)
				$("#end_time").val(draftEditTaskForce.taskForce[i].zcsje)
				draftEditTaskForce.sfdz = draftEditTaskForce.taskForce[i].sfdz;
				draftEditTaskForce.sfdysj = draftEditTaskForce.taskForce[i].sfdysj;
			}
		}
		draftEditTaskForce.save=function(){
				draftEditTaskForce.taskForce[draftEditTaskForce.id].bfdwzcgzdyxm = draftEditTaskForce.bfdwzcgzdyxm,
				draftEditTaskForce.taskForce[draftEditTaskForce.id].zzmm = draftEditTaskForce.zzmm,
				draftEditTaskForce.taskForce[draftEditTaskForce.id].zjhm = draftEditTaskForce.zjhm,
				draftEditTaskForce.taskForce[draftEditTaskForce.id].bfdwmc = draftEditTaskForce.bfdwmc,
				draftEditTaskForce.taskForce[draftEditTaskForce.id].dwlsgx = draftEditTaskForce.dwlsgx,
				draftEditTaskForce.taskForce[draftEditTaskForce.id].lxdh = draftEditTaskForce.lxdh,
				draftEditTaskForce.taskForce[draftEditTaskForce.id].zcsjb = $("#star_time").val(),
				draftEditTaskForce.taskForce[draftEditTaskForce.id].zcsje = $("#end_time").val(),
				draftEditTaskForce.taskForce[draftEditTaskForce.id].sfdz = draftEditTaskForce.sfdz,
				draftEditTaskForce.taskForce[draftEditTaskForce.id].sfdysj = draftEditTaskForce.sfdysj
				window.localStorage.setItem('taskForceList', JSON.stringify(draftEditTaskForce.taskForce))
				window.history.back();
		}
		draftEditTaskForce.deleteBtn=function(){

		}
		// 弹窗
		draftEditTaskForce.back=function(){
			draftEditTaskForce.alert = true;
		}
		draftEditTaskForce.confirm=function(){
			draftEditTaskForce.save();
			draftEditTaskForce.alert = false;
		}
		draftEditTaskForce.cancel = function(){
			window.history.back();
			draftEditTaskForce.alert = false;
		}
		// draftEditTaskForce.back=function(){
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
		$scope.draftEditTaskForce = draftEditTaskForce;
	}
]);