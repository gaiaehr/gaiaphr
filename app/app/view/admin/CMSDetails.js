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

Ext.define('App.view.admin.CMSDetails',{
	alias:'widget.cmsdetails',
	extend:'Ext.window.Window',
	title:'Content Details',
	closeAction:'hide',
	modal:true,
	items:[
		{
			xtype:'form',
			bodyPadding:10,
			width:800,
			defaults:{
				xtype:'textfield'
			},
			items:[
				{
					anchor:'100%',
					name:'title'
				},
				{
					xtype:'htmleditor',
					anchor:'100%',
					height:350,
					name:'body'
				}
			]
		}
	],
	buttons: [
		{
			text:'Save',
			action:'cmsSave'
		},
		{
			text:'Cancel',
			action:'cmsCancel'
		}
	]
});