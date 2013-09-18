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

Ext.define('App.model.admin.Users',{
	extend:'Ext.data.Model',
	table:{
		name:'users',
		comment:'Users'
	},
	fields:[
		{
			name:'id',
			type:'int'
		},
		{
			name:'fullname',
			type:'string',
            comment:'Full Name'
		},
		{
			name:'username',
			type:'string',
			comment:'Username'
		},
		{
			name:'password',
			type:'string',
			dataType:'blob',
			encrypt:true,
			comment:'Password'
		},
		{
			name:'role',
			type:'string',
			comment:'1 = Admin, 2 = User'
		},
		{
			name:'active',
			type:'bool'
		}
	],
	proxy:{
		type:'direct',
		api:{
			read:Users.getUsers,
			create:Users.addUser,
			update:Users.updateUser
		},
		reader: {
			type: 'json',
			root: 'users'
		}
	}
});