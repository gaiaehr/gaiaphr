Ext.define('App.view.phone.Main', {
    extend: 'Ext.navigation.View',
    requires: ['Ext.TitleBar'],
    xtype:'phonemain',

    config: {
        fullscreen: true,
        items:[
            {
                xtype:'list',
                useTitleAsBackText: false,
                store: 'Panels'
            }
        ],
        navigationBar:{
            items: {
                xtype : 'button',
                align : 'right',
                ui    : 'decline',
                action: 'logout',
                text  : 'Logout'
            }
        }
    }
});