myApp.controller("naturalVillage", ["$scope", "$state", "$http", "$stateParams",
	"postForm","$timeout",function($scope, $state, $http, $stateParams,postForm,$timeout) {
		//获取行政村
		var natural = {} || natural;
		natural.urlParam = $stateParams;
		natural.sendParam={};
		natural.sendParam.time = '2017';  // 年度时间查询条件 
		natural.start = 0; //请求的条数
		natural.list = [];
		natural.xingzheng = {
			lx:'02'
		};
		var xingzhengcun={};
		xingzhengcun.list = {};
		var returnData={};
		var zirancun={};
		zirancun.list = {};
		var returnzrcData={};
		natural.xingzhengcun=function(){
			postForm.saveFrm(config.path.xingzhengName,natural.xingzheng).success(function(res){
				returnData=res;
				//获取自然村
				natural.zirancun = {
					lx:'03'
				};
				postForm.saveFrm(config.path.xingzhengName,natural.zirancun).success(function(res){
					returnzrcData=res;
					natural.xzcList();
				})
			})
		};
		
		natural.xingzhengcun()  //调用获取全部行政村的集合
		
		//以下是获取自然村列表
		natural.xzcList=function(me, num){
			natural.pages = {
				'nd':natural.sendParam.time,
				'limit': 10,
				'start': natural.start, 
			};
			
			postForm.saveFrm(config.path.naturalVillage,natural.pages)
			.success(function(res){
				//判断是否有数据
				if(res.results){
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
					if(num == 1){
						$timeout(function(){
							for(var r=0;r<res.results.length;r++){
								natural.list.push(res.results[r]);
							}
		             		// 每次数据加载完，必须重置
		             		me.resetload();
		           		},1000);
					}else{
						natural.list=res.results;
					}
					natural.start= natural.start + res.results.length;
				}else{ //没有数据时列表为空
					natural.list=[];
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
				natural.xzcList(me,1);
			}
		})

		$scope.natural = natural;
	}
]);