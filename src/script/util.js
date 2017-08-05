//类工具
;
(function(_w, $) {
	'use strict';
	//扩展数组原型
	Array.prototype.remove = function(obj) {
		var returnArray = [];
		for(var i = 0; i < this.length; i++) {
			if(i != obj) {
				returnArray.push(this[i]);
			}
		}
		return returnArray;
	};
	var fupin = {
		mapArray: function(aryA, aryB, strA, strB) {
			//			console.log(aryA);
			//把数组B的字段映射合并到数组A中
			$.each(aryA, function(index, item) {
				$.each(aryB, function(i, m) {
					if(item) {
						if(item[strA] == m[strB]) {
							item[strA] = m;
						}
					}
				});
			});
			return aryA;
		},
		localCache: function(data) {
			window.localStorage.setItem("low_family", data);
		},
		randomChat: function() {
			var x = "0123456789qwertyuioplkjhgfdsazxcvbnm";
			var tmp = "";
			var timestamp = new Date().getTime();
			for(var i = 0; i < 15; i++) {
				tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
			}
			return timestamp + tmp;
		},
		lineToLocalData: function(objA, objB) {
			//按B的结构来把数组A给分拆开			
			try {
				if(typeof objA == "object") {
					$.each(objB, function(index, item) {
						for(var j in item) {
							for(var it in objA) {
								if(j == it) {
									item[j] = objA[it];
								}
							}
						}
					});
				}
			} catch(e) {
				console.error(e);
			}
			return objB;
		},
		isValid: function(obj) {
			var bool = true;
			if($.isEmptyObject(obj)) {
				bool = false;
			}
			for(var i in obj) {
				if(obj[i]) {
					bool = false;
				}
			}
			return bool;
		},
		getCacheData: function(id, type) {
			var data;
			try {
				if(JSON.parse(localStorage.getItem("low_family"))) {
					var localUserId = type == "net" ?
						JSON.parse(localStorage.getItem("low_family")).baseInfo_model.id :
						JSON.parse(localStorage.getItem("low_family")).index_id;
					data = (localUserId == id) ?
						JSON.parse(localStorage.getItem("low_family")) : "";
				}
			} catch(e) {
				console.error("判断本地是否有数据，json转化错误")
			}
			return data;
		},
		saveLocalData: function(data) {
			dt.request({
				rqstName: "low_family", //'low_family', 'low_village', 'nature_village', 'relief_project'
				type: "put", //select,delete,put,selectById,
				data: data,
				success: function(args) {
					if(args.type == "success") {
						//						fupin.localCache(JSON.stringify(args));
						window.location.href = "#/low_family_draft";
						//						$state.go("lowFamilyDraft");
					}
				},
				'error': function(data) {}
			});
		},
		addRjcsr: function(pkhjc, income) {
			//人均收入
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
		},
		addScjyxzc: function(income) {
			//jtjyfyzc家庭经营费用支出,qtscjyxzc其他生产经营性支,sfzcA43b税费支出
			var scjyxzc = (isNaN(income["jtjyfyzc"]) ? 0 : income["jtjyfyzc"]) + (isNaN(income["qtscjyxzc"]) ? 0 : income["qtscjyxzc"]) +
				(isNaN(income["sfzc"]) ? 0 : income["sfzc"]);
			return Math.round(scjyxzc * 100) / 100;
		},
		addZyxsr: function(income) {
			//wbj五保金，jhsyj计划生育金，dbj低保金，qtzyxsr其他转移性收入，stbcj生态补偿金
			var zyxsr = (isNaN(income["wbj"]) ? 0 : income["wbj"]) + (isNaN(income["jhsyj"]) ? 0 : income["jhsyj"]) +
				(isNaN(income["dbj"]) ? 0 : income["dbj"]) + (isNaN(income["qtzyxsr"]) ? 0 : income["qtzyxsr"]) + (isNaN(income["stbcj"]) ? 0 : income["stbcj"]);
			return Math.round(zyxsr * 100) / 100;
		}
	}
	var methodAlert = {
		options: {
			title: "温馨提示",
			content: "内容",
			width: "",
			height: "",
			type: "alert", //alert cofirm hint
			shade: false,
		},
		createTpl: function(type) {
			var btn = "";
			if(type == "confirm") {
				btn = '<div class="btn_cancel cancel" onclick=>取消</div>';
			}
			var tpl = '<div class="myAlert">' +
				'<div class="alert_shade" onclick=></div>' +
				'<div class="alert_content">' +
				'<div class="alert_header">' +
				'<span class="alert_title">' + this.options.title + '</span>' +
				'</div>' +
				'<div class="alert_body">' +
				'<div class="hint_shade"></div>' +
				'<div class="hint_cont">' + this.options.content + '</div>' +
				'</div>' +
				'<div class="alert_footer border-t">'
			if(type == "confirm") {
				tpl += btn + '<div class="btn_sures determine" onclick=>保存到草稿</div>'
			} else {
				tpl += '<div class="btn_sures determine" style="width:100%; border-bottom-left-radius: 8px;" onclick=>确定</div>'
			}
			tpl += '</div>' +
				'</div>' +
				'</div>'
			return tpl;
		},
		create: function(opt, type, sure, cancel) {
			if(typeof opt == "string")
				this.options.content = opt;
			if(typeof opt == "object") {
				this.options = $.extend(this.options, opt);
			}
			this.options.type = type;
			var alertObj = this.createTpl(type)
			//添加弹框
			var model = document.createElement("div");
			$(model).append(alertObj);
			$("body").append(model);
			if(type == "confirm") {
				$(model).find(".alert_cancel,.btn_cancel").on("click", function() {
					$(model).remove();
					cancel();
				})
				$(model).find("div[class='btn_sures determine']").on("click", function() {
					$(model).remove();
					sure();
				})
			} else {
				$(model).find("div[class='btn_sures determine']").on("click", function() {
					$(model).remove();
					try {
						sure();
					} catch(e) {

					}
				})
			}
		}
	}
	fupin.alert = function(opt, sure) {
		methodAlert.create(opt, "alert", sure);
		//		methodAlert.init();
	};
	fupin.confirm = function(option, sure, cancel) {

		methodAlert.create(option, "confirm", sure, cancel);
		//		methodAlert.init(sure, cancel);
	};
	_w.fupin = fupin || {};
}(window, jQuery));