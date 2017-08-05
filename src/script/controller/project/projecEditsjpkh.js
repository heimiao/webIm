myApp.controller("projecEditsjpkh", ["$scope", "$state", "$http", "$stateParams",
	function($scope, $state, $http, $stateParams) {
		var projecEditsjpkh = {} || projecEditsjpkh;
		projecEditsjpkh.urlParam = $stateParams;
		projecEditsjpkh.sendParam = {};
		projecEditsjpkh.idx = $stateParams.idx;
		
		window.localStorage.setItem('projectType', '2');
		projecEditsjpkh.projectGetpkhlistName = JSON.parse(window.localStorage.getItem("projectGetpkhlistName"));
		// 获取所有乡镇
		$http.post(config.path.townShip,null).success(function(res){
			projecEditsjpkh.townShip = res;
			// projecEditsjpkh.sendParam.qyxz=res[0].id;
			projecEditsjpkh.projectGetpkhlist = JSON.parse(window.localStorage.getItem("projectGetpkhlist"));
			for(var i=0;i<projecEditsjpkh.projectGetpkhlist.length;i++){
				if(projecEditsjpkh.idx == i){
					projecEditsjpkh.getVillageList(projecEditsjpkh.projectGetpkhlist[i].qyxz); //获取乡镇对应的行政村
					projecEditsjpkh.sendParam = projecEditsjpkh.projectGetpkhlist[i];
				}
			}
		})
		// 获取所有行政村
		projecEditsjpkh.getVillageList= function(id, num){
			$http.post(config.path.villageAll+"&fid="+id,null).success(function(res){
				if(num == 1){
					projecEditsjpkh.sendParam.qyxzc = res[0].id;
				}
				projecEditsjpkh.villageListAll = res;
			})
		}
		// 乡镇变化行政村跟随变化
		projecEditsjpkh.changeTown=function(){
			projecEditsjpkh.getVillageList(projecEditsjpkh.sendParam.qyxz, 1); //获取乡镇对应的行政村
		}
		projecEditsjpkh.saveBtn = function(){
			for(var i=0;i<projecEditsjpkh.townShip.length;i++){
				if(projecEditsjpkh.sendParam.qyxz == projecEditsjpkh.townShip[i].id){
					projecEditsjpkh.qyzcName = projecEditsjpkh.townShip[i].name;
				}
			}
			for(var i=0;i<projecEditsjpkh.villageListAll.length;i++){
				if(projecEditsjpkh.sendParam.qyxzc == projecEditsjpkh.villageListAll[i].id){
					projecEditsjpkh.qyxzcName = projecEditsjpkh.villageListAll[i].name;
				}
			}
			projecEditsjpkh.projectGetpkhlist[projecEditsjpkh.idx].qyxz =  projecEditsjpkh.sendParam.qyxz;
			projecEditsjpkh.projectGetpkhlist[projecEditsjpkh.idx].qyxzc =  projecEditsjpkh.sendParam.qyxzc;
			projecEditsjpkh.projectGetpkhlist[projecEditsjpkh.idx].sfzh =  projecEditsjpkh.sendParam.sfzh;
			projecEditsjpkh.projectGetpkhlist[projecEditsjpkh.idx].syje =  projecEditsjpkh.sendParam.syje;

			projecEditsjpkh.projectGetpkhlistName[projecEditsjpkh.idx].qyxzName =  projecEditsjpkh.qyzcName;
			projecEditsjpkh.projectGetpkhlistName[projecEditsjpkh.idx].qyxzcName =  projecEditsjpkh.qyxzcName;
			projecEditsjpkh.projectGetpkhlistName[projecEditsjpkh.idx].sfzh =  projecEditsjpkh.sendParam.sfzh;
			projecEditsjpkh.projectGetpkhlistName[projecEditsjpkh.idx].syje =  projecEditsjpkh.sendParam.syje;
			

			window.localStorage.setItem('projectGetpkhlist', JSON.stringify(projecEditsjpkh.projectGetpkhlist))
			window.localStorage.setItem('projectGetpkhlistName', JSON.stringify(projecEditsjpkh.projectGetpkhlistName))
			window.history.back() 
		}
		projecEditsjpkh.back = function(){
			fupin.confirm("是否保存为草稿", function() {
				projecEditsjpkh.saveBtn();
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
		$scope.projecEditsjpkh = projecEditsjpkh;
	}
]);