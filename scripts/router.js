/**
 * HN router模块，负责hash相关处理
 *
 * @author mingxin.huang
 * @email mingxin.huang@163.com
 * @update 2018.08.08
 */

define(function (require) {
    var Backbone = require('Backbone');

    var router = Backbone.Router.extend({
        routes : {
            '' : 'index', //首页
            'article/:article_id' : 'article', //文章
            'comments/:comment_id' : 'commonts', //评论
        },
        index : function () {
            require(['views/stories']);
        },
        article : function (article_id) {
            require(['views/article'], function (article) {
                new article(article_id);    
            });
        },
        commonts : function () {
            
        }
    });

    return router;
});