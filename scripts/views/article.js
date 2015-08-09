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
        page = require('models/readPage'),
        articleTmpl = require('text!templates/article.html');

    var article = Backbone.View.extend({
        el : '#content-section',
        initialize : function (article_id) {
            this.model = stories.get(article_id);

            this.render();

            var modelJSON = this.model.toJSON();

            if (this.model.get('url') && !this.model.get('text')) {
                this.pageModel = new page(this.model.get('id'), this.model.get('url'));

                this.listenTo(this.pageModel, 'change', this.renderPage);
            }
        },
        render : function () {
            $('#container-content').addClass('content-show');

            this.$el.html(template(articleTmpl, {data : this.model.toJSON()}));

            return this;
        },
        // 渲染url页面
        renderPage : function () {
            this.$('.article-content').html(this.pageModel.toJSON().content).removeClass('article-loading');

            return this;
        },
        destroy : function () {
            $('#container-content').removeClass('content-show');

            this.$el.html('');
        }
    });

    return article;
});