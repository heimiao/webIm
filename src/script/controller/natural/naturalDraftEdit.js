myApp.controller("naturalDraftEdit", ["$scope", "$state", "$http", "$stateParams","postForm",
	function($scope, $state, $http, $stateParams,postForm) {
		var naturalDraftEditc = {} || naturalDraftEditc;
		naturalDraftEditc.urlParam = $stateParams;
		naturalDraftEditc.sendParam = {};
		naturalDraftEditc.details={};
		//根据id获取详细信息
			naturalDraftEditc.byId=function() {
				dt.request({
					rqstName: "nature_village", //'low_family', 'low_village', 'nature_village', 'relief_project'
					type: "selectById", //select,delete,put,selectById,
					param: {
						index_id: $stateParams.id
					},
					success: function(args) { 
						naturalDraftEditc.details=args;
						naturalDraftEditc.xingzhengcun();
						naturalDraftEditc.zirancun12();
						$scope.$apply()
					},
					'error': function(args) {

					}
				});
			}
		//调用获取详情的方法
		naturalDraftEditc.byId()	
		//alert(naturalDraftEditc.details.lsxzc);
		//获取行政村
		naturalDraftEditc.xingzhengcun={};
		naturalDraftEditc.xingzhengcun.list = {};
		naturalDraftEditc.xingzheng = {
			lx:'02',
			fid:""
		};
		naturalDraftEditc.xingzhengcun=function(){ 
			postForm.saveFrm(config.path.xingzhengName,naturalDraftEditc.xingzheng)
			.success(function(res){
				naturalDraftEditc.xingzhengcun.list=res;  
			})
		}
		
		//获取全部自然村
		naturalDraftEditc.zirancun = {
			lx:'03',
			fid:''
		};
		naturalDraftEditc.zirancun12=function(){
			naturalDraftEditc.zirancun.fid=naturalDraftEditc.details.lsxzc;
			postForm.saveFrm(config.path.xingzhengName,naturalDraftEditc.zirancun)
			.success(function(res){
			 	naturalDraftEditc.zirancun.list=res;
			})
		}
		//根据行政村关联自然村
		naturalDraftEditc.getzrcdraft=function(){ 
			naturalDraftEditc.zirancun12()
		}


		//草稿上传成功后 删除本地存储的数据
		naturalDraftEditc.delById=function() {
				//根据id删除
				dt.request({
					rqstName: "nature_village", //'low_family', 'low_village', 'nature_village', 'relief_project'
					type: "delete", //select,delete,put,selectById,
					param: {
						index_id: $stateParams.id
					},
					success: function(args) {
						console.log(args);
					},
					'error': function(args) {

					}
				});
			}


			naturalDraftEditc.update=function() {
				//保存，或者修改，如果有index_id则为修改没有则为添加
				dt.request({
					rqstName: "nature_village", //'low_family', 'low_village', 'nature_village', 'relief_project'
					type: "put", //select,delete,put,selectById,
					data: naturalDraftEditc.details,
					success: function(args) {
						$state.go('naturalDraft');
					},
					'error': function(args) {

					}
				});
			}	

			//返回时如没有上传则提示是否保存草稿
		 naturalDraftEditc.goback=function(){
		 	fupin.confirm("是否保存为草稿", function() {
				naturalDraftEditc.update();
				}, function() {
					$state.go('naturalVillage');
				});
		 } 



		 //校验行政村
		naturalDraftEditc.lsxzc=function(){
			if(naturalDraftEditc.details.lsxzc==''||naturalDraftEditc.details.lsxzc==null){
				fupin.alert("行政村不能为空");
				return false;
			}else{
				return true;
				$scope.$apply()
			}
		}
		//校验负责人
		naturalDraftEditc.fzr=function(){
			if(naturalDraftEditc.details.fzr==''||naturalDraftEditc.details.fzr==null){
				fupin.alert("负责人不能为空");
				return false;
			}else{
				return true;
			}
		}


		 //判断数据库是否有数据
		 naturalDraftEditc.isshuju=function(){  
		 	if(naturalDraftEditc.details.id){
		 		naturalDraftEditc.zrcEdit() 
		 	}else{
		 		naturalDraftEditc.tianjiazrc(); 
		 	}
		 }

		//如果数据库有数据则更新数据
		naturalDraftEditc.zrcEdit=function(){
			if(naturalDraftEditc.lsxzc()&&naturalDraftEditc.fzr()){
				delete naturalDraftEditc.details.exproperty;
				postForm.saveFrm(config.path.zrcEdit,naturalDraftEditc.details)
				.success(function(res){
					naturalDraftEditc.delById()
					$state.go('naturalVillage');
				})
			}
			
		}

		//如果数据库没有数据新增数据
		naturalDraftEditc.tianjiazrc=function(){
			if(naturalDraftEditc.lsxzc()&&naturalDraftEditc.fzr()){
				postForm.saveFrm(config.path.addzrc,naturalDraftEditc.details)
				.success(function(res){
					naturalDraftEditc.delById();
					$state.go('naturalVillage'); 
				})
			}
			
		}

		$scope.naturalDraftEditc = naturalDraftEditc;
	}
]);