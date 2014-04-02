define( [ 'backbone' ], function( Backbone )
{
    'use strict';
    
    var <%= name %> = Backbone.Model.extend(
    {
        defaults : {
        },

        /**
         * init
         */
        initialize : function()
        {
        }
        
    });
    return <%= name %>;
});
