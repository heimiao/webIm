//var baseUrl = 'http://123.58.240.75:8081/tpa';
var baseUrl = "http://123.58.240.210:8080/tpa";
var config = {
    //请求路径
    getbaseUrl: baseUrl + '/zjzd/getBaseUrlList?lx=11',
    path: {

        //灵兰登录地址
        loginUrl: WebIM.baseUrl + "assistant/login",
        //获取医生
        getDoctor: WebIM.baseUrl + "v1/auth/list/doctor?page=1&size=1000",
        //获取病人 
        getPatient: WebIM.baseUrl + "v1/auth/list/patient?page=1&size=1000",
        //获取医助
        getAssistant: WebIM.baseUrl + "v1/auth/list/assistant?page=1&size=100",
        //医助会话列表
        sessionAssistant: WebIM.baseUrl + "v1/auth/assistant/chatlist",
        //获取病例
        getArchives: WebIM.baseUrl + "v1/record/medical/list/",
        //得到病人详细
        getPatientInfo: WebIM.baseUrl + "v1/auth/info/patient/",
        //得到医生详细
        getDoctorInfo: WebIM.baseUrl + "v1/auth/info/doctor/",
        //发送消息
        sendMsg: WebIM.baseUrl + "v1/auth/remind/msg/",


    },

    //系统基本信息配置
    sysInfo: {
        page: {
            limit: 15,
            start: 0,
        },
        selects: {
            //系统默认下拉框

        }
    },
    //系统状态配置
    sysValue: {}
}