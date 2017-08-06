myApp.controller("projectDraftEdit", ["$scope", "$state", "$http", "$stateParams","postForm",
	function($scope, $state, $http, $stateParams,postForm) {
		var projectDraftEdit = {} || projectDraftEdit;
		projectDraftEdit.urlParam = $stateParams;
		projectDraftEdit.sendParam = {};
		projectDraftEdit.townShip = []; //全部乡镇列表
		projectDraftEdit.villageListAll = []; //获取全部行政村
		projectDraftEdit.sendParam.nd = "2017";
		projectDraftEdit.draftId = $stateParams.draftId;
		projectDraftEdit.eiditId = null; //存之前的编辑id
		window.localStorage.setItem("projectDraftEditDraftId", $stateParams.draftId);
		// // 获取所有乡镇
		// $http.post(config.path.townShip,null).success(function(res){
		// 	projectDraftEdit.townShip = res;
		// 	projectDraftEdit.sendParam.qyxz=res[0].id;
		// 	projectDraftEdit.getVillageList(res[0].id, 1); //获取乡镇对应的行政村
		// })
		$("#projectDraftEdits div").click(function(){
			$(this).toggleClass('selected');
			if($("#xzsjpkc").hasClass('selected')){
				projectDraftEdit.sendParam.pkcxm='Y';
			}else{
				projectDraftEdit.sendParam.pkcxm='N';
			};
			//判断贫困户项目
			if($("#xzsjpkh").hasClass('selected')){
				projectDraftEdit.sendParam.pkhxm='Y';
			}else{
				projectDraftEdit.sendParam.pkhxm='N';
			};
		})
		if(window.localStorage.getItem("projectSituationList") != '' && window.localStorage.getItem("projectSituationList") != null && window.localStorage.getItem("projectSituationList") != undefined && window.localStorage.getItem("projectSituationList") != 'null'){
			projectDraftEdit.sendParam = JSON.parse(window.localStorage.getItem("projectSituationList"));
			projectDraftEdit.getpkclist = JSON.parse(window.localStorage.getItem("projectGetpkclist"));
			projectDraftEdit.getpkclistName = JSON.parse(window.localStorage.getItem("projectGetpkclistName"));
			projectDraftEdit.getPkhlist = JSON.parse(window.localStorage.getItem("projectGetpkhlist"));
			projectDraftEdit.getPkhlistName = JSON.parse(window.localStorage.getItem("projectGetpkhlistName"));
			projectDraftEdit.eiditId = window.localStorage.getItem("projectSituationListId");
			if(projectDraftEdit.sendParam.pkcxm == 'Y'){
				$("#xzsjpkc").addClass('selected')
			}else{
				$("#xzsjpkc").removeClass('selected')
			}
			if(projectDraftEdit.sendParam.pkhxm == 'Y'){
				$("#xzsjpkh").addClass('selected')
			}else{
				$("#xzsjpkh").removeClass('selected')
			}
		}
		$("#tab div").click(function(){
			$(this).addClass('bg').siblings().removeClass('bg');
			$("#"+$(this).attr('data-type')).show().siblings().hide();
			if($(this).attr("data-type") == "development" || $(this).attr("data-type") == "sjpkh"){
				window.localStorage.setItem("projectSituationList", JSON.stringify(projectDraftEdit.sendParam));
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
		projectDraftEdit.getVillageList= function(id, num){
			$http.post(config.path.villageAll+"&fid="+id,null).success(function(res){
				projectDraftEdit.sendParam.qyxzc = res[0].id;
				projectDraftEdit.villageListAll = res;
			})
		}
		// 乡镇变化行政村跟随变化
		projectDraftEdit.changeTown=function(){
			projectDraftEdit.getVillageList(projectDraftEdit.sendParam.qyxz, 1); //获取乡镇对应的行政村
		}

		// 获取所有乡镇
		$http.post(config.path.townShip,null).success(function(res){
			projectDraftEdit.townShip = res;
			// 获取所有行政村
			$http.post(config.path.villageAll,null).success(function(res){
				projectDraftEdit.villageListAll = res;
				//获取项目类型queryZjzdXmlx
				$http.post(config.path.queryZjzdXmlx,null).success(function(res){
					projectDraftEdit.xmleListAll = res;
					//从数据字典获取项目类型的选项
					$http.post(config.path.projectsjzd,null).success(function(res){
						projectDraftEdit.xmleList=res;
						if(window.localStorage.getItem("projectSituationList") != '' && window.localStorage.getItem("projectSituationList") != null && window.localStorage.getItem("projectSituationList") != undefined && window.localStorage.getItem("projectSituationList") != 'null'){
							
						}else{
							projectDraftEdit.getData(); //首页加载列表数据	
						}
						
					})
				})
			})
		})
		projectDraftEdit.getData = function(){
			dt.request({
				rqstName: "relief_project", //'low_family', 'low_village', 'nature_village', 'relief_project'
				type: "selectById", //select,delete,put,selectById,
				param: {
					'index_id': projectDraftEdit.draftId
				},
				success: function(args) {
					projectDraftEdit.sendParam = args.projectSituationList;
					if(args.projectSituationList.id){
						projectDraftEdit.eiditId = args.projectSituationList.id;
						window.localStorage.setItem('projectSituationListId', projectDraftEdit.eiditId);
					}
					if(projectDraftEdit.sendParam.pkcxm == 'Y'){
						$("#xzsjpkc").addClass('selected')
					}else{
						$("#xzsjpkc").removeClass('selected')
					}
					if(projectDraftEdit.sendParam.pkhxm == 'Y'){
						$("#xzsjpkh").addClass('selected')
					}else{
						$("#xzsjpkh").removeClass('selected')
					}
					projectDraftEdit.getpkclist = args.pkclist;
					projectDraftEdit.getpkclistName = args.pkclistName;
					projectDraftEdit.getPkhlist = args.pkhlist;
					projectDraftEdit.getPkhlistName = args.pkhlistName;
					window.localStorage.setItem('projectGetpkhlist', JSON.stringify(projectDraftEdit.getPkhlist))
					window.localStorage.setItem('projectGetpkhlistName', JSON.stringify(projectDraftEdit.getPkhlistName))
					window.localStorage.setItem('projectGetpkclist', JSON.stringify(projectDraftEdit.getpkclist))
					window.localStorage.setItem('projectGetpkclistName', JSON.stringify(projectDraftEdit.getpkclistName))
					$scope.$apply();
				},
				error: function(args) {

				}
			});
		}


		//添加扶贫项目
		projectDraftEdit.tianjia=function(){
			if(!projectDraftEdit.sendParam.xmmc){
				fupin.alert("请完善基本情况中的信息")
				return;
			}
			if(projectDraftEdit.sendParam.pkcxm == 'N' && projectDraftEdit.sendParam.pkhxm == 'N'){
				fupin.alert("请完善基本情况中的信息")
				return;
			}
			projectDraftEdit.addAll();
			delete projectDraftEdit.addProjectSituationList.exproperty;
			if(projectDraftEdit.eiditId){
				postForm.saveFrm(config.path.updateProject, projectDraftEdit.addProjectSituationList).success(function(res){
					projectDraftEdit.xmxxId = res.results.id;

					postForm.saveFrm(config.path.updatePkc, {"data": JSON.stringify(projectDraftEdit.addpkclist), "xmxxid": projectDraftEdit.xmxxId}).success(function(res){
						postForm.saveFrm(config.path.updatePkh, {"data": JSON.stringify(projectDraftEdit.addpkhlist), "xmxxid": projectDraftEdit.xmxxId}).success(function(res){
							dt.request({
								rqstName: "relief_project", //'low_family', 'low_village', 'nature_village', 'relief_project'
								type: "delete", //select,delete,put,selectById,
								param: {
									'index_id': parseInt(window.localStorage.getItem("projectDraftEditDraftId"))
								},
								success: function(args) {
									window.history.back()
								},
								'error': function(args) {

								}
							});
						})
					})
					
				}).error(function(){
					//保存草稿
					dt.request({
						rqstName: "relief_project", //'low_family', 'low_village', 'nature_village', 'relief_project'
						type: "put", //select,delete,put,selectById,
						data: {
							'index_id': parseInt(window.localStorage.getItem("projectDraftEditDraftId")),
							'projectSituationList': projectDraftEdit.addProjectSituationList,
							'pkclist': JSON.parse(window.localStorage.getItem("projectGetpkclist")),
							'pkhlist': JSON.parse(window.localStorage.getItem("projectGetpkhlist")),
							'pkclistName': JSON.parse(window.localStorage.getItem("projectGetpkclistName")),
							'pkhlistName': JSON.parse(window.localStorage.getItem("projectGetpkhlistName")),
						},
						success: function(args) {
							window.history.back()
						},
						'error': function(args) {

						}
					});
				})
			}else{
				postForm.saveFrm(config.path.projectAdda, projectDraftEdit.addProjectSituationList).success(function(res){
					projectDraftEdit.xmxxId = res.results.id;

					postForm.saveFrm(config.path.projectaddsjpkca, {"data": JSON.stringify(projectDraftEdit.addpkclist), "xmxxid": projectDraftEdit.xmxxId}).success(function(res){
						postForm.saveFrm(config.path.projectaddsjpkha, {"data": JSON.stringify(projectDraftEdit.addpkhlist), "xmxxid": projectDraftEdit.xmxxId}).success(function(res){
							dt.request({
								rqstName: "relief_project", //'low_family', 'low_village', 'nature_village', 'relief_project'
								type: "delete", //select,delete,put,selectById,
								param: {
									'index_id': parseInt(window.localStorage.getItem("projectDraftEditDraftId"))
								},
								success: function(args) {
									window.history.back()
								},
								'error': function(args) {

								}
							});
						})
					})
					
				}).error(function(){
					//保存草稿
					dt.request({
						rqstName: "relief_project", //'low_family', 'low_village', 'nature_village', 'relief_project'
						type: "put", //select,delete,put,selectById,
						data: {
							'index_id': parseInt(window.localStorage.getItem("projectDraftEditDraftId")),
							'projectSituationList': projectDraftEdit.addProjectSituationList,
							'pkclist': JSON.parse(window.localStorage.getItem("projectGetpkclist")),
							'pkhlist': JSON.parse(window.localStorage.getItem("projectGetpkhlist")),
							'pkclistName': JSON.parse(window.localStorage.getItem("projectGetpkclistName")),
							'pkhlistName': JSON.parse(window.localStorage.getItem("projectGetpkhlistName")),
						},
						success: function(args) {
							window.history.back();
						},
						'error': function(args) {

						}
					});
				})
			}
		}
		projectDraftEdit.addAll=function(){
			projectDraftEdit.addProjectSituationList = projectDraftEdit.sendParam;
			projectDraftEdit.addpkclist = JSON.parse(window.localStorage.getItem("projectGetpkclist"));
			projectDraftEdit.addpkhlist = JSON.parse(window.localStorage.getItem("projectGetpkhlist"));
		}
		projectDraftEdit.back = function(){
			projectDraftEdit.addAll();
			fupin.confirm("是否保存为草稿", function() {
				//保存草稿
				dt.request({
					rqstName: "relief_project", //'low_family', 'low_village', 'nature_village', 'relief_project'
					type: "put", //select,delete,put,selectById,
					data: {
						'index_id': parseInt(window.localStorage.getItem("projectDraftEditDraftId")),
						'projectSituationList': projectDraftEdit.addProjectSituationList,
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
		
		

		/*lowFamilyInfo.menu=false;
		lowFamilyInfo.changeMenu=function(args){
			lowFamilyInfo.menu=args;
			console.log(lowFamilyInfo.menu);
		}*/

		//调用列表
		//		$state.go('lowFamily.baseInfo'); //默认显示第一个tab
		//根据角色遍历响应的菜单
		$scope.projectDraftEdit = projectDraftEdit;
	}
]);