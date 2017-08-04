var baseUrl = 'http://123.58.240.75:8081/tpa';
var config = {
	//请求路径
	getbaseUrl: baseUrl + '/zjzd/getBaseUrlList?lx=11',
	path: {
		//贫困村
		lowFamilyList: "/pkh/queryForPage", //贫困活列表
		lowFamilyById: "/pkh/queryForId", //获取贫困户信息
		assistPersonById: "/bfdx/queryForList", //帮扶人信息
		login: "/dotpalogin",
		getAddress: "/zcjg/queryForZc", //获取地址
		//townShip: baseUrl+ "/zcjg/queryForZc",  //获取乡镇列表
		naturalVillage: "/zrc/queryForPage", //自然村列表
		xingzhengName: "/zcjg/queryForZc", //行政村名字列表
		zrcDetails: "/zrc/queryForId", //自然村列表详情
		zrcEdit: "/zrc/update", //自然村编辑
		addzrc: "/zrc/add", //添加自然村
		//扶贫项目
		projectList: "/xmxx/queryForPage", //扶贫项目列表
		projectAdda: "/xmxx/add", //新增扶贫项目
		projectsjzd: "/zjzd/queryForList?lx=09", //数据字典
		townShip: "/zcjg/queryForZc?lx=01", //获取乡镇列表
		villageAll: "/zcjg/queryForZc?lx=02", //获取所有行政村列表
		villageList: "/pkc/queryForPage", //获取贫困村列表
		queryForZcVillage: "/zcjg/queryForZc", //根据id 查询行政村和或者乡镇
		addVillage: "/pkc/add", //添加贫困村信息
		editVillageCollection: "/pkc/queryForId?id=", //获取贫困村的详情
		updateVillage: "/pkc/update", //更新贫困村的信息
		getTaskForce: "/zcgzdqk/queryForList?fid=", //获取工作队的情况
	},
	changePath: function(args) {
		var ary = {},
			_url = this.oldBaseUrl ? this.oldBaseUrl : baseUrl;
		for(var item in this.path) {
			if(args) {
				ary[item] = this.oldBaseUrl ? this.path[item].replace(_url, args) : args + this.path[item]
			}
		}
		this.oldBaseUrl = args;
		angular.extend(this.path, ary);
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
	sysValue: {
		khyh: [{
			name: "招商银行",
			value: "招商银行",
		}, {
			name: "农业也银行",
			value: "农业也银行",
		}, {
			name: "工商银行",
			value: "工商银行",
		}, {
			name: "人民银行",
			value: "人民银行",
		}],
		//数据状态
		dataStatus: [{
			name: "正确数据",
			value: "0",
		}, {
			name: "有误数据",
			value: "1",
		}],
		//贫困户属性
		bhksx: [{
				value: "ybpkh",
				name: "一般贫困户"
			},
			{
				value: "dbpkh",
				name: "低保贫困户"
			},
			{
				value: "wbpkh",
				name: "五保贫困户"
			},
		],
		// 脱贫状态 tpqk
		tpqk: [{
				value: "05",
				name: "新脱贫贫困户"
			},
			{
				value: "02",
				name: "返贫贫困户"
			},
			{
				value: "03",
				name: "历史已脱贫贫困户"
			},
			{
				value: "04",
				name: "未脱贫贫困户"
			},
		],
		// 不脱贫原因btpyy
		btpyy: [{
				value: "01",
				name: "人均纯收入超过扶贫标准，但没有实现两不愁三保障"
			},
			{
				value: "02",
				name: "虽然享受了扶持政策，但当年扶贫成效不显著"
			},
			{
				value: "03",
				name: "建档立卡“回头看”后新纳入"
			},
			{
				value: "04",
				name: "因残致贫无固定收入"
			},
			{
				value: "05",
				name: "家中有大病、重病病人，正在接受治疗"
			},
			{
				value: "06",
				name: "因病因学支出明显大于收入"
			},
			{
				value: "07",
				name: "收入没有稳定超过贫困退出标准"
			},
			{
				value: "08",
				name: "五保贫困户 "
			},
			{
				value: "09",
				name: "老弱病残等无劳动能力的一类低保对象"
			}, {
				value: "10",
				name: "易地搬迁贫困人口没有取得新房钥匙"
			},
		],
		// A22主要致贫原因(单选):  zyzpyy
		zyzpyy: [{
				value: "01",
				name: "因病"
			},
			{
				value: "02",
				name: "因残"
			},
			{
				value: "03",
				name: "因学 "
			},
			{
				value: "04",
				name: "因灾"
			},
			{
				value: "05",
				name: "缺土地"
			},
			{
				value: "06",
				name: "缺水"
			},
			{
				value: "07",
				name: "缺技术"
			},
			{
				value: "08",
				name: "缺劳动力 "
			},
			{
				value: "09",
				name: "缺资金"
			}, {
				value: "10",
				name: "交通条件落后"
			}, {
				value: "11",
				name: "自身发展动力不足"
			},
		],
		// A35 主要燃料类型 zyrllx
		zyrllx: [{
				value: "01",
				name: "柴草"
			},
			{
				value: "02",
				name: "干畜粪"
			},
			{
				value: "03",
				name: "煤炭 "
			},
			{
				value: "04",
				name: "清洁能源"
			},
			{
				value: "05",
				name: "其他"
			}
		],
		// A30 入户路类型 rhllx
		rhllx: [{
				value: "01",
				name: "泥土路"
			},
			{
				value: "02",
				name: "砂石路"
			},
			{
				value: "03",
				name: "水泥路"
			},
			{
				value: "04",
				name: "沥青路"
			}
		],
		// H8 有无安全住房 ywzf
		ywzf: [{
				value: "01",
				name: "有"
			},
			{
				value: "02",
				name: "危房C类"
			},
			{
				value: "03",
				name: "危房D类"
			}
		],
		// A45 搬迁方式（单选）bqfs
		bqfs: [{
				value: "01",
				name: "行政区整体搬迁"
			},
			{
				value: "02",
				name: "自然村（村民小组）整体搬迁"
			},
			{
				value: "03",
				name: "建档立卡贫困户个别搬迁"
			}
		],
		// A47 安置方式（单选） azfs
		azfs: [{
				value: "jz",
				name: "集中安置"
			},
			{
				value: "fs",
				name: "分散安置"
			}
		],
		// A48 安置地（单选） azd
		azd: [{
				value: "a",
				name: "县城安置"
			},
			{
				value: "b",
				name: "乡镇安置"
			},
			{
				value: "c",
				name: "县外安置"
			},
			{
				value: "d",
				name: "村外安置"
			},
			{
				value: "e",
				name: "村内安置"
			}
		],
		// 与户主关系
		YHZGX: [{
				value: "01",
				name: "本人或户主"
			}, {
				value: "02",
				name: "配偶"
			}, {
				value: "03",
				name: "之子"
			},
			{
				value: "04",
				name: "之女"
			}, {
				value: "05",
				name: "之儿媳"
			}, {
				value: "06",
				name: "之女婿"
			},
			{
				value: "07",
				name: "之孙子"
			}, {
				value: "08",
				name: "之孙女"
			}, {
				value: "09",
				name: "之外孙子"
			},
			{
				value: "10",
				name: "之外孙女"
			}, {
				value: "11",
				name: "之父"
			}, {
				value: "12",
				name: "之母"
			},
			{
				value: "13",
				name: "之岳父"
			}, {
				value: "14",
				name: "之岳母"
			}, {
				value: "15",
				name: "之公公"
			},
			{
				value: "16",
				name: "之婆婆"
			}, {
				value: "17",
				name: "之祖父"
			}, {
				value: "18",
				name: "之祖母"
			},
			{
				value: "19",
				name: "之外祖父"
			}, {
				value: "20",
				name: "之外祖母"
			}, {
				value: "99",
				name: "其他"
			}
		],
		//文化程度
		WHCD: [{
				value: "01",
				name: "文盲或半文盲"
			}, {
				value: "02",
				name: "小学"
			}, {
				value: "03",
				name: "初中"
			},
			{
				value: "04",
				name: "高中"
			}, {
				value: "05",
				name: "大专及以上"
			}, {
				value: "06",
				name: "学龄前儿童"
			}
		],
		//在校情况
		ZXQK: [{
				value: "01",
				name: "非在校生"
			}, {
				value: "02",
				name: "学前教育"
			}, {
				value: "03",
				name: "小学"
			},
			{
				value: "04",
				name: "七年级"
			}, {
				value: "05",
				name: "八年级"
			}, {
				value: "06",
				name: "九年级"
			},
			{
				value: "07",
				name: "高中一年级"
			}, {
				value: "08",
				name: "高中二年级"
			}, {
				value: "09",
				name: "高中三年级"
			},
			{
				value: "10",
				name: "中职一年级"
			}, {
				value: "11",
				name: "中职二年级"
			}, {
				value: "12",
				name: "中职三年级"
			},
			{
				value: "13",
				name: "高职一年级"
			}, {
				value: "14",
				name: "高职二年级"
			}, {
				value: "15",
				name: "高职三年级"
			},
			{
				value: "16",
				name: "大专及以上"
			}
		],
		//健康状况
		JKZK: [{
				value: "01",
				name: "健康"
			}, {
				value: "02",
				name: "长期慢性病"
			}, {
				value: "03",
				name: "大病"
			},
			{
				value: "04",
				name: "残疾"
			}, {
				value: "05",
				name: "死亡"
			}
		],
		//劳动能力
		LDJL: [{
				value: "01",
				name: "普通劳动力"
			}, {
				value: "02",
				name: "技能劳动力"
			}, {
				value: "03",
				name: "丧失劳动力"
			},
			{
				value: "04",
				name: "无劳动力"
			}
		],
		//务工情况
		WGQK: [{
				value: "01",
				name: "乡（镇）内务工"
			}, {
				value: "02",
				name: "乡（镇）外县内务工"
			}, {
				value: "03",
				name: "县外省内务工"
			},
			{
				value: "04",
				name: "省外务工"
			}, {
				value: "05",
				name: "其他"
			}
		],
		//隶属关系
		LSGX: [{
				value: "01",
				name: "中央"
			}, {
				value: "02",
				name: "省"
			}, {
				value: "03",
				name: "市"
			},
			{
				value: "04",
				name: "县"
			}, {
				value: "05",
				name: "乡镇"
			}, {
				value: "06",
				name: "部队"
			},
			{
				value: "07",
				name: "其他"
			}
		],
		//		政治面貌
		ZZMM: [{
				value: "01",
				name: "中共党员"
			}, {
				value: "02",
				name: "中共预备党员"
			}, {
				value: "03",
				name: "共青团员"
			},
			{
				value: "04",
				name: "民革会员"
			}, {
				value: "05",
				name: "民盟盟员"
			}, {
				value: "06",
				name: "民建会员"
			},
			{
				value: "07",
				name: "民进会员"
			}, {
				value: "08",
				name: "农工党党员"
			}, {
				value: "09",
				name: "致公党党员"
			},
			{
				value: "10",
				name: "九三学社社员"
			}, {
				value: "11",
				name: "台盟盟员"
			}, {
				value: "12",
				name: "无党派民主人士"
			},
			{
				value: "13",
				name: "群众"
			}
		],
		//低保贫困类型
		ZZMM: [{
				value: "01",
				name: "中共党员"
			}, {
				value: "02",
				name: "中共预备党员"
			}, {
				value: "03",
				name: "共青团员"
			},
			{
				value: "04",
				name: "民革会员"
			}, {
				value: "05",
				name: "民盟盟员"
			}, {
				value: "06",
				name: "民建会员"
			},
			{
				value: "07",
				name: "民进会员"
			}, {
				value: "08",
				name: "农工党党员"
			}, {
				value: "09",
				name: "致公党党员"
			},
			{
				value: "10",
				name: "九三学社社员"
			}, {
				value: "11",
				name: "台盟盟员"
			}, {
				value: "12",
				name: "无党派民主人士"
			},
			{
				value: "13",
				name: "群众"
			}
		],
		//贫困类型
		PKLX: [{
			value: "01",
			name: "一般贫困户"
		}],
		//五保贫困联系
		WBPKLX: [{
			value: "06",
			name: "五保-分散供养"
		}, {
			value: "07",
			name: "五保-集中供养"
		}],
		//人员变更
		RYBG: [{
				value: "01",
				name: "死亡"
			}, {
				value: "02",
				name: "嫁出"
			}, {
				value: "03",
				name: "出国定居"
			},
			{
				value: "04",
				name: "判刑收监"
			}, {
				value: "05",
				name: "嫁入"
			}, {
				value: "06",
				name: "新生儿"
			},
			{
				value: "07",
				name: "其他转入"
			}, {
				value: "08",
				name: "其他转出"
			}
		],
		//民族
		MZ: [{
				value: "01",
				name: "汉族"
			}, {
				value: "02",
				name: "壮族"
			}, {
				value: "03",
				name: "满族"
			}, {
				value: "04",
				name: "回族"
			},
			{
				value: "05",
				name: "苗族"
			}, {
				value: "06",
				name: "维吾尔族"
			}, {
				value: "07",
				name: "土家族"
			}, {
				value: "08",
				name: "彝族"
			},
			{
				value: "09",
				name: "蒙古族"
			}, {
				value: "10",
				name: "藏族"
			}, {
				value: "11",
				name: "布依族"
			}, {
				value: "12",
				name: "侗族"
			},
			{
				value: "13",
				name: "瑶族"
			}, {
				value: "14",
				name: "朝鲜族"
			}, {
				value: "15",
				name: "白族"
			}, {
				value: "16",
				name: "哈尼族"
			},
			{
				value: "17",
				name: "哈萨克族"
			}, {
				value: "18",
				name: "黎族"
			}, {
				value: "19",
				name: "傣族"
			}, {
				value: "20",
				name: "畲族"
			},
			{
				value: "21",
				name: "傈僳族"
			}, {
				value: "22",
				name: "仡佬族"
			}, {
				value: "23",
				name: "东乡族"
			}, {
				value: "24",
				name: "高山族"
			},
			{
				value: "25",
				name: "拉祜族"
			}, {
				value: "26",
				name: "水族"
			}, {
				value: "27",
				name: "佤族"
			}, {
				value: "28",
				name: "纳西族"
			},
			{
				value: "29",
				name: "羌族"
			}, {
				value: "30",
				name: "土族"
			}, {
				value: "31",
				name: "仫佬族"
			}, {
				value: "32",
				name: "锡伯族"
			},
			{
				value: "33",
				name: "柯尔克孜族"
			}, {
				value: "34",
				name: "达斡尔族"
			}, {
				value: "35",
				name: "景颇族"
			}, {
				value: "36",
				name: "毛南族"
			},
			{
				value: "37",
				name: "撒拉族"
			}, {
				value: "38",
				name: "布朗族"
			}, {
				value: "39",
				name: "塔吉克族"
			}, {
				value: "40",
				name: "阿昌族"
			},
			{
				value: "41",
				name: "普米族"
			}, {
				value: "42",
				name: "鄂温克族"
			}, {
				value: "43",
				name: "怒族"
			}, {
				value: "44",
				name: "京族"
			},
			{
				value: "45",
				name: "基诺族"
			}, {
				value: "46",
				name: "德昂族"
			}, {
				value: "47",
				name: "保安族"
			}, {
				value: "48",
				name: "俄罗斯族"
			},
			{
				value: "49",
				name: "裕固族"
			}, {
				value: "50",
				name: "乌孜别克族"
			}, {
				value: "51",
				name: "门巴族"
			}, {
				value: "52",
				name: "鄂伦春族"
			},
			{
				value: "53",
				name: "独龙族"
			}, {
				value: "54",
				name: "塔塔尔族"
			}, {
				value: "55",
				name: "赫哲族"
			}, {
				value: "56",
				name: "珞巴族"
			}
		],
		year: [{
				name: "2013",
				value: "01",
			},
			{
				name: "2014",
				value: "02",
			},
			{
				name: "2015",
				value: "03",
			},
			{
				name: "2016",
				value: "04",
			},
			{
				name: "2017",
				value: "05",
			},
			{
				name: "2018",
				value: "06",
			},
			{
				name: "2019",
				value: "07",
			},
		]
	}
}
config.changePath(baseUrl);