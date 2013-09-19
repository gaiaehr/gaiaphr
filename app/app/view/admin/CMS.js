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

Ext.define('App.view.admin.CMS',{
	alias:'widget.cmsgrid',
	extend:'Ext.grid.Panel',
	requires:[
		'App.store.admin.CMS'
	],
	store: this.store = Ext.create('App.store.admin.CMS'),
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
					return 'English';
				}else if(v == 'es'){
					return 'Español';
				}else{
					return v;
				}
			}
		}
	],
    features: [
        {
            ftype:'grouping',
            groupHeaderTpl: 'Content Type: {name}'
        }
    ]
});