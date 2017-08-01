//类工具
;
(function(_w, $) {
	'use strict';
	var fupin = {
		mapArray: function(aryA, aryB, strA, strB,isKeys) {
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
		}
	}
	_w.fupin = fupin || {};
}(window, jQuery));