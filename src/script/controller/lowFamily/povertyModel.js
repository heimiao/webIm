lowFamilyInfoModel = {
	baseInfo_model: {
		id: "",
		qyxz: "",
		qyxzc: "",
		qyzrc: "",
		lxdh: "",
		khyh: "",
		yhzh: "",
		bhksx: "",
		sfjls: "",
		sfdsznh: "",
		sfsnh: "",
		nd: "",
		tpqk: "",
		hzxm: "",
	},
	assistEffect_model: {
		//帮扶成效
		fjybfj: "",
		fdbj: "",
		fwbj: "",
		fylj: "",
		fwfgzbt: "",
		fjybt: "",
		fjbylbx: "",
		fdbbxbx: "",
		fyljz: "",
		fsnhbt: "",
		flszhzb: "",
		ftghlbt: "",
		fcyjb: "",
	},
	familyInfo_model: [] //家庭成员
		,
	assistPerson_model: [] //帮扶责任人
		,
	income_model: {
		//收入
		gzxsr: "",
		scjyxsr: "",
		ccxsr: "",
		zyxsr: "",
		jhsyj: "",
		dbj: "",
		wbj: "",
		ylbzj: "",
		stbcj: "",
		qtzyxsr: "",
		jtswzsk: "",
		rjcsr: "",
		scjyxzc: "",
		jtjyfyzc: "",
		sfzc: "",
		qtscjyxzc: "",
	},
	lifeCondition_model: {
		//生产生活方式
		gdmj: "",
		yxgkmj: "",
		ldmj: "",
		tghlmj: "",
		lgmj: "",
		mcdmj: "",
		smmj: "",
		sftscyd: "",
		yczgljl: "",
		rhllx: "",
		zfmj: "",
		sftshyd: "",
		yssfkn: "",
		yssfaq: "",
		zyrllx: "",
		sfjrnmzyhzs: "",
		ywwscs: "",
	},
	povertyCauses_model: {
		//贫困原因
		zyzpyy: "",
		zpyy_q_yb: "",
		zpyy_q_yc: "",
		zpyy_q_yx: "",
		zpyy_q_yz: "",
		zpyy_q_yqtd: "",
		zpyy_q_yqs: "",
		zpyy_q_yqjs: "",
		zpyy_q_yqzj: "",
		zpyy_q_yqldl: "",
		zpyy_q_yjttjlh: "",
		zpyy_q_yzsfzdlbz: "",
	},
	plantRelocation_model: {
		//易地搬迁
		sfbqh: "",
		bqfs: "",
		azfs: "",
		azd: "",
		bqknczkn_qfzj: "",
		bqknczkn_bqhzbdgz: "",
		bqknczkn_bqhshmzl: "",
		bqknczkn_qt: "",
	},
	pkhzb_model: {
		//计算所得表单
		rjcsr: "", //人均纯收入计算公式见说明文档01
		rjcsrdf: "", //人均纯收入得分=rjcsr > 3026 ? 30 : 0
		scshyd: "", //生产生活用电保障（有 无）
		scshyddf: "", //生产生活用电保障得分（有 10分 无 0
		ysaq: "无", //默认 无
		ysaqdf: 0, //默认 0
		ywzf: "", //安全住房 表单字段ywzf=有时ywzf=
		ywzfdf: "", //安全住房得分（ywzf=有 15分 ywzf=无 
		ypcx: "", //因贫辍学sfypcx=是 时 ypcx=有 否则
		ypcxdf: "", //因贫辍学ypcx=有 ypcxdf=0， ypcx=无 
		hzyl: "", //合作医疗 sfcjxxnchzyl=是时hzyl=参
		hzyldf: "", //hzyl=参加时 15分，hzyl=不参加时 0分
		ylbx: "", //医疗保险 sfcjcxjmjbylbx=是时ylbx=参
		ylbxdf: "", //ylbx=参加 ylbxdf=10，ylbx=不参加 
		zdf: "", //rjsrdf + scshyddf + aqysdf + ypcxdf + 

	}
};
lowFamilyInfoNull = {
	baseInfo_model: {
		id: "",
		nd: "",
		qyxz: "",
		qyxzc: "",
		qyzrc: "",
		lxdh: "",
		khyh: "",
		yhzh: "",
		bhksx: "",
		sfjls: "",
		sfdsznh: "",
		sfsnh: "",
		tpqk: "",
		hzxm: "",
	},
	assistEffect_model: {
		//帮扶成效
		fjybfj: "",
		fdbj: "",
		fwbj: "",
		fylj: "",
		fwfgzbt: "",
		fjybt: "",
		fjbylbx: "",
		fdbbxbx: "",
		fyljz: "",
		fsnhbt: "",
		flszhzb: "",
		ftghlbt: "",
		fcyjb: "",
	},
	familyInfo_model: [] //家庭成员
		,
	assistPerson_model: [] //帮扶责任人
		,
	income_model: {
		//收入
		gzxsr: "",
		scjyxsr: "",
		ccxsr: "",
		zyxsr: "",
		jhsyj: "",
		dbj: "",
		wbj: "",
		ylbzj: "",
		stbcj: "",
		qtzyxsr: "",
		jtswzsk: "",
		rjcsr: "",
		scjyxzc: "",
		jtjyfyzc: "",
		sfzc: "",
		qtscjyxzc: "",
	},
	lifeCondition_model: {
		//生产生活方式
		gdmj: "",
		yxgkmj: "",
		ldmj: "",
		tghlmj: "",
		lgmj: "",
		mcdmj: "",
		smmj: "",
		sftscyd: "",
		yczgljl: "",
		rhllx: "",
		zfmj: "",
		sftshyd: "",
		yssfkn: "",
		yssfaq: "",
		zyrllx: "",
		sfjrnmzyhzs: "",
		ywwscs: "",
	},
	povertyCauses_model: {
		//贫困原因
		zyzpyy: "",
		zpyy_q_yb: "",
		zpyy_q_yc: "",
		zpyy_q_yx: "",
		zpyy_q_yz: "",
		zpyy_q_yqtd: "",
		zpyy_q_yqs: "",
		zpyy_q_yqjs: "",
		zpyy_q_yqzj: "",
		zpyy_q_yqldl: "",
		zpyy_q_yjttjlh: "",
		zpyy_q_yzsfzdlbz: "",
	},
	plantRelocation_model: {
		//易地搬迁
		sfbqh: "",
		bqfs: "",
		azfs: "",
		azd: "",
		bqknczkn_qfzj: "",
		bqknczkn_bqhzbdgz: "",
		bqknczkn_bqhshmzl: "",
		bqknczkn_qt: "",
	},
	pkhzb_model: {
		//计算所得表单
		rjcsr: "", //人均纯收入计算公式见说明文档01
		rjcsrdf: "", //人均纯收入得分=rjcsr > 3026 ? 30 : 0
		scshyd: "", //生产生活用电保障（有 无）
		scshyddf: "", //生产生活用电保障得分（有 10分 无 0
		ysaq: "无", //默认 无
		ysaqdf: 0, //默认 0
		ywzf: "", //安全住房 表单字段ywzf=有时ywzf=
		ywzfdf: "", //安全住房得分（ywzf=有 15分 ywzf=无 
		ypcx: "", //因贫辍学sfypcx=是 时 ypcx=有 否则
		ypcxdf: "", //因贫辍学ypcx=有 ypcxdf=0， ypcx=无 
		hzyl: "", //合作医疗 sfcjxxnchzyl=是时hzyl=参
		hzyldf: "", //hzyl=参加时 15分，hzyl=不参加时 0分
		ylbx: "", //医疗保险 sfcjcxjmjbylbx=是时ylbx=参
		ylbxdf: "", //ylbx=参加 ylbxdf=10，ylbx=不参加 
		zdf: "", //rjsrdf + scshyddf + aqysdf + ypcxdf + 

	}
};