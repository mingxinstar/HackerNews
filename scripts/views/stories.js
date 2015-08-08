/**
 * story列表view模块
 *
 * @author mingxin.huang
 * @update 2015.08.08
 */

define(function (require) {
    var Backbone = require('Backbone'),

        stories = require('collections/stories'),
        item = require('views/item');

    var storiesView = Backbone.View.extend({
            ele : '#stories-section',
            collection : stories,
            initialize : function () {
                this.$list = this.$('ul');

                this.listenTo(this.collection, 'add', this.addStory);
                this.listenTo(this.collection, 'reset', this.clear);
            },
            addStory : function (model) {
                new item({model : model});

                // console.log('addStory : ', model.toJSON());
            },
            clear : function () {
                console.log('clear');
            }
        });

    return new storiesView();
});