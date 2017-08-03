myApp.controller("editTaskForce", ["$scope", "$state", "$http", "$stateParams",
	function($scope, $state, $http, $stateParams) {
		var editTaskForce = {} || editTaskForce;
		editTaskForce.urlParam = $stateParams;
		editTaskForce.sendParam = {};
		editTaskForce.alert = false;
		editTaskForce.id = parseInt($stateParams.id);
		editTaskForce.taskForce= JSON.parse(window.localStorage.getItem("taskForceList"));
		for(var i=0;i<editTaskForce.taskForce.length;i++){
			if(i == editTaskForce.id){
				editTaskForce.bfdwzcgzdyxm = editTaskForce.taskForce[i].bfdwzcgzdyxm;
				editTaskForce.zzmm = editTaskForce.taskForce[i].zzmm;
				editTaskForce.zjhm = editTaskForce.taskForce[i].zjhm;
				editTaskForce.bfdwmc = editTaskForce.taskForce[i].bfdwmc;
				editTaskForce.dwlsgx = editTaskForce.taskForce[i].dwlsgx;
				editTaskForce.lxdh = editTaskForce.taskForce[i].lxdh;
				$("#star_time").val(editTaskForce.taskForce[i].zcsjb)
				$("#end_time").val(editTaskForce.taskForce[i].zcsje)
				editTaskForce.sfdz = editTaskForce.taskForce[i].sfdz;
				editTaskForce.sfdysj = editTaskForce.taskForce[i].sfdysj;
			}
		}
		editTaskForce.save=function(){
				editTaskForce.taskForce[editTaskForce.id].bfdwzcgzdyxm = editTaskForce.bfdwzcgzdyxm,
				editTaskForce.taskForce[editTaskForce.id].zzmm = editTaskForce.zzmm,
				editTaskForce.taskForce[editTaskForce.id].zjhm = editTaskForce.zjhm,
				editTaskForce.taskForce[editTaskForce.id].bfdwmc = editTaskForce.bfdwmc,
				editTaskForce.taskForce[editTaskForce.id].dwlsgx = editTaskForce.dwlsgx,
				editTaskForce.taskForce[editTaskForce.id].lxdh = editTaskForce.lxdh,
				editTaskForce.taskForce[editTaskForce.id].zcsjb = $("#star_time").val(),
				editTaskForce.taskForce[editTaskForce.id].zcsje = $("#end_time").val(),
				editTaskForce.taskForce[editTaskForce.id].sfdz = editTaskForce.sfdz,
				editTaskForce.taskForce[editTaskForce.id].sfdysj = editTaskForce.sfdysj
				window.localStorage.setItem('taskForceList', JSON.stringify(editTaskForce.taskForce))
				window.history.back();
		}
		editTaskForce.deleteBtn=function(){
			for(var i=0,Earr=[];i<editTaskForce.taskForce.length;i++){
				if(i != editTaskForce.id){
					Earr.push(editTaskForce.taskForce[i])
				}
			}
			window.localStorage.setItem('taskForceList', JSON.stringify(Earr))
			window.history.back();
		}
		// 弹窗
		editTaskForce.back=function(){
			editTaskForce.alert = true;
		}
		editTaskForce.confirm=function(){
			editTaskForce.save();
			editTaskForce.alert = false;
		}
		editTaskForce.cancel = function(){
			editTaskForce.alert = false;
			window.history.back();
		}
		// editTaskForce.back=function(){
		// 	fupin.confirm("是否保存为草稿", function() {
		// 		editTaskForce.save();
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
		$scope.editTaskForce = editTaskForce;
	}
]);