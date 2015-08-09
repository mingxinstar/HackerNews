/**
 * HN router模块，负责hash相关处理
 *
 * @author mingxin.huang
 * @email mingxin.huang@163.com
 * @update 2018.08.08
 */

define(function (require) {
    var Backbone = require('Backbone'),

        article = require('views/article'),
        comments = require('views/comments'),
        options = require('views/options');

    var router = Backbone.Router.extend({
        routes : {
            '' : 'index', //首页
            'article/:article_id' : 'article', //文章
            'comments/:comment_id' : 'commonts', //评论
            'options' : 'options' //设置
        },
        index : function () {
            this.reset();

            require(['views/stories']);
        },
        currArticle : null,
        article : function (article_id) {
            this.currArticle = new article(article_id);    
        },
        currComment : null,
        commonts : function (article_id) {
            this.currComment = new comments(article_id);
        },
        reset : function () {
            if (this.currArticle) {
                this.currArticle.destroy();
            }

            if (this.currComment) {
                this.currComment.destroy();
            }

            options.destroy();
        },
        options : function () {
            options.render();
        }
    });

    return router;
});