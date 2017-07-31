//保存，或者修改，如果有index_id则为修改没有则为添加
dt.request({
	rqstName: "low_family", //'low_family', 'low_village', 'nature_village', 'relief_project'
	type: "create", //select,delete,put,selectById,
	data: {
		index_id: 2,
		name: "娜可露露",
		age: 258,
		address: "河北"
	},
	success: function(args) {
		console.log(args);
	},
	'error': function(args) {

	}
});
//根据id获取详细信息
dt.request({
	rqstName: "low_family", //'low_family', 'low_village', 'nature_village', 'relief_project'
	type: "selectById", //select,delete,put,selectById,
	param: {
		index_id: 4
	},
	success: function(args) {
		console.log(args);
	},
	'error': function(args) {

	}
});

//获取所有列表列表
dt.request({
	rqstName: "low_family", //'low_family', 'low_village', 'nature_village', 'relief_project'
	type: "select", //select,delete,put,selectById,
	success: function(args) {
		console.log(args);
	},
	'error': function(args) {

	}
});

//根据id删除
dt.request({
	rqstName: "low_family", //'low_family', 'low_village', 'nature_village', 'relief_project'
	type: "delete", //select,delete,put,selectById,
	param: {
		index_id: 4
	},
	success: function(args) {
		console.log(args);
	},
	'error': function(args) {

	}
});