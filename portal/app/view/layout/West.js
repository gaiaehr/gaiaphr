Ext.define('App.view.layout.West', {
    extend: 'Ext.panel.Panel',
    requires:[
        'App.view.navigation.Tree'
    ],

    region: 'west',
    xtype: 'appWest',
    title: 'Main Navigation',
    collapsible:true,
    split: true,
    width: 200,
    overflowY: 'auto',
    items: [
        {
            xtype: 'mainnavigation'
        }
    ]
});