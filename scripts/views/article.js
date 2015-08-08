/**
 * 右侧article显示栏
 *
 * @author mingxin.huang
 * @update 2015.08.08
 */

define(function (require) {
    var Backbone = require('Backbone'),
        template = require('template'),

        stories = require('collections/stories'),
        articleTmpl = require('text!templates/article.html');

    var article = Backbone.View.extend({
        el : '#content-section',
        initialize : function (article_id) {
            this.model = stories.get(article_id);

            console.log('init article : ', article_id, this.model);

            this.render();
        },
        render : function () {
            this.$el.html(template(articleTmpl, {data : this.model.toJSON()}));

            return this;
        }
    });

    return article;
});