myApp.controller("notice", ["$scope", "$state", "$http", "$stateParams",
	function($scope, $state, $http, $stateParams) {
		var notice = {} || notice;
		notice.urlParam = $stateParams;
		notice.sendParam = [
			// {
			// 	"title": '市扶农办2016年度政府信息公开工作报告',
			// 	"time":　'2017.02.07',
			// 	'name': '张家口市扶贫和农业开发办公室',
			// },
			// {
			// 	"title": '市扶农办召开2016年扶贫对象动态调整和贫困退出工作培训会议',
			// 	"time":　'2017.02.28',
			// 	'name': '河北省扶贫开发办公室',
			// },
			// {
			// 	"title": '我省启动脱贫攻坚故事传讲活动',
			// 	"time":　'2017.03.27',
			// 	'name': '河北省扶贫开发办公室',
			// },
			{
				"title": '关于进一步完善信息工作评价通报制度的通知',
				"time":　'2017.06.06',
				'name': '河北省扶贫开发办公室',
			},
		];

		$scope.notice = notice;
	}
]);