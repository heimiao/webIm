//类工具
;
(function(_w) {
    'use strict';
    //扩展数组原型
    Array.prototype.remove = function(obj) {
        var returnArray = [];
        for (var i = 0; i < this.length; i++) {
            if (i != obj) {
                returnArray.push(this[i]);
            }
        }
        return returnArray;
    };
    var dtwl = {

    }
    _w.dtwl = dtwl || {};
}(window))