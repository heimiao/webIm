myApp.controller("queryNaturalResult", ["$scope", "$state", "$http", "$stateParams","$timeout","postForm",
	function($scope, $state, $http, $stateParams,$timeout, postForm) {
		var queryNaturalResult = {} || queryNaturalResult;
		queryNaturalResult.urlParam = $stateParams;
		queryNaturalResult.sendParam = {};
		queryNaturalResult.nd = $stateParams.nd;
		queryNaturalResult.start = 0;
		queryNaturalResult.list = [];
		// 获取所有行政村
		$http.post(config.path.villageAll,null).success(function(res){
			queryNaturalResult.villageListAll = res;
			$http.post(config.path.xingzhengName+'?lx=03',null).success(function(res){
				queryNaturalResult.naturlListAll = res;
				queryNaturalResult.getData(); //首页加载列表数据
			})
		})
		queryNaturalResult.getData = function(me,num){
			queryNaturalResult.data={
				'limit': 10,
				'start': queryNaturalResult.start,
				'nd': queryNaturalResult.nd
			}
			postForm.saveFrm(config.path.naturalVillage,queryNaturalResult.data).success(function(res){
				if(res.success){
					if(res.results){
						queryNaturalResult.noDataType = false;
						for(var r=0;r<res.results.length;r++){
							for(var i=0;i<queryNaturalResult.villageListAll.length;i++){
								if(res.results[r].lsxzc == queryNaturalResult.villageListAll[i].id){
									res.results[r].lsxzc = queryNaturalResult.villageListAll[i].name
								}
							}
							for(var i=0;i<queryNaturalResult.naturlListAll.length;i++){
								if(res.results[r].zrcmc == queryNaturalResult.naturlListAll[i].id){
									res.results[r].zrcmc = queryNaturalResult.naturlListAll[i].name
								}
							}
						}
						if(num == 1){
							$timeout(function(){
								for(var r=0;r<res.results.length;r++){
									queryNaturalResult.list.push(res.results[r]);
								}
			             		// 每次数据加载完，必须重置
			             		me.resetload();
			           		},1000);
						}else{
							queryNaturalResult.list = res.results;
						}
						queryNaturalResult.start= queryNaturalResult.start + res.results.length;
					}else{
						if(num == 1){
							me.resetload();
							queryNaturalResult.noDataName = "没有更多了";
							queryNaturalResult.noDataType = true;
						}else{
							queryNaturalResult.noDataName = "暂无数据";
							queryNaturalResult.noDataType = true;
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
				queryNaturalResult.getData(me,1);
			}
		})
		$scope.queryNaturalResult = queryNaturalResult;
	}
]);