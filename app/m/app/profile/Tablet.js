/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/19/13
 * Time: 9:28 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.profile.Tablet', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'Tablet',
        views: [
            'Main',
            'Welcome'
        ],
        controllers: [
            'Main'
        ]
    },

    isActive: function() {
        return !Ext.os.is.Phone;
    },

    launch:function(){
        Ext.fly('appLoadingIndicator').destroy();
        Ext.Viewport.add(
            Ext.create('App.view.Login',{
                modal: true,
                height:400,
                width: '50%',
                centered: true
            })
        );
    }
});