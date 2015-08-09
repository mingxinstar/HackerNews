/**
 * options view 模块
 *
 * @author mingxin.huang
 * @update 2015.08.09
 */

define(function (require) {
    var Backbone = require('Backbone'),

        stories = require('collections/stories'),
        optionsTmpl = require('text!templates/options.html');

    var options = Backbone.View.extend({
        events : {
            'click li' : 'changeType'
        },
        initialize : function () {

        },
        render : function () {
            this.setElement(optionsTmpl);

            $('.container').append(this.$el);

            var that = this;
            setTimeout(function () {
                that.$el.addClass('show-options');
            }, 100);

            return this;
        },
        destroy : function () {
            this.$el.removeClass('show-options');

            var that = this;
            setTimeout(function () {
                that.remove();
            }, 500);
        },
        changeType : function (e) {
            stories.initList($(e.currentTarget).data('type'));
        }
    });

    return new options();
});