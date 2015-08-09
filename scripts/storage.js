/**
 * localstorage模块，负责记录一些用户行为
 *
 * @author mingxin.huang
 * @update 2015.08.09
 */

define(function (require) {
    var storage = window.localStorage || null,

        key = 'visited_list',
        visitedList = [];

    function init () {
        visitedList = JSON.parse(storage.getItem(key)) || [];
    }

    /**
     * 添加已读消息ID
     * @param  {Number} article_id 消息ID
     */
    function visited (article_id) {
        article_id = parseInt(article_id, 10);

        if (!isVisited(article_id)) {
            visitedList.push(article_id);
            
            storage.setItem(key, JSON.stringify(visitedList))
        }
    }

    function isVisited (article_id) {
        article_id = parseInt(article_id, 10);

        return visitedList.indexOf(article_id) > -1;
    }

    init();

    return {
        visited : visited,
        isVisited : isVisited
    };
});