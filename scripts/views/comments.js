/**
 * comments view模块
 *
 * @author mingxin.huang
 * @update 2018.08.09
 */

define(function (require) {
    var Backbone = require('Backbone'),
        template = require('template'),
        _ = require('underscore'),

        stories = require('collections/stories'),
        item = require('models/item'),
        comment = require('views/comment'),
        commentsTmpl = require('text!templates/comments.html');

    var comments = Backbone.View.extend({
        el : '#content-section',
        initialize : function (article_id) {
            this.$container = $('#container-content');

            this.model = stories.get(article_id) ;

            if (!this.model) {
                this.model = new item(article_id);

                this.listenTo(this.model, 'change', this.initComments)
            } else {
                this.initComments();
            }
        },
        initComments : function () {
            this.render();

            _.each(this.model.get('kids') || [], function (value) {
                new comment({
                    model : new item(value)
                });
            });
        },
        render : function () {
            this.$container.addClass('content-show');
            this.$container.find('.menu-item-comment').hide();
            this.$container
                .find('.menu-item-article').css('display', 'inline-block')
                .find('a').attr('href', '#/article/'+this.model.get('id'));

            this.$el.html(template(commentsTmpl, {data : this.model.toJSON()}));

            return this;
        },
        destroy : function () {
            this.$container.removeClass('content-show');

            this.$el.html('');
        }
    });

    return comments;
});