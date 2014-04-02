define( [ 'backbone' ], function( Backbone )
{
    'use strict';

    /**
     * AppViewModel, application view model
     */
    var AppViewModel = Backbone.Model.extend(
    {
        defaults : {
            message : 'Your skeleton app is setup and ready to go, use it wisely',
            title   : 'Your <%= applicationName %> is ready...'
        }
    });
    return AppViewModel;
});