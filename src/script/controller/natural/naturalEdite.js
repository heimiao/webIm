myApp.controller("naturalEdite", ["$scope", "$state", "$http", "$stateParams",
	"postForm",function($scope, $state, $http, $stateParams,postForm) {
		var zrcDetails = {} || zrcDetails;
		zrcDetails.urlParam = $stateParams;
		zrcDetails.sendParam = {};
		//获取详情的id 显示详情的内容 
		zrcDetails.canshu = {
			id:$stateParams.id,
		}; 
		zrcDetails.list = {};
		$http.post(config.path.zrcDetails+"?id="+zrcDetails.canshu.id)
		.success(function(res){
			console.log(res);
			zrcDetails.list=res;
		});

		//获取行政村
		zrcDetails.xingzhengcun={};
		zrcDetails.xingzhengcun.list = {};
		zrcDetails.xingzheng = {
			lx:'02',
			fid:""
		};
		zrcDetails.xingzhengcun=function(){ 
			postForm.saveFrm(config.path.xingzhengName,zrcDetails.xingzheng)
			.success(function(res){
				zrcDetails.xingzhengcun.list=res;  
				//console.log(JSON.stringify(zrcAdd.sendParam.lsxzc))
			})
		}
		zrcDetails.xingzhengcun();
		

		//获取全部自然村
		zrcDetails.zirancun = {
			lx:'03',
			fid:''
		};
		zrcDetails.zirancun12=function(){
			zrcDetails.zirancun.fid=zrcDetails.list.lsxzc;
			postForm.saveFrm(config.path.xingzhengName,zrcDetails.zirancun)
			.success(function(res){
			 	zrcDetails.zirancun.list=res;
			 	
			})
		}
		//根据行政村关联自然村
		zrcDetails.getzrc=function(){ 
			zrcDetails.zirancun12() 
		}

		//校验行政村
		zrcDetails.lsxzc=function(){
			if(zrcDetails.list.lsxzc==''||zrcDetails.list.lsxzc==null){
				fupin.alert("行政村不能为空");
				return false;
			}else{
				return true;
				$scope.$apply()
			}
		}
		//校验负责人
		zrcDetails.fzr=function(){
			if(zrcDetails.list.fzr==''||zrcDetails.list.fzr==null){
				fupin.alert("负责人不能为空");
				return false;
			}else{
				return true;
			}
		}


		//更新数据
		zrcDetails.zrcEdit=function(){
			if(zrcDetails.lsxzc()&&zrcDetails.fzr()){
				delete zrcDetails.list.exproperty;
				postForm.saveFrm(config.path.zrcEdit,zrcDetails.list)
				.success(function(res){
					$state.go('naturalVillage'); 
				}).error(function(res){
					zrcDetails.save();
				})
			}
			
		}
		

		


		//返回时如没有上传则提示是否保存草稿
		 zrcDetails.goback=function(){
		 	fupin.confirm("是否保存为草稿", function() {
		 		zrcDetails.save();
			 	}, function() {
					//$state.go('naturalVillage');
					window.history.back();
				});
		 } 
		//本地存储
		zrcDetails.save=function() {
				//保存，或者修改，如果有index_id则为修改没有则为添加
			dt.request({
					rqstName: "nature_village", //'low_family', 'low_village', 'nature_village', 'relief_project'
					type: "put", //select,delete,put,selectById,
					data:zrcDetails.list,  //数据在对象里
					success: function(args) {
						//alert('新增')
						$state.go('naturalDraft');
					},
					'error': function(args) {

					}
				});
			}
			

		$scope.zrcDetails = zrcDetails;
	}
]);