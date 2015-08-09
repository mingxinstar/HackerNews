/**
 * stroy collection负责相关stroy列表数据的获取
 *
 * @author mingxin.huang
 * @update 2015.08.08
 */

define(function (require) {
    var Backbone = require('Backbone'),

        core = require('core'),
        item = require('models/item');

    var stories = Backbone.Collection.extend({
        url : '/{type}stories.json', //type值为[news, top, ask, shwo, job]
        model : item,
        type : 'top', //当前story类型
        stories : [], //当前的stroy id 列表
        index : 0, //当前story索引值
        countPerPage : 10,
        initialize : function () {
            this.initList();
        },
        initList : function (type) {
            type = type || 'top';

            if (type !== this.type) {
                this.type = type;
                this.stories = [];
                this.index = 0;
            }

            var that = this;
            core.getResult({
                url : this.url,
                data : {type : type},
                success : function (res) {
                    // console.log('initList : ', res);

                    that.stories = res;
                    that.loadMore();
                }
            });
        },
        /**
         * 加载更多数据
         * @return {Boolean} 是否有更多数据可以加载
         */
        loadMore : function () {
            var maxCount = this.stories.length,
                currRoundMax = this.countPerPage + this.index;

            if (this.index > maxCount-1) {
                return false;
            }

            for (var i = this.index; i < currRoundMax && i < maxCount; i++) {
                this.add(new this.model(this.stories[this.index]));
                this.index++;
            }

            return true;
        }
    });

    return new stories();
});