myApp.controller("projectEdit", ["$scope", "$state", "$http", "$stateParams","postForm",
	function($scope, $state, $http, $stateParams,postForm) {
		var projectEdit = {} || projectEdit;
		projectEdit.urlParam = $stateParams;
		projectEdit.sendParam = {};
		projectEdit.townShip = []; //全部乡镇列表
		projectEdit.villageListAll = []; //获取全部行政村
		projectEdit.sendParam.nd = "2017";
		projectEdit.sendParam.detailId = $stateParams.detailId;
		// // 获取所有乡镇
		// $http.post(config.path.townShip,null).success(function(res){
		// 	projectEdit.townShip = res;
		// 	projectEdit.sendParam.qyxz=res[0].id;
		// 	projectEdit.getVillageList(res[0].id, 1); //获取乡镇对应的行政村
		// })
		$("#projectEdits div").click(function(){
			$(this).toggleClass('selected');
			if($("#xzsjpkc").hasClass('selected')){
				projectEdit.sendParam.pkcxm='Y';
			}else{
				projectEdit.sendParam.pkcxm='N';
			};
			//判断贫困户项目
			if($("#xzsjpkh").hasClass('selected')){
				projectEdit.sendParam.pkhxm='Y';
			}else{
				projectEdit.sendParam.pkhxm='N';
			};
		})
		if(window.localStorage.getItem("projectSituationList") != '' && window.localStorage.getItem("projectSituationList") != null && window.localStorage.getItem("projectSituationList") != undefined && window.localStorage.getItem("projectSituationList") != 'null'){
			projectEdit.sendParam = JSON.parse(window.localStorage.getItem("projectSituationList"));
			projectEdit.getpkclist = JSON.parse(window.localStorage.getItem("projectGetpkclist"));
			projectEdit.getpkclistName = JSON.parse(window.localStorage.getItem("projectGetpkclistName"));
			projectEdit.getPkhlist = JSON.parse(window.localStorage.getItem("projectGetpkhlist"));
			projectEdit.getPkhlistName = JSON.parse(window.localStorage.getItem("projectGetpkhlistName"));
			if(projectEdit.sendParam.pkcxm == 'Y'){
				$("#xzsjpkc").addClass('selected')
			}else{
				$("#xzsjpkc").removeClass('selected')
			}
			if(projectEdit.sendParam.pkhxm == 'Y'){
				$("#xzsjpkh").addClass('selected')
			}else{
				$("#xzsjpkh").removeClass('selected')
			}
		}
		$("#tab div").click(function(){
			$(this).addClass('bg').siblings().removeClass('bg');
			$("#"+$(this).attr('data-type')).show().siblings().hide();
			if($(this).attr("data-type") == "development" || $(this).attr("data-type") == "sjpkh"){
				window.localStorage.setItem("projectSituationList", JSON.stringify(projectEdit.sendParam));
			}
		});
		if(window.localStorage.getItem("projectType") == "1"){
			$('.tab2').addClass('bg').siblings().removeClass('bg');
			$("#"+$('.tab2').attr('data-type')).show().siblings().hide();
		}else if(window.localStorage.getItem("projectType") == "2"){
			$('.tab3').addClass('bg').siblings().removeClass('bg');
			$("#"+$('.tab3').attr('data-type')).show().siblings().hide();
		}
		// 获取所有行政村
		projectEdit.getVillageList= function(id, num){
			$http.post(config.path.villageAll+"&fid="+id,null).success(function(res){
				projectEdit.sendParam.qyxzc = res[0].id;
				projectEdit.villageListAll = res;
			})
		}
		// 乡镇变化行政村跟随变化
		projectEdit.changeTown=function(){
			projectEdit.getVillageList(projectEdit.sendParam.qyxz, 1); //获取乡镇对应的行政村
		}

		// 获取所有乡镇
		$http.post(config.path.townShip,null).success(function(res){
			projectEdit.townShip = res;
			// 获取所有行政村
			$http.post(config.path.villageAll,null).success(function(res){
				projectEdit.villageListAll = res;
				//获取项目类型queryZjzdXmlx
				$http.post(config.path.queryZjzdXmlx,null).success(function(res){
					projectEdit.xmleListAll = res;
					//从数据字典获取项目类型的选项
					$http.post(config.path.projectsjzd,null).success(function(res){
						projectEdit.xmleList=res;
						if(window.localStorage.getItem("projectSituationList") != '' && window.localStorage.getItem("projectSituationList") != null && window.localStorage.getItem("projectSituationList") != undefined && window.localStorage.getItem("projectSituationList") != 'null'){
							
						}else{
							projectEdit.getData(); //首页加载列表数据	
						}
						
					})
				})
			})
		})
		projectEdit.getData = function(){
			$http.post(config.path.queryXmxxDetail+"?id="+projectEdit.sendParam.detailId,null).success(function(res){
				projectEdit.sendParam = res;
				if(projectEdit.sendParam.pkcxm == 'Y'){
					$("#xzsjpkc").addClass('selected')
				}else{
					$("#xzsjpkc").removeClass('selected')
				}
				if(projectEdit.sendParam.pkhxm == 'Y'){
					$("#xzsjpkh").addClass('selected')
				}else{
					$("#xzsjpkh").removeClass('selected')
				}
			})
			$http.post(config.path.queryXmxxpkh+"?xmxxid="+projectEdit.sendParam.detailId,null).success(function(res){
				projectEdit.getPkhlist = res;
				for(var r=0;r<res.length;r++){
					for(var i=0;i<projectEdit.townShip.length;i++){
						if(res[r].qyxz == projectEdit.townShip[i].id){
							res[r].qyxzName = projectEdit.townShip[i].name
						}
					}
					for(var i=0;i<projectEdit.villageListAll.length;i++){
						if(res[r].qyxzc == projectEdit.villageListAll[i].id){
							res[r].qyxzcName = projectEdit.villageListAll[i].name
						}
					}
				}
				projectEdit.getPkhlistName = res;
				window.localStorage.setItem('projectGetpkhlist', JSON.stringify(projectEdit.getPkhlist))
				window.localStorage.setItem('projectGetpkhlistName', JSON.stringify(projectEdit.getPkhlistName))
			})
			$http.post(config.path.queryXmxxpkc+"?xmxxid="+projectEdit.sendParam.detailId,null).success(function(res){
				projectEdit.getpkclist = res;
				for(var r=0;r<res.length;r++){
					for(var i=0;i<projectEdit.townShip.length;i++){
						if(res[r].qyxz == projectEdit.townShip[i].id){
							res[r].qyxzName = projectEdit.townShip[i].name
						}
					}
					for(var i=0;i<projectEdit.villageListAll.length;i++){
						if(res[r].qyxzc == projectEdit.villageListAll[i].id){
							res[r].qyxzcName = projectEdit.villageListAll[i].name
						}
					}
				}
				projectEdit.getpkclistName = res;
				window.localStorage.setItem('projectGetpkclist', JSON.stringify(projectEdit.getpkclist))
				window.localStorage.setItem('projectGetpkclistName', JSON.stringify(projectEdit.getpkclistName))
			})
		}


		//添加扶贫项目
		projectEdit.tianjia=function(){
			if(!projectEdit.sendParam.xmmc){
				fupin.alert("请完善基本情况中的信息")
				return;
			}
			projectEdit.addAll();
			delete projectEdit.addProjectSituationList.exproperty;
			postForm.saveFrm(config.path.updateProject, projectEdit.addProjectSituationList).success(function(res){
				projectEdit.xmxxId = res.results.id;

				postForm.saveFrm(config.path.updatePkc, {"data": JSON.stringify(projectEdit.addpkclist), "xmxxid": projectEdit.xmxxId}).success(function(res){
					postForm.saveFrm(config.path.updatePkh, {"data": JSON.stringify(projectEdit.addpkhlist), "xmxxid": projectEdit.xmxxId}).success(function(res){
						window.history.back();
					})
				})
				
			}).error(function(){
				//保存草稿
				dt.request({
					rqstName: "relief_project", //'low_family', 'low_village', 'nature_village', 'relief_project'
					type: "put", //select,delete,put,selectById,
					data: {
						'projectSituationList': projectEdit.addProjectSituationList,
						'pkclist': JSON.parse(window.localStorage.getItem("projectGetpkclist")),
						'pkhlist': JSON.parse(window.localStorage.getItem("projectGetpkhlist")),
						'pkclistName': JSON.parse(window.localStorage.getItem("projectGetpkclistName")),
						'pkhlistName': JSON.parse(window.localStorage.getItem("projectGetpkhlistName")),
					},
					success: function(args) {
						// console.log(args);
						window.history.back();
					},
					'error': function(args) {

					}
				});
			})
		}
		projectEdit.addAll=function(){
			projectEdit.addProjectSituationList = projectEdit.sendParam;
			projectEdit.addpkclist = JSON.parse(window.localStorage.getItem("projectGetpkclist"));
			projectEdit.addpkhlist = JSON.parse(window.localStorage.getItem("projectGetpkhlist"));
		}
		projectEdit.back = function(){
			projectEdit.addAll();
			fupin.confirm("是否保存为草稿", function() {
				//保存草稿
				dt.request({
					rqstName: "relief_project", //'low_family', 'low_village', 'nature_village', 'relief_project'
					type: "put", //select,delete,put,selectById,
					data: {
						'projectSituationList': projectEdit.addProjectSituationList,
						'pkclist': JSON.parse(window.localStorage.getItem("projectGetpkclist")),
						'pkhlist': JSON.parse(window.localStorage.getItem("projectGetpkhlist")),
						'pkclistName': JSON.parse(window.localStorage.getItem("projectGetpkclistName")),
						'pkhlistName': JSON.parse(window.localStorage.getItem("projectGetpkhlistName")),
					},
					success: function(args) {
						// console.log(args);
						window.history.back()
					},
					'error': function(args) {
						window.history.back()
					}
				});
			}, function() {
				window.history.back()
			});
		}

		

		
		//调用列表
		//		$state.go('lowFamily.baseInfo'); //默认显示第一个tab
		//根据角色遍历响应的菜单
		$scope.projectEdit = projectEdit;
	}
]);