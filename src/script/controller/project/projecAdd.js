myApp.controller("projectAdd", ["$scope", "$state", "$http", "$stateParams","postForm",
	function($scope, $state, $http, $stateParams,postForm) {
		var projectAdd = {} || projectAdd;
		projectAdd.urlParam = $stateParams;
		projectAdd.sendParam = {};
		projectAdd.townShip = []; //全部乡镇列表
		projectAdd.villageListAll = []; //获取全部行政村 
		projectAdd.sendParam.nd = "2017";
		projectAdd.sendParam.pkcxm='Y';
		projectAdd.sendParam.pkcxm='N';
		// 获取所有乡镇
		$http.post(config.path.townShip,null).success(function(res){
			projectAdd.townShip = res;
			projectAdd.sendParam.qyxz=res[0].id;
			projectAdd.getVillageList(res[0].id, 1); //获取乡镇对应的行政村
		})
		// 获取所有行政村
		projectAdd.getVillageList= function(id, num){
			$http.post(config.path.villageAll+"&fid="+id,null).success(function(res){
				projectAdd.sendParam.qyxzc = res[0].id;
				projectAdd.villageListAll = res;
			})
		}
		// 乡镇变化行政村跟随变化
		projectAdd.changeTown=function(){
			projectAdd.getVillageList(projectAdd.sendParam.qyxz, 1); //获取乡镇对应的行政村
		}
		//从数据字典获取项目类型的选项
		$http.post(config.path.projectsjzd,null).success(function(res){
			projectAdd.xmleList=res;
			projectAdd.sendParam.xmlx=projectAdd.xmleList[0].id; //默认选中第一个
		})
		$("#tab div").click(function(){
			$(this).addClass('bg').siblings().removeClass('bg');
			$("#"+$(this).attr('data-type')).show().siblings().hide();
			if($(this).attr("data-type") == "development" || $(this).attr("data-type") == "sjpkh"){
				window.localStorage.setItem("projectSituationList", JSON.stringify(projectAdd.sendParam));
			}
		})
		$(".projectss div").click(function(){
			$(this).toggleClass('selected');
			if($("#xzsjpkc").hasClass('selected')){
				projectAdd.sendParam.pkcxm='Y';
			}else{
				projectAdd.sendParam.pkcxm='N';
			};
			//判断贫困户项目
			if($("#xzsjpkh").hasClass('selected')){
				projectAdd.sendParam.pkhxm='Y';
			}else{
				projectAdd.sendParam.pkhxm='N';
			};
		})
		if(window.localStorage.getItem("projectSituationList") != '' && window.localStorage.getItem("projectSituationList") != null && window.localStorage.getItem("projectSituationList") != undefined && window.localStorage.getItem("projectSituationList") != 'null'){
			projectAdd.sendParam = JSON.parse(window.localStorage.getItem("projectSituationList"));
			projectAdd.getpkclist = JSON.parse(window.localStorage.getItem("projectGetpkclist"));
			projectAdd.getpkclistName = JSON.parse(window.localStorage.getItem("projectGetpkclistName"));
			projectAdd.getPkhlist = JSON.parse(window.localStorage.getItem("projectGetpkhlist"));
			projectAdd.getPkhlistName = JSON.parse(window.localStorage.getItem("projectGetpkhlistName"));
		}
		if(window.localStorage.getItem("projectType") == "1"){
			$('.tab2').addClass('bg').siblings().removeClass('bg');
			$("#"+$('.tab2').attr('data-type')).show().siblings().hide();
		}else if(window.localStorage.getItem("projectType") == "2"){
			$('.tab3').addClass('bg').siblings().removeClass('bg');
			$("#"+$('.tab3').attr('data-type')).show().siblings().hide();
		}

		//添加扶贫项目
		projectAdd.tianjia=function(){
			projectAdd.addAll();
			postForm.saveFrm(config.path.projectAdda, projectAdd.addProjectSituationList).success(function(res){
				projectAdd.xmxxId = res.results.id;
				postForm.saveFrm(config.path.projectaddsjpkca, {"data": projectAdd.addpkclist, "xmxxid": projectAdd.xmxxId}).success(function(res){
					
				})
				postForm.saveFrm(config.path.projectaddsjpkha, {"data": projectAdd.addpkhlist, "xmxxid": projectAdd.xmxxId}).success(function(res){

				})
			}).error(function(){
				//保存草稿
			})
		}
		projectAdd.addAll=function(){
			projectAdd.addProjectSituationList = projectAdd.sendParam;
			projectAdd.addpkclist = JSON.parse(window.localStorage.getItem("projectGetpkclist"));
			projectAdd.addpkhlist = JSON.parse(window.localStorage.getItem("projectGetpkhlist"));
		}

		/*lowFamilyInfo.menu=false;
		lowFamilyInfo.changeMenu=function(args){
			lowFamilyInfo.menu=args;
			console.log(lowFamilyInfo.menu);
		}*/

		//调用列表
		//		$state.go('lowFamily.baseInfo'); //默认显示第一个tab
		//根据角色遍历响应的菜单
		$scope.projectAdd = projectAdd;
	}
]);