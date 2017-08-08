/*myApp.directive('menu', [function() {
	return {
		//		require: "ngModel",
		restrict: 'ECMA',
		link: function(scope, element, attr, ngModel) {
			$(element).on("click", ".panniu", function() {
				$(element).find("main").toggleClass("scale-down");
				
				$(element).find(".cd-nav-container").toggleClass("is-visible");
				
				$(element).find(".cd-overlay").toggleClass("is-visible");
			});
			$(element).on("click", ".cd-close-nav", function() {
				$(element).find("main").toggleClass("scale-down");
				$(element).find(".cd-nav-container").toggleClass("is-visible");
				$(element).find(".cd-overlay").toggleClass("is-visible");
			})

		}
	};
}]);*/
//开始时间
myApp.directive('beginTime', function() {
	return {
		restrict: 'AEMC',
		scope: {
			myModel: '=',
			timeStyle: '@',
			first: "@",
			second: "@"
		},
		// replace: true ,
		template: "<input type='text' ng-model='myModel' value={{myModel}} id={{first}} data-other={{second}} data-type={{timeStyle}}>",
		link: function(scope, element, attr) {

			if(!$(attr.first).attr("class")) {
				element.find("input").mobiscroll().date({
					theme: 'android-ics light', //皮肤样式
					display: 'modal', //显示方式
					mode: 'scroller', //日期选择模式
					dateFormat: 'yyyy.mm.dd',
					lang: 'zh',
					showNow: true,
					startInput: '#beginTime',
					endInput: '#endTime',
					nowText: "今天",
					startYear: (new Date()).getFullYear() - 1900, //开始年份
					endYear: (new Date()).getFullYear() + 100, //结束年份
					onSelect: function(valueText, inst) {
						//						console.log(valueText);
						//						console.log(inst);
					}
				});
			}
		}
	};
});
myApp.directive('overTime', function() {
	return {
		restrict: 'AEMC',
		scope: {
			myModel: '=',
			first: "@",
			placeholder: '@',
			second: "@"
		},
		template: "<input type='text' ng-model='myModel' value={{myModel}} id={{second}} data-other={{first}} placeholder={{placeholder}}>",
		link: function(scope, element, attr) {
			if(!$(attr.first).attr("class")) {
				element.find("input").mobiscroll().date({
					theme: 'android-ics light', //皮肤样式
					display: 'modal', //显示方式
					mode: 'scroller', //日期选择模式
					dateFormat: 'yyyy.mm.dd',
					lang: 'zh',
					showNow: true,
					nowText: "今天",
					startInput: '#beginTime',
					endInput: '#endTime',
					startYear: (new Date()).getFullYear() - 1900, //开始年份
					endYear: (new Date()).getFullYear() + 100, //结束年份
					onBeforeShow: function(inst) {
						//	inst.settings.wheels[0].length > 2 ? inst.settings.wheels[0].pop() : null;
					}, //弹掉“日”滚轮  
					onSelect: function(valueText, inst) {
						//选择时间
						// opt.default.minDate = new Date(validity[0], +validity[1] - 1, +validity[2] + 1);

					}
				});
			}
		}
	};
});
myApp.directive('mySelect', [function() {
	return {
		restrict: 'ECMA',
		scope: {
			source: '=',
			myNgModel: '=',
			myNgClick: '=',
			myInit: "@",
		},
		template: '<div>' +
			'<div  class="township poorMa">' +
			'<span class="name" ng-bind="myInit">全部行政村</span><span class="triangle"></span>' +
			'</div>' +
			'<div class="townshipList townMa">' +
			'<div id="">全部</div>' +
			'</div>' +
			'</div>',
		replace: true,
		link: function(scope, element, attr, ngModel) {
			$(element).find(".township").click(function() {
				var str = "";
				if(scope.source.length > 0) {
					$.each(scope.source, function(index, item) {
						str += "<div id=" + (item.id || item.value) + ">" + item.name + "</div>"
					});
				}
				$(this).next(".townshipList").html(str);
				$(this).next(".townshipList").slideToggle(200);
				$(this).toggleClass("township2")
				$(this).find(".name").toggleClass("col-ea3c4c");
			})
			$(element).on("click", ".townshipList>div", function() {
				$(this).parent().slideToggle(200);
				$(element).find(".township").toggleClass("township2");
				$(element).find(".name").toggleClass("col-ea3c4c").html($(this).html());
				scope.myNgModel = $(this).attr("id");
				scope.$apply();
				if(scope.myNgClick) {
					scope.myNgClick(scope.myNgModel);
				}
			});
		}
	};
}])

myApp.directive('pullLoading', [function() {
	return {
		restrict: 'ECMA',
		scope: {
			loadLowFamilyList: '=',
		},
		link: function(scope, element, attr, ngModel) {
			$(element).dropload({
				//获取列表
				domDown: {
					domClass: 'dropload-down',
					domRefresh: '<div class="dropload-refresh"></div>',
					domUpdate: '<div class="dropload-update">↓释放加载</div>',
					domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
				},
				//上拉加载
				loadDownFn: function(me) {
					scope.loadLowFamilyList(me);
				}
			})
		}
	};
}])

myApp.directive('checkboxRadio', [function() {
	return {
		restrict: 'ECMA',
		scope: {
			maxMumber: '=',
			myDisable: "=",
			ngModel: "="
		},
		link: function(scope, element, attr, ngModel) {
			var lenth = $(element).attr("data-max") || 10000;
			$(element).on("click", ".default", function() {
				if($(this).find("input")[0].type == "radio") {
					//获取所有单选
					var name = $(this).find("input").attr("name")
					$(this).parent(".check_radio").find("input[type='radio']").each(function() {
						if($(this).attr("name") == name) {
							$(this).parent().removeClass("cked");
						}
					})
				}
				if($(element).find("input:checked").length >= lenth) {
					//禁用其他的没选中的
					$(element).find("input").each(function() {
						if(!$(this).is(':checked')) {
							$(this).attr("disabled", "true")
						}
					})
				} else {
					$(element).find("input").each(function(idnex, item) {
						$(element).find("input").removeAttr("disabled");
						/*if($(this).attr("my-disable") == true) {
							$(this).attr("disabled", "true")
						}*/
					})
				}

				if($(this).find("input").is(':checked')) {
					$(this).addClass("cked")
				} else {
					$(this).removeClass("cked")
				}
			})
		}
	};
}])

myApp.directive('checkboxRadios', [function() {
	return {

		restrict: 'ECMA',
		link: function(scope, element, attr, ngModel) {
			$(element).on("click", ".default", function() {

				if($(this).find("input")[0].type == "radio") {
					var name = $(this).find("input").attr("name")
					$(this).parent(".check_radio").find("input[type='radio']").each(function() {
						if($(this).attr("name") == name) {
							$(this).parent().removeClass("cked");
						}
					})
				}
				if($(element).find("input:checked").length >= 2) {
					//禁用其他的没选中的
					$(element).find("input").each(function() {
						if(!$(this).is(':checked')) {
							$(this).attr("disabled", "true")
						}
					})
				} else {
					$(element).find("input").each(function(idnex, item) {
						$(element).find("input").removeAttr("disabled");
					})
				}
				if($(this).find("input").is(':checked')) {
					$(this).addClass("cked")
				} else {
					$(this).removeClass("cked")
				}

			})
		}
	};
}])