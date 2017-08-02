myApp.controller("naturalEdite", ["$scope", "$state", "$http", "$stateParams",
	"postForm",function($scope, $state, $http, $stateParams,postForm) {
		var zrcDetails = {} || zrcDetails;
		zrcDetails.urlParam = $stateParams;
		zrcDetails.sendParam = {
			id:$stateParams.id,
		};
		alert($stateParams.id)
		zrcDetails.list = {};
		console.log(zrcDetails.sendParam);
		postForm.saveFrm(config.path.zrcDetails,zrcDetails.sendParam)
		.success(function(res){
			//zrcDetails.list=res.results;
		}) 
//		$http.post(config.path.zrcDetails,zrcDetails.sendParam).success(function(res){
//			alert('123')
//		})
		
	

		
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