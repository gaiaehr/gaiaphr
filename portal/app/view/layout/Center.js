Ext.define('App.view.layout.Center', {
    extend: 'Ext.tab.Panel',
    region: 'center',
    xtype: 'appCenter',
    plugins: [ Ext.create('Ext.ux.TabReorderer') ]
});
//Ext.define('App.view.layout.Center', {
//    extend: 'Ext.panel.Panel',
//    requires: [
//        'Ext.tab.Panel'
//    ],
//    cls: 'centerContainer',
//    region: 'center',
//    xtype: 'appCenter',
//    layout: {
//        type: 'vbox',
//        align: 'stretch'
//    },
//    items: [
//        {
//            xtype: 'container',
//            action: 'centerTitle',
//            cls: 'centerTitle',
//            html: ' Panel Title'
//        },
//        {
//            xtype: 'panel',
//            action: 'centerPanel',
//            cls: 'centerPanel',
//            flex: 1,
//            frame: true

//        }
//    ]
//});