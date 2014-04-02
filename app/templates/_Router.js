/** 
 * Router - Routes all page requests
 */

define( [ 'backbone', 'scripts/src/ViewManager', 'views/AppView', 'models/AppViewModel' ], 
function( Backbone, vm, AppView, AppViewModel )
{
	'use strict';

	/**
	 * Routes links and delegates views
	 * @class Router
	 */
	var router = Backbone.Router.extend( 
	{
		routes : {
			''	: 'showIndex'
		},

		initialize : function()
		{	
			console.log(':::: system :: Router initialized' );
			
			// vm.addRegion( /* name */, /* el */ );
			vm.addRegion( 'main', '#content' );
		},

		/**********
		* Routes
		**********/

		showIndex : function()
		{
		 	console.log(':::: system :: You are at the Index' );
		 	vm.swap( 'main', new AppView( { model : new AppViewModel() } ) );
		}


		//**********//

	});

	return router;
});