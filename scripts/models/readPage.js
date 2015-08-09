/**
 * 页面读取模块model，负责url页面数据的获取
 *
 * @author mingxin.huang
 * @update 2015.08.09
 */

define(function (require) {
    var Backbone = require('Backbone'),

        core = require('core');

    var readPage = Backbone.Model.extend({
        url : 'http://aws-api.premii.com/readability.php?url={url}&id={id}&apikey=hn.premii.com&d=20150710',
        initialize : function (id, url) {
            this.set({
                id : id,
                url : url
            });

            this.fetch({
                url : this.url,
                dataType : 'jsonp',
                data : {
                    url : url,
                    id : id
                }
            });
        },
        sync : core.sync
    });

    return readPage;
});