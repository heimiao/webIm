myApp.controller("naturalAdd", ["$scope", "$state", "$http", "$stateParams",
	"postForm",function($scope, $state, $http, $stateParams,postForm) {
		var zrcAdd = zrcAdd|| {} ;
		zrcAdd.urlParam = $stateParams;
		zrcAdd.sendParam = {};
		zrcAdd.tianjiazrc=function(){
		// zrcAdd.formzirancun={ } 表单对象 
			zrcAdd.list = {};
			postForm.saveFrm(config.path.addzrc,zrcAdd.sendParam)
			.success(function(res){
				console.log(zrcAdd.sendParam.nd)
			})
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
				console.log(JSON.stringify(zrcAdd.sendParam.lsxzc))
			})
		}
		zrcAdd.xingzhengcun();
		//根据点击的行政村查询自然村
		zrcAdd.getNur=function(){ 
			zrcAdd.zirancun12() 
		}

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
				//zrcAdd.sendParam.zrcmc=zrcAdd.zirancun.list[0].id;
			})
		}
		 
		
		
		

		$scope.zrcAdd = zrcAdd;
	}
]);