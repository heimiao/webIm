//拦截器服务
myApp.factory('myInterceptor', function($q, $cookies, $cookieStore) {
	return {
		// 可选，拦截成功的请求
		request: function(config) {
			// 进行预处理
			/*	if(typeof($cookieStore.get("cookie")) == "string") {
					console.log("拦截到的是字符串");
				} else*/
			config.headers.inter_type = "h5";
			if(localStorage.getItem("token")) {
				config.headers = config.headers || {};
				config.headers.token = localStorage.getItem("token");
			}
			return config || $q.when(config);
		},
		// 可选，拦截失败的请求
		requestError: function(rejection) {
			// 对失败的请求进行处理
			// ...
			if(canRecover(rejection)) {
				return responseOrNewPromise
			}
			return $q.reject(rejection);
		},
		// 可选，拦截成功的响应
		response: function(response) {
			// 进行预处理
			try {
				if(response.data.message == 1001 || response.data.message == 1002 || response.data.message == 1003) {
					localStorage.token = ""
					location.href = "./"
				}
			} catch(e) {}
			return response || $q.when(reponse);
		},
		// 可选，拦截失败的响应
		responseError: function(rejection) {
			// 对失败的响应进行处理
			// ...
			if(rejection.status == 401) {
				console.log("Access denied (error 401), please login again");
				$location.path('#/login');
			}
			return $q.reject(rejection);
		}
	};
});

//保存服务
myApp.factory("postForm",
	function($http) {
		return {
			saveFrm: function(url, data) {
				return $http.post(url, data, {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					},
					transformRequest: function(request) {
						return $.param(request);
					}
				});
			}
		};
	});