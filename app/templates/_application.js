define( [ 'backbone', 'scripts/src/Router', 'scripts/src/baseModules/_viewBase' ], function( Backbone, Router )
{
    'use strict';

    return {

        /**
         * init application
         */
        init : function()
        {
             new Router();
             Backbone.history.start( { pushState: true } );
             console.log(':::: system :: Application initialized' );
        },

        // set events
        appState : {
            'STATE_CHANGED' : 'application_state_changed'
        }
    };

});