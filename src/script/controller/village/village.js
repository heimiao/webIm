myApp.controller("poorVillage", ["$scope", "$state", "$http", "$stateParams","$timeout","postForm",
	function($scope, $state, $http, $stateParams,$timeout, postForm) {
		var poorVillage = {} || poorVillage;
		poorVillage.urlParam = $stateParams;
		poorVillage.sendParam = {};
		poorVillage.list = []; //查询列表
		poorVillage.townShip = []; //全部乡镇列表
		poorVillage.villageList = []; //根据乡镇查询行政村
		poorVillage.villageListAll = []; //获取全部行政村
		poorVillage.sendParam.townShipId = null; //查询条件乡镇
		poorVillage.sendParam.villageListId = null; //查询条件 行政村
		poorVillage.sendParam.time = '2017';  // 查询条件 年度时间
		poorVillage.noDataType = false;
		poorVillage.noDataName = null;
		poorVillage.start = 0; //请求的条数
		//清除添加时本地存储的数据
		window.localStorage.removeItem("situationList");
		window.localStorage.removeItem("developmentList");
		window.localStorage.removeItem('taskForceList');
		window.localStorage.removeItem("editVillageCollectionEditId")
		// 获取所有乡镇
		$http.post(config.path.townShip,null).success(function(res){
			poorVillage.townShip = res;
			// 获取所有行政村
			$http.post(config.path.villageAll,null).success(function(res){
				poorVillage.villageListAll = res;
				poorVillage.villageList = res;
				poorVillage.start = 0;
				poorVillage.getVillageList(); //首页加载列表数据
			})
		})
		// 选择查询条件  乡镇
		poorVillage.chooseTownship=function(name,id){
			poorVillage.sendParam.townShipId = id;
			$("#township .name").html(name)
			$(".townshipList").slideUp(200)
			$("#township").removeClass("township2")
			$("#township .name").removeClass("col-ea3c4c")
			$("#village .name").html('全部行政村')
			poorVillage.sendParam.villageListId = null;
			$http.post(config.path.villageAll+"&fid="+id,null).success(function(res){
				poorVillage.villageList = res;
			})
			poorVillage.queryBtn();
		}
		// 选择查询条件  行政村
		poorVillage.chooseVillage=function(name,id){
			poorVillage.sendParam.villageListId = id;
			$("#village .name").html(name)
			$(".villageList").slideUp(200)
			$("#village").removeClass("township2")
			$("#village .name").removeClass("col-ea3c4c")
			poorVillage.queryBtn();
		}
		// 选择查询条件  年度时间
		poorVillage.chooseTime=function(time){
			poorVillage.sendParam.time = time;
			$("#time .name").html(time)
			$(".timeList").slideUp(200)
			$("#time").removeClass("township2")
			$("#time .name").removeClass("col-ea3c4c")
			poorVillage.queryBtn();
		}
		//  封装方法  获取列表
		poorVillage.getVillageList=function (me, num){
			poorVillage.datas = {
				"nd": poorVillage.sendParam.time,
				"limit":　10,
				"start": poorVillage.start,
				"qyxz": poorVillage.sendParam.townShipId,
				"qyxzc": poorVillage.sendParam.villageListId,
			}
			postForm.saveFrm(config.path.villageList,poorVillage.datas).success(function(res){
				if(res.success){
					if(res.results){
						poorVillage.noDataType = false;
						for(var r=0;r<res.results.length;r++){
							res.results[r].pkcsx = res.results[r].pkcsx == "01"?"贫困村":res.results[r].pkcsx == "02"?"十二五贫困村":res.results[r].pkcsx == "03"?"十三五贫困村":res.results[r].pkcsx == "04"?"非贫困村":"无";
							for(var i=0;i<poorVillage.townShip.length;i++){
								if(res.results[r].qyxz == poorVillage.townShip[i].id){
									res.results[r].qyxz = poorVillage.townShip[i].name
								}
							}
							for(var i=0;i<poorVillage.villageListAll.length;i++){
								if(res.results[r].qyxzc == poorVillage.villageListAll[i].id){
									res.results[r].qyxzc = poorVillage.villageListAll[i].name
								}
							}
						}
						if(num == 1){
							$timeout(function(){
								for(var r=0;r<res.results.length;r++){
									poorVillage.list.push(res.results[r]);
								}
			             		// 每次数据加载完，必须重置
			             		me.resetload();
			           		},1000);
						}else{
							poorVillage.list = res.results;
						}
						poorVillage.start= poorVillage.start + res.results.length;
					}else{
						if(num == 1){
							me.resetload();
							poorVillage.noDataName = "没有更多了";
							poorVillage.noDataType = true;
						}else{
							poorVillage.noDataName = "暂无数据";
							poorVillage.noDataType = true;
						}
						
 					}
				}
			})
		}
		// 查询
		poorVillage.queryBtn=function(){
			poorVillage.start = 0;
			poorVillage.getVillageList();
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
				poorVillage.getVillageList(me,1);
			}
		})
		/*poorVillage.menu=false;
		poorVillage.changeMenu=function(args){
			poorVillage.menu=args;
			console.log(poorVillage.menu);
		}*/

		//调用列表
		//		$state.go('lowFamily.baseInfo'); //默认显示第一个tab
		//根据角色遍历响应的菜单
		$scope.poorVillage = poorVillage;
	}
]);