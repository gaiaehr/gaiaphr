Ext.define('App.view.navigation.Tree', {
    extend: 'Ext.tree.Panel',
    
    xtype: 'mainnavigation',
    action: 'mainnavigation',
    rootVisible: false,
    border: false,
    store: Ext.create('Ext.data.TreeStore', {
        root: {
            expanded: true
        },
        proxy: {
            type: 'direct',
            directFn: Navigation.Load,
            paramOrder: 'node'
        }
    })
    
});