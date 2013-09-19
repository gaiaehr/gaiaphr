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

Ext.define('App.view.admin.ConsentLetters',{
	alias:'widget.consentgrid',
	extend:'Ext.grid.Panel',
	requires:[
		'App.store.admin.ConsentLetters'
	],
	store: this.store = Ext.create('App.store.admin.ConsentLetters',{
		remoteGroup:false
	}),
	columns:[
		{
			text:'Title',
			dataIndex:'title',
			flex:1
		},
		{
			text:'Language',
			dataIndex:'language',
			width:100,
			renderer:function(v){
				if(v == 'en'){
					return 'English'
				}else if(v == 'es'){
					return 'Español'
				}else{
					return v
				}
			}
		},
		{
			text:'Revision',
			dataIndex:'revision',
			width:100
		},
		{
			text:'Active',
			dataIndex:'active',
			width:60,
			renderer:function(v){
				if(v){
					return '<img src="resources/images/yes.gif">'
				}else{
					return '<img src="resources/images/no.gif">'
				}
			}
		}
	],
	features: [
		{
			ftype:'grouping',
			groupHeaderTpl: 'Letter Type: {name}'
		}
	],
	tbar: Ext.create('Ext.PagingToolbar', {
		store: this.store,
		displayInfo: true,
		displayMsg: 'Displaying Letters {0} - {1} of {2}',
		emptyMsg: 'No Logs to display'
	})
});