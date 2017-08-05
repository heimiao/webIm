myApp.controller("project", ["$scope", "$state", "$http", "$stateParams","postForm",
	function($scope, $state, $http, $stateParams,postForm) {
		var project = {} || project;
		project.urlParam = $stateParams;
		project.sendParam = {};
		project.sendParam.time=null;
		project.list = {};


		// 清除数据
		window.localStorage.removeItem("projectSituationList");
		window.localStorage.removeItem("projectGetpkclist");
		window.localStorage.removeItem("projectGetpkhlist");
		window.localStorage.removeItem("projectType");
		window.localStorage.removeItem("projectGetpkclistName");
		window.localStorage.removeItem("projectGetpkhlistName");
		//获取项目采集列表
		project.getxmcj=function(){
			project.canshu = {
				name:"",
				time:"",
				nd:project.sendParam.time,
				xmjzqk:'',
				xmlx:''
			};
			
			project.page = {
				limit:30,
				start:0
			};
			var sunParm=angular.extend({},project.canshu,project.page)
			postForm.saveFrm(config.path.projectList,sunParm)
			.success(function(res){
				console.log(res);
				project.list=res.results;
				
			});

		};
		

		project.getxmcj();




















		project.uploadSource = function() {
			console.log(12123123);

			//根据贫困户id
		}

		console.log(project.urlParam);

		/*lowFamilyInfo.menu=false;
		lowFamilyInfo.changeMenu=function(args){
			lowFamilyInfo.menu=args;
			console.log(lowFamilyInfo.menu);
		}*/

		//调用列表
		//		$state.go('lowFamily.baseInfo'); //默认显示第一个tab
		//根据角色遍历响应的菜单
		$scope.project = project;
	}
]);