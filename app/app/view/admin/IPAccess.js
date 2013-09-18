/**
 * Created with IntelliJ IDEA.
 * User: ernesto
 * Date: 4/4/13
 * Time: 2:30 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.view.admin.IPAccess',{
	alias:'widget.ipaccess',
	extend:'Ext.panel.Panel',
    requires:[

    ],
    layout:{
        type:'hbox',
        align:'stretch'
    },
	items:[
        {
            xtype:'grid',
            store: this.bStore = Ext.create('App.store.admin.IPAccess',{
                filters:[
                    {
                        property:'access',
                        value:1
                    }
                ]
            }),
            multiSelect: true,
            stripeRows: true,
            flex:1,
            margin:'0 2 0 0',
            viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop',
                    dragGroup: 'blocked',
                    dropGroup: 'allowed'
                },
                listeners: {
                    drop: function(node, data, dropRec, dropPosition) {
                        //var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('ip') : ' on empty view';
                        //say('Drag from right to left - Dropped ' + data.records[0].get('ip') + dropOn);
                    }
                }
            },
            columns:[
                {
                    text:'Banned/Blocked IPs',
                    dataIndex:'ip',
                    flex:1
                },
                {
                    xtype:'actioncolumn',
                    width:25,
                    items: [
                        {
                            icon: 'resources/images/no.gif',
                            tooltip: 'Delete',
                            handler: function(grid, rowIndex, colIndex) {
                                var rec = grid.getStore().getAt(rowIndex);
                                alert("Terminate " + rec.get('ip'));
                            }
                        }
                    ]
                }
            ],
            tbar: Ext.create('Ext.PagingToolbar', {
                store: this.bStore,
                displayInfo: true,
                displayMsg: 'Displaying IP {0} - {1} of {2}',
                emptyMsg: 'No IPs to display',
                items:[
                    '-',
                    {
                        xtype:'button',
                        text:'New Banned IP',
                        icon:'resources/images/add.gif',
                        action:'newBannedIP'
                    },
                    '-'
                ]
            })
        },
        {
            xtype:'grid',
            store: this.aStore = Ext.create('App.store.admin.IPAccess',{
                filters:[
                    {
                        property:'access',
                        value:2
                    }
                ]
            }),
            multiSelect: true,
            stripeRows: true,
            flex:1,
            margin:'0 0 0 2',
            viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop',
                    dragGroup: 'allowed',
                    dropGroup: 'blocked'
                },
                listeners: {
                    drop: function(node, data, dropRec, dropPosition) {
//                        var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('ip') : ' on empty view';
//                        say('Drag from left to right - Dropped ' + data.records[0].get('ip') + dropOn);
                    }
                }
            },
            columns:[
                {
                    text:'White Listed/Allow IPs',
                    dataIndex:'ip',
                    flex:1
                },
                {
                    xtype:'actioncolumn',
                    width:25,
                    items: [
                        {
                            icon: 'resources/images/no.gif',
                            tooltip: 'Delete',
                            handler: function(grid, rowIndex, colIndex) {
                                var rec = grid.getStore().getAt(rowIndex);
                                alert("Terminate " + rec.get('ip'));
                            }
                        }
                    ]
                }
            ],
            tbar: Ext.create('Ext.PagingToolbar', {
                store: this.aStore,
                displayInfo: true,
                displayMsg: 'Displaying IP {0} - {1} of {2}',
                emptyMsg: 'No IPs to display',
                items:[
                    '-',
                    {
                        xtype:'button',
                        text:'Add Allow IP',
                        icon:'resources/images/add.gif',
                        action:'newWhiteListedIP'
                    },
                    '-'
                ]
            })
        }
    ]
});