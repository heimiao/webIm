myApp.controller("naturalEdite123", ["$scope", "$state", "$http", "$stateParams",
	"postForm",function($scope, $state, $http, $stateParams,postForm) {
		var zrcDetails = {} || zrcDetails;
		zrcDetails.urlParam = $stateParams;
		zrcDetails.sendParam = {};
		//获取详情的id 显示详情的内容 
		zrcDetails.canshu = {
			id:$stateParams.id,
		}; 
		zrcDetails.list = {};
		console.log(zrcDetails.sendParam);
		$http.post(config.path.zrcDetails+"?id="+zrcDetails.canshu.id)
		.success(function(res){
			console.log(res);
			zrcDetails.list=res;
			console.log(zrcDetails.list.fzr);
		});

		/*postForm.saveFrm(config.path.zrcDetails+"?id="+zrcDetails.sendParam.id,{})
		.success(function(res){
			//zrcDetails.list=res.results;
		}) */ 

		
		


		
	

		
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