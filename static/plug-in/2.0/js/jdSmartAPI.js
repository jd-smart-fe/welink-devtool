//api
function JDSmartFun() {
    var _this = this;
    //初始化信息
    this.getInitData = function (callback) {
        JDSMART.io.initDeviceData(function (suc) {
            callback(suc);
        });
    }
    //toast
    this.toast = function (str) {
        JDSMART.app.toast({ "message": str }, null);
    }
    //初始化设备信息
    this.initDeviceData = function (callback) {
        JDSMART.io.initDeviceData(function (res) {
            if (typeof (res) == "string") {
                res = JSON.parse(res);
            }
            callback(res);
        }, function (error) {
            _this.toast(error.errorInfo);
        })
    }
    //设备快照
    this.getSnapshot = function (callback) {
        JDSMART.io.getSnapshot(	// 获取设备快照接口
		    function (res) {
		        // 执行成功的回调
		        if (typeof (res) == "string") {
		            res = JSON.parse(res);
		        }
		        callback(res);
		    },
            function (error) {
                // 执行失败的回调
                _this.toast(error.errorInfo);
            });
    }
    //设备快照
    this.getSnapshotByMode = function (callback) {
        JDSMART.io.getSnapshotByMode(1,	// 获取设备快照接口
		    function (res) {
		        // 执行成功的回调
		        if (typeof (res) == "string") {
		            res = JSON.parse(res);
		        }
		        callback(res);
		    },
            function (error) {
                // 执行失败的回调
                _this.toast(error.errorInfo);
            });
    }
    //控制设备
    this.controlDevice= function(cmd,callback) {
        JDSMART.io.controlDevice(  // 控制设备接口
	    cmd,
		function (res) {
		    // 执行成功的回调
		    callback(res)
		},
        function (error) {
            // 执行失败的回调
            _this.toast(error.errorInfo);
        });
    }
    //设置app头部显示当前设备是否在线
    this.appConfig= function (param) {
        JDSMART.app.config(
        {
            showBack: true,
            showShare: true,
            showMore: true,
            showOnline: param
        });
    }

    //注册后退按钮
    this.configActionBar = function (param) {
        JDSMART.util.configActionBar(param);
    }

}
var jdsmart=new JDSmartFun();