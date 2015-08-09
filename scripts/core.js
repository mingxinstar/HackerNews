/**
 * core模块，处理部分核心业务
 *
 * @author mingxin.huang
 * @update 2018.08.08
 */

define(function (require) {
    var _ = require('underscore');

    /**
     * 获取对应的请求或者文件地址
     * @param  {String} url  出入的地址
     * @param  {String} type 地址类型
     * @return {String}      拼接好的地址
     */
    function getRoot (url, type) {
        type = type || 'api';

        return 'http'+(type==='api' ? 's' : '')+'://'+CONFIG.root[type]+url;
    }

    /**
     * 占位符格式化
     * @param {String} str 需要替换的模板
     * @param {Object} params 参数
     * @param {Boolean} isEncode 是否编码
     * @eg demo("http://www.baidu.com?name={name}&age={age}&chanelid={chanelid}",{name:"demo",age:23,chanelid:100},false)
     * @return {String} str 返回结果 http://www.baidu.com?name=demo&age=23&chanelid=100
     */
    function formatByVal (str, params, isEncode) {
        if (typeof params == "object") {
            for (var key in params) {
                if (!_.has(params, key) || params[key] == "undefined" || params[key] == "null") {
                    params[key] = "";
                }
                str = str.replace(new RegExp("\\{" + key + "\\}", "ig"), isEncode ? encodeURIComponent(params[key]) : params[key]);
            }
        }
        return str.replace(/\{\w*\}/ig, "");
    }

    /**
     * 公用同步数据方法，重写model默认sync方法
     * @param  {[type]} method  [description]
     * @param  {[type]} model   [description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function sync (method, model, options) {
        var params = _.extend({
            type : 'GET',
            url : url,
            processData : false,
        }, options);

        // 处理url，get请求填充url上的数据
        var url = typeof model.url === 'string' ? model.url : options.url;

        if (!url)  {
            return;
        }

        url = url.indexOf('http') > -1 ? url : getRoot(url);
        url = formatByVal(url, options.data);
        params.url = url;

        if (params.type.toLowerCase() === 'get') {
            params.data = null;
        } else {
            params.data = JSON.stringify({data : params.data});
        }

        return $.ajax(params);
    }

    /**
     * 获取数据
     * @param  {[type]} options [description]
     */
    function getResult (options) {
        return sync('', {}, options);
    }

    /**
     * 获取时间间隔
     * @param  {Number} time 时间戳
     * @return {String}      对应的时间间隔字符
     */
    function getInterval (time) {
        var now = Math.round(new Date().getTime() / 1000),
            extra = now - time,
            days = Math.floor(extra/(24*60*60));

        if (days > 0) {
            return days + 'day' + (days > 1 ? 's' : '');
        }

        var hrs = Math.floor(extra/3600);

        if (hrs > 0) {
            return hrs + 'hr' + (hrs > 1 ? 's' : '');
        }

        var min = Math.floor(extra/60);

        if (min > 0) {
            return min + 'min';
        }

        return 'right now';
    }

    return {
        getRoot     : getRoot,
        formatByVal : formatByVal,
        sync        : sync,
        getResult   : getResult,
        getInterval : getInterval
    };
});