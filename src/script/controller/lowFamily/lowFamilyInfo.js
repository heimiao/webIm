myApp.controller("lowFamilyInfoCtro", ["$scope", "$state", "$http", "$stateParams",
	function($scope, $state, $http, $stateParams) {
		var lowFamilyInfo = {} || lowFamilyInfo;
		lowFamilyInfo.urlParam = $stateParams;
		lowFamilyInfo.sendParam = {};

		lowFamilyInfo.uploadSource = function() {
			console.log(12123123);
			//根据贫困户id
		}

		dt.request({
			rqstName: "low_family", //'low_family', 'low_village', 'nature_village', 'relief_project'
			type: "create", //select,delete,create,update,selectById,
			data: {
//				index_id: 2,
				name: 123,
				age: 34,
				asese: 78
			},
			success: function(args) {
				console.log(args);
			},
			'error': function(args) {
				
			}
		});

		dt.request({
			rqstName: "low_family", //'low_family', 'low_village', 'nature_village', 'relief_project'
			type: "selectById", //select,delete,create,update,selectById,
			param: {index_id:1},
			success: function(args) {
				console.log(args);
			},
			'error': function(args) {

			}
		});
		/*lowFamilyInfo.menu=false;
		lowFamilyInfo.changeMenu=function(args){
			lowFamilyInfo.menu=args;
			console.log(lowFamilyInfo.menu);
		}*/

		//调用列表
		//		$state.go('lowFamily.baseInfo'); //默认显示第一个tab
		//根据角色遍历响应的菜单
		$scope.lowFamilyInfo = lowFamilyInfo;
	}
]);