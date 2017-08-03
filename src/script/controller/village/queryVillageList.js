myApp.controller("queryVillageList", ["$scope", "$state", "$http", "$stateParams","$timeout","postForm",
	function($scope, $state, $http, $stateParams,$timeout, postForm) {
		var queryVillageList = {} || queryVillageList;
		queryVillageList.urlParam = $stateParams;
		queryVillageList.sendParam = {};
		queryVillageList.nd = $stateParams.nd;
		queryVillageList.qyxz = $stateParams.qyxz;
		queryVillageList.qyxzc = $stateParams.qyxzc; 
		queryVillageList.townShip = [];
		queryVillageList.villageListAll = [];
		queryVillageList.start = 0;
		queryVillageList.list = [];
		// 获取所有乡镇
		$http.post(config.path.townShip,null).success(function(res){
			queryVillageList.townShip = res;
			// 获取所有行政村
			$http.post(config.path.villageAll,null).success(function(res){
				queryVillageList.villageListAll = res;
				queryVillageList.start = 0;
				queryVillageList.getList(); //首页加载列表数据
			})
		})
		queryVillageList.getList= function(me, num){
			queryVillageList.data={
				'limit': 10,
				'start': queryVillageList.start,
				'nd': queryVillageList.nd,
				'qyxzc': queryVillageList.qyxzc,
				'qyxz':  queryVillageList.qyxz

			}
			postForm.saveFrm(config.path.villageList,queryVillageList.data).success(function(res){
				if(res.success){
					if(res.results){
						queryVillageList.noDataType = false;
						for(var r=0;r<res.results.length;r++){
							res.results[r].pkcsx = res.results[r].pkcsx == "01"?"贫困村":res.results[r].pkcsx == "02"?"十二五贫困村":res.results[r].pkcsx == "03"?"十三五贫困村":res.results[r].pkcsx == "04"?"非贫困村":"无";
							for(var i=0;i<queryVillageList.townShip.length;i++){
								if(res.results[r].qyxz == queryVillageList.townShip[i].id){
									res.results[r].qyxz = queryVillageList.townShip[i].name
								}
							}
							for(var i=0;i<queryVillageList.villageListAll.length;i++){
								if(res.results[r].qyxzc == queryVillageList.villageListAll[i].id){
									res.results[r].qyxzc = queryVillageList.villageListAll[i].name
								}
							}
						}
						if(num == 1){
							$timeout(function(){
								for(var r=0;r<res.results.length;r++){
									queryVillageList.list.push(res.results[r]);
								}
			             		// 每次数据加载完，必须重置
			             		me.resetload();
			           		},1000);
						}else{
							queryVillageList.list = res.results;
						}
						queryVillageList.start= queryVillageList.start + res.results.length;
					}else{
						if(num == 1){
							me.resetload();
							queryVillageList.noDataName = "没有更多了";
							queryVillageList.noDataType = true;
						}else{
							queryVillageList.noDataName = "暂无数据";
							queryVillageList.noDataType = true;
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
				queryVillageList.getList(me,1);
			}
		})


		$scope.queryVillageList = queryVillageList;
	}
]);