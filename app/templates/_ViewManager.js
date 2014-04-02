/** 
 * ViewManager, switches and disposes views
 * @class ViewManager
 * @return ViewManager
 */
define( [ 'backbone', 'app' ], function( Backbone, app )
{   
    'use strict';

    var _regions        = {};
    var _currentState   = '';

    return { 

        /**
         * register a region
         * @param name: a unique name for this _regions
         * @param selector: a DOM selector for this region
         */
        addRegion : function( name, selector )
        {
            _regions[ name ] = 
            {
                el: $( selector )
            };
        },

         /**
         * render a new view in a region
         * @param region: the name of the region
         * @param appState: the new state reference if one applicable, defaults to region
         * @param silent: if to dispatch a system wide message of the state change using Backbone.vent
         */
        swap : function( region, newView, appState, silent ) 
        {
            appState = appState || region;
            if( _currentState === appState ) { return; }
            this.updateState( appState, silent );

             region = _regions[ region ];
            if ( region.view ) 
            {
                region.view.dispose();
                region.view = null;
            }

            region.view = newView;
            region.el.empty().html( newView.render().el );
        },

        /**
         * @private
         * update the state and also dispatch a state change event
         */
        updateState : function( state, silent )
        {
            silent = silent || true;
            if( silent !== true ) { Backbone.vent.trigger( app.appState.STATE_CHANGED, state ); }
            _currentState = state;
        },
       
        /**
         * return the current state that the app is on
         */
        getCurrentState : function() { return _currentState; }

    };
});
