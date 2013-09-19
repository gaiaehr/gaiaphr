/**
 * GaiaPHR (Patient Health Records)
 * Copyright (C) 2013 Certun, inc.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
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