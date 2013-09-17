Ext.define('App.view.layout.Main', {
    extend: 'Ext.container.Container',
    requires:[
        'Ext.layout.container.Border',

        'App.view.layout.Header',
        'App.view.layout.West',
        'App.view.layout.Center',
        'App.view.layout.Footer'
    ],
    
    xtype: 'appMain',
    action: 'appMain',
    hidden: true,
    padding: 3,
    layout: {
        type: 'border'
    },

    items: [
        {
            xtype: 'appHeader'
        },
        {
            xtype: 'appWest'
        },
        {
            xtype: 'appCenter'
        },
        {
            xtype: 'appFooter'
        }
    ]
});