myApp.controller("projectEditsjpkc", ["$scope", "$state", "$http", "$stateParams",
	function($scope, $state, $http, $stateParams) {
		var projectEditsjpkc = {} || projectEditsjpkc;
		projectEditsjpkc.urlParam = $stateParams;
		projectEditsjpkc.sendParam = {};
		projectEditsjpkc.idx = $stateParams.idx;
		window.localStorage.setItem('projectType', '1');
		projectEditsjpkc.projectGetpkclistName = JSON.parse(window.localStorage.getItem("projectGetpkclistName"));
		// 获取所有乡镇
		$http.post(config.path.townShip,null).success(function(res){
			projectEditsjpkc.townShip = res;
			// projectEditsjpkc.sendParam.qyxz=res[0].id;
			projectEditsjpkc.projectGetpkclist = JSON.parse(window.localStorage.getItem("projectGetpkclist"));
			for(var i=0;i<projectEditsjpkc.projectGetpkclist.length;i++){
				if(projectEditsjpkc.idx == i){
					projectEditsjpkc.getVillageList(projectEditsjpkc.projectGetpkclist[i].qyxz); //获取乡镇对应的行政村
					projectEditsjpkc.sendParam = projectEditsjpkc.projectGetpkclist[i];
				}
			}
		})
		// 获取所有行政村
		projectEditsjpkc.getVillageList= function(id, num){
			$http.post(config.path.villageAll+"&fid="+id,null).success(function(res){
				if(num == 1){
					projectEditsjpkc.sendParam.qyxzc = res[0].id;
				}
				projectEditsjpkc.villageListAll = res;
			})
		}
		// 乡镇变化行政村跟随变化
		projectEditsjpkc.changeTown=function(){
			projectEditsjpkc.getVillageList(projectEditsjpkc.sendParam.qyxz, 1); //获取乡镇对应的行政村
		}
		projectEditsjpkc.saveBtn = function(){
			for(var i=0;i<projectEditsjpkc.townShip.length;i++){
				if(projectEditsjpkc.sendParam.qyxz == projectEditsjpkc.townShip[i].id){
					projectEditsjpkc.qyzcName = projectEditsjpkc.townShip[i].name;
				}
			}
			for(var i=0;i<projectEditsjpkc.villageListAll.length;i++){
				if(projectEditsjpkc.sendParam.qyxzc == projectEditsjpkc.villageListAll[i].id){
					projectEditsjpkc.qyxzcName = projectEditsjpkc.villageListAll[i].name;
				}
			}
			projectEditsjpkc.projectGetpkclist[projectEditsjpkc.idx].qyxz =  projectEditsjpkc.sendParam.qyxz;
			projectEditsjpkc.projectGetpkclist[projectEditsjpkc.idx].qyxzc =  projectEditsjpkc.sendParam.qyxzc;
			projectEditsjpkc.projectGetpkclist[projectEditsjpkc.idx].syje =  projectEditsjpkc.sendParam.syje;

			projectEditsjpkc.projectGetpkclistName[projectEditsjpkc.idx].qyxzName =  projectEditsjpkc.qyzcName;
			projectEditsjpkc.projectGetpkclistName[projectEditsjpkc.idx].qyxzcName =  projectEditsjpkc.qyxzcName;
			projectEditsjpkc.projectGetpkclistName[projectEditsjpkc.idx].syje =  projectEditsjpkc.sendParam.syje;
			

			window.localStorage.setItem('projectGetpkclist', JSON.stringify(projectEditsjpkc.projectGetpkclist))
			window.localStorage.setItem('projectGetpkclistName', JSON.stringify(projectEditsjpkc.projectGetpkclistName))
			window.history.back() 
		}
		projectEditsjpkc.back = function(){
			fupin.confirm("是否保存为草稿", function() {
				projectEditsjpkc.saveBtn();
			}, function() {
				window.history.back();
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
		$scope.projectEditsjpkc = projectEditsjpkc;
	}
]);