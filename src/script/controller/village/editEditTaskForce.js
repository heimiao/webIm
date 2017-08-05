myApp.controller("editEditTaskForce", ["$scope", "$state", "$http", "$stateParams",
	function($scope, $state, $http, $stateParams) {
		var editEditTaskForce = {} || editEditTaskForce;
		editEditTaskForce.urlParam = $stateParams;
		editEditTaskForce.sendParam = {};
		editEditTaskForce.alert = false; //弹窗显示
		editEditTaskForce.id = parseInt($stateParams.id);
		editEditTaskForce.taskForce= JSON.parse(window.localStorage.getItem("taskForceList"));
		for(var i=0;i<editEditTaskForce.taskForce.length;i++){
			if(i == editEditTaskForce.id){
				editEditTaskForce.bfdwzcgzdyxm = editEditTaskForce.taskForce[i].bfdwzcgzdyxm;
				editEditTaskForce.zzmm = editEditTaskForce.taskForce[i].zzmm;
				editEditTaskForce.zjhm = editEditTaskForce.taskForce[i].zjhm;
				editEditTaskForce.bfdwmc = editEditTaskForce.taskForce[i].bfdwmc;
				editEditTaskForce.dwlsgx = editEditTaskForce.taskForce[i].dwlsgx;
				editEditTaskForce.lxdh = editEditTaskForce.taskForce[i].lxdh;
				$("#star_time").val(editEditTaskForce.taskForce[i].zcsjb)
				$("#end_time").val(editEditTaskForce.taskForce[i].zcsje)
				editEditTaskForce.sfdz = editEditTaskForce.taskForce[i].sfdz;
				editEditTaskForce.sfdysj = editEditTaskForce.taskForce[i].sfdysj;
			}
		}
		editEditTaskForce.save=function(){
				editEditTaskForce.taskForce[editEditTaskForce.id].bfdwzcgzdyxm = editEditTaskForce.bfdwzcgzdyxm,
				editEditTaskForce.taskForce[editEditTaskForce.id].zzmm = editEditTaskForce.zzmm,
				editEditTaskForce.taskForce[editEditTaskForce.id].zjhm = editEditTaskForce.zjhm,
				editEditTaskForce.taskForce[editEditTaskForce.id].bfdwmc = editEditTaskForce.bfdwmc,
				editEditTaskForce.taskForce[editEditTaskForce.id].dwlsgx = editEditTaskForce.dwlsgx,
				editEditTaskForce.taskForce[editEditTaskForce.id].lxdh = editEditTaskForce.lxdh,
				editEditTaskForce.taskForce[editEditTaskForce.id].zcsjb = $("#star_time").val(),
				editEditTaskForce.taskForce[editEditTaskForce.id].zcsje = $("#end_time").val(),
				editEditTaskForce.taskForce[editEditTaskForce.id].sfdz = editEditTaskForce.sfdz,
				editEditTaskForce.taskForce[editEditTaskForce.id].sfdysj = editEditTaskForce.sfdysj
				window.localStorage.setItem('taskForceList', JSON.stringify(editEditTaskForce.taskForce))
				window.history.back();
		}
		editEditTaskForce.deleteBtn=function(){
			for(var i=0,Earr=[];i<editEditTaskForce.taskForce.length;i++){
				if(i != editEditTaskForce.id){
					Earr.push(editEditTaskForce.taskForce[i])
				}
			}
			window.localStorage.setItem('taskForceList', JSON.stringify(Earr))
			window.history.back();
		}
		// 弹窗
		editEditTaskForce.back=function(){
			editEditTaskForce.save();
		}
		// editEditTaskForce.confirm=function(){
		// 	editEditTaskForce.save();
		// 	editEditTaskForce.alert = false;
		// }
		// editEditTaskForce.cancel = function(){
		// 	editEditTaskForce.alert = false;
		// 	window.history.back();
		// }
		// editEditTaskForce.back=function(){
		// 	fupin.confirm("是否保存为草稿", function() {
		// 		editEditTaskForce.save();
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
		$scope.editEditTaskForce = editEditTaskForce;
	}
]);