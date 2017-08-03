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
		mapArray: function(aryA, aryB, strA, strB, isKeys) {
			//把数组B的字段映射合并到数组A中
			$.each(aryA, function(index, item) {
				$.each(aryB, function(i, m) {
					if(isKeys) {
						if(strA == m[strB]) {
							item[strA] = m;
						}
					} else {
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
				if(!obj[i]) {
					bool = false;
				}
			}
			return bool;
		}
	}

	var methodAlert = {
		options: {
			title: "标题",
			content: "内容",
			width: "",
			height: "",
			type: "alert", //alert cofirm hint
			shade: false,
		},
		createTpl: function(type) {
			var btn = "";
			if(type == "confirm") {
				btn = '<button type="button" class="btn btn-default btn_cancel" onclick=>取消</button>&nbsp;&nbsp;';
			}
			var tpl = '<div class="myAlert">' +
				'<div class="alert_shade" onclick=></div>' +
				'<div class="alert_content">' +
				'<div class="alert_header">' +
				'<h3 class="alert_title">' + this.options.title + '</h3>' +
				'<div class="alert_cancel">X</div>' +
				'</div>' +
				'<div class="alert_body">' +
				'<div class="hint_shade"></div>' +
				'<div class="hint_cont">' + this.options.content + '</div>' +
				'</div>' +
				'<div class="alert_footer">' +
				btn + '<button type="button" class="btn btn-primary btn_sure" onclick=>确定</button>' +
				'</div>' +
				'</div>' +
				'</div>'
			return tpl;
		},
		create: function(opt, type) {
			if(typeof opt == "string")
				this.options.content = opt;
			if(typeof opt == "object") {
				this.options = $.extend(this.options, opt);
			}
			this.options.type = type;
			var alertObj = this.createTpl(type)
			//添加弹框
			$("body").append(alertObj);
		},
		init: function(sure, cancel) {
			//监听我的弹框事件
			$(document).on("click", ".alert_cancel,.btn_cancel", function() {
				methodAlert.destroy();
				if(cancel && methodAlert.options.type != "alert")
					cancel();
			})
			$(document).on("click", ".btn_sure", function() {
				methodAlert.destroy();
				if(sure && methodAlert.options.type != "alert")
					sure();
			})
		},
		destroy: function() {
			$(document).find(".myAlert").remove();
		}
	}
	fupin.alert = function(opt) {
		methodAlert.create(opt, "alert");
		methodAlert.init();
	};
	fupin.confirm = function(option, sure, cancel) {
		methodAlert.create(option, "confirm");
		methodAlert.init(sure, cancel);
	};
	_w.fupin = fupin || {};
}(window, jQuery));