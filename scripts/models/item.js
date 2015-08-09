/**
 * 当个stroy模块
 *
 * @author mingxin.huang
 * @update 2015.08.08
 */

define(function (require) {
    var Backbone = require('Backbone'),

        core = require('core');

    var item = Backbone.Model.extend({
        url : '/item/{item_id}.json',
        initialize : function (item_id) {
            this.set({
                'item_id' : item_id
            });

            this.fetch({
                url : this.url,
                data : {
                    item_id : item_id
                }
            })
        },
        sync : core.sync
    });

    return item;
});