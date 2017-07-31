var baseUrl = "http://123.58.240.75:8081/tpa";
var config = {
	//请求路径
	path: {
		login: baseUrl + "/dotpalogin",

		townShip: baseUrl+ "/zcjg/queryForZc",  //获取乡镇列表
		townShip: baseUrl+ "/zcjg/queryForZc",  //获取乡镇列表
		naturalVillage: baseUrl+ "/zrc/queryForPage",  //自然村列表
		
		townShip: baseUrl+ "/zcjg/queryForZc?lx=01",  //获取乡镇列表

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