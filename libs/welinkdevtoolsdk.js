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
			configActionBar: function (options) {
				window._nativeBar.setBar(options);
			},
			closeWindow: function () {
				console.log('closeWindow');
			},

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
// wsJS.startServer();

window.JDSMART.NativeBarUtils = function () {
	this.nativeAdd = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAJFBMVEUAAAD/XFz/XFz/XFz/XFz/XFz/XFz/XFz/XFz/XFz/XFz/XFxzczHdAAAAC3RSTlMAHesh8eg63dwRDvm0evsAAABWSURBVDjLY0ACjC2ODNgBs/dGXDLaozKjMgwMnNG7kLnCxnAgpr0NwTNkKFKCg6Ddm4LgHHWG3bgAgzcOiS0MgggAtAeJh+a2QRtuozL0kcEsxXCXfACkzViDt3JeiAAAAABJRU5ErkJggg==';
	this.nativeBack = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAZlBMVEUAAAD/XV3/XV3/XV3/XV3/Zmb/Xl7/XV3/Xl7/XV3/Xl7/X1//X1//XV3/XV3/Xl7/Xl7/X1//XV3/XV3/XV3/XV3/XV3/XV3/YWH/Xl7/Xl7/XFz/XV3/XFz/Xl7/X1//XFz/W1sO8d5cAAAAIHRSTlMAy7Hr2BMPNyXVQSEd5TMsFwnSwbZHPN45uq2op3lvUZ9Zjv4AAAC/SURBVEjHtdbLEoIwDIXhVq2KlYqiCF6b939JKS66YAF/Zuj+myRdJMdMP2/fhrwkYvycidhfYv++RBRJ2ACFWI9rHOeL00YlZNka4S8qKmogdlzck+gcFVciSiqaQay2S4rDugeCRVQIMPkt10CCT/4Au8ENm+EJhGmTeAEACGgMjA8+mRhHe+OG99YkI9CUvE6bjWpd8KVEl2WnMHVFTNCYIh8LfpL44dPVwUfcYyPZoEDCYw8MVzIKVzTC/QAh6h+KbFtcoQAAAABJRU5ErkJggg==';
	this.nativeClose = 'ddata:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAVFBMVEUAAAD/WVn/X1//V1f/X1//mZn/ZWX/ZGT/Vlb/dHT/dXX/d3f/mpr/W1v/d3f/mpr/ZGT/mZn/XFz/XV3/XFz/XV3/XV3/W1v/XFz/XFz/W1v/XFy0PgwFAAAAG3RSTlMA/rf8tSaoqf0xLysh+SgdqCXdraLBCdCYjg9KbtF1AAABP0lEQVRIx7XUy46DMAyFYZOmUBKScO/F7/+eQybMHFUVsrvg7LL4JCSsn8hN4xxJtTiPkyNaZ+ZgvUZ4G5jnlV533ma8Qhjedn/R+twoV9ZJwtmKmcNzJUr9JRvjBGGyuPQpP1IDI4nmV8C0x6KFKOuKse2hsEV0RB9GFNgAcywGetu1vsFgELf6SiQYQcB8/FMHcWhMNhAGQjaygMGNegjRyAJmv52YH3G/EgjJQAgb6mzYxmg5i3ogEk2fTViWkEWfhbiur3hf1XdEKlOHIkINISyZQkwi7eJSyBK1wpu/DzNeKSz/z8KIhQvWBjRRU7iqSampdE1Er9A3tVCaVmii0KuTmzhom4hendhE930TzflN9Kc3Eb06s4konLaJNKNwuibONKJwuiaONG0QQjKBeaJ2Gh8QknmMU0vf7wfE/C45QGAQ/wAAAABJRU5ErkJggg==';
	this.nativeMore = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAOVBMVEUAAAD/XFz/Wlr/dXX/Wlr/Wlr/ZWX/bm7/W1v/XFz/XFz/WVn/Wlr/aGj/Y2P/Y2P/Wlr/WVn/XFxv1RmRAAAAEnRSTlMA68MLvrhqBRXj2s6vY2FXHAFFMWPXAAAAhUlEQVRIx+3SSQ7DMAhAUQzGZB58/8M2KnZplmEZ8Xd+UeQRoih6RVQwpbzKjfJFhcCS9SJUOrB+4wF6Q1bKf8RKeADQXFssfQ7shNRIuNNMUOqvHbTNaGu0GxVAGyz6+WQjPtUWI4Rkg6ktYjQaRW0ySo5fHAtzbN9xyM+v0vFgoih6Qx/eHRYNPrMj0gAAAABJRU5ErkJggg==';
	this.nativeSetting = 'data:image/png;base64,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';
	this.button1 = null;
	this.button2 = null;
	this.button3 = null;
	this.button4 = null;
	this.JDSmartNativeBarBox = null;
}
window.JDSMART.NativeBarUtils.prototype = {
	construct: this,
	init: function () {
		this._createJDSmartNativeBarSytle();
		var JDSmartNativeBarBox = this._createJDSmartNativeBarBox();
		var body = document.querySelector('body');
		body.insertBefore(JDSmartNativeBarBox, body.childNodes[0]);
	},
	setBar: function (options) {
		// 校验参数合法性
		if (!(options.what && options.display && options.callBackName)) {
			console.warn('configActionBar的参数不正确');
			return;
		}
		if (!(options.what.length === options.display.length && options.what.length === options.callBackName.length)) {
			console.warn('configActionBar的参数个数不正确');
			return;
		}
		var nativeBox = this.JDSmartNativeBarBox;

		var what = options.what;
		// 是否要显示button2或button3
		this._showButton2OrButton3(what);
		var what = options.what;
		var display = options.display;

		var callBackName = options.callBackName;
		// 创建一个空对象用于合并what、display。
		var whatDisply = Object.create(null);
		// 创建一个空对象用于合并what、callBackName。
		var whatCallBackName = Object.create(null);

		// 合并对象
		what.forEach(function (item, index) {
			whatDisply[item] = display[index];
			whatCallBackName[item] = callBackName[index];
		});
		// 设置按钮内容
		this._setNativeBarContent(whatDisply);
		// 注册事件
		const nativeBarHandle = this._nativeBarHandle.bind(this, options, whatCallBackName);
		// 删除时间代理
		nativeBox.removeEventListener('click', nativeBarHandle);
		// 添加时间代理
		nativeBox.addEventListener('click', nativeBarHandle);
	},
	_createJDSmartNativeBarSytle: function () {
		var JDSmartNativeBarSytle = document.createElement('style');
		const cls = `
		*{
			margin:0;
			padding:0;
		}
		.jd-smart-native-bar-box{
			height: 64px;
			text-align: center;
			line-height: 64px;
			display: flex;
			justify-content: space-between;
			border-bottom: 1px #ccc solid;
		}
		.jd-smart-native-bar-box-goback{
			background-image: url(${this.nativeBack});
			background-repeat: no-repeat;
			background-position: center center;
			background-size: 50%;
			width:50px;
		}
		.jd-smart-native-bar-box-setting{
			background-image: url(${this.nativeSetting});
			background-repeat: no-repeat;
			background-position: center center;
			background-size: 50%;
			width:50px;
		}
		.jd-smart-native-bar-item{

		}
		.jd-smart-native-bar-box-button2{
			background-repeat: no-repeat;
			background-position: center center;
			background-size: 50%;
			display:none;
			width:50px;
		}
		.jd-smart-native-bar-box-button3{
			background-repeat: no-repeat;
			background-position: center center;
			background-size: 50%;
			display:none;
			width:50px;
		}
		`;
		JDSmartNativeBarSytle.innerHTML = cls;
		var head = document.querySelector('head');
		head.appendChild(JDSmartNativeBarSytle);
	},
	_createElement: function (domName, text, ...cls) {
		var box = document.createElement(domName);
		box.classList.add(...cls);
		if (text) {
			box.innerHTML = text;
		}
		return box;
	},
	_createJDSmartNativeBarBox: function () {
		this.JDSmartNativeBarBox = this._createElement('div', null, 'jd-smart-native-bar-box');
		// 后退按钮
		var JDSmartNativeGobackArrow = this._createElement('div', null, 'jd-smart-native-bar-box-goback', 'jd-smart-native-bar-button1');
		JDSmartNativeGobackArrow.dataset.button = 'button1';
		this.button1 = JDSmartNativeGobackArrow;
		this.JDSmartNativeBarBox.appendChild(JDSmartNativeGobackArrow);

		// button2
		var JDSmartNativeButton2 = this._createElement('div', 'button2', 'jd-smart-native-bar-box-button2', 'jd-smart-native-bar-button2');
		JDSmartNativeButton2.dataset.button = 'button2';
		this.button2 = JDSmartNativeButton2;
		this.JDSmartNativeBarBox.appendChild(JDSmartNativeButton2);


		// 标题
		var JDSmartNativeBaTitle = this._createElement('div', '设备详情', 'jd-smart-native-bar-title');
		this.JDSmartNativeBarBox.appendChild(JDSmartNativeBaTitle);

		// button3
		var JDSmartNativeButton3 = this._createElement('div', 'button3', 'jd-smart-native-bar-box-button3', 'jd-smart-native-bar-button3');
		JDSmartNativeButton3.dataset.button = 'button3';
		this.button3 = JDSmartNativeButton3;
		this.JDSmartNativeBarBox.appendChild(JDSmartNativeButton3);

		// 设置
		var JDSmartNativeBaSetting = this._createElement('div', null, 'jd-smart-native-bar-box-setting', 'jd-smart-native-bar-button4');
		JDSmartNativeBaSetting.dataset.button = 'button4';
		this.button4 = JDSmartNativeBaSetting;
		this.JDSmartNativeBarBox.appendChild(JDSmartNativeBaSetting);
		return this.JDSmartNativeBarBox;
	},


	_setNativeBarContent: function (whatDisply) {
		var buttons = {
			button1: this.button1,
			button2: this.button2,
			button3: this.button3,
			button4: this.button4,
		}
		this._setNativeBarButtonContent(buttons, whatDisply);
	},
	_setNativeBarButtonContent: function (doms, whatDisply) {
		var regex = /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/;
		var defualtImages = {
			drawable_back: this.nativeBack,
			drawable_setting: this.nativeSetting,
			drawable_more: this.nativeMore,
			drawable_add: this.nativeAdd,
			drawable_close: this.nativeClose,
		}
		for (var item in whatDisply) {
			if (!Object.prototype.hasOwnProperty.call(doms, item)) {
				continue;
			}
			if (whatDisply[item]) {
				if (regex.test(whatDisply[item])) {
					doms[item].style.backgroundImage = `url(${whatDisply[item]})`;
					doms[item].innerHTML = '';
				} else {

					if (defualtImages[whatDisply[item]]) {
						doms[item].innerHTML = '';
						doms[item].style.backgroundImage = `url(${defualtImages[whatDisply[item]]})`
					} else {
						doms[item].style.backgroundImage = 'none';
						doms[item].innerHTML = whatDisply[item];
					}

				}
			}
		}

	},
	_showButton2OrButton3: function (what) {
		var button2 = this.button2;
		var button3 = this.button3;
		button2.style.display = 'none';
		button3.style.display = 'none';
		what.forEach(function (item, index) {
			if (item === 'button2') {
				button2.style.display = 'block';
			}
			if (item === 'button3') {
				button3.style.display = 'block';
			}
		});
	},
	_nativeBarHandle: function (options, whatCallBackName, e) {
		var button = e.target.dataset.button;
		if (!button) {
			return;
		}
		var callBackName = whatCallBackName[button];
		if (!callBackName) {
			return;
		}
		window[callBackName]&&window[callBackName]();
	},
}
window.addEventListener('load', function () {
	window._nativeBar = new window.JDSMART.NativeBarUtils();
	window._nativeBar.init();
});