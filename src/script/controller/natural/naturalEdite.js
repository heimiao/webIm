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

		//更新数据
		zrcDetails.zrcEdit=function(){
			delete zrcDetails.list.exproperty;
			postForm.saveFrm(config.path.zrcEdit,zrcDetails.list)
			.success(function(res){
				// alert('上传成功')
				//console.log(zrcDetails.list.exproperty)
				$state.go('naturalVillage'); //默认显示第一个tab
			}).error(function(res){
				zrcDetails.save();
			})
		}


		//本地存储
		zrcDetails.save=function() {
				//保存，或者修改，如果有index_id则为修改没有则为添加
			dt.request({
					rqstName: "nature_village", //'low_family', 'low_village', 'nature_village', 'relief_project'
					type: "put", //select,delete,put,selectById,
					data: {
						id:zrcDetails.list.id,  
						lsxzc:zrcDetails.list.lsxzc, //行政村
						zrcmc:zrcDetails.list.zrcmc, //自然村
						nd:zrcDetails.list.nd,  //年度
						zh:zrcDetails.list.zh,  //组号
						fzr:zrcDetails.list.fzr, //负责人
						lxdh:zrcDetails.list.lxdh, //联系电话
						zhs:zrcDetails.list.zhs, //总户数
						pkhs:zrcDetails.list.pkhs, //贫困户数
						dbhs:zrcDetails.list.dbhs, //低保户数
						wbhs:zrcDetails.list.wbhs, //五保户数
						zrks:zrcDetails.list.zrks, //总人口数
						pkrks:zrcDetails.list.pkrks, //贫困人口数
						dbrks:zrcDetails.list.dbrks, //D2b低保人口数
						wbrks:zrcDetails.list.wbrks, //五保人口数
						smmzrks:zrcDetails.list.smmzrks, //少数民族人口数
						fnrks:zrcDetails.list.fnrks, //妇女人口数
						cjrks:zrcDetails.list.cjrks, //残疾人口数
						ldlrs:zrcDetails.list.ldlrs, //D3劳动力人数
						wcwgrs:zrcDetails.list.wcwgrs, //D3a 外出务工人数
						h13a:zrcDetails.list.h13a, //H13a 16周岁以上
						hjrks:zrcDetails.list.hjrks, //H13 户籍人口数
						//生活条件
						dxzcjl:zrcDetails.list.dxzcjl, //D4 到行政村距离
						dxzcsftlql:zrcDetails.list.dxzcsftlql, //D5到行政村是否通沥青（水泥）路
						sftscyd:zrcDetails.list.sftscyd, //D6是否生产用电
						sftshyd:zrcDetails.list.sftshyd, //D6是否生活用电
						sftkd:zrcDetails.list.sftkd  //D6是否通宽带
					},
					success: function(args) {
						$state.go('naturalDraft');
					},
					'error': function(args) {

					}
				});
			}



		//返回时如没有上传则提示是否保存草稿
		 zrcDetails.goback=function(){
		 	fupin.confirm("是否保存为草稿", function() {
					console.log("确定按钮");
					zrcDetails.save();
				}, function() {
					console.log("取消按钮");
					$state.go('naturalVillage');
					//alert('上')
				});
		 } 
		

		
		/*natural.menu=false;
		natural.changeMenu=function(args){
			natural.menu=args;
			console.log(natural.menu);
		}*/

		//调用列表
		//		$state.go('lowFamily.baseInfo'); //默认显示第一个tab
		//根据角色遍历响应的菜单
		$scope.zrcDetails = zrcDetails;
	}
]);