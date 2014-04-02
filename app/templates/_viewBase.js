define( [ 'backbone', 'underscore', 'scripts/src/loaders/tmplLoader' ], function( Backbone, _, tmpl )
{
    'use strict';

    /**
    * Extend backbone View to add methods and useful properties
    */
    _.extend( Backbone.View.prototype, {

        tmpl                : tmpl,
        logTemplate         : false,
        template            : null,
        subviews            : null,
        _super              : function( method, args ){ return this.constructor.__super__[ method ].call( this, args ); },

        /**
        * Render, get the template if one is defined, load the html and pass
        * in the data to Handlebars
        */
        render : function()
        {
            if( this.template && _.isString( this.template ) )
            {
                // load the template using the loader then parse the date
                tmpl.loadTmpl( this.template, function( tmpl )
                {
                    var data = this.model || this.collection;
                    this.$el.html( tmpl( ( data ) ? data.toJSON() : {} ) );
                    if( this.logTemplate ) { console.log('******* Template Loaded [ ' + this.template + ' ] ***********' ); }
                    this.afterRender(); // template loaded, call after render
                    if( this.isValid( this.subviews ) ) { this.assign(); }

                }, this );
            }
            
            return this;
        },


    // [ SUB VIEW ELEMENTS 
    
        // add sub views
        addSub : function( selector, view, options )
        {
            if ( !this.isValid( this.subviews ) ) { this.subviews = []; }
            this.subviews[ this.subviews.length ] = _.extend( { view : view, selector : selector }, options );
            return view;
        },

        /**
         * hasSub - return if the sub already exists
         */
        hasSub : function( el ) 
        { 
            if( !this.isValid( this.subviews ) ) { return false; }
            return _.isValid( _.findWhere( this.subviews, { selector : el } ) ); 
        }, 
        
        /**
         * return a sub view by its id
         * must pass arguments if the view selectors are all the same
         */
        subById : function( options ) 
        { 
             return _.find( this.subviews, function( viewObj ) 
             { 
                return ( ( viewObj[ _.keys( options )[ 0 ] ]  ===  _.values( options )[ 0 ]  ) ||
                  ( viewObj.view[ _.keys( options )[ 0 ] ]  ===  _.values( options )[ 0 ] ) );
             });
        },
        
        /**
         * dispose Sub by ID
         */
        disposeSub : function( id )
        {
            var sub = this.subById( id );
            if( _.isUndefined( sub ) ) { return console.log( '****[ ERROR : Sub Could not be found to Dispose ]****' ); }
            this.subviews = _.without( this.subviews, sub );
            sub.view.dispose();
        },
        
        // loop through and assign subviews
        assign : function () 
        {
            var that = this;
            _.each( this.subviews, function( subview )
            {
                 $( subview.selector, that.el ).html( subview.view.render().el );
                 subview.view.delegateEvents(); // keep events
                 // subview.view.setElement( this.$( subview.selector ) ).render();
                 // $( subview.selector ).append( subview.view.render().el);
            });
        },
        
    // ]
        
        // caled after render, can be extended
        afterRender : function() { },

        /***
         * makse usre an object is valid
         * and is not either null or undefined
         */
        isValid : function( obj ) { return !_.isUndefined( obj ) && !_.isNull( obj ); },

        /**
         * combines an el ID with the mosel ID
         * @param  {String} generalId - the ID of a HTML element
         */
        combine : function( generalId ) { return generalId + this.model.get('id'); },

        /**
         * send event to route the app
         */
        routeInternally : function( url, opts ) { Backbone.vent.trigger( ( opts.data ) ? 'internalRouteWithData' : 'internalRoute', url, opts ); },

        // dispose
        dispose : function()
        {
            this.unsetSubviews();
            this.unsetView();
            this.unset();
        },
        
         // clean up before removing the view
         unset: function() 
         {
            // turn off all bindings on the view
            this.unbind();
            // stop listening
            this.stopListening();
            // remove self from the page
            this.remove();
         },

         // unset subviews
        unsetSubviews : function()
        {
            if( !( _.isEmpty( this.subviews )) ) { _.each( this.subviews, function( subview ) { subview.view.dispose(); }); }
            this.subviews = null;
        },
         
       /**
        * NOTE: override this in a view to run any custom code before unset()
        * eg. turning off extra bindings
        */
        unsetView: function() 
        {
            // remove model
            if( this.model ) { this.model.off(); this.model.clear(); this.model = null; }
            // this.collection.remove( this.collection.models );
            if( this.collection ) { this.collection.off(); this.collection.reset(); this.collection = null; }
        }
    });
});