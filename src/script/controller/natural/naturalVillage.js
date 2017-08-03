myApp.controller("naturalVillage", ["$scope", "$state", "$http", "$stateParams",
	"postForm",function($scope, $state, $http, $stateParams,postForm) {
		//获取行政村
		var natural = {} || natural;
		natural.urlParam = $stateParams;
		natural.sendParam={};
		natural.sendParam.time = null;  // 年度时间查询条件 
		natural.xingzheng = {
			lx:'02',
			fid:"",
			code:'',
			name:'',
			tybz:''
		};
		var xingzhengcun={};
		xingzhengcun.list = {};
		var returnData={};
		natural.xingzhengcun=function(){
			postForm.saveFrm(config.path.xingzhengName,natural.xingzheng)
			.success(function(res){
				returnData=res;
				natural.xzcList();
			})
		}
		natural.xingzhengcun()  //调用获取全部行政村的集合
		//获取自然村
		natural.zirancun = {
			lx:'03',
			fid:"",
			code:'',
			name:'',
			tybz:''
		};
		var zirancun={};
		zirancun.list = {};
		var returnzrcData={};
		natural.zirancun=function(){
			postForm.saveFrm(config.path.xingzhengName,natural.zirancun)
			.success(function(res){
				//alert('12')
				returnzrcData=res;
				natural.xzcList();
			})
		}
		natural.zirancun();
		
		
		
		//以下是获取自然村列表
		
		
		natural.xzcList=function(){
			natural.sendParam = {
				name:"",
				time:"",
				nd:natural.sendParam.time
			};
			natural.list = {};
			natural.page = {
				limit:10,
				start:0,
			};
			var sunParm=angular.extend({},natural.page,natural.sendParam)
			postForm.saveFrm(config.path.naturalVillage,sunParm)
			.success(function(res){
				console.log(res);
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
				//me.resetload();
			})
		
		}
		natural.xzcList()
		// 选择查询条件  年度时间
		// natural.chooseTime=function(time){
		// 	natural.sendParam.time = time;
		// 	$("#time .name").html(time)
		// 	$(".timeList").slideUp(200)
		// 	$("#time").removeClass("township2")
		// 	$("#time .name").removeClass("col-ea3c4c")
		// }

		natural.selectYear=function(){
			natural.sendParam.time = $('.zrcSearch option:selected').val();
			console.log($('.zrcSearch option:selected').val())
			$("#pp").html($('.zrcSearch option:selected').val())
			natural.xzcList()
		}


		//根据年度查询
		// natural.year=function(){
		// 	natural.xzcList()
		// }	
		$scope.natural = natural;
	}
]);