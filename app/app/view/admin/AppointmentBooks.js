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

Ext.define('App.view.admin.AppointmentBooks',{
	alias:'widget.appointmentbooks',
	extend:'Ext.grid.Panel',
    requires:[
        'App.store.admin.AppointmentBooks'
    ],
	store: this.abStore = Ext.create('App.store.admin.AppointmentBooks'),
	columns:[
		{
			text:'Book Name/Title',
			dataIndex:'bookTitle',
            width:150,
            editor:{
                xtype:'textfield'
            }
		},
		{
			text:'Book Description',
			dataIndex:'bookDesc',
            flex:1,
            editor:{
                xtype:'textfield'
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
        store: this.abStore,
        displayInfo: true,
        displayMsg: 'Displaying Books {0} - {1} of {2}',
        emptyMsg: 'No Books to display',
        items:[
            '-',
            {
                xtype:'button',
                text:'New Book',
                icon:'resources/images/add.gif',
                action:'newGridRecord'
            },
            '-'
        ]
    })
});