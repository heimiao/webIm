myApp.controller("naturalAdd", ["$scope", "$state", "$http", "$stateParams",
	"postForm",function($scope, $state, $http, $stateParams,postForm) {
		var zrcAdd = zrcAdd|| {} ;
		zrcAdd.urlParam = $stateParams;
		zrcAdd.sendParam = {};
		zrcAdd.sendParam.dxzcsftlql='是'; //是否通沥青路
		zrcAdd.sendParam.sftscyd='是'; //D6是否生产用电 
		zrcAdd.sendParam.sftshyd='是'; //D6是否生活用电
		zrcAdd.sendParam.sftkd='是'; //D6是否通宽带 
		zrcAdd.sendParam.nd='2017';
		//校验行政村
		zrcAdd.lsxzc=function(){
			if(zrcAdd.sendParam.lsxzc==''||zrcAdd.sendParam.lsxzc==null){
				fupin.alert("行政村不能为空");
				return false;
			}else{
				return true;
				$scope.$apply()
			}
		}
		//校验负责人
		zrcAdd.fzr=function(){
			if(zrcAdd.sendParam.fzr==''||zrcAdd.sendParam.fzr==null){
				fupin.alert("负责人不能为空");
				return false;
			}else{
				return true;
			}
		}


		zrcAdd.tianjiazrc=function(){
			if(zrcAdd.lsxzc()&&zrcAdd.fzr()){
				zrcAdd.list = {};
				postForm.saveFrm(config.path.addzrc,zrcAdd.sendParam)
				.success(function(res){
					//alert(zrcAdd.sendParam.nd)
					$state.go('naturalVillage'); //默认显示第一个tab
				}).error(function(res){
					zrcAdd.save(); //上传的失败保存到本地数据库
				})
			}
			
			}
		//获取行政村
		zrcAdd.xingzhengcun={};
		zrcAdd.xingzhengcun.list = {};
		zrcAdd.xingzheng = {
			lx:'02',
			fid:""
		};
		zrcAdd.xingzhengcun=function(){ 
			postForm.saveFrm(config.path.xingzhengName,zrcAdd.xingzheng)
			.success(function(res){
				zrcAdd.xingzhengcun.list=res;
				// zrcAdd.sendParam.lsxzc= zrcAdd.xingzhengcun.list[0].id 
			})
		}
		zrcAdd.xingzhengcun();
		

		//获取全部自然村
		zrcAdd.zirancun = {
			lx:'03',
			fid:''
		};
		zrcAdd.zirancun12=function(){
			zrcAdd.zirancun.fid=zrcAdd.sendParam.lsxzc;
			postForm.saveFrm(config.path.xingzhengName,zrcAdd.zirancun)
			.success(function(res){
			 	zrcAdd.zirancun.list=res;
			})
		}
		//根据点击的行政村查询自然村
		zrcAdd.getNur=function(){ 
			zrcAdd.zirancun12() 
		}
		//本地存储
		zrcAdd.save=function() {
				//保存，或者修改，如果有index_id则为修改没有则为添加
			dt.request({
					rqstName: "nature_village", //'low_family', 'low_village', 'nature_village', 'relief_project'
					type: "put", //select,delete,put,selectById,
					data: {
						lsxzc:zrcAdd.sendParam.lsxzc, //行政村
						zrcmc:zrcAdd.sendParam.zrcmc, //自然村
						nd:zrcAdd.sendParam.nd,  //年度
						zh:zrcAdd.sendParam.zh,  //组号
						fzr:zrcAdd.sendParam.fzr, //负责人
						lxdh:zrcAdd.sendParam.lxdh, //联系电话
						zhs:zrcAdd.sendParam.zhs, //总户数
						pkhs:zrcAdd.sendParam.pkhs, //贫困户数
						dbhs:zrcAdd.sendParam.dbhs, //低保户数
						wbhs:zrcAdd.sendParam.wbhs, //五保户数
						zrks:zrcAdd.sendParam.zrks, //总人口数
						pkrks:zrcAdd.sendParam.pkrks, //贫困人口数
						dbrks:zrcAdd.sendParam.dbrks, //D2b低保人口数
						wbrks:zrcAdd.sendParam.wbrks, //五保人口数
						smmzrks:zrcAdd.sendParam.smmzrks, //少数民族人口数
						fnrks:zrcAdd.sendParam.fnrks, //妇女人口数
						cjrks:zrcAdd.sendParam.cjrks, //残疾人口数
						ldlrs:zrcAdd.sendParam.ldlrs, //D3劳动力人数
						wcwgrs:zrcAdd.sendParam.wcwgrs, //D3a 外出务工人数
						h13a:zrcAdd.sendParam.h13a, //H13a 16周岁以上
						hjrks:zrcAdd.sendParam.hjrks, //H13 户籍人口数
						//生活条件
						dxzcjl:zrcAdd.sendParam.dxzcjl, //D4 到行政村距离
						dxzcsftlql:zrcAdd.sendParam.dxzcsftlql, //D5到行政村是否通沥青（水泥）路
						sftscyd:zrcAdd.sendParam.sftscyd, //D6是否生产用电
						sftshyd:zrcAdd.sendParam.sftshyd, //D6是否生活用电
						sftkd:zrcAdd.sendParam.sftkd  //D6是否通宽带
					},
					success: function(args) {
						//console.log(args);
						$state.go('naturalDraft');
					},
					'error': function(args) {

					}
				});
			}



		 //返回时如没有上传则提示是否保存草稿
		 zrcAdd.goback=function(){
		 	fupin.confirm("是否保存为草稿", function() {
					//console.log("确定按钮");
					zrcAdd.save();
				}, function() {
					//console.log("取消按钮");
					window.history.go(-1)
				});
		 } 


		 
		$scope.zrcAdd = zrcAdd;
	}
]);