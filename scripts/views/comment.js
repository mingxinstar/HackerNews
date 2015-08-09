/**
 * 当个comment view
 *
 * @author mingxin.huang
 * @update 2015.08.09
 */

define(function (require) {
    var Backbone = require('Backbone'),
        template = require('template'),
        _ = require('underscore'),

        item = require('models/item'),
        commentTmpl = require('text!templates/comment.html');

    var comment = Backbone.View.extend({
        initialize : function () {
            this.listenTo(this.model, 'change', this.render)
        },
        render : function () {
            this.setElement(template(commentTmpl, {data : this.model.toJSON()}));

            var $parent = $('#kids-'+this.model.get('parent'));

            $parent.append(this.$el);
            $parent.siblings('.article-loading').remove();

            // 对每个item下的kids进行迭代处理
            _.each(this.model.get('kids') || [], function (id) {
                new comment({
                    model : new item(id)
                });
            });

            return this;
        }
    });

    return comment;
});