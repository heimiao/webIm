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
						//console.log(args);
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
					data: {
						id:naturalDraftEditc.details.id,  
						lsxzc:naturalDraftEditc.details.lsxzc, //行政村
						zrcmc:naturalDraftEditc.details.zrcmc, //自然村
						nd:naturalDraftEditc.details.nd,  //年度
						zh:naturalDraftEditc.details.zh,  //组号
						fzr:naturalDraftEditc.details.fzr, //负责人
						lxdh:naturalDraftEditc.details.lxdh, //联系电话
						zhs:naturalDraftEditc.details.zhs, //总户数
						pkhs:naturalDraftEditc.details.pkhs, //贫困户数
						dbhs:naturalDraftEditc.details.dbhs, //低保户数
						wbhs:naturalDraftEditc.details.wbhs, //五保户数
						zrks:naturalDraftEditc.details.zrks, //总人口数
						pkrks:naturalDraftEditc.details.pkrks, //贫困人口数
						dbrks:naturalDraftEditc.details.dbrks, //D2b低保人口数
						wbrks:naturalDraftEditc.details.wbrks, //五保人口数
						smmzrks:naturalDraftEditc.details.smmzrks, //少数民族人口数
						fnrks:naturalDraftEditc.details.fnrks, //妇女人口数
						cjrks:naturalDraftEditc.details.cjrks, //残疾人口数
						ldlrs:naturalDraftEditc.details.ldlrs, //D3劳动力人数
						wcwgrs:naturalDraftEditc.details.wcwgrs, //D3a 外出务工人数
						h13a:naturalDraftEditc.details.h13a, //H13a 16周岁以上
						hjrks:naturalDraftEditc.details.hjrks, //H13 户籍人口数
						//生活条件
						dxzcjl:naturalDraftEditc.details.dxzcjl, //D4 到行政村距离
						dxzcsftlql:naturalDraftEditc.details.dxzcsftlql, //D5到行政村是否通沥青（水泥）路
						sftscyd:naturalDraftEditc.details.sftscyd, //D6是否生产用电
						sftshyd:naturalDraftEditc.details.sftshyd, //D6是否生活用电
						sftkd:naturalDraftEditc.details.sftkd  //D6是否通宽带
					},
					success: function(args) {
						naturalDraftEditc.delById()
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
		 	if(data.id==''||data.id==undefined){
		 		naturalDraftEditc.tianjiazrc()
		 	}else{
		 		naturalDraftEditc.zrcEdit()
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
					$state.go('naturalVillage'); //默认显示第一个tab
				})
			}
			
		}

		$scope.naturalDraftEditc = naturalDraftEditc;
	}
]);