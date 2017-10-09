/**
 * 调试工具需要引用的js
 */
var iJSON = iJSON || { strJSON: (function (c) { if (c == undefined) { return '""' } var d = []; if (typeof c == "string") { return '"' + c.replace(/([\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + '"' } if (typeof c == "object") { if (!c.sort) { for (var b in c) { d.push('"' + b + '":' + iJSON.strJSON(c[b])) } if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(c.toString)) { d.push("toString:" + c.toString().toString()) } d = "{" + d.join() + "}" } else { for (var b = 0, a = c.length; b < a; b++) { d.push(iJSON.strJSON(c[b])) } d = "[" + d.join() + "]" } return d } return c.toString().replace(/\"\:/g, '":""') }), JSONstr: (function (str) { try { return eval("(" + str + ")") } catch (e) { return false } }) };

var params = function (params) {
	function a(obj) {
		var str = '';
		for (var key in params) {
			if (Object.prototype.hasOwnProperty.call(params, key)) {
				if (!str) {
					str += key + '=' + params[key];
				} else {
					str += '&' + key + '=' + params[key]
				}

			}
		}
		return str;
	}
	if (Object.prototype.toString.call(params) === "[object Array]") {
		const str = ''
		params.forEach(function (item, index) {
			str += a(item);
		});
		return str;
	} else if (Object.prototype.toString.call(params) === "[object Object]") {
		return a(params);

	} else {
		return params;
	}
}

	; (function () {

		if (window.JDSMART) { return }

		var JSBridge;
		var readyCallback;
		function init(config) {
			JSBridge = config.bridge;
			JSBridge.init(function (msg, callback) {


			});
			readyCallback();
		}

		function ready(fn) {
			window.setTimeout(fn, 100);
		}

		var fn = {
			getSnapshot: function (successCallback, failedCallback) {
				// pc;
				var data = {
					"type": "getSnapshot",
					"url": "/f/service/getStreamSnapshot",
					"data": ""
				}
				new window.SmartPcSendAjax("", data, function (result) {
					if (result.status != 0) {
						if (failedCallback) {
							failedCallback(result.error);
						}
					}
					else {
						successCallback(result.result);
					}
				});
			},
			getUserId: function (successCallback, failedCallback) {
				// pc;
				var data = {
					"type": "getUserId",
					"url": "/c/service/getUserNewUId",
					"data": ""
				}
				new window.SmartPcSendAjax("", data, function (result) {
					if (result.status != 0) {
						if (failedCallback) {
							failedCallback(result.error);
						}
					}
					else {
						successCallback(result.result);
					}
				});
			},
			getWifiHistory: function (params, successCallback, failedCallback) {
				// pc;
				var data = {
					"type": "getWifiHistory",
					"url": "/f/service/getHistoryData",
					"data": iJSON.strJSON(params)
				}
				new window.SmartPcSendAjax("", data, function (result) {
					if (result.status != 0) {
						if (failedCallback) {
							failedCallback(result.error);
						}
					}
					else {
						successCallback(result.result);
					}
				});
			},
			initDeviceData: function (successCallback) {
				// pc;
				var data = {
					"type": "initDeviceData",
					"url": "/f/service/initDeviceData",
					"data": ""
				}
				new window.SmartPcSendAjax("", data, function (result) {
					if (result.result) {
						result = iJSON.JSONstr(result.result);
					}
					successCallback(result);
				});
			},
			controlDevice: function (params, successCallback, failedCallback) {
				// pc;
				var data = {
					"type": "controlDevice",
					"url": "/f/service/controlDevice",
					"data": iJSON.strJSON(params["command"])
				}
				new window.SmartPcSendAjax("", data, function (result) {
					if (result.status != 0) {
						if (failedCallback) {
							failedCallback(result.error);
						}
					}
					else {
						successCallback(result.result);
					}
				});
			},
			getHistory: function (successCallback) {
				// pc;
				var data = {
					"type": "getSnapshot",
					"url": "/c/service/getProductHistoryRecordList",
					"data": ""
				}
				new window.SmartPcSendAjax("", data, function (result) {
					successCallback(result);
				});
			},
			getRecipeList: function (params, successCallback, failedCallback) {
				// pc;
			},
			getRecipeDetail: function (params, successCallback, failedCallback) {
				// pc;
			},
			excuteRecipe: function (params, successCallback, failedCallback) {
				// pc;
			},
			getCurrentRecipe: function (params, successCallback, failedCallback) {
				// pc;
			}
		};

		var app = {
			getNetworkType: function (successCallback) {
				// pc;
				var result = {
					TypeName: "wifi"
				}
				successCallback(result);
			},
			openUrl: function (url) {
				// pc;
				window.open(url);
			},
			config: function (data) {
				// pc;
			},
			alert: function (data, successCallback) {
				// pc;
				if (window.confirm(data.messageTitle)) {
					successCallback(1);
				}
				else {
					successCallback(0);
				}
			},
			toast: function (data, successCallback) {
				// pc;
			},
			loading: function () {

			},
		};

		var util = {
			get: function (url, callBack) {
				JSBridge.send({ type: 'get', url: url }, function (result) {
					callBack(result);
				});
			},

			post: function (url, params, callBack) {
				// pc;
				var data = {
					"type": "post",
					"url": url,
					"data": iJSON.strJSON(params)
				}
				new window.SmartPcSendAjax("", data, function (result) {
					callBack(result);
				});
			},

			getToken: function (appkey, callBack) {
				JSBridge.send({ type: 'token', data: appkey }, function (result) {
					callBack(result);
				});
			},
			configActionBar: function () {
			},
			closeWindow: function() {

			}
		};

		window.JDSMART = {
			init: init,
			ready: ready,
			io: fn,
			app: app,
			util: util
		};
		try {
			document.addEventListener('JDSmartBridgeReady', function onReady(ev) {
				JDSMART.init({ 'bridge': ev.bridge });
			});
		}
		catch (e) {
		}

	})();
window.SmartPcSendAjax = function (url, data, callBack) {
	var url = url || "/requestServer";
	url = url + "?v=" + new Date().getTime();
	var XHR = null;
	if (window.XMLHttpRequest) {
		XHR = new XMLHttpRequest();
	}
	else if (window.ActiveXObject) {
		XHR = new ActiveXObject("Microsoft.XMLHTTP");
	}

	console.info(`url:${JSON.stringify(data)}`);
	XHR.open("POST", url);
	XHR.setRequestHeader('x-requested-with', 'XMLHttpRequest');
	XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;  charset=utf-8");
	console.log(XHR.responseType)
	XHR.send(params(data));
	XHR.onreadystatechange = function () {
		if ((XHR.readyState == 4) && (XHR.status == 200)) {
			var jsonData = JSON.parse(XHR.responseText);
			callBack(jsonData);
		}
	}
}

window.localWarVersion = 8;
; (function () {
	new window.SmartPcSendAjax("/getLocalVersion", "", function (data) {
		if (data.version < window.localWarVersion) {
			alert("node版本过低，请检查您的node版本");
		}
	});
})();

var wsJS = {};
wsJS.ws = null;
wsJS.startServer = function () {
	window.setTimeout(wsJS.startServer, 5000);
	if (wsJS.ws) {
		return;
	}
	var url = "ws://localhost:3000/websocket";
	if ("WebSocket" in window) {
		wsJS.ws = new WebSocket(url);

	}
	else if ("MozWebSocket" in window) {
		wsJS.ws = new MozWebSocket(url);
	}
	else {
		return;
	}
	wsJS.ws.onopen = function () {
		try {
			console.log("websocket open!");
		} catch (e) { }

	};
	wsJS.ws.onmessage = function (event) {
		try {
			console.log(event.data);
		} catch (e) { }

		if (window.onReceive) {
			window.onReceive(event.data);
		}
	};
	wsJS.ws.onclose = function () {
		wsJS.ws = null;
		try {
			console.log("websocket closed!");
		} catch (e) { }
	};
	wsJS.ws.onerror = function () {
		wsJS.ws = null;
		try {
			console.log("websocket error");
		} catch (e) { }
	};
}
wsJS.startServer();