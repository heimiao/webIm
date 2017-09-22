var baseUrl = "http://dvlp.api.rtf365.com/";
//var baseUrl = "http://test.api.rtf365.com/";

var chatLog = "http://dvlp.emchat.rtf365.com/service/emchat/logs/";
//var chatLog = "http://test.emchat.rtf365.com/service/emchat/logs/";

var baseImgUrl = "http://dvlp.img.rtf365.com/";
//var baseImgUrl = "http://test.img.rtf365.com/";
var Config = {
	//请求路径
	getbaseUrl: baseUrl + '/zjzd/getBaseUrlList?lx=11',
	path: {
		//灵兰登录地址
		loginUrl: baseUrl + "assistant/login",
		//获取医生
		getDoctor: baseUrl + "v1/auth/list/doctor?page=1&size=1000",
		//获取病人 
		getPatient: baseUrl + "v1/auth/list/patient?page=1&size=1000",
		//获取医助
		getAssistant: baseUrl + "v1/auth/list/assistant?page=1&size=100",
		//医助会话列表
		sessionAssistant: baseUrl + "v1/auth/assistant/chatlist",
		//获取病例
		getArchives: baseUrl + "v1/record/medical/list/",
		//得到病人详细
		getPatientInfo: baseUrl + "v1/auth/info/patient/",
		//得到医生详细
		getDoctorInfo: baseUrl + "v1/auth/info/doctor/",
		//发送消息
		sendMsg: baseUrl + "v1/auth/remind/msg/",

	},

	//系统默认设置项
	sysSet: {
		//是否更换背景
		changeBg: "",
		//是否取消声音
		openVoice: true,
		//是否显示头像
		showHead: true,
		//是否支持搜索
		isSearch: true,
		//清空本地缓存
		clearCatch: true,
		//是否同步聊天记录
		asyncRecord: true,
		//刷新是否登录
		refreshLogin: false,
		//是否记住密码
		rememberPwd: true,
		//是否打开浏览器通知（前提允许浏览器通知）
		notificat: false,
		//是否需要置顶新消息项
		stickMsg: false,
		//是否开启ctrl+enter发送消息
		keySend: false,
		//本地最多缓存时间(sm)
		cacheMaxTime: 102366,
		//最多缓存N+1天的聊天内容
		cacheDuration: 3600,
		//是否支持多语言
		language: "en",
		
	},

	//系统状态配置
	sysValue: {}
}