myApp.controller("home", ["$scope", "$rootScope", "$state", "$http", "$stateParams",
	function($scope, $rootScope, $state, $http, $stateParams) {
		var baseInfo = baseInfo || {};
		baseInfo.chatWindows = baseInfo.chatWindows || {};
		baseInfo.userInfo = baseInfo.userInfo || {};
		baseInfo.userInfo = {
			//系统设置
			sysSet: Config.sysSet,
			//环信帐号
			accountsAry: [],
			//群列表
			roster: {}, //联系人
			friends: {}, //好友
			strangers: {}, //陌生人
			blacklist: {}, //黑名单 
			chatType: "groups", //聊天类型 
			grouplist: {
				doctorList: [],
				patientList: [],
				changedoctor: function(args) {
					//取消当前小红点
					baseInfo.userInfo.grouplist.doctorList.forEach(function(item) {
						if(item._id == args._id) {
							item.cked = true
						} else {
							item.cked = false;
						}
					})
					//显示对应的患者列表
					var patients = args.patients;
					baseInfo.userInfo.grouplist.patientList = patients;
				},
				changepatient: function(args) {
					//取消当前小红点
					baseInfo.userInfo.grouplist.patientList.forEach(function(item) {
						if(item.patient._id == args.patient._id) {
							item.cked = true;
						} else {
							item.cked = false;
						}
					})
					console.log(args);
					//显示对应的对话内容
				}
			},
		}

		//获取群
		baseInfo.getGroupList = function() {
			/*$.get(Config.path.getAssistant).then(function(args) {
				console.log(args);
			})	*/

			var dataList = dataSource.groupList.data || [];
			baseInfo.userInfo.grouplist.doctorList = dataList;
			var patients = dataList[0].patients;
			/*patients.forEach(function(item, index) {
				angular.extend(item, {
					count: 0,
					cked: false,
					state: ""
				})
			})*/
			baseInfo.userInfo.grouplist.patientList = patients;
		}

		baseInfo.getGroupList();
		//从cookie中获取对应的帐号 
		baseInfo.userInfo.accountsAry = userList;

		baseInfo.createWebIm = function(args) {
			var baseChatWin = {}
			baseChatWin.conn = new WebIM.connection({
				isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
				https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
				url: WebIM.config.xmppURL,
				heartBeatWait: WebIM.config.heartBeatWait,
				autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
				autoReconnectInterval: WebIM.config.autoReconnectInterval,
				apiUrl: WebIM.config.apiURL,
				isAutoLogin: true
			});
			baseChatWin.conn.listen({
				onOpened: function(message) { //连接成功回调
					console.log(message);
					//默认获取第一个群
					console.log("连接成功回调");
				},
				onClosed: function(message) {
					console.log(message);
					console.log("连接关闭回调");
				}, //连接关闭回调
				onTextMessage: function(message) {
					//					console.log(message);
					baseInfo.receiveMsg(message);
					console.log("收到文本消息");
				}, //收到文本消息
				onEmojiMessage: function(message) {
					console.log(message);
					console.log("收到表情消息");
				}, //收到表情消息
				onPictureMessage: function(message) {
					console.log(message);
					console.log("收到图片消息");
				}, //收到图片消息
				onFileMessage: function(message) {
					console.log(message);
					console.log("收到文件消息");
				}, //收到文件消息
				onVideoMessage: function(message) {
					console.log("收到视频消息");
				}, //收到视频消息
				onPresence: function(message) {
					console.log(message);
					console.log("聊天室被踢解散等消息");
				}, //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息

				onOnline: function() {
					console.log(message);
					console.log("本机网络连接成功");
				}, //本机网络连接成功
				onOffline: function(message) {
					console.log(message);
					console.log("本机网络掉线");
				}, //本机网络掉线
				onError: function(message) {
					console.log(message);
					console.log("失败回调");
				}, //失败回调
				onReceivedMessage: function(message) {
					console.log(message);
					console.log("收到消息送达客户端回执");
				}, //收到消息送达客户端回执
				onDeliveredMessage: function(message) {
					console.log(message);
					console.log("收到消息送达服务器回执");
				}, //收到消息送达服务器回执
				onReadMessage: function(message) {
					console.log(message);
					console.log("收到消息已读回执");
				}, //收到消息已读回执
				onCreateGroup: function(message) {
					console.log(message);
					console.log("创建群组成功回执");
				}, //创建群组成功回执（需调用createGroupNew）
				onMutedMessage: function(message) {
					console.log(message);
					console.log("如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员");
				} //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
			});
			baseInfo.chatWindows[args.username] = baseChatWin;
			return baseInfo.chatWindows[args.username];
		}

		//登录所有终端
		baseInfo.userInfo.accountsAry.forEach(function(item, index, ary) {
			var chatWin = baseInfo.createWebIm(item);
			var options = {
				apiUrl: WebIM.config.apiURL,
				user: item.username,
				pwd: item.pwd,
				appKey: WebIM.config.appkey,
				resource: Math.floor(Math.random() * 1000),
			};
			chatWin['conn'].open(options);
		})

		//resive
		//接受消息
		baseInfo.receiveMsg = function(args) {
			console.log(args);
			//保存本地数据库

			//把数据追加到页面上

			//改变左侧群列表通知个数

			//

		}

		//发送消息
		baseInfo.sendMsg = function() {
			for(var i = 0; i < 500; i++) {
				var msg = new WebIM.message('txt', Math.floor(Math.random() * 1000)); // 创建文本消息
				var option = {
					msg: 'message content' + i, // 消息内容
					to: '27853758464001', // 接收消息对象(群组id)
					roomType: false,
					chatType: baseInfo.userInfo.chatType,
					success: function() {
						console.log('send room text success');
					},
					fail: function() {
						console.log('failed');
					}
				};
				msg.set(option);
				msg.setGroup('groupchat');
				baseInfo.chatWindows["uazanf8p59c22a42abd91b66"].conn.send(msg.body);
			}

		}

		baseInfo.loginOut = function() {
			//遍历退出
			baseInfo.userInfo.accountsAry.map(function(item, index, ary) {
				baseInfo.chatWindows[item.username].conn.close('logout');
				var charWin = {}
			})
		}
		//根据角色遍历响应的菜单
		$scope.baseInfo = baseInfo;
	}
]);