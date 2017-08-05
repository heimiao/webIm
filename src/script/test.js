/*//01 - 人均纯收入计算
addRjcsr(pkhjc, income) {
	var rksl = 0;
	//判断人员变更 rybg 为（空、07、05、06）时rksl+1
	pkhjc.map((data, i) => {
		if(data.rybg == "07" || data.rybg == "" || data.rybg == "05" || data.rybg == "06") {
			rksl = rksl + 1;
		}
	})
	//人员变更没有值 rksl设置为 1
	if(rksl == 0) {
		rksl = 1;
	}
	//分别判断下列参数是否有值，有值则相加
	//gzxsr工资性收入,jtswzsk家庭实物折算款,zyxsr转移性收入,ccxsr财产性收入,scjyxsr生产经营性收入,scjyxzc生产经营性支出
	var zsr = (isNaN(income["gzxsr"]) ? 0 : income["gzxsr"]) + (isNaN(income["jtswzsk"]) ? 0 : income["jtswzsk"]) +
		(isNaN(income["zyxsr"]) ? 0 : income["zyxsr"]) + (isNaN(income["ccxsr"]) ? 0 : income["ccxsr"]) +
		(isNaN(income["scjyxsr"]) ? 0 : income["scjyxsr"]) - (isNaN(income["scjyxzc"]) ? 0 : income["scjyxzc"]);
	//将计算后的值除以人员变更记录，得到人均纯收入rjcsr
	var rjcsr = zsr / rksl;
	//返回计算结果
	return Math.round(rjcsr * 100) / 100;
}*/

/*//是否参加城乡居民基本养老保险	sfcjcxjmjbylbx
//H14年龄						nl
//A8在校生情况					zxsqk
if(
(data.sfcjcxjmjbylbx == "否" &&data.nl >= 16 && data.zxsqk == "01" &&	data.nl <= 60) ||
(!data.sfcjcxjmjbylbx && data.nl >= 16 && data.zxsqk == "01" && data.nl <= 60) || 
(!data.sfcjcxjmjbylbx && data.nl >= 16 && !data.zxsqk && data.nl <= 60) || 
(data.sfcjcxjmjbylbx == "否" && data.nl >= 16 && !data.zxsqk && data.nl <= 60)
){
checkylbx = 1;
}*/