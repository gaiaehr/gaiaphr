Ext.define('App.view.tablet.Main', {
    extend: 'Ext.Container',
    xtype: 'tabletmain',

    requires: [
        'Ext.dataview.NestedList',
        'App.view.tablet.NavigationBar',
        'App.view.tablet.NestedList'
    ],

    config: {
        fullscreen: true,

        layout: {
            type: 'card',
            animation: {
                type: 'slide',
                direction: 'left',
                duration: 250
            }
        },

        items: [
            {
                xtype: 'tabletwelcome'
            },
            {
                xtype : 'tabletnestedlist',
                useTitleAsBackText: false,
                docked: 'left',
                width: 300,
                store: 'Panels',
                title:'Main Menu',
                cls:'mainMenu'
            },
            {
                xtype: 'tabletnavigationbar',
                title: 'Salus Portal',
                docked: 'top',
                items:[
                    {
                        xtype : 'button',
                        align : 'left',
                        action: 'home',
                        ui    : 'back',
                        text  : 'Home',
                        hidden: true
                    },
                    {
                        xtype : 'button',
                        align : 'right',
                        ui    : 'decline',
                        action: 'logout',
                        text  : 'Logout'
                    }
                ]
            }
        ]
    }
});
