define( [ 'backbone' ], function( Backbone )
{
    'use strict';
    
    var <%= name %> = Backbone.Collection.extend(
    {
        model : null,

        /**
         * init
         */
        initialize : function()
        {
        }
    });
    return <%= name %>;
});
