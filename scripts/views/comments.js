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
            this.model = stories.get(article_id);

            this.render();

            _.each(this.model.get('kids') || [], function (value) {
                new comment({
                    model : new item(value)
                });
            });
        },
        render : function () {
            $('#container-content').addClass('content-show');

            this.$el.html(template(commentsTmpl, {data : this.model.toJSON()}));

            return this;
        },
        destroy : function () {
            $('#container-content').removeClass('content-show');

            this.$el.html('');
        }
    });

    return comments;
});