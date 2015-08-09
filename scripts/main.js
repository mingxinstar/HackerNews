require.config({
    paths : {
        'Backbone'              : 'libs/backbone',
        'zepto'                 : 'libs/zepto/zepto',
        'template'              : 'libs/zepto/template',
        'touch'                 : 'libs/zepto/touch',
        'underscore'            : 'libs/underscore',
        'text'                  : 'libs/text'
    },
    shim : {
        'Backbone' : {
            exports : 'Backbone'
        },
        'zepto' : {
            exports : '$',
        },
        'underscore' : {
            exports : '_'
        },
        'template' : {
            exports : '$.template'
        }
    },
    urlArgs : 'v='+CONFIG.version
});

require(['Backbone', 'zepto', './router'], function (Backbone, zepto, router) {
    var appRouter = new router();

    Backbone.history.start();
})