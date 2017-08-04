myApp.controller("projectAddxz", ["$scope", "$state", "$http", "$stateParams","postForm",
	function($scope, $state, $http, $stateParams,postForm) {
		var projectAdd = {} || projectAdd;
		projectAdd.urlParam = $stateParams;
		projectAdd.sendParam = {};
		projectAdd.townShip = []; //全部乡镇列表
		projectAdd.villageListAll = []; //获取全部行政村
		projectAdd.xmleList=[];  //项目类型
		projectAdd.id=[];
		//添加扶贫项目
		
		projectAdd.tianjia=function(){

			//判断贫困村项目
					if($("#xzsjpkc").hasClass('selected')){
						projectAdd.sendParam.pkcxm='Y'
					}else{
						projectAdd.sendParam.pkcxm='N'
					};
					//判断贫困户项目
					if($("#xzsjpkh").hasClass('selected')){
						projectAdd.sendParam.pkhxm='Y'
					}else{
						projectAdd.sendParam.pkhxm='N'
					};
			if(projectAdd.sendParam.xmmc==''||projectAdd.sendParam.xmmc==null){
				alert('项目名称不能为空')
			}else{
				postForm.saveFrm(config.path.projectAdda,projectAdd.sendParam)
				.success(function(res){
					 projectAdd.id=res.results.id;
					// alert(projectAdd.id)
				})
			}
		}


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

		// 获取所有行政村
		
			$http.post(config.path.villageAll,null).success(function(res){
				projectAdd.villageListAll = res;
			})
		// 乡镇变化行政村跟随变化
		projectAdd.changeTown=function(){
			projectAdd.getVillageList(projectAdd.sendParam.qyxz, 1); //获取乡镇对应的行政村
		}

		//从数据字典获取项目类型的选项
		projectAdd.getpeojectlx= function(){
			$http.post(config.path.projectsjzd,null).success(function(res){
				console.log(res);
				projectAdd.xmleList=res;
				projectAdd.sendParam.xmlx=projectAdd.xmleList[0].id; //默认选中第一个
			})
		}
		projectAdd.getpeojectlx()

		//获取添加扶贫项目涉及贫困村
		projectAdd.getprojectaddsjpkca= function(){
			$http.post(config.path.getprojectaddsjpkca,projectAdd.id).success(function(res){
				console.log(res);
				projectAdd.getpkclist=res;
				//循环乡镇id赋值
				getxzlist=[];
				getxzc=[];
				getxzlist=fupin.mapArray(projectAdd.getpkclist,projectAdd.townShip,'qyxz','id');
				getxzc=fupin.mapArray(getxzlist,projectAdd.villageListAll,'qyxzc','id');	


				projectAdd.getpkclist=getxzc;
				//alert(getxzc)

			})
		}
		projectAdd.getprojectaddsjpkca()




		projectAdd.uploadSource = function() {
			console.log(12123123);

			//根据贫困户id
		}

		console.log(projectAdd.urlParam);

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