myApp.directive('menu', [function() {
	return {
		//		require: "ngModel",
		restrict: 'ECMA',
		link: function(scope, element, attr, ngModel) {
			//var ue = UE.getEditor(element);
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
}]);
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
			'<div  class="township">' +
			'<span class="name" ng-bind="myInit">全部行政村</span><span class="triangle"></span>' +
			'</div>' +
			'<div class="townshipList">' +
			'<div id="">全部</div>' +
			'</div>' +
			'</div>',
		replace: true,
		link: function(scope, element, attr, ngModel) {
			$(element).find(".township").click(function() {

				console.log(scope.source);
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
				if(scope.myNgClick)
					scope.myNgClick(scope.myNgModel);
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