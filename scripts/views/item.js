/**
 * stories列表中其中一个item
 *
 * @author mingxin.huang
 * @update 2015.08.08
 */

define(function (require) {
    var Backbone = require('Backbone'),
        template = require('template'),

        itemTmpl = require('text!templates/item.html');

    var item = Backbone.View.extend({
            // tagName : 'li',
            initialize : function () {
                this.listenTo(this.model, 'change', this.render);
            },
            render : function () {
                console.log('render : ', this.model.toJSON());

                this.setElement(template(itemTmpl, {data : this.model.toJSON()}));

                // this.$el.html(template(itemTmpl, {data : this.model.toJSON()}));

                $('#stories-section ul').append(this.$el);

                return this;
            },
        });

    return item;
});