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
						console.log(args);
						naturalDraftEditc.details=args;
						//console.log(naturalDraftEditc.details.lsxzc);
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
			//naturalDraftEditc.zirancun.fid=naturalDraftEditc.xingzhengcun.list.id;
			console.log(naturalDraftEditc.details.lsxzc)
			postForm.saveFrm(config.path.xingzhengName,naturalDraftEditc.zirancun)
			.success(function(res){
			 	naturalDraftEditc.zirancun.list=res;
			})
		}
		//根据行政村关联自然村
		naturalDraftEditc.getzrcdraft=function(){ 
			naturalDraftEditc.zirancun12()
		}

		//更新数据
		naturalDraftEditc.zrcEdit=function(){
			delete naturalDraftEditc.details.exproperty;
			postForm.saveFrm(config.path.zrcEdit,naturalDraftEditc.details)
			.success(function(res){
				
			})
		}


		// naturalDraft.uploadSource = function() {
		// 	console.log(12123123);

		// 	//根据贫困户id
		// }

		//console.log(naturalDraft.urlParam);

		/*lowFamilyInfo.menu=false;
		lowFamilyInfo.changeMenu=function(args){
			lowFamilyInfo.menu=args;
			console.log(lowFamilyInfo.menu);
		}*/

		//调用列表
		//		$state.go('lowFamily.baseInfo'); //默认显示第一个tab
		//根据角色遍历响应的菜单
		$scope.naturalDraftEditc = naturalDraftEditc;
	}
]);