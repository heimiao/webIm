myApp.controller("naturalDraft", ["$scope", "$state", "$http", "$stateParams","postForm",
	function($scope, $state, $http, $stateParams,postForm) {
		var naturalDraft = {} || naturalDraft;
		naturalDraft.urlParam = $stateParams;
		naturalDraft.sendParam = {};
		naturalDraft.xingzheng = {
			lx:'02',
			fid:"",
			code:'',
			name:'',
			tybz:''
		};
		var xingzhengcun={};
		xingzhengcun.list = {};
		var returnData={};
		naturalDraft.xingzhengcun=function(){
			postForm.saveFrm(config.path.xingzhengName,naturalDraft.xingzheng)
			.success(function(res){
				returnData=res;
				naturalDraft.findAll()	
			})
		}
		naturalDraft.xingzhengcun()  //调用获取全部行政村的集合

		//获取自然村
		naturalDraft.zirancun = {
			lx:'03',
			fid:"",
			code:'',
			name:'',
			tybz:''
		};
		var zirancun={};
		zirancun.list = {};
		var returnzrcData={};
		naturalDraft.zirancun=function(){
			postForm.saveFrm(config.path.xingzhengName,naturalDraft.zirancun)
			.success(function(res){
				naturalDraft.findAll();
				returnzrcData=res;	
			})
		}
		naturalDraft.zirancun();

		//获取所有列表
		naturalDraft.findAll=function() {
				dt.request({
					rqstName: "nature_village", //'low_family', 'low_village', 'nature_village', 'relief_project'
					type: "select", //select,delete,put,selectById,
					success: function(args) {
						naturalDraft.list=args;
						console.log(args)
						//循环行政村id赋值
						for(var r=0;r<naturalDraft.list.length;r++){
							for(var i=0;i<returnData.length;i++){
								if(naturalDraft.list[r].lsxzc == returnData[i].id){
									naturalDraft.list[r].lsxzc = returnData[i].name;
								}
							}
						};	
						//循环自然村id赋值
						for(var r=0;r<naturalDraft.list.length;r++){
							for(var i=0;i<returnzrcData.length;i++){
								if(naturalDraft.list[r].zrcmc == returnzrcData[i].id){
									naturalDraft.list[r].zrcmc = returnzrcData[i].name;
								}
							}
						}

						$scope.$apply()
					},
					'error': function(args) {

					}
				});
			}
		
		$scope.naturalDraft = naturalDraft;
	}
]);