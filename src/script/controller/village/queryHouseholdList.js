myApp.controller("queryHouseholdList", ["$scope", "$state", "$http", "$stateParams","$timeout","postForm",
	function($scope, $state, $http, $stateParams,$timeout, postForm) {
		var queryHouseholdList = {} || queryHouseholdList;
		queryHouseholdList.urlParam = $stateParams;
		queryHouseholdList.sendParam = {};
		queryHouseholdList.hzxm = $stateParams.hzxm;
		queryHouseholdList.hzsfz = $stateParams.hzsfz;
		queryHouseholdList.nd = $stateParams.nd;
		queryHouseholdList.qyxz = $stateParams.qyxz;
		queryHouseholdList.qyxzc = $stateParams.qyxzc; 
		queryHouseholdList.sjzt = $stateParams.sjzt; 
		queryHouseholdList.tpqk = $stateParams.tpqk;
		queryHouseholdList.start = 0;
		queryHouseholdList.poorList =[];
		queryHouseholdList.townShip = []; //全部乡镇列表
		queryHouseholdList.villageListAll = []; //获取全部行政村
		queryHouseholdList.noDataType = false;
		queryHouseholdList.noDataName = null;
		// 获取所有乡镇
		$http.post(config.path.townShip,null).success(function(res){
			queryHouseholdList.townShip = res;
			// 获取所有行政村
			$http.post(config.path.villageAll,null).success(function(res){
				queryHouseholdList.villageListAll = res;
				queryHouseholdList.start = 0;
				queryHouseholdList.getList(); //首页加载列表数据
			})
		})
		queryHouseholdList.getList= function(me, num){
			queryHouseholdList.data={
				'limit': 10,
				'start': queryHouseholdList.start,
				'nd': queryHouseholdList.nd,
				'tpqk': queryHouseholdList.tpqk,
				'qyxzc': queryHouseholdList.qyxzc,
				'hzxm': queryHouseholdList.hzxm,
				'hzsfz': queryHouseholdList.hzsfz,
				'sjzt': queryHouseholdList.sjzt,
				'qyxz':  queryHouseholdList.qyxz

			}
			postForm.saveFrm(config.path.lowFamilyList,queryHouseholdList.data).success(function(res){
				if(res.success){
					if(res.results){
						queryHouseholdList.noDataType = false;
						for(var r=0;r<res.results.length;r++){
							res.results[r].pkcsx = res.results[r].pkcsx == "01"?"贫困村":res.results[r].pkcsx == "02"?"十二五贫困村":res.results[r].pkcsx == "03"?"十三五贫困村":res.results[r].pkcsx == "04"?"非贫困村":"无";
							for(var i=0;i<queryHouseholdList.townShip.length;i++){
								if(res.results[r].qyxz == queryHouseholdList.townShip[i].id){
									res.results[r].qyxz = queryHouseholdList.townShip[i].name
								}
							}
							for(var i=0;i<queryHouseholdList.villageListAll.length;i++){
								if(res.results[r].qyxzc == queryHouseholdList.villageListAll[i].id){
									res.results[r].qyxzc = queryHouseholdList.villageListAll[i].name
								}
							}
						}
						if(num == 1){
							$timeout(function(){
								for(var r=0;r<res.results.length;r++){
									queryHouseholdList.poorList.push(res.results[r]);
								}
			             		// 每次数据加载完，必须重置
			             		me.resetload();
			           		},1000);
						}else{
							queryHouseholdList.poorList = res.results;
						}
						queryHouseholdList.start= queryHouseholdList.start + res.results.length;
					}else{
						if(num == 1){
							me.resetload();
							queryHouseholdList.noDataName = "没有更多了";
							queryHouseholdList.noDataType = true;
						}else{
							queryHouseholdList.noDataName = "暂无数据";
							queryHouseholdList.noDataType = true;
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
				queryHouseholdList.getList(me,1);
			}
		})

		$scope.queryHouseholdList = queryHouseholdList;
	}
]);