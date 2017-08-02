myApp.controller("low_family_memberCtro", ["$scope", "$rootScope", "$state", "$http", "$stateParams",
	function($scope, $rootScope, $state, $http, $stateParams) {
		var low_family_member = {} || low_family_member;
		low_family_member.urlParam = $stateParams;
		low_family_member.sendParam = {};
		low_family_member.list = {};

		if(low_family_member.urlParam.id) {
			//
			//console.log($state);
		}

		/*$scope.goback = function() {

		}*/

		 

		//根据角色遍历响应的菜单
		$scope.low_family_member = low_family_member;
	}
]);

myApp.controller("addFamilyMemberCtro", ["$scope", "$rootScope", "$state", "$http", "$stateParams",
	function($scope, $rootScope, $state, $http, $stateParams) {
		var add_family_member = {} || add_family_member;
		add_family_member.urlParam = $stateParams;
		add_family_member.sendParam = {};
		add_family_member.formInfo = {};

		if(add_family_member.urlParam.id) {
			//
			//			console.log($state);
		}

		$scope.goback = function() {

		}

		//根据角色遍历响应的菜单
		$scope.add_family_member = add_family_member;
	}
]);