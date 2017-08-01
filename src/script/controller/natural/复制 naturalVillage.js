myApp.controller("naturalVillage123", ["$scope", "$state", "$http", "$stateParams",
	"postForm",function($scope, $state, $http, $stateParams,postForm) {
		var natural = {} || natural;
		var xingzhengcun={};
		var xingzhengcun={};
		
		xingzhengcun.list = {};
		
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
		
		var sunParm=angular.extend({},natural.page,natural.sendParam)
		console.log(config.path.naturalVillage);
		
			postForm.saveFrm(config.path.naturalVillage,sunParm)
			.success(function(res){
				natural.xingzhengcun();
				console.log(res);
				natural.list=res.results;
				for(var r=0;r<res.results.length;r++){
					for(var i=0;i<xingzhengcun.list.length;i++){
						if(res.results[r].lsxzc == xingzhengcun.list[i].id){
							res.results[r].lsxzc = xingzhengcun.list[i].name;
						}
					}
				}	
			})
		
		
		
		
		
		//获取行政村
		natural.xingzheng = {
			lx:'02',
			fid:"",
			code:'',
			name:'',
			tybz:''
		};
		
		natural.xingzhengcun=function(){
			alert('111')
			var returnData;
			postForm.saveFrm(config.path.xingzhengName,natural.xingzheng)
			.success(function(res){
				returnData=res;
				console.log(returnData)
			}) ;	
		}
		
	
	
	

		
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