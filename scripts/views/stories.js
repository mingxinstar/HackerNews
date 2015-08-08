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
            el : '#stories-section',
            collection : stories,
            events : {
                'click li' : 'setVisited',
                'click .load-more' : 'loadMore'
            },
            initialize : function () {
                this.$list = this.$('ul');

                console.log('section : ', this.$el);

                this.listenTo(this.collection, 'add', this.addStory);
                this.listenTo(this.collection, 'reset', this.clear);
            },
            addStory : function (model) {
                new item({model : model});

                // console.log('addStory : ', model.toJSON());
            },
            clear : function () {
                console.log('clear');
            },
            /**
             * 设置为已读信息
             * @param {[type]} e [description]
             */
            setVisited : function (e) {
                var $this = $(e.currentTarget);

                console.log('set visited : ', $this);

                $this.addClass('visited');
            },
            loadMore : function (e) {
                this.collection.loadMore();
            }
        });

    return new storiesView();
});