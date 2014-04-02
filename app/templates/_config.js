// This is the runtime configuration file.  It complements the Gruntfile.js by
// supplementing shared properties.

'use strict';

require.config({

    catchError      : true,
    enforceDefine   : false,
    baseUrl         : '.',

    paths: {
        // Make vendor easier to access.
        'vendor'            : 'bower_components',
        'templates'         : 'templates',
        'libs'              : 'scripts/libs',
        'base'              : 'scripts/src/baseViews',
        'app'               : 'scripts/src/application',
        // Opt for Lo-Dash Underscore compatibility build over Underscore.
        'underscore'        : 'bower_components/lodash/dist/lodash.underscore',
         // set up root folders
        'views'             : 'scripts/src/views',
        'models'            : 'scripts/src/models',
        'collections'       : 'scripts/src/collections',
        'utils'             : 'scripts/src/utils',
        // plugins
        'jquery'            : 'bower_components/jquery/dist/jquery',
        'backbone'          : 'bower_components/backbone/backbone',
        'hbs'               : 'bower_components/require-handlebars-plugin/hbs',
        'handlebars'        : 'bower_components/handlebars/handlebars',
        'tmpl'              : 'scripts/src/loaders/tmplLoader'
    },

    hbs: { // optional
        helpers             : true,     // default: true
        i18n                : false,    // default: false
        templateExtension   : 'html',   // default: 'hbs'
        
        compileOptions      : {
            isBuild         : true
        },
        partialsUrl         : ''        // default: ''
    },

    shim: {
        // This is required to ensure Backbone works as expected within the AMD
        // environment.
        'backbone': {
          // These are the two hard dependencies that will be loaded first.
           deps       : ['jquery', 'underscore'],
           exports    : 'Backbone'
        },
        'underscore'  : {
             exports  : '_'
        },
        hbs : {
           deps       : ['jquery', 'underscore', 'handlebars', 'require' ] ,
           exports    : 'hbs',
           helperPathCallback  : function( name ) { return 'templates/helpers/' + name; },
        }
    }
});

/**
 * catch require JS Errors
 */
require.onError = function ( err ) {
    if (err.requireType === 'timeout') {
        return console.log( '::::::::::::: RequireJS ERROR [ ' + err.requireModules + ' ] :::::::::::::' );
    }
    throw err;
};