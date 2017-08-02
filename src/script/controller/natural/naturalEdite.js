myApp.controller("naturalEdite", ["$scope", "$state", "$http", "$stateParams",
	"postForm",function($scope, $state, $http, $stateParams,postForm) {
		var zrcDetails = {} || zrcDetails;
		zrcDetails.urlParam = $stateParams;
		zrcDetails.sendParam = {};
		//获取详情的id 显示详情的内容 
		zrcDetails.canshu = {
			id:$stateParams.id,
		}; 
		zrcDetails.list = {};
		$http.post(config.path.zrcDetails+"?id="+zrcDetails.canshu.id)
		.success(function(res){
			console.log(res);
			zrcDetails.list=res;
		});

		//获取行政村
		zrcDetails.xingzhengcun={};
		zrcDetails.xingzhengcun.list = {};
		zrcDetails.xingzheng = {
			lx:'02',
			fid:""
		};
		zrcDetails.xingzhengcun=function(){ 
			postForm.saveFrm(config.path.xingzhengName,zrcDetails.xingzheng)
			.success(function(res){
				zrcDetails.xingzhengcun.list=res;  
				//console.log(JSON.stringify(zrcAdd.sendParam.lsxzc))
			})
		}
		zrcDetails.xingzhengcun();
		

		//获取全部自然村
		zrcDetails.zirancun = {
			lx:'03',
			fid:''
		};
		zrcDetails.zirancun12=function(){
			zrcDetails.zirancun.fid=zrcDetails.list.lsxzc;
			postForm.saveFrm(config.path.xingzhengName,zrcDetails.zirancun)
			.success(function(res){
			 	zrcDetails.zirancun.list=res;
			 	
			})
		}
		//根据行政村关联自然村
		zrcDetails.getzrc=function(){ 
			zrcDetails.zirancun12() 
		}

		//更新数据
		zrcDetails.zrcEdit=function(){
			delete zrcDetails.list.exproperty;
			postForm.saveFrm(config.path.zrcEdit,zrcDetails.list)
			.success(function(res){
				alert('上传成功')
				//console.log(zrcDetails.list.exproperty)
			})
		}

		
	

		
		/*natural.menu=false;
		natural.changeMenu=function(args){
			natural.menu=args;
			console.log(natural.menu);
		}*/

		//调用列表
		//		$state.go('lowFamily.baseInfo'); //默认显示第一个tab
		//根据角色遍历响应的菜单
		$scope.zrcDetails = zrcDetails;
	}
]);