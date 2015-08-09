/**
 * story列表view模块
 *
 * @author mingxin.huang
 * @update 2015.08.08
 */

define(function (require) {
    var Backbone = require('Backbone'),

        storage = require('storage'),
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
                this.$loadMore = this.$('.load-more');

                this.listenTo(this.collection, 'add', this.addStory);
                this.listenTo(this.collection, 'reset', this.reset);
            },
            addStory : function (model) {
                new item({model : model});
            },
            reset : function (type) {
                this.$list.html('');
                $('#container-stories .container-header h1').text(type);
            },
            /**
             * 设置为已读信息
             * @param {[type]} e [description]
             */
            setVisited : function (e) {
                var $this = $(e.currentTarget);

                console.log('set visited : ', $this);

                $this.addClass('visited');

                storage.visited($this.data('id'));
            },
            loadMore : function (e) {
                if (this.collection.loadMore()) {
                    this.$loadMore.show();
                } else {
                    this.$loadMore.hide();
                }
            }
        });

    return new storiesView();
});