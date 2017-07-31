myApp.controller("low_family_baseCtro", ["$scope", "$rootScope", "$state", "$http", "$stateParams",
	function($scope, $rootScope, $state, $http, $stateParams) {
		var low_family_baseInfo = {} || low_family_baseInfo;
		low_family_baseInfo.urlParam = $stateParams;
		low_family_baseInfo.sendParam = {};

		low_family_baseInfo.formInfo = {};

		if(low_family_baseInfo.urlParam.id) {
			//
			//			console.log($state);
		}

		$scope.goback = function() {
			//调用本地数据库保存
			if(confirm("确定保存为草稿吗？")) {
				//如果表单没变化则不提示保存草稿
				dt.request({
					rqstName: "low_family", //'low_family', 'low_village', 'nature_village', 'relief_project'
					type: "put", //select,delete,put,selectById,
					data: {
						baseInfo: low_family_baseInfo.formInfo
					},
					success: function(args) {
						console.log(args);
					},
					'error': function(args) {}
				});
			}
		}
			
		$rootScope.$on('$routeChangeSuccess', function() {})
		/*$scope.$watch('$viewContentLoading', function(event, viewConfig) {
			//			alert('模板加载完成前');
		});*/
		//根据角色遍历响应的菜单
		$scope.low_family_baseInfo = low_family_baseInfo;
	}
]);