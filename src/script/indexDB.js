;
window.indexedDB = window.indexedDB ||
	window.mozIndexedDB ||
	window.webkitIndexedDB ||
	window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction ||
	window.webkitIDBTransaction ||
	window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange ||
	window.webkitIDBKeyRange ||
	window.msIDBKeyRange;
(function(window, $, ng) {
	'use strict';
	var db = {
		version: 1, // important: only use whole numbers!
		objectStoreNameAry: ['low_family', 'low_village', 'nature_village', 'relief_project','other'],
		instance: {},
		upgrade: function(e) {
			var _db = e.target.result,
				names = _db.objectStoreNames,
				nameAry = db.objectStoreNameAry;
			for(var itme in nameAry) {
				_db.createObjectStore(
					nameAry[itme], {
						keyPath: 'index_id',
						autoIncrement: true, //id是自增的
						unique: true,
					});
			}
		},
		errorHandler: function(error) {
			window.alert('error: ' + error.target.code);
		},
		open: function(callback) {
			var request = window.indexedDB.open("fupin", db.version);
			request.onerror = db.errorHandler;
			request.onupgradeneeded = db.upgrade;
			request.onsuccess = function(e) {
				db.instance = request.result;
				db.instance.onerror =
					db.errorHandler;
				callback();
			};
		},
		getObjectStore: function(storeName, mode) {
			var txn, store;
			mode = mode || 'readonly';
			txn = db.instance.transaction(storeName, mode);
			store = txn.objectStore(storeName);
			return store;
		},
		save: function(args) {
			//var p = new Promise(function(resolve, reject) {});
			db.open(function() {
				var store, request,
					mode = 'readwrite';
				store = db.getObjectStore(args.rqstName, mode),
					request = args.data.index_id ?
					store.put(args.data) :
					store.add(args.data);
				request.onsuccess = args.success;
				request.onerror = args.error;
			})
		},
		getAll: function(args) {
			db.open(function() {
				var store = db.getObjectStore(args.rqstName),
					cursor = store.openCursor(),
					data = [];
				cursor.onsuccess = function(e) {
					var result = e.target.result;
					if(result &&
						result !== null) {
						data.push(result.value);
						result.continue();
					} else {
						args.success(data);
					}
				};
				cursor.onerror = args.error;
			});
		},
		getById: function(args) {
			var id = parseInt(args.param.index_id);
			console.log(id);
			db.open(function() {
				var store = db.getObjectStore(args.rqstName),
					request = store.get(id);
				request.onsuccess = function(e) {
					args.success(e.target.result);
				};
				request.onerror = args.error;
			});
		},
		'delete': function(args) {
			var id = parseInt(args.param.index_id);
			db.open(function() {
				var
					mode = 'readwrite',
					store, request;
				store = db.getObjectStore(args.rqstName, mode);
				request = store.delete(id);
				request.onsuccess = args.success;
				request.onerror = args.error;
			});
		},
		deleteAll: function(args) {
			db.open(function() {
				var mode, store, request;
				mode = 'readwrite';
				store = db.getObjectStore(args.rqstName, mode);
				request = store.clear();
				request.onsuccess = args.success;
				request.onerror = args.error;
			});
		}
	};
	var config = {
		"rqstName": "low_family", //'low_family', 'low_village', 'nature_village', 'relief_project'
		"type": "", //select,delete,create,update,
		"data": {},
		'param': "",
		"success": function() {},
		'error': function() {},
	}

	var dt = {
		//贫困户接口
		request: function(data) {
			try {
				switch(data.type) {
					case "delete":
						try {
							db.delete(data);
						} catch(e) {
							console.error("删除数据错误，请查看参数是否正确");
						}
						break;
					case "put":
						try {
							db.save(data);
						} catch(e) {
							console.error("新增数据错误，请查看参数是否正确");
						}
						break;
					case "select":
						try {
							db.getAll(data);
						} catch(e) {
							console.error("查询数据错误，请查看参数是否正确");
						}
						break;
					case "selectById":
						try {
							db.getById(data);
						} catch(e) {
							console.error(e);
							console.error("根据条件查询数据错误，请查看条件是否正确");
						}
						break;
				}
			} catch(e) {
				console.error("参数type不能为空");
			}
		}
	}
	$.extend({
		dt: dt
	});
	ng['dt'] = dt;
	window.dt = dt || {};
}(window, jQuery, angular));