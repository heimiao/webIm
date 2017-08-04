myApp.controller("queryHousehold", ["$scope", "$state", "$http", "$stateParams",
	function($scope, $state, $http, $stateParams) {
		var queryHousehold = {} || queryHousehold;
		queryHousehold.urlParam = $stateParams;
		queryHousehold.sendParam = {};
		queryHousehold.townShip = []; //全部乡镇 
		queryHousehold.nd = "2017"; // 年度 默认值
		queryHousehold.sjzt = null; //数据状态
		queryHousehold.tpqk = null; //脱贫情况
		queryHousehold.hzxm = null; //姓名
		queryHousehold.hzsfz = null; //证件号码
		queryHousehold.userName = null; //查询的输入条件
		// 获取所有乡镇
		$http.post(config.path.townShip,null).success(function(res){
			queryHousehold.townShip = res;
			queryHousehold.qyxz = res[0].id;
			queryHousehold.getVillageList(res[0].id, 1); //获取乡镇对应的行政村
		})
		// 乡镇变化行政村跟随变化
		queryHousehold.changeTown=function(){
			queryHousehold.getVillageList(queryHousehold.qyxz); //获取乡镇对应的行政村
		}
		// 获取所有行政村
		queryHousehold.getVillageList= function(id, num){
			$http.post(config.path.villageAll+"&fid="+id,null).success(function(res){
				queryHousehold.qyxzc = res[0].id;
				queryHousehold.villageListAll = res;
			})
		}
		$("#dataState div").click(function(){
			$(this).addClass('bg').siblings().removeClass('bg');
			if($(this).attr("data-type") == '0'){
				queryHousehold.sjzt = '0';
			}else if($(this).attr("data-type") == '1'){
				queryHousehold.sjzt = '1';
			}else{
				queryHousehold.sjzt = null;
			}
		})
		$("#poverty div").click(function(){
			$(this).addClass('bg').siblings().removeClass('bg');
			if($(this).attr("data-type") == '02'){
				queryHousehold.tpqk = '02';
			}else if($(this).attr("data-type") == '03'){
				queryHousehold.tpqk = '03';
			}else if($(this).attr("data-type") == '04'){
				queryHousehold.tpqk = '04';
			}else if($(this).attr("data-type") == '05'){
				queryHousehold.tpqk = '05';
			}else{
				queryHousehold.tpqk = null;
			}
		})

		queryHousehold.queryList= function(){
			var reg = /^\d{1,20}$/g;
			if(!(reg.test(queryHousehold.userName))){
				queryHousehold.hzxm = queryHousehold.userName;
			}else{
				queryHousehold.hzsfz = queryHousehold.userName;
			}
			$state.go('queryHouseholdList', {'hzxm':queryHousehold.hzxm,'hzsfz':queryHousehold.hzsfz,'nd':queryHousehold.nd,'qyxz':queryHousehold.qyxz,'qyxzc': queryHousehold.qyxzc,'sjzt':queryHousehold.sjzt,'tpqk': queryHousehold.tpqk})
		}



		$scope.queryHousehold = queryHousehold;
	}
]);