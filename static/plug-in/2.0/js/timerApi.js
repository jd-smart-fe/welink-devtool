function TimerApi(feedId) {
    this.feedId = feedId;
}
TimerApi.prototype = {
    addTask: function (param, callback) {
        var timedTaskParam = {
            "timed_task":
            {
                app_time: this._getDateTimeNow(),//当前时间
                task_name: param.task_name,
                task_time_express: param.task_time_express,
                task_express: [
                    {
                        "feed_id": this.feedId,
                        "stream": param.task_express.stream,
                    }
                ],
                tags: "",
                task_type: 1,
                pmg_setting: param.pmg_setting
            }
        }

        timedTaskParam.timed_task = JSON.stringify(timedTaskParam.timed_task);

        //调用添加定时api
        var url = "service/addTimedTask";
        JDSMART.util.post(url, timedTaskParam, function (res) {
            //jdsmart.toast(JSON.stringify(res));
            if (res.status == 0) {
                if (JSON.parse(res.result).task_id == 0) {//JSON.parse(res.result)这里需要转一下json，因为返回的是一个字符串
                    jdsmart.toast("定时任务有重复");
                    return;
                }
                if (callback) {
                    callback(res);
                }
            } else {
                jdsmart.toast(res.error.errorInfo);
            }
        });
    },
    getTimerTaskList: function (callback) {
        var url = "service/getTimedTaskByFeedIds";
        var param = {
            "feed_ids": [this.feedId],
            "tags": ""
        }
        JDSMART.util.post(url, param, function (res) {
            //console.debug(res);
            if (res.status == 0) {
                if (callback) {
                    callback(res);
                }
            } else {
                jdsmart.toast(res.error.errorInfo);
            }
        });

    },
    _getDateTimeNow: function () {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes();
        console.log(currentdate);
        return currentdate;
    },
    removeTimedTask: function (taskId, callback) {
        var url = "service/removeTimedTask";
        var data = { task_ids: [taskId] };
        JDSMART.util.post(url, data, function (res) {
            if (res.status == 0) {
                if (callback) {
                    callback(res);
                }
            } else {
                jdsmart.toast(res.error.errorInfo);
            }
        });
    },
    controlTimedTask: function (obj, callback) {
        var url = "service/controlTimedTask";
        var data = { "task_ids": "[" + obj.taskId + "]", "control": obj.control };
        JDSMART.util.post(url, data, function (res) {
            if (res.status == 0) {
                if (callback) {
                    callback(res);
                }
            } else {
                jdsmart.toast(res.error.errorInfo);
            }
        });
    },
    modifyTimedTask: function (param, callback) {
        var url="service/modifyTimedTask";
        var data = {
            "timed_task": {
                "app_time": this._getDateTimeNow(),
                "task_id": param.task_id,
                "task_name": param.task_name,
                "task_time_express": param.task_time_express,
                "task_express": [
                    {
                        "feed_id": this.feedId,
                        "stream": param.task_express.stream
                    }
                ],
                "tags": "",
                "task_type": 1,
                "pmg_setting": param.pmg_setting
            }
        }
       JDSMART.util.post(url,data,function(res){
           if (res.status == 0) {
                if (callback) {
                    callback(res);
                }
            } else {
                jdsmart.toast(res.error.errorInfo);
            }
       })

    }


}
