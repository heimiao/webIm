myApp.directive('menu', [function() {
	return {
		//		require: "ngModel",
		restrict: 'ECMA',
		link: function(scope, element, attr, ngModel) {
			//var ue = UE.getEditor(element);
			$(element).find(".panniu").click(function() {
				$(element).find("main").toggleClass("scale-down");
				$(element).find(".cd-nav-container").toggleClass("is-visible");
				$(element).find(".cd-overlay").toggleClass("is-visible");
			})
			$(element).on("click", ".cd-close-nav", function() {
				$(element).find("main").toggleClass("scale-down");
				$(element).find(".cd-nav-container").toggleClass("is-visible");
				$(element).find(".cd-overlay").toggleClass("is-visible");
			})

		}
	};
}])