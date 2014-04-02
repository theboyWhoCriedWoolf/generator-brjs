define( [ 'hbs' ], function()
{
	'use strict';

    var _templatePath = 'templates/';

	// return loader
	return {
		/**
		 * Load the handlebars template
		 */
		loadTmpl : function( path, callback, context )
		{
			require( [ ( 'hbs!' + _templatePath + path ) ], function() { callback.apply( context, arguments ); },
			function( err ) { console.log('ERROR :: Failed to load Template [ ' + err + ' ] :: ' ); });
		}
	};

});