Ext.define('App.view.admin.Settings', {
    extend: 'Ext.tab.Panel',
    requires: [
        'Ext.grid.plugin.RowEditing',
        'Ext.grid.feature.Grouping',
        'App.view.ux.grid.RefreshTool',
        'Ext.ux.SlidingPager'
    ],
    title: 'Settings',
    closable: true,
    items: [
        {
            xtype: 'form',
            title: 'General',
            html: 'Genetal Application settings'
        },
        {
            xtype: 'grid',
            action: 'developerSettingsGrid',
            title: 'Developer',
            store: store = Ext.create('App.store.admin.Settings'),
            features: [
                {
                     ftype: 'grouping'
                }
            ],
            plugins:[
                { 
                    ptype: 'rowediting'
                },
                { 
                    ptype: 'gridrefresh'
                }
            ],
            columns: [
                {
                    text: 'Category',
                    dataIndex: 'category',
                    editor: {
                        xtype:'textfield'
                    }
                },
                {
                    text: 'Title',
                    dataIndex: 'title',
                    flex: 1,
                    editor: {
                        xtype: 'textfield'
                    }
                },
                {
                    text: 'Key',
                    dataIndex: 'settingkey',
                    width: 200,
                    editor: {
                        xtype: 'textfield'
                    }
                },
                {
                    text: 'Value',
                    dataIndex: 'settingvalue',
                    width: 200,
                    editor: {
                        xtype: 'textfield'
                    }
                },
                {
                    text: 'Notes',
                    dataIndex: 'notes',
                    flex: 1,
                    editor: {
                        xtype: 'textfield'
                    }
                }
            ]
//            bbar: {
//                xtype: 'pagingtoolbar',
//                pageSize: 10,
//                store: store,
//                displayInfo: true,
//                plugins: Ext.create('Ext.ux.SlidingPager')
//            }
        }
    ]
});