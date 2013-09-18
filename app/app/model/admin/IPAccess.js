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

Ext.define('App.model.admin.IPAccess',{
	extend:'Ext.data.Model',
	table:{
		name:'ip_access',
		comment:'Baned / Allow IP list'
	},
	fields:[
		{
			name:'id',
			type:'int'
		},
		{
			name:'ip',
			type:'string',
            comment:'IP'
		},
		{
			name:'access',
			type:'int',
			comment:'0 = not controlled, 1= banned/not allow, 2 = white listed/allow'
		},
		{
			name:'type',
			type:'string',
			comment:'auto | manual'
		},
		{
			name:'note',
			type:'string',
			comment:'Notes'
		},
		{
			name:'aDate',
			type:'date',
			comment:'Added Date'
		}
	],

    proxy:{
        type:'direct',
        api:{
            read:IPAccess.getIPs,
            create:IPAccess.addIP,
            update:IPAccess.updateIP
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});