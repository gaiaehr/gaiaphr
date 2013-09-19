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

Ext.define('App.view.admin.Users',{
	alias:'widget.users',
	extend:'Ext.grid.Panel',
    requires:[
        'App.store.admin.Users'
    ],
	store: this.uStore = Ext.create('App.store.admin.Users'),
	columns:[
		{
			text:'Full Name',
			dataIndex:'fullname',
            flex:1,
            editor:{
                xtype:'textfield'
            }
		},
        {
            text:'Username',
            dataIndex:'username',
            width:150,
            editor:{
                xtype:'textfield'
            }
        },
		{
			text:'Password',
			dataIndex:'password',
			width:150,
            renderer:function(v){
                return App.app.getController('Admin').rendererPassword(v);
            },
            editor:{
                xtype:'textfield',
                inputType:'password'
            }
		},
		{
			text:'Role',
			dataIndex:'role',
			width:150,
            renderer:function(v){
                if(v === '1'){
                    return 'Admin'
                }else{
                    return 'User'
                }
            },
            editor:{
                xtype:'combobox',
                queryMode: 'local',
                displayField: 'title',
                valueField: 'value',
                store:Ext.create('Ext.data.Store', {
                    fields: ['title', 'value'],
                    data : [
                        {'title':'Admin', 'value':'1'},
                        {'title':'User', 'value':'2'}
                    ]
                })
            }
		},
		{
			text:'Active',
			dataIndex:'active',
			width:75,
            renderer:function(v){
                if(v){
                    return '<img src="resources/images/yes.gif">'
                }else{
                    return '<img src="resources/images/no.gif">'
                }
            },
            editor:{
                xtype:'checkbox'
            }
		}
	],
    plugins:[
	    {
		    ptype:'rowediting',
		    clicksToMoveEditor: 2,
		    autoCancel: false
	    }
    ],
    tbar: Ext.create('Ext.PagingToolbar', {
        store: this.uStore,
        displayInfo: true,
        displayMsg: 'Displaying Users {0} - {1} of {2}',
        emptyMsg: 'No Users to display',
        items:[
            '-',
            {
                xtype:'button',
                text:'New User',
                icon:'resources/images/add.gif',
                action:'newGridRecord'
            },
            '-'
        ]
    })
});