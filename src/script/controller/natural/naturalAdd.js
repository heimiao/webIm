myApp.controller("naturalAdd", ["$scope", "$state", "$http", "$stateParams",
	"postForm",function($scope, $state, $http, $stateParams,postForm) {
		var zrcAdd = {} || zrcAdd;
		zrcAdd.urlParam = $stateParams;
		zrcAdd.tianjiazrc=function(){
			if(zrcAdd.nd==0){
	 			var years='2014'
	 		}else if(zrcAdd.nd==1){
	 			var years='2015'
	 		}else if(zrcAdd.nd==2){
				var years='2016'
	 		}else if(zrcAdd.nd==3){
				var years='2017'
	 		}else if(zrcAdd.nd==4){
				var years='2018'
	 		}else if(zrcAdd.nd==5){
				var years='2019'
	 		}else if(zrcAdd.nd==6){
				var years='2020'
	 		};


		zrcAdd.sendParam = {
			dbhs:zrcAdd.dbhs, //低保户数
			nd:years,   //年度
			zrcmc:zrcAdd.zrcmc, //自然村名称
			zh:zrcAdd.zh, //组号
			fzr:zrcAdd.fzr,//负责人
			lxdh:zrcAdd.lxdh, //联系电话
			zhs:zrcAdd.zhs, //总户数
			smmzrks:zrcAdd.smmzrks, //少数民族人口数
			pkhs:zrcAdd.pkhs, //贫困户数（户）
			fnrks:zrcAdd.fnrks, //妇女人口数
			lsxzc:zrcAdd.lsxzc, //隶属行政村(id)
			cjrks:zrcAdd.cjrks, //残疾人口数
			wbhs:zrcAdd.wbhs, //五保户数
			ldlrs:zrcAdd.ldlrs, //劳动力人数
			zrks:zrcAdd.zrks, //总人口数
			wcwgrs:zrcAdd.wcwgrs, //外出务工人数
			pkrks:zrcAdd.pkrks, //贫困人口数
			hjrks:zrcAdd.hjrks, //户籍人口数 
			dbrks:zrcAdd.dbrks, //低保人口数
			h13a:zrcAdd.h13a, //H13a 16周岁以上
			wbrks:zrcAdd.wbrks, //五保人口数
			dxzcjl:zrcAdd.dxzcjl, //到行政村距离
			sftshyd:zrcAdd.sftshyd, //是否通生活用电
			dxzcsftlql:zrcAdd.dxzcsftlql, //到行政村是否通沥青（水泥）路
			sftkd:zrcAdd.sftkd, //是否通宽带 
			sftscyd:zrcAdd.sftscyd //是否通生产用电
		};
		zrcAdd.list = {};
			var sunParm=angular.extend({},zrcAdd.sendParam)
			postForm.saveFrm(config.path.addzrc,sunParm)
			.success(function(res){
				console.log(zrcAdd.zh);
			})
		
		}
		
		//获取行政村
		zrcAdd.xingzhengcun=function(){
			zrcAdd.xingzheng = {
				lx:'02',
				fid:"",
				code:'',
				name:'',
				tybz:''
			};
			zrcAdd.xingzhengcun={};
			zrcAdd.xingzhengcun.list = {};
			postForm.saveFrm(config.path.xingzhengName,zrcAdd.xingzheng)
			.success(function(res){
				zrcAdd.xingzhengcun.list=res;
				zrcAdd.lsxzc=zrcAdd.xingzhengcun.list[0].id;
				//自然村
				zrcAdd.zirancun = {
					lx:'03',
					fid:zrcAdd.xingzhengcun.list[1].id,
					code:'',
					name:'',
					tybz:''
				};
				//alert(zrcAdd.zirancun.fid);
				//zrcAdd.zirancun={};
				//zrcAdd.zirancun.list = {};
				zrcAdd.zirancun12=function(){
					postForm.saveFrm(config.path.xingzhengName,zrcAdd.zirancun)
					.success(function(res){
						//alert(zrcAdd.xingzhengcun.list[0].id)
						alert(JSON.stringify(zrcAdd.zirancun));
						zrcAdd.zirancun.list=res;
						//console.log(zrcAdd.zirancun.list);
						zrcAdd.zrcmc=zrcAdd.xingzhengcun.list[0].id;
					})
				}
				zrcAdd.zirancun12()	
			})
		}
		zrcAdd.xingzhengcun()  //调用获取全部行政村的集合
	
//alert(JSON.stringify(zrcAdd.xingzhengcun));
		//获取自然村
		
		
		
		
//		zrcAdd.uploadSource = function() {
//			console.log(12123123);
//
//			//根据贫困户id
//		}

		//console.log(zrcAdd.urlParam);

		/*lowFamilyInfo.menu=false;
		lowFamilyInfo.changeMenu=function(args){
			lowFamilyInfo.menu=args;
			console.log(lowFamilyInfo.menu);
		}*/

		//调用列表
		//		$state.go('lowFamily.baseInfo'); //默认显示第一个tab
		//根据角色遍历响应的菜单
		$scope.zrcAdd = zrcAdd;
	}
]);