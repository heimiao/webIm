var baseUrl = "http://123.58.240.75:8081/tpa";
var config = {
	//请求路径
	path: {
		login: baseUrl + "/dotpalogin",

		townShip: baseUrl+ "/zcjg/queryForZc",  //获取乡镇列表
		townShip: baseUrl+ "/zcjg/queryForZc",  //获取乡镇列表
		naturalVillage: baseUrl+ "/zrc/queryForPage",  //自然村列表
		
		townShip: baseUrl+ "/zcjg/queryForZc?lx=01",  //获取乡镇列表
<<<<<<< HEAD
		villageAll: baseUrl + "/zcjg/queryForZc?lx=02&fid=", //获取所有行政村列表
		villageList: baseUrl + "/pkc/queryForPage"
=======

>>>>>>> 76e8e7dd1030c57c82fcb44610a3c29670ec3ea3
	},
	//系统基本信息配置
	sysInfo: {
		page: {

		},
		selects: {
			
		}
	},
	//系统状态配置
	sysState: {

	}
}