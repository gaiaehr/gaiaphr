/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/19/13
 * Time: 9:28 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.profile.Phone', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'Phone',
        views: [
            'Main'
        ],
        controllers: [
            'Main'
        ]
    },

    isActive: function() {
        return Ext.os.is.Phone;
    },



    launch:function(){
        Ext.fly('appLoadingIndicator').destroy();
        Ext.Viewport.add(
            Ext.create('App.view.Login',{
                fullscreen:true
            })
        );
    }
});