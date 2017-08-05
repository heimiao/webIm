myApp.controller("naturalVillage", ["$scope", "$state", "$http", "$stateParams",
	"postForm",function($scope, $state, $http, $stateParams,postForm) {
		//获取行政村
		var natural = {} || natural;
		natural.urlParam = $stateParams;
		natural.sendParam={};
		natural.sendParam.time = '2017';  // 年度时间查询条件 
		natural.start = 0; //请求的条数
		natural.xingzheng = {
			lx:'02'
		};
		var xingzhengcun={};
		xingzhengcun.list = {};
		var returnData={};
		natural.xingzhengcun=function(){
			postForm.saveFrm(config.path.xingzhengName,natural.xingzheng)
			.success(function(res){
				returnData=res;
				natural.xzcList();
				natural.sendParam.time='2017'
			})
		};
		//获取自然村
		natural.zirancun = {
			lx:'03'
		};
		var zirancun={};
		zirancun.list = {};
		var returnzrcData={};
		natural.zirancun=function(){
			postForm.saveFrm(config.path.xingzhengName,natural.zirancun)
			.success(function(res){
				returnzrcData=res;
				natural.xzcList();
			})
		};
		natural.xingzhengcun()  //调用获取全部行政村的集合
		natural.zirancun();
		
		//以下是获取自然村列表
		natural.xzcList=function(me, num){
			console.log("----")
			console.log(natural.sendParam.time)
			natural.sendParam = {
				name:"",
				nd:natural.sendParam.time
			};
			natural.list = {};
			natural.page = {
				limit:10,
				start:natural.start,
			};
			var sunParm=angular.extend({},natural.page,natural.sendParam)
			postForm.saveFrm(config.path.naturalVillage,sunParm)
			.success(function(res){
				natural.list=res.results;

				//循环行政村id赋值
				for(var r=0;r<res.results.length;r++){
					for(var i=0;i<returnData.length;i++){
						if(res.results[r].lsxzc == returnData[i].id){
							res.results[r].lsxzc = returnData[i].name;
						}
					}
				};
				//循环自然村id赋值
				for(var r=0;r<res.results.length;r++){
					for(var i=0;i<returnzrcData.length;i++){
						if(res.results[r].zrcmc == returnzrcData[i].id){
							res.results[r].zrcmc = returnzrcData[i].name;
						}
					}
				}
			})
		
		}



		// 选择查询条件  年度时间
		natural.chooseTime=function(time){
			natural.sendParam.time = time;
			$("#time .name").html(time)
			$(".timeList").slideUp(200)
			$("#time").removeClass("township2")
			$("#time .name").removeClass("col-ea3c4c");
			natural.queryBtn()
		}
		// 查询
		natural.queryBtn=function(){
			natural.start = 0;
			natural.xzcList();
		}	
		//返回首页
		natural.goback=function(){
			$state.go('home');
		}
		

		$scope.natural = natural;
	}
]);