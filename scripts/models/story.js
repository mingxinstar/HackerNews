/**
 * 当个stroy模块
 *
 * @author mingxin.huang
 * @update 2015.08.08
 */

define(function (require) {
    var Backbone = require('Backbone'),

        core = require('core');

    var story = Backbone.Model.extend({
        url : '/item/{story_id}.json',
        initialize : function (story_id) {
            this.set({
                'story_id' : story_id
            });

            this.fetch({
                url : this.url,
                data : {
                    story_id : story_id
                }
            })
        },
        sync : core.sync
    });

    return story;
});