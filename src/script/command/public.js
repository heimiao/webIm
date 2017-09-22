//开始时间
myApp.directive('dropdownDirective', function() {
	return {
		restrict: 'AEMC',
		scope: {
			myModel: '=',
			timeStyle: '@',
			first: "@",
			second: "@"
		},
		// replace: true ,
		//template: "<input type='text' ng-model='myModel' value={{myModel}} id={{first}} data-other={{second}} data-type={{timeStyle}}>",
		link: function(scope, element, attr) {
			$(element).find(".dropdown-toggle").click(function() {
				$(element).find(".dropdown-menu").slideToggle();
			})
		}
	};
});
myApp.directive('tabDirective', function() {
	return {
		restrict: 'AEMC',
		scope: {
			myModel: '=',
			first: "@",
			placeholder: '@',
			second: "@"
		},
		//		template: "<input type='text' ng-model='myModel' value={{myModel}} id={{second}} data-other={{first}} placeholder={{placeholder}}>",
		link: function(scope, element, attr) {
			$(element).find(".nav-tab li").click(function() {
				$(".nav-tab li").removeClass("active");
				$(element).find(".tab-pane").removeClass("active");
				$(this).addClass("active");
				$(element).find(".tab-pane").eq($(this).index()).addClass("active");
			})
		}
	};
});

myApp.directive('recordDirective', function() {
	return {
		restrict: 'AEMC',
		scope: {
			myModel: '=',
			first: "@",
			placeholder: '@',
			second: "@"
		},
		//		template: "<input type='text' ng-model='myModel' value={{myModel}} id={{second}} data-other={{first}} placeholder={{placeholder}}>",
		link: function(scope, element, attr) {
			$(element).find(".RecordBtn").click(function() {
				$(element).find(".chatRecord").toggleClass("show")
			})
		}
	};
});

myApp.directive('alertBar', [function() {
	return {
		restrict: 'EA',
		//		templateUrl: '../template/component/alertBar.html',
		template: '<div class="alert alert-{{type || \'info\'}} ngTip" ng-show="message">' +
			'<button type="button" class="close"  ng-click="hideAlert()">' +
			'<span class="glyphicon glyphicon-remove"></span></button> {{message}}</div>',
		scope: {
			message: "=",
			type: "="
		},
		link: function(scope, element, attrs) {
			scope.hideAlert = function() {
				scope.message = null;
				scope.type = null;
			};

		}
	};
}]);