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

Ext.define('App.view.AdminArea',{
	extend:'Ext.tab.Panel',
	alias:'widget.adminarea',
    header:{
        title:'Salus Portal Admin Area',
        cls:'noTitleBgHeader'
    },
	tools:[
		{
			xtype:'tbtext',
			text:'Welcome',
			margin:'0 10',
			action:'welcomeText'
		},
		{
			xtype:'button',
			text:'Logout',
			action:'logout',
			cls:'redBtn'
		}
	],
	cls:'noTitleBgHeader',
	plain:true,
	border:false,
	bodyBorder:false,
	defaults:{
		border:false,
		bodyBorder:false
	},
	items:[
        {
            xtype: 'appointmentcalendar',
            title:'Appointments',
            action:'appointmentCalendar'
        },
		{
			title: 'Reports',
			xtype:'reports'
		},
		{
			title: 'Chat Admin',
			xtype:'uxiframe',
			action:'chatadmin',
			height:500
		},
		{
			title: 'Adminstrative',
			xtype:'administrative'
		}
	]
});