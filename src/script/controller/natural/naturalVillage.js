myApp.controller("naturalVillage", ["$scope", "$state", "$http", "$stateParams",
	"postForm",function($scope, $state, $http, $stateParams,postForm) {
		var natural = {} || natural;
		natural.urlParam = $stateParams;
		natural.sendParam = {
			name:"",
			time:"",
			nd:2016,
		};
		natural.list = {};
		natural.page = {
			limit:10,
			start:0,
		};
		
	/*	natural.uploadSource = function() {
			console.log(12123123);
			//根据贫困户id
		}*/
		
//		natural.list=data.natural.results;

		var sunParm=angular.extend({},natural.page,natural.sendParam)
		console.log(config.path.naturalVillage);
		postForm.saveFrm(config.path.naturalVillage,sunParm)
		.success(function(data){
			//console.log(data);
			natural.list=data.results;
			if(natural.list.zrcmc){
				
			}
		}) 
		
	

		
		/*natural.menu=false;
		natural.changeMenu=function(args){
			natural.menu=args;
			console.log(natural.menu);
		}*/

		//调用列表
		//		$state.go('lowFamily.baseInfo'); //默认显示第一个tab
		//根据角色遍历响应的菜单
		$scope.natural = natural;
	}
]);