'use strict';

require([ 'config' ], 
function () {

    require( [ 'vendor/requirejs-domready/domready', 'backbone', 'app', 'underscore' ], 
    function( domReady, Backbone, app, _ )
    {
         domReady(function () {
                Backbone.emulateJSON = true;                    // use for requests
                Backbone.vent = _.extend({}, Backbone.Events);  // extend event dispatched

                console.log(':::: system :: DOM initialized' );
                app.init();
         });
    });
});