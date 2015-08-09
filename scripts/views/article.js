/**
 * 右侧article显示栏
 *
 * @author mingxin.huang
 * @update 2015.08.08
 */

define(function (require) {
    var Backbone = require('Backbone'),
        template = require('template'),

        item = require('models/item'),
        stories = require('collections/stories'),
        page = require('models/page'),
        pages = require('collections/pages'),
        articleTmpl = require('text!templates/article.html');

    var article = Backbone.View.extend({
        el : '#content-section',
        initialize : function (article_id) {
            this.$container = $('#container-content');

            this.model = stories.get(article_id) ;

            if (!this.model) {
                this.model = new item(article_id);

                this.listenTo(this.model, 'change', this.initPage)
            } else {
                this.initPage();
            }
        },
        initPage : function () {
            this.render();

            var modelJSON = this.model.toJSON();

            if (this.model.get('url') && !this.model.get('text')) {
                var currPage = pages.get(this.model.get('id'));

                if (currPage) {
                    this.pageModel = currPage;

                    this.renderPage();
                } else {
                    currPage = new page(this.model.get('id'), this.model.get('url'));

                    pages.add(currPage);

                    this.pageModel = currPage;

                    this.listenTo(this.pageModel, 'change', this.renderPage);
                }
            }
        },
        render : function () {
            this.$container.addClass('content-show');
            this.$container.find('.menu-item-article').hide();
            this.$container
                .find('.menu-item-comment').css('display', 'inline-block')
                .find('a').attr('href', '#/comments/'+this.model.get('id'));

            this.$el.html(template(articleTmpl, {data : this.model.toJSON()}));

            return this;
        },
        // 渲染url页面
        renderPage : function () {
            this.$('.article-content').html(this.pageModel.toJSON().content).removeClass('article-loading');

            return this;
        },
        destroy : function () {
            this.$container.removeClass('content-show');

            this.$el.html('');
        }
    });

    return article;
});