Ext.define('App.view.layout.Footer', {
    extend: 'Ext.panel.Panel',
    requires:[
        'Ext.toolbar.TextItem'
    ],
    
    xtype: 'appFooter',
    region: 'south',
    margin: '4 0 0 0',
    bbar: [
        '&copy; 2013 by The Right Answer, Inc. All rights reserved. | v5.0',
        '->',
        '-',
        {
            text:'contact'
        },
        '-',
        {
            text: 'help'
        },
        '-'
    ]
});