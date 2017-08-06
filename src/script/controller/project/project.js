myApp.controller("project", ["$scope", "$state", "$http", "$stateParams","postForm","$timeout",
	function($scope, $state, $http, $stateParams,postForm,$timeout) {
		var project = {} || project;
		project.urlParam = $stateParams;
		project.sendParam = {};
		project.sendParam.time=null;
		project.list = {};
		project.start = 0; //请求的条数

		// 清除数据
		window.localStorage.removeItem("projectSituationList");
		window.localStorage.removeItem("projectGetpkclist");
		window.localStorage.removeItem("projectGetpkhlist");
		window.localStorage.removeItem("projectType");
		window.localStorage.removeItem("projectGetpkclistName");
		window.localStorage.removeItem("projectGetpkhlistName");
		//获取项目采集列表 
		project.getxmcj=function(me,num){
			project.canshu = {
				name:"",
				time:"",
				nd:project.sendParam.time,
				xmjzqk:'',
				xmlx:''
			};
			
			project.page = {
				limit:10,
				start:project.start
			};
			var sunParm=angular.extend({},project.canshu,project.page)
			postForm.saveFrm(config.path.projectList,sunParm)
			.success(function(res){
				if(num == 1){
					$timeout(function(){
						for(var r=0;r<res.results.length;r++){
							project.list.push(res.results[r]);
						}
	             		// 每次数据加载完，必须重置
	             		me.resetload();
	           		},1000);
				}else{
					project.list=res.results;
				}
				project.start= project.start + res.results.length;
			});

		};
		

		project.getxmcj();

		// 选择时间
		project.chooseTime=function(text) {
			$("#time .name").html(text)
			$(".timeList").slideUp(200)
			$("#time").removeClass("township2")
			$("#time .name").removeClass("col-ea3c4c")
			project.queryBtn();
		}
		project.chooseTownship=function(text) {
			$("#township .name").html(text)
			$(".townshipList").slideUp(200)
			$("#township").removeClass("township2")
			$("#township .name").removeClass("col-ea3c4c")
			project.queryBtn();
		}
		project.queryBtn=function(){
			project.start = 0;
			project.getxmcj();
		}

		// 上拉加载
		var dropload = $('.droploadTable').dropload({
			//获取列表
			domDown: {
				domClass: 'dropload-down',
				domRefresh: '<div class="dropload-refresh"></div>',
				domUpdate: '<div class="dropload-update">↓释放加载</div>',
				domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
			},				
			//上拉加载
			loadDownFn: function(me) {
				project.getxmcj(me,1);
			}
		})
		$scope.project = project;
	}
]);