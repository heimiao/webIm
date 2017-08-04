myApp.controller("queryProjectResult", ["$scope", "$state", "$http", "$stateParams","$timeout","postForm",
	function($scope, $state, $http, $stateParams,$timeout, postForm) {
		var queryProjectResult = {} || queryProjectResult;
		queryProjectResult.urlParam = $stateParams;
		queryProjectResult.sendParam = {};
		queryProjectResult.nd = $stateParams.nd; //年度
		queryProjectResult.start = 0;
		queryProjectResult.list = [];
		queryProjectResult.getData = function(me,num){
			queryProjectResult.data={
				'limit': 10,
				'start': queryProjectResult.start,
				'nd': queryProjectResult.nd
			}
			postForm.saveFrm(config.path.projectList,queryProjectResult.data).success(function(res){
				if(res.success){
					if(res.results){
						queryProjectResult.noDataType = false;
						for(var i=0;i<res.results.length;i++){
							if(res.results[i].pkcxm == "Y"){
								res.results[i].pkcxm = "贫困村项目";	
							}else{
								res.results[i].pkcxm = "";
							}
							if(res.results[i].pkhxm == "N"){
								res.results[i].pkhxm = "贫困户项目";	
							}else{
								res.results[i].pkhxm = "";
							}
						}
						if(num == 1){
							$timeout(function(){
								for(var r=0;r<res.results.length;r++){
									queryProjectResult.list.push(res.results[r]);
								}
			             		// 每次数据加载完，必须重置
			             		me.resetload();
			           		},1000);
						}else{
							queryProjectResult.list = res.results;
						}
						queryProjectResult.start= queryProjectResult.start + res.results.length;
					}else{
						if(num == 1){
							me.resetload();
							queryProjectResult.noDataName = "没有更多了";
							queryProjectResult.noDataType = true;
						}else{
							queryProjectResult.noDataName = "暂无数据";
							queryProjectResult.noDataType = true;
						}
						
 					}
				}
			})
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
				queryProjectResult.getData(me,1);
			}
		})
		queryProjectResult.getData()

		$scope.queryProjectResult = queryProjectResult;
	}
]);